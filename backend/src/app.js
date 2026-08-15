const express = require("express");
const cors = require("cors");
const { corsOrigin } = require("./config/env");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const teamRoutes = require("./routes/teamRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const { protect } = require("./middleware/authMiddleware");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: corsOrigin,
    credentials: true
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Bootcamp LMS API is running"
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", protect, dashboardRoutes);
app.use("/api/students", protect, studentRoutes);
app.use("/api/attendance", protect, attendanceRoutes);
app.use("/api/teams", protect, teamRoutes);
app.use("/api/projects", protect, projectRoutes);
app.use("/api/tasks", protect, taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
