import "@testing-library/jest-dom";

// Suppress specific console warnings
const SUPPRESSED_WARNINGS = [
  "When testing, code that causes React state updates should be wrapped into act(...)",
  "Warning: An update to App inside a test was not wrapped in act(...)",
  "Warning: An update to CitySearch inside a test was not wrapped in act(...)",
  "Warning: An update to NumberOfEvents inside a test was not wrapped in act(...)",
];

// Save original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Override console.error
console.error = (...args) => {
  if (
    !SUPPRESSED_WARNINGS.some((warning) => args.join(" ").includes(warning))
  ) {
    originalConsoleError(...args);
  }
};

// Override console.warn
console.warn = (...args) => {
  if (
    !SUPPRESSED_WARNINGS.some((warning) => args.join(" ").includes(warning))
  ) {
    originalConsoleWarn(...args);
  }
};

// Extend timeout for async operations
jest.setTimeout(30000);

// Suppress act() warnings globally
global.IS_REACT_ACT_ENVIRONMENT = true;
