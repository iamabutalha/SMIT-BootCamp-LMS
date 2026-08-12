import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, UserCheck, Calendar, Pencil, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function TeamHeader({ team, onEditClick, onAddMemberClick }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      {/* Top Row: Back Button & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => navigate('/admin/teams')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#006B3C] transition cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teams Management</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onEditClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEditClick}
              leftIcon={<Pencil className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Edit Team
            </Button>
          )}

          {onAddMemberClick && (
            <Button
              size="sm"
              onClick={onAddMemberClick}
              leftIcon={<UserPlus className="w-3.5 h-3.5" />}
              className="bg-[#006B3C] hover:bg-[#005530] text-xs font-bold"
            >
              Add Member
            </Button>
          )}
        </div>
      </div>

      {/* Main Team Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
          <Layers className="w-6 h-6" />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{team.name}</h1>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
              {team.batch}
            </span>
            <Badge
              variant={team.status === 'active' ? 'success' : 'secondary'}
              className={`text-[10px] uppercase font-bold tracking-wider ${
                team.status === 'active'
                  ? 'bg-[#E8F7DF] text-[#006B3C] border-transparent'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {team.status === 'active' ? 'Active Team' : 'Completed'}
            </Badge>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {team.description || 'No detailed description provided for this team.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#006B3C]" />
              <span>Mentor: <strong className="text-slate-800">{team.mentorName || 'Unassigned'}</strong></span>
            </div>

            {team.createdAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Created: <strong className="text-slate-800">{team.createdAt}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamHeader;
