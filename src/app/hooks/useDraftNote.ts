import { AlertProps } from '@/components/Alert';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as api from '@/app/api';

/**
 * The return object of the useDraftState hook.
 * Contains state variables for displaying the draft note and handlers for user actions.
*/
export interface DraftState {
  /** The content of the draft note */
  text: string;
  /** Updates the draft note content
   * @param {string} text The text to set
  */
  setText: (text: string) => void;
  /** Whether the draft note can be saved */
  canSave: boolean;
  /** Saves the draft note via the api */
  onSave: () => void;
  /** Whether the draft note can be discarded */
  canDiscard: boolean;
  /** Discards the draft by navigating back */
  onDiscard: () => void;
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
 */
export default function useDraftNote(
  min: number,
  warnMinLengthLabel: string,
  max: number,
  warnMaxLengthLabel: string,
  saveSuccess: string,
): DraftState {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertProps['message']>('');
  const [alertType, setAlertType] = useState<AlertProps['type']>('info');
  const resetAlert = () => {
    setAlertMessage('');
    setAlertType('info');
  };
  const router = useRouter();
  const validLength = text.length >= min && text.length <= max;
  const canSave = validLength && !!text && !busy;
  const canDiscard = !busy;
  const canType = !busy;

  useEffect(() => {
    if (text.length > 0 && text.length < min) {
      setAlertMessage(warnMinLengthLabel);
      setAlertType('info');
    } else if (text.length > max) {
      setAlertMessage(warnMaxLengthLabel);
      setAlertType('warning');
    } else resetAlert();
  }, [text, min, warnMinLengthLabel, max, warnMaxLengthLabel]);

  const onSave = async () => {
    if (!canSave) return;
    setBusy(true);
    const { error } = await api.save(text);
    if (error) {
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
    setText('');
    router.replace('/notes');
  };

  return {
    text, setText, busy, alertType, alertMessage, canSave, onSave, canDiscard, onDiscard, canType,
  };
}
