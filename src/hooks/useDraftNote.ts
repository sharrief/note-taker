import { AlertProps } from '@/components/Alert';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as api from '@/app/api';
import { useCurrentEditor } from '@tiptap/react';

/**
 * The return object of the useDraftState hook.
 * Contains state variables for displaying the draft note and handlers for user actions.
*/
export interface DraftState {
  /** Whether the draft note can be saved */
  canSave: boolean;
  /** Saves the draft note via the api */
  onSave: () => void;
  /** Whether the draft note can be discarded */
  canDiscard: boolean;
  /** Discards the draft by navigating back */
  onDiscard: () => void;
  /** Whether the note can be deleted */
  canDelete: boolean;
  /** Deletes the note via the api */
  onDelete: () => void;
  /** Whether the note text can be edited */
  canType: boolean;
  /** Whether the hook is busy waiting on an async function call */
  busy: boolean;
  /** An object containing an optional error message received from the saving api */
  alertMessage: AlertProps['message'];
  /** An object containing an optional error message received from the saving api */
  alertType: AlertProps['type'];
}

/**
 * Hook for managing the state of a draft note.
 * @param {number} min The minimum number of characters a note must have be savable
 * @param {string} warnMinLengthLabel
 * @param {number} max The maximum number of characters a note can have to be saveable
 * @param {string} warnMaxLengthLabel
 * @param {string} saveSuccess The label to show upon successful saving
 * @param {string} deleteSuccess The label to show upon successful deleting
 * @param {number} id The id of the note if editing existing note
 */
export default function useDraftNote(
  min: number,
  warnMinLengthLabel: string,
  max: number,
  warnMaxLengthLabel: string,
  saveSuccess: string,
  deleteSuccess: string,
  id?: number,
): DraftState {
  const { editor } = useCurrentEditor();
  const charCount: number = editor?.storage.characterCount.characters() ?? '';
  const [busy, setBusy] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertProps['message']>('');
  const [alertType, setAlertType] = useState<AlertProps['type']>('info');
  const resetAlert = () => {
    setAlertMessage('');
    setAlertType('info');
  };
  const router = useRouter();
  const validLength = charCount >= min && charCount <= max;
  const canSave = validLength && !!charCount && !busy;
  const canDiscard = !busy;
  const canDelete = id != null && !busy;
  const canType = !busy;

  useEffect(() => {
    if (charCount > 0 && charCount < min) {
      setAlertMessage(warnMinLengthLabel);
      setAlertType('info');
    } else if (charCount > max) {
      setAlertMessage(warnMaxLengthLabel);
      setAlertType('warning');
    } else resetAlert();
  }, [charCount, min, warnMinLengthLabel, max, warnMaxLengthLabel]);

  const onSave = async () => {
    if (!canSave || !editor) return;
    editor.setEditable(false);
    setBusy(true);
    const { error } = id
      ? await api.edit(id, editor.getText(), JSON.stringify(editor.getJSON()))
      : await api.save(editor.getText(), JSON.stringify(editor.getJSON()));
    if (error) {
      editor.setEditable(true);
      setBusy(false);
      setAlertMessage(error);
      setAlertType('error');
    } else {
      // set to busy while navigating back to notes
      setBusy(true);
      setAlertMessage(saveSuccess);
      setAlertType('success');
      router.replace('/notes');
    }
  };

  const onDiscard = () => {
    if (!canDiscard) return;
    router.replace('/notes');
  };

  const onDelete = async () => {
    if (!canDelete || !editor || id == null) return;
    editor?.setEditable(false);
    setBusy(true);
    const { error } = await api.burn(id);
    if (error) {
      editor.setEditable(true);
      setBusy(false);
      setAlertMessage(error);
      setAlertType('error');
    } else {
      // set to busy while navigating back to notes
      setBusy(true);
      setAlertMessage(deleteSuccess);
      setAlertType('success');
      router.replace('/notes');
    }
  };

  return {
    busy,
    alertType,
    alertMessage,
    canSave,
    onSave,
    canDiscard,
    canDelete,
    onDiscard,
    onDelete,
    canType,
  };
}
