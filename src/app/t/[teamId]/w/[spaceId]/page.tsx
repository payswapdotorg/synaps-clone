"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession, type SimSession } from "@/lib/session";

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

  const space = session.spaces.find((s) => s.id === ids.spaceId);
  const models = session.models.filter((m) => m.spaceId === ids.spaceId);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link href={`/t/${ids.teamId}`} className="text-xs text-content-secondary hover:underline">
        ← Home
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-content-primary">
          {space?.name ?? "Space"}
        </h1>
        <Link
          href={`/t/${ids.teamId}`}
          className="rounded-control px-4 py-2 text-sm font-medium text-content-inverse"
          style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
        >
          New project
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <Link
            key={m.id}
            href={`/m/${m.id}?pageId=${m.pageId}${m.source !== "scratch" ? "&demo=1" : ""}`}
            className="rounded-surface border border-border-solid/15 bg-surface-base p-4 transition-colors hover:border-border-solid/40"
          >
            <span className="ds-accent-mono text-2xs">{m.source}</span>
            <span className="mt-1.5 block text-sm font-medium text-content-primary">{m.name}</span>
            <span className="mt-0.5 block text-xs text-content-secondary">Edited recently · simulated</span>
          </Link>
        ))}
        {models.length === 0 && (
          <p className="text-sm text-content-secondary">No models in this space yet.</p>
        )}
      </div>
    </main>
  );
}
