function StatCard({
  title,
  value,
  icon: Icon,
  iconBgClass = "bg-blue-100/70 text-blue-600",
  description,
  descriptionClassName = "text-text-muted",
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-muted">{title}</p>
        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBgClass}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <p className="mt-3 text-3xl font-extrabold text-text tracking-tight">
        {value}
      </p>

      {description && (
        <p className={`mt-2 text-xs ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default StatCard;