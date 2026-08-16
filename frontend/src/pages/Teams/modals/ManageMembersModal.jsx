import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Badge from "../../../components/ui/Badge";
import { Users, UserPlus, Crown, Trash2, ShieldCheck } from "lucide-react";

function ManageMembersModal({
  isOpen,
  onClose,
  team = null,
  students = [],
  onAddMember,
  onRemoveMember,
  onChangeLeader,
  loading = false,
  error = null,
}) {
  if (!team) return null;

  const members = team.members || [];
  const memberIds = members.map((m) => m.id);

  // Available students not in current team
  const availableStudents = students.filter(
    (student) => !memberIds.includes(student.id)
  );

  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState("");
  const [selectedLeaderToAssign, setSelectedLeaderToAssign] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudentToAdd) return;
    onAddMember(team.id, selectedStudentToAdd);
    setSelectedStudentToAdd("");
  };

  const handleChangeLeaderSubmit = (e) => {
    e.preventDefault();
    if (!selectedLeaderToAssign) return;
    onChangeLeader(team.id, selectedLeaderToAssign);
    setSelectedLeaderToAssign("");
  };

  const addStudentOptions = availableStudents.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.rollNumber})`,
  }));

  const leaderStudentOptions = members.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.rollNumber})`,
  }));

  const footer = (
    <Button variant="outline" onClick={onClose} disabled={loading}>
      Done
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Members - ${team.name}`}
      footer={footer}
      size="lg"
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-lg bg-danger/10 p-3 text-xs font-medium text-danger border border-danger/20">
            {error}
          </div>
        )}

        {/* Change Leader Quick Section */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Crown className="h-4 w-4" />
              <span>Current Team Leader</span>
            </h4>
            <Badge variant="mint">
              {team.leaderName || "None"}
            </Badge>
          </div>

          {members.length > 0 && (
            <form
              onSubmit={handleChangeLeaderSubmit}
              className="flex items-end gap-3"
            >
              <div className="flex-1">
                <Select
                  id="change-leader-select"
                  label="Change Team Leader"
                  options={leaderStudentOptions}
                  value={selectedLeaderToAssign || team.leaderId}
                  onChange={(e) => setSelectedLeaderToAssign(e.target.value)}
                  placeholder="Select new leader"
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                disabled={!selectedLeaderToAssign || selectedLeaderToAssign === team.leaderId}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Assign Leader</span>
              </Button>
            </form>
          )}
        </div>

        {/* Add Member Section */}
        <div className="rounded-xl border border-border bg-background p-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <UserPlus className="h-4 w-4 text-primary" />
            <span>Add Member to Team</span>
          </h4>

          {availableStudents.length === 0 ? (
            <p className="text-xs text-text-muted">
              All registered students are already in this team.
            </p>
          ) : (
            <form onSubmit={handleAddSubmit} className="flex items-end gap-3">
              <div className="flex-1">
                <Select
                  id="add-member-select"
                  options={addStudentOptions}
                  value={selectedStudentToAdd}
                  onChange={(e) => setSelectedStudentToAdd(e.target.value)}
                  placeholder="Select a student to add"
                />
              </div>
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                disabled={!selectedStudentToAdd}
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Member</span>
              </Button>
            </form>
          )}
        </div>

        {/* Current Members List */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Users className="h-4 w-4 text-text-muted" />
            <span>Team Members ({members.length})</span>
          </h4>

          <div className="divide-y divide-border rounded-xl border border-border bg-surface">
            {members.length === 0 ? (
              <p className="p-4 text-center text-xs text-text-muted">
                No members in this team. Add students above.
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-text font-medium text-xs">
                        {member.name.charAt(0)}
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
                        <span className="text-xs font-mono text-text-muted">
                          {member.rollNumber}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isLeader && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onChangeLeader(team.id, member.id)}
                          loading={loading}
                          title="Make Team Leader"
                          className="text-xs text-primary hover:underline"
                        >
                          Make Leader
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveMember(team.id, member.id)}
                        loading={loading}
                        title="Remove Member"
                      >
                        <Trash2 className="h-4 w-4 text-danger opacity-80 hover:opacity-100" />
                      </Button>
                    </div>
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

export default ManageMembersModal;
