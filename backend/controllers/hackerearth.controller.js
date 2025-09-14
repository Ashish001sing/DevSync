const HackerEarthProfile = require("../models/HackerEarthProfile");
const { fetchHackerEarthProfile } = require("../services/hackerearthService");

// Cache TTL in minutes
const DEFAULT_TTL_MINUTES = parseInt(process.env.HE_CACHE_TTL_MINUTES || "60", 10);

function isStale(lastFetchedAt, ttlMinutes) {
  if (!lastFetchedAt) return true;
  const ageMs = Date.now() - new Date(lastFetchedAt).getTime();
  return ageMs > ttlMinutes * 60 * 1000;
}

async function getProfile(req, res) {
  try {
    const { username } = req.params;
    const refresh = req.query.refresh === "true";

    const key = (username || "").toLowerCase().trim();
    if (!key) return res.status(400).json({ error: "username is required" });

    let doc = await HackerEarthProfile.findOne({ username: key });

    if (!doc || refresh || isStale(doc.lastFetchedAt, DEFAULT_TTL_MINUTES)) {
      const data = await fetchHackerEarthProfile(key);
      if (!doc) doc = new HackerEarthProfile({ username: key });
      doc.data = data;
      doc.lastFetchedAt = new Date();
      await doc.save();
    }

    return res.json({ username: key, ...doc.data, lastFetchedAt: doc.lastFetchedAt });
  } catch (err) {
    console.error("[HE] getProfile error:", err);
    return res.status(500).json({ error: err.message || "Failed to load HackerEarth data" });
  }
}

module.exports = { getProfile };
