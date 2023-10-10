import React from 'react';

/**
 * The required props for the BusyButton
 * @property {string} text The text to display on the button
 * @property {string} ariaLabel The tex to display to screen readers
 * @property {boolean} disabled Whether the button is disabled
 * @property {function} onClick The function to call when the button is pressed
 */
export interface BusyButtonRequiredProps {
  text: string;
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
}

/**
 * The optional props for the BusyButton
 * @property {string} variant The button style variant
 * @property {boolean} busy Whether the button should display a spinner
 */
export interface BusyButtonDefaultProps {
  variant: '' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  busy: boolean;
}

/** All props for the BusyButton */
export type BusyButtonProps = BusyButtonRequiredProps & BusyButtonDefaultProps;

/**
 * Renders a clickable button with optional styling and busy state
 * @param {BusyButtonProps} props The props for the button
 */
export default function BusyButton({
  text, ariaLabel, disabled, onClick, busy = false, variant = '',
}: BusyButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {busy && <span className="loading loading-spinner" />}
      {text}
    </button>
  );
}
