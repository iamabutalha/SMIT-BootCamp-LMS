import { Users, CalendarCheck, FileCheck, Award, CheckSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function ReportKpiGrid({ kpi }) {
  if (!kpi) return null;

  const cards = [
    {
      title: 'Total Students',
      value: kpi.totalStudents.value,
      change: kpi.totalStudents.change,
      isPositive: kpi.totalStudents.isPositive,
      comparison: kpi.totalStudents.comparison,
      icon: Users,
      iconBg: 'bg-[#F1F5FF] text-[#2D67E4]',
    },
    {
      title: 'Average Attendance',
      value: kpi.avgAttendance.value,
      change: kpi.avgAttendance.change,
      isPositive: kpi.avgAttendance.isPositive,
      comparison: kpi.avgAttendance.comparison,
      icon: CalendarCheck,
      iconBg: 'bg-[#E8F7DF] text-[#006B3C]',
    },
    {
      title: 'Assignment Completion',
      value: kpi.assignmentCompletion.value,
      change: kpi.assignmentCompletion.change,
      isPositive: kpi.assignmentCompletion.isPositive,
      comparison: kpi.assignmentCompletion.comparison,
      icon: FileCheck,
      iconBg: 'bg-[#DBEAFF] text-[#2D67E4]',
    },
    {
      title: 'Average Quiz Score',
      value: kpi.avgQuizScore.value,
      change: kpi.avgQuizScore.change,
      isPositive: kpi.avgQuizScore.isPositive,
      comparison: kpi.avgQuizScore.comparison,
      icon: Award,
      iconBg: 'bg-[#FEF8C2] text-[#DAA622]',
    },
    {
      title: 'Task Completion',
      value: kpi.taskCompletion.value,
      change: kpi.taskCompletion.change,
      isPositive: kpi.taskCompletion.isPositive,
      comparison: kpi.taskCompletion.comparison,
      icon: CheckSquare,
      iconBg: 'bg-[#D5F7E5] text-[#21C65C]',
    },
    {
      title: 'Overall Bootcamp Progress',
      value: kpi.overallProgress.value,
      change: kpi.overallProgress.change,
      isPositive: kpi.overallProgress.isPositive,
      comparison: kpi.overallProgress.comparison,
      icon: TrendingUp,
      iconBg: 'bg-[#E8F7DF] text-[#006B3C]',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-sans text-left">
      {cards.map((card) => {
        const Icon = card.icon;
        const TrendIcon = card.isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <div
            key={card.title}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 truncate">{card.title}</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</p>
              
              <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold">
                <span
                  className={`flex items-center ${
                    card.isPositive ? 'text-[#006B3C]' : 'text-[#DE646D]'
                  }`}
                >
                  <TrendIcon className="w-3.5 h-3.5" />
                  {card.change}
                </span>
                <span className="text-slate-400 font-normal truncate">{card.comparison}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReportKpiGrid;
