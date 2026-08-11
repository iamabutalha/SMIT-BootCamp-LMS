import { Users, ClipboardList, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export function TeamSummaryCards({ membersCount = 0, tasks = [] }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending' || t.status === 'In Progress').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
      {/* Total Members */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#0C0E0F]">{membersCount}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Total Members</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Total Tasks */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#0C0E0F]">{totalTasks}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Total Tasks</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5" />
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#006B3C]">{completedTasks}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Completed</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Pending / In Progress Tasks */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#DAA622]">{pendingTasks}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Pending Tasks</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      {/* Team Progress % */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex flex-col justify-between col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Team Progress</span>
          <span className="text-xs font-extrabold text-[#006B3C]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
          <div
            className="bg-[#006B3C] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 font-medium mt-1">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
    </div>
  );
}

export default TeamSummaryCards;
