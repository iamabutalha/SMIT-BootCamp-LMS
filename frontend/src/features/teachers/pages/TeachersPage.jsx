import { useState } from 'react';
import { Search, UserCheck, Users, BookOpen, Award, LayoutGrid, List, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import PageLoader from '@/components/common/PageLoader';
import EmptyState from '@/components/common/EmptyState';
import TeacherCard from '../components/TeacherCard';
import TeacherTable from '../components/TeacherTable';
import { useGetTeachersQuery } from '../api/teachersApi';

export function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [specializationFilter, setSpecializationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const { data, isLoading, refetch } = useGetTeachersQuery({
    search: searchTerm,
    status: statusFilter,
    specialization: specializationFilter,
    sortBy,
  });

  const teachers = data?.items || [];
  const summary = data?.summary || {
    totalTeachers: 0,
    activeTeachers: 0,
    totalCourses: 0,
    totalStudents: 0,
    avgPerformance: 0,
  };

  if (isLoading) {
    return <PageLoader message="Loading teacher & mentor directory..." />;
  }

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Teachers & Mentors</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage course instructors, track student mentorship performance, and review assigned modules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            icon={<RefreshCw className="w-4 h-4" />}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Refresh
          </Button>

          {/* Grid / Table View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0072BC] flex items-center justify-center shrink-0 border border-sky-100">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.totalTeachers}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Teachers</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#21C75D] flex items-center justify-center shrink-0 border border-[#21C75D]/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.activeTeachers}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Teachers</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.totalCourses}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Courses</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/80">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.totalStudents}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Students Managed</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.avgPerformance}%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg Perf.</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-5">
            <Input
              placeholder="Search teacher by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              className="text-xs h-10"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'All Statuses', value: 'All' },
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
              ]}
              className="text-xs h-10 font-medium"
            />
          </div>

          {/* Specialization Filter */}
          <div className="sm:col-span-3">
            <Select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              options={[
                { label: 'All Specializations', value: 'All' },
                { label: 'Full-Stack Development', value: 'Full-Stack' },
                { label: 'Frontend Architecture', value: 'Frontend' },
                { label: 'Database Systems', value: 'Database' },
                { label: 'UI/UX Design', value: 'UI/UX' },
              ]}
              className="text-xs h-10 font-medium"
            />
          </div>

          {/* Sort By */}
          <div className="sm:col-span-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: 'Sort: Name', value: 'Name' },
                { label: 'Sort: Students', value: 'Students' },
                { label: 'Sort: Courses', value: 'Courses' },
                { label: 'Recently Joined', value: 'Recently Joined' },
              ]}
              className="text-xs h-10 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Teachers Display Container */}
      {teachers.length === 0 ? (
        <EmptyState
          icon={UserCheck}
          title="No teachers found"
          description="Try adjusting your search filters to find active instructors or mentors."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('All');
            setSpecializationFilter('All');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      ) : (
        <TeacherTable teachers={teachers} />
      )}
    </div>
  );
}

export default TeachersPage;
