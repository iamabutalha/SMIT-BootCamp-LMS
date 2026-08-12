import { Trophy, Medal } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

export function TopStudents({ students = [] }) {
  return (
    <div className="bg-white p-5 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0C0E0F]">Top Performing Students</h3>
            <p className="text-[11px] text-slate-500">Highest progress & assignment scores</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {students.map((student, idx) => (
          <div
            key={student.id || idx}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100/80 hover:bg-slate-100/60 transition"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#E8F7DF] text-[#006B3C] font-extrabold text-xs flex items-center justify-center shrink-0">
                #{student.rank || idx + 1}
              </div>
              <Avatar src={student.avatar} name={student.name} className="w-8 h-8 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{student.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">Roll: {student.rollNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs font-extrabold text-[#006B3C]">{student.progress}%</span>
                <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-[#006B3C] h-full rounded-full"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
              {idx === 0 && <Medal className="w-4 h-4 text-[#DAA622]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopStudents;
