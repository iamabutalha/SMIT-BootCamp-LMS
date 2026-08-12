import { Calendar, Filter, RefreshCw, Download, Layers, Users, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ReportsHeader({
  filters,
  onFilterChange,
  onRefresh,
  onExport,
  isRefreshing,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-slate-500 font-medium">
            Monitor bootcamp performance, student progress, attendance and academic activity.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            className="text-xs font-bold rounded-xl border-slate-200 hover:bg-slate-50 cursor-pointer"
          >
            Refresh
          </Button>

          <Button
            type="button"
            onClick={onExport}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs cursor-pointer"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Modern Filter Toolbar */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Date Range Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
          >
            <option value="THIS_MONTH">This Month</option>
            <option value="LAST_MONTH">Last Month</option>
            <option value="LAST_3_MONTHS">Last 3 Months</option>
            <option value="YEAR_TO_DATE">Year to Date</option>
          </select>
        </div>

        {/* Batch Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" /> Current Batch
          </label>
          <select
            value={filters.batch}
            onChange={(e) => onFilterChange('batch', e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
          >
            <option value="BATCH_2026">Bootcamp 2026</option>
            <option value="BATCH_12">Batch 12 (Web Dev)</option>
            <option value="BATCH_11">Batch 11 (AI/Cloud)</option>
            <option value="BATCH_10">Batch 10 (Mobile)</option>
          </select>
        </div>

        {/* Team Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" /> Team Filter
          </label>
          <select
            value={filters.team}
            onChange={(e) => onFilterChange('team', e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
          >
            <option value="ALL">All Teams</option>
            <option value="Team Alpha">Team Alpha</option>
            <option value="Team Beta">Team Beta</option>
            <option value="Team Gamma">Team Gamma</option>
            <option value="Team Delta">Team Delta</option>
          </select>
        </div>

        {/* Performance Level */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <BarChart2 className="w-3 h-3 text-slate-400" /> Performance
          </label>
          <select
            value={filters.performance}
            onChange={(e) => onFilterChange('performance', e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
          >
            <option value="ALL">All Tiers</option>
            <option value="EXCELLENT">Excellent (&gt;85%)</option>
            <option value="GOOD">Good (70-84%)</option>
            <option value="AT RISK">At Risk (&lt;60%)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ReportsHeader;
