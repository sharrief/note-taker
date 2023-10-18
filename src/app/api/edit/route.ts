/* eslint-disable import/prefer-default-export */
import getTranslator from '@/app/i18n';
import prisma from '@/util/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Edits a note with the given id from the text and json provided in the request body
 * @param request The request containing form data of the shape {@link SavePOSTRequestBody}
 * @returns A Response with JSON containing updated note or an object containing an error message
 */
export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    if (!body.id || !body.text || !body.text_json) {
      // TODO use session to get user language for error messages
      const { t } = await getTranslator('en', 'errors');
      return NextResponse.json({ note: undefined, error: t('invalid-note') });
    }
    const { id: rawId, text: rawInput, text_json: rawJson } = body;
    const validId = z.number();
    const parsedId = validId.safeParse(+rawId);
    if (!parsedId.success) {
      const { message } = fromZodError(parsedId.error);
      return NextResponse.json({ note: undefined, error: message });
    }

    const validText = z.string().max(500);
    const parsedText = validText.safeParse(rawInput);
    if (!parsedText.success) {
      const { message } = fromZodError(parsedText.error);
      return NextResponse.json({ note: undefined, error: message });
    }

    const validJSON = z.string();
    const parsedJSON = validJSON.safeParse(rawJson);
    if (!parsedJSON.success) {
      const { message } = fromZodError(parsedJSON.error);
      return NextResponse.json({ note: undefined, error: message });
    }

    const { data: text } = parsedText;
    const createdNote = await prisma.note.update({
      where: { id: parsedId.data },
      data: {
        text,
        text_json: JSON.parse(parsedJSON.data),
      },
    });
    return NextResponse.json({ note: createdNote, error: undefined });
  } catch (e) {
    return NextResponse.json({ note: undefined, error: (e as unknown as Error).message });
  }
}
