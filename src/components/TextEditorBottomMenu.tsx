import React from 'react';
import Alert from '@/components/Alert';
import useDraftNote from '@/hooks/useDraftNote';
import { useTranslations } from 'next-intl';
/**
 * The minimum characters required to save a draft note
 */
const min = +(process.env.NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH || 10);
/**
 * The minimum numbers of characters a draft note can be saved with
 */
const max = +(process.env.NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH || 100);

export interface TextEditorBottomMenuProps {
  id: number
}

export default function TextEditorBottomMenu({ id }: Partial<TextEditorBottomMenuProps>) {
  const t = useTranslations('draft');
  const {
    busy, canSave, onSave, canDiscard, onDiscard, alertMessage, alertType,
  } = useDraftNote(
    min,
    t('warn-minLength', { min }),
    max,
    t('warn-maxLength', { max }),
    t('save-success'),
    id,
  );

  return (
    <div className="w-full container">
      <div className="join">
        <button
          type="button"
          aria-label={t('aria-saveNote')}
          className={`btn btn-success join-item ${busy ? 'loading loading-spinner' : ''}`}
          disabled={!canSave}
          onClick={onSave}
        >
          {t('save')}
        </button>
        <button
          type="button"
          aria-label={t('aria_discardNote')}
          className="btn btn-warning join-item"
          disabled={!canDiscard}
          onClick={onDiscard}
        >
          {t('discard')}
        </button>
      </div>

      {alertMessage
      && (
        <div className="mt-2">
          <Alert message={alertMessage} type={alertType} />
        </div>
      )}
    </div>
  );
}
