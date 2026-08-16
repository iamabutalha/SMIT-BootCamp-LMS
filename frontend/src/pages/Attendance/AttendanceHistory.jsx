import MainLayout from "../../components/layout/MainLayout";
import AttendanceSummary from "./components/AttendanceSummary";

// ============================================================
// Demo Attendance History
// Later this data will come from backend API.
// ============================================================

const attendanceHistory = [
  {
    date: "27 July 2026",
    day: "Monday",
    status: "Present",
  },
  {
    date: "28 July 2026",
    day: "Tuesday",
    status: "Present",
  },
  {
    date: "29 July 2026",
    day: "Wednesday",
    status: "Absent",
  },
  {
    date: "30 July 2026",
    day: "Thursday",
    status: "Present",
  },
  {
    date: "31 July 2026",
    day: "Friday",
    status: "Leave",
  },
];

// ============================================================
// Attendance History Component
// ============================================================

function AttendanceHistory({
  student,
  onBack,
}) {
  // ==========================================================
  // Calculate Attendance Summary
  // ==========================================================

  const totalDays = attendanceHistory.length;

  const presentDays = attendanceHistory.filter(
    (record) => record.status === "Present"
  ).length;

  const absentDays = attendanceHistory.filter(
    (record) => record.status === "Absent"
  ).length;

  const leaveDays = attendanceHistory.filter(
    (record) => record.status === "Leave"
  ).length;

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
  // Render
  // ==========================================================

  return (
    <MainLayout
      title="Attendance History"
      subtitle={`Attendance record of ${student.name}`}
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
              {student.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Student Details */}

            <div>
              <h2 className="text-xl font-semibold text-text">
                {student.name}
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Roll Number: {student.rollNumber}
              </p>

              <p className="mt-1 text-sm text-text-muted">
                {student.course} • {student.batch}
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            Attendance Summary
        ==================================================== */}

        <AttendanceSummary
          totalDays={totalDays}
          presentDays={presentDays}
          absentDays={absentDays}
          leaveDays={leaveDays}
        />

        {/* ====================================================
            Attendance History
        ==================================================== */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-text">
            Attendance History
          </h2>

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
                      key={`${record.date}-${index}`}
                      className="
                        border-b
                        border-border
                        last:border-b-0
                        hover:bg-background
                      "
                    >

                      {/* Date */}

                      <td className="px-4 py-3 text-sm text-text">
                        {record.date}
                      </td>

                      {/* Day */}

                      <td className="px-4 py-3 text-sm text-text">
                        {record.day}
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
        </div>

      </div>
    </MainLayout>
  );
}

export default AttendanceHistory;