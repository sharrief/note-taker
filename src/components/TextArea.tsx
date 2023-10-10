import React from "react"

/**
 * The props for TextArea
 * @property {string} text The text to display in the TextArea
 * @property {string} placeholder The message to display in the TextArea when there is no text
 * @property {function} onChange The function TextArea will call when the user types
 */
interface TextAreaProps {
  text: string,
  placeholder: string,
  onChange: (text: string) => void,
}

/**
 * Returns a controlled textarea element
 * @param {TextAreaProps} props The props for TextArea
 */
export default function TextArea({ text, placeholder, onChange }: TextAreaProps) {
  return <textarea
    className="col-span-4 textarea border-yellow-200"
    placeholder={placeholder}
    value={text}
    rows={10}
    onChange={(e) => onChange(e.target.value)}
  />
}