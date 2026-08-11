import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserRound, Mail, Calendar, Layers, ShieldCheck, Pencil } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function StudentHeader({ student, onEditClick, onBack }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/admin/students');
    }
  };

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans select-none">
      {/* Back Button & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={handleBackClick}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#006B3C] transition cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Management</span>
        </button>

        {onEditClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEditClick}
            leftIcon={<Pencil className="w-3.5 h-3.5" />}
            className="text-xs self-start sm:self-auto"
          >
            Edit Student Profile
          </Button>
        )}
      </div>

      {/* Main Student Header Profile */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <Avatar src={student.avatar} name={student.name} className="w-16 h-16 border-2 border-[#006B3C]/20 shadow-xs shrink-0" />

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{student.name}</h1>
            <span className="text-xs font-bold font-mono text-[#006B3C] bg-[#E8F7DF] px-2.5 py-0.5 rounded-lg">
              Roll #{student.rollNumber}
            </span>
            <Badge variant="success" className="bg-[#E8F7DF] text-[#006B3C] border-transparent font-bold text-[10px] uppercase">
              {student.status || 'Active'}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-500">Course:</span>
              <strong className="text-slate-800">{student.course}</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-500">Batch:</span>
              <strong className="text-slate-800">{student.batch}</strong>
            </div>
          </div>

          {student.team && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-500">Team:</span>
              <button
                type="button"
                onClick={() => navigate(`/admin/teams/${typeof student.team === 'object' ? student.team.id || '1' : '1'}`)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#006B3C] hover:underline cursor-pointer bg-[#E8F7DF] px-2.5 py-0.5 rounded-md"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{typeof student.team === 'object' ? student.team.name : `Team ${student.team}`}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentHeader;
