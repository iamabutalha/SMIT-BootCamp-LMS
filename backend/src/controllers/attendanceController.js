const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");

function dayRange(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (Number.isNaN(d.getTime())) return null;

  const start = new Date(d);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
}

const listAttendance = asyncHandler(async (req, res) => {
  const { date, search, from, to } = req.query;
  const filter = {};

  if (date) {
    const range = dayRange(date);
    if (!range) return res.status(400).json({ success: false, message: "Invalid date" });
    filter.date = { $gte: range.start, $lt: range.end };
  } else if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }

  let records = await Attendance.find(filter)
    .populate("student", "rollNumber name course batch team")
    .sort({ date: -1 });

  if (search) {
    const term = search.toLowerCase();
    records = records.filter((record) => {
      const student = record.student;
      return (
        student &&
        (student.name.toLowerCase().includes(term) ||
          student.rollNumber.includes(search))
      );
    });
  }

  res.json({ success: true, data: records });
});

const markAttendance = asyncHandler(async (req, res) => {
  const { rollNumber, date, status } = req.body;

  if (!/^\d{6}$/.test(String(rollNumber || ""))) {
    return res.status(400).json({
      success: false,
      message: "Roll number must contain exactly 6 digits"
    });
  }

  if (!["Present", "Absent", "Leave"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be Present, Absent, or Leave"
    });
  }

  const student = await Student.findOne({ rollNumber });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const range = dayRange(date);
  if (!range) {
    return res.status(400).json({ success: false, message: "Invalid date" });
  }

  const record = await Attendance.findOneAndUpdate(
    { student: student._id, date: range.start },
    { student: student._id, date: range.start, status },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).populate("student", "rollNumber name course batch team");

  res.status(201).json({ success: true, data: record });
});

const updateAttendance = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["Present", "Absent", "Leave"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be Present, Absent, or Leave"
    });
  }

  const record = await Attendance.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate("student", "rollNumber name course batch team");

  if (!record) {
    return res.status(404).json({
      success: false,
      message: "Attendance record not found"
    });
  }

  res.json({ success: true, data: record });
});

const getStudentHistory = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.studentId).select(
    "rollNumber name course batch team"
  );

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const records = await Attendance.find({ student: student._id }).sort({ date: -1 });

  const totalDays = records.length;
  const present = records.filter((x) => x.status === "Present").length;
  const absent = records.filter((x) => x.status === "Absent").length;
  const leave = records.filter((x) => x.status === "Leave").length;

  res.json({
    success: true,
    data: {
      student,
      records,
      summary: {
        totalDays,
        present,
        absent,
        leave,
        attendancePercentage:
          totalDays === 0 ? 0 : Number(((present / totalDays) * 100).toFixed(2))
      }
    }
  });
});

module.exports = {
  listAttendance,
  markAttendance,
  updateAttendance,
  getStudentHistory
};
