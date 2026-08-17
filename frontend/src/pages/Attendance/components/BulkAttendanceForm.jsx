import { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchStudentsForAttendance } from "../../../store/slices/attendanceSlice";
import LoadingState from "../../../components/common/LoadingState";
import ErrorState from "../../../components/common/ErrorState";

// ============================================================
// Bulk Attendance Form
// Show all students with quick status selection
// ============================================================

function BulkAttendanceForm({ onSubmit, onClose }) {
  const dispatch = useAppDispatch();
  const { studentsForMarking, studentsLoading, error } = useAppSelector(
    (state) => state.attendance
  );

  const [search, setSearch] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchStudentsForAttendance());
  }, [dispatch]);

  // Filter students by search
  const filteredStudents = studentsForMarking.filter((student) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      student.rollNumber?.toLowerCase().includes(searchLower) ||
      student.name?.toLowerCase().includes(searchLower) ||
      student.course?.toLowerCase().includes(searchLower) ||
      student.batch?.toLowerCase().includes(searchLower)
    );
  });

  // Handle status change for a student
  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Handle bulk mark all
  const handleMarkAll = (status) => {
    const newData = {};
    filteredStudents.forEach((student) => {
      newData[student._id] = status;
    });
    setAttendanceData(newData);
  };

  // Handle submit
  const handleSubmit = async () => {
    setSaving(true);
    try {
      // Submit all changed attendance
      const promises = Object.entries(attendanceData).map(([studentId, status]) => {
        return onSubmit({ studentId, status, date: new Date().toISOString() });
      });
      await Promise.all(promises);
      onClose();
    } catch (err) {
      console.error("Bulk attendance error:", err);
    } finally {
      setSaving(false);
    }
  };

  // Get status for student (from attendanceData or existing status)
  const getStudentStatus = (student) => {
    return attendanceData[student._id] || student.attendanceStatus || null;
  };

  // Status badge style
  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "Absent":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      case "Leave":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-500 hover:bg-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-surface shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text">Mark Attendance</h2>
            <p className="mt-1 text-sm text-text-muted">
              Select attendance status for each student
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted transition hover:bg-background hover:text-text"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-6">
          {studentsLoading ? (
            <LoadingState message="Loading students..." />
          ) : error ? (
            <ErrorState message={error} onRetry={() => dispatch(fetchStudentsForAttendance())} />
          ) : (
            <div className="flex h-full flex-col space-y-4">
              {/* Bulk Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by roll number or name..."
                    className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleMarkAll("Present")}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    Mark All Present
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarkAll("Absent")}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Mark All Absent
                  </button>
                </div>
              </div>

              {/* Students Table */}
              <div className="flex-1 overflow-hidden rounded-xl border border-border bg-surface">
                <div className="h-full overflow-y-auto">
                  <table className="w-full min-w-max border-collapse text-left">
                    <thead className="sticky top-0 z-10">
                      <tr className="border-b border-border bg-background">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Roll No
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Student Name
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Course
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Batch
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => {
                          const currentStatus = getStudentStatus(student);
                          return (
                            <tr
                              key={student._id}
                              className="border-b border-border last:border-b-0 hover:bg-background"
                            >
                              <td className="px-4 py-3 text-sm">
                                <span className="font-mono font-semibold text-primary">
                                  {student.rollNumber}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm font-semibold text-text">
                                {student.name}
                              </td>
                              <td className="px-4 py-3 text-xs text-text-muted">
                                {student.course}
                              </td>
                              <td className="px-4 py-3 text-xs text-text-muted">
                                {student.batch}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-1">
                                  {["Present", "Absent", "Leave"].map((status) => (
                                    <button
                                      key={status}
                                      type="button"
                                      onClick={() => handleStatusChange(student._id, status)}
                                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                        currentStatus === status
                                          ? getStatusClass(status)
                                          : "border border-border bg-surface text-text-muted hover:bg-background"
                                      }`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-4 py-10 text-center text-sm text-text-muted"
                          >
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-sm text-text-muted">
            {Object.keys(attendanceData).length} student(s) marked
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:bg-background"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || Object.keys(attendanceData).length === 0}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkAttendanceForm;
