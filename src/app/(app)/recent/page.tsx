"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { relTime } from "@/app/(app)/t/[teamId]/page";

/** /recent — the observed recents dashboard (Recent route in the bundle). */
export default function RecentPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">
          Sign in to see recents
        </Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);
  const models = [...team.models].sort((a, b) => b.edited.localeCompare(a.edited));

  return (
    <AppPage
      section="recent"
      title="Recent"
      subtitle="Models you have worked on, most recent first"
    >
      {models.length === 0 ? (
        <p className="text-sm text-content-secondary">
          Nothing yet — create your first model from the{" "}
          <Link href={`/t/${team.id}`} className="underline underline-offset-2">
            team home
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-border-solid/10 rounded-surface border border-border-solid/15">
          {models.map((m) => (
            <li key={m.id}>
              <Link
                href={`/m/${m.id}?pageId=${m.pages[0].id}${m.source !== "scratch" ? "&demo=1" : ""}`}
                className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-surface-raised"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-content-primary">{m.name}</span>
                  <span className="block text-xs text-content-secondary">
                    {team.spaces.find((s) => s.id === m.spaceId)?.name ?? "Residential Projects"} ·{" "}
                    {m.pages.length} page{m.pages.length === 1 ? "" : "s"} · {m.source}
                  </span>
                </span>
                <span className="ml-4 shrink-0 text-xs text-content-secondary">
                  Edited {relTime(m.edited)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <SimNote />
    </AppPage>
  );
}
