import { useState, useMemo } from 'react';
import { BookOpen, Calendar, CheckCircle2, Clock, Search } from 'lucide-react';

export function StudentAssignmentsSection({ assignments = [] }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssignments = useMemo(() => {
    return assignments.filter((as) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || as.title.toLowerCase().includes(q) || (as.description && as.description.toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'All' || as.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchQuery, statusFilter]);

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

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Assigned Coursework ({assignments.length})</h3>
            <p className="text-xs text-slate-500">Student homework, quizzes, and project evaluations</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignment..."
              className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            {['All', 'Completed', 'Pending', 'In Progress', 'Overdue'].map((st) => (
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

      {filteredAssignments.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">
          No assignments found matching the current filter.
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Assignment Title</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Score / Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredAssignments.map((as) => (
                <tr key={as.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{as.title}</p>
                      {as.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-1">{as.description}</p>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{as.dueDate}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadge(
                        as.status
                      )}`}
                    >
                      <span>{as.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {as.score !== null && as.score !== undefined ? (
                      <span className="font-extrabold text-[#006B3C] text-sm">{as.score}%</span>
                    ) : (
                      <span className="text-slate-400 font-normal italic">Ungraded</span>
                    )}
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

export default StudentAssignmentsSection;
