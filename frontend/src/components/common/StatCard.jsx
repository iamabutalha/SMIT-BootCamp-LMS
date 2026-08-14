function StatCard({
  title,
  value,
  description,
  descriptionClassName = "text-text-muted",
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-sm text-text-muted">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-text">
        {value}
      </p>

      <p className={`mt-2 text-xs ${descriptionClassName}`}>
        {description}
      </p>
    </div>
  );
}

export default StatCard;