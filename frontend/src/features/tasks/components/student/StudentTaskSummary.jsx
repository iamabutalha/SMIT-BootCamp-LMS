import { ClipboardList, CheckCircle2, Clock, AlertTriangle, UploadCloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function StudentTaskSummary({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      id: 'stat-total',
      title: 'Total Tasks',
      value: summary.total,
      subtitle: 'Assigned to you / team',
      icon: ClipboardList,
      bgColor: 'bg-sky-50 text-[#0284C7]',
      borderColor: 'border-sky-100',
    },
    {
      id: 'stat-completed',
      title: 'Completed',
      value: summary.completed,
      subtitle: 'Finished & verified',
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50 text-[#21C75D]',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'stat-in-progress',
      title: 'In Progress',
      value: summary.inProgress,
      subtitle: 'Active deliverables',
      icon: Clock,
      bgColor: 'bg-sky-50 text-[#0284C7]',
      borderColor: 'border-sky-100',
    },
    {
      id: 'stat-pending',
      title: 'Pending',
      value: summary.pending,
      subtitle: 'Not yet started',
      icon: UploadCloud,
      bgColor: 'bg-slate-100 text-slate-600',
      borderColor: 'border-slate-200',
    },
    {
      id: 'stat-overdue',
      title: 'Overdue',
      value: summary.overdue,
      subtitle: 'Passed target deadline',
      icon: AlertTriangle,
      bgColor: 'bg-rose-50 text-[#CF3E44]',
      borderColor: 'border-rose-100',
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

export default StudentTaskSummary;
