const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

taskSchema.index({ student: 1, dueDate: -1 });
taskSchema.index({ status: 1, dueDate: 1 });

module.exports = mongoose.model("Task", taskSchema);
