const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");

const initialCourses = [
  {
    code: "WMA-101",
    title: "Web & Mobile App Development",
    instructor: "Saylani Faculty",
    batches: 3,
    students: 120,
    status: "Active",
  },
  {
    code: "AI-201",
    title: "Artificial Intelligence & Data Science",
    instructor: "Saylani Faculty",
    batches: 2,
    students: 85,
    status: "Active",
  },
  {
    code: "CC-301",
    title: "Cloud Native Computing",
    instructor: "Saylani Faculty",
    batches: 1,
    students: 45,
    status: "Upcoming",
  },
];

const getCourses = asyncHandler(async (req, res) => {
  let courses = await Course.find().sort({ createdAt: -1 });

  // Seed default courses if DB is empty
  if (courses.length === 0) {
    courses = await Course.insertMany(initialCourses);
  }

  res.json({
    success: true,
    data: courses,
  });
});

const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: course,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.json({
    success: true,
    data: course,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.json({
    success: true,
    message: "Course deleted successfully",
  });
});

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
