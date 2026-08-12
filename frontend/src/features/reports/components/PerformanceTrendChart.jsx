import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl border border-slate-800 space-y-1.5 font-sans">
        <p className="font-bold text-slate-300 border-b border-slate-700 pb-1">{label}</p>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="text-slate-400 capitalize">{entry.name}:</span>
            <span className="font-extrabold" style={{ color: entry.color }}>
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceTrendChart({ data }) {
  const [timeframe, setTimeframe] = useState('30_DAYS');

  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Bootcamp Performance Trend</h3>
            <p className="text-xs text-slate-500 font-medium">
              Multi-metric trajectory comparing attendance, assignments, quizzes, and tasks over time.
            </p>
          </div>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 self-start sm:self-auto">
          {[
            { id: '7_DAYS', label: '7 Days' },
            { id: '30_DAYS', label: '30 Days' },
            { id: '3_MONTHS', label: '3 Months' },
            { id: '6_MONTHS', label: '6 Months' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTimeframe(item.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === item.id
                  ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006B3C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#006B3C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area type="monotone" dataKey="overall" name="Overall Avg" stroke="#006B3C" strokeWidth={3} fill="url(#colorOverall)" />
            <Area type="monotone" dataKey="attendance" name="Attendance" stroke="#57BA7F" strokeWidth={2} fill="none" />
            <Area type="monotone" dataKey="assignments" name="Assignments" stroke="#2D67E4" strokeWidth={2} fill="none" />
            <Area type="monotone" dataKey="quizzes" name="Quizzes" stroke="#DAA622" strokeWidth={2} fill="none" />
            <Area type="monotone" dataKey="tasks" name="Tasks" stroke="#21C65C" strokeWidth={2} fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#006B3C]" />
          <span className="font-semibold text-slate-700">Overall Score</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#57BA7F]" />
          <span className="font-semibold text-slate-700">Attendance Rate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#2D67E4]" />
          <span className="font-semibold text-slate-700">Assignments</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#DAA622]" />
          <span className="font-semibold text-slate-700">Quizzes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#21C65C]" />
          <span className="font-semibold text-slate-700">Tasks</span>
        </div>
      </div>
    </div>
  );
}

export default PerformanceTrendChart;
