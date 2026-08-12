import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import PageLoader from '@/components/common/PageLoader';
import { useGetQuizByIdQuery, useSubmitAttemptMutation } from '../api/quizzesApi';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function StudentQuizRunnerPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: quiz, isLoading } = useGetQuizByIdQuery(quizId);
  const [submitAttempt, { isLoading: isSubmitting }] = useSubmitAttemptMutation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Timer State
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (quiz) {
      const studentId = user?._id || user?.id || '1';
      const alreadySubmitted = quiz.attempts?.some((a) => String(a.studentId) === String(studentId));
      if (alreadySubmitted) {
        toast.info('You have already completed this quiz. Re-attempts are disabled.');
        navigate(ROUTES.STUDENT.QUIZ_RESULT(quizId), { replace: true });
        return;
      }
    }

    if (quiz?.duration) {
      const initialSeconds = quiz.duration * 60;
      setTimeLeftSeconds(initialSeconds);
    }
  }, [quiz, user, quizId, navigate]);

  useEffect(() => {
    if (!quiz || isSubmitting) return;

    timerRef.current = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });

      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz, isSubmitting]);

  const handleAutoSubmit = () => {
    toast.warning('Time limit expired! Submitting your answers automatically...');
    executeSubmit();
  };

  const handleSelectAnswer = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const executeSubmit = async () => {
    if (isSubmitting) return;
    clearInterval(timerRef.current);

    try {
      await submitAttempt({
        quizId,
        answers: userAnswers,
        timeSpentSeconds,
        studentInfo: {
          id: user?._id || user?.id || '1',
          name: user?.name || 'Muhammad Ali',
          rollNumber: user?.rollNumber || '102341',
        },
      }).unwrap();

      toast.success('Quiz submitted successfully!');
      navigate(ROUTES.STUDENT.QUIZ_RESULT(quizId), { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Failed to submit quiz attempt');
    }
  };

  if (isLoading || !quiz) {
    return <PageLoader message="Initializing assessment environment..." />;
  }

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).filter((k) => userAnswers[k] !== '').length;

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const isTimerCritical = timeLeftSeconds < 120; // under 2 mins

  return (
    <div className="space-y-6 font-sans text-left max-w-3xl mx-auto">
      {/* Top Header Card with Timer & Progress */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#0072BC] bg-sky-50 px-2 py-0.5 rounded">
              {quiz.course}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{quiz.title}</h2>
          </div>

          {/* Countdown Timer Display */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-extrabold transition-colors ${
              isTimerCritical
                ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>
              {answeredCount} of {totalQuestions} Answered
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#006B3C] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <Card className="rounded-2xl border-slate-200/80 shadow-2xs overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Question Text */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#006B3C] uppercase tracking-wider">
                <span>Points: {currentQuestion.points || 20}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Controls based on Type */}
            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-3 pt-2">
                {(currentQuestion.options || []).map((opt) => {
                  const isSelected = userAnswers[currentQuestion.id] === opt;

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQuestion.id, opt)}
                      className={`w-full text-left p-4 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E8F7DF] border-[#21C75D] text-slate-900 shadow-2xs font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#21C75D] bg-[#21C75D] text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                {['True', 'False'].map((tf) => {
                  const isSelected = userAnswers[currentQuestion.id] === tf;

                  return (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQuestion.id, tf)}
                      className={`p-5 rounded-xl border text-sm font-bold text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E8F7DF] border-[#21C75D] text-[#006B3C] shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {tf}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'short_answer' && (
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Type your response here..."
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={(e) => handleSelectAnswer(currentQuestion.id, e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#006B3C] bg-slate-50"
                />
              </div>
            )}

            {/* Navigation Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Previous
              </Button>

              {currentIndex < totalQuestions - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  icon={<Send className="w-4 h-4" />}
                  className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-extrabold rounded-xl shadow-xs cursor-pointer"
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} maxWidth="max-w-md">
        <div className="text-center space-y-4 font-sans">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006B3C] flex items-center justify-center mx-auto border border-emerald-100">
            <Send className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Submit Quiz Answers?</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You have answered <span className="font-bold text-slate-900">{answeredCount}</span> of{' '}
              <span className="font-bold text-slate-900">{totalQuestions}</span> questions.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => setIsConfirmModalOpen(false)}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Review Answers
            </Button>

            <Button
              type="button"
              fullWidth
              isLoading={isSubmitting}
              onClick={() => {
                setIsConfirmModalOpen(false);
                executeSubmit();
              }}
              className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Yes, Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default StudentQuizRunnerPage;
