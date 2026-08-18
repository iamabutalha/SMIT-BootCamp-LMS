import {
  ArrowLeft,
  CalendarCheck,
  ClipboardList,
  Users,
} from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";

// ============================================================
// Student Details Component
// Displays the complete profile of a selected student.
// ============================================================

function StudentDetails({ student, onBack }) {
  const studentName = typeof student?.name === "string" ? student.name : "Unknown Student";
  const studentRoll = typeof student?.rollNumber === "string" ? student.rollNumber : "-";
  const studentCourse = typeof student?.course === "string" ? student.course : "-";
  const studentBatch = typeof student?.batch === "string" ? student.batch : "-";
  const studentTeam = student?.team && typeof student.team === "object"
    ? (typeof student.team.name === "string" ? student.team.name : "No Team")
    : (typeof student?.team === "string" ? student.team : "No Team");

  console.log("StudentDetails student:", student);

  return (
    <MainLayout
      title="Student Details"
      subtitle="View complete student profile"
    >
      <div className="space-y-6">

        {/* ==================================================
            Back Button
        ================================================== */}

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
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </button>

        {/* ==================================================
            Student Profile Card
        ================================================== */}

        <div
          className="
            rounded-2xl
            border
            border-border
            bg-surface
            p-6
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Student Avatar */}

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-xl
                font-bold
                text-white
              "
            >
              {studentName.charAt(0).toUpperCase()}
            </div>

            {/* Student Name */}

            <div>
              <h2 className="text-2xl font-bold text-text">
                {studentName}
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                 Roll Number: {studentRoll}
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            Student Information
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
          "
        >
          <InfoCard
            label="Roll Number"
            value={studentRoll}
          />

          <InfoCard
            label="Course"
            value={studentCourse}
          />

          <InfoCard
            label="Batch"
            value={studentBatch}
          />

          <InfoCard
            label="Team"
            value={studentTeam}
          />
        </div>

        {/* ==================================================
            Student Related Sections
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
        >
          <ActionCard
            icon={CalendarCheck}
            title="Attendance History"
            description="View student's attendance records."
          />

          <ActionCard
            icon={ClipboardList}
            title="Task History"
            description="View student's task history."
          />

          <ActionCard
            icon={Users}
            title="Assigned Team"
            description="View student's assigned team."
          />
        </div>

      </div>
    </MainLayout>
  );
}

// ============================================================
// Information Card
// ============================================================

function InfoCard({ label, value }) {
  const displayValue = value == null ? "-" : String(value);

  return (
    <div
      className="
        rounded-xl
        border
        border-border
        bg-surface
        p-5
      "
    >
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-text">
        {displayValue}
      </p>
    </div>
  );
}

// ============================================================
// Action Card
// ============================================================

function ActionCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="
        rounded-xl
        border
        border-border
        bg-surface
        p-5
        text-left
        transition
        hover:border-primary
        hover:shadow-sm
      "
    >
      <div
        className="
          mb-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-primary/10
          text-primary
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="font-semibold text-text">
        {title}
      </h3>

      <p className="mt-1 text-sm text-text-muted">
        {description}
      </p>
    </button>
  );
}

export default StudentDetails;