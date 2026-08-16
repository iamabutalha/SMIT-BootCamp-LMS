import Table from "../../../components/ui/Table";

// ============================================================
// Student Table
// Displays all students in the Students module.
// ============================================================

function StudentTable({
  students = [],
  onView,
  onEdit,
}) {
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
      key: "team",
      label: "Team",
    },

    {
      key: "action",
      label: "Action",

      // ------------------------------------------------------
      // Custom action buttons
      // ------------------------------------------------------

      render: (student) => (
        <div className="flex items-center gap-2">

          {/* View Student */}

          <button
            type="button"
            onClick={() => onView(student)}
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
            View
          </button>

          {/* Edit Student */}

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
  // Render Generic Table
  // ==========================================================

  return (
    <Table
      columns={columns}
      data={students}
      rowKey="id"
      emptyMessage="No students found."
    />
  );
}

export default StudentTable;