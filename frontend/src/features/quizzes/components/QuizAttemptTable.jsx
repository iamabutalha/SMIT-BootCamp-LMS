import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { UserCheck, Clock, Calendar } from 'lucide-react';

export function QuizAttemptTable({ attempts = [] }) {
  if (!attempts || attempts.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
        <UserCheck className="w-8 h-8 text-slate-400 mx-auto" />
        <h4 className="text-sm font-bold text-slate-800">No attempts recorded yet</h4>
        <p className="text-xs text-slate-500">Students have not taken this quiz yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider py-3.5">Student</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Roll Number</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Attempt Date</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Time Taken</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Score</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attempts.map((attempt) => {
              const isPassed = attempt.status === 'Passed';

              return (
                <TableRow key={attempt.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-3.5">
                    <span className="text-xs font-bold text-slate-900">{attempt.studentName}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-mono font-medium text-slate-600">{attempt.rollNumber}</span>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{attempt.attemptDate}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{attempt.timeTaken}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className={`text-xs font-extrabold ${isPassed ? 'text-[#21C75D]' : 'text-rose-600'}`}>
                      {attempt.percentage}%
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    {isPassed ? (
                      <Badge className="bg-[#E8F7DF] text-[#21C75D] hover:bg-[#E8F7DF] font-bold">Passed</Badge>
                    ) : (
                      <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-50 font-bold border border-rose-200/80">Failed</Badge>
                    )}
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

export default QuizAttemptTable;
