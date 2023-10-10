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
  alert: AlertProps['alert'];
}

const defaultAlert: AlertProps['alert'] = { message: '', type: 'info' };

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
): DraftState {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [alert, setAlert] = useState<AlertProps['alert']>(defaultAlert);
  const router = useRouter();
  const validLength = text.length >= min && text.length <= max;
  const canSave = validLength && !!text && !busy;
  const canDiscard = !busy;
  const canType = !busy;

  useEffect(() => {
    if (text.length > 0 && text.length < min) {
      setAlert({
        message: warnMinLengthLabel,
        type: 'info',
      });
    } else if (text.length > max) {
      setAlert({
        message: warnMaxLengthLabel,
        type: 'warning',
      });
    } else setAlert(defaultAlert);
  }, [text, min, warnMinLengthLabel, max, warnMaxLengthLabel]);

  const onSave = async () => {
    if (!canSave) return;
    setBusy(true);
    const { error } = await api.save(text);
    if (error) {
      setAlert({ message: error, type: 'error' });
    } else {
      setText('');
      router.replace('/notes');
    }
    setBusy(false);
  };

  const onDiscard = () => {
    if (!canDiscard) return;
    setText('');
    router.replace('/notes');
  };

  return {
    text, setText, busy, alert, canSave, onSave, canDiscard, onDiscard, canType,
  };
}
