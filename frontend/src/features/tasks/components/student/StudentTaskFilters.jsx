import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function StudentTaskFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  assignmentType,
  onAssignmentTypeChange,
  sortBy,
  onSortByChange,
}) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 font-sans text-left">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-4">
          <Input
            placeholder="Search tasks by title, category, or team..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            className="text-xs h-10"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-2">
          <Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'All' },
              { label: 'In Progress', value: 'In Progress' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Submitted', value: 'Submitted' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Overdue', value: 'Overdue' },
            ]}
            className="text-xs h-10 font-medium"
          />
        </div>

        {/* Priority Filter */}
        <div className="sm:col-span-2">
          <Select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            options={[
              { label: 'All Priorities', value: 'All' },
              { label: 'High Priority', value: 'High' },
              { label: 'Medium Priority', value: 'Medium' },
              { label: 'Low Priority', value: 'Low' },
            ]}
            className="text-xs h-10 font-medium"
          />
        </div>

        {/* Assignment Type Filter */}
        <div className="sm:col-span-2">
          <Select
            value={assignmentType}
            onChange={(e) => onAssignmentTypeChange(e.target.value)}
            options={[
              { label: 'All Types', value: 'All' },
              { label: 'Individual', value: 'Individual' },
              { label: 'Team Tasks', value: 'Team' },
              { label: 'Cohort Tasks', value: 'Cohort' },
            ]}
            className="text-xs h-10 font-medium"
          />
        </div>

        {/* Sort Selector */}
        <div className="sm:col-span-2">
          <Select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            options={[
              { label: 'Sort: Due Soon', value: 'Due Soon' },
              { label: 'Sort: Newest', value: 'Newest' },
              { label: 'Sort: Oldest', value: 'Oldest' },
              { label: 'Sort: Priority', value: 'Priority' },
            ]}
            className="text-xs h-10 font-semibold"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentTaskFilters;
