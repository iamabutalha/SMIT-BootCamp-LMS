import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ReportErrorState({ onRetry }) {
  return (
    <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-2xs text-center space-y-4 font-sans max-w-lg mx-auto my-12">
      <div className="w-12 h-12 rounded-2xl bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center mx-auto">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">Unable to load report data</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          There was an issue retrieving the latest bootcamp analytics metrics. Please check your network connection and try again.
        </p>
      </div>

      <Button
        type="button"
        onClick={onRetry}
        leftIcon={<RefreshCw className="w-4 h-4" />}
        className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs cursor-pointer mx-auto"
      >
        Try Again
      </Button>
    </div>
  );
}

export default ReportErrorState;
