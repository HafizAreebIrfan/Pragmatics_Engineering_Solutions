/* eslint-disable no-undef */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Wrapper component that provides all necessary providers
interface WrapperProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<WrapperProps> = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

// Custom render method that includes all providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };

// Helper function to create mock navigation
export const createMockNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  setParams: jest.fn(),
});

// Helper function to create mock route
export const createMockRoute = <T extends Record<string, unknown>>(
  name: string,
  params: T = {} as T
) => ({
  key: `${name}-key`,
  name,
  params,
});

// Helper to wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

// Helper to flush promises
export const flushPromises = () => new Promise(resolve => setImmediate(resolve));
