import { Award, CheckCircle2, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import Avatar from '@/components/ui/Avatar';

export function QuizAnalyticsCard({ quizzes }) {
  if (!quizzes) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 font-sans text-left flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Quiz Performance</h3>
          <p className="text-xs text-slate-500 font-medium">Assessed knowledge benchmarks, pass rates, and exam scores.</p>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Quizzes</span>
          <span className="text-xl font-extrabold text-slate-900">{quizzes.total}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FEF8C2] border border-[#DAA622]/20 space-y-0.5">
          <span className="text-[10px] text-[#C88B0D] font-bold uppercase block">Avg Score</span>
          <span className="text-xl font-extrabold text-[#C88B0D]">{quizzes.avgScore}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#E8F7DF] border border-[#006B3C]/20 space-y-0.5">
          <span className="text-[10px] text-[#006B3C] font-bold uppercase block">Highest</span>
          <span className="text-xl font-extrabold text-[#006B3C]">{quizzes.highestScore}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8E5E2] border border-[#DE646D]/20 space-y-0.5">
          <span className="text-[10px] text-[#DE646D] font-bold uppercase block">Lowest</span>
          <span className="text-xl font-extrabold text-[#DE646D]">{quizzes.lowestScore}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F1F5FF] border border-[#2D67E4]/20 space-y-0.5 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#2D67E4] font-bold uppercase block">Pass Rate</span>
          <span className="text-xl font-extrabold text-[#2D67E4]">{quizzes.passRate}</span>
        </div>
      </div>

      {/* Quiz Trend Bar Chart */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-700">Average Score Per Quiz Assessment</span>
        <div className="h-32 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quizzes.trend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <XAxis dataKey="quiz" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#DAA622" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Quiz Performers Table */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Quiz Performers</h4>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">Attempts</th>
                <th className="py-2.5 px-3">Avg Score</th>
                <th className="py-2.5 px-3 text-right">Pass Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {quizzes.topPerformers.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={student.name} className="w-6 h-6 shrink-0" />
                      <span className="font-bold text-slate-900 truncate">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-slate-600">{student.attempts}</td>
                  <td className="py-2 px-3 text-[#DAA622] font-bold">{student.avgScore}</td>
                  <td className="py-2 px-3 text-right font-extrabold text-[#006B3C]">{student.passRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuizAnalyticsCard;
