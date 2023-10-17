import getNotesByCursor from '@/app/api/[cursor]/getNotesByCursor';
import { createServerContext } from 'react';

/**
 * @property {array} notes The array of notes
 * @property {number} remaining The number of notes in later pages
 */
export type NotesContext = {
  notes: Awaited<ReturnType<typeof getNotesByCursor>>['notes'];
  remaining: Awaited<ReturnType<typeof getNotesByCursor>>['remaining']
};
/** The context containing the notes.
*/
export default createServerContext<NotesContext>('notesContext', { notes: [], remaining: 0 });
