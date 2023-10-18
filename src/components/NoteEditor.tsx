'use client';

import React, { useContext } from 'react';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import TextEditorMenuBar from '@/components/TextEditorMenuBar';
import TextEditorBottomMenu from '@/components/TextEditorBottomMenu';
import useTranslation from '@/app/i18n/client';
import LanguageContext from '@/app/i18n/LanguageContext/client';

export interface DraftNoteProps {
  content: string;
  id: number;
}

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
export default function NoteEditor({ content: initialContent, id }: Partial<DraftNoteProps>) {
  const extensions = [StarterKit, CharacterCount];
  const lng = useContext(LanguageContext);
  const { t } = useTranslation(lng, 'draft');
  let content = t('typeHere');
  if (initialContent) content = initialContent;

  return (
    <div className="container mx-auto">
      <article className="prose mx-auto min-h-screen px-11 py-24 grid grid-cols-4 gap-4 content-start">
        <h1 className="m-auto col-span-4 capitalize">{t('draftNote')}</h1>
        <div className="col-span-4">
          <div className="border textarea border-yellow-200 rounded-lg">
            <EditorProvider
              extensions={extensions}
              content={content}
              slotBefore={<TextEditorMenuBar />}
              slotAfter={(
                <TextEditorBottomMenu id={id} />
              )}
              // eslint-disable-next-line react/no-children-prop
              children={undefined}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
