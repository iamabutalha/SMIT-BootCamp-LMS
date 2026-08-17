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
  async (taskPayload, { rejectWithValue }) => {
    try {
      console.log("Creating task with payload:", taskPayload);
      const newTask = await taskService.createTask(taskPayload);
      console.log("Task created successfully:", newTask);
      
      return newTask;
    } catch (error) {
      console.error("Task creation error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create task";
      console.error("Error message:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskPayload }, { rejectWithValue }) => {
    try {
      console.log("Updating task:", { id, taskPayload });
      const updatedTask = await taskService.updateTask(id, taskPayload);
      console.log("Task updated successfully:", updatedTask);
      return updatedTask;
    } catch (error) {
      console.error("Task update error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update task";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTaskStatusThunk = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log("Updating task status:", { id, status });
      const updatedTask = await taskService.updateTaskStatus(id, status);
      console.log("Task status updated successfully:", updatedTask);
      return updatedTask;
    } catch (error) {
      console.error("Task status update error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update status";
      return rejectWithValue(errorMessage);
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
        console.log("Redux - Task created successfully:", action.payload);
        state.actionLoading = false;
        state.taskModalOpen = false;
        
        // Add new task to the beginning of the list
        if (action.payload) {
          state.tasks = [action.payload, ...state.tasks];
          console.log("Redux - Updated tasks array length:", state.tasks.length);
        }
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
        console.log("Redux - Task updated:", action.payload);
        state.actionLoading = false;
        state.taskModalOpen = false;
        
        // Update task in the list
        state.tasks = state.tasks.map((t) => {
          if (t.id === action.payload.id || t._id === action.payload.id || t.id === action.payload._id) {
            return action.payload;
          }
          return t;
        });
        
        // Update selected task if it's the same one
        if (state.selectedTask && (
          state.selectedTask.id === action.payload.id || 
          state.selectedTask._id === action.payload.id ||
          state.selectedTask.id === action.payload._id
        )) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // updateTaskStatusThunk
      .addCase(updateTaskStatusThunk.pending, (state) => {
        console.log("Redux - Updating task status...");
      })
      .addCase(updateTaskStatusThunk.fulfilled, (state, action) => {
        console.log("Redux - Task status updated:", action.payload);
        console.log("Redux - Looking for task with ID:", action.payload.id);
        console.log("Redux - Current tasks IDs:", state.tasks.map(t => t.id));
        
        // Update task in the list
        state.tasks = state.tasks.map((t) => {
          if (t.id === action.payload.id || t._id === action.payload.id || t.id === action.payload._id) {
            console.log("Redux - Found matching task, updating:", t.id);
            return action.payload;
          }
          return t;
        });
        
        // Update selected task if it's the same one
        if (state.selectedTask && (
          state.selectedTask.id === action.payload.id || 
          state.selectedTask._id === action.payload.id ||
          state.selectedTask.id === action.payload._id
        )) {
          state.selectedTask = action.payload;
        }
        
        console.log("Redux - Tasks after status update:", state.tasks.length);
      })
      .addCase(updateTaskStatusThunk.rejected, (state, action) => {
        console.error("Redux - Task status update failed:", action.payload);
        state.actionError = action.payload;
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
