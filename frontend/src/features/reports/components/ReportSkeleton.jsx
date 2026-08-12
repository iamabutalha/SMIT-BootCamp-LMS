export function ReportSkeleton() {
  return (
    <div className="space-y-6 font-sans animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="h-6 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="h-9 bg-slate-100 rounded-xl" />
          <div className="h-9 bg-slate-100 rounded-xl" />
          <div className="h-9 bg-slate-100 rounded-xl" />
          <div className="h-9 bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* KPI Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="w-8 h-8 rounded-xl bg-slate-100" />
            </div>
            <div className="h-7 w-20 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 h-80 flex flex-col justify-between">
        <div className="h-6 w-56 bg-slate-200 rounded" />
        <div className="h-56 bg-slate-100 rounded-xl w-full" />
      </div>

      {/* Tables Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
        <div className="h-6 w-40 bg-slate-200 rounded" />
        <div className="h-44 bg-slate-100 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default ReportSkeleton;
