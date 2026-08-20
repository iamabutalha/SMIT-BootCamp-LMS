import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../../services/dashboardService";
import studentService from "../../services/studentService";
import teamService from "../../services/teamService";
import taskService from "../../services/taskService";
import attendanceService from "../../services/attendanceService";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = await dashboardService.getDashboardData();
      const state = getState();
      const user = state.auth?.user;

      let studentProfile = null;
      let studentTeam = null;
      let studentTasks = [];
      let studentAttendance = [];

      try {
        const [students, teams, tasks, attendance] = await Promise.all([
          studentService.getStudents(),
          teamService.getTeams(),
          taskService.getTasks(),
          attendanceService.getAttendance(),
        ]);

        if (Array.isArray(students) && students.length > 0) {
          studentProfile =
            students.find(
              (s) =>
                (user?.name && s.name?.toLowerCase() === user.name.toLowerCase()) ||
                (user?.email && s.email && s.email.toLowerCase() === user.email.toLowerCase()) ||
                s._id === user?.id
            ) || students[0];
        }

        if (studentProfile && Array.isArray(teams)) {
          studentTeam = teams.find(
            (t) =>
              t._id === (studentProfile.team?._id || studentProfile.team) ||
              t.id === (studentProfile.team?.id || studentProfile.team) ||
              t.members?.some(
                (m) => (m._id || m.id) === (studentProfile._id || studentProfile.id)
              )
          );
        }

        if (studentProfile && Array.isArray(tasks)) {
          studentTasks = tasks.filter(
            (t) =>
              (t.studentId || t.student?._id || t.student) ===
              (studentProfile._id || studentProfile.id)
          );
        }

        if (studentProfile && Array.isArray(attendance)) {
          studentAttendance = attendance.filter(
            (a) =>
              (a.student?._id || a.student) ===
              (studentProfile._id || studentProfile.id)
          );
        }
      } catch (err) {
        console.warn("Could not load full student relational records:", err);
      }

      return {
        ...data,
        studentProfile,
        studentTeam,
        studentTasks,
        studentAttendance,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load dashboard data"
      );
    }
  }
);

const initialState = {
  stats: {
    totalStudents: 0,
    presentStudentsToday: 0,
    absentStudentsToday: 0,
    totalTeams: 0,
    pendingTasks: 0,
  },
  studentProfile: null,
  studentTeam: null,
  studentTasks: [],
  studentAttendance: [],
  todayAttendance: [],
  todayTasks: [],
  recentStudents: [],
  recentTeams: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.stats) {
          state.stats = action.payload.stats;
        }
        state.studentProfile = action.payload.studentProfile || null;
        state.studentTeam = action.payload.studentTeam || null;
        state.studentTasks = action.payload.studentTasks || [];
        state.studentAttendance = action.payload.studentAttendance || [];
        state.todayAttendance = action.payload.todayAttendance || [];
        state.todayTasks = action.payload.todayTasks || [];
        state.recentStudents = action.payload.recentStudents || [];
        state.recentTeams = action.payload.recentTeams || [];
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;

