import { baseApi } from '../../services/api/baseApi';
import { ENDPOINTS } from '../../services/api/endpoints';

/**
 * Attendance RTK Query API — extends baseApi
 * Maps to backend: POST/GET /api/v1/attendance, PATCH /api/v1/attendance/:id
 * NOTE: Backend attendance routes are not yet implemented. These endpoints are
 * structurally ready for when the backend team enables them.
 */
export const attendanceStatuses = ['Present', 'Absent', 'Late', 'Leave'];

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query({
      query: (params = {}) => ({
        url: ENDPOINTS.ATTENDANCE.BASE,
        params: {
          date: params.date || undefined,
          cohortId: params.cohortId || undefined,
          page: params.page || 1,
          limit: params.limit || 50,
        },
      }),
      providesTags: ['Attendance'],
    }),

    getStudentAttendance: builder.query({
      query: (studentId) => ENDPOINTS.ATTENDANCE.BY_STUDENT(studentId),
      providesTags: (result, error, studentId) => [
        { type: 'Attendance', id: studentId },
      ],
    }),

    markAttendance: builder.mutation({
      query: (body) => ({
        url: ENDPOINTS.ATTENDANCE.BASE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Attendance'],
    }),

    updateAttendance: builder.mutation({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.ATTENDANCE.BY_ID(id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useGetStudentAttendanceQuery,
  useMarkAttendanceMutation,
  useUpdateAttendanceMutation,
} = attendanceApi;
