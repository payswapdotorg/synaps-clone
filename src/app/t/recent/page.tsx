"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession, type SimSession } from "@/lib/session";

/** Recent — redirects into the team home (the clone keeps one recents list). */
export default function RecentPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  useEffect(() => {
    const s = loadSession();
    setSession(s);
    if (s) window.location.replace(`/t/${s.team.id}`);
  }, []);
  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">
          Sign in to see recents
        </Link>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-base">
      <p className="text-sm text-content-secondary">Redirecting…</p>
    </main>
  );
}
