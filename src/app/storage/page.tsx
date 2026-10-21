"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";

/**
 * /storage — the observed storage manager (storage.list / getSignedUrls /
 * copyAssetsIntoTeam). The clone lists the raster uploads and assets its
 * simulated flows created, with a signed-URL preview action.
 */
export default function StoragePage() {
  const [session, setSession] = useState<SimSession | null>(null);
  const [signed, setSigned] = useState<string | null>(null);

  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in to view storage</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);

  // Derived storage listing: models created via upload/AI/template flows
  // carry simulated source assets.
  const assets = team.models
    .filter((m) => m.source === "upload" || m.source === "ai" || m.source === "template" || m.source === "fixture")
    .map((m) => ({
      key: `teams/${team.id}/models/${m.id}/source.${m.source === "upload" ? "png" : m.source === "ai" ? "plan" : "json"}`,
      model: m.name,
      kind: m.source === "upload" ? "raster upload" : m.source === "ai" ? "generated plan" : "template source",
      edited: m.edited,
    }));

  return (
    <AppPage
      section="storage"
      title="Storage"
      subtitle={`${assets.length} object${assets.length === 1 ? "" : "s"} in the simulated team bucket`}
      wide
    >
      {assets.length === 0 ? (
        <p className="text-sm text-content-secondary">
          Nothing stored yet — upload a floorplan or generate a plan from the{" "}
          <Link href={`/t/${team.id}`} className="underline underline-offset-2">team home</Link>.
        </p>
      ) : (
        <ul className="divide-y divide-border-solid/10 rounded-surface border border-border-solid/15">
          {assets.map((a) => (
            <li key={a.key} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <span className="min-w-0">
                <code className="block truncate text-xs text-content-primary">{a.key}</code>
                <span className="block text-[11px] text-content-secondary">
                  {a.kind} · {a.model} · {new Date(a.edited).toLocaleDateString()}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setSigned(`simulated-signed:teams/${team.id}/… (expires in 60s — no real URL; storage.getSignedUrls is simulated)`);
                  setTimeout(() => setSigned(null), 4000);
                }}
                className="shrink-0 rounded-control border border-border-solid/20 px-2 py-1 text-xs text-content-secondary hover:text-content-primary"
              >
                Get signed URL
              </button>
            </li>
          ))}
        </ul>
      )}
      {signed && (
        <p className="mt-4 rounded-control border border-border-solid/15 bg-surface-raised px-3 py-2 text-xs text-content-secondary">
          {signed}
        </p>
      )}
      <SimNote>
        Educational clone — mirrors storage.list / storage.getSignedUrls / copyAssetsIntoTeam from
        the production bundle. There is no bucket; objects are derived from simulated model flows.
      </SimNote>
    </AppPage>
  );
}
