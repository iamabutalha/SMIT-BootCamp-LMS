import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import AttendanceTable from "./components/AttendanceTable";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceHistory from "./AttendanceHistory";

// ============================================================
// Demo Attendance Data
// Later this data will come from the backend API.
// ============================================================

const initialAttendance = [
  {
    id: 1,
    rollNumber: "102341",
    name: "Ali Khan",
    course: "Web & App Development",
    batch: "Batch 01",
    status: "Present",
  },
  {
    id: 2,
    rollNumber: "102342",
    name: "Ahmed Ali",
    course: "Web & App Development",
    batch: "Batch 01",
    status: "Absent",
  },
  {
    id: 3,
    rollNumber: "102343",
    name: "Hamza Khan",
    course: "Web & App Development",
    batch: "Batch 02",
    status: "Present",
  },
  {
    id: 4,
    rollNumber: "102344",
    name: "Usman Ahmed",
    course: "Web & App Development",
    batch: "Batch 02",
    status: "Leave",
  },
  {
    id: 5,
    rollNumber: "102345",
    name: "Hassan Raza",
    course: "Web & App Development",
    batch: "Batch 03",
    status: "Present",
  },
];

// ============================================================
// Attendance Component
// ============================================================

function Attendance() {
  // ==========================================================
  // Attendance State
  // ==========================================================

  const [attendance, setAttendance] = useState(initialAttendance);

  // ==========================================================
  // Search State
  // ==========================================================

  const [search, setSearch] = useState("");

  // ==========================================================
  // Filter State
  // ==========================================================

  const [filter, setFilter] = useState("Daily");

  // ==========================================================
  // Form Visibility State
  // ==========================================================

  const [showForm, setShowForm] = useState(false);

  // ==========================================================
  // Selected Student State
  // Used for attendance history.
  // ==========================================================

  const [selectedStudent, setSelectedStudent] = useState(null);

  // ==========================================================
  // Filter Attendance
  // ==========================================================

  const filteredAttendance = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return attendance;
    }

    return attendance.filter((student) => {
      return (
        student.rollNumber.toLowerCase().includes(searchValue) ||
        student.name.toLowerCase().includes(searchValue) ||
        student.course.toLowerCase().includes(searchValue) ||
        student.batch.toLowerCase().includes(searchValue)
      );
    });
  }, [attendance, search]);

  // ==========================================================
  // Mark Attendance
  // ==========================================================

  const handleMarkAttendance = (attendanceData) => {
    const existingStudent = attendance.find(
      (student) =>
        student.rollNumber === attendanceData.rollNumber
    );

    // --------------------------------------------------------
    // Update Existing Attendance
    // --------------------------------------------------------

    if (existingStudent) {
      setAttendance((currentAttendance) =>
        currentAttendance.map((student) =>
          student.rollNumber === attendanceData.rollNumber
            ? {
                ...student,
                status: attendanceData.status,
              }
            : student
        )
      );

      setShowForm(false);
      return;
    }

    // --------------------------------------------------------
    // Add New Attendance Record
    // --------------------------------------------------------

    const newAttendance = {
      id: Date.now(),
      rollNumber: attendanceData.rollNumber,
      name: attendanceData.name,
      course: attendanceData.course,
      batch: attendanceData.batch,
      status: attendanceData.status,
    };

    setAttendance((currentAttendance) => [
      ...currentAttendance,
      newAttendance,
    ]);

    setShowForm(false);
  };

  // ==========================================================
  // Edit Attendance
  // ==========================================================

  const handleEditAttendance = (student) => {
    setShowForm({
      mode: "edit",
      student,
    });
  };

  // ==========================================================
  // View Student Attendance History
  // ==========================================================

  const handleViewHistory = (student) => {
    setSelectedStudent(student);
  };

  // ==========================================================
  // Close Attendance History
  // ==========================================================

  const handleCloseHistory = () => {
    setSelectedStudent(null);
  };

  // ==========================================================
  // Attendance History Screen
  // ==========================================================

  if (selectedStudent) {
    return (
      <AttendanceHistory
        student={selectedStudent}
        onBack={handleCloseHistory}
      />
    );
  }

  // ==========================================================
  // Main Attendance UI
  // ==========================================================

  return (
    <MainLayout
      title="Attendance"
      subtitle="Manage daily student attendance"
    >
      <div className="space-y-6">

        {/* ====================================================
            Page Header
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2 className="text-xl font-semibold text-text">
              Today's Attendance
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              View and manage student attendance records.
            </p>
          </div>

          {/* ==================================================
              Mark Attendance Button
          ================================================== */}

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-primary/90
              focus:outline-none
              focus:ring-2
              focus:ring-primary/20
            "
          >
            <Plus className="h-4 w-4" />
            Mark Attendance
          </button>
        </div>

        {/* ====================================================
            Filters Section
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            rounded-xl
            border
            border-border
            bg-surface
            p-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-text-muted
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by roll number or name..."
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                py-2.5
                pl-10
                pr-3
                text-sm
                text-text
                outline-none
                transition
                placeholder:text-text-muted
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Attendance Period Filter */}

          <div className="flex flex-wrap gap-2">

            {["Daily", "Weekly", "Monthly"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    filter === option
                      ? "bg-primary text-white"
                      : "border border-border bg-surface text-text-muted hover:bg-background"
                  }
                `}
              >
                {option}
              </button>
            ))}

          </div>
        </div>

        {/* ====================================================
            Current Filter Information
        ==================================================== */}

        <div>
          <p className="text-sm text-text-muted">
            Showing{" "}
            <span className="font-semibold text-text">
              {filter}
            </span>{" "}
            attendance records
          </p>
        </div>

        {/* ====================================================
            Attendance Table
        ==================================================== */}

        <AttendanceTable
          attendance={filteredAttendance}
          onEdit={handleEditAttendance}
          onViewHistory={handleViewHistory}
        />

        {/* ====================================================
            Attendance Form
        ==================================================== */}

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