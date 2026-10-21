"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, type SimSession } from "@/lib/session";
import { AppPage } from "@/components/app/AppPage";
import { relTime } from "@/app/t/[teamId]/page";

export default function SpacePage({
  params,
}: {
  params: Promise<{ teamId: string; spaceId: string }>;
}) {
  const [ids, setIds] = useState<{ teamId: string; spaceId: string } | null>(null);
  const [session, setSession] = useState<SimSession | null>(null);

  useEffect(() => {
    void params.then((p) => setIds({ teamId: p.teamId, spaceId: p.spaceId }));
    setSession(loadSession());
  }, [params]);

  if (!ids || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <p className="text-sm text-content-secondary">
          {session === null && ids === null ? "Loading…" : "No session — sign in first."}
        </p>
      </main>
    );
  }

  const team = session.teams.find((t) => t.id === ids.teamId) ?? activeTeam(session);
  const space = team.spaces.find((s) => s.id === ids.spaceId);
  const models = team.models.filter((m) => m.spaceId === ids.spaceId);

  return (
    <AppPage
      teamId={team.id}
      section="space"
      title={space?.name ?? "Space"}
      subtitle={`${models.length} model${models.length === 1 ? "" : "s"} in this space`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <Link
            key={m.id}
            href={`/m/${m.id}?pageId=${m.pages[0].id}${m.source !== "scratch" ? "&demo=1" : ""}`}
            className="rounded-surface border border-border-solid/15 bg-surface-base p-4 transition-colors hover:border-border-solid/40"
          >
            <span className="ds-accent-mono text-2xs">{m.source}</span>
            <span className="mt-1.5 block text-sm font-medium text-content-primary">{m.name}</span>
            <span className="mt-0.5 block text-xs text-content-secondary">
              {m.pages.length} page{m.pages.length === 1 ? "" : "s"} · Edited {relTime(m.edited)}
            </span>
          </Link>
        ))}
        {models.length === 0 && (
          <p className="text-sm text-content-secondary">No models in this space yet.</p>
        )}
      </div>
    </AppPage>
  );
}
