import Skeleton from '@/components/ui/Skeleton';

export function StudentAttendanceSkeleton() {
  return (
    <div className="space-y-6 font-sans text-left animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-3 w-28 rounded-md" />
          </div>
        ))}
      </div>

      {/* Charts & Calendar Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <Skeleton className="h-5 w-40 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <Skeleton className="h-5 w-44 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default StudentAttendanceSkeleton;
