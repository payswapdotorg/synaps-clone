"use client";

import { useEffect, useState } from "react";
import { ONBOARDING_STEPS, type OnboardingStep } from "@/lib/onboarding-steps";
import { activeTeam, loadSession, saveSession } from "@/lib/session";

/**
 * Onboarding questionnaire — reconstruction of the OBSERVED wizard.
 *
 * The step definitions (titles, kickers, options, multi/columns flags) are
 * transcribed verbatim from the production bundle (see
 * src/lib/onboarding-steps.ts). The original shows rotating artwork next to
 * the question sheet; this clone replaces it with original SVG scenes built
 * from the same canvas design tokens.
 */
function stepValid(step: OnboardingStep, value: unknown): boolean {
  if (step.kind === "input") {
    if (typeof value !== "string") return false;
    const t = value.trim();
    if (step.inputType === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
    return t.length > 0;
  }
  if (step.multi) return Array.isArray(value) && value.length > 0;
  return typeof value === "string" && value.length > 0;
}

const STEP_ART: Record<string, "plans" | "elements" | "tracer" | "generator" | "shadows" | "spatial" | "assets" | "angle"> = {
  email: "plans",
  name: "elements",
  role: "tracer",
  tools: "generator",
  designing: "shadows",
  size: "spatial",
  collaboration: "assets",
  start: "angle",
};

function StepArt({ motif }: { motif: string }) {
  const common = "absolute inset-0 h-full w-full";
  return (
    <svg viewBox="0 0 320 520" className={common} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`ob-dots-${motif}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--accent--canvas--dot)" fillOpacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#ob-dots-${motif})`} />
      {(motif === "plans" || motif === "generator") && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <path d="M60 80h200v180H60z" />
          <path d="M60 170h110M170 80v90M170 170h90M230 170v90" />
          <path d="M110 80v-30h60v30" opacity="0.5" />
        </g>
      )}
      {motif === "elements" && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <circle cx="160" cy="150" r="60" />
          <path d="M160 60v60M100 150h60M160 210v60" opacity="0.5" />
          <path d="M100 270h120" strokeDasharray="4 5" opacity="0.6" />
        </g>
      )}
      {motif === "tracer" && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <path d="M70 90l180 60-40 120-180-60z" />
          <path d="M115 120l90 30-20 60-90-30z" opacity="0.5" />
        </g>
      )}
      {motif === "shadows" && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <path d="M60 100h90v90H60zM160 190h100v90H160z" />
          <path d="M150 190l10 0M60 190h100" opacity="0.5" />
        </g>
      )}
      {motif === "spatial" && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <path d="M70 240h180l-60-120H70z" />
          <path d="M70 240h180v40H70z" opacity="0.5" />
        </g>
      )}
      {motif === "assets" && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <path d="M80 120h60v60H80zM180 120h60v60h-60zM80 220h60v60H80zM180 220h60v60h-60z" />
        </g>
      )}
      {motif === "angle" && (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.6" fill="none">
          <path d="M70 250h180V90" />
          <path d="M70 250a160 160 0 0 1 112-160" strokeDasharray="3 5" opacity="0.7" />
          <path d="M76 244l-12 12M244 96l12-12" opacity="0.6" />
        </g>
      )}
      <g stroke="var(--accent--canvas--guide)" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M20 20h40M20 20v40M300 500h-40M300 500v-40" />
      </g>
    </svg>
  );
}

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [text, setText] = useState("");
  const [completing, setCompleting] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate known email/name from the simulated session (post-hydration —
  // a render-phase read here caused a React #418 mismatch on first paint)
  useEffect(() => {
    const s = loadSession();
    if (s) {
      setAnswers((a) => ({ email: s.user.email, name: s.user.name, ...a }));
    }
    setReady(true);
  }, []);

  const step = ONBOARDING_STEPS[index];
  const isLast = index === ONBOARDING_STEPS.length - 1;
  const value = answers[step.id];
  const valid = stepValid(step, value);

  function setValue(v: unknown) {
    setAnswers((a) => ({ ...a, [step.id]: v }));
  }

  function next() {
    if (!valid) return;
    if (isLast) {
      finish();
    } else {
      setIndex((i) => i + 1);
      setText("");
    }
  }

  function back() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function finish() {
    setCompleting(true);
    const s = loadSession();
    if (s) {
      // journeyProject: the bundle seeds a starter project from the
      // questionnaire answers (onboarding-generated-floors flag); the clone
      // creates a matching "journey" model unless the user picked "fresh".
      const start = (answers["start"] as string) || "fresh";
      const team = activeTeam(s);
      const next = { ...s, onboarding: answers as Record<string, string | string[]> };
      if (start !== "fresh" && team.models.length < team.entitlements.maxModels) {
        const designing = (answers["designing"] as string) ?? "apartment";
        const nameMap: Record<string, string> = {
          apartment: "Apartment starter",
          house: "House starter",
          office: "Workspace starter",
          retail: "Retail starter",
          public: "Public space starter",
          exploring: "Exploration starter",
        };
        next.teams = next.teams.map((t) =>
          t.id === team.id
            ? {
                ...t,
                models: [
                  {
                    id: `m-${Math.random().toString(36).slice(2, 10)}`,
                    name: nameMap[designing] ?? "Starter project",
                    spaceId: t.spaces[0]?.id ?? "sp-residential",
                    pages: [{ id: `p-${Math.random().toString(36).slice(2, 10)}`, name: "Page 1" }],
                    edited: new Date().toISOString(),
                    source: "journey" as const,
                  },
                  ...t.models,
                ],
              }
            : t,
        );
      }
      saveSession(next);
      window.location.href = `/t/${team.id}`;
    } else {
      window.location.href = "/login";
    }
  }

  function skip() {
    const s = loadSession();
    if (s) {
      saveSession({ ...s, onboarding: { skipped: "true" } });
      window.location.href = `/t/${activeTeam(s).id}`;
    }
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <p className="text-sm text-content-secondary">Loading…</p>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen bg-surface-base lg:grid-cols-[1fr_360px]">
      {/* Question sheet */}
      <section className="flex flex-col px-6 py-10 sm:px-12" aria-label="Onboarding questionnaire">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
          <div className="flex items-center justify-between">
            <span className="ds-accent-mono text-2xs">
              {String(index + 1).padStart(2, "0")} / {String(ONBOARDING_STEPS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={skip}
              className="text-xs text-content-secondary underline-offset-2 hover:underline"
            >
              Skip for now
            </button>
          </div>

          {/* progress */}
          <div
            className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-raised"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={ONBOARDING_STEPS.length}
            aria-valuenow={index + 1}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((index + 1) / ONBOARDING_STEPS.length) * 100}%`,
                background: "var(--accent--canvas--guide, var(--accent--blue))",
              }}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center py-10">
            <p className="ds-accent-mono text-2xs uppercase tracking-wide text-content-secondary">
              {step.sheetKicker}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl">
              {step.title}
            </h1>
            {step.subtitle && (
              <p className="mt-2 text-sm text-content-secondary">{step.subtitle}</p>
            )}

            <div className="mt-8">
              {step.kind === "input" ? (
                <input
                  type={step.inputType === "email" ? "email" : "text"}
                  value={typeof value === "string" ? value : text}
                  placeholder={step.placeholder}
                  autoFocus
                  onChange={(e) => {
                    setText(e.target.value);
                    setValue(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  className="w-full max-w-md rounded-control border border-border-solid/30 bg-background px-4 py-3 text-base text-content-primary focus:border-border-solid focus:outline-none"
                />
              ) : (
                <div
                  className={
                    step.columns === 2
                      ? "grid max-w-2xl gap-3 sm:grid-cols-2"
                      : "grid max-w-2xl gap-3"
                  }
                  role={step.multi ? "group" : "radiogroup"}
                  aria-label={step.title}
                >
                  {step.options?.map((opt) => {
                    const selected = step.multi
                      ? Array.isArray(value) && value.includes(opt.value)
                      : value === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role={step.multi ? "checkbox" : "radio"}
                        aria-checked={selected}
                        onClick={() => {
                          if (step.multi) {
                            const arr = Array.isArray(value) ? [...value] : [];
                            const i = arr.indexOf(opt.value);
                            if (i >= 0) arr.splice(i, 1);
                            else arr.push(opt.value);
                            setValue(arr);
                          } else {
                            setValue(opt.value);
                          }
                        }}
                        className={`rounded-control border px-4 py-3 text-left transition-colors ${
                          selected
                            ? "border-border-solid bg-surface-raised"
                            : "border-border-solid/20 bg-background hover:border-border-solid/50"
                        }`}
                      >
                        <span className="block text-sm font-medium text-content-primary">
                          {opt.label}
                        </span>
                        {opt.detail && (
                          <span className="mt-0.5 block text-xs text-content-secondary">
                            {opt.detail}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border-solid/10 pt-6">
            <button
              type="button"
              onClick={back}
              disabled={index === 0}
              className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!valid || completing}
              className="rounded-control px-6 py-2.5 text-sm font-medium text-content-inverse transition-opacity disabled:opacity-40"
              style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
            >
              {completing ? "Setting up…" : isLast ? "Finish" : "Continue"}
            </button>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-content-secondary">
            Educational clone — the questionnaire is reconstructed verbatim from
            the original product’s public bundle; your answers stay in this
            browser.
          </p>
        </div>
      </section>

      {/* Rotating artwork */}
      <aside className="relative hidden overflow-hidden border-l border-border-solid/10 lg:block" aria-hidden="true">
        <StepArt motif={STEP_ART[step.id] || "plans"} />
      </aside>
    </main>
  );
}
