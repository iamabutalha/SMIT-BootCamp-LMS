import { baseApi } from '../../services/api/baseApi';
import { ENDPOINTS } from '../../services/api/endpoints';

/**
 * Cohorts/Batches RTK Query API — extends baseApi
 * Maps to backend: POST/GET /api/v1/cohorts, GET/PATCH /api/v1/cohorts/:id
 * NOTE: Backend cohort routes are not yet implemented. These endpoints are
 * structurally ready for when the backend team enables them.
 */
export const batchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: (params = {}) => ({
        url: ENDPOINTS.COHORTS.BASE,
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
        },
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map((b) => ({ type: 'Cohort', id: b._id })),
              { type: 'Cohort', id: 'LIST' },
            ]
          : [{ type: 'Cohort', id: 'LIST' }],
    }),

    getBatch: builder.query({
      query: (id) => ENDPOINTS.COHORTS.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Cohort', id }],
    }),

    getBatchStudents: builder.query({
      query: (id) => ENDPOINTS.COHORTS.STUDENTS(id),
      providesTags: (result, error, id) => [
        { type: 'Cohort', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    createBatch: builder.mutation({
      query: (body) => ({
        url: ENDPOINTS.COHORTS.BASE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cohort', id: 'LIST' }],
    }),

    updateBatch: builder.mutation({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.COHORTS.BY_ID(id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Cohort', id },
        { type: 'Cohort', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useGetBatchQuery,
  useGetBatchStudentsQuery,
  useCreateBatchMutation,
  useUpdateBatchMutation,
} = batchesApi;
