import { Prisma } from '@prisma/client';
import post from '@/util/post';
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
  text_json: string,
): Promise<{ error?: string, note?: Prisma.noteGetPayload<{}> }> {
  const body = { text, text_json };
  const res = (await post('/api/save', body));
  if (res.status !== 200) {
    return { note: undefined, error: res.statusText };
  }
  const { error, note } = (await res.json());
  return { error, note };
}

/**
 * Updates a note using the API
 * @example
 * ```
 * const { error, note } = await edit(100, 'Updated note text content');
 * ```
 * @param {number} id The id of the note to update
 * @param {string} text The text to save to a new note
 * @returns {object} The response from the API
 */
export async function edit(
  id: number,
  text: string,
  text_json: string,
): Promise<{ error?: string, note?: Prisma.noteGetPayload<{}> }> {
  const body = { id, text, text_json };
  const res = (await post('/api/edit', body));
  if (res.status !== 200) {
    return { note: undefined, error: res.statusText };
  }
  const { error, note } = (await res.json());
  return { error, note };
}
