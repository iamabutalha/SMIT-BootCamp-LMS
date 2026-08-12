import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function TaskPerformance({ taskPerformance }) {
  if (!taskPerformance) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 font-sans text-left flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Task Performance</h3>
          <p className="text-xs text-slate-500">Breakdown of assigned coursework tasks.</p>
        </div>
        <Link
          to={ROUTES.STUDENT.TASKS}
          className="text-xs font-bold text-[#006B3C] hover:text-[#00522e] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View all tasks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Numerical Metrics Row */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Assigned</span>
          <span className="text-base font-extrabold text-slate-900">{taskPerformance.assigned}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Completed</span>
          <span className="text-base font-extrabold text-[#21C75D]">{taskPerformance.completed}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Pending</span>
          <span className="text-base font-extrabold text-[#0284C7]">{taskPerformance.pending}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Overdue</span>
          <span className="text-base font-extrabold text-[#DE646D]">{taskPerformance.overdue}</span>
        </div>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">Completion Status Ratio</span>
          <span className="text-[#21C75D] font-extrabold">75% Done</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="bg-[#21C75D] h-full transition-all duration-300" style={{ width: '75%' }} title="Completed: 75%" />
          <div className="bg-[#0284C7] h-full transition-all duration-300" style={{ width: '17%' }} title="Pending: 17%" />
          <div className="bg-[#DE646D] h-full transition-all duration-300" style={{ width: '8%' }} title="Overdue: 8%" />
        </div>
      </div>

      {/* Legend Items */}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#21C75D]" />
          <span className="text-slate-600">Completed (75%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
          <span className="text-slate-600">Pending (17%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DE646D]" />
          <span className="text-slate-600">Overdue (8%)</span>
        </div>
      </div>
    </div>
  );
}

export default TaskPerformance;
