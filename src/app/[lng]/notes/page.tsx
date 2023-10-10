import React from 'react';
import getNotes from '@/app/[lng]/notes/getNotes';
import Notes from '@/components/Notes';

export default async function NotesPage() {
  const { notes, remaining } = await getNotes();
  const nextCursor = remaining ? notes[notes.length - 1]?.id : undefined;
  return (
      <Notes
        remaining={remaining}
        notes={notes}
        next={nextCursor}
        firstPage
      />
  );
}
