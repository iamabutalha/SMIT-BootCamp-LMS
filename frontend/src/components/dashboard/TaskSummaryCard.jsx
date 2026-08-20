import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { formatDMY } from "../../utils/dateUtils";

function getStatusBadge(status) {
  switch (status?.toLowerCase()) {
    case "completed":
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
          Completed
        </span>
      );
    case "in progress":
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
          In Progress
        </span>
      );
    case "pending":
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-gray-700">
          Pending
        </span>
      );
  }
}

function TaskSummaryCard({ tasks = [] }) {
  // Sample tasks matching user screenshot in DMY format
  const defaultTasks = [
    {
      id: "task-s1",
      title: "web",
      status: "Pending",
      studentName: "Ali Khan",
      rollNo: "100001",
      teamName: "Team A",
      dueDate: "20/08/2026",
    },
    {
      id: "task-s2",
      title: "Aspernatur at corpor",
      status: "Pending",
      studentName: "Bahdar Ali",
      rollNo: "100423",
      teamName: "Team B",
      dueDate: "24/11/2016",
    },
    {
      id: "task-s3",
      title: "Dashboard Backend",
      status: "Completed",
      studentName: "SanaUllah Yousafzai",
      rollNo: "100433",
      teamName: "Team C",
      dueDate: "20/08/2026",
    },
  ];

  const displayTasks =
    tasks.length > 0
      ? tasks.map((t, idx) => ({
          id: t._id || t.id || idx,
          title: t.title || "Task Item",
          status: t.status || "Pending",
          studentName: t.studentName || t.student?.name || "Ali Khan",
          rollNo: t.rollNumber || t.student?.rollNumber || `10000${idx + 1}`,
          teamName: t.teamName || t.student?.team?.name || "Team A",
          dueDate: formatDMY(t.dueDate),
        }))
      : defaultTasks;

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2.5">
          <ClipboardList className="h-5 w-5 text-primary shrink-0" />
          <h2 className="font-bold text-text text-base">Today's Task Summary</h2>
        </div>
        <Link
          to="/tasks"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Manage
        </Link>
      </div>

      {/* Task List (Scrollable) */}
      <div className="max-h-[530px] overflow-y-auto divide-y divide-border p-4 space-y-3">
        {displayTasks.map((task) => (
          <div key={task.id} className="pt-3 first:pt-0 space-y-1">
            {/* Top row: Title + Status */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-text leading-snug">
                {task.title}
              </h3>
              {getStatusBadge(task.status)}
            </div>

            {/* Student Name */}
            <p className="text-xs font-semibold text-text">{task.studentName}</p>

            {/* Roll Number */}
            <p className="text-[11px] text-text-muted">Roll {task.rollNo}</p>

            {/* Team */}
            <p className="text-[11px] font-semibold text-primary">
              Team: {task.teamName}
            </p>

            {/* Due Date */}
            <p className="text-[11px] text-text-muted">Due {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskSummaryCard;
