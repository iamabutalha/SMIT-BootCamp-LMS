import { STORAGE_KEYS } from '../constants/api';

/**
 * Safe local storage utilities
 */
export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.TOKEN) || null;
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      } else {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      }
    } catch (e) {
      console.error('Failed to set auth token in storage', e);
    }
  },
  remove: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (e) {
      console.error('Failed to remove auth token from storage', e);
    }
  },
};

export const userStorage = {
  get: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  set: (user) => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Failed to set user in storage', e);
    }
  },
  remove: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
      console.error('Failed to remove user from storage', e);
    }
  },
};

export const clearAuthStorage = () => {
  tokenStorage.remove();
  userStorage.remove();
};
