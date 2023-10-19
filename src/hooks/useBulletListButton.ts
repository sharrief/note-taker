import { MenuButtonState } from '@/hooks/useBoldButton';
import { Editor } from '@tiptap/react';
/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useBulletListButton(editor: Editor | null): MenuButtonState {
  const toggle = () => editor?.chain().focus()
    .toggleBulletList().run();
  const canToggle = () => editor?.can().chain().focus()
    .toggleBulletList()
    .run();
  const isActive = editor?.isActive('bulletList');
  return { toggle, canToggle, isActive };
}
