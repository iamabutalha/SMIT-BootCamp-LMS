import { cn } from '../../utils/cn';

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  hint,
  variant = 'default',
  className,
}) {
  const isAccent = variant === 'accent';

  return (
    <div
      className={cn(
        'rounded-xl p-5 border transition-all duration-200 hover:shadow-md font-sans',
        isAccent
          ? 'bg-brand-dark text-white border-brand shadow-sm'
          : 'bg-card text-foreground border-border shadow-2xs',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-wider',
            isAccent ? 'text-mint' : 'text-muted-foreground'
          )}
        >
          {title}
        </span>
        {Icon && (
          <div
            className={cn(
              'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
              isAccent
                ? 'bg-white/15 text-lime'
                : 'bg-mint text-brand-dark'
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {trend && (
          <span
            className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1',
              isAccent
                ? 'bg-lime/20 text-lime'
                : trend.startsWith('+')
                ? 'bg-[#E8F7DF] text-[#006B3C]'
                : 'bg-red-50 text-red-700'
            )}
          >
            {trend}
          </span>
        )}
      </div>

      {(hint || trendLabel) && (
        <p
          className={cn(
            'text-xs mt-2',
            isAccent ? 'text-mint/80' : 'text-muted-foreground'
          )}
        >
          {trendLabel && <span className="font-medium mr-1">{trendLabel}</span>}
          {hint}
        </p>
      )}
    </div>
  );
}

export default StatCard;
