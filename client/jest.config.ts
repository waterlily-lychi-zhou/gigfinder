import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Update to .ts if setup file is converted
};

export default config;
