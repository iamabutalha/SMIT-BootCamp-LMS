import { CheckSquare, Users, Award } from 'lucide-react';

export function TaskAnalyticsCard({ tasks }) {
  if (!tasks) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 font-sans text-left flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#D5F7E5] text-[#21C65C] flex items-center justify-center shrink-0">
          <CheckSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Task Completion</h3>
          <p className="text-xs text-slate-500 font-medium">Sprint deliverable progress and top team task completion velocity.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Tasks</span>
          <span className="text-xl font-extrabold text-slate-900">{tasks.total}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#E8F7DF] border border-[#006B3C]/20 space-y-0.5">
          <span className="text-[10px] text-[#006B3C] font-bold uppercase block">Completed</span>
          <span className="text-xl font-extrabold text-[#006B3C]">{tasks.completed}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F1F5FF] border border-[#2D67E4]/20 space-y-0.5">
          <span className="text-[10px] text-[#2D67E4] font-bold uppercase block">In Progress</span>
          <span className="text-xl font-extrabold text-[#2D67E4]">{tasks.inProgress}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FEF8C2] border border-[#DAA622]/20 space-y-0.5">
          <span className="text-[10px] text-[#C88B0D] font-bold uppercase block">Pending</span>
          <span className="text-xl font-extrabold text-[#C88B0D]">{tasks.pending}</span>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700">Sprint Delivery Velocity</span>
          <span className="text-[#21C65C] font-extrabold">{tasks.completionRate}</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-[#21C65C]" style={{ width: '84.4%' }} title="Completed" />
          <div className="h-full bg-[#2D67E4]" style={{ width: '11.1%' }} title="In Progress" />
          <div className="h-full bg-[#DAA622]" style={{ width: '4.5%' }} title="Pending" />
        </div>
      </div>

      {/* Top Performing Teams Table */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Performing Teams</h4>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Team Name</th>
                <th className="py-2.5 px-3">Members</th>
                <th className="py-2.5 px-3">Completed Tasks</th>
                <th className="py-2.5 px-3 text-right">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tasks.topTeams.map((team) => (
                <tr key={team.teamId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-bold text-slate-900">{team.teamName}</td>
                  <td className="py-2 px-3 text-slate-600">{team.members}</td>
                  <td className="py-2 px-3 text-[#21C65C] font-bold">{team.completedTasks}</td>
                  <td className="py-2 px-3 text-right font-extrabold text-[#006B3C]">{team.completionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskAnalyticsCard;
