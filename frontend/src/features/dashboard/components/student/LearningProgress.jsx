import { BookOpen } from 'lucide-react';

export function LearningProgress({ modules = [] }) {
  if (!modules || modules.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Learning Module Progress</h3>
          <p className="text-xs text-slate-500">Curriculum mastery across technical tracks.</p>
        </div>
        <BookOpen className="w-4 h-4 text-[#006B3C]" />
      </div>

      <div className="space-y-3.5 pt-1">
        {modules.map((mod) => (
          <div key={mod.module} className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-slate-800">{mod.module}</span>
              <span className="font-extrabold text-slate-900">{mod.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{ width: `${mod.percentage}%`, backgroundColor: mod.color || '#21C75D' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningProgress;
