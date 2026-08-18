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
  const { rollNumber, studentId, date, status } = req.body;

  if (!["Present", "Absent", "Leave"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be Present, Absent, or Leave"
    });
  }

  let student;

  // Support both rollNumber and studentId for flexibility
  if (studentId) {
    student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
  } else if (rollNumber) {
    if (!/^\d{6}$/.test(String(rollNumber))) {
      return res.status(400).json({
        success: false,
        message: "Roll number must contain exactly 6 digits"
      });
    }
    student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Either rollNumber or studentId is required"
    });
  }

  const range = dayRange(date);
  if (!range) {
    return res.status(400).json({ success: false, message: "Invalid date" });
  }

  try {
    const record = await Attendance.findOneAndUpdate(
      { student: student._id, date: range.start },
      { student: student._id, date: range.start, status },
      { returnDocument: 'after', upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate("student", "rollNumber name course batch team");

    res.status(201).json({ success: true, data: record });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
      return res.status(409).json({
        success: false,
        message: "A record with the same unique value already exists"
      });
    }
    throw error;
  }
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

// New endpoint: Get students with today's attendance status
const getStudentsForAttendance = asyncHandler(async (req, res) => {
  const { date, course, batch, team } = req.query;
  
  // Get date range for today or specified date
  const range = dayRange(date);
  if (!range) {
    return res.status(400).json({ success: false, message: "Invalid date" });
  }

  // Build student filter
  const studentFilter = {};
  if (course) studentFilter.course = course;
  if (batch) studentFilter.batch = batch;
  if (team) studentFilter.team = team;

  // Get all students matching filter
  const students = await Student.find(studentFilter)
    .populate("team", "name")
    .sort({ rollNumber: 1 });

  // Get today's attendance for these students
  const studentIds = students.map(s => s._id);
  const attendanceRecords = await Attendance.find({
    student: { $in: studentIds },
    date: { $gte: range.start, $lt: range.end }
  });

  // Create a map of student ID to attendance status
  const attendanceMap = {};
  attendanceRecords.forEach(record => {
    attendanceMap[record.student.toString()] = {
      status: record.status,
      _id: record._id
    };
  });

  // Combine student data with attendance status
  const studentsWithAttendance = students.map(student => ({
    _id: student._id,
    rollNumber: student.rollNumber,
    name: student.name,
    course: student.course,
    batch: student.batch,
    team: student.team,
    attendanceStatus: attendanceMap[student._id.toString()]?.status || null,
    attendanceId: attendanceMap[student._id.toString()]?._id || null
  }));

  res.json({ 
    success: true, 
    data: studentsWithAttendance,
    date: range.start
  });
});

module.exports = {
  listAttendance,
  markAttendance,
  updateAttendance,
  getStudentHistory,
  getStudentsForAttendance
};
