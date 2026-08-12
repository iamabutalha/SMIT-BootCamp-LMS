import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import QuizForm from '../components/QuizForm';
import PageLoader from '@/components/common/PageLoader';
import { useGetQuizByIdQuery, useUpdateQuizMutation } from '../api/quizzesApi';
import { ROUTES } from '@/constants/routes';

export function QuizEditPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading: isFetching } = useGetQuizByIdQuery(quizId);
  const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation();

  const handleSubmit = async (formData) => {
    try {
      await updateQuiz({ id: quizId, data: formData }).unwrap();
      toast.success('Quiz updated successfully!');
      navigate(ROUTES.ADMIN.QUIZZES);
    } catch (err) {
      toast.error(err?.message || 'Failed to update quiz');
    }
  };

  if (isFetching) {
    return <PageLoader message="Loading quiz editor..." />;
  }

  if (!quiz) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 font-sans">
        <h3 className="text-base font-bold text-slate-800">Quiz Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">The requested quiz ID does not exist.</p>
        <button
          onClick={() => navigate(ROUTES.ADMIN.QUIZZES)}
          className="mt-4 px-4 py-2 bg-[#006B3C] text-white font-bold text-xs rounded-xl cursor-pointer"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-left max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN.QUIZZES)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Back to Quizzes"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Quiz</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify details, update passing criteria, or adjust question items for &quot;{quiz.title}&quot;.
          </p>
        </div>
      </div>

      <QuizForm initialValues={quiz} onSubmit={handleSubmit} isSubmitting={isUpdating} isEdit />
    </div>
  );
}

export default QuizEditPage;
