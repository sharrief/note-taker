/* eslint-disable import/prefer-default-export */
import getTranslator from '@/app/i18n';
import prisma from '@/util/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Creates a note from the text provided in the request body
 * @param request The request containing form data of the shape {@link SavePOSTRequestBody}
 * @returns A Response with JSON containing created note or an object containing an error message
 */
export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    if (!body.text) {
      // TODO use session to get user language for error messages
      const { t } = await getTranslator('en', 'errors');
      return NextResponse.json({ note: undefined, error: t('invalid-note') });
    }
    const validText = z.string().min(20).max(300);
    const { text: rawInput } = body;
    const result = validText.safeParse(rawInput);
    if (!result.success) {
      const { message } = fromZodError(result.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: text } = result;
    const createdNote = await prisma.note.create({
      data: {
        text,
      },
    });
    return NextResponse.json({ note: createdNote, error: undefined });
  } catch (e) {
    return NextResponse.json({ note: undefined, error: (e as unknown as Error).message });
  }
}
