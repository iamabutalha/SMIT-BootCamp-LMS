import { ClipboardList, Calendar, UserCheck } from "lucide-react";
import Badge from "../ui/Badge";
import { formatDMY } from "../../utils/dateUtils";

function getStatusVariant(status) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "success";
    case "in progress":
      return "info";
    case "overdue":
      return "danger";
    case "pending":
    default:
      return "warning";
  }
}

function getPriorityBadge(priority) {
  switch (priority?.toLowerCase()) {
    case "high":
      return <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 border border-red-200">High</span>;
    case "medium":
      return <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200">Medium</span>;
    case "low":
    default:
      return <span className="inline-flex items-center gap-1 rounded bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600 border border-gray-200">Low</span>;
  }
}

function TaskCard({ tasks = [] }) {
  // Default sample tasks matching requirement if tasks array from API is empty
  const defaultTasks = [
    {
      id: "task-1",
      title: "Build Login Page",
      description: "Create the responsive login page using React and Tailwind CSS.",
      dueDate: "Today",
      priority: "High",
      status: "Pending",
      assignedBy: "Instructor / Lead",
    },
    {
      id: "task-2",
      title: "Setup Redux Auth Slice",
      description: "Integrate user credentials state and JWT token handling.",
      dueDate: "Tomorrow",
      priority: "Medium",
      status: "In Progress",
      assignedBy: "Lead Developer",
    },
  ];

  const displayTasks = tasks.length > 0 ? tasks : defaultTasks;

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border p-5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-text flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Today's Tasks
          </h2>
          <p className="mt-1 text-xs text-text-muted">
            Your assigned tasks and activities.
          </p>
        </div>
        <Badge variant="mint" className="font-semibold">
          {displayTasks.length} Assigned
        </Badge>
      </div>

      <div className="divide-y divide-border p-4">
        {displayTasks.map((task) => {
          const dueDateFormatted = task.dueDate
            ? typeof task.dueDate === "string" && (task.dueDate.toLowerCase() === "today" || task.dueDate.toLowerCase() === "tomorrow")
              ? task.dueDate
              : formatDMY(task.dueDate)
            : "Today";

          return (
            <div key={task.id || task._id} className="py-4 first:pt-1 last:pb-1 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-text">{task.title}</h3>
                  {task.description && (
                    <p className="mt-1 text-xs text-text-muted leading-relaxed">
                      {task.description}
                    </p>
                  )}
                </div>
                <Badge variant={getStatusVariant(task.status)} className="shrink-0 capitalize font-medium">
                  {task.status || "Pending"}
                </Badge>
              </div>

              {/* Meta row: Due Date, Priority, Assigned By */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>Due: <strong className="text-text">{dueDateFormatted}</strong></span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-text-muted">Priority:</span>
                  {getPriorityBadge(task.priority || "High")}
                </div>

                {task.assignedBy && (
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-text-muted" />
                    <span>Assigned by: <span className="font-medium text-text">{task.assignedBy}</span></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskCard;
