import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AttendanceFilters from '../components/AttendanceFilters';
import AttendanceSummaryCards from '../components/AttendanceSummaryCards';
import DailyAttendanceTable from '../components/DailyAttendanceTable';
import WeeklyAttendanceMatrix from '../components/WeeklyAttendanceMatrix';
import MonthlyAttendanceSummary from '../components/MonthlyAttendanceSummary';
import { toast } from 'sonner';

// Initial Mock Attendance Records Dataset
const INITIAL_RECORDS = [
  {
    id: 'att-1',
    rollNumber: '102341',
    studentName: 'Muhammad Ali',
    course: 'Web & Mobile Dev',
    status: 'Present',
    date: '2026-06-15',
    checkIn: '09:02 AM',
    checkOut: '04:15 PM',
    remarks: 'On time',
  },
  {
    id: 'att-2',
    rollNumber: '102342',
    studentName: 'Fatima Ahmed',
    course: 'Web & Mobile Dev',
    status: 'Present',
    date: '2026-06-15',
    checkIn: '09:10 AM',
    checkOut: '04:20 PM',
    remarks: 'On time',
  },
  {
    id: 'att-3',
    rollNumber: '102343',
    studentName: 'Usman Ghani',
    course: 'AI & Data Science',
    status: 'Absent',
    date: '2026-06-15',
    checkIn: '—',
    checkOut: '—',
    remarks: 'Unexcused absence',
  },
  {
    id: 'att-4',
    rollNumber: '102344',
    studentName: 'Aisha Malik',
    course: 'Cloud Native',
    status: 'Leave',
    date: '2026-06-15',
    checkIn: '—',
    checkOut: '—',
    remarks: 'Approved medical leave',
  },
  {
    id: 'att-5',
    rollNumber: '102345',
    studentName: 'Bilal Hussain',
    course: 'Web & Mobile Dev',
    status: 'Present',
    date: '2026-06-15',
    checkIn: '08:55 AM',
    checkOut: '04:00 PM',
    remarks: 'Early arrival',
  },
  {
    id: 'att-6',
    rollNumber: '102346',
    studentName: 'Zainab Bibi',
    course: 'Web & Mobile Dev',
    status: 'Present',
    date: '2026-06-15',
    checkIn: '09:05 AM',
    checkOut: '04:10 PM',
    remarks: 'On time',
  },
];

