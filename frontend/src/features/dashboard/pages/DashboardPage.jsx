import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  ClipboardList,
  BookOpen,
  Users,
  UserPlus,
  PlusCircle,
  HelpCircle,
  FileSpreadsheet,
  Calendar,
  Clock,
  MapPin,
  Building,
  CheckCircle2,
  ChevronRight,
  FolderOpen,
  Filter,
} from 'lucide-react';
import { useGetUsersQuery } from '../../users/usersApi';
import { ROUTES } from '@/constants/routes';
import { ANALYTICS_DATA, TOP_STUDENTS } from '../dashboardAnalytics';
import ProgressChart from '@/components/dashboard/ProgressChart';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import TaskStatusChart from '@/components/dashboard/TaskStatusChart';
import ProgressSummary from '@/components/dashboard/ProgressSummary';
import TopStudents from '@/components/dashboard/TopStudents';

export function DashboardPage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(10); // Mon 10 active
  const [scheduleTab, setScheduleTab] = useState('Quizzes');
  const [timePeriod, setTimePeriod] = useState('this_month');

  // Fetch real students from API
  const { data: studentsData } = useGetUsersQuery({ role: 'STUDENT', limit: 20 });
  const totalStudents = studentsData?.data?.total || 128;

  const currentAnalytics = ANALYTICS_DATA[timePeriod] || ANALYTICS_DATA.this_month;

  const daysList = [
    { day: 'Sun', date: 9 },
    { day: 'Mon', date: 10 },
    { day: 'Tue', date: 11 },
    { day: 'Wed', date: 12 },
    { day: 'Thu', date: 13 },
    { day: 'Fri', date: 14 },
    { day: 'Sat', date: 15 },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Analytics Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Overview & Performance Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">Visualize student progress, attendance rates, & assignment completion</p>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            {[
              { label: 'Today', key: 'today' },
              { label: 'This Week', key: 'this_week' },
              { label: 'This Month', key: 'this_month' },
            ].map((period) => (
              <button
                key={period.key}
                type="button"
                onClick={() => setTimePeriod(period.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  timePeriod === period.key
                    ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Card 1: Attendance */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">38/44</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Attendance</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#006B3C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C]" />
              <span>86% Present</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Assignment */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">65/100</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Assignment</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#9D6BE2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9D6BE2]" />
              <span>65 Completed</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#EFE7FF] text-[#9D6BE2] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Courses / Teams */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">12</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Active Teams</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#2D67E4]">
              <span>Active Cohorts</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Students */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">{totalStudents}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Students</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#006B3C]">
              <span>12.5% this month</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Progress Summary Section */}
      <ProgressSummary summary={currentAnalytics.summary} />

      {/* 2-Column Grid Layout for Charts & Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN — Main Charts (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Chart 1: Student Progress Over Time (Area Chart) */}
          <ProgressChart data={currentAnalytics.studentProgress} />

          {/* Grid: 2 Charts Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Chart 2: Attendance Donut Chart */}
            <AttendanceChart data={currentAnalytics.attendance} />

            {/* Chart 3: Assignment Status Bar Chart */}
            <TaskStatusChart data={currentAnalytics.taskStatus} />
          </div>

          {/* Active Course Card */}
          <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Course
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#E8F7DF] text-[#006B3C]">
                CERTIFIED
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#0C0E0F]">
              Web and Mobile App Development
            </h2>

            {/* Timings */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Mon 06:00 PM - 08:00 PM</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Tue 06:00 PM - 08:00 PM</span>
              </div>
            </div>

            {/* Course Metadata Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Batch: <strong className="text-slate-900">3</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Roll: <strong className="text-slate-900">401040</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Campus: <strong className="text-slate-900">Mohsin and Huma Campus</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>City: <strong className="text-slate-900">Peshawar</strong></span>
              </div>
            </div>
          </div>

          {/* Fee Overview Widget */}
          <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0C0E0F]">Fee Overview</h3>
              <button
                type="button"
                onClick={() => navigate('/admin/payment')}
                className="text-xs font-bold text-[#006B3C] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                View All Payments <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3">Voucher ID</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-3">May 2025</td>
                    <td className="py-3 px-3">PKR 12,500</td>
                    <td className="py-3 px-3">Tuition Fee</td>
                    <td className="py-3 px-3">10 May 2025</td>
                    <td className="py-3 px-3 font-mono text-slate-500">VCH-45676</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F7DF] text-[#006B3C]">
                        Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN — Sidebar Widgets (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Top Performing Students Leaderboard */}
          <TopStudents students={TOP_STUDENTS} />

          {/* Class Schedule Widget */}
          <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0C0E0F]">Class Schedule</h3>
              <button type="button" className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer">
                View All
              </button>
            </div>

            {/* Weekly Days Row */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysList.map((item) => {
                const isActive = selectedDay === item.date;
                return (
                  <button
                    key={item.date}
                    type="button"
                    onClick={() => setSelectedDay(item.date)}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#006B3C] text-white shadow-xs font-bold'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] font-medium opacity-80">{item.day}</span>
                    <span className="text-xs font-bold">{item.date}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Selector */}
            <div className="flex border-b border-slate-100 text-xs font-semibold">
              {['Assignments', 'Quizzes', 'Events'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setScheduleTab(tab)}
                  className={`flex-1 py-2 text-center transition-colors cursor-pointer border-b-2 ${
                    scheduleTab === tab
                      ? 'border-[#006B3C] text-[#006B3C] font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content — Empty State */}
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mb-2 border border-slate-100">
                <FolderOpen className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500 font-medium">No upcoming {scheduleTab.toLowerCase()}</p>
            </div>
          </div>

          {/* Quick Links Widget */}
          <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0C0E0F]">Quick Links</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN.STUDENTS)}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-[#F8F9FB] hover:shadow-xs transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Add Student</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/teams')}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-[#F8F9FB] hover:shadow-xs transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EFE7FF] text-[#9D6BE2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Create Team</span>
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN.ATTENDANCE)}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-[#F8F9FB] hover:shadow-xs transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Attendance</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/reports')}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-[#F8F9FB] hover:shadow-xs transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Generate Report</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DashboardPage;
