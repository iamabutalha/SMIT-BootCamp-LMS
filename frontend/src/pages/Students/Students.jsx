import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./StudentDetails";

import {
  addStudent,
  updateStudent,
  setSelectedStudent,
  clearSelectedStudent,
} from "../../store/slices/studentsSlice";

// ============================================================
// Students Component
// ============================================================

function Students() {
  // ==========================================================
  // Redux
  // ==========================================================

  const dispatch = useDispatch();

  const students = useSelector(
    (state) => state.students.data
  );

  const selectedStudent = useSelector(
    (state) => state.students.selectedStudent
  );

  // ==========================================================
  // Local UI State
  // ==========================================================

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Student currently being edited
  const [editingStudent, setEditingStudent] = useState(null);

  // ==========================================================
  // Search Students
  // ==========================================================

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return students;
    }

    return students.filter((student) => {
      return (
        student.rollNumber
          ?.toLowerCase()
          .includes(searchValue) ||

        student.name
          ?.toLowerCase()
          .includes(searchValue) ||

        student.course
          ?.toLowerCase()
          .includes(searchValue) ||

        student.batch
          ?.toLowerCase()
          .includes(searchValue) ||

        student.team
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [students, search]);

  // ==========================================================
  // Add Student
  // ==========================================================

  const handleAddStudent = (studentData) => {
    const newStudent = {
      id: Date.now(),
      ...studentData,
    };

    dispatch(addStudent(newStudent));

    setShowForm(false);
  };

  // ==========================================================
  // View Student
  // ==========================================================

  const handleViewStudent = (student) => {
    dispatch(setSelectedStudent(student));
  };

  // ==========================================================
  // Edit Student
  // ==========================================================

  const handleEditStudent = (student) => {
    // Student ko edit mode mein store karo
    setEditingStudent(student);

    // Form open karo
    setShowForm(true);
  };

  // ==========================================================
  // Update Student
  // ==========================================================

  const handleUpdateStudent = (studentData) => {
    const updatedStudent = {
      ...editingStudent,
      ...studentData,
    };

    // Redux mein student update
    dispatch(updateStudent(updatedStudent));

    // Form close
    setShowForm(false);

    // Edit mode clear
    setEditingStudent(null);
  };

  // ==========================================================
  // Close Form
  // ==========================================================

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // ==========================================================
  // Close Student Details
  // ==========================================================

  const handleCloseDetails = () => {
    dispatch(clearSelectedStudent());
  };

  // ==========================================================
  // Student Details
  // ==========================================================

  if (selectedStudent) {
    return (
      <StudentDetails
        student={selectedStudent}
        onBack={handleCloseDetails}
      />
    );
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <MainLayout
      title="Students"
      subtitle="View and manage all bootcamp students"
    >
      <div className="space-y-6">

        {/* ==================================================
            Page Header
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-semibold text-text">
              Student List
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              Manage students and view their complete profiles.
            </p>
          </div>

          {/* Add Student */}

          <button
            type="button"
            onClick={() => {
              // Add mode
              setEditingStudent(null);

              // Open form
              setShowForm(true);
            }}
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
            "
          >
            <Plus className="h-4 w-4" />
            Add Student
          </button>

        </div>

        {/* ==================================================
            Search
        ================================================== */}

        <div className="rounded-xl border border-border bg-surface p-4">

          <div className="relative max-w-md">

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
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>

        </div>

        {/* ==================================================
            Student Table
        ================================================== */}

        <StudentTable
          students={filteredStudents}
          onView={handleViewStudent}
          onEdit={handleEditStudent}
        />

        {/* ==================================================
            Add / Edit Student Form
        ================================================== */}

        {showForm && (
          <StudentForm
            student={editingStudent}
            onSubmit={
              editingStudent
                ? handleUpdateStudent
                : handleAddStudent
            }
            onClose={handleCloseForm}
          />
        )}

      </div>
    </MainLayout>
  );
}

export default Students;