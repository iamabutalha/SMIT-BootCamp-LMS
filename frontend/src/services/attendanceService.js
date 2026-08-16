import apiClient from "./apiClient";

// ============================================================
// Attendance API Service
// ============================================================

const attendanceService = {
  // Get all attendance records
  getAttendance: async () => {
    const response = await apiClient.get(
      "/attendance"
    );

    return response.data?.data || response.data;
  },

  // Get attendance for a specific student
  getStudentAttendance: async (studentId) => {
    const response = await apiClient.get(
      `/attendance/student/${studentId}`
    );

    return response.data;
  },

  // Create attendance record
  createAttendance: async (attendanceData) => {
    const response = await apiClient.post(
      "/attendance",
      attendanceData
    );

    return response.data;
  },

  // Update attendance
  updateAttendance: async (
    attendanceId,
    attendanceData
  ) => {
    const response = await apiClient.put(
      `/attendance/${attendanceId}`,
      attendanceData
    );

    return response.data;
  },

  // Delete attendance
  deleteAttendance: async (attendanceId) => {
    const response = await apiClient.delete(
      `/attendance/${attendanceId}`
    );

    return response.data;
  },
};

export default attendanceService;