const express = require("express");
const {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

router.route("/")
  .get(listStudents)
  .post(createStudent);

router.route("/:id")
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
