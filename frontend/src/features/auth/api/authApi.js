import { baseApi } from '../../../services/api/baseApi';
import { ENDPOINTS } from '../../../services/api/endpoints';

/**
 * Authentication RTK Query API endpoints
 * Handles Login, Registration (with FormData), Logout, and getCurrentUser (/auth/me)
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: data, // Automatically handles FormData if passed
      }),
      invalidatesTags: ['User'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    getCurrentUser: builder.query({
      query: () => ENDPOINTS.AUTH.ME,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
