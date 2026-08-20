import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { AlertTriangle } from "lucide-react";

function DeleteTeamModal({
  isOpen,
  onClose,
  onConfirm,
  team = null,
  loading = false,
  error = null,
}) {
  if (!team) return null;

  const teamId = team._id || team.id;

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button
        variant="danger"
        loading={loading}
        onClick={() => onConfirm(teamId)}
      >
        Delete Team
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Team"
      footer={footer}
      size="sm"
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-text">
            Are you sure you want to delete this team?
          </h3>
          <p className="mt-1 text-sm font-medium text-primary">
            "{team.name}"
          </p>
          <p className="mt-2 text-xs text-text-muted">
            This action will permanently delete the team record. Team members will remain as individual students in the system.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-danger/10 p-3 text-xs font-medium text-danger border border-danger/20">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default DeleteTeamModal;
