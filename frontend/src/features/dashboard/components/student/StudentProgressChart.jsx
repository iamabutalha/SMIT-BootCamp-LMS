import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export function StudentProgressChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 text-xs text-slate-500 text-center font-sans">
        Progress timeline data unavailable.
      </div>
    );
  }

  return (
    <ErrorBoundary title="Progress Chart Error">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Overall Progress Trajectory</h3>
            <p className="text-xs text-slate-500">Cumulative percentage completion across weekly modules.</p>
          </div>
          <span className="text-xs font-extrabold text-[#006B3C] bg-[#E8F7DF] px-2.5 py-1 rounded-lg">
            78% Overall
          </span>
        </div>

        <div className="h-64 w-full pt-2 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={180}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#21C75D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#21C75D" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 'bold' }}
                formatter={(val) => [`${val}%`, 'Progress']}
              />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#21C75D"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#progressGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default StudentProgressChart;
