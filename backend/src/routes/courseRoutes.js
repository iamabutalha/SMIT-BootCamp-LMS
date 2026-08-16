const express = require("express");
const router = express.Router();
const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").put(updateCourse).delete(deleteCourse);

module.exports = router;
