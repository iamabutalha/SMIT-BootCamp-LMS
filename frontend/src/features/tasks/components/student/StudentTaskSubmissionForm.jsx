import { useState } from 'react';
import { FolderGit2, Globe, Send, CheckCircle2, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export function StudentTaskSubmissionForm({ task, onSubmit }) {
  const isSubmitted = task?.status === 'Submitted' || task?.status === 'Completed';
  const existingSubmission = task?.submission;

  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || '');
  const [deploymentUrl, setDeploymentUrl] = useState(existingSubmission?.deploymentUrl || '');
  const [comments, setComments] = useState(existingSubmission?.comments || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!githubUrl.trim()) {
      toast.error('Please provide a valid GitHub repository URL.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ githubUrl, deploymentUrl, comments });
      toast.success(isSubmitted ? 'Task submission updated successfully!' : 'Task submitted successfully!');
    } catch (err) {
      console.error('Submission failed:', err);
      toast.error('Failed to submit task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {isSubmitted ? 'Your Deliverable Submission' : 'Submit Task Deliverables'}
          </h3>
          <p className="text-xs text-slate-500">
            {isSubmitted
              ? 'Your submission is recorded and under review by instructors.'
              : 'Submit repository links and notes for evaluation.'}
          </p>
        </div>
        {isSubmitted && (
          <span className="text-xs font-bold text-[#21C75D] bg-[#E8F7DF] px-3 py-1 rounded-xl flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submitted for Review</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* GitHub Repo Input */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
            GitHub Repository URL <span className="text-rose-500">*</span>
          </label>
          <Input
            placeholder="https://github.com/username/project-repo"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            leftIcon={<FolderGit2 className="w-4 h-4 text-slate-400" />}
            className="text-xs h-10"
            required
          />
        </div>

        {/* Live Deployment URL Input */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
            Live Deployment URL <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <Input
            placeholder="https://your-app.vercel.app"
            value={deploymentUrl}
            onChange={(e) => setDeploymentUrl(e.target.value)}
            leftIcon={<Globe className="w-4 h-4 text-slate-400" />}
            className="text-xs h-10"
          />
        </div>

        {/* Comments Textarea */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
            Submission Notes & Comments <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Add any notes for your mentor regarding your implementation..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006B3C]/20 focus:border-[#006B3C] resize-none"
          />
        </div>

        {/* Submission Timestamp Summary */}
        {existingSubmission?.submittedAt && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium">
            Submitted at: <span className="font-bold text-slate-800">{existingSubmission.submittedAt}</span>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            icon={<Send className="w-4 h-4" />}
            className="bg-[#006B3C] hover:bg-[#00522e] text-white font-bold py-2.5 px-6 text-xs rounded-xl shadow-xs cursor-pointer"
          >
            {isSubmitted ? 'Update Submission' : 'Submit Deliverables'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StudentTaskSubmissionForm;
