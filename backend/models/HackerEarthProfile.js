const mongoose = require("mongoose");

const HackerEarthProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    lastFetchedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HackerEarthProfile", HackerEarthProfileSchema);
