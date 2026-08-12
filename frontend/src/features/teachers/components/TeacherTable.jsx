import { Link } from 'react-router-dom';
import { Eye, Mail, BookOpen, Users, HelpCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { ROUTES } from '@/constants/routes';

export function TeacherTable({ teachers = [], onToggleStatus }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider py-3.5">Teacher</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Specialization</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Courses</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Students</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Quizzes</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Joined Date</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Status</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => {
              const isActive = teacher.status === 'Active';
              const teacherKey = teacher.id || teacher._id || 't-1';
              const profileUrl = ROUTES.ADMIN.TEACHER_DETAIL(teacherKey);

              return (
                <TableRow key={teacherKey} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name & Avatar */}
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <Avatar src={teacher.avatar} name={teacher.name} className="w-9 h-9 shrink-0" />
                      <div className="min-w-0">
                        <Link
                          to={profileUrl}
                          className="font-bold text-slate-900 text-xs hover:text-[#006B3C] transition-colors block truncate"
                        >
                          {teacher.name}
                        </Link>
                        <div className="text-[11px] text-slate-400 truncate">{teacher.email}</div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Specialization */}
                  <TableCell>
                    <span className="text-xs font-semibold text-slate-700">{teacher.specialization}</span>
                  </TableCell>

                  {/* Courses */}
                  <TableCell className="text-center">
                    <span className="text-xs font-bold text-slate-800">{teacher.assignedCoursesCount}</span>
                  </TableCell>

                  {/* Students */}
                  <TableCell className="text-center">
                    <span className="text-xs font-bold text-slate-800">{teacher.assignedStudentsCount}</span>
                  </TableCell>

                  {/* Quizzes */}
                  <TableCell className="text-center">
                    <span className="text-xs font-bold text-slate-800">{teacher.quizzesCount}</span>
                  </TableCell>

                  {/* Joined Date */}
                  <TableCell className="text-center">
                    <span className="text-xs text-slate-500">{teacher.joinedDate}</span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    {isActive ? (
                      <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">Active</Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-500 font-bold">Inactive</Badge>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right pr-6">
                    <Link
                      to={profileUrl}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
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

export default TeacherTable;
