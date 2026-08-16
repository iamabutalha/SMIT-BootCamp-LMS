import { useState } from "react";
import { X } from "lucide-react";

// ============================================================
// Student Form
// Used for adding a new student.
// ============================================================

function StudentForm({ onSubmit, onClose }) {
  // ----------------------------------------------------------
  // Form state
  // ----------------------------------------------------------

  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    course: "",
    batch: "",
    team: "",
  });

  // ----------------------------------------------------------
  // Handle input changes
  // ----------------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // ----------------------------------------------------------
  // Submit form
  // ----------------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation for 6-digit Roll Number.
    if (!/^\d{6}$/.test(formData.rollNumber)) {
      alert("Roll Number must contain exactly 6 digits.");
      return;
    }

    onSubmit(formData);
  };

  // ==========================================================
  // UI
  // ==========================================================

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
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-surface
          shadow-xl
        "
      >

        {/* ==================================================
            Modal Header
        ================================================== */}

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
              Add Student
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Enter student information below.
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

        {/* ==================================================
            Form
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Roll Number */}

          <div>
            <label
              htmlFor="rollNumber"
              className="mb-2 block text-sm font-medium text-text"
            >
              Roll Number
            </label>

            <input
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              maxLength={6}
              inputMode="numeric"
              placeholder="e.g. 102341"
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
              required
            />
          </div>

          {/* Student Name */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-text"
            >
              Student Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
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
              required
            />
          </div>

          {/* Course */}

          <div>
            <label
              htmlFor="course"
              className="mb-2 block text-sm font-medium text-text"
            >
              Course
            </label>

            <input
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Web & App Development"
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
              required
            />
          </div>

          {/* Batch */}

          <div>
            <label
              htmlFor="batch"
              className="mb-2 block text-sm font-medium text-text"
            >
              Batch
            </label>

            <input
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="Batch 01"
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
              required
            />
          </div>

          {/* Team */}

          <div>
            <label
              htmlFor="team"
              className="mb-2 block text-sm font-medium text-text"
            >
              Team
            </label>

            <input
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
              placeholder="Team 01"
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
              required
            />
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
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;