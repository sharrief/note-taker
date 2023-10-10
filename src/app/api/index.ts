import { SavePOSTResponse } from '@/app/api/save/route';
import { Prisma } from '@prisma/client';

/**
 *
 * @param {string} endpoint The endpoint to POST to
 * @param {object} body The JSON.stringifyable data to POST
 * @returns The result of the POST request to the endpoint
 */
const post = (endpoint: string, body: object) => fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/**
 * Saves the text to a new note using the API
 * @example
 * ```
 * const { error, note } = await save('New note text content');
 * ```
 * @param {string} text The text to save to a new note
 * @returns {object} The response from the API
 */
export async function save(
  text: string,
): Promise<{ error?: string, note?: Prisma.noteGetPayload<{}> }> {
  const body = { text };
  const res = (await post('/api/save', body));
  const { error, note } = (await res.json()) as SavePOSTResponse;
  return { error, note };
}

/** @ignore */
export const test = {
  post,
};
