import type { Config } from 'jest'

export default {
  rootDir: __dirname,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.tsx'],
  setupFiles: ['<rootDir>/jest.polyfills.ts', 'dotenv/config'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  testEnvironment: 'jsdom',
  modulePaths: ['src', 'node_modules'],
  testEnvironmentOptions: {
    /**
     * @note Opt-out from JSDOM using browser-style resolution
     * for dependencies. This is simply incorrect, as JSDOM is
     * not a browser, and loading browser-oriented bundles in
     * Node.js will break things.
     */
    customExportConditions: ['']
  }
} satisfies Config
