const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

const router = express.Router();

// Create Project (Admin only)
router.post("/create", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all projects (Admin → all, Member → assigned)
router.get("/", auth, async (req, res) => {
  try {
    let projects;

    if (req.user.role === "admin") {
      projects = await Project.find();
    } else {
      projects = await Project.find({ members: req.user.id });
    }

    res.json(projects);
  } catch {
    res.status(500).json({ msg: "Error fetching projects" });
  }
});

module.exports = router;