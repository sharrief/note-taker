'use client';

import React, { useContext } from 'react';
import useDraftNote from '@/app/[lng]/draft/useDraftNote';
import Alert from '@/components/Alert';
import useTranslation from '@/app/i18n/client';
import TextArea from './TextArea';
import { LanguageContext } from '@/util/LanguageContext/client';

/**
 * Renders an draft note with buttons to save or cancel
 * @component
 */
export default function DraftNote() {
  const {
    text, setText, busy, alert,
    canSave, onSave, canCancel, onCancel,
  } = useDraftNote();
  const lng = useContext(LanguageContext);
  const { t } = useTranslation(lng, 'draft');
  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-4 gap-4 content-start">
        <h1 className="m-auto col-span-4 capitalize">{t('draftNote')}</h1>
        <TextArea text={text} placeholder={t('typeHere')} onChange={setText} />
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
            aria-label={t('aria-cancelNote')}
            className="btn btn-warning"
            disabled={!canCancel}
            onClick={onCancel}
          >
            {t('cancel')}
          </button>
        </div>
        <div className="col-span-4 mx-auto" data-testid="alert">
          <Alert alert={alert} />
        </div>
      </article>
    </div>
  );
}
