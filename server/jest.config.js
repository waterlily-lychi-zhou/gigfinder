/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset for ts-jest,
  testEnvironment: "node",
  extensionsToTreatAsEsm: ['.ts'], // Treat TypeScript files as ESM
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM in ts-jest
      },
    ],
  },
  moduleNameMapper: {
    '^node-fetch$': 'node-fetch', // Map node-fetch to its ESM version
  },
};