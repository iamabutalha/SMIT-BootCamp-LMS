import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Users } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./StudentDetails";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  setSelectedStudent,
  clearSelectedStudent,
} from "../../store/slices/studentsSlice";

function Students() {
  const dispatch = useAppDispatch();
  const { data: students, loading, error, selectedStudent } = useAppSelector(
    (state) => state.students
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return students || [];
    }

    return (students || []).filter((student) => {
      return (
        student.rollNumber?.toLowerCase().includes(searchValue) ||
        student.name?.toLowerCase().includes(searchValue) ||
        student.course?.toLowerCase().includes(searchValue) ||
        student.batch?.toLowerCase().includes(searchValue) ||
        student.team?.toLowerCase().includes(searchValue)
      );
    });
  }, [students, search]);

  const handleAddStudent = (studentData) => {
    const newStudent = {
      id: Date.now(),
      ...studentData,
    };
    dispatch(addStudent(newStudent));
    setShowForm(false);
  };

  const handleViewStudent = (student) => {
    dispatch(setSelectedStudent(student));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleUpdateStudent = (studentData) => {
    const updatedStudent = {
      ...editingStudent,
      ...studentData,
    };
    dispatch(updateStudent(updatedStudent));
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedStudent());
  };

  if (selectedStudent) {
    return (
      <StudentDetails
        student={selectedStudent}
        onBack={handleCloseDetails}
      />
    );
  }

  return (
    <MainLayout
      title="Students"
      subtitle="View and manage all bootcamp students"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Student List</h2>
            <p className="mt-1 text-sm text-text-muted">
              Manage students and view their complete profiles.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </button>
        </div>

        {/* Search */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by roll number or name..."
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Dynamic Content States */}
        {loading ? (
          <LoadingState message="Loading student records from server..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => dispatch(fetchStudents())}
          />
        ) : filteredStudents.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-4">
            <EmptyState
              icon={Users}
              title="No students found"
              description="No student records match your filter criteria or database is empty."
            />
          </div>
        ) : (
          <StudentTable
            students={filteredStudents}
            onView={handleViewStudent}
            onEdit={handleEditStudent}
          />
        )}

        {/* Form Modal */}
        {showForm && (
          <StudentForm
            student={editingStudent}
            onSubmit={
              editingStudent ? handleUpdateStudent : handleAddStudent
            }
            onClose={handleCloseForm}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Students;