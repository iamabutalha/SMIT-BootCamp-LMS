const Task = require("../models/Task");
const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");

const listTasks = asyncHandler(async (req, res) => {
  const { student, status, date, from, to } = req.query;
  const filter = {};

  if (student) filter.student = student;
  if (status) filter.status = status;

  if (date) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date" });
    }
    d.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setDate(end.getDate() + 1);
    filter.dueDate = { $gte: d, $lt: end };
  } else if (from || to) {
    filter.dueDate = {};
    if (from) filter.dueDate.$gte = new Date(from);
    if (to) filter.dueDate.$lte = new Date(to);
  }

  const tasks = await Task.find(filter)
    .populate("student", "rollNumber name course batch team")
    .sort({ dueDate: -1 });

  res.json({ success: true, data: tasks });
});

const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "student",
    "rollNumber name course batch team"
  );

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: task });
});

const createTask = asyncHandler(async (req, res) => {
  const { student, title, description, dueDate, status } = req.body;

  const studentExists = await Student.exists({ _id: student });

  if (!studentExists) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const task = await Task.create({
    student,
    title,
    description,
    dueDate,
    status: status || "Pending"
  });

  const populated = await task.populate(
    "student",
    "rollNumber name course batch team"
  );

  res.status(201).json({ success: true, data: populated });
});

const updateTask = asyncHandler(async (req, res) => {
  const allowed = ["student", "title", "description", "dueDate", "status"];
  const updates = {};

  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  ).populate("student", "rollNumber name course batch team");

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, message: "Task deleted" });
});

const getStudentTaskHistory = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.studentId).select(
    "rollNumber name course batch team"
  );

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const tasks = await Task.find({ student: student._id }).sort({ dueDate: -1 });

  const summary = {
    totalTasks: tasks.length,
    completed: tasks.filter((x) => x.status === "Completed").length,
    pending: tasks.filter((x) => x.status === "Pending").length,
    inProgress: tasks.filter((x) => x.status === "In Progress").length
  };

  res.json({
    success: true,
    data: { student, tasks, summary }
  });
});

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getStudentTaskHistory
};
