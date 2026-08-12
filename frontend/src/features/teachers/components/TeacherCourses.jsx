import { BookOpen, Users, ClipboardList, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function TeacherCourses({ courses = [] }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 text-center font-sans">
        No courses currently assigned to this teacher.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-left">
      {courses.map((course) => (
        <Card key={course.id} className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#0072BC] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  {course.batch}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{course.name}</h4>
              </div>
              <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">{course.status}</Badge>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2 border-t border-slate-100">
              <div className="p-2 bg-slate-50 rounded-xl">
                <Users className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Students</span>
                <span className="font-extrabold text-slate-800">{course.studentsCount}</span>
              </div>

              <div className="p-2 bg-slate-50 rounded-xl">
                <ClipboardList className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Tasks</span>
                <span className="font-extrabold text-slate-800">{course.tasksCount}</span>
              </div>

              <div className="p-2 bg-slate-50 rounded-xl">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Quizzes</span>
                <span className="font-extrabold text-slate-800">{course.quizzesCount}</span>
              </div>

              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Avg Score</span>
                <span className="font-extrabold text-[#21C75D]">{course.avgPerformance}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TeacherCourses;
