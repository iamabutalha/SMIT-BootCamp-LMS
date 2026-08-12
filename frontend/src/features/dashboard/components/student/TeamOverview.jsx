import { Link } from 'react-router-dom';
import { ArrowRight, Users, Crown, FolderGit2 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/constants/routes';

export function TeamOverview({ team }) {
  if (!team) return null;

  const members = team.members || [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#9D6BE2] flex items-center justify-center shrink-0 border border-purple-100">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">{team.teamName}</h3>
              <Badge className="bg-purple-50 text-[#9D6BE2] font-bold text-[10px]">
                {team.memberCount} Members
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Assigned Cohort Group</p>
          </div>
        </div>

        <Link
          to="/admin/teams"
          className="text-xs font-bold text-[#006B3C] hover:text-[#00522e] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Project & Lead Cards */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[10px] uppercase">
            <Crown className="w-3 h-3 text-amber-500" />
            <span>Team Lead</span>
          </div>
          <span className="font-bold text-slate-900 block truncate">{team.teamLead}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[10px] uppercase">
            <FolderGit2 className="w-3 h-3 text-[#0284C7]" />
            <span>Project</span>
          </div>
          <span className="font-bold text-slate-900 block truncate">{team.projectName}</span>
        </div>
      </div>

      {/* Team Project Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Project Completion</span>
          <span className="text-[#9D6BE2] font-extrabold">{team.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#9D6BE2] h-full transition-all duration-300 rounded-full"
            style={{ width: `${team.progress}%` }}
          />
        </div>
      </div>

      {/* Member Avatars Stack */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <span className="text-slate-500 font-semibold">Team Teammates</span>
        <div className="flex items-center -space-x-2 overflow-hidden">
          {members.map((m, idx) => (
            <Avatar
              key={m.name || idx}
              src={m.avatar}
              name={m.name}
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamOverview;
