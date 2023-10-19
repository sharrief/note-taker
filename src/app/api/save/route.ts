/* eslint-disable import/prefer-default-export */
import prisma from '@/util/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import getTranslations from '@/util/getTranslations';
import { getServerSession } from 'next-auth/next';
import { config } from '@/util/auth';
import { revalidatePath } from 'next/cache';
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
    /** Load the translation labels */
    const errors = getTranslations('errors');

    /** Get the user from the session */
    const session = await getServerSession(config);
    if (!session?.user) return NextResponse.json({ note: undefined, error: errors('no-session') });
    const userId = +session.user.id;

    /** Ensure the required params were provided */
    const body = await request.json();
    if (!body.text || !body.text_json) {
      return NextResponse.json({ note: undefined, error: errors('invalid-note') });
    }

    /** Parse the note text param */
    const validText = z.string().min(min).max(max);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const result = validText.safeParse(body.text);
    if (!result.success) {
      const { message } = fromZodError(result.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: text } = result;

    /** Parse the note text_json param */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const text_json = JSON.parse(body.text_json);

    /** Persist the note for the user */
    const createdNote = await prisma.note.create({
      data: {
        userId,
        text,
        text_json,
      },
    });

    /** Update cached notes */
    revalidatePath('/notes');

    /** Return the created note upon success */
    return NextResponse.json({ note: createdNote, error: undefined });
  } catch (e) {
    return NextResponse.json({ note: undefined, error: (e as unknown as Error).message });
  }
}
