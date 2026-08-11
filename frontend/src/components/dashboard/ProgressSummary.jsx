import { Award, AlertTriangle, CheckCircle2, Target } from 'lucide-react';

export function ProgressSummary({ summary = {} }) {
  const {
    averageProgress = 72,
    topPerformersCount = 8,
    atRiskCount = 5,
    modulesCompleted = 64,
  } = summary;

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-[#0C0E0F]">Overall Progress Summary</h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time performance indicators & student risk metrics</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#E8F7DF] text-[#006B3C]">
          Live Analytics
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Average Progress */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Progress</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#006B3C]">{averageProgress}%</p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#006B3C] h-full rounded-full" style={{ width: `${averageProgress}%` }} />
          </div>
        </div>

        {/* Metric 2: Top Performers */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Performers</span>
            <div className="w-8 h-8 rounded-lg bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#2D67E4]">{topPerformersCount} <span className="text-xs font-medium text-slate-500">Students</span></p>
          <p className="text-[11px] text-slate-500 font-medium">&gt; 85% score threshold</p>
        </div>

        {/* Metric 3: Students At Risk */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students At Risk</span>
            <div className="w-8 h-8 rounded-lg bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#DE646D]">{atRiskCount} <span className="text-xs font-medium text-slate-500">Students</span></p>
          <p className="text-[11px] text-red-500 font-medium">Requires mentor assistance</p>
        </div>

        {/* Metric 4: Modules Completed */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Modules Completed</span>
            <div className="w-8 h-8 rounded-lg bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{modulesCompleted}%</p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#DAA622] h-full rounded-full" style={{ width: `${modulesCompleted}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressSummary;
