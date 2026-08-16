import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { Crown, Users, Mail, User, ShieldCheck } from "lucide-react";

function TeamDetailModal({
  isOpen,
  onClose,
  team = null,
  onEdit = null,
  onManageMembers = null,
}) {
  if (!team) return null;

  const members = team.members || [];

  const footer = (
    <>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      {onManageMembers && (
        <Button
          variant="secondary"
          onClick={() => {
            onClose();
            onManageMembers(team);
          }}
        >
          <Users className="h-4 w-4" />
          <span>Manage Members</span>
        </Button>
      )}
      {onEdit && (
        <Button
          variant="primary"
          onClick={() => {
            onClose();
            onEdit(team);
          }}
        >
          <span>Edit Team</span>
        </Button>
      )}
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Team Details"
      footer={footer}
      size="md"
    >
      <div className="space-y-6">
        {/* Team Header Summary Card */}
        <div className="rounded-xl border border-border bg-background p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-text">{team.name}</h3>
            <p className="text-xs text-text-muted mt-0.5">
              Created on {team.createdAt || "N/A"}
            </p>
          </div>
          <Badge variant="mint" className="text-xs px-3 py-1 font-semibold">
            {members.length} {members.length === 1 ? "Member" : "Members"}
          </Badge>
        </div>

        {/* Team Leader Banner */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Team Leader
            </span>
            <p className="text-sm font-bold text-text">{team.leaderName || "Not Assigned"}</p>
          </div>
        </div>

        {/* Members List Section */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Users className="h-4 w-4 text-text-muted" />
              <span>Team Members List</span>
            </h4>
          </div>

          <div className="divide-y divide-border rounded-xl border border-border bg-surface">
            {members.length === 0 ? (
              <p className="p-4 text-center text-xs text-text-muted">
                No members in this team yet.
              </p>
            ) : (
              members.map((member) => {
                const isLeader = member.id === team.leaderId;
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 sm:px-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-text-muted">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-text">
                            {member.name}
                          </span>
                          {isLeader && (
                            <Badge variant="mint" className="text-[10px]">
                              Team Leader
                            </Badge>
                          )}
                        </div>
                        {member.email && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="font-mono text-xs font-medium text-text-muted">
                      {member.rollNumber}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TeamDetailModal;
