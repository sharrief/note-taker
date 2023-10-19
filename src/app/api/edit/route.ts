/* eslint-disable import/prefer-default-export */
import prisma from '@/util/db';
import getTranslations from '@/util/getTranslations';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { getServerSession } from 'next-auth/next';
import { config } from '@/util/auth';
import { revalidatePath } from 'next/cache';

/**
 * Edits a note with the given id from the text and json provided in the request body
 * @param request The request containing form data of the shape {@link SavePOSTRequestBody}
 * @returns A Response with JSON containing updated note or an object containing an error message
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
    if (!body.id || !body.text || !body.text_json) {
      return NextResponse.json({ note: undefined, error: errors('invalid-note') });
    }

    /** Parse the edited note id */
    const validId = z.number();
    const parsedId = validId.safeParse(+body.id);
    if (!parsedId.success) {
      const { message } = fromZodError(parsedId.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: id } = parsedId;

    /** Parse the note text content */
    const validText = z.string().max(500);
    const parsedText = validText.safeParse(body.text);
    if (!parsedText.success) {
      const { message } = fromZodError(parsedText.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: text } = parsedText;

    /** Parse the note markup */
    const validJSON = z.string();
    const parsedJSON = validJSON.safeParse(body.text_json);
    if (!parsedJSON.success) {
      const { message } = fromZodError(parsedJSON.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const text_json = JSON.parse(parsedJSON.data);

    /** Update the edited note */
    const updatedNote = await prisma.note.update({
      where: { id, userId },
      data: {
        text,
        text_json,
      },
    });

    /** Update cached notes */
    revalidatePath('/notes');

    /** Return the edited note upon success */
    return NextResponse.json({ note: updatedNote, error: undefined });
  } catch (e) {
    return NextResponse.json({ note: undefined, error: (e as unknown as Error).message });
  }
}
