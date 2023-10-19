import prisma from '@/util/db';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export interface GetNotesResult {
  /** The array of notes returned by the query */
  notes:({ text_json: string } & Prisma.noteGetPayload<{}>)[];
  /** The number of remaining notes in later pages */
  remaining: number;
}

/**
 * Queries the database for notes, optionally using cursor-based pagination.
 * @param {number} id The id of the  user
 * @param {number} noteId The note id from which to load the next page
 * @returns {object} {@link GetNotesResult}
 */
export default async function getNotesByCursor(
  id: number,
  noteId?: number,
): Promise<GetNotesResult> {
  /** Validate and parse user id user input */
  const numberValidator = z.number();
  const parsedUserId = numberValidator.safeParse(+id);
  if (!parsedUserId.success) return { notes: [], remaining: 0 };
  const { data: userId } = parsedUserId;

  /** Validate and parse nodeId user input */
  let cursor: number | null = null;
  if (noteId) {
    const parsedCursor = numberValidator.safeParse(+noteId);
    if (parsedCursor.success) {
      cursor = parsedCursor.data;
    }
  }

  /** Query for the notes */
  const notes = await prisma.note.findMany({
    where: { userId },
    take: +process.env.NEXT_PUBLIC_OPTION_NOTES_PER_PAGE,
    skip: cursor == null ? 0 : 1,
    cursor: cursor == null ? undefined : {
      id: cursor,
    },
    orderBy: { id: 'desc' },
  });

  /** Query for count of notes in later pages */
  const remaining = await prisma.note.count({
    where: {
      id: notes?.length > 0 ? { lt: notes[notes.length - 1].id } : undefined,
      userId,
    },
    orderBy: { id: 'desc' },
  });

  /** Stringify the note markup and return the notes */
  return { notes: notes.map((n) => ({ ...n, text_json: JSON.stringify(n.text_json) })), remaining };
}
