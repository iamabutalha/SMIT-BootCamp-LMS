




import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import studentsReducer from "./slices/studentsSlice";
import attendanceReducer from "./slices/attendanceSlice";
import taskReducer from "./slices/taskSlice";
import teamReducer from "./slices/teamSlice";
import dashboardReducer from "./slices/dashboardSlice";

// ============================================================
// Redux Store
// ============================================================

export const store = configureStore({
  reducer: {
    // Authentication
    auth: authReducer,

    // Dashboard
    dashboard: dashboardReducer,

    // Students
    students: studentsReducer,

    // Attendance
    attendance: attendanceReducer,

    // Tasks
    task: taskReducer,

    // Teams
    team: teamReducer,
  },
});