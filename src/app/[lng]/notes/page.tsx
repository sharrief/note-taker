import React from 'react';
import getNotes from '@/app/hooks/getNotes';
import Notes from '@/components/Notes';

/**
 * @example
 * ```tsx
 * <NotesPage />
 * ```
 * Loads the notes from the api, and renders the {@link Notes}
 * passing along the notes and the cursor.
 *
 * @param {object} props
 */
export default async function NotesPage() {
  const { notes, remaining } = await getNotes();
  const next = remaining ? notes[notes.length - 1]?.id : undefined;

  return (
    <Notes
      remaining={remaining}
      notes={notes}
      next={next}
      firstPage
    />
  );
}
