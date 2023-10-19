import getConnection from '@/util/db/postgres';
import { Prisma } from '@prisma/client';
import getTranslations from '@/util/getTranslations';
import { z } from 'zod';
import searchQueryString from '@/queries/getNotesBySearch.queryString';

type NoteRankAndVector = { rank: number, text_tsvector: string };

export type SearchNotesResults =
  /** The array of notes returned by the query */
  ({ text_json: string } & NoteRankAndVector & Prisma.noteGetPayload<{}>)[];
  /** The number of remaining notes in later pages */

/**
 *
 * @param {number} id The id of the user
 * @param {string} search The text to search notes for
 * @returns {object} Object containing the notes array,
 * with ranking information included in each note
 */
export default async function getNotesBySearch(
  id: number,
  search: string,
): Promise<SearchNotesResults> {
  /** Throw if search is not a string */
  const stringValidator = z.string();
  const parsedSearch = stringValidator.safeParse(search);
  if (!parsedSearch.success) {
    const t = getTranslations('errors');
    throw new Error(t('invalid-search'));
  }
  const { data: terms } = parsedSearch;

  /** Validate and parse user id */
  const userIdValidator = z.number();
  const parsedUserId = userIdValidator.safeParse(+id);
  if (!parsedUserId.success) return [];
  const { data: userId } = parsedUserId;

  /** Run full-text query for notes */
  const perPage = +process.env.NEXT_PUBLIC_OPTION_NOTES_PER_PAGE ?? 6;
  const client = await getConnection();
  /** Prisma doesn't support full-text query on postgres
   * so we use the pg module to query.
   */
  const { rows } = await client.query<{
    id: number,
    userId: number,
    text: string,
    text_json: string,
    text_tsvector: string,
    rank: number
  }>(searchQueryString, [terms.trim().split(' ').join('&'), perPage, userId]);

  /** Must disconnect from pg connection pool */
  client.end();

  /** Stringify the note markup and return the notes */
  return rows.map((n) => ({ ...n, text_json: JSON.stringify(n.text_json) }));
}
