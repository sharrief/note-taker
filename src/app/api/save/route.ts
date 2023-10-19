/* eslint-disable import/prefer-default-export */
import prisma from '@/util/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import getTranslations from '@/util/getTranslations';
/**
 * The minimum characters required to save a draft note
 */
const min = +(process.env.NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH || 10);
/**
 * The minimum numbers of characters a draft note can be saved with
 */
const max = +(process.env.NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH || 100);

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
    if (!body.text || !body.text_json) {
      // TODO use session to get user language for error messages
      const t = getTranslations('errors');
      return NextResponse.json({ note: undefined, error: t('invalid-note') });
    }
    const validText = z.string().min(min).max(max);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { text: rawInput, text_json: rawJson } = body;
    const result = validText.safeParse(rawInput);
    if (!result.success) {
      const { message } = fromZodError(result.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: text } = result;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const text_json = JSON.parse(rawJson);
    const createdNote = await prisma.note.create({
      data: {
        text,
        text_json,
      },
    });
    return NextResponse.json({ note: createdNote, error: undefined });
  } catch (e) {
    return NextResponse.json({ note: undefined, error: (e as unknown as Error).message });
  }
}
