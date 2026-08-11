import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-800 space-y-1">
        <p className="font-bold text-slate-300">{label}</p>
        <p className="text-[#7DE8AA] font-extrabold text-sm">
          Progress: {payload[0].value}%
        </p>
        {payload[1] && (
          <p className="text-slate-400 text-[11px]">
            Target: {payload[1].value}%
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function ProgressChart({ data = [] }) {
  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Student Progress Over Time</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">Average cohort completion percentage</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#006B3C] bg-[#E8F7DF] px-2.5 py-1 rounded-full">
          <span>+14.2% growth</span>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006B3C" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#006B3C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="week"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="#006B3C"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#progressGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;
