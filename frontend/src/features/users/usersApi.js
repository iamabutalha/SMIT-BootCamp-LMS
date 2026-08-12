import { baseApi } from '../../services/api/baseApi';
import { ENDPOINTS } from '../../services/api/endpoints';

/**
 * Users RTK Query API — extends baseApi
 * Maps to backend: GET/POST /api/v1/users, GET/PATCH/DELETE /api/v1/users/:id
 */
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params = {}) => ({
        url: ENDPOINTS.USERS.BASE,
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          role: params.role || undefined,
          cohortId: params.cohortId || undefined,
        },
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map((u) => ({ type: 'User', id: u._id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUser: builder.query({
      query: (id) => ENDPOINTS.USERS.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: ENDPOINTS.USERS.BASE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.USERS.BY_ID(id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: ENDPOINTS.USERS.CHANGE_ROLE(id),
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: ENDPOINTS.USERS.BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = usersApi;
