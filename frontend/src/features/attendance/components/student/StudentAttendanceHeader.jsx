import { User, BookOpen, Users, Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';

export function StudentAttendanceHeader() {
  const { user } = useAuth();

  const studentInfo = {
    name: user?.name || 'Muhammad Hamza',
    rollNumber: user?.rollNumber || '102341',
    batch: 'MERN Stack — Batch 12',
    course: 'Web & Mobile App Development',
    team: 'Team Alpha',
    avatar: user?.profileImage?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  };

  return (
    <div className="space-y-4 font-sans text-left">
      {/* Top Title & Read-Only Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Attendance</h1>
            <Badge className="bg-[#E8F7DF] text-[#57BA7F] font-bold text-[11px] px-2.5 py-0.5">
              Read-Only Portal
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track your attendance history and overall attendance performance.
          </p>
        </div>
      </div>

      {/* Student Credentials Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Avatar
            src={studentInfo.avatar}
            name={studentInfo.name}
            className="w-12 h-12 rounded-2xl ring-2 ring-[#57BA7F]/20 shrink-0"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{studentInfo.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{studentInfo.course}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Roll Number</span>
              <span className="font-extrabold text-slate-800">{studentInfo.rollNumber}</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0072BC] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Batch</span>
              <span className="font-bold text-slate-800 truncate max-w-[110px] block">{studentInfo.batch}</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 col-span-2 sm:col-span-1">
            <Users className="w-4 h-4 text-[#57BA7F] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Team</span>
              <span className="font-bold text-slate-800">{studentInfo.team}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendanceHeader;
