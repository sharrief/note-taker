import type { Preview } from "@storybook/react";
import i18n from './i18next';
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    i18n,
  },
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      es: 'Español',
    },
  },
};

export default preview;
