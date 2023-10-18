import { MenuButtonState } from '@/app/hooks/useBoldButton';
import { Editor } from '@tiptap/react';
/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useStrikeButton(editor: Editor | null): MenuButtonState {
  const toggle = () => editor?.chain().focus()
    .toggleStrike().run();
  const canToggle = () => editor?.can().chain().focus()
    .toggleStrike()
    .run();
  const isActive = editor?.isActive('strike');
  return { toggle, canToggle, isActive };
}
