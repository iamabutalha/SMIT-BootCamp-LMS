/**
 * API-Related Constants
 */
export const STORAGE_KEYS = Object.freeze({
  TOKEN: 'smit_lms_auth_token',
  USER: 'smit_lms_auth_user',
  THEME: 'smit_lms_theme',
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
});

export const API_TIMEOUT_MS = 15000;
