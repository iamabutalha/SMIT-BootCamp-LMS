import Avatar from '@/components/ui/Avatar';

export function WeeklyAttendanceMatrix({ weeklyRoster = [], weekLabel }) {
  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-[#0C0E0F]">
            Weekly Attendance Roster Matrix — {weekLabel}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            5-Day Monday–Friday attendance breakdown per student
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006B3C]" /> Present (P)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DE646D]" /> Absent (A)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DAA622]" /> Leave (L)
          </span>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 min-w-[180px]">Student Name</th>
              <th className="py-3 px-4 text-center">Roll #</th>
              <th className="py-3 px-4 text-center">Mon</th>
              <th className="py-3 px-4 text-center">Tue</th>
              <th className="py-3 px-4 text-center">Wed</th>
              <th className="py-3 px-4 text-center">Thu</th>
              <th className="py-3 px-4 text-center">Fri</th>
              <th className="py-3 px-4 text-right">Weekly Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {weeklyRoster.map((st) => {
              const presentCount = ['mon', 'tue', 'wed', 'thu', 'fri'].filter(
                (d) => st.days?.[d] === 'P'
              ).length;
              const rate = Math.round((presentCount / 5) * 100);

              return (
                <tr key={st.rollNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={st.name} className="w-7 h-7 shrink-0" />
                      <span className="font-bold text-slate-900">{st.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-600">
                    {st.rollNumber}
                  </td>

                  {['mon', 'tue', 'wed', 'thu', 'fri'].map((day) => {
                    const status = st.days?.[day] || 'P';
                    const badgeClass =
                      status === 'P'
                        ? 'bg-[#E8F7DF] text-[#006B3C] border-[#006B3C]/30'
                        : status === 'A'
                        ? 'bg-[#F8E5E2] text-[#DE646D] border-[#DE646D]/30'
                        : 'bg-[#FEF8C2] text-[#DAA622] border-[#DAA622]/30';

                    return (
                      <td key={day} className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold border ${badgeClass}`}
                        >
                          {status}
                        </span>
                      </td>
                    );
                  })}

                  <td className="py-3 px-4 text-right font-extrabold text-[#006B3C]">
                    {rate}%
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

export default WeeklyAttendanceMatrix;
