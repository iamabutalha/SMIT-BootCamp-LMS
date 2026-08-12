import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DashboardErrorState({ onRetry }) {
  return (
    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs font-sans max-w-lg mx-auto my-8 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#DE646D] flex items-center justify-center mx-auto border border-rose-100">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-800">Unable to load dashboard data</h3>
        <p className="text-xs text-slate-500">
          A network or service issue prevented loading your student analytics dashboard.
        </p>
      </div>
      <Button
        type="button"
        onClick={onRetry}
        icon={<RefreshCw className="w-4 h-4" />}
        className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs cursor-pointer"
      >
        Retry Loading
      </Button>
    </div>
  );
}

export default DashboardErrorState;
