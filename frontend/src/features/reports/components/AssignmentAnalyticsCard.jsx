import { FileCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

export function AssignmentAnalyticsCard({ assignments }) {
  if (!assignments) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 font-sans text-left flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#DBEAFF] text-[#2D67E4] flex items-center justify-center shrink-0">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Assignment Performance</h3>
          <p className="text-xs text-slate-500 font-medium">Completion rates, submission statuses, and top student scorers.</p>
        </div>
      </div>

      {/* Metric Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Assigned</span>
          <span className="text-xl font-extrabold text-slate-900">{assignments.total}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#E8F7DF] border border-[#006B3C]/20 space-y-0.5">
          <span className="text-[10px] text-[#006B3C] font-bold uppercase block">Completed</span>
          <span className="text-xl font-extrabold text-[#006B3C]">{assignments.completed}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FEF8C2] border border-[#DAA622]/20 space-y-0.5">
          <span className="text-[10px] text-[#C88B0D] font-bold uppercase block">Pending</span>
          <span className="text-xl font-extrabold text-[#C88B0D]">{assignments.pending}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8E5E2] border border-[#DE646D]/20 space-y-0.5">
          <span className="text-[10px] text-[#DE646D] font-bold uppercase block">Overdue</span>
          <span className="text-xl font-extrabold text-[#DE646D]">{assignments.overdue}</span>
        </div>
      </div>

      {/* Progress Bar Visualization */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700">Overall Completion Rate</span>
          <span className="text-[#2D67E4] font-extrabold">{assignments.avgCompletionRate}</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-[#006B3C]" style={{ width: '85.7%' }} title="Completed" />
          <div className="h-full bg-[#DAA622]" style={{ width: '10.7%' }} title="Pending" />
          <div className="h-full bg-[#DE646D]" style={{ width: '3.6%' }} title="Overdue" />
        </div>
      </div>

      {/* Top Assignment Performers Table */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Performing Students</h4>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">Completed</th>
                <th className="py-2.5 px-3">Pending</th>
                <th className="py-2.5 px-3 text-right">Avg Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {assignments.topPerformers.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={student.name} className="w-6 h-6 shrink-0" />
                      <span className="font-bold text-slate-900 truncate">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-[#006B3C] font-bold">{student.completed}</td>
                  <td className="py-2 px-3 text-slate-500">{student.pending}</td>
                  <td className="py-2 px-3 text-right font-extrabold text-[#2D67E4]">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignmentAnalyticsCard;
