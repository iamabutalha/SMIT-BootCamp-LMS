import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  TrendingUp,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  HelpCircle,
  Users,
  UserCheck,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { closeMobileSidebar } from '../app/store/slices/uiSlice';
import { ROUTES } from '../constants/routes';
import { ROLES } from '../constants/roles';
import { cn } from '../utils/cn';
import Logo from '../components/common/Logo';
import Avatar from '../components/ui/Avatar';

export function MobileSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const mobileOpen = useSelector((state) => state.ui.mobileSidebarOpen);
  const { user, logout } = useAuth();

  if (!mobileOpen) return null;

  let navItems = [
    { label: 'Dashboard', to: ROUTES.ADMIN.ROOT, icon: LayoutDashboard },
    { label: 'Progress', to: '/admin/progress', icon: TrendingUp },
    { label: 'Attendance', to: ROUTES.ADMIN.ATTENDANCE, icon: CalendarCheck },
    { label: 'Payment', to: '/admin/payment', icon: CreditCard },
    { label: 'Assignment', to: ROUTES.ADMIN.TASKS, icon: ClipboardList },
    { label: 'Quizzes', to: ROUTES.ADMIN.QUIZZES, icon: HelpCircle },
    { label: 'Students', to: ROUTES.ADMIN.STUDENTS, icon: Users },
    { label: 'Teachers', to: ROUTES.ADMIN.TEACHERS, icon: UserCheck },
    { label: 'Teams', to: ROUTES.ADMIN.COHORTS, icon: BookOpen },
    { label: 'Reports', to: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', to: ROUTES.ADMIN.PROFILE, icon: Settings },
  ];

  if (user?.role === ROLES.STUDENT) {
    navItems = [
      { label: 'Dashboard', to: ROUTES.STUDENT.ROOT, icon: LayoutDashboard },
      { label: 'My Tasks', to: ROUTES.STUDENT.TASKS, icon: ClipboardList },
      { label: 'Quizzes', to: ROUTES.STUDENT.QUIZZES, icon: HelpCircle },
      { label: 'Attendance', to: ROUTES.STUDENT.ATTENDANCE, icon: CalendarCheck },
      { label: 'Profile', to: ROUTES.STUDENT.PROFILE, icon: Settings },
    ];
  } else if (user?.role === ROLES.MENTOR) {
    navItems = [
      { label: 'Dashboard', to: ROUTES.MENTOR.ROOT, icon: LayoutDashboard },
      { label: 'Cohorts', to: ROUTES.MENTOR.COHORTS, icon: BookOpen },
      { label: 'Attendance', to: ROUTES.MENTOR.ATTENDANCE, icon: CalendarCheck },
      { label: 'Tasks', to: ROUTES.MENTOR.TASKS, icon: ClipboardList },
    ];
  }

  const handleLogout = () => {
    dispatch(closeMobileSidebar());
    logout();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        onClick={() => dispatch(closeMobileSidebar())}
      />
      <div className="relative flex-1 flex flex-col w-full max-w-xs bg-white text-slate-900 p-4 space-y-4 z-10 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <Logo size="md" />
          <button
            type="button"
            onClick={() => dispatch(closeMobileSidebar())}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrentActive =
              location.pathname === item.to ||
              (item.to !== ROUTES.ADMIN.ROOT && location.pathname.startsWith(item.to));

            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => dispatch(closeMobileSidebar())}
                className={() =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer',
                    isCurrentActive
                      ? 'bg-[#E8F7DF] text-[#21C75D] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  )
                }
              >
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0',
                    isCurrentActive ? 'text-[#21C75D]' : 'text-slate-400'
                  )}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Card + Logout */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={user?.profileImage?.url}
                name={user?.name || 'Admin'}
                className="w-9 h-9 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {user?.name || 'Admin'}
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {user?.role || 'Admin'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
