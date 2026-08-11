import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  MessageSquare,
  Search,
  LogOut,
  X,
  CheckCheck,
  Trash2,
  Users,
  CalendarCheck,
  ClipboardList,
  Layers,
  Settings,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toggleMobileSidebar } from '../app/store/slices/uiSlice';
import { ROUTES } from '../constants/routes';
import Avatar from '../components/ui/Avatar';
import Logo from '../components/common/Logo';
import { toast } from 'sonner';

const SYSTEM_SEARCH_ITEMS = [
  {
    id: 'nav-students',
    title: 'Students Management',
    category: 'Users',
    path: ROUTES.ADMIN.STUDENTS,
    icon: Users,
    keywords: ['student', 'students', 'roll', 'user', 'ali', 'fatima', 'usman'],
  },
  {
    id: 'nav-attendance',
    title: 'Attendance Sheet & Records',
    category: 'Attendance',
    path: ROUTES.ADMIN.ATTENDANCE,
    icon: CalendarCheck,
    keywords: ['attendance', 'present', 'absent', 'late', 'leave', 'mark'],
  },
  {
    id: 'nav-[#006B3C]-teams',
    title: 'Teams & Cohorts Management',
    category: 'Teams',
    path: '/admin/teams',
    icon: Layers,
    keywords: ['team', 'teams', 'cohort', 'cohorts', 'batch', 'alpha', 'beta'],
  },
  {
    id: 'nav-tasks',
    title: 'Assignments & Tasks Portal',
    category: 'Assignments',
    path: ROUTES.ADMIN.TASKS,
    icon: ClipboardList,
    keywords: ['task', 'tasks', 'assignment', 'assignments', 'quiz', 'submission'],
  },
  {
    id: 'nav-profile',
    title: 'Profile & System Settings',
    category: 'Settings',
    path: ROUTES.ADMIN.PROFILE,
    icon: Settings,
    keywords: ['profile', 'settings', 'password', 'account', 'security'],
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Attendance Warning',
    message: '6 students recorded Absent in Web Development Batch 12.',
    time: '10 min ago',
    read: false,
    type: 'warning',
  },
  {
    id: 2,
    title: 'New Assignment Submission',
    message: 'Muhammad Ali submitted "React LMS Dashboard" assignment.',
    time: '25 min ago',
    read: false,
    type: 'success',
  },
  {
    id: 3,
    title: 'Team Member Added',
    message: 'Hamza Mehmood assigned to Team Alpha — Web Development.',
    time: '1 hour ago',
    read: false,
    type: 'info',
  },
  {
    id: 4,
    title: 'Monthly Progress Report',
    message: 'Monthly bootcamp attendance rate updated to 86%.',
    time: '3 hours ago',
    read: true,
    type: 'info',
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'Ahmed Raza',
    role: 'Mentor',
    message: 'Please review the updated lecture schedule for Team Alpha.',
    time: '5 min ago',
    read: false,
  },
  {
    id: 2,
    sender: 'Sara Khan',
    role: 'Mentor',
    message: 'Attendance sheet for Mobile App Development Batch 5 completed.',
    time: '32 min ago',
    read: false,
  },
];

