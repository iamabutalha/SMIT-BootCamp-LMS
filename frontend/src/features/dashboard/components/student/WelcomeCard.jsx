import { Link } from 'react-router-dom';
import { ShieldCheck, User, Users, BookOpen } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/constants/routes';

export function WelcomeCard({ student }) {
  if (!student) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Welcome Greeting & Avatar */}
        <div className="flex items-center gap-4">
          <Avatar
            src={student.avatar}
            name={student.name}
            className="w-14 h-14 rounded-2xl ring-2 ring-[#006B3C]/10 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Good morning, {student.name.split(' ')[0]} 👋
              </h2>
              <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold text-[11px] px-2.5 py-0.5">
                Active Student
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Here&apos;s your learning progress and performance at a glance.
            </p>
          </div>
        </div>

        {/* Right Student Credentials Grid */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 text-xs">
          <Link to={ROUTES.STUDENT.PROFILE} className="p-2.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-100 flex items-center gap-2 transition-colors cursor-pointer" title="Click to view & download official Roll Number Slip PDF">
            <User className="w-4 h-4 text-[#006B3C] shrink-0" />
            <div>
              <span className="text-[10px] text-[#006B3C] font-semibold uppercase block">Roll Number (PDF)</span>
              <span className="font-extrabold text-[#006B3C]">{student.rollNumber}</span>
            </div>
          </Link>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/90 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0072BC] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Batch</span>
              <span className="font-bold text-slate-800 truncate max-w-[120px] block">{student.batch}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/90 flex items-center gap-2 col-span-2 sm:col-span-1">
            <Users className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Team</span>
              <span className="font-bold text-slate-800">{student.team}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
