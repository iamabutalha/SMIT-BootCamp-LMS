import { Link, useNavigate } from 'react-router-dom';
import { Eye, Pencil, Copy, Trash2, CheckCircle2, XCircle, MoreVertical, FileText, Clock, HelpCircle, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/constants/routes';

export function QuizTable({
  quizzes = [],
  onTogglePublish,
  onDuplicate,
  onOpenDeleteModal,
  publishingId,
  duplicatingId,
}) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-[#E8F7DF] text-[#21C75D] hover:bg-[#E8F7DF] font-bold">Published</Badge>;
      case 'Draft':
        return <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-50 font-bold border border-amber-200/80">Draft</Badge>;
      case 'Archived':
        return <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 font-bold">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold">Easy</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 text-[11px] font-semibold">Medium</span>;
      case 'hard':
        return <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-semibold">Hard</span>;
      default:
        return <span className="text-xs text-slate-500">{difficulty}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider py-3.5">Quiz</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Course</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Teacher</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Questions</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Duration</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Attempts</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Avg Score</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Status</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => {
              const totalAttempts = quiz.attempts?.length || 0;
              const sumPercentage = quiz.attempts?.reduce((acc, curr) => acc + curr.percentage, 0) || 0;
              const avgScore = totalAttempts > 0 ? Math.round(sumPercentage / totalAttempts) : 0;
              const questionsCount = quiz.questions?.length || 0;
              const isPublishingThis = publishingId === quiz.id;
              const isDuplicatingThis = duplicatingId === quiz.id;

              return (
                <TableRow
                  key={quiz.id}
                  onClick={() => navigate(ROUTES.ADMIN.QUIZZES_DETAIL(quiz.id))}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  {/* Title & Description */}
                  <TableCell className="py-4">
                    <div className="flex items-start gap-3 min-w-[220px]">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0072BC] flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={ROUTES.ADMIN.QUIZZES_DETAIL(quiz.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold text-slate-900 text-sm hover:text-[#006B3C] transition-colors block truncate"
                        >
                          {quiz.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                          {getDifficultyBadge(quiz.difficulty)}
                          <span className="text-[11px] text-slate-400">Passing: {quiz.passingScore}%</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Course */}
                  <TableCell>
                    <span className="text-xs font-medium text-slate-700">{quiz.course}</span>
                  </TableCell>

                  {/* Teacher */}
                  <TableCell>
                    <span className="text-xs font-semibold text-slate-900">{quiz.teacher}</span>
                  </TableCell>

                  {/* Questions */}
                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/70 text-xs font-semibold text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{questionsCount}</span>
                    </div>
                  </TableCell>

                  {/* Duration */}
                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/70 text-xs font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.duration}m</span>
                    </div>
                  </TableCell>

                  {/* Attempts */}
                  <TableCell className="text-center">
                    <span className="text-xs font-bold text-slate-800">{totalAttempts}</span>
                  </TableCell>

                  {/* Average Score */}
                  <TableCell className="text-center">
                    <span className={`text-xs font-extrabold ${avgScore >= 70 ? 'text-[#21C75D]' : avgScore > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {totalAttempts > 0 ? `${avgScore}%` : '—'}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    {getStatusBadge(quiz.status)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {/* Eye Icon View Details */}
                      <Link
                        to={ROUTES.ADMIN.QUIZZES_DETAIL(quiz.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Quiz & Results"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      {/* Pencil Icon Edit */}
                      <Link
                        to={ROUTES.ADMIN.QUIZZES_EDIT(quiz.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-slate-400 hover:text-[#0072BC] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Quiz"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>

                      {/* Radix Accessible Dropdown Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-[#006B3C]/20"
                            aria-label="Quiz Actions Menu"
                          >
                            {(isPublishingThis || isDuplicatingThis) ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#006B3C]" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48 bg-white rounded-xl shadow-lg border border-slate-200/90 p-1 font-sans z-50">
                          {/* Publish / Unpublish Action */}
                          <DropdownMenuItem
                            disabled={isPublishingThis}
                            onClick={(e) => {
                              e.stopPropagation();
                              onTogglePublish?.(quiz);
                            }}
                            className="text-xs font-semibold text-slate-700 focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2 px-2.5 rounded-lg flex items-center gap-2"
                          >
                            {quiz.status === 'Published' ? (
                              <>
                                <XCircle className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>Unpublish (Draft)</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-[#21C75D] shrink-0" />
                                <span>Publish Quiz</span>
                              </>
                            )}
                          </DropdownMenuItem>

                          {/* Duplicate Action */}
                          <DropdownMenuItem
                            disabled={isDuplicatingThis}
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicate?.(quiz);
                            }}
                            className="text-xs font-semibold text-slate-700 focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2 px-2.5 rounded-lg flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4 text-[#0072BC] shrink-0" />
                            <span>Duplicate Quiz</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="my-1 border-slate-100" />

                          {/* Delete Action */}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDeleteModal?.(quiz);
                            }}
                            className="text-xs font-semibold text-[#CF3E44] focus:bg-rose-50 focus:text-rose-700 cursor-pointer py-2 px-2.5 rounded-lg flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4 shrink-0 text-[#CF3E44]" />
                            <span>Delete Quiz</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default QuizTable;
