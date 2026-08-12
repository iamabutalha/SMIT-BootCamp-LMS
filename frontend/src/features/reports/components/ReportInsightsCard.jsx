import { Lightbulb, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export function ReportInsightsCard({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Automated Report Insights</h3>
          <p className="text-xs text-slate-500 font-medium">Algorithmic key takeaways and performance alerts derived from current filter metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {insights.map((item, index) => {
          const isSuccess = item.type === 'success';
          const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

          return (
            <div
              key={index}
              className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs font-semibold ${
                isSuccess
                  ? 'bg-[#E8F7DF] border-[#006B3C]/20 text-[#006B3C]'
                  : 'bg-[#F8E5E2] border-[#DE646D]/20 text-[#DE646D]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReportInsightsCard;
