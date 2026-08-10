import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from '../../constants/api';

const baseURL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000/api/v1';

/**
 * Centralized RTK Query Base API
 * Standard server state foundation for feature APIs (Auth, Student, Mentor/Admin)
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
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
  }),
  tagTypes: ['User', 'Cohort', 'Attendance', 'Task', 'Submission', 'Auth'],
  endpoints: () => ({}),
});

export default baseApi;
