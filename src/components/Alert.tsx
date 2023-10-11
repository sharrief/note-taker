import React from 'react';

/** The style variants of Alerts. Each variant has a corresponding icon. */
export type AlertType = 'info' | 'warning' | 'error' | 'success';
const icon: { [key in AlertType]: React.ReactNode } = {
  info: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  warning: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

/**
 * @interface
 * Props for the Alert
 */
export interface AlertProps {
  /** The message to display in the Alert component */
  message: string;
  /** The type to determine the style of the alert.
   * See {@link AlertType}
   */
  type: AlertType;
}
/**
 * Renders an Alert component with the provided message and style variant.
 * If no message is provided, null is rendered.
 * @param {AlertProps} props
*/
export default function Alert({ message, type }: AlertProps) {
  if (!message) return null;

  /** NextJS won't bundle all the variant classes if they aren't spelled out.
   * A template literal `alert-${type}` doesn't work. */
  let alertClass = 'alert-info';
  if (type === 'success') alertClass = 'alert-success';
  if (type === 'error') alertClass = 'alert-error';
  if (type === 'warning') alertClass = 'alert-warning';
  return (
    <div className={`alert ${alertClass} col-span-3`} data-testid="alert">
      {icon[type]}
      <span>{message}</span>
    </div>
  );
}
