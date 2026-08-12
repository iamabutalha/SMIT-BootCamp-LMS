import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Search, HelpCircle, CheckCircle2, FileEdit, Users, Award, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import PageLoader from '@/components/common/PageLoader';
import EmptyState from '@/components/common/EmptyState';
import QuizTable from '../components/QuizTable';
import {
  useGetQuizzesQuery,
  useTogglePublishQuizMutation,
  useDuplicateQuizMutation,
  useDeleteQuizMutation,
} from '../api/quizzesApi';
import { ROUTES } from '@/constants/routes';

export function QuizzesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Loading state trackers per action
  const [publishingId, setPublishingId] = useState(null);
  const [duplicatingId, setDuplicatingId] = useState(null);

  // Delete modal state
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    quiz: null,
    isDeleting: false,
  });

  const { data, isLoading, refetch } = useGetQuizzesQuery({
    search: searchTerm,
    status: statusFilter,
    course: courseFilter,
    teacher: teacherFilter,
    difficulty: difficultyFilter,
    sortBy,
  });

  const [togglePublish] = useTogglePublishQuizMutation();
  const [duplicateQuiz] = useDuplicateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const quizzes = data?.items || [];
  const summary = data?.summary || {
    totalQuizzes: 0,
    publishedCount: 0,
    draftCount: 0,
    totalAttempts: 0,
    averageScore: 0,
  };

  // Handler: Toggle Publish / Unpublish
  const handleTogglePublish = async (quiz) => {
    if (!quiz?.id || publishingId) return;
    setPublishingId(quiz.id);

    const isCurrentlyPublished = quiz.status === 'Published';
    try {
      await togglePublish(quiz.id).unwrap();
      if (isCurrentlyPublished) {
        toast.success(`"${quiz.title}" unpublished to Draft.`);
      } else {
        toast.success(`"${quiz.title}" published successfully.`);
      }
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || 'Failed to update quiz status');
    } finally {
      setPublishingId(null);
    }
  };

  // Handler: Duplicate Quiz
  const handleDuplicate = async (quiz) => {
    if (!quiz?.id || duplicatingId) return;
    setDuplicatingId(quiz.id);

    try {
      await duplicateQuiz(quiz.id).unwrap();
      toast.success(`"${quiz.title}" duplicated successfully as Draft.`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || 'Failed to duplicate quiz');
    } finally {
      setDuplicatingId(null);
    }
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (quiz) => {
    setDeleteModalState({
      isOpen: true,
      quiz,
      isDeleting: false,
    });
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setDeleteModalState({
      isOpen: false,
      quiz: null,
      isDeleting: false,
    });
  };

  // Confirm Delete Operation
  const handleConfirmDelete = async () => {
    const quizId = deleteModalState.quiz?.id;
    if (!quizId) return;

    setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));

    try {
      await deleteQuiz(quizId).unwrap();
      toast.success(`"${deleteModalState.quiz.title}" deleted successfully.`);
      handleCloseDeleteModal();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || 'Failed to delete quiz');
      setDeleteModalState((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  if (isLoading) {
    return <PageLoader message="Loading quiz assessment workspace..." />;
  }

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quizzes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage assessments, question banks, student attempts, and class performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            icon={<RefreshCw className="w-4 h-4" />}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Refresh
          </Button>

          <Link to={ROUTES.ADMIN.QUIZZES_CREATE}>
            <Button
              type="button"
              icon={<Plus className="w-4 h-4" />}
              className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              + Create Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0072BC] flex items-center justify-center shrink-0 border border-sky-100">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.totalQuizzes}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Quizzes</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#21C75D] flex items-center justify-center shrink-0 border border-[#21C75D]/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.publishedCount}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Published</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/80">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.draftCount}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Drafts</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.totalAttempts}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Attempts</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{summary.averageScore}%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg Score</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-4">
            <Input
              placeholder="Search quizzes by title, course, or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              className="text-xs h-10"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'All Statuses', value: 'All' },
                { label: 'Published', value: 'Published' },
                { label: 'Draft', value: 'Draft' },
                { label: 'Archived', value: 'Archived' },
              ]}
              className="text-xs h-10 font-medium"
            />
          </div>

          {/* Course Filter */}
          <div className="sm:col-span-2">
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              options={[
                { label: 'All Courses', value: 'All' },
                { label: 'Web & Mobile Dev', value: 'Web & Mobile Dev' },
                { label: 'Python Data Science', value: 'Python Data Science' },
                { label: 'UI/UX Design', value: 'UI/UX Design' },
              ]}
              className="text-xs h-10 font-medium"
            />
          </div>

          {/* Teacher Filter */}
          <div className="sm:col-span-2">
            <Select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              options={[
                { label: 'All Teachers', value: 'All' },
                { label: 'Ali Khan', value: 'Ali Khan' },
                { label: 'Sara Ahmed', value: 'Sara Ahmed' },
                { label: 'Usman Ghani', value: 'Usman Ghani' },
                { label: 'Fatima Noor', value: 'Fatima Noor' },
              ]}
              className="text-xs h-10 font-medium"
            />
          </div>

          {/* Sort By */}
          <div className="sm:col-span-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: 'Sort: Newest', value: 'Newest' },
                { label: 'Sort: Oldest', value: 'Oldest' },
                { label: 'Highest Attempts', value: 'Highest Attempts' },
                { label: 'Highest Score', value: 'Highest Score' },
              ]}
              className="text-xs h-10 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Quizzes Table */}
      {quizzes.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No quizzes match your filter criteria"
          description="Try adjusting your search query or status filter, or create a new quiz."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('All');
            setCourseFilter('All');
            setTeacherFilter('All');
            setDifficultyFilter('All');
          }}
        />
      ) : (
        <QuizTable
          quizzes={quizzes}
          onTogglePublish={handleTogglePublish}
          onDuplicate={handleDuplicate}
          onOpenDeleteModal={handleOpenDeleteModal}
          publishingId={publishingId}
          duplicatingId={duplicatingId}
        />
      )}

      {/* Delete Quiz Confirmation Modal */}
      <Modal
        isOpen={deleteModalState.isOpen}
        onClose={handleCloseDeleteModal}
        maxWidth="max-w-md"
      >
        <div className="text-center space-y-4 font-sans py-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#CF3E44] flex items-center justify-center mx-auto border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900">Delete Quiz?</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Are you sure you want to delete{' '}
              <strong className="text-slate-900">&quot;{deleteModalState.quiz?.title}&quot;</strong>? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              fullWidth
              disabled={deleteModalState.isDeleting}
              onClick={handleCloseDeleteModal}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="button"
              fullWidth
              isLoading={deleteModalState.isDeleting}
              onClick={handleConfirmDelete}
              icon={<Trash2 className="w-4 h-4" />}
              className="bg-[#CF3E44] hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Delete Quiz
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuizzesPage;
