import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';
import StudentAttendanceDateModal from './StudentAttendanceDateModal';

export function StudentAttendanceCalendar({ records = [] }) {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default month: August 2026
  const monthDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-08-${String(dayNum).padStart(2, '0')}`;
    const record = records.find((r) => r.date === dateStr);
    return {
      dayNum,
      dateStr,
      record,
    };
  });

  const handleDateClick = (item) => {
    if (item.record) {
      setSelectedRecord(item.record);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Attendance Calendar</h3>
          <p className="text-xs text-slate-500">Visual monthly calendar log. Click a session date to view read-only details.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
          <Calendar className="w-4 h-4 text-[#006B3C]" />
          <span>August 2026</span>
        </div>
      </div>

      {/* Legend Indicators */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium pt-1 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#57BA7F] flex items-center justify-center text-white text-[9px] font-bold">✓</span>
          <span className="text-slate-700">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#DE646D] flex items-center justify-center text-white text-[9px] font-bold">×</span>
          <span className="text-slate-700">Absent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#DAA622] flex items-center justify-center text-white text-[9px] font-bold">L</span>
          <span className="text-slate-700">Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />
          <span className="text-slate-400">No Class</span>
        </div>
      </div>

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Offset for Aug 1, 2026 (Saturday = col 7, so 6 empty slots) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`empty-${i}`} className="h-12 rounded-xl bg-slate-50/40 border border-transparent" />
        ))}

        {monthDays.map((item) => {
          const rec = item.record;
          const status = rec?.status;

          let tileStyle = 'bg-slate-50/70 border-slate-100 text-slate-600';
          let statusBadge = null;

          if (status === 'present') {
            tileStyle = 'bg-emerald-50/90 border-emerald-200 text-[#57BA7F] font-extrabold hover:bg-emerald-100 cursor-pointer shadow-2xs';
            statusBadge = <span className="text-[10px] font-extrabold text-[#57BA7F]">✓</span>;
          } else if (status === 'absent') {
            tileStyle = 'bg-rose-50/90 border-rose-200 text-[#DE646D] font-extrabold hover:bg-rose-100 cursor-pointer shadow-2xs';
            statusBadge = <span className="text-[10px] font-extrabold text-[#DE646D]">×</span>;
          } else if (status === 'leave') {
            tileStyle = 'bg-amber-50/90 border-amber-200 text-[#DAA622] font-extrabold hover:bg-amber-100 cursor-pointer shadow-2xs';
            statusBadge = <span className="text-[10px] font-extrabold text-[#DAA622]">L</span>;
          }

          return (
            <button
              key={item.dateStr}
              type="button"
              disabled={!rec}
              onClick={() => handleDateClick(item)}
              className={`h-12 rounded-xl border p-1.5 flex flex-col justify-between transition-all ${tileStyle}`}
              title={rec ? `${item.dateStr}: ${rec.status} (${rec.session})` : `${item.dateStr}: No class`}
            >
              <span className="text-xs">{item.dayNum}</span>
              <div className="self-end">{statusBadge}</div>
            </button>
          );
        })}
      </div>

      {/* Date Details Modal */}
      <StudentAttendanceDateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
}

export default StudentAttendanceCalendar;
