import { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Users,
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Layers,
  ChevronRight,
  Mail,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { toast } from 'sonner';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/Button';

// Mock Progress Data
const MODULE_PROGRESS_DATA = [
  { module: 'Mod 1: HTML & CSS', avgScore: 88, threshold: 70 },
  { module: 'Mod 2: JS Basics', avgScore: 82, threshold: 70 },
  { module: 'Mod 3: Advanced JS', avgScore: 76, threshold: 70 },
  { module: 'Mod 4: React.js', avgScore: 80, threshold: 70 },
  { module: 'Mod 5: Node & Express', avgScore: 74, threshold: 70 },
  { module: 'Mod 6: Fullstack App', avgScore: 84, threshold: 70 },
];

const BATCH_COMPARISON_DATA = [
  { batch: 'Batch 9', avgScore: 76, completion: 92, color: '#2D67E4' },
  { batch: 'Batch 10', avgScore: 82, completion: 85, color: '#006B3C' },
  { batch: 'Batch 11', avgScore: 78, completion: 74, color: '#DAA622' },
  { batch: 'Batch 12', avgScore: 84, completion: 65, color: '#9D6BE2' },
];

const GRADE_DISTRIBUTION_DATA = [
  { name: 'Excellent (>85%)', value: 45, color: '#006B3C' },
  { name: 'Good (70-84%)', value: 35, color: '#2D67E4' },
  { name: 'Average (60-69%)', value: 12, color: '#DAA622' },
  { name: 'At Risk (<60%)', value: 8, color: '#DE646D' },
];

const STUDENT_PROGRESS_ROSTER = [
  {
    id: 'p1',
    rollNumber: '102341',
    name: 'Muhammad Ali',
    batch: 'Batch 12',
    course: 'Web & Mobile Dev',
    progress: 92,
    attendanceRate: 96,
    assignmentsDone: '12/12',
    status: 'EXCELLENT',
  },
  {
    id: 'p2',
    rollNumber: '102342',
    name: 'Fatima Ahmed',
    batch: 'Batch 12',
    course: 'Web & Mobile Dev',
    progress: 88,
    attendanceRate: 92,
    assignmentsDone: '11/12',
    status: 'EXCELLENT',
  },
  {
    id: 'p3',
    rollNumber: '102343',
    name: 'Usman Ghani',
    batch: 'Batch 10',
    course: 'AI & Data Science',
    progress: 74,
    attendanceRate: 85,
    assignmentsDone: '9/12',
    status: 'GOOD',
  },
  {
    id: 'p4',
    rollNumber: '102344',
    name: 'Aisha Malik',
    batch: 'Batch 10',
    course: 'Cloud Native',
    progress: 58,
    attendanceRate: 65,
    assignmentsDone: '6/12',
    status: 'AT RISK',
  },
  {
    id: 'p5',
    rollNumber: '102345',
    name: 'Bilal Hussain',
    batch: 'Batch 9',
    course: 'Web & Mobile Dev',
    progress: 81,
    attendanceRate: 90,
    assignmentsDone: '10/12',
    status: 'GOOD',
  },
  {
    id: 'p6',
    rollNumber: '102346',
    name: 'Zainab Bibi',
    batch: 'Batch 12',
    course: 'Web & Mobile Dev',
    progress: 94,
    attendanceRate: 98,
    assignmentsDone: '12/12',
    status: 'EXCELLENT',
  },
  {
    id: 'p7',
    rollNumber: '102347',
    name: 'Hamza Khan',
    batch: 'Batch 10',
    course: 'AI & Data Science',
    progress: 54,
    attendanceRate: 60,
    assignmentsDone: '5/12',
    status: 'AT RISK',
  },
];

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

export function ProgressPage() {
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = useMemo(() => {
    return STUDENT_PROGRESS_ROSTER.filter((st) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        st.name.toLowerCase().includes(q) ||
        st.rollNumber.toLowerCase().includes(q) ||
        st.course.toLowerCase().includes(q);

      const matchesBatch = selectedBatch === 'All' || st.batch === selectedBatch;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'AT RISK' && st.status === 'AT RISK') ||
        (statusFilter === 'EXCELLENT' && st.status === 'EXCELLENT');

      return matchesSearch && matchesBatch && matchesStatus;
    });
  }, [searchQuery, selectedBatch, statusFilter]);

  const handleSendSupportReminder = (studentName, rollNumber) => {
    toast.success(`Progress review notification sent to ${studentName} (Roll #${rollNumber}).`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Progress & Performance</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor module completion velocity, grade distribution, and student intervention metrics.
          </p>
        </div>

        {/* Cohort Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value="All">All Batches</option>
            <option value="Batch 12">Batch 12 (Web Dev)</option>
            <option value="Batch 10">Batch 10 (AI / Cloud)</option>
            <option value="Batch 9">Batch 9 (Mobile)</option>
          </select>
        </div>
      </div>

      {/* 4 Key Progress Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Average Progress Score */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#006B3C]">78.4%</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Avg Cohort Score</p>
            <div className="flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-[#006B3C]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+4.2% vs last month</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Modules Completed */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#2D67E4]">18/24</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Modules Completed</p>
            <div className="flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-[#2D67E4]">
              <span>75% Bootcamp completion</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#DAA622]">12</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Top Performers</p>
            <div className="flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-[#DAA622]">
              <span>&gt; 85% Grade threshold</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Students At Risk */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#DE646D]">2</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Students At Risk</p>
            <div className="flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-[#DE646D]">
              <span>&lt; 60% score alert</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Completion Learning Curve Chart */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0C0E0F]">Module Learning Curve & Average Scores</h3>
                <p className="text-xs text-slate-500">Average student assessment score per curriculum module</p>
              </div>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MODULE_PROGRESS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006B3C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#006B3C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="module" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="avgScore" name="Avg Score" stroke="#006B3C" strokeWidth={3} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution Donut Chart */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0C0E0F]">Grade Distribution</h3>
                <p className="text-xs text-slate-500">Overall class performance tiers</p>
              </div>
            </div>

            <div className="relative h-48 w-full flex items-center justify-center mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={GRADE_DISTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                    {GRADE_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#006B3C]">80%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Passing</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {GRADE_DISTRIBUTION_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Student Progress Table */}
      <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Individual Student Progress Roster</h3>
            <p className="text-xs text-slate-500 mt-0.5">Track individual completion percentages, attendance rates, and grades</p>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student name or roll #..."
                className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
              {['All', 'EXCELLENT', 'AT RISK'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer capitalize ${
                    statusFilter === st ? 'bg-white text-[#006B3C] shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st === 'AT RISK' ? 'At Risk' : st === 'EXCELLENT' ? 'Top Tier' : 'All Students'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Roster Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Batch</th>
                <th className="py-3 px-4">Overall Progress</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Assignments</th>
                <th className="py-3 px-4">Performance Tier</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No student progress records match the current filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#006B3C]">{student.rollNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={student.name} className="w-7 h-7" />
                        <span className="font-bold text-slate-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{student.batch}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#006B3C] w-9">{student.progress}%</span>
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.progress >= 85 ? 'bg-[#006B3C]' : student.progress >= 70 ? 'bg-[#2D67E4]' : 'bg-[#DE646D]'
                            }`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold">{student.attendanceRate}%</td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold">{student.assignmentsDone}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          student.status === 'EXCELLENT'
                            ? 'bg-[#E8F7DF] text-[#006B3C]'
                            : student.status === 'GOOD'
                            ? 'bg-[#F1F5FF] text-[#2D67E4]'
                            : 'bg-[#F8E5E2] text-[#DE646D]'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendSupportReminder(student.name, student.rollNumber)}
                        leftIcon={<Mail className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Remind
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
