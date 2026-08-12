import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/constants/routes';

export function AssignmentOverview({ assignments = [] }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold text-[11px]">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-sky-50 text-[#0284C7] font-bold text-[11px] border border-sky-200">Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-rose-50 text-[#DE646D] font-bold text-[11px] border border-rose-200">Overdue</Badge>;
      case 'Submitted':
        return <Badge className="bg-purple-50 text-[#9D6BE2] font-bold text-[11px]">Submitted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Assignment Overview</h3>
          <p className="text-xs text-slate-500">Recent module deliverables and submission statuses.</p>
        </div>
        <Link
          to={ROUTES.STUDENT.ASSIGNMENTS}
          className="text-xs font-bold text-[#006B3C] hover:text-[#00522e] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View all assignments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {assignments.length === 0 ? (
        <div className="p-6 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
          No active assignments found.
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((asg) => (
            <div
              key={asg.id}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{asg.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-medium">
                    <span>{asg.course}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {asg.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                {asg.score !== '—' && (
                  <span className="text-xs font-extrabold text-[#006B3C] bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                    {asg.score}
                  </span>
                )}
                {getStatusBadge(asg.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignmentOverview;
