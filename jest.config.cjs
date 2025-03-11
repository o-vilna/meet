module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transform JavaScript and JSX files using Babel
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Path to the setup file
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/alert.jsx",
    "!src/components/Alert.jsx",
    "!src/api.js",
    "!src/main.jsx",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/setupTests.js",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
