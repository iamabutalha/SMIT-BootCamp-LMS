/**
 * Redux Selectors for Authentication State
 */
export const selectCurrentUser = (state) => state.auth?.user || null;
export const selectCurrentToken = (state) => state.auth?.token || null;
export const selectIsAuthenticated = (state) => Boolean(state.auth?.isAuthenticated);
export const selectUserRole = (state) =>
  state.auth?.user?.role ? String(state.auth.user.role).toUpperCase() : null;
export const selectAuthLoading = (state) => Boolean(state.auth?.isLoading);
export const selectAuthError = (state) => state.auth?.error || null;
