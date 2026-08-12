import { CheckCircle2, Clock, HelpCircle, Users, Award } from 'lucide-react';

export function RecentActivity({ activities = [] }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#21C75D]" />;
      case 'quiz':
        return <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />;
      case 'attendance':
        return <Award className="w-3.5 h-3.5 text-[#57BA7F]" />;
      case 'team':
        return <Users className="w-3.5 h-3.5 text-[#9D6BE2]" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Activity</h3>
        <p className="text-xs text-slate-500">Timeline of your recent LMS actions and milestones.</p>
      </div>

      {activities.length === 0 ? (
        <div className="p-6 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
          No recent activity logged.
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3 relative z-10 text-xs">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-slate-100 ${act.iconColor}`}>
                {getActivityIcon(act.type)}
              </div>
              <div className="min-w-0 pt-0.5 space-y-0.5">
                <p className="font-semibold text-slate-800 leading-snug">{act.title}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span>{act.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
