/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { LoginScreen } from '../LoginScreen';
import { useAuthStore } from '../../../store';

// Mock Alert
jest.spyOn(Alert, 'alert');

// Reset auth store before each test
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

describe('LoginScreen', () => {
  describe('rendering', () => {
    it('renders the login form', () => {
      render(<LoginScreen />);

      expect(screen.getByText('PES')).toBeTruthy();
      expect(screen.getByText('Welcome')).toBeTruthy();
      expect(screen.getByText('Email')).toBeTruthy();
      expect(screen.getByText('Password')).toBeTruthy();
      expect(screen.getByText('Remember Me')).toBeTruthy();
      expect(screen.getByText('Login')).toBeTruthy();
    });

    it('renders email input with correct placeholder', () => {
      render(<LoginScreen />);
      expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    });

    it('renders password input with correct placeholder', () => {
      render(<LoginScreen />);
      expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();
    });

    it('renders terms and privacy links', () => {
      render(<LoginScreen />);

      expect(screen.getByText('Terms of Use')).toBeTruthy();
      expect(screen.getByText('Privacy Policy')).toBeTruthy();
    });
  });

  describe('form validation', () => {
    it('shows error when email is empty and form is submitted', async () => {
      render(<LoginScreen />);

      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeTruthy();
      });
    });

    it('shows error when email is invalid', async () => {
      render(<LoginScreen />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.changeText(emailInput, 'invalid-email');

      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeTruthy();
      });
    });

    it('shows error when password is empty', async () => {
      render(<LoginScreen />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.changeText(emailInput, 'test@example.com');

      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeTruthy();
      });
    });

    it('shows error when password is too short', async () => {
      render(<LoginScreen />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'short');

      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters')).toBeTruthy();
      });
    });
  });

  describe('form submission', () => {
    it('shows loading state when submitting', async () => {
      render(<LoginScreen />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      // The button should show loading state
      await waitFor(() => {
        // During loading, the Login text may be replaced with ActivityIndicator
        // We check that the form is processing
        expect(screen.queryByText('Login')).toBeFalsy();
      });
    });

    it('calls login on successful submission', async () => {
      const loginSpy = jest.fn();
      useAuthStore.setState({ login: loginSpy });

      render(<LoginScreen />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      await waitFor(
        () => {
          expect(loginSpy).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });
  });

  describe('remember me checkbox', () => {
    it('toggles remember me checkbox', () => {
      render(<LoginScreen />);

      const rememberMe = screen.getByText('Remember Me');

      // Initially unchecked - no checkmark
      expect(screen.queryByText('✓')).toBeNull();

      // Click to check
      fireEvent.press(rememberMe);

      // Should now show checkmark
      expect(screen.getByText('✓')).toBeTruthy();

      // Click to uncheck
      fireEvent.press(rememberMe);

      // Should be unchecked again
      expect(screen.queryByText('✓')).toBeNull();
    });
  });

  describe('password visibility toggle', () => {
    it('password is hidden by default', () => {
      render(<LoginScreen />);

      const passwordInput = screen.getByPlaceholderText('Enter your password');
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });
  });

  describe('input handling', () => {
    it('updates email input value', () => {
      render(<LoginScreen />);

      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.changeText(emailInput, 'user@test.com');

      expect(emailInput.props.value).toBe('user@test.com');
    });

    it('updates password input value', () => {
      render(<LoginScreen />);

      const passwordInput = screen.getByPlaceholderText('Enter your password');
      fireEvent.changeText(passwordInput, 'mypassword');

      expect(passwordInput.props.value).toBe('mypassword');
    });
  });
});
