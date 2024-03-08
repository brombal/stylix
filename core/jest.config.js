/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  moduleNameMapper: {
    '@stylix/core$': '<rootDir>/src/index.ts',
    '#keck$': '<rootDir>/src/index.ts',
    '#keck/(.*)': '<rootDir>/src/$1.ts'
  },
};