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
    },

    {
      key: "name",
      label: "Student Name",
    },

    {
      key: "course",
      label: "Course",
    },

    {
      key: "batch",
      label: "Batch",
    },

    {
      key: "status",
      label: "Attendance Status",

      // ------------------------------------------------------
      // Custom Status Badge
      // ------------------------------------------------------

      render: (student) => (
        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${getStatusClass(student.status)}
          `}
        >
          {student.status}
        </span>
      ),
    },

    {
      key: "action",
      label: "Action",

      // ------------------------------------------------------
      // Action Buttons
      // ------------------------------------------------------

      render: (student) => (
        <div className="flex flex-wrap items-center gap-2">

          {/* View History */}

          <button
            type="button"
            onClick={() => onViewHistory(student)}
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
            onClick={() => onEdit(student)}
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
      rowKey="id"
      emptyMessage="No attendance records found."
    />
  );
}

export default AttendanceTable;