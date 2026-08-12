import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, BookOpen, Users, HelpCircle, Award } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import PageLoader from '@/components/common/PageLoader';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import TeacherCourses from '../components/TeacherCourses';
import TeacherQuizzes from '../components/TeacherQuizzes';
import { useGetTeacherByIdQuery } from '../api/teachersApi';
import { ROUTES } from '@/constants/routes';

export function TeacherDetailsContent() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { data: teacher, isLoading, isError, error } = useGetTeacherByIdQuery(teacherId);

  if (isLoading) {
    return <PageLoader message="Loading teacher profile & course analytics..." />;
  }

  if (isError || !teacher) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs font-sans max-w-lg mx-auto my-8">
        <h3 className="text-lg font-bold text-slate-900">Teacher Profile Not Found</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {error?.message || `No instructor found matching ID "${teacherId}".`}
        </p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN.TEACHERS)}
          className="mt-5 px-5 py-2.5 bg-[#006B3C] hover:bg-[#00522e] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
        >
          Back to Teachers Directory
        </button>
      </div>
    );
  }

  const isActive = teacher?.status === 'Active';
  const performanceTrend = teacher?.performanceTrend || [
    { month: 'May', avgScore: 80 },
    { month: 'Jun', avgScore: 84 },
    { month: 'Jul', avgScore: 86 },
    { month: 'Aug', avgScore: 88 },
  ];

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Header Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN.TEACHERS)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Back to Teachers"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Teacher Profile & Performance</h1>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive view of courses taught, student outcomes, and quizzes.</p>
        </div>
      </div>

      {/* Teacher Profile Banner Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Avatar src={teacher?.avatar} name={teacher?.name || 'Instructor'} className="w-16 h-16 shrink-0 border border-slate-200" />
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-extrabold text-slate-900">{teacher?.name || 'Ali Khan'}</h2>
                {isActive ? (
                  <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">Active</Badge>
                ) : (
                  <Badge className="bg-slate-100 text-slate-500 font-bold">Inactive</Badge>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-600">{teacher?.role || 'Lead Instructor'}</p>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {teacher?.bio || 'Senior Software Engineer specializing in Web & Mobile App Development.'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Mail className="w-4 h-4 text-[#0072BC]" />
            <span className="truncate">{teacher?.email || 'instructor@saylani.org'}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{teacher?.phone || '+92 300 1234567'}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Joined: {teacher?.joinedDate || '2025-03-15'}</span>
          </div>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0072BC] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{teacher?.assignedStudentsCount ?? 0}</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Assigned Students</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{teacher?.assignedCoursesCount ?? 0}</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Courses Taught</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{teacher?.quizzesCount ?? 0}</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Quizzes Authored</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F7DF] text-[#21C75D] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#006B3C]">{teacher?.avgStudentPerformance ?? 0}%</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Avg Student Score</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Performance Trend Chart */}
      <ErrorBoundary title="Performance Chart Error">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Student Performance Trend</h3>
            <p className="text-xs text-slate-500">Average student evaluation scores over time.</p>
          </div>

          <div className="h-60 w-full pt-2 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={200}>
              <AreaChart data={performanceTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="teacherTrendColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#21C75D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#21C75D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Area type="monotone" dataKey="avgScore" stroke="#21C75D" strokeWidth={3} fillOpacity={1} fill="url(#teacherTrendColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ErrorBoundary>

      {/* Assigned Courses Section */}
      <ErrorBoundary title="Assigned Courses Error">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Assigned Courses ({teacher?.courses?.length || 0})</h3>
          <TeacherCourses courses={teacher?.courses || []} />
        </div>
      </ErrorBoundary>

      {/* Quizzes Authored Section */}
      <ErrorBoundary title="Authored Quizzes Error">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Authored Quizzes ({teacher?.quizzes?.length || 0})</h3>
          <TeacherQuizzes quizzes={teacher?.quizzes || []} />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export function TeacherDetailsPage() {
  return (
    <ErrorBoundary title="Teacher Profile Page Error">
      <TeacherDetailsContent />
    </ErrorBoundary>
  );
}

export default TeacherDetailsPage;
