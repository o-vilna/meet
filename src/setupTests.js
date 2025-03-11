import "@testing-library/jest-dom";

// Here, add portions of the warning messages you want to intentionally prevent from appearing
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into >act(...):",
  "Error:",
  "The above error occurred",
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((message) =>
    args.toString().includes(message)
  );
  if (!ignoreMessage) originalError(...args);
};

class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

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

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
