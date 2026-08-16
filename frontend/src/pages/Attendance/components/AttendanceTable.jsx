import Table from "../../../components/ui/Table";

// ============================================================
// Attendance Table
// Displays today's attendance records.
// ============================================================

function AttendanceTable({
  attendance = [],
  onEdit,
  onViewHistory,
}) {
  // ==========================================================
  // Attendance Status Badge
  // ==========================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";

      case "Absent":
        return "bg-red-100 text-red-700";

      case "Leave":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================================================
  // Table Columns
  // ==========================================================

  const columns = [
    {
      key: "rollNumber",
      label: "Roll Number",
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-primary">
          {row.student?.rollNumber || row.studentId?.rollNumber || row.rollNumber || "-"}
        </span>
      ),
    },

    {
      key: "name",
      label: "Student Name",
      render: (row) => (
        <span className="font-semibold text-text">
          {row.student?.name || row.studentId?.name || row.name || row.studentName || "-"}
        </span>
      ),
    },

    {
      key: "course",
      label: "Course",
      render: (row) => (
        <span className="text-xs text-text-muted">
          {row.student?.course || row.studentId?.course || row.course || "-"}
        </span>
      ),
    },

    {
      key: "batch",
      label: "Batch",
      render: (row) => (
        <span className="text-xs text-text-muted">
          {row.student?.batch || row.studentId?.batch || row.batch || "-"}
        </span>
      ),
    },

    {
      key: "status",
      label: "Attendance Status",
      render: (row) => (
        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${getStatusClass(row.status)}
          `}
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex flex-wrap items-center gap-2">
          {/* View History */}
          <button
            type="button"
            onClick={() => onViewHistory(row.student || row)}
            className="
              rounded-lg
              px-3
              py-1.5
              text-sm
              font-medium
              text-primary
              transition
              hover:bg-primary/10
            "
          >
            History
          </button>

          {/* Edit Attendance */}
          <button
            type="button"
            onClick={() => onEdit(row)}
            className="
              rounded-lg
              px-3
              py-1.5
              text-sm
              font-medium
              text-text-muted
              transition
              hover:bg-background
              hover:text-text
            "
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  // ==========================================================
  // Render Table
  // ==========================================================

  return (
    <Table
      columns={columns}
      data={attendance}
      rowKey={(r) => r._id || r.id}
      emptyMessage="No attendance records found."
    />
  );
}

export default AttendanceTable;