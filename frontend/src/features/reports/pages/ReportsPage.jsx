import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { adminReportService } from '../services/adminReportService';
import { ReportsHeader } from '../components/ReportsHeader';
import { ReportKpiGrid } from '../components/ReportKpiGrid';
import { PerformanceTrendChart } from '../components/PerformanceTrendChart';
import { AttendanceAnalyticsCard } from '../components/AttendanceAnalyticsCard';
import { AssignmentAnalyticsCard } from '../components/AssignmentAnalyticsCard';
import { QuizAnalyticsCard } from '../components/QuizAnalyticsCard';
import { TaskAnalyticsCard } from '../components/TaskAnalyticsCard';
import { TeamPerformanceTable } from '../components/TeamPerformanceTable';
import { StudentPerformanceTable } from '../components/StudentPerformanceTable';
import { AtRiskStudentsTable } from '../components/AtRiskStudentsTable';
import { TeacherPerformanceTable } from '../components/TeacherPerformanceTable';
import { ReportInsightsCard } from '../components/ReportInsightsCard';
import { ReportSkeleton } from '../components/ReportSkeleton';
import { ReportErrorState } from '../components/ReportErrorState';

export function ReportsPage() {
  const [filters, setFilters] = useState({
    dateRange: 'THIS_MONTH',
    batch: 'BATCH_2026',
    team: 'ALL',
    performance: 'ALL',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Fetch Report Analytics Data
  const loadReportData = useCallback(async (currentFilters, showToast = false) => {
    try {
      setHasError(false);
      const res = await adminReportService.getReportData(currentFilters);
      if (res?.success && res?.data) {
        setReportData(res.data);
        if (showToast) {
          toast.success('Report metrics updated successfully.');
        }
      } else {
        setHasError(true);
      }
    } catch (err) {
      setHasError(true);
      toast.error('Failed to load report analytics.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadReportData(filters);
  }, [filters, loadReportData]);

  // Handle Filter Change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Manual Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadReportData(filters, true);
  };

  // Handle CSV Report Export
  const handleExport = () => {
    if (!reportData) return;
    try {
      adminReportService.exportToCSV(reportData);
      toast.success('Report CSV exported successfully!');
    } catch (err) {
      toast.error('Failed to export report CSV.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 bg-[#F8F9FB] min-h-screen">
        <ReportSkeleton />
      </div>
    );
  }

  if (hasError || !reportData) {
    return (
      <div className="p-4 sm:p-6 bg-[#F8F9FB] min-h-screen">
        <ReportErrorState onRetry={() => loadReportData(filters)} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* 1. Header & Filters */}
      <ReportsHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
        isRefreshing={isRefreshing}
      />

      {/* 2. Top 6 KPI Summary Cards */}
      <ReportKpiGrid kpi={reportData.kpi} />

      {/* 3. Main Multi-Metric Performance Trend Chart */}
      <PerformanceTrendChart data={reportData.performanceTrend} />

      {/* 4. Automated Insights Callouts */}
      <ReportInsightsCard insights={reportData.insights} />

      {/* 5. Analytics Cards Grid (Attendance & Assignments) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceAnalyticsCard attendance={reportData.attendance} />
        <AssignmentAnalyticsCard assignments={reportData.assignments} />
      </div>

      {/* 6. Analytics Cards Grid (Quizzes & Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuizAnalyticsCard quizzes={reportData.quizzes} />
        <TaskAnalyticsCard tasks={reportData.tasks} />
      </div>

      {/* 7. Team Performance Matrix */}
      <TeamPerformanceTable teams={reportData.teams} />

      {/* 8. At-Risk Students ("Students Needing Attention") */}
      <AtRiskStudentsTable atRisk={reportData.atRisk} />

      {/* 9. Overall Student Performance Roster */}
      <StudentPerformanceTable students={reportData.students} />

      {/* 10. Teacher / Mentor Performance */}
      <TeacherPerformanceTable teachers={reportData.teachers} />
    </div>
  );
}

export default ReportsPage;
