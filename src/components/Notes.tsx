'use client';

import React from 'react';
import Link from 'next/link';
import { GetNotesResult } from '@/queries/getNotesByCursor';
import StarterKit from '@tiptap/starter-kit';
import { EditorProvider, JSONContent, generateHTML } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
} & Partial<NotePropsDefaults>;

/** The optional props for {@link Notes} */
export type NotePropsDefaults = {
  /** The note id representing the starting cursor for the next page of notes. */
  next: number
  /** The count of notes remaining. */
  remaining: number,
};

/**
 * Renders a list of Notes, pagination buttons and a button to create a new note.
 * @param {object} props
 */
export default function Notes({
  notes, firstPage, remaining, next,
}: NoteProps) {
  const t = useTranslations('notes');
  const extensions = [StarterKit];
  const router = useRouter();
  return (
    <>
      {notes.length < 1 && <Alert message={t('noNotes')} type="info" />}
      {notes && (
        <>
          {notes
            .map(({ id, text_json, tags }) => (
              <button
                type="button"
                className="btn font-normal border-yellow-300 col-span-3 md:col-span-1 content-between text-left text-base lowercase justify-start cursor-pointer rounded px-2 overflow-hidden"
                style={{ height: '300px' }}
                key={id}
                onClick={() => router.push(`/notes/edit/${id}`)}
              >
                <div className="line-clamp-4">
                  <EditorProvider
                    editable={false}
                    extensions={extensions}
                    content={
                      generateHTML(
                        JSON.parse(text_json) as unknown as JSONContent,
                        extensions,
                      )
                    }
                    // eslint-disable-next-line react/no-children-prop
                    children={undefined}
                  />

                </div>
                <div>{tags.map(({ name, id: tagId }) => <div className="badge" key={tagId}>{name}</div>)}</div>
              </button>
            ))}

        </>
      )}
      <div className="mx-auto col-span-3 first-letter:capitalize">
        <em>
          {t('remaining', { remaining: `${remaining}` || t('noneRemaining') })}
        </em>
      </div>
      <div className="col-span-3 mx-auto join grid grid-cols-3">
        <Link className={`btn join-item ${firstPage ? 'btn-disabled' : ''}`} href="/notes">
          {t('prev')}
        </Link>
        <a href="/draft">
          <button type="button" className="btn join-item btn-info">{t('newNote')}</button>
        </a>
        <Link
          className={`btn join-item ${next == null ? 'btn-disabled' : ''}`}
          href={`/notes/page/${next}`}
        >
          {t('next')}
        </Link>
      </div>
    </>
  );
}
