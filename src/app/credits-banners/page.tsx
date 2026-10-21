"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession, type SimSession } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";

/**
 * /credits-banners — the credits banner gallery observed as a route in the
 * production bundle (credits-banners chunk + constants). Displays the banner
 * states the real product cycles through (balance, low credits, mode).
 */
export default function CreditsBannersPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in</Link>
      </main>
    );
  }

  const banners = [
    {
      id: "balance",
      title: "Credits balance",
      body: `You have ${session.teams.map((t) => t.credits).reduce((a, b) => a + b, 0)} credits across your teams.`,
      tone: "default",
    },
    {
      id: "low",
      title: "Low credits",
      body: "You are running low on credits. Upgrade to Pro for a monthly balance that rolls over.",
      tone: "warning",
    },
    {
      id: "mode",
      title: "Rolling credits",
      body: "Free-plan credits roll over month to month (credits.mode: rolling — observed in the bundle).",
      tone: "info",
    },
    {
      id: "spent",
      title: "Credits spent",
      body: "AI generation and editor invites consume credits (simulated ledger in the clone).",
      tone: "default",
    },
  ];

  const toneClass: Record<string, string> = {
    default: "border-border-solid/15",
    warning: "border-[var(--border--solid)] border-2",
    info: "border-border-solid/15 bg-surface-raised",
  };

  return (
    <AppPage section="credits-banners" title="Credits banners" subtitle="The banner states used across the app" wide>
      <div className="grid gap-4 sm:grid-cols-2">
        {banners.map((b) => (
          <div key={b.id} className={`rounded-surface border p-5 ${toneClass[b.tone] ?? toneClass.default}`}>
            <span className="ds-accent-mono text-2xs">{b.id}</span>
            <span className="mt-1.5 block text-base font-medium text-content-primary">{b.title}</span>
            <span className="mt-1 block text-sm text-content-secondary">{b.body}</span>
          </div>
        ))}
      </div>
      <SimNote>
        Educational clone — the /credits-banners route exists in the production bundle; these are
        the banner variants the credits UI cycles through, rendered here as a gallery.
      </SimNote>
    </AppPage>
  );
}
