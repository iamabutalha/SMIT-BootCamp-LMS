import {
  ClipboardCheck,
  ClipboardList,
  FolderKanban,
  Users,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import QuickActionCard from "../components/common/QuickActionCard";
import EmptyState from "../components/common/EmptyState";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* ========================================
          Page Header
      ======================================== */}
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back to Bootcamp LMS. Here's your overview."
      />

      {/* ========================================
          Statistics
      ======================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Students"
          value="0"
          description="Active students"
          descriptionClassName="text-success"
        />

        <StatCard
          title="Attendance"
          value="0%"
          description="This month"
          descriptionClassName="text-warning"
        />

        <StatCard
          title="Tasks"
          value="0"
          description="Pending tasks"
          descriptionClassName="text-primary"
        />

        <StatCard
          title="Projects"
          value="0"
          description="Active projects"
          descriptionClassName="text-danger"
        />
      </div>

      {/* ========================================
          Recent Tasks + Attendance
      ======================================== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Tasks */}
        <div className="rounded-xl border border-border bg-surface">
          <div className="border-b border-border p-5">
            <h2 className="font-semibold text-text">
              Recent Tasks
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Your latest assigned tasks.
            </p>
          </div>

          <EmptyState
            icon={ClipboardList}
            title="No tasks available"
            description="Assigned tasks will appear here once they are created."
          />
        </div>

        {/* Attendance Overview */}
        <div className="rounded-xl border border-border bg-surface">
          <div className="border-b border-border p-5">
            <h2 className="font-semibold text-text">
              Attendance Overview
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Your recent attendance information.
            </p>
          </div>

          <EmptyState
            icon={ClipboardCheck}
            title="No attendance data"
            description="Attendance records will appear here once they are available."
          />
        </div>
      </div>

      {/* ========================================
          Quick Actions
      ======================================== */}
      <div className="rounded-xl border border-border bg-surface">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-text">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Quickly access common LMS features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            title="View Students"
            description="Manage bootcamp students"
            to="/students"
            icon={Users}
          />

          <QuickActionCard
            title="Attendance"
            description="Check attendance records"
            to="/attendance"
            icon={ClipboardCheck}
          />

          <QuickActionCard
            title="View Tasks"
            description="Check assigned tasks"
            to="/tasks"
            icon={ClipboardList}
          />

          <QuickActionCard
            title="Projects"
            description="View your projects"
            to="/projects"
            icon={FolderKanban}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;