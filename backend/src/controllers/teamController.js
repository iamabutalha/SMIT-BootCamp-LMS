const Team = require("../models/Team");
const Student = require("../models/Student");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");

const listTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find()
    .populate("project")
    .sort({ createdAt: -1 });

  const withCounts = await Promise.all(
    teams.map(async (team) => {
      const memberCount = await Student.countDocuments({ team: team._id });
      return { ...team.toObject(), memberCount };
    })
  );

  res.json({ success: true, data: withCounts });
});

const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id).populate("project");

  if (!team) {
    return res.status(404).json({ success: false, message: "Team not found" });
  }

  const members = await Student.find({ team: team._id }).sort({ name: 1 });

  res.json({
    success: true,
    data: {
      team,
      members,
      memberCount: members.length
    }
  });
});

const createTeam = asyncHandler(async (req, res) => {
  const { name, project } = req.body;

  const team = await Team.create({
    name,
    project: project || null
  });

  const populated = await team.populate("project");

  res.status(201).json({ success: true, data: populated });
});

const updateTeam = asyncHandler(async (req, res) => {
  const { name, project } = req.body;

  const team = await Team.findByIdAndUpdate(
    req.params.id,
    { name, project: project || null },
    { new: true, runValidators: true }
  ).populate("project");

  if (!team) {
    return res.status(404).json({ success: false, message: "Team not found" });
  }

  res.json({ success: true, data: team });
});

const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return res.status(404).json({ success: false, message: "Team not found" });
  }

  const memberCount = await Student.countDocuments({ team: team._id });

  if (memberCount > 0) {
    return res.status(409).json({
      success: false,
      message: "Cannot delete a team that still has students"
    });
  }

  await team.deleteOne();

  res.json({ success: true, message: "Team deleted" });
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
