import { baseApi } from '../../../services/api/baseApi';
import { teacherService } from '../services/teacherService';

/**
 * Teachers RTK Query API — extends baseApi
 */
export const teachersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      queryFn: async (params = {}) => {
        try {
          const data = teacherService.getTeachers(params);
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((t) => ({ type: 'User', id: t.id })),
              { type: 'User', id: 'TEACHER_LIST' },
            ]
          : [{ type: 'User', id: 'TEACHER_LIST' }],
    }),

    getTeacherById: builder.query({
      queryFn: async (id) => {
        try {
          const data = teacherService.getTeacherById(id);
          if (!data) return { error: { status: 404, message: 'Teacher not found' } };
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    toggleTeacherStatus: builder.mutation({
      queryFn: async ({ id, status }) => {
        try {
          const updated = teacherService.updateTeacherStatus(id, status);
          return { data: updated };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'TEACHER_LIST' },
      ],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useToggleTeacherStatusMutation,
} = teachersApi;
