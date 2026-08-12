import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ExternalLink, Filter } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function StudentPerformanceTable({ students }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    return students.filter((student) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.rollNumber.toLowerCase().includes(q) ||
        student.team.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'ALL' || student.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [students, searchQuery, statusFilter]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Student Performance Overview</h3>
          <p className="text-xs text-slate-500 font-medium">Detailed student roster metrics across all active modules.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or roll #..."
              className="w-full h-9 pl-8 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            {['ALL', 'EXCELLENT', 'GOOD', 'AT RISK'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer capitalize ${
                  statusFilter === st
                    ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'AT RISK' ? 'At Risk' : st === 'EXCELLENT' ? 'Top Tier' : st === 'GOOD' ? 'Good' : 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Roll Number</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-4">Attendance</th>
              <th className="py-3 px-4">Tasks</th>
              <th className="py-3 px-4">Assignments</th>
              <th className="py-3 px-4">Quiz Score</th>
              <th className="py-3 px-4">Overall Score</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-slate-400">
                  No student records match the selected filter.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#006B3C]">{student.rollNumber}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={student.name} className="w-7 h-7 shrink-0" />
                      <span className="font-bold text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-semibold">{student.team}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{student.attendance}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{student.tasks}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{student.assignments}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#DAA622]">{student.quizScore}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-9">{student.overallScore}%</span>
                      <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            student.overallScore >= 85
                              ? 'bg-[#006B3C]'
                              : student.overallScore >= 70
                              ? 'bg-[#2D67E4]'
                              : 'bg-[#DE646D]'
                          }`}
                          style={{ width: `${student.overallScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/students/${student.studentId || student.id}`)}
                      rightIcon={<ExternalLink className="w-3 h-3" />}
                      className="text-xs font-bold rounded-xl border-slate-200 hover:bg-slate-50 cursor-pointer"
                    >
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentPerformanceTable;
