import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from '../../constants/api';
import { clearAuthStorage } from '../../utils/storageUtils';

const baseURL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000/api/v1';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state or safe localStorage fallback
    const token =
      getState()?.auth?.token || localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const state = api.getState();
  const token =
    state?.auth?.token || localStorage.getItem(STORAGE_KEYS.TOKEN);
  const isDemoToken = Boolean(token && String(token).startsWith('demo_'));

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const url = typeof args === 'string' ? args : args?.url;
    const isAuthEndpoint =
      url?.includes('/auth/login') || url?.includes('/auth/register');

    if (!isAuthEndpoint && !isDemoToken) {
      clearAuthStorage();
      window.dispatchEvent(new CustomEvent('smit:unauthorized'));
    }
  }

  return result;
};

/**
 * Centralized RTK Query Base API
 * Standard server state foundation for feature APIs (Auth, Student, Mentor/Admin)
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Cohort', 'Attendance', 'Task', 'Submission', 'Auth'],
  endpoints: () => ({}),
});

export default baseApi;

