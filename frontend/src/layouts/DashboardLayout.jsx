import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Breadcrumbs from './Breadcrumbs';
import { RouteLoader } from '../components/common/RouteLoader';
import { RouteTransition } from '../components/common/RouteTransition';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Global Route Progress Indicator & Backdrop */}
      <RouteLoader />

      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <MobileSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Breadcrumbs />
          <RouteTransition>
            <Outlet />
          </RouteTransition>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
