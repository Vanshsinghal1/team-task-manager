const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


// ✅ 1. Create Task (Admin assigns task)
router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating task" });
  }
});


// ✅ 2. Get All Tasks (Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "title");

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});


// ✅ 3. Get Tasks of Logged-in User 🔥 (IMPORTANT)
router.get("/mytasks/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId })
      .populate("assignedTo", "name email")
      .populate("projectId", "title");

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching user tasks" });
  }
});


// ✅ 4. Update Task Status (User marks done)
router.put("/update/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating task" });
  }
});


// ✅ 5. Delete Task (Admin)
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error deleting task" });
  }
});


module.exports = router;