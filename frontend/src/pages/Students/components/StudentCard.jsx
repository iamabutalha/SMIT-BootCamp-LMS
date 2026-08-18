// ============================================================
// Student Card
// Displays basic student information in a responsive card.
// ============================================================

function StudentCard({
  student,
  onView,
}) {
  if (!student) {
    return null;
  }

  return (
    <div
      className="
        rounded-xl
        border
        border-border
        bg-surface
        p-5
        transition
        hover:shadow-sm
      "
    >
      {/* ======================================================
          Student Header
      ====================================================== */}

      <div className="flex items-center gap-4">

        {/* Student Avatar */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-primary
            text-lg
            font-semibold
            text-white
          "
        >
          {student.name?.charAt(0)?.toUpperCase()}
        </div>

        {/* Student Name */}

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-text">
            {student.name}
          </h3>

          <p className="mt-1 text-sm text-text-muted">
            Roll No: {student.rollNumber}
          </p>
        </div>

      </div>

      {/* ======================================================
          Student Information
      ====================================================== */}

      <div className="mt-5 space-y-3">

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-text-muted">
            Course
          </span>

          <span className="text-right text-sm font-medium text-text">
            {student.course}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-text-muted">
            Batch
          </span>

          <span className="text-sm font-medium text-text">
            {student.batch}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-text-muted">
            Team
          </span>

          <span className="text-sm font-medium text-text">
            {typeof student.team === "object" && student.team?.name
              ? student.team.name
              : student.team || "-"}
          </span>
        </div>

      </div>

      {/* ======================================================
          View Button
      ====================================================== */}

      <button
        type="button"
        onClick={() => onView?.(student)}
        className="
          mt-5
          w-full
          rounded-lg
          border
          border-primary
          px-4
          py-2
          text-sm
          font-medium
          text-primary
          transition
          hover:bg-primary
          hover:text-white
        "
      >
        View Student
      </button>
    </div>
  );
}

export default StudentCard;