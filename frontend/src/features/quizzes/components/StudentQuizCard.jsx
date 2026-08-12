import { Link } from 'react-router-dom';
import { Clock, FileText, Award, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';

export function StudentQuizCard({ quiz, tab = 'Available' }) {
  const isCompleted = tab === 'Completed' || Boolean(quiz.attempt);
  const attempt = quiz.attempt;

  return (
    <Card className="rounded-2xl border-slate-200/80 shadow-2xs hover:shadow-md transition-all font-sans text-left flex flex-col justify-between overflow-hidden group">
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Top Course Tag + Status */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase text-[#0072BC] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
              {quiz.course}
            </span>
            {isCompleted ? (
              attempt?.status === 'Passed' ? (
                <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">Passed</Badge>
              ) : (
                <Badge className="bg-rose-50 text-rose-600 font-bold border border-rose-200">Failed</Badge>
              )
            ) : (
              <Badge variant="outline" className="text-slate-600 font-semibold">Available</Badge>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006B3C] transition-colors line-clamp-1">
              {quiz.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {quiz.description || 'Test your knowledge on course topics and earn your completion certificate.'}
            </p>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Duration</span>
              <span className="font-extrabold text-slate-800">{quiz.duration}m</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <FileText className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Questions</span>
              <span className="font-extrabold text-slate-800">{quiz.questions?.length || 0}</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Award className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Pass %</span>
              <span className="font-extrabold text-[#006B3C]">{quiz.passingScore}%</span>
            </div>
          </div>

          {/* Action Trigger */}
          {isCompleted ? (
            <div className="flex items-center justify-between pt-1">
              <div className="text-xs">
                <span className="text-slate-400">Your Score: </span>
                <span className={`font-extrabold ${attempt?.status === 'Passed' ? 'text-[#21C75D]' : 'text-rose-600'}`}>
                  {attempt?.percentage}%
                </span>
              </div>
              <Link to={ROUTES.STUDENT.QUIZ_RESULT(quiz.id)}>
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50 py-2 h-9 rounded-xl cursor-pointer"
                >
                  View Result
                </Button>
              </Link>
            </div>
          ) : (
            <Link to={ROUTES.STUDENT.QUIZ_DETAIL(quiz.id)} className="block">
              <Button
                type="button"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2.5 h-10 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Start Quiz
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentQuizCard;
