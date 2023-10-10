import React from 'react';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import Notes from '@/components/Notes';
import getNotes from '../getNotes';

export default async function NotesCursorPage(
  { params }: { params: { cursor: string } },
) {
  const cursorValidator = z.number();
  const { cursor: userInput } = params;
  const parsedInput = cursorValidator.safeParse(+userInput);
  if (!parsedInput.success) {
    return redirect('/notes');
  }
  const { data: cursor } = parsedInput;
  const { notes, remaining } = await getNotes(cursor);
  const nextCursor = remaining ? notes[notes.length - 1]?.id : undefined;
  return (
    <Notes
      remaining={remaining}
      notes={notes}
      next={nextCursor}
      firstPage={false}
    />
  );
}
