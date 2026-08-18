import apiClient from "./apiClient";

// ============================================================
// Attendance API Service
// ============================================================

const attendanceService = {
  // Get all attendance records
  getAttendance: async () => {
    const response = await apiClient.get("/attendance");
    return response.data?.data || response.data;
  },

  // Get students for attendance marking (with current status)
  getStudentsForAttendance: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString 
      ? `/attendance/students-for-marking?${queryString}` 
      : '/attendance/students-for-marking';
    const response = await apiClient.get(url);
    return response.data?.data || response.data;
  },

  // Get attendance history for a specific student
  getStudentHistory: async (studentId) => {
    const response = await apiClient.get(`/attendance/student/${studentId}/history`);
    return response.data?.data || response.data;
  },

  // Create / Mark attendance record
  createAttendance: async (attendanceData) => {
    const response = await apiClient.post("/attendance", attendanceData);
    return response.data?.data || response.data;
  },

  // Update attendance
  updateAttendance: async (attendanceId, attendanceData) => {
    const response = await apiClient.put(`/attendance/${attendanceId}`, attendanceData);
    return response.data?.data || response.data;
  },

  // Delete attendance
  deleteAttendance: async (attendanceId) => {
    const response = await apiClient.delete(`/attendance/${attendanceId}`);
    return response.data;
  },
};

export default attendanceService;