import { Link } from 'react-router-dom';
import { ClipboardList, BookOpen, HelpCircle, CalendarCheck, Users, User, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function QuickActions() {
  const actionItems = [
    { label: 'View Tasks', to: ROUTES.STUDENT.TASKS, icon: ClipboardList, color: 'bg-sky-50 text-[#0284C7] hover:bg-sky-100' },
    { label: 'Assignments', to: ROUTES.STUDENT.ASSIGNMENTS, icon: BookOpen, color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' },
    { label: 'Take Quiz', to: ROUTES.STUDENT.QUIZZES, icon: HelpCircle, color: 'bg-[#E8F7DF] text-[#006B3C] hover:bg-emerald-100' },
    { label: 'Attendance', to: ROUTES.STUDENT.ATTENDANCE, icon: CalendarCheck, color: 'bg-emerald-50 text-[#57BA7F] hover:bg-emerald-100' },
    { label: 'My Team', to: '/admin/teams', icon: Users, color: 'bg-purple-50 text-[#9D6BE2] hover:bg-purple-100' },
    { label: 'My Profile', to: ROUTES.STUDENT.PROFILE, icon: User, color: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Quick Actions</h3>
        <p className="text-xs text-slate-500">Shortcuts to your primary student workspace areas.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actionItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`p-3.5 rounded-xl border border-slate-100/90 flex flex-col items-center justify-center gap-2 text-center transition-all group cursor-pointer ${item.color}`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon className="w-5 h-5 shrink-0" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs font-bold block truncate w-full">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
