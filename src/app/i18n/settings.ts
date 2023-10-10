/** @ignore */
export const fallbackLng = 'en';
/** @ignore */
export const languages = [fallbackLng, 'es'];
/** @ignore */
export const defaultNS = 'translation';
/** @ignore */
export const cookieName = 'i18next';

/** See {@link https://locize.com/blog/next-13-app-dir-i18n/} */
export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
