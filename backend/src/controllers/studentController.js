const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const listStudents = asyncHandler(async (req, res) => {
  const { search, course, batch, team } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { rollNumber: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } }
    ];
  }

  if (course) filter.course = course;
  if (batch) filter.batch = batch;
  if (team) filter.team = team;

  const students = await Student.find(filter)
    .populate("team", "name project")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: students });
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate(
    "team",
    "name project"
  );

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const [attendance, tasks] = await Promise.all([
    Attendance.find({ student: student._id }).sort({ date: -1 }).limit(30),
    Task.find({ student: student._id }).sort({ dueDate: -1 }).limit(30)
  ]);

  res.json({
    success: true,
    data: { student, attendance, tasks }
  });
});

const createStudent = asyncHandler(async (req, res) => {
  const { rollNumber, name, course, batch, team } = req.body;

  if (!/^\d{6}$/.test(String(rollNumber || ""))) {
    return res.status(400).json({
      success: false,
      message: "Roll number must contain exactly 6 digits"
    });
  }

  const student = await Student.create({
    rollNumber,
    name,
    course,
    batch,
    team: team || null
  });

  const populated = await student.populate("team", "name project");

  res.status(201).json({ success: true, data: populated });
});

const updateStudent = asyncHandler(async (req, res) => {
  const allowed = ["rollNumber", "name", "course", "batch", "team"];
  const updates = {};

  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  if (updates.rollNumber && !/^\d{6}$/.test(String(updates.rollNumber))) {
    return res.status(400).json({
      success: false,
      message: "Roll number must contain exactly 6 digits"
    });
  }

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  ).populate("team", "name project");

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  res.json({ success: true, data: student });
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  await Promise.all([
    Attendance.deleteMany({ student: student._id }),
    Task.deleteMany({ student: student._id })
  ]);

  res.json({
    success: true,
    message: "Student and related attendance/tasks deleted"
  });
});

module.exports = {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
