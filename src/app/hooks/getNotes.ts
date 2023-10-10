import prisma from '@/util/db';
import { Prisma } from '@prisma/client';

/**
 * @property {array} notes The array of notes returned by the query
 * @property {number} remaining The number of remaining notes in later pages
 */
export interface GetNotesResult {
  notes: Prisma.noteGetPayload<{ include: {
    tag: true
  } }>[];
  remaining: number;
}

/**
 * Queries the database for notes, optionally using cursor-based pagination.
 * @param {number} cursor The note id from which to load the next page
 * @returns {object} {@link GetNotesResult}
 */
export default async function getNotes(cursor?: number): Promise<GetNotesResult> {
  const notes = await prisma.note.findMany({
    take: 6,
    skip: cursor == null ? 0 : 1,
    cursor: cursor == null ? undefined : {
      id: cursor,
    },
    include: {
      tag: true,
    },
    where: {
      userId: 1,
    },
    orderBy: { id: 'asc' },
  });
  const lastId = notes[notes.length - 1].id;
  const remaining = await prisma.note.count({
    where: {
      id: lastId ? { gt: notes[notes.length - 1].id } : undefined,
      userId: 1,
    },
    orderBy: { id: 'asc' },
  });
  return { notes, remaining };
}
