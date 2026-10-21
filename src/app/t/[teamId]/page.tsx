"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  loadSession,
  addModel,
  saveSession,
  FREE_MODEL_LIMIT,
  type SimSession,
} from "@/lib/session";
import { AI_PROMPT_EXAMPLES } from "@/lib/onboarding-steps";
import { GenerateAiDialog, UploadPlanDialog } from "@/components/console/HomeDialogs";

function relTime(iso: string): string {
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    void params.then((p) => setTeamId(p.teamId));
    setSession(loadSession());
  }, [params]);

  const models = useMemo(() => session?.models ?? [], [session]);

  useEffect(() => {
    if (!session) return;
    if (teamId && teamId !== session.team.id) {
      window.location.replace(`/t/${session.team.id}`);
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

  const sess = session;

  function createModel(source: "scratch" | "ai" | "upload" | "template", prompt?: string, name?: string) {
    if (models.length >= FREE_MODEL_LIMIT) {
      setLimitOpen(true);
      return null;
    }
    const { session: s2, model } = addModel(sess, { source, prompt, name });
    setSession(s2);
    return model;
  }

  return (
    <main className="flex min-h-screen bg-surface-base">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border-solid/10 bg-surface-base px-4 py-5 md:flex" aria-label="Team navigation">
        <div className="relative">
          <button
            type="button"
            aria-label="Switch team"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-control px-2 py-1.5 text-sm font-medium text-content-primary hover:bg-surface-raised"
          >
            <span className="truncate">{session.team.name}</span>
            <span className="text-[10px] text-content-secondary">Free</span>
          </button>
          {menuOpen && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-control border border-border-solid/15 bg-surface-base p-1 shadow-lg" role="menu">
              <div className="px-3 py-2 text-xs text-content-secondary">{session.user.email}</div>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  saveSession(null);
                  window.location.href = "/login";
                }}
                className="w-full rounded-control px-3 py-2 text-left text-sm text-content-primary hover:bg-surface-raised"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <nav className="mt-6 space-y-1 text-sm">
          <span className="block rounded-control bg-surface-raised px-3 py-1.5 font-medium text-content-primary">
            Home
          </span>
          <Link href="/t/recent" className="block rounded-control px-3 py-1.5 text-content-secondary hover:bg-surface-raised hover:text-content-primary">
            Recent
          </Link>
          <p className="px-3 pt-4 pb-1 text-2xs font-semibold uppercase tracking-wide text-content-secondary">
            Spaces
          </p>
          {session.spaces.map((sp) => (
            <Link
              key={sp.id}
              href={`/t/${teamId}/w/${sp.id}`}
              className="block rounded-control px-3 py-1.5 text-content-secondary hover:bg-surface-raised hover:text-content-primary"
            >
              {sp.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-control border border-border-solid/15 px-3 py-2 text-xs text-content-secondary">
          <span className="font-medium text-content-primary">{session.team.credits} credits</span>
          <span className="block text-2xs">Free plan · simulated</span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border-solid/10 px-6 py-3">
          <span className="text-sm font-semibold tracking-tight text-content-primary">Synaps Clone</span>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-content-secondary sm:block">
              {session.team.credits} credits
            </span>
            <button
              type="button"
              aria-label="Account menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-7 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-content-primary"
            >
              {session.user.name.slice(0, 1).toUpperCase()}
            </button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
          <h1 className="text-2xl font-semibold tracking-tight text-content-primary">
            What are we creating today?
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                const m = createModel("scratch");
                if (m) window.location.href = `/m/${m.id}?pageId=${m.pageId}`;
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
                Trace an existing plan image into the console.
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

            <button
              type="button"
              onClick={() => {
                const m = createModel("template", AI_PROMPT_EXAMPLES[1].prompt, "Demo project");
                if (m) window.location.href = `/m/${m.id}?pageId=${m.pageId}&demo=1`;
              }}
              className="group rounded-surface border border-border-solid/15 bg-surface-base p-5 text-left transition-colors hover:border-border-solid/40"
            >
              <span className="ds-accent-mono text-2xs">04</span>
              <span className="mt-2 block text-base font-medium text-content-primary">Try Synaps demo project</span>
              <span className="mt-1 block text-sm text-content-secondary">
                Open a pre-drafted demo model in the console.
              </span>
            </button>
          </div>

          <section className="mt-14" aria-label="Continue working">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">
              Continue working
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => (
                <Link
                  key={m.id}
                  href={`/m/${m.id}?pageId=${m.pageId}${m.id === "m-uploaded-plan" || m.source === "ai" || m.source === "template" ? "&demo=1" : ""}`}
                  className="rounded-surface border border-border-solid/15 bg-surface-base p-4 transition-colors hover:border-border-solid/40"
                >
                  <span className="ds-accent-mono text-2xs">{m.source}</span>
                  <span className="mt-1.5 block text-sm font-medium text-content-primary">{m.name}</span>
                  <span className="mt-0.5 block text-xs text-content-secondary">
                    {session.spaces.find((s) => s.id === m.spaceId)?.name ?? "Residential Projects"} ·{" "}
                    Edited {relTime(m.edited)}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <p className="mt-16 text-[11px] leading-relaxed text-content-secondary">
            Educational clone — this home screen reconstructs the observed
            authenticated surface of the original product. Teams, credits and
            the Free-plan limit are simulated locally in your browser.
          </p>
        </div>
      </div>

      {aiOpen && (
        <GenerateAiDialog
          onClose={() => setAiOpen(false)}
          onGenerate={(prompt) => {
            const m = createModel("ai", prompt);
            if (m) window.location.href = `/m/${m.id}?pageId=${m.pageId}&demo=1`;
          }}
        />
      )}
      {uploadOpen && (
        <UploadPlanDialog
          onClose={() => setUploadOpen(false)}
          onDone={() => {
            const m = createModel("upload", undefined, "Uploaded Plan");
            if (m) window.location.href = `/m/${m.id}?pageId=${m.pageId}&demo=1`;
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
