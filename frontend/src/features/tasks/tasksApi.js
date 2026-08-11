import { baseApi } from '../../services/api/baseApi';
import { ENDPOINTS } from '../../services/api/endpoints';

/**
 * Tasks RTK Query API — extends baseApi
 * Maps to backend: POST/GET /api/v1/tasks, GET/PATCH/DELETE /api/v1/tasks/:id
 * NOTE: Backend task routes are not yet implemented. These endpoints are
 * structurally ready for when the backend team enables them.
 */
export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (params = {}) => ({
        url: ENDPOINTS.TASKS.BASE,
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          status: params.status || undefined,
          cohortId: params.cohortId || undefined,
        },
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map((t) => ({ type: 'Task', id: t._id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    getTask: builder.query({
      query: (id) => ENDPOINTS.TASKS.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    createTask: builder.mutation({
      query: (body) => ({
        url: ENDPOINTS.TASKS.BASE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.TASKS.BY_ID(id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: ENDPOINTS.TASKS.BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
