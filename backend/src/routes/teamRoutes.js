const express = require("express");
const {
  listTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
} = require("../controllers/teamController");

const router = express.Router();

router.route("/")
  .get(listTeams)
  .post(createTeam);

router.route("/:id")
  .get(getTeam)
  .put(updateTeam)
  .delete(deleteTeam);

module.exports = router;
