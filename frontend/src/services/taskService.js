import apiClient from "./apiClient";

// Mock data fallback to ensure smooth operational frontend when backend API is offline
const INITIAL_STUDENTS = [
  { id: "std-1", name: "Ali Raza", rollNumber: "SMIT-2024-001", email: "ali.raza@example.com" },
  { id: "std-2", name: "Sara Ahmed", rollNumber: "SMIT-2024-002", email: "sara.ahmed@example.com" },
  { id: "std-3", name: "Usman Khan", rollNumber: "SMIT-2024-003", email: "usman.khan@example.com" },
  { id: "std-4", name: "Fatima Noor", rollNumber: "SMIT-2024-004", email: "fatima.noor@example.com" },
  { id: "std-5", name: "Zaid Hassan", rollNumber: "SMIT-2024-005", email: "zaid.hassan@example.com" },
];

const INITIAL_TASKS = [
  {
    id: "task-1",
    studentId: "std-1",
    studentName: "Ali Raza",
    rollNumber: "SMIT-2024-001",
    title: "React Fundamentals Assignment",
    description: "Build a responsive counter application using React hooks (useState, useEffect) and clean styling.",
    dueDate: "2026-08-20",
    status: "Completed",
    createdAt: "2026-08-10",
  },
  {
    id: "task-2",
    studentId: "std-2",
    studentName: "Sara Ahmed",
    rollNumber: "SMIT-2024-002",
    title: "Tailwind CSS Layout Implementation",
    description: "Design a dashboard layout using flexbox and grid utilities provided by Tailwind CSS.",
    dueDate: "2026-08-22",
    status: "In Progress",
    createdAt: "2026-08-12",
  },
  {
    id: "task-3",
    studentId: "std-3",
    studentName: "Usman Khan",
    rollNumber: "SMIT-2024-003",
    title: "Node.js REST API Endpoint Setup",
    description: "Create CRUD endpoints for student management with proper request validation and error handling.",
    dueDate: "2026-08-25",
    status: "Pending",
    createdAt: "2026-08-14",
  },
  {
    id: "task-4",
    studentId: "std-1",
    studentName: "Ali Raza",
    rollNumber: "SMIT-2024-001",
    title: "Redux Toolkit State Integration",
    description: "Connect global store with local state slices using Redux Toolkit and React-Redux hooks.",
    dueDate: "2026-08-18",
    status: "Pending",
    createdAt: "2026-08-11",
  },
  {
    id: "task-5",
    studentId: "std-4",
    studentName: "Fatima Noor",
    rollNumber: "SMIT-2024-004",
    title: "MongoDB Schema Design",
    description: "Design MongoDB collections and Mongoose schemas for LMS user authentication and courses.",
    dueDate: "2026-08-19",
    status: "Completed",
    createdAt: "2026-08-08",
  },
  {
    id: "task-6",
    studentId: "std-5",
    studentName: "Zaid Hassan",
    rollNumber: "SMIT-2024-005",
    title: "Express Middleware Implementation",
    description: "Write custom authorization and JWT verification middleware for protected admin routes.",
    dueDate: "2026-08-28",
    status: "In Progress",
    createdAt: "2026-08-13",
  },
];

// In-memory store for fallback offline state
let tasksData = [...INITIAL_TASKS];
let studentsData = [...INITIAL_STUDENTS];

const taskService = {
  // Fetch all students for options
  getStudents: async () => {
    try {
      const response = await apiClient.get("/students");
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback to local students data if API fails or endpoints don't exist
    }
    return studentsData;
  },

  // Fetch tasks with filtering options
  getTasks: async (filters = {}) => {
    try {
      const response = await apiClient.get("/tasks", { params: filters });
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback filtering on mock data
    }

    let filtered = [...tasksData];

    if (filters.studentId) {
      filtered = filtered.filter((t) => t.studentId === filters.studentId);
    }
    if (filters.status) {
      filtered = filtered.filter((t) => t.status === filters.status);
    }
    if (filters.date) {
      filtered = filtered.filter((t) => t.dueDate === filters.date);
    }

    return filtered;
  },

  // Get single task by ID
  getTaskById: async (id) => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback lookup
    }
    const task = tasksData.find((t) => t.id === id);
    if (!task) throw new Error("Task not found");
    return task;
  },

  // Create new task
  createTask: async (taskPayload) => {
    const student = studentsData.find((s) => s.id === taskPayload.studentId);
    const newTask = {
      id: `task-${Date.now()}`,
      studentId: taskPayload.studentId,
      studentName: student ? student.name : "Unknown Student",
      rollNumber: student ? student.rollNumber : "N/A",
      title: taskPayload.title,
      description: taskPayload.description,
      dueDate: taskPayload.dueDate,
      status: taskPayload.status || "Pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await apiClient.post("/tasks", newTask);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local save
    }

    tasksData = [newTask, ...tasksData];
    return newTask;
  },

  // Update existing task
  updateTask: async (id, taskPayload) => {
    const student = studentsData.find((s) => s.id === taskPayload.studentId);
    const updatedFields = {
      ...taskPayload,
      studentName: student ? student.name : taskPayload.studentName,
      rollNumber: student ? student.rollNumber : taskPayload.rollNumber,
    };

    try {
      const response = await apiClient.put(`/tasks/${id}`, updatedFields);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local update
    }

    tasksData = tasksData.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    const updated = tasksData.find((t) => t.id === id);
    return updated;
  },

  // Quick status change
  updateTaskStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/tasks/${id}/status`, { status });
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local update
    }

    tasksData = tasksData.map((t) => (t.id === id ? { ...t, status } : t));
    return tasksData.find((t) => t.id === id);
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
    } catch {
      // Fallback local delete
    }

    tasksData = tasksData.filter((t) => t.id !== id);
    return { success: true, id };
  },

  // Get student task history with daily, weekly, monthly filtering
  getStudentHistory: async (studentId, viewType = "daily", date = "") => {
    try {
      const response = await apiClient.get(`/tasks/student/${studentId}/history`, {
        params: { view: viewType, date },
      });
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback calculation
    }

    const studentTasks = tasksData.filter((t) => t.studentId === studentId);
    const targetDate = date ? new Date(date) : new Date();

    let filtered = studentTasks;

    if (viewType === "daily") {
      const formattedDate = targetDate.toISOString().split("T")[0];
      filtered = studentTasks.filter((t) => t.dueDate === formattedDate || t.createdAt === formattedDate);
    } else if (viewType === "weekly") {
      const startOfWeek = new Date(targetDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      filtered = studentTasks.filter((t) => {
        const taskDate = new Date(t.dueDate);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      });
    } else if (viewType === "monthly") {
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth();

      filtered = studentTasks.filter((t) => {
        const taskDate = new Date(t.dueDate);
        return taskDate.getFullYear() === targetYear && taskDate.getMonth() === targetMonth;
      });
    }

    // Calculate summary statistics
    const totalTasks = studentTasks.length;
    const completed = studentTasks.filter((t) => t.status === "Completed").length;
    const pending = studentTasks.filter((t) => t.status === "Pending").length;
    const inProgress = studentTasks.filter((t) => t.status === "In Progress").length;

    const studentInfo = studentsData.find((s) => s.id === studentId) || {
      id: studentId,
      name: filtered[0]?.studentName || "Student",
      rollNumber: filtered[0]?.rollNumber || "N/A",
    };

    return {
      student: studentInfo,
      tasks: filtered,
      summary: {
        totalTasks,
        completed,
        pending,
        inProgress,
      },
    };
  },
};

export default taskService;
