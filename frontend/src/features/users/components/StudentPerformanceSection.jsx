import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Target, Award } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-lg border border-slate-800 space-y-1">
        <p className="font-bold text-slate-300">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="font-extrabold text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function StudentPerformanceSection({ performance = {} }) {
  const chartData = performance.chartData || [];

  const matrixItems = [
    { label: 'Attendance Rate', value: performance.attendanceScore || 92, color: '#006B3C' },
    { label: 'Task Completion', value: performance.taskCompletionScore || 75, color: '#2D67E4' },
    { label: 'Assignment Grade', value: performance.assignmentCompletionScore || 88, color: '#006B3C' },
    { label: 'On-Time Submission Rate', value: performance.onTimeSubmissionScore || 88, color: '#DAA622' },
    { label: 'Overall Performance', value: performance.overallScore || 86, color: '#006B3C' },
  ];

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Performance Matrix & Cohort Comparison</h3>
            <p className="text-xs text-slate-500">Multidimensional student performance metrics vs batch benchmark</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#E8F7DF] text-[#006B3C] px-3 py-1 rounded-full text-xs font-extrabold">
          <Award className="w-3.5 h-3.5" />
          <span>Overall {performance.overallScore || 86}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Matrix Progress Bars */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Performance Breakdown</h4>
          <div className="space-y-3">
            {matrixItems.map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.label}</span>
                  <span className="font-extrabold" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recharts Bar Chart: Student vs Cohort Average */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cohort Benchmark Comparison</h4>
          <div className="w-full pt-1">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="metric" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="student" name="Student Score" fill="#006B3C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cohortAverage" name="Cohort Average" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPerformanceSection;
