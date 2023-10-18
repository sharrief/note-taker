import { Editor } from '@tiptap/react';

/**
 * The object containing state variables and handlers for a menu button hook
 */
export interface MenuButtonState {
  /** The handler for toggling the menu button in the editor */
  toggle: () => boolean | undefined;
  /** The handler for determining whether button can be toggled */
  canToggle: () => boolean | undefined;
  /** Whether the button is currently toggled on */
  isActive: boolean | undefined;
}

/**
 *
 * @param {Editor} editor The Tiptap editor instance
 */
export default function useBoldButton(editor: Editor | null): MenuButtonState {
  const toggle = () => editor?.chain().focus()
    .toggleBold().run();
  const canToggle = () => editor?.can().chain().focus()
    .toggleBold()
    .run();
  const isActive = editor?.isActive('bold');
  return { toggle, canToggle, isActive };
}
