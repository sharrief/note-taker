import getConnection from '@/util/db/postgres';
import getTranslator from '@/app/i18n';
import prisma from '@/util/db';
import { Prisma } from '@prisma/client';

type NoteRankAndVector = { rank: number, text_tsvector: string };

export type SearchNotesResults =
  /** The array of notes returned by the query */
  ({ text_json: string } & NoteRankAndVector & Prisma.noteGetPayload<{ include: {
    tags: true
  } }>)[];
  /** The number of remaining notes in later pages */

/**
 *
 * @param search The text to search notes for
 * @returns {object} Object containing the notes array,
 * with ranking information included in each note
 */
export default async function getNotesBySearch(search: string): Promise<SearchNotesResults> {
  if (typeof search !== 'string') {
    const { t } = await getTranslator('en', 'errors');
    throw new Error(t('invalid-search'));
  }
  const perPage = +process.env.NEXT_PUBLIC_OPTION_NOTES_PER_PAGE ?? 6;
  const client = await getConnection();
  const { rows } = await client.query<{ id: number, text_tsvector: string, rank: number }>(`select id, text_tsvector, ts_rank(text_tsvector, query) as rank
  from note, to_tsquery('english',$1) query
  where query @@ text_tsvector
  limit $2
  `, [search.trim().split(' ').join('&'), perPage]);
  client.end();
  const notes = await prisma.note.findMany({
    take: perPage,
    where: { id: { in: rows.map(({ id }) => id) } },
    include: {
      tags: true,
    },
  });
  const notesWithRanks = notes
    .map((note) => { // O(notes.len * rows.len)
      const { id } = note;
      const result = rows.find((r) => r.id === id);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { text_tsvector = '', rank = 0 } = result ?? {};
      return {
        ...note, text_tsvector, rank, text_json: JSON.stringify(note.text_json),
      };
    })
    .sort((a, b) => b.rank - a.rank);
  return notesWithRanks;
}
