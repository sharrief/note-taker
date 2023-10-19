import React from 'react';
import getNotesByCursor from '@/queries/getNotesByCursor';
import NotesContainer from '@/components/NotesContainer';
import NotesContext from '@/contexts/NotesContext';
import SearchContext from '@/contexts/SearchContext';

/**
 * @example
 * ```tsx
 * <NotesPage />
 * ```
 * Loads the notes from the api, and renders the {@link Notes}
 * passing along the notes and the cursor.
 *
 * @param {object} props
 */
export default async function NotesPage() {
  const { notes, remaining } = await getNotesByCursor();
  return (
    /** This page is a server component so notes & remaining don't change */
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotesContext.Provider value={{ notes, remaining }}>
      <SearchContext.Provider value="">
        <NotesContainer />
      </SearchContext.Provider>
    </NotesContext.Provider>
  );
}
