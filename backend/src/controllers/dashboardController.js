const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Team = require("../models/Team");
const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalStudents,
    presentStudents,
    absentStudents,
    totalTeams,
    pendingTasks,
    todayAttendance,
    todayTasks,
    recentStudents,
    recentTeams
  ] = await Promise.all([
    Student.countDocuments(),
    Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "Present"
    }),
    Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "Absent"
    }),
    Team.countDocuments(),
    Task.countDocuments({ status: "Pending" }),
    Attendance.find({ date: { $gte: today, $lt: tomorrow } })
      .populate("student", "rollNumber name")
      .sort({ createdAt: -1 }),
    Task.find({ dueDate: { $gte: today, $lt: tomorrow } })
      .populate("student", "rollNumber name")
      .sort({ createdAt: -1 }),
    Student.find().sort({ createdAt: -1 }).limit(5),
    Team.find().populate("project").sort({ createdAt: -1 }).limit(5)
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        totalStudents,
        presentStudentsToday: presentStudents,
        absentStudentsToday: absentStudents,
        totalTeams,
        pendingTasks
      },
      todayAttendance,
      todayTasks,
      recentStudents,
      recentTeams
    }
  });
});

module.exports = { getDashboard };
