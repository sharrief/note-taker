import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  /**
   * Provide the path to your Next.js app
   * to load next.config.js and .env files in your test environment
   *
   */
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  projects: [
    `${__dirname}/jest.browser.config.ts`,
    `${__dirname}/jest.server.config.ts`,
  ],
};

/**
 * createJestConfig is exported this way
 * to ensure that next/jest can load the Next.js config which is async
 */
export default createJestConfig(config);
