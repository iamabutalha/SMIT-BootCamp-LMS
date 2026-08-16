import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// Students Initial State
// ============================================================

const initialState = {
  data: [],
  loading: false,
  error: null,
  selectedStudent: null,
};

// ============================================================
// Students Slice
// ============================================================

const studentsSlice = createSlice({
  name: "students",

  initialState,

  reducers: {
    // --------------------------------------------------------
    // Set all students
    // --------------------------------------------------------

    setStudents: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },

    // --------------------------------------------------------
    // Add student
    // --------------------------------------------------------

    addStudent: (state, action) => {
      state.data.push(action.payload);
    },

    // --------------------------------------------------------
    // Update student
    // --------------------------------------------------------

    updateStudent: (state, action) => {
      const updatedStudent = action.payload;

      const index = state.data.findIndex(
        (student) => student.id === updatedStudent.id
      );

      if (index !== -1) {
        state.data[index] = updatedStudent;
      }
    },

    // --------------------------------------------------------
    // Delete student
    // --------------------------------------------------------

    deleteStudent: (state, action) => {
      state.data = state.data.filter(
        (student) => student.id !== action.payload
      );
    },

    // --------------------------------------------------------
    // Select single student
    // --------------------------------------------------------

    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },

    // --------------------------------------------------------
    // Clear selected student
    // --------------------------------------------------------

    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },

    // --------------------------------------------------------
    // Loading
    // --------------------------------------------------------

    setStudentsLoading: (state, action) => {
      state.loading = action.payload;
    },

    // --------------------------------------------------------
    // Error
    // --------------------------------------------------------

    setStudentsError: (state, action) => {
      state.error = action.payload;
    },

    // --------------------------------------------------------
    // Clear error
    // --------------------------------------------------------

    clearStudentsError: (state) => {
      state.error = null;
    },

    // --------------------------------------------------------
    // Clear all students
    // --------------------------------------------------------

    clearStudents: (state) => {
      state.data = [];
      state.selectedStudent = null;
      state.error = null;
    },
  },
});

// ============================================================
// Actions
// ============================================================

export const {
  setStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setSelectedStudent,
  clearSelectedStudent,
  setStudentsLoading,
  setStudentsError,
  clearStudentsError,
  clearStudents,
} = studentsSlice.actions;

// ============================================================
// Reducer
// ============================================================

export default studentsSlice.reducer;