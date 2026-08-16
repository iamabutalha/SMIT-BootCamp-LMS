import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import authService from "../services/authService";
import {
  setCredentials,
  setInitializing,
  logout,
} from "../store/slices/authSlice";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Attendance from "../pages/attendance/Attendance";
import Students from "../pages/students/Students";
import Tasks from "../pages/tasks/Tasks";
import Teams from "../pages/teams/Teams";
import Courses from "../pages/courses/Courses";
import Settings from "../pages/settings/Settings";

function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        if (isMounted) {
          dispatch(setInitializing(false));
        }
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (isMounted && user) {
          dispatch(setCredentials({ user, token }));
        }
      } catch {
        if (isMounted) {
          dispatch(logout());
        }
      } finally {
        if (isMounted) {
          dispatch(setInitializing(false));
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <Teams />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
