import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// Attendance Initial State
// ============================================================

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// ============================================================
// Attendance Slice
// ============================================================

const attendanceSlice = createSlice({
  name: "attendance",

  initialState,

  reducers: {
    // --------------------------------------------------------
    // Set attendance records
    // --------------------------------------------------------

    setAttendance: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },

    // --------------------------------------------------------
    // Add attendance record
    // --------------------------------------------------------

    addAttendance: (state, action) => {
      state.data.push(action.payload);
    },

    // --------------------------------------------------------
    // Update attendance record
    // --------------------------------------------------------

    updateAttendance: (state, action) => {
      const updatedAttendance = action.payload;

      const index = state.data.findIndex(
        (attendance) => attendance.id === updatedAttendance.id
      );

      if (index !== -1) {
        state.data[index] = updatedAttendance;
      }
    },

    // --------------------------------------------------------
    // Delete attendance record
    // --------------------------------------------------------

    deleteAttendance: (state, action) => {
      state.data = state.data.filter(
        (attendance) => attendance.id !== action.payload
      );
    },

    // --------------------------------------------------------
    // Loading
    // --------------------------------------------------------

    setAttendanceLoading: (state, action) => {
      state.loading = action.payload;
    },

    // --------------------------------------------------------
    // Error
    // --------------------------------------------------------

    setAttendanceError: (state, action) => {
      state.error = action.payload;
    },

    // --------------------------------------------------------
    // Clear error
    // --------------------------------------------------------

    clearAttendanceError: (state) => {
      state.error = null;
    },

    // --------------------------------------------------------
    // Clear attendance
    // --------------------------------------------------------

    clearAttendance: (state) => {
      state.data = [];
      state.error = null;
    },
  },
});

// ============================================================
// Actions
// ============================================================

export const {
  setAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  setAttendanceLoading,
  setAttendanceError,
  clearAttendanceError,
  clearAttendance,
} = attendanceSlice.actions;

// ============================================================
// Reducer
// ============================================================

export default attendanceSlice.reducer;