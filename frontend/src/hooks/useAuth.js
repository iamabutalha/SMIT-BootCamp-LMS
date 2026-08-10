import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logout as logoutAction, clearAuthError } from '../features/auth/authSlice';
import {
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectUserRole,
  selectAuthLoading,
  selectAuthError,
} from '../features/auth/authSelectors';

/**
 * Custom hook to interact with authentication state and actions cleanly
 */
export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return {
    user,
    token,
    role,
    isAuthenticated,
    isLoading,
    error,
    logout,
    clearError,
  };
}

export default useAuth;
