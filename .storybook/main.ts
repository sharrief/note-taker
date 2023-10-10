import type { StorybookConfig } from "@storybook/nextjs";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    'storybook-react-i18next',
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // https://stackoverflow.com/questions/71677948/how-to-add-typescript-paths-to-storybook
  webpackFinal: async (config, { configType }) => {
    if (config.resolve?.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else if (config.resolve) {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    } else {
      config.resolve = { plugins: [new TsconfigPathsPlugin()] }
    }
    return config;
  }
};
export default config;
