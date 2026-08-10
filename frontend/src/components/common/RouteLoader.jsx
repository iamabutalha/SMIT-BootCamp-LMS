import { useRouteLoading } from '../../hooks/useRouteLoading';
import Spinner from '../ui/Spinner';

export function RouteLoader({ duration = 200 }) {
  const { isRouteLoading } = useRouteLoading(duration);

  if (!isRouteLoading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-200 animate-in fade-in"
    >
      {/* Top Brand Green Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#4DBD18] shadow-[0_0_10px_#4DBD18] animate-pulse transition-all duration-200 ease-out" />

      {/* Subtle Centered Spinner Overlay */}
      <div className="fixed bottom-6 right-6 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-200">
        <Spinner size="sm" className="text-[#006B3C]" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default RouteLoader;
