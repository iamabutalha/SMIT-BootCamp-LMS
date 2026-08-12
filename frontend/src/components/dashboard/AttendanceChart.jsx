import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CalendarCheck } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-800">
        <p className="font-bold">{data.name}</p>
        <p className="text-sm font-extrabold" style={{ color: data.payload.color }}>
          {data.value}% of Students
        </p>
      </div>
    );
  }
  return null;
};

export function AttendanceChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Attendance Overview</h3>
            <p className="text-xs text-slate-500">Distribution of present, absent, & leave</p>
          </div>
        </div>
      </div>

      <div className="relative h-48 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-[#006B3C]">
            {data.find((d) => d.name === 'Present')?.value || 82}%
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Present</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center p-2 rounded-xl bg-slate-50 text-center">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] font-medium text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceChart;
