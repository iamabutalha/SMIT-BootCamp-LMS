const express = require("express");
const {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject
} = require("../controllers/teamController");

const router = express.Router();

router.route("/")
  .get(listProjects)
  .post(createProject);

router.route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
