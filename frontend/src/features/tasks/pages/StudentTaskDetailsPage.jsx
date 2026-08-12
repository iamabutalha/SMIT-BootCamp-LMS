import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Users, BookOpen, CheckCircle2, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import StudentTaskSubmissionForm from '../components/student/StudentTaskSubmissionForm';
import StudentTaskSkeleton from '../components/student/StudentTaskSkeleton';
import StudentTaskErrorState from '../components/student/StudentTaskErrorState';
import { studentTaskService } from '../services/studentTaskService';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function StudentTaskDetailsContent() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchTaskDetails = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await studentTaskService.getTaskById(taskId);
      if (!data) {
        setIsError(true);
      } else {
        setTask(data);
      }
    } catch (err) {
      console.error('Failed to load task details:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  const handleSubmission = async (submissionPayload) => {
    const updated = await studentTaskService.submitTaskAttempt(taskId, submissionPayload, {
      name: user?.name,
    });
    setTask(updated);
  };

  if (isLoading) {
    return <StudentTaskSkeleton />;
  }

  if (isError || !task) {
    return <StudentTaskErrorState onRetry={fetchTaskDetails} />;
  }

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return <Badge className="bg-rose-50 text-[#CF3E44] font-bold text-xs border border-rose-200">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-amber-50 text-[#C88B0D] font-bold text-xs border border-amber-200">Medium Priority</Badge>;
      default:
        return <Badge className="bg-sky-50 text-[#0284C7] font-bold text-xs border border-sky-200">Low Priority</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold text-xs">Completed</Badge>;
      case 'Submitted':
        return <Badge className="bg-purple-50 text-[#9D6BE2] font-bold text-xs border border-purple-200">Submitted</Badge>;
      case 'In Progress':
        return <Badge className="bg-sky-50 text-[#0284C7] font-bold text-xs border border-sky-200">In Progress</Badge>;
      case 'Overdue':
        return <Badge className="bg-rose-50 text-[#CF3E44] font-bold text-xs border border-rose-200">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans text-left pb-8">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to={ROUTES.STUDENT.TASKS}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tasks</span>
        </Link>
        <div className="flex items-center gap-2">
          {getPriorityBadge(task.priority)}
          {getStatusBadge(task.status)}
        </div>
      </div>

      {/* Task Overview Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{task.category}</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{task.title}</h1>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{task.description}</p>
        </div>

        {/* Task Metadata Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Assigned By</span>
            <div className="flex items-center gap-1 font-bold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
              <span className="truncate">{task.assignedBy}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Assignment Scope</span>
            <div className="flex items-center gap-1 font-bold text-slate-800">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span className="truncate">{task.assignmentType === 'Team' ? task.team : task.assignmentType}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Assigned Date</span>
            <span className="font-bold text-slate-800">{task.assignedDate}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Target Due Date</span>
            <span className="font-bold text-slate-900">{task.dueDate}</span>
          </div>
        </div>
      </div>

      {/* Task Instructions Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#006B3C]" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Task Instructions & Requirements</h3>
        </div>

        <div className="space-y-2 text-xs">
          {task.instructions && task.instructions.length > 0 ? (
            <ul className="space-y-2">
              {task.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-[#E8F7DF] text-[#006B3C] font-extrabold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 font-medium leading-relaxed pt-0.5">{inst}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No specific instructions provided.</p>
          )}
        </div>
      </div>

      {/* Task Submission Form Section */}
      <StudentTaskSubmissionForm task={task} onSubmit={handleSubmission} />
    </div>
  );
}

export function StudentTaskDetailsPage() {
  return (
    <ErrorBoundary title="Task Details Error">
      <StudentTaskDetailsContent />
    </ErrorBoundary>
  );
}

export default StudentTaskDetailsPage;
