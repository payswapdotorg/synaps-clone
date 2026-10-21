"use client";

import { useEffect } from "react";
import { activeTeam, loadSession } from "@/lib/session";

/** /t/recent — legacy path; the recents dashboard now lives at /recent. */
export default function LegacyRecentRedirect() {
  useEffect(() => {
    const s = loadSession();
    window.location.replace(s ? `/t/${activeTeam(s).id}` : "/recent");
  }, []);
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-base">
      <p className="text-sm text-content-secondary">Redirecting…</p>
    </main>
  );
}
