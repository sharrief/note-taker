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
 * Delete a note with the given id
 * @param request The request containing form data of the shape {@link SavePOSTRequestBody}
 * @returns A Response with JSON containing a success flag
 */
export async function POST(
  request: NextRequest,
) {
  try {
    /** Load the translation labels */
    const errors = getTranslations('errors');

    /** Get the user from the session */
    const session = await getServerSession(config);
    if (!session?.user) return NextResponse.json({ success: false, error: errors('no-session') });
    const userId = +session.user.id;

    /** Ensure the required params were provided */
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: errors('invalid-id') });
    }

    /** Parse the edited note id */
    const validId = z.number();
    const parsedId = validId.safeParse(+body.id);
    if (!parsedId.success) {
      const { message } = fromZodError(parsedId.error);
      return NextResponse.json({ success: false, error: message });
    }
    const { data: id } = parsedId;

    /** Delete the edited note */
    const deleteResult = await prisma.note.delete({
      where: { id, userId },
    });

    /** Update cached notes */
    revalidatePath('/notes');

    /** Return a true success flag */
    return NextResponse.json({ note: deleteResult, success: true, error: undefined });
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as unknown as Error).message });
  }
}
