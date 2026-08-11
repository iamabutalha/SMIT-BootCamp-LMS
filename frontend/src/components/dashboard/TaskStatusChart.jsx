import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { ClipboardList } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-800">
        <p className="font-bold">{label}</p>
        <p className="text-sm font-extrabold" style={{ color: data.payload.color }}>
          {data.value} Assignments
        </p>
      </div>
    );
  }
  return null;
};

export function TaskStatusChart({ data = [] }) {
  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EFE7FF] text-[#9D6BE2] flex items-center justify-center">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Assignment Status</h3>
            <p className="text-xs text-slate-500">Completed, pending, & overdue submissions</p>
          </div>
        </div>
      </div>

      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={36}>
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend summary */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center p-2 rounded-xl bg-slate-50 text-center">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] font-medium text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskStatusChart;
