import React from 'react';
/** The props for the SearchBar component */
export interface SearchBarProps {
  /** The text to search notes for */
  search: string;
  /** The placeholder text for the search bar */
  placeholder: string;
  /** The search button text */
  buttonText: string;
  /** The text to show then the search is busy */
  busyText: string;
  /** Whether the search is busy */
  busy: boolean;
  /** The handler for onChange */
  onChange: (value: string) => void;
  /** The handler for when the button is pressed */
  onSubmit: () => void;
}

export default function SearchBar({
  search, placeholder, buttonText, busyText, busy, onChange, onSubmit,
}: SearchBarProps) {
  const canSearch = !!search;
  return (
    <form className="join w-full" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full join-item"
        value={search}
        disabled={busy}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className={`btn ${busy ? 'disabled btn-outline btn-success' : ''} ${(canSearch && !busy) ? 'btn-success' : 'btn-outline'} join-item`}
        onClick={onSubmit}
      >
        {busy ? busyText : buttonText}
        {busy && <span className="loading loading-spinner" />}
      </button>
    </form>
  );
}
