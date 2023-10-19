import { MenuButtonState } from '@/hooks/useBoldButton';
import { Editor } from '@tiptap/react';
/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useOrderedListButton(editor: Editor | null): MenuButtonState {
  const toggle = () => editor?.chain().focus()
    .toggleOrderedList().run();
  const canToggle = () => editor?.can().chain().focus()
    .toggleOrderedList()
    .run();
  const isActive = editor?.isActive('orderedList');
  return { toggle, canToggle, isActive };
}
