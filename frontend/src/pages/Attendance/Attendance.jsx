import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Plus, Search } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import AttendanceTable from "./components/AttendanceTable";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceHistory from "./AttendanceHistory";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchAttendance,
  markAttendanceThunk,
  updateAttendanceThunk,
} from "../../store/slices/attendanceSlice";

function Attendance() {
  const dispatch = useAppDispatch();
  const { data: attendanceList, loading, error } = useAppSelector(
    (state) => state.attendance
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Daily");
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  const filteredAttendance = useMemo(() => {
    const searchValue = search.toLowerCase().trim();
    const list = attendanceList || [];

    if (!searchValue) {
      return list;
    }

    return list.filter((record) => {
      const rollNumber = record.student?.rollNumber || record.studentId?.rollNumber || record.rollNumber || "";
      const name = record.student?.name || record.studentId?.name || record.name || record.studentName || "";
      const course = record.student?.course || record.studentId?.course || record.course || "";
      const batch = record.student?.batch || record.studentId?.batch || record.batch || "";

      return (
        rollNumber.toLowerCase().includes(searchValue) ||
        name.toLowerCase().includes(searchValue) ||
        course.toLowerCase().includes(searchValue) ||
        batch.toLowerCase().includes(searchValue)
      );
    });
  }, [attendanceList, search]);

  const handleMarkAttendance = async (attendanceData) => {
    try {
      setActionError("");
      if (showForm?.mode === "edit" && showForm?.student?._id) {
        await dispatch(
          updateAttendanceThunk({
            id: showForm.student._id,
            attendanceData: { status: attendanceData.status },
          })
        ).unwrap();
      } else {
        await dispatch(markAttendanceThunk(attendanceData)).unwrap();
      }
      setShowForm(false);
    } catch (err) {
      console.error("Mark attendance error:", err);
      setActionError(typeof err === "string" ? err : "Failed to mark attendance.");
    }
  };

  const handleEditAttendance = (record) => {
    setShowForm({
      mode: "edit",
      student: record,
    });
    setActionError("");
  };

  const handleViewHistory = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseHistory = () => {
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <AttendanceHistory
        student={selectedStudent}
        onBack={handleCloseHistory}
      />
    );
  }

  return (
    <MainLayout
      title="Attendance"
      subtitle="Manage daily student attendance"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Today's Attendance</h2>
            <p className="mt-1 text-sm text-text-muted">
              View and manage student attendance records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActionError("");
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <Plus className="h-4 w-4" />
            Mark Attendance
          </button>
        </div>

        {/* Action Error Alert */}
        {actionError && (
          <div className="rounded-lg border border-danger/20 bg-danger/10 p-4 text-xs font-medium text-danger">
            {actionError}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
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
            {["Daily", "Weekly", "Monthly"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === option
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-text-muted hover:bg-background"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Current Filter Note */}
        <div>
          <p className="text-sm text-text-muted">
            Showing <span className="font-semibold text-text">{filter}</span> attendance records
          </p>
        </div>

        {/* Dynamic Content States */}
        {loading ? (
          <LoadingState message="Loading attendance records from server..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => dispatch(fetchAttendance())}
          />
        ) : filteredAttendance.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-4">
            <EmptyState
              icon={CalendarCheck}
              title="No attendance records found"
              description="No attendance records match your filter criteria or backend has no entries today."
            />
          </div>
        ) : (
          <AttendanceTable
            attendance={filteredAttendance}
            onEdit={handleEditAttendance}
            onViewHistory={handleViewHistory}
          />
        )}

        {/* Attendance Form Modal */}
        {showForm && (
          <AttendanceForm
            mode={showForm.mode || "add"}
            student={showForm.student || null}
            onSubmit={handleMarkAttendance}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Attendance;