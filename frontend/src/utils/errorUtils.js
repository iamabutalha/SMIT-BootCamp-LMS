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
      message: 'Network error. Please check your internet connection or server status.',
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
