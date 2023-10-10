'use client'
import React, { useContext } from 'react';
import Link from 'next/link';
import { Prisma } from '@prisma/client';
import prisma from '@/util/db';
import useTranslation from '@/app/i18n';
import { LanguageContext } from '@/util/LanguageContext/client'

/**
 * The required props for {@link Notes}
 */
type NoteProps = {
  notes: Prisma.Result<typeof prisma.note, { include: { tag: true, } }, 'findMany'>,
  firstPage: boolean,
  remaining: number,
} & Partial<NotePropsDefaults>;

/** The optional props for {@link Notes} */
type NotePropsDefaults = {
  next: number
};

/**
 * Renders a list of Notes
 * @component
 */
export default async function Notes({
  notes, firstPage, remaining, next,
}: NoteProps) {
  const lng = useContext(LanguageContext);
  const { t } = await useTranslation(lng, 'notes');

  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-3 gap-4 content-start">
        <div className="mx-auto col-span-3">
          <h1 className="first-letter:capitalize">{t('heading')}</h1>
        </div>
        {notes && (
        <>
          {notes
            .map(({ id, text, tag: tags }) => (
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
