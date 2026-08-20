import { useEffect } from "react";
import {
  GraduationCap,
  UserCheck,
  UserX,
  Users,
  ClipboardList,
} from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import StatCard from "../../components/common/StatCard";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

import AttendanceSummaryCard from "../../components/dashboard/AttendanceSummaryCard";
import TaskSummaryCard from "../../components/dashboard/TaskSummaryCard";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchDashboardData } from "../../store/slices/dashboardSlice";

function Dashboard() {
  const dispatch = useAppDispatch();
  const {
    stats,
    todayAttendance,
    todayTasks,
    loading,
    error,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const totalStudents = stats?.totalStudents ?? 8;
  const presentStudentsToday = stats?.presentStudentsToday ?? 1;
  const absentStudentsToday = stats?.absentStudentsToday ?? 0;
  const totalTeams = stats?.totalTeams ?? 4;
  const pendingTasks = stats?.pendingTasks ?? 3;

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Welcome back to Saylani Mass IT Training LMS."
    >
      <div className="space-y-6">
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
            {/* Top 5 Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard
                title="Total Students"
                value={String(totalStudents)}
                icon={GraduationCap}
                iconBgClass="bg-blue-100/70 text-blue-600"
              />

              <StatCard
                title="Present Today"
                value={String(presentStudentsToday)}
                icon={UserCheck}
                iconBgClass="bg-emerald-100/70 text-emerald-600"
              />

              <StatCard
                title="Absent Today"
                value={String(absentStudentsToday)}
                icon={UserX}
                iconBgClass="bg-red-100/70 text-red-600"
              />

              <StatCard
                title="Total Teams"
                value={String(totalTeams)}
                icon={Users}
                iconBgClass="bg-blue-100/70 text-blue-600"
              />

              <StatCard
                title="Pending Tasks"
                value={String(pendingTasks)}
                icon={ClipboardList}
                iconBgClass="bg-blue-100/70 text-blue-600"
              />
            </div>

            {/* 2-Column Section: Attendance Summary (Left) & Task Summary (Right) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
              {/* Left Panel: Today's Attendance Summary */}
              <div className="lg:col-span-8">
                <AttendanceSummaryCard attendanceRecords={todayAttendance} />
              </div>

              {/* Right Panel: Today's Task Summary */}
              <div className="lg:col-span-4">
                <TaskSummaryCard tasks={todayTasks} />
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
