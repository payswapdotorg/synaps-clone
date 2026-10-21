"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, updateSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { FLAG_DEFS, flagValue, setFlag, resetFlags } from "@/lib/feature-flags";

/**
 * /settings — the observed settings surface (useSettingsModalsRouteRedirect
 * pattern: the real product opens settings as modals over the app; the route
 * renders the same panels). Sections: profile, team, analytics consent
 * (users.consentStatus / useAnalyticsConsent) and the feature-flag registry.
 */
export default function SettingsPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [saved, setSaved] = useState(false);
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const s = loadSession();
    setSession(s);
    if (s) {
      setName(s.user.name);
      setTeamName(activeTeam(s).name);
    }
    const f: Record<string, boolean> = {};
    for (const d of FLAG_DEFS) f[d.key] = flagValue(d.key);
    setFlags(f);
  }, []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in to view settings</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);

  function save() {
    updateSession((s) => ({
      ...s,
      user: { ...s.user, name },
      teams: s.teams.map((t) => (t.id === team.id ? { ...t, name: teamName } : t)),
    }));
    setSession(loadSession());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function toggleAnalytics(on: boolean) {
    updateSession((s) => ({ ...s, consents: { analytics: on } }));
    setSession(loadSession());
  }

  function toggleFlag(key: string) {
    const ok = setFlag(key as never, !flags[key]);
    if (ok) setFlags({ ...flags, [key]: !flags[key] });
  }

  return (
    <AppPage section="settings" title="Settings" subtitle="Profile, team, consent and feature flags" wide>
      <section aria-label="Profile" className="rounded-surface border border-border-solid/15 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="settings-name" className="block text-xs text-content-secondary">Name</label>
            <input
              id="settings-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            />
          </div>
          <div>
            <span className="block text-xs text-content-secondary">Email</span>
            <p className="mt-1.5 text-sm text-content-primary">{session.user.email}</p>
          </div>
        </div>
      </section>

      <section aria-label="Team" className="mt-4 rounded-surface border border-border-solid/15 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Team</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="settings-team" className="block text-xs text-content-secondary">Team name</label>
            <input
              id="settings-team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mt-1 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            />
          </div>
          <div>
            <span className="block text-xs text-content-secondary">Plan</span>
            <p className="mt-1.5 text-sm text-content-primary">
              {team.plan} · <Link href="/billing" className="underline underline-offset-2">manage in Billing</Link>
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Analytics consent" className="mt-4 rounded-surface border border-border-solid/15 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Analytics consent</h2>
        <p className="mt-2 text-sm text-content-secondary">
          The real product asks for analytics consent (users.consentStatus / useAnalyticsConsent)
          and gates Google Analytics (G-WYPS14KQRH) on it. This clone embeds no analytics at all —
          the toggle only records your choice locally.
        </p>
        <label className="mt-4 flex items-center gap-2 text-sm text-content-primary">
          <input
            type="checkbox"
            checked={session.consents.analytics}
            onChange={(e) => toggleAnalytics(e.target.checked)}
            className="size-4"
          />
          Share anonymous usage data (simulated consent — nothing is collected)
        </label>
      </section>

      <section aria-label="Feature flags" className="mt-4 rounded-surface border border-border-solid/15 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Feature flags</h2>
          <button
            type="button"
            onClick={() => {
              resetFlags();
              const f: Record<string, boolean> = {};
              for (const d of FLAG_DEFS) f[d.key] = flagValue(d.key);
              setFlags(f);
            }}
            className="rounded-control border border-border-solid/20 px-3 py-1 text-xs text-content-secondary hover:text-content-primary"
          >
            Reset
          </button>
        </div>
        <p className="mt-2 text-sm text-content-secondary">
          The exact flag registry recovered from the production bundle. Server-locked flags
          (allowLocalOverride: false) cannot be toggled — the clone honours that rule.
        </p>
        <ul className="mt-4 divide-y divide-border-solid/10">
          {FLAG_DEFS.map((d) => (
            <li key={d.key} className="flex items-center justify-between gap-4 py-2.5">
              <span>
                <code className="text-xs text-content-primary">{d.key}</code>
                <span className="block text-[11px] text-content-secondary">{d.note}</span>
              </span>
              <span className="flex items-center gap-2">
                {!d.allowLocalOverride && <span className="text-[10px] text-content-secondary">server-locked</span>}
                <button
                  type="button"
                  role="switch"
                  aria-checked={flags[d.key]}
                  aria-label={`Toggle ${d.key}`}
                  disabled={!d.allowLocalOverride}
                  onClick={() => toggleFlag(d.key)}
                  className={`relative h-5 w-9 rounded-pill transition-colors ${flags[d.key] ? "" : "border border-border-solid/20"} disabled:cursor-not-allowed disabled:opacity-50`}
                  style={{ background: flags[d.key] ? "var(--surface--controls--toggle-track-on)" : "var(--surface--raised)" }}
                >
                  <span
                    className="absolute top-0.5 size-4 rounded-full transition-all"
                    style={{
                      left: flags[d.key] ? "1.125rem" : "0.125rem",
                      background: "var(--surface--controls--toggle-knob)",
                    }}
                  />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-control px-5 py-2 text-sm font-medium text-accent-solid-foreground"
          style={{ background: "var(--accent--solid)" }}
        >
          Save changes
        </button>
        {saved && <span className="text-xs text-content-secondary">Saved locally.</span>}
      </div>

      <SimNote>
        Educational clone — settings panels mirror the modal surfaces implied by
        useSettingsModalsRouteRedirect, TeamSettingsModal and users.consentStatus in the
        production bundle. The feature-flag registry is transcribed verbatim from the bundle.
      </SimNote>
    </AppPage>
  );
}
