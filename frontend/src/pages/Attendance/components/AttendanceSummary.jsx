// ============================================================
// Attendance Summary Component
// Displays student's attendance statistics.
// ============================================================

function AttendanceSummary({
  totalDays = 0,
  presentDays = 0,
  absentDays = 0,
  leaveDays = 0,
}) {
  // ==========================================================
  // Calculate Attendance Percentage
  // ==========================================================

  const attendancePercentage =
    totalDays > 0
      ? Math.round((presentDays / totalDays) * 100)
      : 0;

  // ==========================================================
  // Summary Data
  // ==========================================================

  const summaryItems = [
    {
      label: "Total Days",
      value: totalDays,
    },
    {
      label: "Present",
      value: presentDays,
    },
    {
      label: "Absent",
      value: absentDays,
    },
    {
      label: "Leave",
      value: leaveDays,
    },
    {
      label: "Attendance",
      value: `${attendancePercentage}%`,
    },
  ];

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <div>
      {/* ======================================================
          Section Title
      ====================================================== */}

      <h2 className="mb-4 text-lg font-semibold text-text">
        Attendance Summary
      </h2>

      {/* ======================================================
          Summary Cards
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-5
        "
      >
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="
              rounded-xl
              border
              border-border
              bg-surface
              p-5
            "
          >
            <p className="text-sm text-text-muted">
              {item.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-text">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceSummary;