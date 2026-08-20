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
    attendanceForToday,
    allTasks,
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
      .populate({
        path: "student",
        select: "rollNumber name course batch team",
        populate: { path: "team", select: "name" }
      })
      .sort({ updatedAt: -1, createdAt: -1 }),
    Task.find()
      .populate({
        path: "student",
        select: "rollNumber name course batch team",
        populate: { path: "team", select: "name" }
      })
      .sort({ updatedAt: -1, createdAt: -1 })
      .limit(15),
    Student.find().sort({ createdAt: -1 }).limit(5),
    Team.find().populate("project").sort({ createdAt: -1 }).limit(5)
  ]);

  // If no attendance marked specifically for today, fetch recent attendance records from DB
  let todayAttendance = attendanceForToday;
  if (!todayAttendance || todayAttendance.length === 0) {
    todayAttendance = await Attendance.find()
      .populate({
        path: "student",
        select: "rollNumber name course batch team",
        populate: { path: "team", select: "name" }
      })
      .sort({ updatedAt: -1, date: -1 })
      .limit(15);
  }

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
      todayTasks: allTasks,
      recentStudents,
      recentTeams
    }
  });
});

module.exports = { getDashboard };
