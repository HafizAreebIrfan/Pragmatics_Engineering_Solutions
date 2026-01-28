/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react-native';
import { ProfileScreen } from '../ProfileScreen';
import { useAuthStore } from '../../../store';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
    key: 'test-key',
    name: 'ProfileMain',
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: () => true,
}));

// Clear mocks and reset store before each test
beforeEach(() => {
  mockNavigate.mockClear();
  act(() => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      },
      isAuthenticated: true,
      isLoading: false,
      isInitialized: true,
      error: null,
    });
  });
});

describe('ProfileScreen', () => {
  describe('rendering', () => {
    it('renders user profile header', () => {
      render(<ProfileScreen />);

      expect(screen.getByText('Test User')).toBeTruthy();
      expect(screen.getByText('test@example.com')).toBeTruthy();
    });

    it('renders edit profile button in header', () => {
      render(<ProfileScreen />);
      expect(screen.getAllByText('Edit Profile').length).toBeGreaterThan(0);
    });

    it('renders account settings section', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('ACCOUNT SETTINGS')).toBeTruthy();
    });

    it('renders security section', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('SECURITY')).toBeTruthy();
    });

    it('renders danger zone section', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('DANGER ZONE')).toBeTruthy();
    });

    it('renders logout button', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Logout')).toBeTruthy();
    });

    it('renders app version', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('PES Mobile App v1.0.0')).toBeTruthy();
    });
  });

  describe('menu items', () => {
    it('renders edit profile menu item', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Update your personal information')).toBeTruthy();
    });

    it('renders change password menu item', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Change Password')).toBeTruthy();
      expect(screen.getByText('Update your password')).toBeTruthy();
    });

    it('renders notifications menu item', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Notifications')).toBeTruthy();
      expect(screen.getByText('Manage notification preferences')).toBeTruthy();
    });

    it('renders two-factor authentication menu item', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Two-Factor Authentication')).toBeTruthy();
      expect(screen.getByText('Add extra security to your account')).toBeTruthy();
    });

    it('renders active sessions menu item', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Active Sessions')).toBeTruthy();
      expect(screen.getByText('Manage your logged in devices')).toBeTruthy();
    });

    it('renders deactivate account menu item', () => {
      render(<ProfileScreen />);
      expect(screen.getByText('Deactivate Account')).toBeTruthy();
      expect(screen.getByText('Temporarily disable your account')).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('navigates to edit profile when edit profile is pressed', () => {
      render(<ProfileScreen />);

      const editProfileButtons = screen.getAllByText('Edit Profile');
      fireEvent.press(editProfileButtons[0]);

      expect(mockNavigate).toHaveBeenCalledWith('EditProfile');
    });

    it('navigates to change password when change password is pressed', () => {
      render(<ProfileScreen />);

      const changePasswordItem = screen.getByText('Change Password');
      fireEvent.press(changePasswordItem);

      expect(mockNavigate).toHaveBeenCalledWith('ChangePassword');
    });

    it('navigates to deactivate account when deactivate is pressed', () => {
      render(<ProfileScreen />);

      const deactivateItem = screen.getByText('Deactivate Account');
      fireEvent.press(deactivateItem);

      expect(mockNavigate).toHaveBeenCalledWith('DeactivateAccount');
    });
  });

  describe('logout functionality', () => {
    it('calls logout when logout button is pressed', () => {
      const logoutSpy = jest.fn();
      act(() => {
        useAuthStore.setState({ logout: logoutSpy });
      });

      render(<ProfileScreen />);

      const logoutButton = screen.getByText('Logout');
      fireEvent.press(logoutButton);

      expect(logoutSpy).toHaveBeenCalled();
    });
  });

  describe('guest user', () => {
    it('shows guest user info when no user is logged in', () => {
      act(() => {
        useAuthStore.setState({
          user: null,
          isAuthenticated: false,
        });
      });

      render(<ProfileScreen />);

      expect(screen.getByText('Guest User')).toBeTruthy();
      expect(screen.getByText('guest@example.com')).toBeTruthy();
    });
  });

  describe('user with full profile', () => {
    it('displays user name and email from store', () => {
      act(() => {
        useAuthStore.setState({
          user: {
            id: '2',
            email: 'john.doe@company.com',
            name: 'John Doe',
            phone: '+1234567890',
          },
          isAuthenticated: true,
        });
      });

      render(<ProfileScreen />);

      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('john.doe@company.com')).toBeTruthy();
    });
  });
});
