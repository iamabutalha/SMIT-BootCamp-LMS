import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import StudentProtectedRoute from './StudentProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import RoleRoute from './RoleRoute';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';

// Layouts
import StudentLayout from '../../layouts/StudentLayout';
import MentorLayout from '../../layouts/MentorLayout';
import AdminLayout from '../../layouts/AdminLayout';

// Auth Feature Pages
import AdminLogin from '../../features/auth/pages/AdminLogin';
import StudentLogin from '../../features/auth/pages/StudentLogin';
import Signup from '../../features/auth/pages/Signup';

// Admin Feature Pages
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import StudentDashboardPage from '../../features/dashboard/pages/StudentDashboardPage';
import StudentsPage from '../../features/users/pages/StudentsPage';
import StudentDetailsPage from '../../features/users/pages/StudentDetailsPage';
import AttendancePage from '../../features/attendance/pages/AttendancePage';
import AttendanceHistoryPage from '../../features/attendance/pages/AttendanceHistoryPage';
import StudentAttendancePage from '../../features/attendance/pages/StudentAttendancePage';
import CohortsPage from '../../features/batches/pages/CohortsPage';
import TeamDetailsPage from '../../features/batches/pages/TeamDetailsPage';
import TasksPage from '../../features/tasks/pages/TasksPage';
import StudentTasksPage from '../../features/tasks/pages/StudentTasksPage';
import StudentTaskDetailsPage from '../../features/tasks/pages/StudentTaskDetailsPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';
import ProgressPage from '../../features/progress/pages/ProgressPage';

// Quizzes Feature Pages
import QuizzesPage from '../../features/quizzes/pages/QuizzesPage';
import QuizCreatePage from '../../features/quizzes/pages/QuizCreatePage';
import QuizEditPage from '../../features/quizzes/pages/QuizEditPage';
import QuizDetailsPage from '../../features/quizzes/pages/QuizDetailsPage';
import StudentQuizzesPage from '../../features/quizzes/pages/StudentQuizzesPage';
import StudentQuizDetailsPage from '../../features/quizzes/pages/StudentQuizDetailsPage';
import StudentQuizRunnerPage from '../../features/quizzes/pages/StudentQuizRunnerPage';
import StudentQuizResultPage from '../../features/quizzes/pages/StudentQuizResultPage';

// Teachers Feature Pages
import TeachersPage from '../../features/teachers/pages/TeachersPage';
import TeacherDetailsPage from '../../features/teachers/pages/TeacherDetailsPage';

// Reports Feature Pages
import ReportsPage from '../../features/reports/pages/ReportsPage';

// General Pages
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RootRedirect from '../../pages/RootRedirect';

// Structural Demo Placeholders for Student Portal features
function StudentDashboardPlaceholder() {
  return (
    <div className="p-6 font-sans space-y-4 text-left">
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Dashboard</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Welcome to your SMIT Student Portal workspace. Track your courses, assignments, progress, and attendance.
        </p>
      </div>
    </div>
  );
}

function StudentTasksPlaceholder() {
  return (
    <div className="p-6 font-sans space-y-4 text-left">
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <h1 className="text-xl font-bold text-slate-900">Student Tasks & Assignments</h1>
        <p className="text-slate-600 text-sm">View assigned tasks and submit your homework.</p>
      </div>
    </div>
  );
}

function StudentAttendancePlaceholder() {
  return (
    <div className="p-6 font-sans space-y-4 text-left">
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <h1 className="text-xl font-bold text-slate-900">Student Attendance History</h1>
        <p className="text-slate-600 text-sm">Track your class attendance record and percentage.</p>
      </div>
    </div>
  );
}

