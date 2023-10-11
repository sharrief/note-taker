'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import useTranslation from '@/app/i18n/client';
import LanguageContext from '@/app/i18n/LanguageContext/client';
import { GetNotesResult } from '@/app/hooks/getNotes';
import Alert from './Alert';

/**
 * The required props for {@link Notes}.
 */
export type NoteProps = {
  /** The array of notes to render. */
  notes: GetNotesResult['notes'],
  /** Whether this list of notes represents the first page.
   * Disables the "previous" pagination button if so.
   */
  firstPage: boolean,
  /** The count of notes remaining. */
  remaining: number,
} & Partial<NotePropsDefaults>;

/** The optional props for {@link Notes} */
export type NotePropsDefaults = {
  /** The note id representing the starting cursor for the next page of notes. */
  next: number
};

/**
 * Renders a list of Notes, pagination buttons and a button to create a new note.
 * @param {object} props
 */
export default function Notes({
  notes, firstPage, remaining, next,
}: NoteProps) {
  const lng = useContext(LanguageContext); // TODO move labels to props
  const { t } = useTranslation(lng, 'notes');

  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-3 gap-4 content-start">
        <div className="mx-auto col-span-3">
          <h1 className="first-letter:capitalize">{t('heading')}</h1>
        </div>
        {notes.length < 1 && <Alert message={t('noNotes')} type="info" />}
        {notes && (
        <>
          {notes
            .map(({ id, text, tags }) => (
              <div
                className="btn bg-yellow-200 content-between text-left text-base lowercase justify-start cursor-pointer text-black rounded px-2 overflow-hidden"
                style={{ height: '150px' }}
                key={id}
              >
                <div className="line-clamp-4">{text}</div>
                <div>{tags.map(({ name, id: tagId }) => <div className="badge" key={tagId}>{name}</div>)}</div>
              </div>
            ))}

        </>
        )}
        <div className="mx-auto col-span-3 first-letter:capitalize">
          <em>
            {t('remaining', { remaining: `${remaining}` || t('noneRemaining') })}
          </em>
        </div>
        <div className="col-span-3 mx-auto grid grid-cols-3 gap-3">
          <Link className={`btn ${firstPage ? 'btn-disabled' : ''}`} href="/notes">
            {t('prev')}
          </Link>
          <a href="/draft">
            <button type="button" className="btn btn-info">{t('newNote')}</button>
          </a>
          <Link
            className={`btn ${next == null ? 'btn-disabled' : ''}`}
            href={`/notes/${next}`}
          >
            {t('next')}
          </Link>
        </div>
      </article>
    </div>
  );
}
