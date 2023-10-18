import nextJest from 'next/jest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
  /**
   * Provide the path to your Next.js app
   * to load next.config.js and .env files in your test environment
   *
   */
  dir: './',
});
const config: Config = {
  displayName: 'browser',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '!**/api/**'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: __dirname }),
};

export default createJestConfig(config);
