const express = require("express");
const {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getStudentTaskHistory
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", listTasks);
router.post("/", createTask);
router.get("/student/:studentId/history", getStudentTaskHistory);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
