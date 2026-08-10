import { createSlice } from '@reduxjs/toolkit';
import { tokenStorage, userStorage, clearAuthStorage } from '../../utils/storageUtils';

const initialToken = tokenStorage.get();
const initialUser = userStorage.get();

const initialState = {
  token: initialToken,
  user: initialUser,
  isAuthenticated: Boolean(initialToken && initialUser),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      tokenStorage.set(token);
      userStorage.set(user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      clearAuthStorage();
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAuthLoading,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
