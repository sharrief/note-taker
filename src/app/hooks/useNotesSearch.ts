import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useNotesSearch(initialSearch: string) {
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
