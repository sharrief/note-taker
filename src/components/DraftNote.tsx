'use client';

import React from 'react';
import type { DraftState } from '@/app/hooks/useDraftNote';
import Alert from '@/components/Alert';
import TextArea from './TextArea';

export type DraftNoteProps = DraftState & {
  labels: {
    title: string;
    textPlaceholder: string
    save: string
    aria_saveNote: string
    discard: string
    aria_discardNote: string
  }
};

/**
 * Loads the language context to access locale labels.
 * Renders an text area with buttons to save or cancel.
 *
 * @param {object} props The state and handlers from the useDraftState hook.
 * @example
 * ```tsx
 * <DraftNote />
 * ```
 */
export default function DraftNote(props: DraftNoteProps) {
  const {
    text, setText, busy, alertType, alertMessage,
    canSave, onSave, canDiscard, onDiscard, canType, labels,
  } = props;
  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-4 gap-4 content-start">
        <h1 className="m-auto col-span-4 capitalize">{labels.title}</h1>
        <TextArea
          text={text}
          placeholder={labels.textPlaceholder}
          onChange={setText}
          disabled={!canType}
        />
        <div className="col-start-1 col-span-2 grid">
          <button
            type="button"
            aria-label={labels.aria_saveNote}
            className={`btn btn-success ${busy ? 'loading loading-spinner' : ''}`}
            disabled={!canSave}
            onClick={onSave}
          >
            {labels.save}
          </button>
        </div>
        <div className="col-end-5 col-span-2 grid">
          <button
            type="button"
            aria-label={labels.aria_discardNote}
            className="btn btn-warning"
            disabled={!canDiscard}
            onClick={onDiscard}
          >
            {labels.discard}
          </button>
        </div>
        <div className="col-span-4 mx-auto">
          <Alert message={alertMessage} type={alertType} />
        </div>
      </article>
    </div>
  );
}
