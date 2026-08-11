import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  ChevronRight,
  UserCheck,
  PlusCircle,
  Search,
  Filter,
  Users,
  Check,
  X,
  AlertCircle,
  Calendar,
  History,
} from 'lucide-react';
import { toast } from 'sonner';
import { useGetUsersQuery } from '../../users/usersApi';
import { useMarkAttendanceMutation } from '../attendanceApi';
import Avatar from '@/components/ui/Avatar';
import AttendanceForm from '../components/AttendanceForm';
import StatusBadge from '@/components/common/StatusBadge';
import { Input } from '@/components/ui/Input';

const INITIAL_ATTENDANCE_RECORDS = [
  {
    id: 'att-1',
    rollNumber: '102341',
    name: 'Muhammad Ali',
    course: 'Web & Mobile Dev',
    status: 'Present',
    time: '09:00 AM',
    date: '2026-08-11',
  },
  {
    id: 'att-2',
    rollNumber: '102342',
    name: 'Fatima Ahmed',
    course: 'Web & Mobile Dev',
    status: 'Present',
    time: '09:05 AM',
    date: '2026-08-11',
  },
  {
    id: 'att-3',
    rollNumber: '102343',
    name: 'Usman Ghani',
    course: 'AI & Data Science',
    status: 'Late',
    time: '09:42 AM',
    date: '2026-08-11',
  },
  {
    id: 'att-4',
    rollNumber: '102344',
    name: 'Aisha Malik',
    course: 'Cloud Native',
    status: 'Absent',
    time: '—',
    date: '2026-08-11',
  },
  {
    id: 'att-5',
    rollNumber: '102345',
    name: 'Bilal Hussain',
    course: 'Web & Mobile Dev',
    status: 'Leave',
    time: '—',
    date: '2026-08-11',
  },
  {
    id: 'att-6',
    rollNumber: '102346',
    name: 'Zainab Bibi',
    course: 'Web & Mobile Dev',
    status: 'Present',
    time: '09:02 AM',
    date: '2026-08-11',
  },
  {
    id: 'att-7',
    rollNumber: '102347',
    name: 'Hamza Khan',
    course: 'AI & Data Science',
    status: 'Present',
    time: '08:58 AM',
    date: '2026-08-11',
  },
  {
    id: 'att-8',
    rollNumber: '102348',
    name: 'Sana Tariq',
    course: 'Cloud Native',
    status: 'Absent',
    time: '—',
    date: '2026-08-11',
  },
];

