import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function QuickActionCard({
  title,
  description,
  to,
  icon: Icon,
}) {
  return (
    <Link
      to={to}
      className="
        group
        rounded-xl
        border
        border-border
        bg-surface
        p-4
        transition
        hover:border-primary
        hover:bg-primary/5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-primary/10
            text-primary
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <ArrowRight
          className="
            h-4
            w-4
            text-text-muted
            transition
            group-hover:translate-x-1
            group-hover:text-primary
          "
        />
      </div>

      <h3 className="mt-4 font-medium text-text">
        {title}
      </h3>

      <p className="mt-1 text-xs text-text-muted">
        {description}
      </p>
    </Link>
  );
}

export default QuickActionCard;