import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { AlertTriangle } from "lucide-react";

function DeleteTaskModal({
  isOpen,
  onClose,
  onConfirm,
  task,
  loading = false,
  error = null,
}) {
  if (!task) return null;

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button
        variant="danger"
        loading={loading}
        onClick={() => onConfirm(task.id)}
      >
        Delete Task
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task Confirmation"
      footer={footer}
      size="sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-text">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>

          <div className="rounded-lg bg-background p-3 border border-border">
            <p className="text-xs font-semibold text-text">{task.title}</p>
            <p className="mt-0.5 text-xs text-text-muted">
              Assigned to: {task.studentName} ({task.rollNumber})
            </p>
          </div>

          {error && (
            <p className="text-xs font-medium text-danger">{error}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default DeleteTaskModal;
