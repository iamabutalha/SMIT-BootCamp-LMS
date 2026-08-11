import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function DailyAttendanceTable({ records = [], onStatusChange, formattedDateLabel }) {
  if (records.length === 0) {
    return (
      <div className="bg-white p-8 rounded-[16px] border border-slate-200/80 shadow-2xs">
        <EmptyState
          title="No Attendance Records Found"
          description={`No attendance logs recorded for ${formattedDateLabel || 'this selected date'}.`}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-[#0C0E0F]">
            Daily Attendance Logs — {formattedDateLabel}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed student check-in, check-out, and attendance status
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#E8F7DF] text-[#006B3C]">
          {records.length} Students Logged
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Roll Number</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Check-In Time</th>
              <th className="py-3 px-4">Check-Out Time</th>
              <th className="py-3 px-4">Remarks</th>
              <th className="py-3 px-4 text-right">Quick Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {records.map((rec) => {
              const statusClass =
                rec.status === 'Present'
                  ? 'bg-[#E8F7DF] text-[#006B3C] border-[#006B3C]/20'
                  : rec.status === 'Absent'
                  ? 'bg-[#F8E5E2] text-[#DE646D] border-[#DE646D]/20'
                  : 'bg-[#FEF8C2] text-[#DAA622] border-[#DAA622]/20';

              return (
                <tr key={rec.id || rec.rollNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={rec.studentName} className="w-8 h-8 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">{rec.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {rec.course || 'Web Development'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-700 font-mono">
                    {rec.rollNumber}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${statusClass}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          rec.status === 'Present'
                            ? 'bg-[#006B3C]'
                            : rec.status === 'Absent'
                            ? 'bg-[#DE646D]'
                            : 'bg-[#DAA622]'
                        }`}
                      />
                      <span>{rec.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {rec.checkIn || '—'}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {rec.checkOut || '—'}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 italic max-w-xs truncate">
                    {rec.remarks || '—'}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                      {['Present', 'Absent', 'Leave'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => onStatusChange && onStatusChange(rec.rollNumber, st)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded transition cursor-pointer ${
                            rec.status === st
                              ? st === 'Present'
                                ? 'bg-[#006B3C] text-white'
                                : st === 'Absent'
                                ? 'bg-[#DE646D] text-white'
                                : 'bg-[#DAA622] text-white'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {st[0]}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyAttendanceTable;
