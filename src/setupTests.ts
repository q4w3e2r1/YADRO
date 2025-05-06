import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

expect.extend({}); 