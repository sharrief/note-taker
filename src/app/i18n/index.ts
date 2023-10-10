// from https://locize.com/blog/next-13-app-dir-i18n/
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

/**
 * Hook that loads the specified local label files
 * @param {string} lng The locale specifier
 * @param {string} ns  The namespace/filename containing the desired labels
 * @param {object} [options] Options passed through to the actual react-i18next useTranslation hook
 * @returns {object} Object containing the function which returns the specified label identifier
 * @example
 * ```
 * const { t } = useTranslation('en', 'labels');
 * return <span>{t('helloWorld')}</span>;
 * ```
 */
export default async function useTranslation(
  lng: string,
  ns: string,
  options: { keyPrefix?: string } = {},
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
