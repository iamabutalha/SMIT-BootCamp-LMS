import { Users } from "lucide-react";
import Badge from "../ui/Badge";

function TeamCard({ team, userRole = "Frontend Developer" }) {
  const teamName = team?.name || "Team Alpha";
  const projectName = team?.project?.name || team?.project || "Bootcamp LMS Project";

  // Default fallback members matching the required example if team members aren't explicitly populated
  const defaultMembers = [
    { id: 1, name: "Ali", role: "Backend Developer" },
    { id: 2, name: "Hamza", role: "Frontend Developer" },
    { id: 3, name: "Shah Faisal", role: "Backend Developer" },
    { id: 4, name: "Muzamil", role: "Frontend Developer" },
  ];

  const membersList = (team?.members && team.members.length > 0)
    ? team.members.map((m, idx) => ({
        id: m._id || m.id || idx,
        name: m.name,
        role: m.role || (idx % 2 === 0 ? "Backend Developer" : "Frontend Developer")
      }))
    : defaultMembers;

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border p-5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-text flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            My Team
          </h2>
          <p className="mt-1 text-xs text-text-muted">
            Project: <span className="font-medium text-text">{projectName}</span>
          </p>
        </div>
        <Badge variant="info" className="font-semibold">
          {membersList.length} Members
        </Badge>
      </div>

      <div className="p-5 space-y-4">
        {/* Team Details Header */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
          <div>
            <p className="text-xs text-text-muted font-medium">Team Name</p>
            <p className="text-base font-bold text-text">{teamName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted font-medium">Your Role</p>
            <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
              {userRole}
            </span>
          </div>
        </div>

        {/* Team Members List */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Team Members
          </p>
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden bg-surface">
            {membersList.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between px-3.5 py-2.5 hover:bg-background/50 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-text">{member.name}</span>
                </div>
                <span className="text-xs font-medium text-text-muted">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
