import prisma from '@/util/db';
import { Prisma } from '@prisma/client';

export interface GetNotesResult {
  /** The array of notes returned by the query */
  notes:({ text_json: string } & Prisma.noteGetPayload<{ include: {
    tags: true
  } }>)[];
  /** The number of remaining notes in later pages */
  remaining: number;
}

/**
 * Queries the database for notes, optionally using cursor-based pagination.
 * @param {number} cursor The note id from which to load the next page
 * @returns {object} {@link GetNotesResult}
 */
export default async function getNotesByCursor(cursor?: number): Promise<GetNotesResult> {
  const notes = await prisma.note.findMany({
    take: +process.env.NEXT_PUBLIC_OPTION_NOTES_PER_PAGE,
    skip: cursor == null ? 0 : 1,
    cursor: cursor == null ? undefined : {
      id: cursor,
    },
    include: {
      tags: true,
    },
    orderBy: { id: 'desc' },
  });
  const remaining = await prisma.note.count({
    where: {
      id: notes?.length > 0 ? { lt: notes[notes.length - 1].id } : undefined,
    },
    orderBy: { id: 'desc' },
  });
  return { notes: notes.map((n) => ({ ...n, text_json: JSON.stringify(n.text_json) })), remaining };
}
