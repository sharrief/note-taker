import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The return object of useNotesSearch.
 * Contains the search value and handlers for changing or submitting the search
 */
export interface SearchState {
  /** The current search query */
  search: string;
  /** Whether the search has been submitted */
  busy: boolean;
  /** Handler for user changing the search text */
  onChange: (search: string) => void;
  /** Handler for submitting the search query */
  onSubmit: () => void;
}

/**
 * Hook for managing the state of a search bar
 * @param {string} initialSearch The initial search value
 */
export default function useNotesSearch(initialSearch: string): SearchState {
  const [search, setSearch] = useState(initialSearch);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const onChange = (value: string) => {
    setSearch(value);
  };
  const onSubmit = () => {
    if (search === initialSearch) return;
    setBusy(true);
    if (!search) {
      router.push('/notes');
    } else router.push(`/notes/search/${search}`);
  };

  return {
    search, busy, onChange, onSubmit,
  };
}
