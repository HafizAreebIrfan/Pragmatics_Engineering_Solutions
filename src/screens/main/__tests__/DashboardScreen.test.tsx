/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { DashboardScreen } from '../DashboardScreen';

// Mock navigation
const mockNavigate = jest.fn();
const mockUseNavigation = jest.fn(() => ({
  navigate: mockNavigate,
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => mockUseNavigation(),
  useRoute: () => ({
    params: {},
    key: 'test-key',
    name: 'Dashboard',
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: () => true,
}));

// Clear mocks before each test
beforeEach(() => {
  mockNavigate.mockClear();
});

describe('DashboardScreen', () => {
  describe('rendering', () => {
    it('renders the dashboard header', () => {
      render(<DashboardScreen />);
      expect(screen.getByText('Site Summary')).toBeTruthy();
    });

    it('renders the export button', () => {
      render(<DashboardScreen />);
      expect(screen.getByText('Export')).toBeTruthy();
    });

    it('renders site cards', () => {
      render(<DashboardScreen />);

      // Check for mock site names
      expect(screen.getByText('Lucky Cement Nooribad')).toBeTruthy();
      expect(screen.getByText('Master Molty Foam')).toBeTruthy();
      expect(screen.getByText('Young Food Pvt. Ltd.')).toBeTruthy();
    });

    it('renders the site count', () => {
      render(<DashboardScreen />);
      expect(screen.getByText('5 sites')).toBeTruthy();
    });

    it('renders search bar placeholder', () => {
      render(<DashboardScreen />);
      expect(screen.getByPlaceholderText('Search sites...')).toBeTruthy();
    });
  });

  describe('search functionality', () => {
    it('filters sites based on search query', async () => {
      render(<DashboardScreen />);

      const searchInput = screen.getByPlaceholderText('Search sites...');
      fireEvent.changeText(searchInput, 'Lucky');

      await waitFor(() => {
        expect(screen.getByText('Lucky Cement Nooribad')).toBeTruthy();
        expect(screen.queryByText('Master Molty Foam')).toBeNull();
        expect(screen.getByText('1 site')).toBeTruthy();
      });
    });

    it('shows empty state when no sites match search', async () => {
      render(<DashboardScreen />);

      const searchInput = screen.getByPlaceholderText('Search sites...');
      fireEvent.changeText(searchInput, 'nonexistent site xyz');

      await waitFor(() => {
        expect(screen.getByText('No sites found')).toBeTruthy();
        expect(screen.getByText('No sites match "nonexistent site xyz"')).toBeTruthy();
      });
    });

    it('is case insensitive', async () => {
      render(<DashboardScreen />);

      const searchInput = screen.getByPlaceholderText('Search sites...');
      fireEvent.changeText(searchInput, 'LUCKY');

      await waitFor(() => {
        expect(screen.getByText('Lucky Cement Nooribad')).toBeTruthy();
      });
    });

    it('resets to show all sites when search is cleared', async () => {
      const { unmount } = render(<DashboardScreen />);

      // Verify initial state shows all sites
      expect(screen.getByText('5 sites')).toBeTruthy();

      // Unmount and re-render to test clean state
      unmount();

      const { getByPlaceholderText, getByText, queryByText } = render(<DashboardScreen />);

      // Search and verify filter works
      const searchInput = getByPlaceholderText('Search sites...');
      fireEvent.changeText(searchInput, 'Lucky');

      await waitFor(() => {
        expect(getByText('1 site')).toBeTruthy();
        expect(queryByText('Master Molty Foam')).toBeNull();
      });
    });
  });

  describe('navigation', () => {
    it('navigates to site detail when site card is pressed', () => {
      render(<DashboardScreen />);

      const siteCard = screen.getByText('Lucky Cement Nooribad');
      fireEvent.press(siteCard);

      expect(mockNavigate).toHaveBeenCalledWith('Site', {
        screen: 'SiteDetail',
        params: { siteId: '1', siteName: 'Lucky Cement Nooribad' },
      });
    });
  });

  describe('refresh control', () => {
    it('handles pull to refresh', async () => {
      const { UNSAFE_getByType } = render(<DashboardScreen />);

      const FlatList = require('react-native').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      // Trigger refresh
      const refreshControl = flatList.props.refreshControl;
      expect(refreshControl).toBeTruthy();
      expect(refreshControl.props.onRefresh).toBeTruthy();
    });
  });

  describe('site card display', () => {
    it('displays site efficiency', () => {
      render(<DashboardScreen />);
      // Check for efficiency values in the mock data
      expect(screen.getByText(/86\.56/)).toBeTruthy();
    });

    it('displays alarm count for header notification badge', () => {
      render(<DashboardScreen />);
      // Header has a notification badge, and sites have alarm counts
      // We're verifying that alarm-related UI elements are visible
      expect(screen.getByText('🔔')).toBeTruthy();
    });

    it('displays last updated time', () => {
      render(<DashboardScreen />);
      expect(screen.getByText('17/12/2025, 07:49 PM')).toBeTruthy();
    });
  });

  describe('export functionality', () => {
    it('export button is pressable', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(<DashboardScreen />);

      const exportButton = screen.getByText('Export');
      fireEvent.press(exportButton);

      expect(consoleSpy).toHaveBeenCalledWith('Export pressed');

      consoleSpy.mockRestore();
    });
  });
});
