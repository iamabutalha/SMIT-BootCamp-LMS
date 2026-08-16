import { useEffect, useState } from "react";
import { X } from "lucide-react";

// ============================================================
// Attendance Form
// Used to mark or edit student attendance.
// ============================================================

function AttendanceForm({
  mode = "add",
  student = null,
  onSubmit,
  onClose,
}) {
  // ==========================================================
  // Form State
  // ==========================================================

  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    course: "Web & App Development",
    batch: "Batch 01",
    status: "Present",
  });

  // ==========================================================
  // Load Existing Student Data
  // ==========================================================

  useEffect(() => {
    if (student) {
      setFormData({
        rollNumber: student.rollNumber || "",
        name: student.name || "",
        course:
          student.course || "Web & App Development",
        batch: student.batch || "Batch 01",
        status: student.status || "Present",
      });
    }
  }, [student]);

  // ==========================================================
  // Input Change Handler
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // ==========================================================
  // Submit Handler
  // ==========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    // --------------------------------------------------------
    // Basic Roll Number Validation
    // --------------------------------------------------------

    if (!/^\d{6}$/.test(formData.rollNumber)) {
      alert("Roll Number must contain exactly 6 digits.");
      return;
    }

    // --------------------------------------------------------
    // Submit Form
    // --------------------------------------------------------

    onSubmit(formData);
  };

  // ==========================================================
  // Form Title
  // ==========================================================

  const title =
    mode === "edit"
      ? "Edit Attendance"
      : "Mark Attendance";

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      {/* ======================================================
          Modal
      ====================================================== */}

      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-surface
          shadow-xl
        "
      >

        {/* ====================================================
            Modal Header
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-border
            px-6
            py-4
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-text">
              {title}
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Select attendance status for the student.
            </p>
          </div>

          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-text-muted
              transition
              hover:bg-background
              hover:text-text
            "
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ====================================================
            Form
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Roll Number */}

          <div>
            <label
              htmlFor="rollNumber"
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-text
              "
            >
              Roll Number
            </label>

            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              value={formData.rollNumber}
              onChange={handleChange}
              maxLength={6}
              placeholder="e.g. 102341"
              disabled={mode === "edit"}
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                px-3
                py-2.5
                text-sm
                text-text
                outline-none
                transition
                placeholder:text-text-muted
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
                disabled:bg-background
              "
            />

            <p className="mt-1 text-xs text-text-muted">
              Enter the student's 6-digit Roll Number.
            </p>
          </div>

          {/* Student Name */}

          <div>
            <label
              htmlFor="name"
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-text
              "
            >
              Student Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Student name"
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                px-3
                py-2.5
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

          {/* Course */}

          <div>
            <label
              htmlFor="course"
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-text
              "
            >
              Course
            </label>

            <input
              id="course"
              name="course"
              type="text"
              value={formData.course}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                px-3
                py-2.5
                text-sm
                text-text
                outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Batch */}

          <div>
            <label
              htmlFor="batch"
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-text
              "
            >
              Batch
            </label>

            <select
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                px-3
                py-2.5
                text-sm
                text-text
                outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            >
              <option value="Batch 01">Batch 01</option>
              <option value="Batch 02">Batch 02</option>
              <option value="Batch 03">Batch 03</option>
            </select>
          </div>

          {/* Attendance Status */}

          <div>
            <label
              htmlFor="status"
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-text
              "
            >
              Attendance Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                px-3
                py-2.5
                text-sm
                text-text
                outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          {/* ==================================================
              Form Actions
          ================================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              pt-2
              sm:flex-row
              sm:justify-end
            "
          >
            {/* Cancel */}

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border
                border-border
                px-4
                py-2.5
                text-sm
                font-medium
                text-text
                transition
                hover:bg-background
              "
            >
              Cancel
            </button>

            {/* Submit */}

            <button
              type="submit"
              className="
                rounded-lg
                bg-primary
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-primary/90
              "
            >
              {mode === "edit"
                ? "Update Attendance"
                : "Mark Attendance"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AttendanceForm;