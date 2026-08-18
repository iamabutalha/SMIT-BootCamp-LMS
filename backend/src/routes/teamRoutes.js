const express = require("express");
const {
  listTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
  changeLeader
} = require("../controllers/teamController");

const router = express.Router();

router.route("/")
  .get(listTeams)
  .post(createTeam);

router.route("/:id")
  .get(getTeam)
  .put(updateTeam)
  .delete(deleteTeam);

// Team member management routes
router.post("/:id/members", addMember);
router.delete("/:id/members/:studentId", removeMember);
router.patch("/:id/leader", changeLeader);

module.exports = router;
