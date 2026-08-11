import { CalendarCheck, ClipboardList, BookOpen, Target } from 'lucide-react';

export function StudentOverviewCards({ overview = {} }) {
  const {
    attendanceRate = 92,
    tasksCompleted = 18,
    tasksTotal = 24,
    assignmentsCompleted = 14,
    assignmentsTotal = 18,
    overallPerformance = 86,
  } = overview;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans">
      {/* Attendance % */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#006B3C]">{attendanceRate}%</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Attendance Rate</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#006B3C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C]" />
            <span>Regular Student</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <CalendarCheck className="w-5 h-5" />
        </div>
      </div>

      {/* Tasks Assigned & Completed */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#0C0E0F]">
            {tasksCompleted} <span className="text-xs text-slate-400 font-normal">/ {tasksTotal}</span>
          </p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Tasks Completed</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#9D6BE2]">
            <span>{tasksTotal - tasksCompleted} Pending</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#EFE7FF] text-[#9D6BE2] flex items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5" />
        </div>
      </div>

      {/* Assignments Completed */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#2D67E4]">
            {assignmentsCompleted} <span className="text-xs text-slate-400 font-normal">/ {assignmentsTotal}</span>
          </p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Assignments Completed</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#2D67E4]">
            <span>{assignmentsTotal - assignmentsCompleted} Pending</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      {/* Overall Performance % */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#006B3C]">{overallPerformance}%</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Overall Performance</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#006B3C]">
            <span>High Performer Tier</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <Target className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default StudentOverviewCards;
