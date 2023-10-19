import { createTranslator } from 'next-intl';
import messages from '@/messages/en.json';

export default function getTranslations(namespace: string) {
  const t = createTranslator({ locale: 'en', messages, namespace });
  return t;
}
