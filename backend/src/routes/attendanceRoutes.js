const express = require("express");
const {
  listAttendance,
  markAttendance,
  updateAttendance,
  getStudentHistory
} = require("../controllers/attendanceController");

const router = express.Router();

router.route("/").get(listAttendance).post(markAttendance);
router.post("/mark", markAttendance);
router.put("/:id", updateAttendance);
router.get("/student/:studentId/history", getStudentHistory);

module.exports = router;
