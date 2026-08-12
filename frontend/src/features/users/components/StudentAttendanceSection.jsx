import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { CalendarCheck, Filter, TrendingUp, CheckCircle2, XCircle, Clock } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-2 rounded-xl shadow-lg border border-slate-800">
        <p className="font-bold text-slate-300">{label}</p>
        <p className="text-[#7DE8AA] font-extrabold text-sm">
          Attendance: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function StudentAttendanceSection({ attendance = {} }) {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState('August');
  const [selectedWeek, setSelectedWeek] = useState('All');

  const logs = attendance.logs || [];
  const trend = attendance.trend || [];

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-6 font-sans">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Attendance History & Trend</h3>
            <p className="text-xs text-slate-500">Student attendance breakdown over time</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value="August">August</option>
            <option value="July">July</option>
            <option value="June">June</option>
          </select>

          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value="All">All Weeks</option>
            <option value="Week 1">Week 1</option>
            <option value="Week 2">Week 2</option>
            <option value="Week 3">Week 3</option>
          </select>
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Overall Rate</span>
          <p className="text-xl font-bold text-[#006B3C] mt-0.5">{attendance.rate || 92}%</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Present Days</span>
          <p className="text-xl font-bold text-[#006B3C] mt-0.5">{attendance.presentCount || 23} Days</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Absent Days</span>
          <p className="text-xl font-bold text-[#DE646D] mt-0.5">{attendance.absentCount || 2} Days</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Approved Leaves</span>
          <p className="text-xl font-bold text-[#DAA622] mt-0.5">{attendance.leaveCount || 1} Days</p>
        </div>
      </div>

      {/* Attendance Trend Chart */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Attendance Percentage Trend</h4>
        <div className="w-full pt-1">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="studentAttGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006B3C" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#006B3C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[50, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="rate" stroke="#006B3C" strokeWidth={2.5} fill="url(#studentAttGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Attendance Logs Table */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Daily Attendance Logs</h4>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Day</th>
                <th className="py-2.5 px-3">Check-In</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{log.date}</td>
                  <td className="py-2.5 px-3 text-slate-600">{log.day}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{log.checkIn}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        log.status === 'Present'
                          ? 'bg-[#E8F7DF] text-[#006B3C]'
                          : log.status === 'Absent'
                          ? 'bg-[#F8E5E2] text-[#DE646D]'
                          : 'bg-[#FEF8C2] text-[#DAA622]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          log.status === 'Present'
                            ? 'bg-[#006B3C]'
                            : log.status === 'Absent'
                            ? 'bg-[#DE646D]'
                            : 'bg-[#DAA622]'
                        }`}
                      />
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 italic">{log.remarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendanceSection;
