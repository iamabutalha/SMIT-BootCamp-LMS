import { AlertTriangle, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function UpcomingDeadlines({ deadlines = [] }) {
  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-rose-50 text-[#DE646D] font-bold text-[10px] border border-rose-200">High Urgency</Badge>;
      case 'medium':
        return <Badge className="bg-amber-50 text-[#DAA622] font-bold text-[10px] border border-amber-200">Upcoming</Badge>;
      default:
        return <Badge className="bg-sky-50 text-[#0284C7] font-bold text-[10px]">Normal</Badge>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Upcoming Deadlines</h3>
          <p className="text-xs text-slate-500">Impending submissions and assessment schedules.</p>
        </div>
        <Clock className="w-4 h-4 text-amber-500" />
      </div>

      {deadlines.length === 0 ? (
        <div className="p-6 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
          No upcoming deadlines scheduled.
        </div>
      ) : (
        <div className="space-y-3">
          {deadlines.map((dl) => (
            <div
              key={dl.id}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5 min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{dl.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span>{dl.course}</span>
                  <span>•</span>
                  <span className="font-semibold text-amber-600">{dl.dueDate}</span>
                </div>
              </div>

              <div className="shrink-0">{getUrgencyBadge(dl.urgency)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingDeadlines;
