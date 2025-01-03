/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  moduleNameMapper: {
    '@stylix/core$': '<rootDir>/src/index.ts',
  },
};
