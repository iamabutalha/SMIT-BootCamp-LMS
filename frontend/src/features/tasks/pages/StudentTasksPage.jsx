import { useState, useEffect, useCallback } from 'react';
import { ClipboardList, FolderOpen } from 'lucide-react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import StudentTaskSummary from '../components/student/StudentTaskSummary';
import StudentTaskFilters from '../components/student/StudentTaskFilters';
import StudentTaskCard from '../components/student/StudentTaskCard';
import StudentTaskSkeleton from '../components/student/StudentTaskSkeleton';
import StudentTaskErrorState from '../components/student/StudentTaskErrorState';
import { studentTaskService } from '../services/studentTaskService';

export function StudentTasksContent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Tabs & Filters State
  const [activeTab, setActiveTab] = useState('All');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [assignmentType, setAssignmentType] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Due Soon');

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await studentTaskService.getStudentTasks({
        tab: activeTab,
        status,
        priority,
        assignmentType,
        search,
        sortBy,
      });

      setData(result);
    } catch (err) {
      console.error('Failed to load student tasks:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, status, priority, assignmentType, search, sortBy]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading && !data) {
    return <StudentTaskSkeleton />;
  }

  if (isError) {
    return <StudentTaskErrorState onRetry={fetchTasks} />;
  }

  const tabs = [
    { label: 'All Tasks', value: 'All' },
    { label: 'My Tasks', value: 'My Tasks' },
    { label: 'Team Tasks', value: 'Team Tasks' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Overdue', value: 'Overdue' },
  ];

  return (
    <div className="space-y-6 font-sans text-left pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tasks & Deliverables</h1>
          <p className="text-xs text-slate-500 mt-1">
            View your assigned tasks, track deadlines, and monitor your progress.
          </p>
        </div>
      </div>

      {/* 1. Task KPI Summary Cards */}
      <StudentTaskSummary summary={data?.summary} />

      {/* 2. Navigation Tabs */}
      <div className="flex border-b border-slate-200/80 text-xs font-bold gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`pb-3 transition-colors cursor-pointer border-b-2 shrink-0 ${
              activeTab === tab.value
                ? 'border-[#006B3C] text-[#006B3C]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Filter Toolbar */}
      <StudentTaskFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        assignmentType={assignmentType}
        onAssignmentTypeChange={setAssignmentType}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {/* 4. Task Cards Grid / Empty State */}
      {data?.items?.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-2xs text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center mx-auto">
            <FolderOpen className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-900">No tasks assigned yet</h3>
            <p className="text-xs text-slate-500">
              Tasks assigned to you or your team will appear here. Try adjusting filter criteria.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.items.map((task) => (
            <StudentTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export function StudentTasksPage() {
  return (
    <ErrorBoundary title="Student Tasks Error">
      <StudentTasksContent />
    </ErrorBoundary>
  );
}

export default StudentTasksPage;
