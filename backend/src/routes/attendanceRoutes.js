const express = require("express");
const {
  listAttendance,
  markAttendance,
  updateAttendance,
  getStudentHistory,
  getStudentsForAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/students-for-marking", getStudentsForAttendance);
router.route("/").get(listAttendance).post(markAttendance);
router.post("/mark", markAttendance);
router.put("/:id", updateAttendance);
router.get("/student/:studentId/history", getStudentHistory);

module.exports = router;
