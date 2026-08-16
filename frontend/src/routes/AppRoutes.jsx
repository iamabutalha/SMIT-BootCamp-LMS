import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance/Attendance";
import Students from "../pages/Students/Students";

import Tasks from "../pages/Tasks";
import Teams from "../pages/Teams";
import Projects from "../pages/Projects";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main App Routes */}
      <Route
        path="/dashboard"
        element={
          <MainLayout
            title="Dashboard"
            subtitle="Welcome back to Bootcamp LMS"
          >
            <Dashboard />
          </MainLayout>
        }
      />
      <Route path="/students" element={<Students />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/projects" element={<Projects />} />

      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
