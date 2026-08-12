import { Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function StudentAttendancePerformance({ rate = 92, category = 'Excellent Attendance', color = '#57BA7F' }) {
  const getCategoryBadge = () => {
    if (rate >= 90) {
      return <Badge className="bg-[#E8F7DF] text-[#57BA7F] font-bold text-xs px-3 py-1">Excellent Attendance (90%+)</Badge>;
    }
    if (rate >= 75) {
      return <Badge className="bg-sky-50 text-[#0284C7] font-bold text-xs px-3 py-1 border border-sky-200">Good Attendance (75–89%)</Badge>;
    }
    if (rate >= 60) {
      return <Badge className="bg-amber-50 text-[#DAA622] font-bold text-xs px-3 py-1 border border-amber-200">Needs Improvement (60–74%)</Badge>;
    }
    return <Badge className="bg-rose-50 text-[#DE646D] font-bold text-xs px-3 py-1 border border-rose-200">Critical Warning (&lt;60%)</Badge>;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#57BA7F]" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Attendance Performance Evaluation</h3>
          </div>
          <p className="text-xs text-slate-500">
            Maintain at least 75% attendance to qualify for cohort project submissions and certification.
          </p>
        </div>

        <div>{getCategoryBadge()}</div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">Overall Attendance Progress</span>
          <span className="font-extrabold text-slate-900">{rate} / 100%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{ width: `${rate}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentAttendancePerformance;
