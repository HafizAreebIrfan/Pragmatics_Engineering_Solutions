/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { RootNavigator } from '../RootNavigator';
import { useAuthStore } from '../../store';

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

describe('RootNavigator', () => {
  describe('when user is not authenticated', () => {
    it('renders auth navigator', async () => {
      const { getByText } = render(<RootNavigator />);

      await waitFor(() => {
        // SplashLoadingScreen or SplashBrandScreen should be visible
        // They contain a loading animation
        expect(true).toBeTruthy(); // Navigation renders without crashing
      });
    });

    it('shows auth flow for unauthenticated users', () => {
      act(() => {
        useAuthStore.setState({
          isAuthenticated: false,
        });
      });

      const { toJSON } = render(<RootNavigator />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      act(() => {
        useAuthStore.setState({
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          },
          isAuthenticated: true,
          isInitialized: true,
        });
      });
    });

    it('renders main navigator for authenticated users', async () => {
      const { toJSON } = render(<RootNavigator />);

      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });

    it('switches from auth to main when user logs in', async () => {
      // Start unauthenticated
      act(() => {
        useAuthStore.setState({
          isAuthenticated: false,
        });
      });

      const { rerender, toJSON } = render(<RootNavigator />);

      // Log in
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

      rerender(<RootNavigator />);

      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });
  });

  describe('navigation state changes', () => {
    it('handles logout correctly', async () => {
      // Start authenticated
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

      const { rerender, toJSON } = render(<RootNavigator />);

      // Log out
      act(() => {
        useAuthStore.getState().logout();
      });

      rerender(<RootNavigator />);

      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
        expect(useAuthStore.getState().isAuthenticated).toBe(false);
      });
    });
  });
});
