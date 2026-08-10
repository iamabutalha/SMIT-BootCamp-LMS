import { cn } from '../../utils/cn';

export function Logo({ variant = 'light', size = 'md', className, showText = true }) {
  const isDark = variant === 'dark';

  const imgSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={cn('flex items-center gap-2.5 font-bold tracking-tight select-none font-sans', className)}>
      <img
        src="/logo.png"
        alt="LMS Group"
        className={cn(
          'shrink-0 rounded-full object-cover bg-white shadow-sm transition-transform hover:scale-105',
          imgSizes[size]
        )}
      />
      {showText && (
        <span className={cn('font-bold tracking-tight', textSizes[size], isDark ? 'text-white' : 'text-foreground')}>
          Bootcamp<span className={isDark ? 'text-lime' : 'text-brand-dark'}>LMS</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
