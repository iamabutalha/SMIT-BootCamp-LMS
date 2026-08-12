import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import QuizForm from '../components/QuizForm';
import { useCreateQuizMutation } from '../api/quizzesApi';
import { ROUTES } from '@/constants/routes';

export function QuizCreatePage() {
  const navigate = useNavigate();
  const [createQuiz, { isLoading }] = useCreateQuizMutation();

  const handleSubmit = async (formData) => {
    try {
      const created = await createQuiz(formData).unwrap();
      toast.success('Quiz created successfully!');
      navigate(ROUTES.ADMIN.QUIZZES);
    } catch (err) {
      toast.error(err?.message || 'Failed to create quiz');
    }
  };

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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create New Quiz</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure assessment parameters and build dynamic question items.
          </p>
        </div>
      </div>

      <QuizForm onSubmit={handleSubmit} isSubmitting={isLoading} />
    </div>
  );
}

export default QuizCreatePage;