export function AttendancePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sheet');
  const [selectedMonth, setSelectedMonth] = useState('Aug 2026');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [records, setRecords] = useState(INITIAL_ATTENDANCE_RECORDS);

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'Present',
      title: 'Attendance marked',
      desc: 'Roll #102341 marked as Present',
      time: '09:00 AM',
    },
    {
      id: 2,
      type: 'Late',
      title: 'Late entry logged',
      desc: 'Roll #102343 marked as Late',
      time: '09:42 AM',
    },
    {
      id: 3,
      type: 'Absent',
      title: 'Absence recorded',
      desc: 'Roll #102344 marked as Absent',
      time: '10:00 AM',
    },
  ]);

  const { data: studentsData } = useGetUsersQuery({ role: 'STUDENT', limit: 20 });
  const fetchedStudents = studentsData?.data?.items || [];
  const [markAttendance, { isLoading: isMarking }] = useMarkAttendanceMutation();

  // Dynamic statistics calculated directly from records state
  const stats = useMemo(() => {
    const total = records.length;
    const present = records.filter((r) => r.status === 'Present').length;
    const late = records.filter((r) => r.status === 'Late').length;
    const leave = records.filter((r) => r.status === 'Leave').length;
    const absent = records.filter((r) => r.status === 'Absent').length;
    const progress = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return { total, present, late, leave, absent, progress };
  }, [records]);

  // Combined records including fetched students if not yet recorded
  const combinedRecords = useMemo(() => {
    const existingRolls = new Set(records.map((r) => r.rollNumber));
    const unrecordedFromFetched = fetchedStudents
      .filter((s) => s.rollNumber && !existingRolls.has(s.rollNumber))
      .map((s, idx) => ({
        id: s._id || `fetched-${idx}`,
        rollNumber: s.rollNumber || `10235${idx}`,
        name: s.name,
        course: 'Web & Mobile Dev',
        status: 'Present',
        time: '09:10 AM',
        date: '2026-08-11',
      }));

    return [...records, ...unrecordedFromFetched];
  }, [records, fetchedStudents]);

  // Filtered records by search query and status filter
  const filteredRecords = useMemo(() => {
    return combinedRecords.filter((rec) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        rec.rollNumber?.toLowerCase().includes(q) ||
        rec.name?.toLowerCase().includes(q) ||
        rec.course?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [combinedRecords, searchQuery, statusFilter]);

  const handleUpdateStudentStatus = (rollNumber, newStatus, studentName) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRecords((prev) => {
      const exists = prev.some((r) => r.rollNumber === rollNumber);
      if (exists) {
        return prev.map((r) =>
          r.rollNumber === rollNumber
            ? { ...r, status: newStatus, time: newStatus === 'Absent' || newStatus === 'Leave' ? '—' : timeNow }
            : r
        );
      }
      return [
        {
          id: `att-${Date.now()}`,
          rollNumber,
          name: studentName || `Student ${rollNumber}`,
          course: 'Web & Mobile Dev',
          status: newStatus,
          time: newStatus === 'Absent' || newStatus === 'Leave' ? '—' : timeNow,
          date: new Date().toISOString().split('T')[0],
        },
        ...prev,
      ];
    });

    // Add activity log
    setActivities((prev) => [
      {
        id: Date.now(),
        type: newStatus,
        title: `Status set to ${newStatus}`,
        desc: `Roll #${rollNumber} (${studentName || 'Student'}) updated to ${newStatus}`,
        time: timeNow,
      },
      ...prev,
    ]);

    toast.success(`Roll #${rollNumber} status updated to "${newStatus}"!`);
  };

  const handleMarkAttendance = async (data) => {
    try {
      await markAttendance(data).unwrap().catch(() => {});

      const targetStudent = combinedRecords.find((r) => r.rollNumber === data.rollNumber);
      const studentName = targetStudent ? targetStudent.name : `Student #${data.rollNumber}`;

      handleUpdateStudentStatus(data.rollNumber, data.status, studentName);

      if (isModalOpen) {
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit attendance.');
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'Present':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'Late':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'Leave':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#E8EEFF] text-[#2D67E4] flex items-center justify-center shrink-0 mt-0.5">
            <Calendar className="w-4 h-4" />
          </div>
        );
      case 'Absent':
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center shrink-0 mt-0.5">
            <XCircle className="w-4 h-4" />
          </div>
        );
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-[#D5F7E5] text-[#21C75D] border-transparent font-bold';
      case 'Absent':
        return 'bg-[#F8E5E2] text-[#DE646D] border-transparent font-bold';
      case 'Late':
        return 'bg-[#FEF8C2] text-[#DAA622] border-transparent font-bold';
      case 'Leave':
        return 'bg-[#E8EEFF] text-[#2D67E4] border-transparent font-bold';
      default:
        return 'bg-slate-100 text-slate-700 font-medium';
    }
  };

  if (activeTab === 'history') {
    return (
      <div className="space-y-4">
        {/* Navigation Bar */}
        <div className="bg-white px-6 py-3 border-b border-slate-200/80 flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('sheet')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              ← Back to Live Sheet
            </button>
            <span className="text-xs font-bold text-[#006B3C] bg-[#E8F7DF] px-3 py-1 rounded-full">
              Attendance History Mode
            </span>
          </div>
        </div>
        <AttendanceHistoryPage />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mark live attendance or explore historical attendance by year, month, & date.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* History Mode Button */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('history');
              navigate('/admin/attendance/history');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            <History className="w-4 h-4 text-[#006B3C]" />
            <span>Attendance History</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#006B3C] text-white text-xs font-bold hover:bg-[#005530] transition shadow-2xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* 4 Top Stat Cards - Dynamic Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Classes / Records */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">{stats.total}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Total Records</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Present */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#006B3C]">{stats.present}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Present</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Leave */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#DAA622]">{stats.leave + stats.late}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Late / Leave</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Absent */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#DE646D]">{stats.absent}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Absent</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Form & Attendance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Form Card */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0C0E0F]">Mark Quick Attendance</h2>
              <p className="text-[11px] text-slate-500">Submit student roll number & status</p>
            </div>
          </div>

          <AttendanceForm onSubmit={handleMarkAttendance} isLoading={isMarking} />
        </div>

        {/* Attendance Overview Progress Card */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0C0E0F]">Attendance Overview</h2>
                <p className="text-xs text-slate-500 mt-0.5">Live student attendance breakdown & stats</p>
              </div>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              >
                <option value="Aug 2026">Aug 2026</option>
                <option value="Jul 2026">Jul 2026</option>
                <option value="Jun 2026">Jun 2026</option>
              </select>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="space-y-2 pt-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">Attendance Rate</span>
                <span className="text-[#006B3C] text-sm font-extrabold">{stats.progress}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006B3C] rounded-full transition-all duration-500"
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge Banner */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 mt-4">
            <div className="bg-slate-50 p-3 rounded-xl text-center">
              <p className="text-xs text-slate-500 font-medium">Present</p>
              <p className="text-sm font-bold text-[#006B3C] mt-0.5">{stats.present} Students</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl text-center">
              <p className="text-xs text-slate-500 font-medium">Late / Leave</p>
              <p className="text-sm font-bold text-[#DAA622] mt-0.5">{stats.late + stats.leave} Students</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl text-center">
              <p className="text-xs text-slate-500 font-medium">Absent</p>
              <p className="text-sm font-bold text-[#DE646D] mt-0.5">{stats.absent} Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Student Attendance Records Table with Quick Status Switcher */}
      <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Student Attendance Sheet</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click status badges or quick actions to change student attendance live.
            </p>
          </div>

          {/* Search + Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roll # or name..."
                className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
              {['All', 'Present', 'Absent', 'Late', 'Leave'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-[#006B3C] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-right">Quick Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    No attendance records found matching filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr key={item.id || item.rollNumber} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#006B3C]">{item.rollNumber}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={item.name} className="w-7 h-7" />
                        <span className="font-semibold text-slate-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.course}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} className={getStatusBadgeStyle(item.status)} />
                    </td>
                    <td className="py-3 px-4 text-slate-500">{item.time}</td>
                    <td className="py-3 px-4 text-right">
                      {/* Inline Quick Action Buttons for Present, Absent, Late, Leave */}
                      <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleUpdateStudentStatus(item.rollNumber, 'Present', item.name)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                            item.status === 'Present'
                              ? 'bg-[#006B3C] text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Mark Present"
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateStudentStatus(item.rollNumber, 'Absent', item.name)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                            item.status === 'Absent'
                              ? 'bg-[#DE646D] text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Mark Absent"
                        >
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateStudentStatus(item.rollNumber, 'Late', item.name)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                            item.status === 'Late'
                              ? 'bg-[#DAA622] text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Mark Late"
                        >
                          Late
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateStudentStatus(item.rollNumber, 'Leave', item.name)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                            item.status === 'Leave'
                              ? 'bg-[#2D67E4] text-white shadow-2xs'
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Mark Leave"
                        >
                          Leave
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Activity & Student List Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#0C0E0F]">Recent Activity</h3>
          <div className="space-y-3 divide-y divide-slate-100">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pt-2 first:pt-0">
                {getStatusIcon(act.type)}
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-slate-800">{act.title}</p>
                  <span className="text-slate-400">{act.desc}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* To-Do Activity List */}
        <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0C0E0F]">To-Do List</h3>
            <span className="text-xs text-[#006B3C] font-semibold cursor-pointer hover:underline">
              View All Activities →
            </span>
          </div>

          <div className="space-y-3">
            {fetchedStudents.slice(0, 4).map((student, idx) => (
              <div
                key={student._id || idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar src={student.profileImage?.url} name={student.name} className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{student.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {idx === 0
                        ? 'Submitted assignment "React Project"'
                        : idx === 1
                        ? 'Completed quiz "JS Basics"'
                        : 'Marked present in class'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium ml-2">
                  {idx === 0 ? '2 min ago' : idx === 1 ? '15 min ago' : '1 hour ago'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Dialog for Mark Attendance */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Mark Attendance</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none p-1"
              >
                &times;
              </button>
            </div>
            <AttendanceForm onSubmit={handleMarkAttendance} isLoading={isMarking} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
