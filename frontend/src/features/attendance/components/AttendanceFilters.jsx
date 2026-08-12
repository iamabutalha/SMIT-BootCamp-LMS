import { Search, Calendar as CalendarIcon, Filter, Layers, Clock } from 'lucide-react';

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export function AttendanceFilters({
  year,
  setYear,
  month,
  setMonth,
  week,
  setWeek,
  selectedDate,
  setSelectedDate,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  availableWeeks = [],
}) {
  return (
    <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans select-none">
      {/* Row 1: View Mode Switcher + Year Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        {/* View Mode Segmented Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 self-start sm:self-auto">
          {[
            { id: 'daily', label: 'Daily View' },
            { id: 'weekly', label: 'Weekly Matrix' },
            { id: 'monthly', label: 'Monthly Overview' },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setViewMode(mode.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                viewMode === mode.id
                  ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Year Dropdown */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Year:</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      {/* Row 2: Month Horizontal Selector */}
      <div className="overflow-x-auto pb-1 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max">
          {MONTHS.map((m) => {
            const isSelected = month === m.value;
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => setMonth(m.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#006B3C] text-white shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Context Controls (Week / Date Selector + Search + Status Filter) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          {/* Week Selector (visible in Weekly or Daily mode) */}
          {viewMode !== 'monthly' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Week:</span>
              <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
              >
                {availableWeeks.map((w) => (
                  <option key={w.weekNum} value={w.weekNum}>
                    Week {w.weekNum} ({w.label})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Specific Date Picker (visible in Daily mode) */}
          {viewMode === 'daily' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#006B3C] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Student Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name or roll #..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006B3C] shadow-2xs"
            />
          </div>

          {/* Status Filter Tabs */}
          {viewMode === 'daily' && (
            <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
              {['All', 'Present', 'Absent', 'Leave'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendanceFilters;
