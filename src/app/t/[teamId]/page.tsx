"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  activeTeam,
  addModel,
  loadSession,
  type SimSession,
  type SimTeam,
} from "@/lib/session";
import { AI_PROMPT_EXAMPLES } from "@/lib/onboarding-steps";
import { GenerateAiDialog, UploadPlanDialog } from "@/components/console/HomeDialogs";
import { AppTopBar, TeamSidebar } from "@/components/app/TeamSidebar";

export function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}

export default function TeamHome({ params }: { params: Promise<{ teamId: string }> }) {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [session, setSession] = useState<SimSession | null>(null);
  const [limitOpen, setLimitOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    void params.then((p) => setTeamId(p.teamId));
    setSession(loadSession());
  }, [params]);

  useEffect(() => {
    if (!session || !teamId) return;
    if (teamId !== activeTeam(session).id && !session.teams.some((t) => t.id === teamId)) {
      window.location.replace(`/t/${activeTeam(session).id}`);
    }
  }, [session, teamId]);

  if (!session || !teamId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <div className="text-center">
          <p className="text-sm text-content-secondary">
            {session === null && teamId === null ? "Loading…" : "No session — sign in first."}
          </p>
          {session === null && teamId !== null && (
            <Link href="/login" className="mt-4 inline-block text-sm underline underline-offset-2">
              Go to sign-in
            </Link>
          )}
        </div>
      </main>
    );
  }

  const team: SimTeam = session.teams.find((t) => t.id === teamId) ?? activeTeam(session);
  const models = team.models;
  const sess = session;

  function createModel(source: "scratch" | "ai" | "upload" | "template", prompt?: string, name?: string) {
    if (models.length >= team.entitlements.maxModels) {
      setLimitOpen(true);
      return null;
    }
    const { session: s2, model } = addModel(sess, { source, prompt, name, teamId: team.id });
    setSession(s2);
    return model;
  }

  return (
    <main className="flex min-h-screen bg-surface-base">
      <TeamSidebar teamId={team.id} active="home" />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar teamId={team.id} />

        <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
          <h1 className="text-2xl font-semibold tracking-tight text-content-primary">
            What are we creating today?
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                const m = createModel("scratch");
                if (m) window.location.href = `/m/${m.id}?pageId=${m.pages[0].id}`;
              }}
              className="group rounded-surface border border-border-solid/15 bg-surface-base p-5 text-left transition-colors hover:border-border-solid/40"
            >
              <span className="ds-accent-mono text-2xs">01</span>
              <span className="mt-2 block text-base font-medium text-content-primary">Start from scratch</span>
              <span className="mt-1 block text-sm text-content-secondary">
                Open the drafting console on an empty canvas.
              </span>
            </button>

            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="group rounded-surface border border-border-solid/15 bg-surface-base p-5 text-left transition-colors hover:border-border-solid/40"
            >
              <span className="ds-accent-mono text-2xs">02</span>
              <span className="mt-2 block text-base font-medium text-content-primary">Upload floorplan</span>
              <span className="mt-1 block text-sm text-content-secondary">
                Trace an existing plan (image, PDF, SVG, DXF, DWG) into the console.
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAiOpen(true)}
              className="group rounded-surface border border-border-solid/15 bg-surface-base p-5 text-left transition-colors hover:border-border-solid/40"
            >
              <span className="ds-accent-mono text-2xs">03</span>
              <span className="mt-2 block text-base font-medium text-content-primary">Generate with AI</span>
              <span className="mt-1 block text-sm text-content-secondary">
                Describe what you want and let the mock generator draft it.
              </span>
            </button>

            <Link
              href={`/t/${team.id}/templates`}
              className="group rounded-surface border border-border-solid/15 bg-surface-base p-5 text-left transition-colors hover:border-border-solid/40"
            >
              <span className="ds-accent-mono text-2xs">04</span>
              <span className="mt-2 block text-base font-medium text-content-primary">Start from a template</span>
              <span className="mt-1 block text-sm text-content-secondary">
                Instantiate a starter plan (café, townhouse, courtyard…).
              </span>
            </Link>
          </div>

          <section className="mt-14" aria-label="Continue working">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">
              Continue working
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => (
                <Link
                  key={m.id}
                  href={`/m/${m.id}?pageId=${m.pages[0].id}${m.id === "m-uploaded-plan" || m.source === "ai" || m.source === "template" ? "&demo=1" : ""}`}
                  className="rounded-surface border border-border-solid/15 bg-surface-base p-4 transition-colors hover:border-border-solid/40"
                >
                  <span className="ds-accent-mono text-2xs">{m.source}</span>
                  <span className="mt-1.5 block text-sm font-medium text-content-primary">{m.name}</span>
                  <span className="mt-0.5 block text-xs text-content-secondary">
                    {team.spaces.find((s) => s.id === m.spaceId)?.name ?? "Residential Projects"} ·{" "}
                    {m.pages.length} page{m.pages.length === 1 ? "" : "s"} · Edited {relTime(m.edited)}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <p className="mt-16 text-[11px] leading-relaxed text-content-secondary">
            Educational clone — this home screen reconstructs the observed
            authenticated surface of the original product. Teams, credits and
            the {team.plan}-plan limit are simulated locally in your browser.
          </p>
        </div>
      </div>

      {aiOpen && (
        <GenerateAiDialog
          onClose={() => setAiOpen(false)}
          onGenerate={(prompt) => {
            const m = createModel("ai", prompt);
            if (m) window.location.href = `/m/${m.id}?pageId=${m.pages[0].id}&demo=1`;
          }}
        />
      )}
      {uploadOpen && (
        <UploadPlanDialog
          onClose={() => setUploadOpen(false)}
          onDone={() => {
            const m = createModel("upload", undefined, "Uploaded Plan");
            if (m) window.location.href = `/m/${m.id}?pageId=${m.pages[0].id}&demo=1`;
          }}
        />
      )}
      {limitOpen && <FreeLimitModal onClose={() => setLimitOpen(false)} />}
    </main>
  );
}

function FreeLimitModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Free plan limit"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-container border border-border-solid/15 bg-surface-base p-8 shadow-2xl">
        <h2 className="text-lg font-semibold tracking-tight text-content-primary">Free plan limit</h2>
        <p className="mt-2 text-sm text-content-secondary">
          You have reached the Free model limit
        </p>
        <p className="mt-4 text-sm text-content-secondary">
          Free includes three models. Upgrade to Pro for unlimited models across your projects.
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-content-secondary">
          <li>· Unlimited models</li>
          <li>· Unlimited pages</li>
          <li>· A monthly credit balance that rolls over</li>
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <Link href="/pricing" className="text-sm text-content-secondary underline underline-offset-2">
            Compare plans
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-control px-6 py-2 text-sm font-medium text-content-inverse"
            style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
          >
            Upgrade to Pro
          </button>
        </div>
        <p className="mt-4 text-[11px] text-content-secondary">
          Simulated paywall — the clone never charges anything.
        </p>
      </div>
    </div>
  );
}
