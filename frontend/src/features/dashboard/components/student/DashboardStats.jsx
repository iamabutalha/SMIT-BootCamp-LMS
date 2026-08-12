import { TrendingUp, CalendarCheck, ClipboardList, BookOpenCheck, HelpCircle, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function DashboardStats({ summary }) {
  if (!summary) return null;

  const statItems = [
    {
      id: 'stat-progress',
      title: 'Overall Progress',
      value: `${summary.overallProgress}%`,
      subtitle: 'On track for graduation',
      icon: TrendingUp,
      bgColor: 'bg-emerald-50 text-[#21C75D]',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'stat-attendance',
      title: 'Attendance Rate',
      value: `${summary.attendanceRate}%`,
      subtitle: '22 of 24 sessions present',
      icon: CalendarCheck,
      bgColor: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'stat-tasks',
      title: 'Tasks Completed',
      value: `${summary.tasksCompleted?.completed || 0} / ${summary.tasksCompleted?.total || 0}`,
      subtitle: '75% completion rate',
      icon: ClipboardList,
      bgColor: 'bg-sky-50 text-[#0072BC]',
      borderColor: 'border-sky-100',
    },
    {
      id: 'stat-assignments',
      title: 'Assignments',
      value: `${summary.assignments?.completed || 0} / ${summary.assignments?.total || 0}`,
      subtitle: '12 approved & graded',
      icon: BookOpenCheck,
      bgColor: 'bg-indigo-50 text-indigo-600',
      borderColor: 'border-indigo-100',
    },
    {
      id: 'stat-quizzes',
      title: 'Quiz Average',
      value: `${summary.quizAverage}%`,
      subtitle: 'Based on 8 assessments',
      icon: HelpCircle,
      bgColor: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-100',
    },
    {
      id: 'stat-streak',
      title: 'Learning Streak',
      value: `${summary.currentStreakDays} Days`,
      subtitle: 'Active daily participant',
      icon: Flame,
      bgColor: 'bg-amber-50 text-amber-600',
      borderColor: 'border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-sans text-left">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.id} className="rounded-2xl border-slate-200/80 shadow-2xs hover:shadow-md transition-all">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{item.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${item.bgColor} ${item.borderColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{item.value}</div>
                <p className="text-[11px] text-slate-500 font-medium truncate">{item.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardStats;
