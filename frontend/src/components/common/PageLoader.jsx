import Spinner from '../ui/Spinner';
import { cn } from '../../utils/cn';

export function PageLoader({ message = 'Loading contents...', className, minHeight = 'min-h-[240px]' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message || 'Loading content'}
      className={cn(
        'w-full flex flex-col items-center justify-center p-8 space-y-3 font-sans transition-all duration-200 animate-in fade-in-50',
        minHeight,
        className
      )}
    >
      <div className="p-3 rounded-2xl bg-[#E8F7DF]/50 text-[#006B3C] border border-[#E8F7DF] shadow-2xs">
        <Spinner size="md" className="text-[#006B3C]" />
      </div>
      {message && (
        <p className="text-xs font-semibold text-slate-500 tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
}

export default PageLoader;
