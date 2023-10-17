import getNotesByCursor from '@/app/api/[cursor]/getNotesByCursor';
import { createServerContext } from 'react';

type NotesContext = {
  notes: Awaited<ReturnType<typeof getNotesByCursor>>['notes'];
  remaining: Awaited<ReturnType<typeof getNotesByCursor>>['remaining']
};

export default createServerContext<NotesContext>('notesContext', { notes: [], remaining: 0 });
