import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../../services/studentService";

// ============================================================
// Async Thunks
// ============================================================

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await studentService.getStudents();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load students"
      );
    }
  }
);

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
    setStudents: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },

    addStudent: (state, action) => {
      state.data.push(action.payload);
    },

    updateStudent: (state, action) => {
      const updatedStudent = action.payload;
      const index = state.data.findIndex(
        (student) => student.id === updatedStudent.id || student._id === updatedStudent._id
      );

      if (index !== -1) {
        state.data[index] = updatedStudent;
      }
    },

    deleteStudent: (state, action) => {
      state.data = state.data.filter(
        (student) => student.id !== action.payload && student._id !== action.payload
      );
    },

    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },

    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },

    setStudentsLoading: (state, action) => {
      state.loading = action.payload;
    },

    setStudentsError: (state, action) => {
      state.error = action.payload;
    },

    clearStudentsError: (state) => {
      state.error = null;
    },

    clearStudents: (state) => {
      state.data = [];
      state.selectedStudent = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load students";
      });
  },
});

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

export default studentsSlice.reducer;