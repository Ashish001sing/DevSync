import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function HackerEarthProfilePage() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
  const res = await fetch(`/api/hackerearth/${encodeURIComponent(username)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (username) load();
  }, [username]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!data) return null;

  const { profile, contests, problems, recentActivity, lastFetchedAt } = data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 bg-[var(--card)] text-[var(--card-foreground)] p-4 rounded-xl shadow">
        <img src={profile?.avatar} alt={profile?.username} className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-xl font-semibold">{profile?.name || profile?.username}</h1>
          {profile?.rating !== null && (
            <p className="text-sm text-[var(--muted-foreground)]">Rating: {profile.rating}</p>
          )}
          <p className="text-xs text-[var(--muted-foreground)]">Last updated: {lastFetchedAt ? new Date(lastFetchedAt).toLocaleString() : "N/A"}</p>
        </div>
        <div className="ml-auto">
          <Link to="/dashboard" className="text-[var(--primary)] hover:underline">Back to Dashboard</Link>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[var(--card)] text-[var(--card-foreground)] p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Contests</h2>
          {contests && contests.length > 0 ? (
            <ul className="space-y-2">
              {contests.map((c, i) => (
                <li key={i} className="text-sm flex justify-between">
                  <span>{c.name}</span>
                  <span className="text-[var(--muted-foreground)]">{c.rank ? `Rank: ${c.rank}` : ""}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">No contests found.</p>
          )}
        </div>

        <div className="bg-[var(--card)] text-[var(--card-foreground)] p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Problems</h2>
          <p className="text-sm">Solved: {problems?.solved ?? 0}</p>
          {problems?.categories && Object.keys(problems.categories).length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(problems.categories).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <span className="text-[var(--muted-foreground)]">{v}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-[var(--card)] text-[var(--card-foreground)] p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Recent Activity</h2>
        {recentActivity && recentActivity.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex justify-between">
                <span>{a.title || a.problem}</span>
                <span className="text-[var(--muted-foreground)]">{a.time || a.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">No recent submissions.</p>
        )}
      </section>
    </div>
  );
}
