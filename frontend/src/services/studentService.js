import apiClient from "./apiClient";

// ============================================================
// Student API Service
// ============================================================

const studentService = {
  // Get all students
  getStudents: async () => {
    const response = await apiClient.get("/students");

    return response.data?.data || response.data;
  },

  // Get single student
  getStudentById: async (studentId) => {
    const response = await apiClient.get(
      `/students/${studentId}`
    );

    return response.data;
  },

  // Create student
  createStudent: async (studentData) => {
    const response = await apiClient.post(
      "/students",
      studentData
    );

    return response.data;
  },

  // Update student
  updateStudent: async (studentId, studentData) => {
    const response = await apiClient.put(
      `/students/${studentId}`,
      studentData
    );

    return response.data;
  },

  // Delete student
  deleteStudent: async (studentId) => {
    const response = await apiClient.delete(
      `/students/${studentId}`
    );

    return response.data;
  },
};

export default studentService;