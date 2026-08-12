import { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import WelcomeCard from '../components/student/WelcomeCard';
import DashboardStats from '../components/student/DashboardStats';
import StudentProgressChart from '../components/student/StudentProgressChart';
import AttendanceOverview from '../components/student/AttendanceOverview';
import TaskPerformance from '../components/student/TaskPerformance';
import AssignmentOverview from '../components/student/AssignmentOverview';
import QuizPerformance from '../components/student/QuizPerformance';
import RecentActivity from '../components/student/RecentActivity';
import UpcomingDeadlines from '../components/student/UpcomingDeadlines';
import TeamOverview from '../components/student/TeamOverview';
import LearningProgress from '../components/student/LearningProgress';
import QuickActions from '../components/student/QuickActions';
import StudentDashboardSkeleton from '../components/student/StudentDashboardSkeleton';
import DashboardErrorState from '../components/student/DashboardErrorState';
import { studentDashboardService } from '../services/studentDashboardService';
import { useAuth } from '@/hooks/useAuth';

export function StudentDashboardContent() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const studentId = user?._id || user?.id || '1';
      const result = await studentDashboardService.getStudentDashboardOverview(studentId);

      // Merge authenticated user info if present
      if (user?.name) {
        result.student = {
          ...result.student,
          name: user.name,
          email: user.email || result.student.email,
          avatar: user.profileImage?.url || result.student.avatar,
        };
      }

      setData(result);
    } catch (err) {
      console.error('Failed to load student dashboard:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <StudentDashboardSkeleton />;
  }

  if (isError || !data) {
    return <DashboardErrorState onRetry={fetchDashboardData} />;
  }

  return (
    <div className="space-y-6 font-sans text-left pb-8">
      {/* 1. Welcome Card Banner */}
      <WelcomeCard student={data.student} />

      {/* 2. Quick Actions Shortcuts */}
      <QuickActions />

      {/* 3. Summary Statistics KPI Cards */}
      <DashboardStats summary={data.summary} />

      {/* 4. Charts Row: Overall Progress Trajectory & Attendance Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <StudentProgressChart data={data.progressOverTime} />
        </div>
        <div className="lg:col-span-4">
          <AttendanceOverview attendance={data.attendance} />
        </div>
      </div>

      {/* 5. Performance Row: Task Performance & Quiz Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <TaskPerformance taskPerformance={data.taskPerformance} />
        </div>
        <div className="lg:col-span-6">
          <QuizPerformance quizPerformance={data.quizPerformance} />
        </div>
      </div>

      {/* 6. Assignment & Upcoming Deadlines Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <AssignmentOverview assignments={data.latestAssignments} />
        </div>
        <div className="lg:col-span-5">
          <UpcomingDeadlines deadlines={data.upcomingDeadlines} />
        </div>
      </div>

      {/* 7. Curriculum & Team Row: Learning Module Progress & Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <LearningProgress modules={data.learningProgress} />
        </div>
        <div className="lg:col-span-6">
          <TeamOverview team={data.teamOverview} />
        </div>
      </div>

      {/* 8. Recent Activity Timeline */}
      <RecentActivity activities={data.recentActivity} />
    </div>
  );
}

export function StudentDashboardPage() {
  return (
    <ErrorBoundary title="Student Dashboard Error">
      <StudentDashboardContent />
    </ErrorBoundary>
  );
}

export default StudentDashboardPage;
