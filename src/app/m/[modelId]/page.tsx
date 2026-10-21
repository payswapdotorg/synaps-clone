"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession, touchModel, type SimModel, type SimTeam } from "@/lib/session";
import { ConsoleChrome } from "@/components/console/ConsoleChrome";

/**
 * Modeler console — reconstruction of the OBSERVED /m/{modelId}?pageId=…
 * route (live observation 2026-10-21). The original runs a WebGL CAD
 * kernel; this clone implements an original SVG 2D floor-plan editor with
 * the observed chrome (top bar, Layers/Assets dock, Canvas settings panel,
 * floating tool palette, status bar).
 */
export default function ModelerPage({
  params,
  searchParams,
}: {
  params: Promise<{ modelId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [modelId, setModelId] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "ready"; name: string; space: string; model: SimModel; team: SimTeam }
    | { status: "anon" }
  >({ status: "loading" });

  useEffect(() => {
    void (async () => {
      const p = await params;
      const sp = await searchParams;
      setModelId(p.modelId);
      setDemo(Boolean(sp.demo));
      const session = loadSession();
      if (!session) {
        setState({ status: "anon" });
        return;
      }
      for (const team of session.teams) {
        const model = team.models.find((m) => m.id === p.modelId);
        if (model) {
          const space = team.spaces.find((s) => s.id === model.spaceId)?.name ?? "Residential Projects";
          touchModel(session, team.id, model.id);
          setState({ status: "ready", name: model.name, space, model, team });
          return;
        }
      }
      setState({ status: "ready", name: "Model 1", space: "Residential Projects", model: { id: p.modelId, name: "Model 1", spaceId: "", pages: [{ id: "p-1", name: "Page 1" }], edited: new Date().toISOString(), source: "scratch" }, team: session.teams[0] });
    })();
  }, [params, searchParams]);

  if (state.status === "loading" || !modelId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <p className="text-sm text-content-secondary">Loading model…</p>
      </main>
    );
  }

  if (state.status === "anon") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <div className="text-center">
          <p className="text-sm text-content-secondary">No session — sign in to open models.</p>
          <Link href="/login" className="mt-4 inline-block text-sm underline underline-offset-2">
            Go to sign-in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ConsoleChrome
      modelName={state.name}
      spaceName={state.space}
      initialDemo={demo}
      onShareLabel="simulated sharing"
      model={state.model}
      team={state.team}
    />
  );
}
