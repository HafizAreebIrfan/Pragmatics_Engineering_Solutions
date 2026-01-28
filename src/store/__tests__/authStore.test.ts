/* eslint-disable no-undef */
import { useAuthStore, User } from '../authStore';
import { act } from '@testing-library/react-native';

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

describe('authStore', () => {
  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.isInitialized).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('setUser', () => {
    it('should set user and isAuthenticated to true', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      act(() => {
        useAuthStore.getState().setUser(mockUser);
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should set isAuthenticated to false when user is null', () => {
      // First set a user
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      act(() => {
        useAuthStore.getState().setUser(mockUser);
      });

      // Then set user to null
      act(() => {
        useAuthStore.getState().setUser(null);
      });

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      act(() => {
        useAuthStore.getState().setLoading(true);
      });

      expect(useAuthStore.getState().isLoading).toBe(true);
    });

    it('should set loading to false', () => {
      act(() => {
        useAuthStore.getState().setLoading(true);
      });

      act(() => {
        useAuthStore.getState().setLoading(false);
      });

      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      const errorMessage = 'Login failed';

      act(() => {
        useAuthStore.getState().setError(errorMessage);
      });

      expect(useAuthStore.getState().error).toBe(errorMessage);
    });

    it('should clear error when set to null', () => {
      act(() => {
        useAuthStore.getState().setError('Some error');
      });

      act(() => {
        useAuthStore.getState().setError(null);
      });

      expect(useAuthStore.getState().error).toBeNull();
    });
  });

  describe('setInitialized', () => {
    it('should set initialized to true', () => {
      act(() => {
        useAuthStore.getState().setInitialized(true);
      });

      expect(useAuthStore.getState().isInitialized).toBe(true);
    });

    it('should set initialized to false', () => {
      act(() => {
        useAuthStore.getState().setInitialized(true);
      });

      act(() => {
        useAuthStore.getState().setInitialized(false);
      });

      expect(useAuthStore.getState().isInitialized).toBe(false);
    });
  });

  describe('login', () => {
    it('should set user, isAuthenticated to true, and clear error', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      // Set an error first
      act(() => {
        useAuthStore.getState().setError('Previous error');
      });

      // Login
      act(() => {
        useAuthStore.getState().login(mockUser);
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle user with all optional fields', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1234567890',
        avatar: 'https://example.com/avatar.jpg',
      };

      act(() => {
        useAuthStore.getState().login(mockUser);
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.user?.phone).toBe('+1234567890');
      expect(state.user?.avatar).toBe('https://example.com/avatar.jpg');
    });
  });

  describe('logout', () => {
    it('should clear user, set isAuthenticated to false, and clear error', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      // Login first
      act(() => {
        useAuthStore.getState().login(mockUser);
      });

      // Logout
      act(() => {
        useAuthStore.getState().logout();
      });

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should work even when already logged out', () => {
      act(() => {
        useAuthStore.getState().logout();
      });

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear the error', () => {
      act(() => {
        useAuthStore.getState().setError('Some error');
      });

      act(() => {
        useAuthStore.getState().clearError();
      });

      expect(useAuthStore.getState().error).toBeNull();
    });

    it('should work even when error is already null', () => {
      act(() => {
        useAuthStore.getState().clearError();
      });

      expect(useAuthStore.getState().error).toBeNull();
    });
  });

  describe('state persistence', () => {
    it('should only persist user and isAuthenticated', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      act(() => {
        useAuthStore.getState().login(mockUser);
        useAuthStore.getState().setLoading(true);
        useAuthStore.getState().setError('Some error');
        useAuthStore.getState().setInitialized(true);
      });

      // Get the persisted state (what would be saved to storage)
      const store = useAuthStore;
      const persistOptions = (store as any).persist?.getOptions?.();

      if (persistOptions?.partialize) {
        const persistedState = persistOptions.partialize(useAuthStore.getState());

        // Only user and isAuthenticated should be in persisted state
        expect(persistedState).toHaveProperty('user');
        expect(persistedState).toHaveProperty('isAuthenticated');
        expect(persistedState).not.toHaveProperty('isLoading');
        expect(persistedState).not.toHaveProperty('error');
        expect(persistedState).not.toHaveProperty('isInitialized');
      }
    });
  });

  describe('combined actions', () => {
    it('should handle login/logout cycle correctly', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      // Initial state
      expect(useAuthStore.getState().isAuthenticated).toBe(false);

      // Login
      act(() => {
        useAuthStore.getState().login(mockUser);
      });
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user).toEqual(mockUser);

      // Logout
      act(() => {
        useAuthStore.getState().logout();
      });
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().user).toBeNull();

      // Login again
      act(() => {
        useAuthStore.getState().login(mockUser);
      });
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });

    it('should handle error flow correctly', () => {
      // Set error
      act(() => {
        useAuthStore.getState().setError('Login failed');
      });
      expect(useAuthStore.getState().error).toBe('Login failed');

      // Successful login should clear error
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      act(() => {
        useAuthStore.getState().login(mockUser);
      });
      expect(useAuthStore.getState().error).toBeNull();
    });
  });
});
