import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Award, Clock, HelpCircle, FileText, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PageLoader from '@/components/common/PageLoader';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useGetQuizByIdQuery } from '../api/quizzesApi';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function StudentQuizResultContent() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: quiz, isLoading, isError } = useGetQuizByIdQuery(quizId);

  if (isLoading) {
    return <PageLoader message="Generating assessment performance breakdown..." />;
  }

  // Handle missing or invalid quiz cleanly (avoids infinite loader or blank screen)
  if (isError || !quiz) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs font-sans max-w-lg mx-auto my-8 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800">Quiz Result Not Found</h3>
          <p className="text-xs text-slate-500">
            No quiz record found for ID &quot;{quizId}&quot;. Please return to your quizzes portal.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => navigate(ROUTES.STUDENT.QUIZZES)}
          className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs cursor-pointer"
        >
          Back to My Quizzes
        </Button>
      </div>
    );
  }

  // Find latest attempt for current student
  const studentId = user?._id || user?.id || '1';
  const attempt =
    quiz.attempts?.find((a) => String(a.studentId) === String(studentId)) ||
    quiz.attempts?.[0];

  const percentage = attempt?.percentage ?? 0;
  const isPassed = attempt?.status === 'Passed' || percentage >= (quiz.passingScore || 70);

  // Derive questions review list cleanly
  let questionsReview = attempt?.questionsReview || [];
  if (questionsReview.length === 0 && quiz.questions && quiz.questions.length > 0) {
    // Construct default review from quiz questions structure if attempt details are bare
    questionsReview = quiz.questions.map((qn) => ({
      questionId: qn.id,
      question: qn.question,
      type: qn.type,
      options: qn.options,
      userAnswer: 'Submitted',
      correctAnswer: qn.correctAnswer,
      explanation: qn.explanation,
      points: qn.points || 20,
      isCorrect: true,
    }));
  }

  const correctCount = questionsReview.filter((q) => q.isCorrect).length;
  const incorrectCount = questionsReview.length - correctCount;

  // Recharts NaN Protection: ensure total value > 0 to prevent SVG path NaN errors
  const hasPieData = correctCount > 0 || incorrectCount > 0;
  const pieData = hasPieData
    ? [
        { name: 'Correct', value: correctCount, color: '#21C75D' },
        { name: 'Incorrect', value: incorrectCount, color: '#CF3E44' },
      ]
    : [{ name: 'Pending', value: 1, color: '#CBD5E1' }];

  return (
    <div className="space-y-6 font-sans text-left max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.STUDENT.QUIZZES)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Back to Quizzes"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quiz Results</h1>
            <p className="text-xs text-slate-500 mt-0.5">{quiz.title} • {quiz.course}</p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => navigate(ROUTES.STUDENT.QUIZZES)}
          className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs cursor-pointer"
        >
          Back to My Quizzes
        </Button>
      </div>

      {/* Main Score Banner Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            {isPassed ? (
              <Badge className="bg-[#E8F7DF] text-[#21C75D] text-sm px-3 py-1 font-bold">Passed</Badge>
            ) : (
              <Badge className="bg-rose-50 text-rose-600 text-sm px-3 py-1 font-bold border border-rose-200">Failed</Badge>
            )}
            <span className="text-xs text-slate-400 font-semibold">Passing Requirement: {quiz.passingScore}%</span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl font-extrabold tracking-tight text-slate-900">
              {percentage}% <span className="text-xs font-normal text-slate-500">Overall Score</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isPassed
                ? 'Congratulations! You successfully passed this assessment test.'
                : 'Keep practicing! Review the detailed explanations below to improve your score.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Correct</span>
              <span className="font-extrabold text-[#21C75D]">{correctCount}</span>
            </div>
            <div className="space-y-0.5 border-x border-slate-100 px-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Incorrect</span>
              <span className="font-extrabold text-rose-600">{incorrectCount}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Time Taken</span>
              <span className="font-bold text-slate-800">{attempt?.timeTaken || '15 min'}</span>
            </div>
          </div>
        </div>

        {/* Donut Performance Graph with NaN & Zero-Dimension Guards */}
        <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 min-h-[180px]">
          <div className="h-44 w-full relative flex items-center justify-center min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={140}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={68}
                  paddingAngle={hasPieData ? 4 : 0}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`res-pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {hasPieData && <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />}
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-slate-900">{percentage}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Grade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Question-by-Question Review</h3>

        {questionsReview.length === 0 ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 text-center">
            Detailed review not available for this attempt.
          </div>
        ) : (
          <div className="space-y-4">
            {questionsReview.map((qn, idx) => (
              <div
                key={qn.questionId || idx}
                className={`bg-white p-5 rounded-2xl border transition-all ${
                  qn.isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        qn.isCorrect ? 'bg-[#E8F7DF] text-[#21C75D]' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{qn.question}</h4>
                  </div>
                  {qn.isCorrect ? (
                    <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold shrink-0">Correct</Badge>
                  ) : (
                    <Badge className="bg-rose-50 text-rose-600 font-bold border border-rose-200 shrink-0">Incorrect</Badge>
                  )}
                </div>

                <div className="pt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold w-28">Your Answer:</span>
                    <span className={`font-bold ${qn.isCorrect ? 'text-[#21C75D]' : 'text-rose-600'}`}>
                      {qn.userAnswer || 'Unanswered'}
                    </span>
                  </div>

                  {!qn.isCorrect && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-semibold w-28">Correct Answer:</span>
                      <span className="font-bold text-slate-900">{qn.correctAnswer}</span>
                    </div>
                  )}

                  {qn.explanation && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 leading-relaxed text-[11px]">
                      <span className="font-bold text-slate-800 block mb-0.5">Explanation:</span>
                      {qn.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function StudentQuizResultPage() {
  return (
    <ErrorBoundary title="Quiz Results Error">
      <StudentQuizResultContent />
    </ErrorBoundary>
  );
}

export default StudentQuizResultPage;
