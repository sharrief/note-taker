import React from 'react';
import NoteEditor from '@/components/NoteEditor';
import getNoteById from '@/db/getNoteById';
import StarterKit from '@tiptap/starter-kit';
import { generateHTML } from '@tiptap/html';
import { JSONContent } from '@tiptap/core';

/**
 * The props for DraftNotePage
 * @property {object} params The URL path parameter for this page
 */
export interface EditNotePageProps {
  params: {
    /** The id of the note to be edited  */
    id: number
  }
}

/**
 * @example
 * ```tsx
 * <DraftNotePage />
 * ```
 * Renders a {@link NoteEditor}
 * */
export default async function EditNotePage({ params }: EditNotePageProps) {
  const note = await getNoteById(+params.id);
  const extensions = [StarterKit];

  return (
    <NoteEditor
      content={generateHTML(note?.text_json as unknown as JSONContent, extensions)}
      id={params.id}
    />
  );
}
