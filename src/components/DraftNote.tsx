'use client';

import { env } from 'process';
import React, { useContext } from 'react';
import useDraftNote from '@/app/hooks/useDraftNote';
import Alert from '@/components/Alert';
import useTranslation from '@/app/i18n/client';
import LanguageContext from '@/app/i18n/LanguageContext/client';
import TextArea from './TextArea';

/**
 * The minimum characters required to save a draft note
 */
const min = +(env.OPTION_NOTE_MIN_LENGTH || 20);
/**
 * The minimum numbers of characters a draft note can be saved with
 */
const max = +(env.OPTION_NOTE_MAX_LENGTH || 300);

/**
 * Loads the language context to access locale labels.
 * Renders an text area with buttons to save or cancel.
 *
 * Uses the {@link useDraftNote} hook to manage state and interactivity.
 * @example
 * ```tsx
 * <DraftNote />
 * ```
 */
export default function DraftNote() {
  const lng = useContext(LanguageContext);
  const { t } = useTranslation(lng, 'draft');
  const {
    text, setText, busy, alertType, alertMessage,
    canSave, onSave, canDiscard, onDiscard, canType,
  } = useDraftNote(min, t('warn-minLength', { min }), max, t('warn-maxLength', { max }));
  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-4 gap-4 content-start">
        <h1 className="m-auto col-span-4 capitalize">{t('draftNote')}</h1>
        <TextArea
          text={text}
          placeholder={t('typeHere')}
          onChange={setText}
          disabled={!canType}
        />
        <div className="col-start-1 col-span-2 grid">
          <button
            type="button"
            aria-label={t('aria-saveNote')}
            className={`btn btn-success ${busy ? 'loading loading-spinner' : ''}`}
            disabled={!canSave}
            onClick={onSave}
          >
            {t('save')}
          </button>
        </div>
        <div className="col-end-5 col-span-2 grid">
          <button
            type="button"
            aria-label={t('aria-discardNote')}
            className="btn btn-warning"
            disabled={!canDiscard}
            onClick={onDiscard}
          >
            {t('discard')}
          </button>
        </div>
        <div className="col-span-4 mx-auto">
          <Alert message={alertMessage} type={alertType} />
        </div>
      </article>
    </div>
  );
}
