import { Users, CheckCircle2, XCircle, Clock } from 'lucide-react';

export function AttendanceSummaryCards({ summary = {} }) {
  const {
    totalStudents = 120,
    presentCount = 98,
    absentCount = 15,
    leaveCount = 7,
    attendanceRate = 81.6,
  } = summary;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans">
      {/* Total Students Card */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#0C0E0F]">{totalStudents}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Total Students</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#2D67E4]">
            <span>Active Roster</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Present Card */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#006B3C]">{presentCount}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Present</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#006B3C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C]" />
            <span>{attendanceRate}% Rate</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Absent Card */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#DE646D]">{absentCount}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Absent</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#DE646D]">
            <span>Requires Follow-up</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center shrink-0">
          <XCircle className="w-5 h-5" />
        </div>
      </div>

      {/* Leave Card */}
      <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#DAA622]">{leaveCount}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Leave</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#DAA622]">
            <span>Approved Applications</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default AttendanceSummaryCards;
