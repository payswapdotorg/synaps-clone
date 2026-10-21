"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, saveSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { relTime } from "@/app/(app)/t/[teamId]/page";

/**
 * /admin — the observed admin surface (a large protected chunk including
 * RoomVersionInspectionPanel). The clone renders an honest read-only
 * inspection panel over the local session: teams, resources, entitlements,
 * feature-flag state — plus the admin.signOut action observed in the bundle.
 */
export default function AdminPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in</Link>
      </main>
    );
  }

  const teams: SimTeam[] = session.teams;
  const active = activeTeam(session);

  return (
    <AppPage
      section="admin"
      title="Admin"
      subtitle="Local session inspection (the real admin surface is server-side)"
      wide
    >
      <section aria-label="Teams" className="rounded-surface border border-border-solid/15">
        <div className="flex items-center justify-between border-b border-border-solid/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-content-primary">Teams</h2>
          <button
            type="button"
            onClick={() => {
              saveSession(null);
              window.location.href = "/login";
            }}
            className="rounded-control border border-border-solid/20 px-3 py-1 text-xs text-content-secondary hover:text-content-primary"
          >
            admin.signOut
          </button>
        </div>
        <ul className="divide-y divide-border-solid/10">
          {teams.map((t) => (
            <li key={t.id} className="grid grid-cols-2 gap-2 px-4 py-3 text-sm sm:grid-cols-4">
              <span className="min-w-0">
                <span className="block truncate font-medium text-content-primary">{t.name}</span>
                <span className="block text-[11px] text-content-secondary">{t.id}{t.id === active.id ? " · active" : ""}</span>
              </span>
              <span className="text-content-secondary">
                {t.plan} · {t.credits} cr
              </span>
              <span className="text-content-secondary">
                {t.models.length} models · {t.members.length} members
              </span>
              <span className="text-content-secondary">
                {t.invitations.filter((i) => i.status === "pending").length} pending invites
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Resources" className="mt-4 rounded-surface border border-border-solid/15">
        <div className="border-b border-border-solid/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-content-primary">Resources · {active.name}</h2>
        </div>
        <ul className="divide-y divide-border-solid/10">
          {active.models.map((m) => (
            <li key={m.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="min-w-0">
                <span className="block truncate font-medium text-content-primary">{m.name}</span>
                <span className="block text-[11px] text-content-secondary">
                  {m.id} · {m.pages.length} page{m.pages.length === 1 ? "" : "s"} · {m.pages.map((p) => p.id).join(", ")}
                </span>
              </span>
              <span className="shrink-0 text-xs text-content-secondary">edited {relTime(m.edited)}</span>
            </li>
          ))}
          {active.models.length === 0 && (
            <li className="px-4 py-3 text-sm text-content-secondary">No models.</li>
          )}
        </ul>
      </section>

      <section aria-label="Entitlements" className="mt-4 rounded-surface border border-border-solid/15 p-4">
        <h2 className="text-sm font-semibold text-content-primary">Entitlements · {active.name}</h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          <div><dt className="text-xs text-content-secondary">maxModels</dt><dd className="text-content-primary">{active.entitlements.maxModels === Number.POSITIVE_INFINITY ? "∞" : active.entitlements.maxModels}</dd></div>
          <div><dt className="text-xs text-content-secondary">maxPages</dt><dd className="text-content-primary">{active.entitlements.maxPages === Number.POSITIVE_INFINITY ? "∞" : active.entitlements.maxPages}</dd></div>
          <div><dt className="text-xs text-content-secondary">dwgImport</dt><dd className="text-content-primary">{String(active.entitlements.dwgImport)}</dd></div>
          <div><dt className="text-xs text-content-secondary">dxfImport</dt><dd className="text-content-primary">{String(active.entitlements.dxfImport)}</dd></div>
          <div><dt className="text-xs text-content-secondary">dwgExport</dt><dd className="text-content-primary">{String(active.entitlements.dwgExport)}</dd></div>
          <div><dt className="text-xs text-content-secondary">watermarked</dt><dd className="text-content-primary">{String(active.entitlements.watermarked)}</dd></div>
        </dl>
      </section>
      <SimNote>
        Educational clone — the real /admin route is a server-backed admin chunk (including
        RoomVersionInspectionPanel); this panel inspects the clone's own local state instead.
      </SimNote>
    </AppPage>
  );
}
