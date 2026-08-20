import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Search } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import AttendanceHistory from "./AttendanceHistory";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchStudentsForAttendance,
  markAttendanceThunk,
} from "../../store/slices/attendanceSlice";

function Attendance() {
  const dispatch = useAppDispatch();
  const { studentsForMarking, studentsLoading, error } = useAppSelector(
    (state) => state.attendance
  );

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [attendanceChanges, setAttendanceChanges] = useState({});

  useEffect(() => {
    dispatch(fetchStudentsForAttendance());
  }, [dispatch]);

  // Auto-refresh at midnight (12:00 AM) to reset attendance display
  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Next midnight
      return midnight.getTime() - now.getTime();
    };

    // Set up midnight refresh
    const timeUntilMidnight = calculateTimeUntilMidnight();
    const midnightTimer = setTimeout(() => {
      console.log("🌙 Midnight reached - Refreshing attendance for new day...");
      
      // Clear all local changes since it's a new day
      setAttendanceChanges({});
      setActionError("");
      setSuccessMessage("");
      
      // Fetch fresh data for the new day
      dispatch(fetchStudentsForAttendance());
      
      // Set up recurring daily refresh
      const dailyInterval = setInterval(() => {
        console.log("🌙 Midnight reached - Refreshing attendance for new day...");
        setAttendanceChanges({});
        setActionError("");
        setSuccessMessage("");
        dispatch(fetchStudentsForAttendance());
      }, 24 * 60 * 60 * 1000); // 24 hours

      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();
    const list = studentsForMarking || [];

    if (!searchValue) {
      return list;
    }

    return list.filter((student) => {
      return (
        student.rollNumber?.toLowerCase().includes(searchValue) ||
        student.name?.toLowerCase().includes(searchValue) ||
        student.course?.toLowerCase().includes(searchValue) ||
        student.batch?.toLowerCase().includes(searchValue)
      );
    });
  }, [studentsForMarking, search]);

  // Handle status change for a student - Save immediately to database
  const handleStatusChange = async (studentId, status) => {
    // Optimistically update UI
    setAttendanceChanges((prev) => ({
      ...prev,
      [studentId]: status,
    }));
    setActionError("");
    setSuccessMessage("");

    try {
      // Save to database immediately
      await dispatch(markAttendanceThunk({ 
        studentId, 
        status, 
        date: new Date().toISOString() 
      })).unwrap();

      // Remove from pending changes since it's saved
      setAttendanceChanges((prev) => {
        const updated = { ...prev };
        delete updated[studentId];
        return updated;
      });

      setSuccessMessage(`Attendance marked as ${status} for student`);
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

    } catch (err) {
      console.error("Mark attendance error:", err);
      setActionError(typeof err === "string" ? err : "Failed to mark attendance");
      
      // Revert optimistic update on error
      setAttendanceChanges((prev) => {
        const updated = { ...prev };
        delete updated[studentId];
        return updated;
      });
    }
  };

  // Get current status for a student (from changes or existing)
  const getCurrentStatus = (student) => {
    return attendanceChanges[student._id] !== undefined 
      ? attendanceChanges[student._id] 
      : student.attendanceStatus;
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
              Mark attendance for students. Changes are saved automatically.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => dispatch(fetchStudentsForAttendance())}
              disabled={studentsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {studentsLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Action Messages */}
        {actionError && (
          <div className="rounded-lg border border-danger/20 bg-danger/10 p-4 text-sm font-medium text-danger">
            {actionError}
          </div>
        )}
        {successMessage && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm font-medium text-green-700">
            {successMessage}
          </div>
        )}

        {/* Search */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by roll number, name, course, or batch..."
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Students Table */}
        {studentsLoading ? (
          <LoadingState message="Loading students..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => dispatch(fetchStudentsForAttendance())}
          />
        ) : filteredStudents.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-4">
            <EmptyState
              icon={CalendarCheck}
              title="No students found"
              description="No students match your search criteria."
            />
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left">
                <thead>
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
                      Attendance Status
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const currentStatus = getCurrentStatus(student);
                    
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
                          {currentStatus ? (
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                currentStatus === "Present"
                                  ? "bg-green-100 text-green-700"
                                  : currentStatus === "Absent"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {currentStatus}
                            </span>
                          ) : (
                            <span className="text-xs text-text-muted">Not marked</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {["Present", "Absent", "Leave"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(student._id, status)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                  currentStatus === status
                                    ? status === "Present"
                                      ? "bg-green-600 text-white"
                                      : status === "Absent"
                                      ? "bg-red-600 text-white"
                                      : "bg-yellow-600 text-white"
                                    : "border border-border bg-surface text-text-muted hover:bg-background"
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleViewHistory(student)}
                              className="ml-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-background hover:text-text"
                            >
                              History
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Attendance;
