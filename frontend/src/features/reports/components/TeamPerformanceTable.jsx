import { Users, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export function TeamPerformanceTable({ teams }) {
  if (!teams) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Team Performance Ranking</h3>
          <p className="text-xs text-slate-500 font-medium">Comparative evaluation across attendance, tasks, assignments, and quizzes.</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Rank & Team</th>
              <th className="py-3 px-4">Members</th>
              <th className="py-3 px-4">Attendance</th>
              <th className="py-3 px-4">Tasks</th>
              <th className="py-3 px-4">Assignments</th>
              <th className="py-3 px-4">Quizzes</th>
              <th className="py-3 px-4">Overall Score</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {teams.map((team, index) => {
              const rank = index + 1;
              return (
                <tr key={team.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-extrabold shrink-0">
                        #{rank}
                      </span>
                      <span className="font-extrabold text-[#006B3C] text-sm">{team.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-semibold">{team.members}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-bold">{team.attendance}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-bold">{team.taskCompletion}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-bold">{team.assignmentCompletion}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-bold">{team.quizScore}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-9">{team.overallScore}%</span>
                      <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            team.overallScore >= 85
                              ? 'bg-[#006B3C]'
                              : team.overallScore >= 75
                              ? 'bg-[#2D67E4]'
                              : 'bg-[#DE646D]'
                          }`}
                          style={{ width: `${team.overallScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        team.status === 'EXCELLENT'
                          ? 'bg-[#E8F7DF] text-[#006B3C]'
                          : team.status === 'GOOD'
                          ? 'bg-[#F1F5FF] text-[#2D67E4]'
                          : 'bg-[#F8E5E2] text-[#DE646D]'
                      }`}
                    >
                      {team.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamPerformanceTable;
