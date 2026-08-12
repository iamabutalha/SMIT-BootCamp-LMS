import { CalendarCheck, CheckCircle2, XCircle, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function StudentAttendanceSummary({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      id: 'stat-overall',
      title: 'Overall Attendance',
      value: `${summary.attendanceRate}%`,
      subtitle: `Present: ${summary.present} / Total: ${summary.totalClasses}`,
      icon: CalendarCheck,
      bgColor: 'bg-emerald-50 text-[#57BA7F]',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'stat-present',
      title: 'Present',
      value: `${summary.present}`,
      subtitle: 'Status: Good',
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50 text-[#57BA7F]',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'stat-absent',
      title: 'Absent',
      value: `${summary.absent}`,
      subtitle: 'Unexcused absences',
      icon: XCircle,
      bgColor: 'bg-rose-50 text-[#DE646D]',
      borderColor: 'border-rose-100',
    },
    {
      id: 'stat-leave',
      title: 'Leave',
      value: `${summary.leave}`,
      subtitle: 'Approved medical/event leave',
      icon: Clock,
      bgColor: 'bg-amber-50 text-[#DAA622]',
      borderColor: 'border-amber-100',
    },
    {
      id: 'stat-total',
      title: 'Total Classes',
      value: `${summary.totalClasses}`,
      subtitle: 'Curriculum sessions',
      icon: BookOpen,
      bgColor: 'bg-sky-50 text-[#0284C7]',
      borderColor: 'border-sky-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-sans text-left">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.id} className="rounded-2xl border-slate-200/80 shadow-2xs">
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

export default StudentAttendanceSummary;
