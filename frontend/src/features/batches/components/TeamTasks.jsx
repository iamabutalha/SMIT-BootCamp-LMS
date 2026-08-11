import { useState, useMemo } from 'react';
import { ClipboardList, Plus, Search, Calendar, UserCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { toast } from 'sonner';

export function TeamTasks({ tasks = [], onAddTaskClick }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        (task.assignedTo && task.assignedTo.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === 'All' ||
        task.status === statusFilter ||
        (statusFilter === 'Pending' && (task.status === 'Pending' || task.status === 'In Progress'));

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#E8F7DF] text-[#006B3C] border-[#006B3C]/20';
      case 'In Progress':
        return 'bg-[#F1F5FF] text-[#2D67E4] border-[#2D67E4]/20';
      case 'Overdue':
        return 'bg-[#F8E5E2] text-[#DE646D] border-[#DE646D]/20';
      case 'Pending':
      default:
        return 'bg-[#FEF8C2] text-[#DAA622] border-[#DAA622]/20';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Team Tasks & Assignments ({tasks.length})</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Project deliverables, due dates, & student assignments</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search task title..."
              className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            {['All', 'Pending', 'In Progress', 'Completed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List / Table */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={
            searchQuery || statusFilter !== 'All'
              ? 'No tasks match your filter criteria.'
              : 'No tasks have been assigned to this team yet.'
          }
          icon={ClipboardList}
        />
      ) : (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Task Deliverable</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{task.title}</p>
                      {task.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {task.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={task.assignedTo} className="w-6 h-6 shrink-0 text-[10px]" />
                        <span className="font-semibold text-slate-800">{task.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase ${getPriorityBadge(
                        task.priority
                      )}`}
                    >
                      {task.priority || 'Medium'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.dueDate || '—'}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadge(
                        task.status
                      )}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          task.status === 'Completed'
                            ? 'bg-[#006B3C]'
                            : task.status === 'In Progress'
                            ? 'bg-[#2D67E4]'
                            : 'bg-[#DAA622]'
                        }`}
                      />
                      <span>{task.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamTasks;
