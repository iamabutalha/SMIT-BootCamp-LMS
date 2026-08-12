import { Link, useNavigate } from 'react-router-dom';
import { Mail, BookOpen, Users, HelpCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { ROUTES } from '@/constants/routes';

export function TeacherCard({ teacher, onToggleStatus }) {
  const navigate = useNavigate();
  const isActive = teacher?.status === 'Active';
  const teacherKey = teacher?.id || teacher?._id || 't-1';
  const profileUrl = ROUTES.ADMIN.TEACHER_DETAIL(teacherKey);

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    navigate(profileUrl);
  };

  return (
    <Card className="rounded-2xl border-slate-200/80 shadow-2xs hover:shadow-md transition-all font-sans text-left overflow-hidden flex flex-col justify-between group">
      <CardContent className="p-6 space-y-4">
        {/* Header: Avatar, Name, Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar src={teacher?.avatar} name={teacher?.name} className="w-12 h-12 shrink-0 border border-slate-100" />
            <div className="min-w-0">
              <Link
                to={profileUrl}
                className="font-extrabold text-slate-900 text-sm hover:text-[#006B3C] transition-colors block truncate"
              >
                {teacher?.name}
              </Link>
              <div className="text-xs font-semibold text-slate-500 truncate">{teacher?.role}</div>
            </div>
          </div>

          {isActive ? (
            <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">Active</Badge>
          ) : (
            <Badge className="bg-slate-100 text-slate-500 font-bold">Inactive</Badge>
          )}
        </div>

        {/* Specialization Tag & Email */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-bold uppercase text-[#0072BC] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 block w-fit truncate">
            {teacher?.specialization}
          </span>

          <div className="flex items-center gap-2 text-xs text-slate-600 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{teacher?.email}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Courses</span>
            <span className="font-extrabold text-slate-800 text-xs">{teacher?.assignedCoursesCount || 0}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <Users className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Students</span>
            <span className="font-extrabold text-slate-800 text-xs">{teacher?.assignedStudentsCount || 0}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Quizzes</span>
            <span className="font-extrabold text-slate-800 text-xs">{teacher?.quizzesCount || 0}</span>
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleNavigateProfile}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#006B3C]/10 text-slate-700 hover:text-[#006B3C] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200/80"
          >
            <span>View Profile & Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TeacherCard;
