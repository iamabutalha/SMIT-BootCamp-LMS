import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, Award, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/constants/routes';

export function QuizPerformance({ quizPerformance }) {
  if (!quizPerformance) return null;

  const recentQuizzes = quizPerformance.recentQuizzes || [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Quiz Performance</h3>
          <p className="text-xs text-slate-500">Summary metrics and recent assessment scores.</p>
        </div>
        <Link
          to={ROUTES.STUDENT.QUIZZES}
          className="text-xs font-bold text-[#006B3C] hover:text-[#00522e] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View all quizzes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Avg Score</span>
          <span className="text-base font-extrabold text-purple-700">{quizPerformance.averageScore}%</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Attempted</span>
          <span className="text-base font-extrabold text-slate-900">{quizPerformance.attemptedCount}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Highest</span>
          <span className="text-base font-extrabold text-[#21C75D]">{quizPerformance.highestScore}%</span>
        </div>

        <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Pending</span>
          <span className="text-base font-extrabold text-[#0284C7]">{quizPerformance.pendingCount}</span>
        </div>
      </div>

      {/* Recent Quizzes List */}
      <div className="space-y-2 pt-1">
        {recentQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#21C75D] flex items-center justify-center shrink-0 border border-[#21C75D]/20">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{quiz.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium block">{quiz.attempt} • {quiz.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-extrabold text-[#21C75D] bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                {quiz.score}
              </span>
              <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold text-[10px]">
                {quiz.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizPerformance;
