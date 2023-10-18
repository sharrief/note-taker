import { MenuButtonState } from '@/app/hooks/useBoldButton';
import { Editor } from '@tiptap/react';
/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useItalicButton(editor: Editor | null): MenuButtonState {
  const toggle = () => editor?.chain().focus()
    .toggleItalic().run();
  const canToggle = () => editor?.can().chain().focus()
    .toggleItalic()
    .run();
  const isActive = editor?.isActive('italic');
  return { toggle, canToggle, isActive };
}
