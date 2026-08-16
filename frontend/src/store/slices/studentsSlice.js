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

export const addStudentThunk = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const newStudent = await studentService.createStudent(studentData);
      return newStudent;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create student in database"
      );
    }
  }
);

export const updateStudentThunk = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const updated = await studentService.updateStudent(id, studentData);
      return updated;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update student in database"
      );
    }
  }
);

export const deleteStudentThunk = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete student from database"
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
        (student) =>
          student.id === updatedStudent.id ||
          student._id === updatedStudent._id
      );

      if (index !== -1) {
        state.data[index] = updatedStudent;
      }
    },

    deleteStudent: (state, action) => {
      state.data = state.data.filter(
        (student) =>
          student.id !== action.payload &&
          student._id !== action.payload
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
      // fetchStudents
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
      })
      // addStudentThunk
      .addCase(addStudentThunk.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })
      // updateStudentThunk
      .addCase(updateStudentThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.data.findIndex(
          (s) => s._id === updated._id || s.id === updated.id
        );
        if (index !== -1) {
          state.data[index] = updated;
        }
      })
      // deleteStudentThunk
      .addCase(deleteStudentThunk.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.data = state.data.filter(
          (s) => s._id !== deletedId && s.id !== deletedId
        );
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