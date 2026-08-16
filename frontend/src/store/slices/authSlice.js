import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isInitializing: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setInitializing: (state, action) => {
      state.isInitializing = action.payload;
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitializing = false;
      state.error = null;
    },

    setAuthError: (state, action) => {
      state.error = action.payload;
      state.isInitializing = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitializing = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  setInitializing,
  setCredentials,
  setAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;