import React from "react";
import { Link, useNavigate } from "react-router-dom";

function extractHEUsername(link) {
  if (!link) return null;
  const raw = String(link).trim();
  // If user stored just the username
  if (!raw.includes("/") && !raw.includes("@") && !raw.startsWith("http")) {
    return raw;
  }
  // Try URL parsing
  try {
    const url = raw.startsWith("http") ? new URL(raw) : new URL(`https://${raw}`);
    const path = url.pathname || "";
    // Common patterns: /@username or trailing username
    const atIdx = path.lastIndexOf("/@");
    if (atIdx !== -1) {
      return path.substring(atIdx + 2).replace(/^\//, "");
    }
    // Fallback: last path segment
    const parts = path.split("/").filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  } catch {
    // Not a valid URL; try after '@'
    const at = raw.lastIndexOf("@");
    if (at !== -1) return raw.substring(at + 1).trim();
  }
  return null;
}

export default function HackerEarthCard({ link }) {
  const navigate = useNavigate();
  const username = extractHEUsername(link);

  return (
    <div className="bg-[var(--card)] text-[var(--card-foreground)] rounded-lg p-4 shadow-sm border border-[var(--border)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">HackerEarth</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            {username ? `@${username}` : "No username linked"}
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png"
          alt="HackerEarth"
          className="w-8 h-8 object-contain"
        />
      </div>

      <div className="mt-3 flex gap-2">
        {username ? (
          <>
            <button
              className="px-3 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 text-sm"
              onClick={() => navigate(`/dashboard/hackerearth/${username}`)}
            >
              Get
            </button>
            <Link
              to="/#features"
              className="px-3 py-2 rounded-md bg-[var(--card-foreground)] text-[var(--card)] hover:opacity-90 text-sm"
            >
              Features
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="px-3 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 text-sm"
            >
              Add Username
            </Link>
            <Link
              to="/#features"
              className="px-3 py-2 rounded-md bg-[var(--card-foreground)] text-[var(--card)] hover:opacity-90 text-sm"
            >
              Features
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
