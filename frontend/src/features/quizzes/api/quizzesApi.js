import { baseApi } from '../../../services/api/baseApi';
import { quizService } from '../services/quizService';

/**
 * Quizzes RTK Query API — extends baseApi
 * Provides caching, tags, and seamless transition to real REST backend when available.
 */
export const quizzesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      queryFn: async (params = {}) => {
        try {
          const data = quizService.getQuizzes(params);
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((q) => ({ type: 'Task', id: q.id })),
              { type: 'Task', id: 'QUIZ_LIST' },
            ]
          : [{ type: 'Task', id: 'QUIZ_LIST' }],
    }),

    getQuizById: builder.query({
      queryFn: async (id) => {
        try {
          const data = quizService.getQuizById(id);
          if (!data) return { error: { status: 404, message: 'Quiz not found' } };
          return { data };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    createQuiz: builder.mutation({
      queryFn: async (quizData) => {
        try {
          const data = quizService.createQuiz(quizData);
          return { data };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'QUIZ_LIST' }],
    }),

    updateQuiz: builder.mutation({
      queryFn: async ({ id, data }) => {
        try {
          const updated = quizService.updateQuiz(id, data);
          return { data: updated };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Task', id },
        { type: 'Task', id: 'QUIZ_LIST' },
      ],
    }),

    deleteQuiz: builder.mutation({
      queryFn: async (id) => {
        try {
          quizService.deleteQuiz(id);
          return { data: { success: true } };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'QUIZ_LIST' }],
    }),

    togglePublishQuiz: builder.mutation({
      queryFn: async (id) => {
        try {
          const updated = quizService.togglePublishQuiz(id);
          return { data: updated };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Task', id },
        { type: 'Task', id: 'QUIZ_LIST' },
      ],
    }),

    duplicateQuiz: builder.mutation({
      queryFn: async (id) => {
        try {
          const duplicated = quizService.duplicateQuiz(id);
          return { data: duplicated };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'QUIZ_LIST' }],
    }),

    submitAttempt: builder.mutation({
      queryFn: async ({ quizId, answers, timeSpentSeconds, studentInfo }) => {
        try {
          const result = quizService.submitQuizAttempt(quizId, answers, timeSpentSeconds, studentInfo);
          return { data: result };
        } catch (error) {
          return { error: { status: 400, message: error.message } };
        }
      },
      invalidatesTags: (result, error, { quizId }) => [
        { type: 'Task', id: quizId },
        { type: 'Task', id: 'QUIZ_LIST' },
      ],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useTogglePublishQuizMutation,
  useDuplicateQuizMutation,
  useSubmitAttemptMutation,
} = quizzesApi;
