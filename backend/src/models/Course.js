const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Course code is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    instructor: {
      type: String,
      default: "Saylani Faculty",
    },
    batches: {
      type: Number,
      default: 1,
    },
    students: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Upcoming", "Completed"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
