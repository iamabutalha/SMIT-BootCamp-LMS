import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { CalendarCheck, TrendingUp, Sparkles } from 'lucide-react';

export function AttendanceAnalyticsCard({ attendance }) {
  if (!attendance) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 font-sans text-left flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Attendance Analytics</h3>
          <p className="text-xs text-slate-500 font-medium">Distribution breakdown and weekly attendance trajectory.</p>
        </div>
      </div>

      {/* Main Grid: Donut + Weekly Trend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Donut Chart */}
        <div className="relative h-44 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendance.distribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {attendance.distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-[#006B3C]">88.6%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Present Rate</span>
          </div>
        </div>

        {/* Weekly Trend Mini Line Chart */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Weekly Attendance Trend</span>
            <span className="text-[#006B3C] font-extrabold">95% Peak</span>
          </div>
          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendance.trend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="week" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#006B3C" strokeWidth={3} dot={{ r: 4, fill: '#006B3C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Distribution Legend */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
        {attendance.distribution.map((item) => (
          <div key={item.name} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-0.5">
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">{item.count}</p>
            <span className="text-[10px] text-slate-400 font-semibold">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Insight Highlight Box */}
      <div className="p-3 rounded-xl bg-[#E8F7DF] border border-[#006B3C]/20 flex items-center gap-2.5 text-xs text-[#006B3C]">
        <Sparkles className="w-4 h-4 shrink-0" />
        <span className="font-semibold">{attendance.insight}</span>
      </div>
    </div>
  );
}

export default AttendanceAnalyticsCard;
