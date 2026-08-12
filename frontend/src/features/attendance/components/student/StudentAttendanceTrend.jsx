import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export function StudentAttendanceTrend({ trendData = [] }) {
  if (!trendData || trendData.length === 0) return null;

  return (
    <ErrorBoundary title="Attendance Trend Error">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Attendance Trend</h3>
          <p className="text-xs text-slate-500">Monthly breakdown of present, absent, and leave counts over time.</p>
        </div>

        <div className="h-64 w-full pt-2 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={180}>
            <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="present" name="Present" fill="#57BA7F" radius={[6, 6, 0, 0]} />
              <Bar dataKey="leave" name="Leave" fill="#DAA622" radius={[6, 6, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#DE646D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default StudentAttendanceTrend;
