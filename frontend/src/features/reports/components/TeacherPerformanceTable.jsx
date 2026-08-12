import { Users, GraduationCap, FileText, Award } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

export function TeacherPerformanceTable({ teachers }) {
  if (!teachers || teachers.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Teacher / Mentor Performance</h3>
          <p className="text-xs text-slate-500 font-medium">Instructor assignment oversight, quiz management, and average class outcomes.</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Instructor Name</th>
              <th className="py-3 px-4">Active Students</th>
              <th className="py-3 px-4">Assignments Managed</th>
              <th className="py-3 px-4">Quizzes Created</th>
              <th className="py-3 px-4">Avg Student Score</th>
              <th className="py-3 px-4 text-right">Completion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <Avatar name={teacher.name} className="w-7 h-7 shrink-0" />
                    <span className="font-bold text-[#006B3C] text-sm">{teacher.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-semibold">{teacher.students}</td>
                <td className="py-3.5 px-4 text-slate-700 font-semibold">{teacher.assignments}</td>
                <td className="py-3.5 px-4 text-slate-700 font-semibold">{teacher.quizzes}</td>
                <td className="py-3.5 px-4 font-extrabold text-[#DAA622]">{teacher.avgStudentScore}</td>
                <td className="py-3.5 px-4 text-right font-extrabold text-[#006B3C]">{teacher.completionRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherPerformanceTable;
