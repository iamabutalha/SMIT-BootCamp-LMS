import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Eye, HelpCircle } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function TeacherQuizzes({ quizzes = [] }) {
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 text-center font-sans">
        No quizzes currently created by this teacher.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider py-3.5">Quiz Title</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Course</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Questions</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Attempts</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Avg Score</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Status</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-3.5">
                  <Link
                    to={ROUTES.ADMIN.QUIZZES_DETAIL(quiz.id)}
                    className="font-bold text-slate-900 text-xs hover:text-[#006B3C] transition-colors"
                  >
                    {quiz.title}
                  </Link>
                </TableCell>

                <TableCell>
                  <span className="text-xs font-medium text-slate-600">{quiz.course}</span>
                </TableCell>

                <TableCell className="text-center">
                  <span className="text-xs font-bold text-slate-800">{quiz.questionsCount || 5}</span>
                </TableCell>

                <TableCell className="text-center">
                  <span className="text-xs font-bold text-slate-800">{quiz.attemptsCount || 0}</span>
                </TableCell>

                <TableCell className="text-center">
                  <span className="text-xs font-extrabold text-[#21C75D]">
                    {quiz.avgScore > 0 ? `${quiz.avgScore}%` : '—'}
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  {quiz.status === 'Published' ? (
                    <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">Published</Badge>
                  ) : (
                    <Badge className="bg-amber-50 text-amber-600 font-bold border border-amber-200">Draft</Badge>
                  )}
                </TableCell>

                <TableCell className="text-right pr-6">
                  <Link
                    to={ROUTES.ADMIN.QUIZZES_DETAIL(quiz.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Quiz</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TeacherQuizzes;
