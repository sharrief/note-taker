import { MenuButtonState } from '@/app/hooks/useBoldButton';
import { Editor } from '@tiptap/react';
/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useQuoteButton(editor: Editor | null): MenuButtonState {
  const toggle = () => editor?.chain().focus()
    .toggleBlockquote().run();
  const canToggle = () => editor?.can().chain().focus()
    .toggleBlockquote()
    .run();
  const isActive = editor?.isActive('blockquote');
  return { toggle, canToggle, isActive };
}
