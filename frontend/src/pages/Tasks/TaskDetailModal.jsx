import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Calendar, User, Hash, Clock, FileText } from "lucide-react";

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

function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onEdit,
  onStatusChange,
}) {
  if (!task) return null;

  const footer = (
    <>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      {onEdit && (
        <Button
          variant="primary"
          onClick={() => {
            onClose();
            onEdit(task);
          }}
        >
          Edit Task
        </Button>
      )}
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Task Details"
      footer={footer}
      size="md"
    >
      <div className="space-y-5">
        {/* Title and Status Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold text-text">{task.title}</h3>
            <p className="mt-1 text-xs text-text-muted">
              Task ID: {task.id}
            </p>
          </div>
          <Badge variant={getStatusBadgeVariant(task.status)}>
            {task.status}
          </Badge>
        </div>

        {/* Student Information */}
        <div className="rounded-lg bg-background p-4 border border-border">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Assigned Student
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-text">
                {task.studentName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-text-muted" />
              <span className="text-sm text-text-muted font-mono">
                {task.rollNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Task Description */}
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-text">
            <FileText className="h-4 w-4 text-text-muted" />
            <span>Description</span>
          </div>
          <p className="rounded-lg border border-border bg-surface p-3 text-sm text-text whitespace-pre-wrap leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </div>

        {/* Due Date & Quick Status Change */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-border pt-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-text-muted">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Due Date</span>
            </div>
            <p className="text-sm font-semibold text-text">
              {task.dueDate}
            </p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-text-muted">
              <Clock className="h-4 w-4 text-text-muted" />
              <span>Change Status</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Pending", "In Progress", "Completed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onStatusChange && onStatusChange(task.id, st)}
                  className={`
                    rounded-md px-2.5 py-1 text-xs font-medium transition
                    ${
                      task.status === st
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }
                  `}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailModal;
