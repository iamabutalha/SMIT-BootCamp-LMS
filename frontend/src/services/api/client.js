import axios from 'axios';
import { tokenStorage, clearAuthStorage } from '../../utils/storageUtils';
import { normalizeApiError } from '../../utils/errorUtils';
import { API_TIMEOUT_MS } from '../../constants/api';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

/**
 * Centralized Axios API Client
 */
export const apiClient = axios.create({
  baseURL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer Token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

// Response Interceptor: Extract Envelope Data & Handle Unauthorized Errors Globally
apiClient.interceptors.response.use(
  (response) => {
    // Return standard backend envelope structure: { success, message, data }
    return response.data;
  },
  (error) => {
    const normalizedError = normalizeApiError(error);

    // If HTTP status is 401 Unauthorized on protected routes, handle token expiration/cleanup
    if (error?.response?.status === 401) {
      const token = tokenStorage.get();
      const isDemoToken = Boolean(token && String(token).startsWith('demo_'));
      const url = error.config?.url;
      const isAuthEndpoint = url?.includes('/auth/login') || url?.includes('/auth/register');

      if (!isAuthEndpoint && !isDemoToken) {
        clearAuthStorage();
        // Dispatch a custom window event so store / router can react if needed
        window.dispatchEvent(new CustomEvent('smit:unauthorized'));
      }
    }

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
