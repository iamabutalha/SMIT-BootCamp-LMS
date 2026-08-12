import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function StudentAttendanceFilters({
  year,
  onYearChange,
  month,
  onMonthChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 font-sans text-left">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-5">
          <Input
            placeholder="Search sessions, topics, or remarks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="text-xs h-10"
          />
        </div>

        {/* Year Select */}
        <div className="sm:col-span-2">
          <Select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            options={[
              { label: 'Year: 2026', value: '2026' },
              { label: 'Year: 2025', value: '2025' },
              { label: 'All Years', value: 'All' },
            ]}
            className="text-xs h-10 font-medium"
          />
        </div>

        {/* Month Select */}
        <div className="sm:col-span-3">
          <Select
            value={month}
            onChange={(e) => onMonthChange(e.target.value)}
            options={[
              { label: 'All Months', value: 'All' },
              { label: 'August', value: 'August' },
              { label: 'July', value: 'July' },
              { label: 'June', value: 'June' },
              { label: 'May', value: 'May' },
            ]}
            className="text-xs h-10 font-medium"
          />
        </div>

        {/* Status Select */}
        <div className="sm:col-span-2">
          <Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'All' },
              { label: 'Present', value: 'Present' },
              { label: 'Absent', value: 'Absent' },
              { label: 'Leave', value: 'Leave' },
            ]}
            className="text-xs h-10 font-semibold"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentAttendanceFilters;