const INITIAL_WEEKLY_ROSTER = [
  { rollNumber: '102341', name: 'Muhammad Ali', days: { mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P' } },
  { rollNumber: '102342', name: 'Fatima Ahmed', days: { mon: 'P', tue: 'P', wed: 'A', thu: 'P', fri: 'P' } },
  { rollNumber: '102343', name: 'Usman Ghani', days: { mon: 'P', tue: 'L', wed: 'P', thu: 'P', fri: 'A' } },
  { rollNumber: '102344', name: 'Aisha Malik', days: { mon: 'A', tue: 'A', wed: 'L', thu: 'P', fri: 'P' } },
  { rollNumber: '102345', name: 'Bilal Hussain', days: { mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P' } },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function AttendanceHistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Navigation State initialized from URL params if present
  const [year, setYear] = useState(() => Number(searchParams.get('year')) || 2026);
  const [month, setMonth] = useState(() => Number(searchParams.get('month')) || 6);
  const [week, setWeek] = useState(() => Number(searchParams.get('week')) || 3);
  const [selectedDate, setSelectedDate] = useState(
    () => searchParams.get('date') || '2026-06-15'
  );
  const [viewMode, setViewMode] = useState(() => searchParams.get('view') || 'daily');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [records, setRecords] = useState(INITIAL_RECORDS);

  // Sync URL query params safely without infinite loop
  useEffect(() => {
    const currentYear = searchParams.get('year');
    const currentMonth = searchParams.get('month');
    const currentWeek = searchParams.get('week');
    const currentDate = searchParams.get('date');
    const currentView = searchParams.get('view');

    if (
      currentYear !== String(year) ||
      currentMonth !== String(month) ||
      currentWeek !== String(week) ||
      currentDate !== selectedDate ||
      currentView !== viewMode
    ) {
      setSearchParams(
        {
          year: String(year),
          month: String(month),
          week: String(week),
          date: selectedDate,
          view: viewMode,
        },
        { replace: true }
      );
    }
  }, [year, month, week, selectedDate, viewMode, searchParams, setSearchParams]);

  // Compute weeks for selected month dynamically
  const availableWeeks = useMemo(() => {
    const monthName = MONTH_NAMES[month - 1] || 'June';
    return [
      { weekNum: 1, label: `${monthName.slice(0, 3)} 1 – 7` },
      { weekNum: 2, label: `${monthName.slice(0, 3)} 8 – 14` },
      { weekNum: 3, label: `${monthName.slice(0, 3)} 15 – 21` },
      { weekNum: 4, label: `${monthName.slice(0, 3)} 22 – 28` },
      { weekNum: 5, label: `${monthName.slice(0, 3)} 29 – 30` },
    ];
  }, [month]);

  // Filter daily attendance records
  const filteredDailyRecords = useMemo(() => {
    return records.filter((rec) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rec.studentName.toLowerCase().includes(q) ||
        rec.rollNumber.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  // Summary Metrics calculation
  const summaryMetrics = useMemo(() => {
    const total = records.length;
    const present = records.filter((r) => r.status === 'Present').length;
    const absent = records.filter((r) => r.status === 'Absent').length;
    const leave = records.filter((r) => r.status === 'Leave').length;
    const rate = total > 0 ? Math.round((present / total) * 1000) / 10 : 0;

    return {
      totalStudents: total * 20, // Scaled for demo
      presentCount: present * 16,
      absentCount: absent * 3,
      leaveCount: leave * 2,
      attendanceRate: rate,
    };
  }, [records]);

  // Handle inline status toggle
  const handleStatusChange = (rollNumber, newStatus) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.rollNumber === rollNumber ? { ...item, status: newStatus } : item
      )
    );
    toast.success(`Status updated to ${newStatus} for Roll #${rollNumber}`);
  };

  const monthLabel = MONTH_NAMES[month - 1] || 'June';

  // Generated trend data for selected month
  const monthlyTrendData = useMemo(() => {
    return [
      { day: `${monthLabel.slice(0, 3)} 1`, rate: 91 },
      { day: `${monthLabel.slice(0, 3)} 5`, rate: 94 },
      { day: `${monthLabel.slice(0, 3)} 10`, rate: 89 },
      { day: `${monthLabel.slice(0, 3)} 15`, rate: 96 },
      { day: `${monthLabel.slice(0, 3)} 20`, rate: 84 },
      { day: `${monthLabel.slice(0, 3)} 25`, rate: 88 },
      { day: `${monthLabel.slice(0, 3)} 30`, rate: 92 },
    ];
  }, [monthLabel]);

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Top Header */}
      <div className="pb-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance History</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View and manage student attendance logs by year, month, week, or specific date.
        </p>
      </div>

      {/* Filter Toolbar (Year -> Month -> Week -> Date) */}
      <AttendanceFilters
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        week={week}
        setWeek={setWeek}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        availableWeeks={availableWeeks}
      />

      {/* Attendance Summary Stat Cards */}
      <AttendanceSummaryCards summary={summaryMetrics} />

      {/* View Mode Switching Content */}
      {viewMode === 'daily' && (
        <DailyAttendanceTable
          records={filteredDailyRecords}
          onStatusChange={handleStatusChange}
          formattedDateLabel={`${monthLabel} ${selectedDate.split('-')[2] || '15'}, ${year}`}
        />
      )}

      {viewMode === 'weekly' && (
        <WeeklyAttendanceMatrix
          weeklyRoster={INITIAL_WEEKLY_ROSTER}
          weekLabel={`Week ${week} (${monthLabel} ${year})`}
        />
      )}

      {viewMode === 'monthly' && (
        <MonthlyAttendanceSummary
          monthLabel={monthLabel}
          year={year}
          trendData={monthlyTrendData}
        />
      )}
    </div>
  );
}

export default AttendanceHistoryPage;
