/* eslint-disable no-undef */
/**
 * @format
 */

import 'react-native';
import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import App from '../App';
import { useAuthStore } from '../src/store';

// Reset store before each test
beforeEach(() => {
  act(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      error: null,
    });
  });
});

describe('App', () => {
  it('renders without crashing', async () => {
    const { toJSON } = render(<App />);

    await waitFor(() => {
      expect(toJSON()).toBeTruthy();
    });
  });

  it('renders with initial unauthenticated state', async () => {
    render(<App />);

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  it('maintains auth state across renders', async () => {
    // Set authenticated state
    act(() => {
      useAuthStore.setState({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
        },
        isAuthenticated: true,
      });
    });

    const { rerender, toJSON } = render(<App />);

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });

    // Rerender and check state is maintained
    rerender(<App />);

    await waitFor(() => {
      expect(toJSON()).toBeTruthy();
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });
});
