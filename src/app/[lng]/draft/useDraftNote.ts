import { AlertType } from '@/components/Alert';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { env } from 'process';
import api from '@/app/api';

/**
 * The minimum characters required to save a draft note
 */
const min = +(env.OPTION_NOTE_MIN_LENGTH || 20);
/**
 * The minimum numbers of characters a draft note can be saved with
 */
const max = +(env.OPTION_NOTE_MAX_LENGTH || 300);

/**
   * @typedef {object} DraftState
   * @property {string} text The content of the draft note
   * @property {function} setText Updates the draft note content
   * @property {boolean} busy Whether the hook is busy processing an async function call
   * @property {AlertType} alert
   *  Whether the hook is busy processing an async function call {@link AlertType}
   *
   */
export type DraftState = {
  text: string;
  setText: (text: string) => void;
  busy: boolean;
  alert: AlertType;
};

/**
 * Hook for managing state of a draft note
 * @returns {DraftState} Object containing state variables and functions
 */
export default function useDraftNote() {
  /**
   * Maintains the state of the draft note text
   */
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [alert, setAlert] = useState<{ message: string, type: AlertType }>();
  const router = useRouter();
  const validLength = text.length >= min && text.length <= max;
  const canSave = validLength && !!text && !busy;
  const canCancel = !busy;

  useEffect(() => {
    if (text.length > 0 && text.length < min) {
      setAlert({
        message: `The note must contain at least ${min} characters to be saved`,
        type: 'info',
      });
    } else if (text.length > max) {
      setAlert({
        message: `The note must be shorter than ${max} characters to be saved`,
        type: 'warning',
      });
    } else setAlert(undefined);
  }, [text]);

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
  };

  const onCancel = () => {
    if (!canCancel) return;
    setText('');
    router.replace('/notes');
  };

  return {
    text, setText, busy, alert, canSave, onSave, canCancel, onCancel,
  };
}
