import { Eye, Edit2, Trash2 } from "lucide-react";
import Table from "../../../components/ui/Table";

// ============================================================
// Student Table
// Displays all students with View, Edit, and Delete action buttons.
// ============================================================

function StudentTable({
  students = [],
  onView,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      key: "rollNumber",
      label: "Roll Number",
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-text">
          {row.rollNumber}
        </span>
      ),
    },

    {
      key: "name",
      label: "Student Name",
      render: (row) => (
        <span className="font-semibold text-primary">
          {row.name}
        </span>
      ),
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
      render: (row) => (
        <span className="text-xs text-text-muted">
          {typeof row.team === "object" && row.team?.name
            ? row.team.name
            : row.team || "-"}
        </span>
      ),
    },

    {
      key: "action",
      label: "Action",
      render: (student) => (
        <div className="flex items-center gap-2">
          {/* View Student */}
          <button
            type="button"
            onClick={() => onView(student)}
            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-blue-100 transition"
            title="View Student Details"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View</span>
          </button>

          {/* Edit Student */}
          <button
            type="button"
            onClick={() => onEdit(student)}
            className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
            title="Edit Student"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>

          {/* Delete Student */}
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete student "${student.name}" (${student.rollNumber})? This will also remove their attendance and assigned tasks.`
                )
              ) {
                onDelete && onDelete(student);
              }
            }}
            className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
            title="Delete Student"
          >
            <Trash2 className="h-3.5 w-3.5 text-red-600" />
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

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