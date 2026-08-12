import { cn } from '../../utils/cn';

export function Logo({ className, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className={cn('flex items-center gap-2 font-bold tracking-tight select-none font-sans', className)}>
      <img
        src="/smit-logo.png"
        alt="Saylani Mass IT Training (SMIT)"
        className={cn('object-contain max-w-full transition-transform hover:scale-105', sizeClasses[size] || 'h-10')}
      />
    </div>
  );
}

export default Logo;
