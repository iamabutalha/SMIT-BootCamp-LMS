const Team = require("../models/Team");
const Student = require("../models/Student");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");

const listTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find()
    .populate("project")
    .sort({ createdAt: -1 });

  const withMembers = await Promise.all(
    teams.map(async (team) => {
      const members = await Student.find({ team: team._id }).select("rollNumber name course batch");
      const leader = members[0] || null;
      return {
        ...team.toObject(),
        members,
        memberCount: members.length,
        leaderName: leader ? leader.name : "Not Assigned",
        leaderId: leader ? leader._id : null
      };
    })
  );

  res.json({ success: true, data: withMembers });
});

const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id).populate("project");

  if (!team) {
    return res.status(404).json({ success: false, message: "Team not found" });
  }

  const members = await Student.find({ team: team._id }).sort({ name: 1 });
  const leader = members[0] || null;

  res.json({
    success: true,
    data: {
      team: {
        ...team.toObject(),
        members,
        memberCount: members.length,
        leaderName: leader ? leader.name : "Not Assigned",
        leaderId: leader ? leader._id : null
      },
      members,
      memberCount: members.length
    }
  });
});

const createTeam = asyncHandler(async (req, res) => {
  const { name, memberIds = [] } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Team name is required" });
  }

  const team = await Team.create({
    name: name.trim()
  });

  if (Array.isArray(memberIds) && memberIds.length > 0) {
    const validIds = memberIds.filter((id) => typeof id === "string" && id.match(/^[0-9a-fA-F]{24}$/));
    if (validIds.length > 0) {
      await Student.updateMany(
        { _id: { $in: validIds } },
        { team: team._id }
      );
    }
  }

  const members = await Student.find({ team: team._id }).select("rollNumber name course batch");
  const leader = members[0] || null;

  res.status(201).json({
    success: true,
    data: {
      ...team.toObject(),
      members,
      memberCount: members.length,
      leaderName: leader ? leader.name : "Not Assigned",
      leaderId: leader ? leader._id : null
    }
  });
});

const updateTeam = asyncHandler(async (req, res) => {
  const { name, memberIds = [] } = req.body;

  const updates = {};
  if (name && name.trim()) {
    updates.name = name.trim();
  }

  const team = await Team.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  );

  if (!team) {
    return res.status(404).json({ success: false, message: "Team not found" });
  }

  if (Array.isArray(memberIds)) {
    const validIds = memberIds.filter((id) => typeof id === "string" && id.match(/^[0-9a-fA-F]{24}$/));
    
    // Unassign students removed from team
    await Student.updateMany(
      { team: team._id, _id: { $nin: validIds } },
      { team: null }
    );
    
    // Assign selected students to team
    if (validIds.length > 0) {
      await Student.updateMany(
        { _id: { $in: validIds } },
        { team: team._id }
      );
    }
  }

  const members = await Student.find({ team: team._id }).select("rollNumber name course batch");
  const leader = members[0] || null;

  res.json({
    success: true,
    data: {
      ...team.toObject(),
      members,
      memberCount: members.length,
      leaderName: leader ? leader.name : "Not Assigned",
      leaderId: leader ? leader._id : null
    }
  });
});

const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({ success: false, message: "Team not found" });
  }

  // Unassign students linked to deleted team
  await Student.updateMany({ team: team._id }, { team: null });

  await team.deleteOne();

  res.json({ success: true, message: "Team deleted successfully" });
});

const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

const listProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ deadline: 1, createdAt: -1 });
  res.json({ success: true, data: projects });
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  const team = await Team.findOne({ project: project._id }).select("name");

  res.json({
    success: true,
    data: { project, team }
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  res.json({ success: true, data: project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const teamUsingProject = await Team.exists({ project: req.params.id });

  if (teamUsingProject) {
    return res.status(409).json({
      success: false,
      message: "Cannot delete a project assigned to a team"
    });
  }

  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  res.json({ success: true, message: "Project deleted" });
});

module.exports = {
  listTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject
};
