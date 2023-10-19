import getNotesByCursor from '@/queries/getNotesByCursor';
import { createServerContext } from 'react';

/**
 * @property {array} notes The array of notes
 * @property {number} remaining The number of notes in later pages
 */
export type NotesDataContext = {
  notes: Awaited<ReturnType<typeof getNotesByCursor>>['notes'];
  remaining: Awaited<ReturnType<typeof getNotesByCursor>>['remaining']
};
/** The context containing the notes.
*/
export default createServerContext<NotesDataContext>('notesContext', { notes: [], remaining: 0 });
