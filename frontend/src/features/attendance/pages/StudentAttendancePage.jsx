import { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import StudentAttendanceHeader from '../components/student/StudentAttendanceHeader';
import StudentAttendanceSummary from '../components/student/StudentAttendanceSummary';
import StudentAttendancePerformance from '../components/student/StudentAttendancePerformance';
import StudentAttendanceTrend from '../components/student/StudentAttendanceTrend';
import StudentAttendanceCalendar from '../components/student/StudentAttendanceCalendar';
import StudentAttendanceFilters from '../components/student/StudentAttendanceFilters';
import StudentAttendanceHistoryTable from '../components/student/StudentAttendanceHistoryTable';
import StudentAttendanceSkeleton from '../components/student/StudentAttendanceSkeleton';
import StudentAttendanceErrorState from '../components/student/StudentAttendanceErrorState';
import { studentAttendanceService } from '../services/studentAttendanceService';

export function StudentAttendanceContent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Filters State
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('All');
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchAttendanceData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await studentAttendanceService.getStudentAttendanceData({
        year,
        month,
        status,
        search,
        page,
        limit: 10,
      });

      setData(result);
    } catch (err) {
      console.error('Failed to load student attendance:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [year, month, status, search, page]);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  if (isLoading && !data) {
    return <StudentAttendanceSkeleton />;
  }

  if (isError) {
    return <StudentAttendanceErrorState onRetry={fetchAttendanceData} />;
  }

  return (
    <div className="space-y-6 font-sans text-left pb-8">
      {/* 1. Header with Student Credentials Banner */}
      <StudentAttendanceHeader />

      {/* 2. KPI Summary Cards */}
      <StudentAttendanceSummary summary={data?.summary} />

      {/* 3. Attendance Performance Evaluation Bar */}
      <StudentAttendancePerformance
        rate={data?.summary?.attendanceRate || 92}
        category={data?.summary?.performanceCategory}
        color={data?.summary?.performanceColor}
      />

      {/* 4. Trend Chart & Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <StudentAttendanceTrend trendData={data?.trendData} />
        </div>
        <div className="lg:col-span-6">
          <StudentAttendanceCalendar records={data?.allRecords || []} />
        </div>
      </div>

      {/* 5. Filter Toolbar */}
      <StudentAttendanceFilters
        year={year}
        onYearChange={(v) => { setYear(v); setPage(1); }}
        month={month}
        onMonthChange={(v) => { setMonth(v); setPage(1); }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
      />

      {/* 6. Attendance History Table */}
      <StudentAttendanceHistoryTable
        records={data?.records || []}
        pagination={data?.pagination}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}

export function StudentAttendancePage() {
  return (
    <ErrorBoundary title="Student Attendance Error">
      <StudentAttendanceContent />
    </ErrorBoundary>
  );
}

export default StudentAttendancePage;
