import { useNavigate } from 'react-router-dom';
import { Layers, UserCheck, Users, ChevronRight } from 'lucide-react';

export function StudentTeamCard({ team }) {
  const navigate = useNavigate();

  if (!team) return null;

  const teamName = typeof team === 'object' ? team.name || 'Team Alpha' : `Team ${team}`;
  const teamId = typeof team === 'object' ? team.id || '1' : '1';
  const teamDescription = typeof team === 'object' ? team.description : 'Full-stack web development team working on LMS platforms.';
  const teamLead = typeof team === 'object' ? team.teamLead : 'Usman Ghani';

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Assigned Team</h3>
            <button
              type="button"
              onClick={() => navigate(`/admin/teams/${teamId}`)}
              className="text-base font-bold text-slate-900 hover:text-[#006B3C] transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
            >
              <span>{teamName}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/admin/teams/${teamId}`)}
          className="text-xs font-bold text-[#006B3C] hover:underline cursor-pointer"
        >
          View Team Workflow →
        </button>
      </div>

      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
        {teamDescription || 'Full-stack web development team working on LMS platforms.'}
      </p>

      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2">
        <div className="flex items-center gap-1.5 font-medium">
          <UserCheck className="w-4 h-4 text-[#006B3C]" />
          <span>Team Lead: <strong className="text-slate-800">{teamLead || '—'}</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{team.membersCount || 4} Members</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#006B3C]">{team.progress || 75}% Progress</span>
            <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#006B3C] h-full rounded-full"
                style={{ width: `${team.progress || 75}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentTeamCard;
