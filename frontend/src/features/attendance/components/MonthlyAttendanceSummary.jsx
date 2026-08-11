import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Calendar, CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-800">
        <p className="font-bold text-slate-300">{label}</p>
        <p className="text-[#7DE8AA] font-extrabold text-sm">
          Attendance: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function MonthlyAttendanceSummary({ monthLabel, year, trendData = [] }) {
  return (
    <div className="space-y-6 font-sans">
      {/* Monthly Summary Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Working Days</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">22 Days</p>
          <p className="text-[11px] text-slate-400 mt-1">Full working month</p>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Attendance</p>
          <p className="text-2xl font-bold text-[#006B3C] mt-1">84.5%</p>
          <p className="text-[11px] text-[#006B3C] font-semibold mt-1">+2.4% vs last month</p>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Present</p>
          <p className="text-2xl font-bold text-[#006B3C] mt-1">18.5 Days</p>
          <p className="text-[11px] text-slate-400 mt-1">Per student average</p>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Absent</p>
          <p className="text-2xl font-bold text-[#DE646D] mt-1">2.4 Days</p>
          <p className="text-[11px] text-red-500 font-semibold mt-1">Unexcused absences</p>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Leave</p>
          <p className="text-2xl font-bold text-[#DAA622] mt-1">1.1 Days</p>
          <p className="text-[11px] text-slate-400 mt-1">Approved leaves</p>
        </div>
      </div>

      {/* Monthly Attendance Trend Line Chart */}
      <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0C0E0F]">
                Daily Attendance Trend — {monthLabel} {year}
              </h3>
              <p className="text-xs text-slate-500">Track daily student attendance percentage fluctuations</p>
            </div>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[50, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="rate" stroke="#006B3C" strokeWidth={3} dot={{ r: 4, fill: '#006B3C' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MonthlyAttendanceSummary;
