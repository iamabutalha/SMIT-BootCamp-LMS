import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
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
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { ROLES } from '../constants/roles';
import { cn } from '../utils/cn';
import Logo from '../components/common/Logo';
import Avatar from '../components/ui/Avatar';

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

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

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-white border-r border-slate-200 shrink-0 min-h-screen transition-all duration-300 select-none font-sans sticky top-0 h-screen z-30 shadow-2xs',
        collapsed ? 'w-[80px] p-3' : 'w-[250px] p-4'
      )}
    >
      {/* Top Header: SMIT Logo + Collapse Toggle */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
        {!collapsed && <Logo size="md" />}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors mx-auto lg:mx-0 cursor-pointer"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Nav Links List */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCurrentActive =
            location.pathname === item.to ||
            (item.to !== ROUTES.ADMIN.ROOT && location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={() =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative group cursor-pointer',
                  isCurrentActive
                    ? 'bg-[#E8F7DF] text-[#21C75D] shadow-2xs font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  'w-4 h-4 shrink-0 transition-colors',
                  isCurrentActive ? 'text-[#21C75D]' : 'text-slate-400 group-hover:text-slate-700'
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User Card Profile + Logout */}
      <div className="pt-3 border-t border-slate-100 mt-auto">
        <div
          className={cn(
            'flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100',
            collapsed && 'justify-center p-1'
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              src={user?.profileImage?.url}
              name={user?.name || 'Admin'}
              className="w-9 h-9 shrink-0"
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {user?.name || 'Admin'}
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {user?.role || 'Admin'}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer ml-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
