




import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import studentsReducer from "./slices/studentsSlice";
import attendanceReducer from "./slices/attendanceSlice";

// ============================================================
// Redux Store
// ============================================================

export const store = configureStore({
  reducer: {
    // Authentication
    auth: authReducer,

    // Students
    students: studentsReducer,

    // Attendance
    attendance: attendanceReducer,
  },
});