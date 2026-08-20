import { useState, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/common/StatCard";
import Table from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import LoadingState from "../../../components/common/LoadingState";
import taskService from "../../../services/taskService";
import { formatDMY } from "../../../utils/dateUtils";

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "info";
    case "Pending":
      return "warning";
    default:
      return "neutral";
  }
};

function StudentTaskHistoryModal({
  isOpen,
  onClose,
  student,
}) {
  const [viewType, setViewType] = useState("daily"); // daily, weekly, monthly
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && student) {
      loadHistory();
    }
  }, [isOpen, student, viewType, selectedDate]);

  const loadHistory = async () => {
    if (!student) return;
    setLoading(true);
    try {
      const data = await taskService.getStudentHistory(
        student.id || student.studentId,
        viewType,
        selectedDate
      );
      setHistoryData(data);
    } catch {
      setHistoryData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  const summary = historyData?.summary || {
    totalTasks: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  };

  const tasks = historyData?.tasks || [];

  const columns = [
    {
      key: "title",
      label: "Task Title",
      render: (row) => (
        <div>
          <span className="font-semibold text-text">{row.title}</span>
          {row.description && (
            <p className="line-clamp-1 text-xs text-text-muted">
              {row.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (row) => (
        <span className="text-xs text-text-muted font-medium">
          {formatDMY(row.dueDate)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {row.status}
        </Badge>
      ),
    },
  ];

  const footer = (
    <Button variant="outline" onClick={onClose}>
      Close History
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Task History"
      footer={footer}
      size="xl"
    >
      <div className="space-y-6">
        {/* Student Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text">
                {student.studentName || student.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Hash className="h-3.5 w-3.5" />
                <span>{student.rollNumber}</span>
              </div>
            </div>
          </div>

          {/* View Switcher Tabs (Daily, Weekly, Monthly) */}
          <div className="flex items-center rounded-lg border border-border bg-surface p-1">
            <button
              type="button"
              onClick={() => setViewType("daily")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                viewType === "daily"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => setViewType("weekly")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                viewType === "weekly"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setViewType("monthly")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                viewType === "monthly"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-text-muted" />
          <span className="text-xs font-medium text-text-muted">
            Select Date Period:
          </span>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto py-1 text-xs"
          />
        </div>

        {/* Task Summary Stat Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            title="Total Tasks"
            value={summary.totalTasks}
            description="Overall history"
            descriptionClassName="text-text-muted"
          />
          <StatCard
            title="Completed"
            value={summary.completed}
            description="Finished tasks"
            descriptionClassName="text-success"
          />
          <StatCard
            title="Pending"
            value={summary.pending}
            description="Awaiting start"
            descriptionClassName="text-warning"
          />
          <StatCard
            title="In Progress"
            value={summary.inProgress}
            description="Currently working"
            descriptionClassName="text-primary"
          />
        </div>

        {/* History Task Table */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-text">
              Tasks ({viewType.charAt(0).toUpperCase() + viewType.slice(1)} View)
            </h4>
            <span className="text-xs text-text-muted">
              Showing {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <LoadingState message="Fetching student task history..." />
          ) : (
            <Table
              columns={columns}
              data={tasks}
              emptyMessage={`No tasks found for this student in the selected ${viewType} period.`}
              rowKey="id"
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default StudentTaskHistoryModal;
