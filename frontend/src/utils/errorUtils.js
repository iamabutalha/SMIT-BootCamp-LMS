/**
 * Normalizes backend & network errors into a consistent envelope structure
 * strictly aligned with docs/API_CONTRACT.md:
 * {
 *   success: false,
 *   message: "Human readable message",
 *   errors: [{ field, message }]
 * }
 *
 * @param {Error|Object} error - Error object caught from Axios or JS
 * @returns {{ success: false, message: string, errors: Array<{field?: string, message: string}> }}
 */
export function normalizeApiError(error) {
  // If response exists from Axios
  if (error?.response?.data) {
    const data = error.response.data;
    return {
      success: false,
      message: data.message || 'An error occurred while processing your request.',
      errors: Array.isArray(data.errors)
        ? data.errors
        : data.error?.details || [],
    };
  }

  // Handle standard Network or Request Errors
  if (error?.request) {
    return {
      success: false,
      message: 'Unable to connect to the server. Please try again.',
      errors: [],
    };
  }

  // Fallback for JS Runtime Errors
  return {
    success: false,
    message: error?.message || 'An unexpected error occurred.',
    errors: [],
  };
}

/**
 * Extract clean, user-friendly authentication error messages from RTK Query or Axios error payloads
 * @param {Object} err - Caught error object from RTK Query unwrap() or Axios
 * @param {boolean} [isLoginFlow=false] - Whether the error occurred during login form submission
 * @returns {string} User friendly error string
 */
export function getAuthErrorMessage(err, isLoginFlow = false) {
  if (!err) return 'An unexpected error occurred. Please try again.';

  // RTK Query FETCH_ERROR or Axios network error
  if (
    err?.status === 'FETCH_ERROR' ||
    err?.status === 'TIMEOUT_ERROR' ||
    err?.error?.includes('Failed to fetch') ||
    err?.request
  ) {
    return 'Unable to connect to the server. Please try again.';
  }

  const status = err?.status || err?.response?.status;
  const backendMessage = err?.data?.message || err?.response?.data?.message;

  if (status === 401) {
    return isLoginFlow
      ? 'Invalid email or password.'
      : 'Session expired. Please log in again.';
  }

  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (status === 404) {
    return 'Requested authentication endpoint was not found.';
  }

  if (status === 500) {
    return 'Server error occurred. Please try again later.';
  }

  if (backendMessage && typeof backendMessage === 'string' && !backendMessage.startsWith('AxiosError')) {
    return backendMessage;
  }

  if (typeof err?.message === 'string' && !err.message.startsWith('AxiosError')) {
    return err.message;
  }

  return 'Authentication failed. Please check your credentials and try again.';
}

