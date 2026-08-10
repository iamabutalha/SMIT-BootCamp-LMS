import { cn } from '../../utils/cn';

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
}) {
  return (
    <section
      className={cn(
        'bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden',
        className
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            'px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4',
            headerClassName
          )}
        >
          <div>
            {title && (
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn('p-6', bodyClassName)}>{children}</div>
    </section>
  );
}

export default SectionCard;
