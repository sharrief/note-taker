import { useState } from 'react';
import { Editor } from '@tiptap/react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingMenuButtonState {
  level: number | '';
  levels: HeadingLevel[];
  toggleHeading: (level: HeadingLevel) => void;
  active: HeadingLevel | '';
}

/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useHeadingButton(editor: Editor | null): HeadingMenuButtonState {
  const [level, setLevel] = useState<HeadingLevel | ''>('');
  const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
  const toggleHeading = (newLevel: HeadingLevel) => {
    editor?.chain().focus()
      .toggleHeading({ level: newLevel }).run();
    setLevel(newLevel);
  };
  const active = levels.find((l) => editor?.isActive('heading', { level: l })) ?? '';
  return {
    level, levels, toggleHeading, active,
  };
}
