import { useEffect } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  Users,
} from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import QuickActionCard from "../../components/common/QuickActionCard";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import BrandLogo from "../../components/common/BrandLogo";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchDashboardData } from "../../store/slices/dashboardSlice";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { stats, todayAttendance, todayTasks, loading, error } =
    useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const attendancePercentage = stats?.totalStudents > 0
    ? Math.round((stats.presentStudentsToday / stats.totalStudents) * 100)
    : 0;

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Welcome back to Saylani Mass IT Training LMS."
    >
      <div className="space-y-6">
        {/* Page Header with SMIT Logo */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <PageHeader
            title="Dashboard"
            subtitle="Welcome back to Saylani Mass IT Training (SMIT) Bootcamp LMS."
          />
          <BrandLogo size="md" showSubtitle={true} className="shrink-0" />
        </div>

        {loading ? (
          <LoadingState message="Loading dashboard statistics..." />
        ) : error ? (
          <ErrorState
            title="Failed to load dashboard"
            message={error}
            onRetry={() => dispatch(fetchDashboardData())}
          />
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Students"
                value={String(stats?.totalStudents ?? 0)}
                description="Active students"
                descriptionClassName="text-success"
              />

              <StatCard
                title="Attendance"
                value={`${attendancePercentage}%`}
                description="Present today"
                descriptionClassName="text-warning"
              />

              <StatCard
                title="Tasks"
                value={String(stats?.pendingTasks ?? 0)}
                description="Pending tasks"
                descriptionClassName="text-primary"
              />

              <StatCard
                title="Teams"
                value={String(stats?.totalTeams ?? 0)}
                description="Bootcamp teams"
                descriptionClassName="text-danger"
              />
            </div>

            {/* Recent Tasks + Attendance */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Recent Tasks */}
              <div className="rounded-xl border border-border bg-surface shadow-sm">
                <div className="border-b border-border p-5">
                  <h2 className="font-semibold text-text">Today's Tasks</h2>
                  <p className="mt-1 text-xs text-text-muted">
                    Your assigned tasks for today.
                  </p>
                </div>

                {todayTasks.length === 0 ? (
                  <EmptyState
                    icon={ClipboardList}
                    title="No tasks available"
                    description="Assigned tasks will appear here once they are created."
                    iconColor="text-purple-500"
                  />
                ) : (
                  <div className="divide-y divide-border p-4">
                    {todayTasks.map((task) => (
                      <div key={task.id} className="py-3">
                        <p className="text-sm font-medium text-text">{task.title}</p>
                        <p className="text-xs text-text-muted">{task.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attendance Overview */}
              <div className="rounded-xl border border-border bg-surface shadow-sm">
                <div className="border-b border-border p-5">
                  <h2 className="font-semibold text-text">Today's Attendance</h2>
                  <p className="mt-1 text-xs text-text-muted">
                    Your recent attendance information.
                  </p>
                </div>

                {todayAttendance.length === 0 ? (
                  <EmptyState
                    icon={ClipboardCheck}
                    title="No attendance data"
                    description="Attendance records will appear here once they are recorded."
                  />
                ) : (
                  <div className="divide-y divide-border p-4">
                    {todayAttendance.map((record) => (
                      <div key={record.id} className="flex justify-between py-3">
                        <span className="text-sm font-medium text-text">{record.studentName}</span>
                        <span className="text-xs font-semibold text-success">{record.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-surface shadow-sm">
              <div className="border-b border-border p-5">
                <h2 className="font-semibold text-text">Quick Actions</h2>
                <p className="mt-1 text-xs text-text-muted">
                  Quickly access common LMS features.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
                <QuickActionCard
                  title="View Students"
                  description="Manage bootcamp students"
                  to="/students"
                  icon={Users}
                  iconColor="text-blue-500"
                />

                <QuickActionCard
                  title="Attendance"
                  description="Check attendance records"
                  to="/attendance"
                  icon={ClipboardCheck}
                  iconColor="text-green-500"
                />

                <QuickActionCard
                  title="View Tasks"
                  description="Check assigned tasks"
                  to="/tasks"
                  icon={ClipboardList}
                  iconColor="text-orange-500"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
