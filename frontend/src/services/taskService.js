import apiClient from "./apiClient";

// ============================================================
// Task Service - All operations fetch from database
// ============================================================

const taskService = {
  // Fetch all students for task assignment dropdown
  getStudents: async () => {
    const response = await apiClient.get("/students");
    const students = response.data?.data || response.data || [];
    
    // Map MongoDB _id to id for frontend compatibility
    return students.map(student => ({
      ...student,
      id: student._id || student.id
    }));
  },

  // Fetch tasks with optional filtering
  getTasks: async (filters = {}) => {
    const response = await apiClient.get("/tasks", { params: filters });
    const tasks = response.data?.data || response.data || [];
    
    // Map MongoDB _id to id for frontend compatibility
    return tasks.map(task => ({
      ...task,
      id: task._id || task.id,
      studentId: task.student?._id || task.student,
      studentName: task.student?.name || task.studentName,
      rollNumber: task.student?.rollNumber || task.rollNumber
    }));
  },

  // Get single task by ID
  getTaskById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    const task = response.data?.data || response.data;
    
    // Map MongoDB _id to id for frontend compatibility
    return {
      ...task,
      id: task._id || task.id,
      studentId: task.student?._id || task.student,
      studentName: task.student?.name || task.studentName,
      rollNumber: task.student?.rollNumber || task.rollNumber
    };
  },

  // Create new task
  createTask: async (taskPayload) => {
    console.log("Task service - Creating task with payload:", taskPayload);
    
    // Map studentId to student (backend expects 'student' field)
    const payload = {
      student: taskPayload.studentId || taskPayload.student,
      title: taskPayload.title,
      description: taskPayload.description,
      dueDate: taskPayload.dueDate,
      status: taskPayload.status || "Pending"
    };
    
    console.log("Task service - Transformed payload:", payload);
    
    try {
      const response = await apiClient.post("/tasks", payload);
      console.log("Task service - Response:", response.data);
      
      const task = response.data?.data || response.data;
      
      // Map MongoDB _id to id for frontend compatibility
      return {
        ...task,
        id: task._id || task.id,
        studentId: task.student?._id || task.student,
        studentName: task.student?.name || task.studentName,
        rollNumber: task.student?.rollNumber || task.rollNumber
      };
    } catch (error) {
      console.error("Task service - Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update existing task
  updateTask: async (id, taskPayload) => {
    console.log("Task service - Updating task:", { id, taskPayload });
    
    // Map studentId to student (backend expects 'student' field)
    const payload = {
      ...taskPayload,
      student: taskPayload.studentId || taskPayload.student
    };
    
    // Remove studentId if it exists (backend doesn't need it)
    delete payload.studentId;
    
    console.log("Task service - Update payload:", payload);
    
    const response = await apiClient.put(`/tasks/${id}`, payload);
    console.log("Task service - Update response:", response.data);
    
    const task = response.data?.data || response.data;
    
    // Map MongoDB _id to id for frontend compatibility
    const mappedTask = {
      ...task,
      id: task._id || task.id,
      studentId: task.student?._id || task.student,
      studentName: task.student?.name || task.studentName,
      rollNumber: task.student?.rollNumber || task.rollNumber
    };
    
    console.log("Task service - Mapped updated task:", mappedTask);
    return mappedTask;
  },

  // Quick status change
  updateTaskStatus: async (id, status) => {
    console.log("Task service - Updating task status:", { id, status });
    
    const response = await apiClient.put(`/tasks/${id}`, { status });
    console.log("Task service - Status update response:", response.data);
    
    const task = response.data?.data || response.data;
    
    // Map MongoDB _id to id for frontend compatibility
    const mappedTask = {
      ...task,
      id: task._id || task.id,
      studentId: task.student?._id || task.student,
      studentName: task.student?.name || task.studentName,
      rollNumber: task.student?.rollNumber || task.rollNumber
    };
    
    console.log("Task service - Mapped task:", mappedTask);
    return mappedTask;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  // Get student task history
  getStudentHistory: async (studentId) => {
    const response = await apiClient.get(`/tasks/student/${studentId}/history`);
    return response.data?.data || response.data;
  },
};

export default taskService;
