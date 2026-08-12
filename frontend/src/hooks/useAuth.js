import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logout as logoutAction, clearAuthError } from '../features/auth/authSlice';
import { openLogoutModal, closeLogoutModal } from '../app/store/slices/uiSlice';
import { baseApi } from '../services/api/baseApi';
import { ROUTES } from '../constants/routes';
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
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isLogoutModalOpen = useSelector((state) => state.ui.logoutModalOpen);

  const requestLogout = useCallback(() => {
    dispatch(openLogoutModal());
  }, [dispatch]);

  const confirmLogout = useCallback(() => {
    dispatch(closeLogoutModal());
    dispatch(logoutAction());
    dispatch(baseApi.util.resetApiState());
    toast.success('Signed out successfully.');
    navigate(ROUTES.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  const cancelLogout = useCallback(() => {
    dispatch(closeLogoutModal());
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
    isLogoutModalOpen,
    logout: requestLogout,
    confirmLogout,
    cancelLogout,
    clearError,
  };
}

export default useAuth;