export function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Messages state
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const msgRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(e.target)) {
        setIsMessagesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const unreadMsgCount = messages.filter((m) => !m.read).length;

  // Filter global search results
  const searchResults = searchQuery.trim()
    ? SYSTEM_SEARCH_ITEMS.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.includes(q))
        );
      })
    : [];

  const handleSelectSearchItem = (path) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectSearchItem(searchResults[0].path);
    } else if (searchQuery.trim()) {
      toast.info(`Navigating to search results for "${searchQuery}"`);
      navigate(ROUTES.ADMIN.STUDENTS);
      setIsSearchOpen(false);
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    toast.info('Notifications cleared');
  };

  const handleMarkAllMessagesRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    toast.success('All messages marked as read');
  };

  return (
    <header className="bg-[#F8F9FB] border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 select-none font-sans">
      {/* Mobile Toggle + Brand Title & Subtitle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleMobileSidebar())}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden">
          <Logo size="sm" />
        </div>

        <div className="hidden sm:block">
          <h1 className="text-sm font-bold text-slate-900 tracking-tight">
            Bootcamp LMS Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Saylani Welfare Trust Workspace
          </p>
        </div>
      </div>

      {/* Controls: Search, Notifications, Messages, User Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Input Bar */}
        <div ref={searchRef} className="relative hidden md:block">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder="Search pages, students, teams..."
                className="h-9 w-52 lg:w-72 pl-9 pr-8 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006B3C] focus:border-transparent transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Search Dropdown Results Popover */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Global Search Results
                </span>
                <span className="text-[11px] font-semibold text-[#006B3C]">
                  {searchResults.length} matches
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-700">No matching items</p>
                  <p className="text-[11px] text-slate-400">
                    Try searching for "students", "attendance", "teams", or "tasks".
                  </p>
                </div>
              ) : (
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {searchResults.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSearchItem(item.path)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-left transition cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#006B3C] transition-colors">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.category}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#006B3C] transition-colors" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications Bell Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsMessagesOpen(false);
            }}
            className="relative p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#006B3C] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Menu */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-11 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                  {unreadNotifCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F7DF] text-[#006B3C]">
                      {unreadNotifCount} New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {notifications.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleMarkAllNotificationsRead}
                        className="p-1 rounded-lg text-slate-400 hover:text-[#006B3C] hover:bg-[#E8F7DF] transition cursor-pointer"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleClearNotifications}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Clear notifications"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 space-y-1">
                  <Sparkles className="w-6 h-6 mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-700">No new notifications</p>
                  <p className="text-[11px] text-slate-400">You are all caught up!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                        );
                      }}
                      className={`p-3 rounded-xl border text-xs transition cursor-pointer ${
                        n.read
                          ? 'bg-slate-50/60 border-slate-100 text-slate-600'
                          : 'bg-white border-[#006B3C]/20 shadow-2xs text-slate-900 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#006B3C] text-xs">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-slate-600 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div ref={msgRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setIsMessagesOpen(!isMessagesOpen);
              setIsNotificationsOpen(false);
            }}
            className="relative p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            {unreadMsgCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#006B3C] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Messages Popover Menu */}
          {isMessagesOpen && (
            <div className="absolute right-0 top-11 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Messages</h3>
                  {unreadMsgCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F7DF] text-[#006B3C]">
                      {unreadMsgCount} New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleMarkAllMessagesRead}
                    className="p-1 rounded-lg text-slate-400 hover:text-[#006B3C] hover:bg-[#E8F7DF] transition cursor-pointer"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMessagesOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setMessages((prev) =>
                        prev.map((item) => (item.id === m.id ? { ...item, read: true } : item))
                      );
                    }}
                    className={`p-3 rounded-xl border text-xs transition cursor-pointer ${
                      m.read
                        ? 'bg-slate-50/60 border-slate-100 text-slate-600'
                        : 'bg-white border-[#006B3C]/20 shadow-2xs text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Avatar name={m.sender} className="w-5 h-5 text-[10px]" />
                        <span>{m.sender}</span>
                        <span className="text-[10px] font-normal text-slate-400">({m.role})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{m.time}</span>
                    </div>
                    <p className="text-slate-600 leading-snug">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill & Topbar Logout Button */}
        {user && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <Avatar
              src={user.profileImage?.url}
              name={user.name || 'Admin'}
              className="w-9 h-9 border border-slate-200 shadow-2xs"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user.name || 'Admin'}
              </span>
              <span className="text-[10px] text-slate-400 leading-tight">
                {user.role || 'Admin'}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer ml-1 flex items-center gap-1.5 border border-slate-200 bg-white shadow-2xs"
              title="Logout from Account"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline text-xs font-bold text-slate-700 hover:text-red-600">
                Logout
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
