import { useDispatch } from 'react-redux';
import { Menu, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toggleMobileSidebar } from '../app/store/slices/uiSlice';
import Avatar from '../components/ui/Avatar';
import StatusBadge from '../components/common/StatusBadge';
import Logo from '../components/common/Logo';
import SearchInput from '../components/common/SearchInput';
import { useState } from 'react';

export function Topbar() {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleMobileSidebar())}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden">
          <Logo variant="light" size="sm" />
        </div>

        {/* Global Search Input (visible on md screens and above) */}
        <div className="hidden md:block w-72">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search tasks, cohorts..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell with Lime Dot Accent */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-lime-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {user && (
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <StatusBadge status={user.role} />
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-semibold text-slate-900 leading-tight">
                {user.name}
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                {user.email}
              </span>
            </div>
            <Avatar name={user.name} />
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
