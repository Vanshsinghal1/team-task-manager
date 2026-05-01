const express = require("express");
const User = require("../models/User");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("name email");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching users" });
  }
});

module.exports = router;