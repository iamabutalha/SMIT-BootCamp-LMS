import { User, Users, Briefcase, GraduationCap } from "lucide-react";

function StudentProfileCard({ student }) {
  const name = student?.name || "Muhammad Hamza";
  const rollNumber = student?.rollNumber || "22-CS-123";
  const teamName = student?.team?.name || student?.teamName || "Team Alpha";
  const role = student?.role || student?.teamRole || "Frontend Developer";
  const batch = student?.batch || student?.course || "SMIT Bootcamp";

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left Section: Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl border border-primary/20">
            {name ? name.charAt(0).toUpperCase() : "S"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text">{name}</h2>
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                Student
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Roll No: <span className="font-semibold text-text">{rollNumber}</span>
            </p>
          </div>
        </div>

        {/* Right Section: Team, Role, Batch */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-primary shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-text-muted font-medium">Team</p>
              <p className="font-semibold text-text">{teamName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <p className="text-text-muted font-medium">Role</p>
              <p className="font-semibold text-text">{role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-text-muted font-medium">Batch</p>
              <p className="font-semibold text-text">{batch}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileCard;
