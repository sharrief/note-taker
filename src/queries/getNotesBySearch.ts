import getConnection from '@/util/db/postgres';
import { sql } from '@vercel/postgres';
import getTranslations from '@/util/getTranslations';
import { z } from 'zod';
import searchQueryString from '@/queries/getNotesBySearch.queryString';

type SearchRow = {
  id: number,
  userId: number,
  text: string,
  text_json: string,
  text_tsvector: string,
  rank: number
};

export type SearchNotesResults =
  /** The array of notes returned by the query */
  SearchRow[];
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

  let rows: SearchRow[] = [];
  /**
   * Prisma doesn't support full-text query on postgres
   * so we have to use native postgres driver for full-text queries.
   * BUT!!!!
   * @vercel/postgres uses neondb which uses websockets
   * which I AM NOT ABOUT TO SETUP for local dev for this project
   * See https://gal.hagever.com/posts/running-vercel-postgres-locally
   * So I'll use pg for local dev and vercel's stuff for prod
   * */
  if (process.env.VERCEL_ENV) {
    ({ rows } = await sql<SearchRow>`
      select id, note."userId", text, text_json, text_tsvector, ts_rank(text_tsvector, query) as rank
      from note, to_tsquery('english',${terms.trim().split(' ').join('&')}) query
      where note."userId" = ${userId} and query @@ text_tsvector 
      order by rank desc
      limit ${perPage}`);
  } else {
    const client = await getConnection();
    ({ rows } = await client.query<SearchRow>(
      searchQueryString,
      [terms.trim().split(' ').join('&'), perPage, userId],
    ));

    /** Must disconnect from pg connection pool */
    client.end();
  }

  /** Stringify the note markup and return the notes */
  return rows.map((n) => ({ ...n, text_json: JSON.stringify(n.text_json) }));
}
