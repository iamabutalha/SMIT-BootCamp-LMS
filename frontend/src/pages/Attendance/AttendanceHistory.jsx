import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import AttendanceSummary from "./components/AttendanceSummary";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import attendanceService from "../../services/attendanceService";

// ============================================================
// Attendance History Component
// ============================================================

function AttendanceHistory({
  student,
  onBack,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  // ==========================================================
  // Fetch Attendance History
  // ==========================================================

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const studentId = student._id || student.id;
        const data = await attendanceService.getStudentHistory(studentId);
        setHistoryData(data);
      } catch (err) {
        console.error("Error fetching attendance history:", err);
        setError(err.response?.data?.message || err.message || "Failed to load attendance history");
      } finally {
        setLoading(false);
      }
    };

    if (student) {
      fetchHistory();
    }
  }, [student]);

  // ==========================================================
  // Extract data from response
  // ==========================================================

  const attendanceHistory = historyData?.records || [];
  const summary = historyData?.summary || {
    totalDays: 0,
    present: 0,
    absent: 0,
    leave: 0,
    attendancePercentage: 0
  };

  const studentInfo = historyData?.student || student;

  // ==========================================================
  // Status Badge Class
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
  // Helper function to format date
  // ==========================================================

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  // ==========================================================
  // Render
  // ==========================================================

  if (loading) {
    return (
      <MainLayout
        title="Attendance History"
        subtitle={`Loading attendance record...`}
      >
        <LoadingState message="Loading attendance history..." />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout
        title="Attendance History"
        subtitle="Failed to load attendance history"
      >
        <ErrorState
          title="Failed to load attendance history"
          message={error}
          action={
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              ← Back to Attendance
            </button>
          }
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Attendance History"
      subtitle={`Attendance record of ${studentInfo.name}`}
    >
      <div className="space-y-6">

        {/* ====================================================
            Back Button
        ==================================================== */}

        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
            hover:underline
          "
        >
          ← Back to Attendance
        </button>

        {/* ====================================================
            Student Information
        ==================================================== */}

        <div
          className="
            rounded-xl
            border
            border-border
            bg-surface
            p-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
            "
          >
            {/* Student Avatar */}

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-xl
                font-semibold
                text-white
              "
            >
              {studentInfo.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Student Details */}

            <div>
              <h2 className="text-xl font-semibold text-text">
                {studentInfo.name}
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Roll Number: {studentInfo.rollNumber}
              </p>

              <p className="mt-1 text-sm text-text-muted">
                {studentInfo.course} • {studentInfo.batch}
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            Attendance Summary
        ==================================================== */}

        <AttendanceSummary
          totalDays={summary.totalDays}
          presentDays={summary.present}
          absentDays={summary.absent}
          leaveDays={summary.leave}
        />

        {/* ====================================================
            Attendance History
        ==================================================== */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-text">
            Attendance History
          </h2>

          {attendanceHistory.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-text-muted">
                No attendance records found for this student.
              </p>
            </div>
          ) : (
            <div
              className="
                w-full
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-surface
              "
            >
              <div className="overflow-x-auto">

                <table
                  className="
                    w-full
                    min-w-[600px]
                    border-collapse
                    text-left
                  "
                >

                  {/* ==========================================
                      Table Header
                  ========================================== */}

                  <thead>
                    <tr className="border-b border-border bg-background">

                      <th
                        className="
                          px-4
                          py-3
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-text-muted
                        "
                      >
                        Date
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-text-muted
                        "
                      >
                        Day
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-text-muted
                        "
                      >
                        Status
                      </th>

                    </tr>
                  </thead>

                  {/* ==========================================
                      Table Body
                  ========================================== */}

                  <tbody>

                    {attendanceHistory.map((record, index) => (
                      <tr
                        key={record._id || index}
                        className="
                          border-b
                          border-border
                          last:border-b-0
                          hover:bg-background
                        "
                      >

                        {/* Date */}

                        <td className="px-4 py-3 text-sm text-text">
                          {formatDate(record.date)}
                        </td>

                        {/* Day */}

                        <td className="px-4 py-3 text-sm text-text">
                          {formatDay(record.date)}
                        </td>

                        {/* Status */}

                        <td className="px-4 py-3">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${getStatusClass(record.status)}
                            `}
                          >
                            {record.status}
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}

export default AttendanceHistory;