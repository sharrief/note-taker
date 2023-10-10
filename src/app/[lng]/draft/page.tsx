'use client';

import React from 'react';
import DraftNote from '@/components/DraftNote';
import { languages } from '@/app/i18n/settings';
import { LanguageContext } from '@/util/LanguageContext/client';

export default function DraftNotePage() {
  return (
    <LanguageContext.Provider value={languages[0]}>
      <DraftNote />
    </LanguageContext.Provider>

  );
}
