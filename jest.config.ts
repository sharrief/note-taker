import nextJest from 'next/jest.js'
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  "moduleNameMapper": pathsToModuleNameMapper(compilerOptions.paths, { prefix: __dirname }),
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)