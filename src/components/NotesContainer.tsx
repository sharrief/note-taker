'use client';

import React, { useContext } from 'react';
import useTranslation from '@/app/i18n/client';
import LanguageContext from '@/app/i18n/LanguageContext/client';
import NotesContext from '@/app/contexts/NotesContext';
import Notes from '@/components/Notes';
import SearchContext from '@/app/contexts/SearchContext';
import SearchBar from '@/components/SearchBar';
import useNotesSearch from '@/app/hooks/useNotesSearch';

export default function NotesContainer() {
  const lng = useContext(LanguageContext);
  const { t } = useTranslation(lng, 'notes');

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
