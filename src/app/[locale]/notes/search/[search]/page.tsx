import React from 'react';
import getNotesBySearch from '@/queries/getNotesBySearch';
import { z } from 'zod';
import Alert from '@/components/Alert';

import NotesContext from '@/contexts/NotesContext';
import SearchContext from '@/contexts/SearchContext';
import NotesContainer from '@/components/NotesContainer';
import { auth } from '@/util/auth';
import { GetNotesResult } from '@/queries/getNotesByCursor';

/**
 * The props for NotesSearchPage
 * @property {object} params The URL path parameter for this page
 */
export interface NotesSearchPageProps {
  params: {
    /** The search string  */
    search: string
  }
}

/**
 * @example
 * ```tsx
 * <NotesSearchPage />
 * ```
 * Loads the notes that match the search from the api, and renders the {@link Notes}
 *
 * @param {object} props
 */
export default async function NotesSearchPage(
  { params }: NotesSearchPageProps,
) {
  const session = await auth();
  let notes: GetNotesResult['notes'] = [];
  let search = '';
  const remaining = 0;
  if (session?.user.id) {
    const searchValidator = z.string();
    const { search: userInput } = params;
    const parsedSearch = searchValidator.safeParse(userInput);
    if (!parsedSearch.success) {
      return <Alert message={parsedSearch.error.message} type="error" />;
    }
    search = decodeURIComponent(parsedSearch.data);
    notes = await getNotesBySearch(session.user.id, search);
  }
  return (
    /** This page is a server component so props don't change */
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotesContext.Provider value={{ notes, remaining }}>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <SearchContext.Provider value={search}>
        <NotesContainer />
      </SearchContext.Provider>
    </NotesContext.Provider>
  );
}
