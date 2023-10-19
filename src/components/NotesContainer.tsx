'use client';

import React, { useContext } from 'react';
import NotesContext from '@/contexts/NotesContext';
import Notes from '@/components/Notes';
import SearchContext from '@/contexts/SearchContext';
import SearchBar from '@/components/SearchBar';
import useNotesSearch from '@/hooks/useNotesSearch';
import { useTranslations } from 'next-intl';

/** The container that loads the contexts for Notes relates components
 */
export default function NotesContainer() {
  const t = useTranslations('notes');

  const { notes, remaining } = useContext(NotesContext);
  const next = remaining ? notes[notes.length - 1]?.id : undefined;

  const initialSearch = useContext(SearchContext);
  const {
    search, busy, onChange, onSubmit,
  } = useNotesSearch(initialSearch);

  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-3 gap-4 content-start">
        <div className="mx-auto col-span-3">
          <h1 className="first-letter:capitalize">{t('heading')}</h1>
        </div>
        <div className="col-span-3">
          <SearchBar
            placeholder={t('searchNotes')}
            buttonText={t('search')}
            busyText={t('searching')}
            search={search}
            busy={busy}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
        <Notes
          notes={notes}
          remaining={remaining}
          next={next}
          firstPage
        />
      </article>
    </div>
  );
}
