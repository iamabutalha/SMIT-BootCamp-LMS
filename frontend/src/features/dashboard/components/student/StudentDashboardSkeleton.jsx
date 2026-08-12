import Skeleton from '@/components/ui/Skeleton';

export function StudentDashboardSkeleton() {
  return (
    <div className="space-y-6 font-sans text-left animate-pulse">
      {/* Welcome Card Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-64 rounded-lg" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
        </div>
      </div>

      {/* KPI Stats Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-3 w-28 rounded-md" />
          </div>
        ))}
      </div>

      {/* Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <Skeleton className="h-5 w-48 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <Skeleton className="h-5 w-36 rounded-lg" />
          <Skeleton className="h-44 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardSkeleton;
