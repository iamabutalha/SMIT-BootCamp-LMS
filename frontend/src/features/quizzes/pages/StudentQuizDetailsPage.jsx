import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, Award, ShieldAlert, PlayCircle, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import PageLoader from '@/components/common/PageLoader';
import { useGetQuizByIdQuery } from '../api/quizzesApi';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function StudentQuizDetailsPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: quiz, isLoading } = useGetQuizByIdQuery(quizId);

  if (isLoading) {
    return <PageLoader message="Loading quiz details & attempt status..." />;
  }

  if (!quiz) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs font-sans max-w-md mx-auto my-8 space-y-4">
        <h3 className="text-base font-bold text-slate-800">Quiz Not Found</h3>
        <p className="text-xs text-slate-500">The requested quiz does not exist or has been removed.</p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.STUDENT.QUIZZES)}
          className="px-4 py-2 bg-[#006B3C] text-white font-bold text-xs rounded-xl cursor-pointer"
        >
          Back to My Quizzes
        </button>
      </div>
    );
  }

  // Check if student has already completed an attempt for this quiz
  const studentId = user?._id || user?.id || '1';
  const existingAttempt = quiz.attempts?.find((a) => String(a.studentId) === String(studentId));
  const isAlreadySubmitted = Boolean(existingAttempt);

  return (
    <div className="space-y-6 font-sans text-left max-w-3xl mx-auto">
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
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase text-[#0072BC] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                {quiz.course}
              </span>
              {isAlreadySubmitted && (
                <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">
                  Completed
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">{quiz.title}</h1>
          </div>
        </div>

        {isAlreadySubmitted && (
          <Button
            type="button"
            onClick={() => navigate(ROUTES.STUDENT.QUIZ_RESULT(quiz.id))}
            icon={<Eye className="w-4 h-4" />}
            className="bg-[#0072BC] hover:bg-sky-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs cursor-pointer"
          >
            View Result
          </Button>
        )}
      </div>

      {/* Already Submitted Status Banner */}
      {isAlreadySubmitted && (
        <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#21C75D] flex items-center justify-center border border-[#21C75D]/20 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Quiz Assessment Submitted</h3>
                <p className="text-xs text-slate-600">
                  You submitted this assessment on <strong className="text-slate-900">{existingAttempt.attemptDate || 'recent date'}</strong>. Re-attempts are disabled.
                </p>
              </div>
            </div>
            {existingAttempt.status === 'Passed' ? (
              <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold text-sm px-3 py-1">Passed</Badge>
            ) : (
              <Badge className="bg-rose-50 text-rose-600 font-bold border border-rose-200 text-sm px-3 py-1">Failed</Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-emerald-200/60 text-xs font-semibold">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Your Score</span>
              <span className="text-lg font-extrabold text-[#006B3C]">{existingAttempt.percentage}%</span>
            </div>
            <div className="border-x border-emerald-200/60 px-3">
              <span className="text-[10px] text-slate-500 uppercase block">Status</span>
              <span className={`text-sm font-bold ${existingAttempt.status === 'Passed' ? 'text-[#21C75D]' : 'text-rose-600'}`}>
                {existingAttempt.status}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Time Spent</span>
              <span className="text-sm font-bold text-slate-800">{existingAttempt.timeTaken || '15 min'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Instructions & Overview Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">Assessment Description</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {quiz.description || 'Test your knowledge on course topics.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-center space-y-1">
            <Clock className="w-4 h-4 text-[#0072BC] mx-auto" />
            <div className="text-xs font-extrabold text-slate-900">{quiz.duration} Minutes</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Time Limit</div>
          </div>

          <div className="text-center space-y-1 border-x border-slate-200">
            <FileText className="w-4 h-4 text-emerald-600 mx-auto" />
            <div className="text-xs font-extrabold text-slate-900">{quiz.questions?.length || 0} Questions</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Items</div>
          </div>

          <div className="text-center space-y-1">
            <Award className="w-4 h-4 text-[#006B3C] mx-auto" />
            <div className="text-xs font-extrabold text-[#006B3C]">{quiz.passingScore}%</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Passing Grade</div>
          </div>
        </div>

        {/* Guidelines / Single Attempt Policy Note */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-800">
            <h4 className="font-bold">Assessment Attempt Policy:</h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Each student is permitted exactly <strong>1 single attempt</strong> per assessment.</li>
              <li>Once submitted, your answers are final and cannot be retaken.</li>
              <li>If the timer expires during an ongoing attempt, your answers are automatically submitted.</li>
            </ul>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Assigned by: <span className="font-bold text-slate-800">{quiz.teacher}</span>
          </div>

          {isAlreadySubmitted ? (
            <Button
              type="button"
              onClick={() => navigate(ROUTES.STUDENT.QUIZ_RESULT(quiz.id))}
              icon={<Eye className="w-5 h-5" />}
              className="bg-[#0072BC] hover:bg-sky-700 text-white py-3 px-8 text-sm font-extrabold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              View Quiz Results
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => navigate(ROUTES.STUDENT.QUIZ_ATTEMPT(quiz.id))}
              icon={<PlayCircle className="w-5 h-5" />}
              className="bg-[#006B3C] hover:bg-[#00522e] text-white py-3 px-8 text-sm font-extrabold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Start Quiz Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentQuizDetailsPage;
