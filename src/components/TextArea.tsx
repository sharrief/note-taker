import React from 'react';

/**
 * The props for TextArea
 */
export interface TextAreaProps {
  /** The text to display in the TextArea. */
  text: string,
  /** The message to display in the TextArea when there is no text. */
  placeholder: string,
  /** Whether the text area is editable. */
  disabled: boolean,
  /** The function TextArea will pass to the onChange handler of the underlying textarea. */
  onChange: (text: string) => void,
}

/**
 * Returns a controlled textarea element
 * @param {object} props The props for TextArea
 */
export default function TextArea({
  text, disabled, placeholder, onChange,
}: TextAreaProps) {
  return (
    <textarea
      className="col-span-4 textarea border-yellow-200"
      disabled={disabled}
      placeholder={placeholder}
      value={text}
      rows={10}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
