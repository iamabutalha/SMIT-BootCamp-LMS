import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Attendance from "../pages/Attendance";
import Tasks from "../pages/Tasks";
import Teams from "../pages/Teams";
import Projects from "../pages/Projects";
import Login from "../pages/Login";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
];