'use client';

import React, { useContext } from 'react';
import { env } from 'process';
import useTranslation from '@/app/i18n/client';
import LanguageContext from '@/app/i18n/LanguageContext/client';
import DraftNote, { DraftNoteProps } from '@/components/DraftNote';
import useDraftNote from '@/app/hooks/useDraftNote';

/**
 * The minimum characters required to save a draft note
 */
const min = +(env.OPTION_NOTE_MIN_LENGTH || 20);
/**
 * The minimum numbers of characters a draft note can be saved with
 */
const max = +(env.OPTION_NOTE_MAX_LENGTH || 300);

/**
 * @example
 * ```tsx
 * <DraftNotePage />
 * ```
 * Renders a {@link DraftNote}
 * */
export default function DraftNotePage() {
  const lng = useContext(LanguageContext);
  const { t } = useTranslation(lng, 'draft');
  const labels: DraftNoteProps['labels'] = {
    title: t('draftNote'),
    textPlaceholder: t('typeHere'),
    save: t('save'),
    aria_saveNote: t('aria-saveNote'),
    discard: t('discard'),
    aria_discardNote: t('aria-discardNote'),
  };
  const props = useDraftNote(
    min,
    t('warn-minLength', { min }),
    max,
    t('warn-maxLength', { max }),
    t('save-success'),
  );
  const {
    text, setText, busy, alertType, alertMessage,
    canSave, onSave, canDiscard, onDiscard, canType,
  } = props;
  // TODO break down component into smaller parts when integrating editor
  return (
    <DraftNote
      text={text}
      setText={setText}
      busy={busy}
      alertType={alertType}
      alertMessage={alertMessage}
      canSave={canSave}
      onSave={onSave}
      canDiscard={canDiscard}
      onDiscard={onDiscard}
      canType={canType}
      labels={labels}
    />
  );
}
