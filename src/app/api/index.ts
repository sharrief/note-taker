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

/**
 * Deletes a note using the API
 * @example
 * ```
 * const { error, success } = await delete(100);
 * ```
 * @param {number} id The id of the note to delete
 * @returns {object} The response from the API
 */
export async function burn(
  id: number,
): Promise<{ error?: string, success: boolean }> {
  const body = { id };
  const res = (await post('/api/burn', body));
  if (res.status !== 200) {
    return { success: false, error: res.statusText };
  }
  const { error, success } = (await res.json());
  return { error, success };
}

/**
 * Registers a new user account
 * @example
 * ```
 * const { error, message } = await signUp('johnSmith', 'a87sf$@#rqwERW#$');
 * ```
 * @param {string} username The username of the user to register
 * @param {string} password The desired password of the user to register
 * @returns {object} The error and/or message from the registration service
 */
export async function signUp(
  username: string,
  password: string,
): Promise<{ error?: string, message?: string }> {
  const body = { username, password };
  const res = (await post('/api/signup', body));
  if (res.status !== 200) {
    return { message: undefined, error: res.statusText };
  }
  const { error, message } = (await res.json());
  return { error, message };
}
