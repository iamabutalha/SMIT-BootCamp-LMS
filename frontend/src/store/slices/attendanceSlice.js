import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import attendanceService from "../../services/attendanceService";

// ============================================================
// Async Thunks
// ============================================================

export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const data = await attendanceService.getAttendance();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load attendance records"
      );
    }
  }
);

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
    setAttendance: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },

    addAttendance: (state, action) => {
      state.data.push(action.payload);
    },

    updateAttendance: (state, action) => {
      const updatedAttendance = action.payload;
      const index = state.data.findIndex(
        (att) => att.id === updatedAttendance.id || att._id === updatedAttendance._id
      );

      if (index !== -1) {
        state.data[index] = updatedAttendance;
      }
    },

    deleteAttendance: (state, action) => {
      state.data = state.data.filter(
        (att) => att.id !== action.payload && att._id !== action.payload
      );
    },

    setAttendanceLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAttendanceError: (state, action) => {
      state.error = action.payload;
    },

    clearAttendanceError: (state) => {
      state.error = null;
    },

    clearAttendance: (state) => {
      state.data = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load attendance records";
      });
  },
});

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

export default attendanceSlice.reducer;