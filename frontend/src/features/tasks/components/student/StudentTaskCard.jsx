import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, User, BookOpen, ArrowRight, AlertTriangle, CheckCircle2, UploadCloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function StudentTaskCard({ task }) {
  if (!task) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold text-[11px]">Completed</Badge>;
      case 'Submitted':
        return <Badge className="bg-purple-50 text-[#9D6BE2] font-bold text-[11px] border border-purple-200">Submitted</Badge>;
      case 'In Progress':
        return <Badge className="bg-sky-50 text-[#0284C7] font-bold text-[11px] border border-sky-200">In Progress</Badge>;
      case 'Pending':
        return <Badge className="bg-slate-100 text-slate-600 font-semibold text-[11px]">Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-rose-50 text-[#CF3E44] font-bold text-[11px] border border-rose-200">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return <span className="px-2 py-0.5 rounded-md bg-rose-50 text-[#CF3E44] text-[10px] font-extrabold uppercase border border-rose-200/80">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[#C88B0D] text-[10px] font-extrabold uppercase border border-amber-200/80">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded-md bg-sky-50 text-[#0284C7] text-[10px] font-extrabold uppercase border border-sky-200/80">Low</span>;
      default:
        return <span className="text-xs text-slate-500">{priority}</span>;
    }
  };

  const getAssignmentBadge = (type, team) => {
    switch (type) {
      case 'Individual':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
            <User className="w-3 h-3 text-slate-400" />
            <span>Individual</span>
          </span>
        );
      case 'Team':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-purple-50 text-[#9D6BE2] text-[11px] font-semibold border border-purple-100">
            <Users className="w-3 h-3 text-[#9D6BE2]" />
            <span>{team || 'Team Alpha'}</span>
          </span>
        );
      case 'Cohort':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#0284C7] text-[11px] font-semibold border border-sky-100">
            <BookOpen className="w-3 h-3 text-[#0284C7]" />
            <span>Cohort Task</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Due Date Urgency calculation
  const getDueUrgencyText = () => {
    if (task.status === 'Completed' || task.status === 'Submitted') {
      return { text: `Due: ${task.dueDate}`, isOverdue: false };
    }

    const today = new Date();
    const due = new Date(task.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, isOverdue: true };
    }
    if (diffDays === 0) {
      return { text: 'Due Today', isOverdue: true };
    }
    if (diffDays === 1) {
      return { text: 'Due Tomorrow', isOverdue: false };
    }
    return { text: `Due in ${diffDays} days`, isOverdue: false };
  };

  const urgency = getDueUrgencyText();

  return (
    <Card className="rounded-2xl border-slate-200/80 shadow-2xs hover:shadow-md transition-all font-sans text-left flex flex-col justify-between overflow-hidden group">
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Top Category Tag + Priority + Status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {getPriorityBadge(task.priority)}
              {getAssignmentBadge(task.assignmentType, task.team)}
            </div>
            {getStatusBadge(task.status)}
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <Link
              to={`/student/tasks/${task.id}`}
              className="text-base font-bold text-slate-900 group-hover:text-[#006B3C] transition-colors line-clamp-1 block"
            >
              {task.title}
            </Link>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          </div>
        </div>

        {/* Footer & Progress Bar */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>Progress</span>
              <span className="font-extrabold text-slate-800">{task.progress || 0}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#006B3C] h-full transition-all duration-300 rounded-full"
                style={{ width: `${task.progress || 0}%` }}
              />
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold">
              <Clock className={`w-3.5 h-3.5 ${urgency.isOverdue ? 'text-[#CF3E44]' : 'text-slate-400'}`} />
              <span className={urgency.isOverdue ? 'text-[#CF3E44] font-extrabold' : 'text-slate-600'}>
                {urgency.text}
              </span>
            </div>

            <Link to={`/student/tasks/${task.id}`}>
              <Button
                type="button"
                variant="outline"
                className="text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50 py-1.5 h-8 rounded-xl cursor-pointer"
              >
                View Task
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentTaskCard;
