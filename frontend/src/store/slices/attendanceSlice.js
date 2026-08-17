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

export const fetchStudentsForAttendance = createAsyncThunk(
  "attendance/fetchStudentsForAttendance",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await attendanceService.getStudentsForAttendance(params);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load students for attendance"
      );
    }
  }
);

export const markAttendanceThunk = createAsyncThunk(
  "attendance/markAttendance",
  async (attendanceData, { rejectWithValue }) => {
    try {
      const record = await attendanceService.createAttendance(attendanceData);
      return record;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark attendance in database"
      );
    }
  }
);

export const updateAttendanceThunk = createAsyncThunk(
  "attendance/updateAttendance",
  async ({ id, attendanceData }, { rejectWithValue }) => {
    try {
      const updated = await attendanceService.updateAttendance(id, attendanceData);
      return updated;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update attendance in database"
      );
    }
  }
);

// ============================================================
// Attendance Initial State
// ============================================================

const initialState = {
  data: [],
  studentsForMarking: [],
  loading: false,
  studentsLoading: false,
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
      })
      .addCase(fetchStudentsForAttendance.pending, (state) => {
        state.studentsLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentsForAttendance.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.studentsForMarking = action.payload;
      })
      .addCase(fetchStudentsForAttendance.rejected, (state, action) => {
        state.studentsLoading = false;
        state.error = action.payload || "Failed to load students";
      })
      .addCase(markAttendanceThunk.fulfilled, (state, action) => {
        const record = action.payload;
        const index = state.data.findIndex(
          (a) => a._id === record._id || a.id === record.id
        );
        if (index !== -1) {
          state.data[index] = record;
        } else {
          state.data.unshift(record);
        }
      })
      .addCase(updateAttendanceThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.data.findIndex(
          (a) => a._id === updated._id || a.id === updated.id
        );
        if (index !== -1) {
          state.data[index] = updated;
        }
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