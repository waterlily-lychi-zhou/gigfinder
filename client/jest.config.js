module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Mock CSS imports
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
  