import React from 'react';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import getNotesByCursor from '@/queries/getNotesByCursor';
import NotesContainer from '@/components/NotesContainer';
import NotesContext from '@/contexts/NotesContext';

/**
 * The props for NotesCursorPage
 * @property {object} params The URL path parameter for this page
 */
export interface NotesCursorPageProps {
  params: {
    /** The id of the note to be used as a cursor during pagination  */
    cursor: string
  }
}

/**
 * @example
 * ```tsx
 * <NotesCursorPage params={ cursor: 1 } />
 * ```
 * Extracts a cursor param from the path.
 * Parses the cursor to ensure its a number.
 *
 * If the cursor is not valid, the page redirects to the Notes page.
 *
 * If the cursor is valid, the page loads the notes
 * from the api, and renders the {@link Notes}
 * passing along the notes and the cursor.
 *
 * @param {object} props
 */
export default async function NotesCursorPage(
  { params }: NotesCursorPageProps,
) {
  const cursorValidator = z.number();
  const { cursor: userInput } = params;
  const parsedInput = cursorValidator.safeParse(+userInput);
  if (!parsedInput.success) {
    return redirect('/notes');
  }
  const { data: cursor } = parsedInput;
  const notesData = await getNotesByCursor(cursor);
  return (
    /** This page is a server component so notes & remaining don't change */
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotesContext.Provider value={notesData}>
      <NotesContainer />
    </NotesContext.Provider>
  );
}
