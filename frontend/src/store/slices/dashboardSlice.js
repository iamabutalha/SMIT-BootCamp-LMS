import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../../services/dashboardService";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardService.getDashboardData();
      return data;
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
