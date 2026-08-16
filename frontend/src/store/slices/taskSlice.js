import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../../services/taskService";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (filters, { rejectWithValue }) => {
    try {
      const tasks = await taskService.getTasks(filters);
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch tasks");
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "tasks/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const students = await taskService.getStudents();
      return students;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch students");
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (taskPayload, { rejectWithValue, dispatch }) => {
    try {
      const newTask = await taskService.createTask(taskPayload);
      return newTask;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create task");
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskPayload }, { rejectWithValue }) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskPayload);
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update task");
    }
  }
);

export const updateTaskStatusThunk = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(id, status);
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update status");
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete task");
    }
  }
);

export const fetchStudentHistory = createAsyncThunk(
  "tasks/fetchStudentHistory",
  async ({ studentId, viewType, date }, { rejectWithValue }) => {
    try {
      const historyData = await taskService.getStudentHistory(
        studentId,
        viewType,
        date
      );
      return historyData;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch student task history"
      );
    }
  }
);

const initialState = {
  tasks: [],
  students: [],
  historyData: null,
  filters: {
    studentId: "",
    status: "",
    date: "",
  },
  loading: false,
  error: null,

  // Modals UI state
  taskModalOpen: false,
  detailModalOpen: false,
  deleteModalOpen: false,
  historyModalOpen: false,

  selectedTask: null,
  deletingTask: null,
  historyStudent: null,
  historyViewType: "daily",
  historyDate: new Date().toISOString().split("T")[0],

  actionLoading: false,
  actionError: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { studentId: "", status: "", date: "" };
    },
    openCreateTaskModal: (state) => {
      state.selectedTask = null;
      state.actionError = null;
      state.taskModalOpen = true;
    },
    openEditTaskModal: (state, action) => {
      state.selectedTask = action.payload;
      state.actionError = null;
      state.taskModalOpen = true;
    },
    closeTaskModal: (state) => {
      state.taskModalOpen = false;
      state.selectedTask = null;
      state.actionError = null;
    },
    openDetailModal: (state, action) => {
      state.selectedTask = action.payload;
      state.detailModalOpen = true;
    },
    closeDetailModal: (state) => {
      state.detailModalOpen = false;
      state.selectedTask = null;
    },
    openDeleteModal: (state, action) => {
      state.deletingTask = action.payload;
      state.actionError = null;
      state.deleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModalOpen = false;
      state.deletingTask = null;
      state.actionError = null;
    },
    openHistoryModal: (state, action) => {
      state.historyStudent = action.payload;
      state.historyModalOpen = true;
    },
    closeHistoryModal: (state) => {
      state.historyModalOpen = false;
      state.historyStudent = null;
      state.historyData = null;
    },
    setHistoryViewType: (state, action) => {
      state.historyViewType = action.payload;
    },
    setHistoryDate: (state, action) => {
      state.historyDate = action.payload;
    },
    clearActionError: (state) => {
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchStudents
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })

      // createTaskThunk
      .addCase(createTaskThunk.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.taskModalOpen = false;
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // updateTaskThunk
      .addCase(updateTaskThunk.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.taskModalOpen = false;
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // updateTaskStatusThunk
      .addCase(updateTaskStatusThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })

      // deleteTaskThunk
      .addCase(deleteTaskThunk.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.deleteModalOpen = false;
        state.deletingTask = null;
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // fetchStudentHistory
      .addCase(fetchStudentHistory.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(fetchStudentHistory.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.historyData = action.payload;
      })
      .addCase(fetchStudentHistory.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  openCreateTaskModal,
  openEditTaskModal,
  closeTaskModal,
  openDetailModal,
  closeDetailModal,
  openDeleteModal,
  closeDeleteModal,
  openHistoryModal,
  closeHistoryModal,
  setHistoryViewType,
  setHistoryDate,
  clearActionError,
} = taskSlice.actions;

export default taskSlice.reducer;
