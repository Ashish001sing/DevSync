const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/hackerearth.controller");

// Public route – if you want to protect it, add auth middleware here
router.get("/:username", getProfile);

module.exports = router;
