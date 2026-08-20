import apiClient from "./apiClient";
import { formatDMY } from "../utils/dateUtils";

// ============================================================
// Helper to sanitize & format task object from API
// ============================================================
const cleanTask = (task) => {
  if (!task) return task;
  return {
    ...task,
    id: task._id || task.id,
    studentId: task.student?._id || task.student,
    studentName: task.student?.name || task.studentName,
    rollNumber: task.student?.rollNumber || task.rollNumber,
    dueDate: formatDMY(task.dueDate),
  };
};

// ============================================================
// Task Service - All operations fetch from database
// ============================================================

const taskService = {
  // Fetch all students for task assignment dropdown
  getStudents: async () => {
    const response = await apiClient.get("/students");
    const students = response.data?.data || response.data || [];
    
    return students.map(student => ({
      ...student,
      id: student._id || student.id
    }));
  },

  // Fetch tasks with optional filtering
  getTasks: async (filters = {}) => {
    const response = await apiClient.get("/tasks", { params: filters });
    const tasks = response.data?.data || response.data || [];
    return tasks.map(cleanTask);
  },

  // Get single task by ID
  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    const task = response.data?.data || response.data;
    return cleanTask(task);
  },

  // Create new task
  createTask: async (taskPayload) => {
    const payload = {
      student: taskPayload.studentId || taskPayload.student,
      title: taskPayload.title,
      description: taskPayload.description,
      dueDate: taskPayload.dueDate,
      status: taskPayload.status || "Pending"
    };
    
    const response = await apiClient.post("/tasks", payload);
    const task = response.data?.data || response.data;
    return cleanTask(task);
  },

  // Update existing task
  updateTask: async (id, taskPayload) => {
    const payload = {
      ...taskPayload,
      student: taskPayload.studentId || taskPayload.student
    };
    delete payload.studentId;
    
    const response = await apiClient.put(`/tasks/${id}`, payload);
    const task = response.data?.data || response.data;
    return cleanTask(task);
  },

  // Quick status change
  updateTaskStatus: async (id, status) => {
    const response = await apiClient.put(`/tasks/${id}`, { status });
    const task = response.data?.data || response.data;
    return cleanTask(task);
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  // Get student task history
  getStudentHistory: async (studentId, viewType, date) => {
    const response = await apiClient.get(`/tasks/student/${studentId}/history`, {
      params: { viewType, date },
    });
    const historyData = response.data?.data || response.data;
    if (historyData && Array.isArray(historyData.tasks)) {
      historyData.tasks = historyData.tasks.map(cleanTask);
    }
    return historyData;
  },
};

export default taskService;