function MentorPlaceholder() {
  return (
    <div className="p-6 font-sans space-y-4 text-left">
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <h1 className="text-xl font-bold text-slate-900">Mentor Portal Home</h1>
        <p className="text-slate-600 text-sm">Mentor workspace for reviewing cohort submissions.</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* Root Smart Redirect & Common Top-Level Section Aliases */}
      <Route path={ROUTES.ROOT} element={<RootRedirect />} />
      <Route path={ROUTES.DASHBOARD} element={<RootRedirect />} />
      <Route path="/students" element={<RootRedirect section="students" />} />
      <Route path="/attendance" element={<RootRedirect section="attendance" />} />
      <Route path="/assignments" element={<RootRedirect section="assignments" />} />
      <Route path="/tasks" element={<RootRedirect section="tasks" />} />
      <Route path="/cohorts" element={<RootRedirect section="cohorts" />} />
      <Route path="/quizzes" element={<RootRedirect section="quizzes" />} />
      <Route path="/teachers" element={<RootRedirect section="teachers" />} />
      <Route path="/progress" element={<RootRedirect section="progress" />} />
      <Route path="/reports" element={<RootRedirect section="reports" />} />
      <Route path="/profile" element={<RootRedirect section="profile" />} />

      {/* Public Auth Routes (Role-aware redirection if already logged in) */}
      <Route element={<PublicOnlyRoute />}>
        <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLogin />} />
        <Route path={ROUTES.STUDENT.LOGIN} element={<StudentLogin />} />
        <Route path={ROUTES.STUDENT.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.LOGIN} element={<StudentLogin />} />
        <Route path={ROUTES.REGISTER} element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

      {/* Protected Admin Domain (/admin/*) */}
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path={ROUTES.ADMIN.ROOT} element={<DashboardPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/progress" element={<ProgressPage />} />
        <Route path={ROUTES.ADMIN.STUDENTS} element={<StudentsPage />} />
        <Route path="/admin/students/:studentId" element={<StudentDetailsPage />} />
        <Route path="/admin/users/:studentId" element={<StudentDetailsPage />} />
        <Route path="/students/:studentId" element={<StudentDetailsPage />} />
        <Route path={ROUTES.ADMIN.USERS} element={<StudentsPage />} />
        <Route path={ROUTES.ADMIN.ATTENDANCE} element={<AttendancePage />} />
        <Route path="/admin/attendance/history" element={<AttendanceHistoryPage />} />
        <Route path={ROUTES.ADMIN.COHORTS} element={<CohortsPage />} />
        <Route path="/admin/teams" element={<CohortsPage />} />
        <Route path="/admin/teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="/admin/cohorts/:teamId" element={<TeamDetailsPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="/admin/courses" element={<CohortsPage />} />
        <Route path={ROUTES.ADMIN.TASKS} element={<TasksPage />} />
        <Route path={ROUTES.ADMIN.PROFILE} element={<ProfilePage />} />

        {/* Admin Quizzes Routes */}
        <Route path={ROUTES.ADMIN.QUIZZES} element={<QuizzesPage />} />
        <Route path="/admin/quiz" element={<QuizzesPage />} />
        <Route path={ROUTES.ADMIN.QUIZZES_CREATE} element={<QuizCreatePage />} />
        <Route path="/admin/quizzes/:quizId" element={<QuizDetailsPage />} />
        <Route path="/admin/quizzes/:quizId/edit" element={<QuizEditPage />} />

        {/* Admin Teachers Routes */}
        <Route path={ROUTES.ADMIN.TEACHERS} element={<TeachersPage />} />
        <Route path="/admin/mentors" element={<TeachersPage />} />
        <Route path="/admin/teachers/:teacherId" element={<TeacherDetailsPage />} />

        {/* Admin Reports Routes */}
        <Route path={ROUTES.ADMIN.REPORTS} element={<ReportsPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
      </Route>

      {/* Protected Student Domain (/student/*) */}
      <Route
        element={
          <StudentProtectedRoute>
            <StudentLayout />
          </StudentProtectedRoute>
        }
      >
        <Route path={ROUTES.STUDENT.ROOT} element={<StudentDashboardPage />} />
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path={ROUTES.STUDENT.TASKS} element={<StudentTasksPage />} />
        <Route path="/student/tasks/:taskId" element={<StudentTaskDetailsPage />} />
        <Route path={ROUTES.STUDENT.ATTENDANCE} element={<StudentAttendancePage />} />
        <Route path={ROUTES.STUDENT.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.STUDENT.ASSIGNMENTS} element={<StudentTasksPage />} />

        {/* Student Quizzes Routes */}
        <Route path={ROUTES.STUDENT.QUIZZES} element={<StudentQuizzesPage />} />
        <Route path="/student/quizzes/:quizId" element={<StudentQuizDetailsPage />} />
        <Route path="/student/quizzes/:quizId/attempt" element={<StudentQuizRunnerPage />} />
        <Route path="/student/quizzes/:quizId/result" element={<StudentQuizResultPage />} />
        <Route path="/student/quizzes/:quizId/results" element={<StudentQuizResultPage />} />
        <Route path="/student/quizzes/:quizId/resultWhen" element={<StudentQuizResultPage />} />
      </Route>

      {/* Protected Mentor Domain (/mentor/*) */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.MENTOR, ROLES.ADMIN]}>
              <MentorLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.MENTOR.ROOT} element={<MentorPlaceholder />} />
        <Route path="/mentor/dashboard" element={<MentorPlaceholder />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
