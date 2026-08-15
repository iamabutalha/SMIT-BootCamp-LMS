const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{6}$/
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    course: {
      type: String,
      required: true,
      trim: true
    },
    batch: {
      type: String,
      required: true,
      trim: true
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null
    }
  },
  { timestamps: true }
);

studentSchema.index({ name: "text", rollNumber: "text" });

module.exports = mongoose.model("Student", studentSchema);
