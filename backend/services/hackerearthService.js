// NOTE: HackerEarth public APIs are limited; this service uses a placeholder endpoint or mock data.
// You can replace the URLs below with actual sources if available.

async function fetchHackerEarthProfile(username) {
  if (!username) throw new Error("username is required");

  // Mock mode if no API
  if (process.env.HE_USE_MOCK === "true") {
    return {
      profile: {
        username,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`,
        name: username,
        rating: null,
      },
      contests: [],
      problems: { solved: 0, categories: {} },
      recentActivity: [],
    };
  }

  // Placeholder: attempt to fetch public profile HTML or JSON if available
  // Replace with a real API when accessible
  const base = "https://www.hackerearth.com";
  const res = await (globalThis.fetch ? globalThis.fetch(`${base}/@${encodeURIComponent(username)}`) : Promise.resolve({ ok: true }));
  if (!res.ok) throw new Error(`Failed to fetch HackerEarth profile (${res.status})`);

  // With no official API, return minimal data from the profile URL
  return {
    profile: {
      username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`,
      name: username,
      rating: null,
    },
    contests: [],
    problems: { solved: 0, categories: {} },
    recentActivity: [],
  };
}

module.exports = { fetchHackerEarthProfile };
