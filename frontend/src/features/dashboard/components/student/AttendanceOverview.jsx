import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export function AttendanceOverview({ attendance }) {
  if (!attendance) return null;

  const distribution = attendance.distribution || [
    { name: 'Present', value: 22, color: '#57BA7F' },
    { name: 'Leave', value: 1, color: '#DAA622' },
    { name: 'Absent', value: 1, color: '#DE646D' },
  ];

  return (
    <ErrorBoundary title="Attendance Overview Error">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Attendance Overview</h3>
            <p className="text-xs text-slate-500">Class attendance breakdown across 24 sessions.</p>
          </div>
          <span className="text-xs font-extrabold text-[#57BA7F] bg-emerald-50 px-2.5 py-1 rounded-lg">
            {attendance.rate}% Rate
          </span>
        </div>

        {/* Donut Visualization */}
        <div className="h-44 w-full relative flex items-center justify-center min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={140}>
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={68}
                paddingAngle={4}
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`att-pie-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-slate-900">{attendance.rate}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Present</span>
          </div>
        </div>

        {/* Summary Breakdown Grid */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-xs">
          <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Present</span>
            <span className="font-extrabold text-[#57BA7F]">{attendance.present} Days</span>
          </div>

          <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Leave</span>
            <span className="font-extrabold text-[#DAA622]">{attendance.leave} Day</span>
          </div>

          <div className="p-2 rounded-xl bg-rose-50/60 border border-rose-100">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Absent</span>
            <span className="font-extrabold text-[#DE646D]">{attendance.absent} Day</span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default AttendanceOverview;
