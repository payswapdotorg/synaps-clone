"use client";

import { useState } from "react";
import { AI_PROMPT_EXAMPLES } from "@/lib/onboarding-steps";
import { useDialogFocus } from "@/lib/dialog-focus";

/**
 * “Generate with AI” and “Upload floorplan” dialogs.
 *
 * OBSERVED (production bundle + live): the AI flow asks the user to
 * “Describe your floorplan…” with example prompts (Corner café / Townhouse /
 * Courtyard house, transcribed verbatim in onboarding-steps.ts); the upload
 * flow accepts an image and reports “Floor plan detected” before tracing.
 * Both consume credits in the original. In this clone both are local
 * simulations: no network calls, no image processing — the generated result
 * is a deterministic demo plan.
 */

export function GenerateAiDialog({
  onClose,
  onGenerate,
}: {
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [stage, setStage] = useState<"compose" | "generating">("compose");
  const valid = prompt.trim().length >= 12;
  // Dialog keyboard contract (focus in/out, Tab wrap, Escape — lib/dialog-focus.ts).
  // Escape follows the scrim rule: only while composing, not mid-generation.
  const panelRef = useDialogFocus<HTMLDivElement>(true, () => {
    if (stage === "compose") onClose();
  });

  function generate() {
    if (!valid) return;
    setStage("generating");
    window.setTimeout(() => onGenerate(prompt.trim()), 2600);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Generate with AI"
      onClick={(e) => e.target === e.currentTarget && stage === "compose" && onClose()}
    >
      <div ref={panelRef} className="w-full max-w-lg rounded-container border border-border-solid/15 bg-surface-base shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-solid/10 px-6 py-4">
          <h2 className="text-base font-semibold tracking-tight text-content-primary">
            Generate a floorplan
          </h2>
          {stage === "compose" && (
            <button type="button" onClick={onClose} aria-label="Close" className="text-content-secondary hover:text-content-primary">
              ✕
            </button>
          )}
        </div>

        {stage === "compose" ? (
          <div className="px-6 py-5">
            <label htmlFor="ai-prompt" className="text-sm font-medium text-content-primary">
              Describe your floorplan…
            </label>
            <textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="e.g. A two-bedroom apartment with an open kitchen, a south-facing living room and a small home office…"
              className="mt-2 w-full resize-none rounded-control border border-border-solid/30 bg-background px-4 py-3 text-sm text-content-primary focus:border-border-solid focus:outline-none"
            />
            <p className="mt-3 text-xs font-medium text-content-secondary">Try one of these</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {AI_PROMPT_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setPrompt(ex.prompt)}
                  className="rounded-full border border-border-solid/20 px-3 py-1.5 text-xs text-content-secondary hover:border-border-solid/50 hover:text-content-primary"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-content-secondary">Uses credits · simulated</span>
              <button
                type="button"
                onClick={generate}
                disabled={!valid}
                className="rounded-control px-6 py-2 text-sm font-medium text-accent-solid-foreground disabled:opacity-40"
                style={{ background: "var(--accent--solid)" }}
              >
                Generate floorplan
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-10 text-center" aria-live="polite">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border-solid/20 border-t-border-solid" />
            <p className="mt-4 text-sm font-medium text-content-primary">Generating your floorplan…</p>
            <p className="mt-1 text-xs text-content-secondary">
              Simulated generation — a demo plan will open in the console.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function UploadPlanDialog({
  onClose,
  onDone,
}: {
  onClose: () => void;
  onDone: () => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [stage, setStage] = useState<"pick" | "detect" | "trace">("pick");
  // Dialog keyboard contract (focus in/out, Tab wrap, Escape — lib/dialog-focus.ts).
  // Escape follows the scrim rule: only while picking, not mid-analysis.
  const panelRef = useDialogFocus<HTMLDivElement>(true, () => {
    if (stage === "pick") onClose();
  });

  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setStage("detect");
    window.setTimeout(() => setStage("trace"), 1600);
    window.setTimeout(onDone, 3400);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Upload floorplan"
      onClick={(e) => e.target === e.currentTarget && stage === "pick" && onClose()}
    >
      <div ref={panelRef} className="w-full max-w-md rounded-container border border-border-solid/15 bg-surface-base shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-solid/10 px-6 py-4">
          <h2 className="text-base font-semibold tracking-tight text-content-primary">
            Upload floorplan
          </h2>
          {stage === "pick" && (
            <button type="button" onClick={onClose} aria-label="Close" className="text-content-secondary hover:text-content-primary">
              ✕
            </button>
          )}
        </div>

        <div className="px-6 py-6">
          {stage === "pick" && (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-surface border border-dashed border-border-solid/40 bg-background px-6 py-10 text-center transition-colors hover:border-border-solid">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-content-secondary">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="mt-3 text-sm font-medium text-content-primary">
                Choose an image of an existing plan
              </span>
              <span className="mt-1 text-xs text-content-secondary">
                PNG or JPG — stays in your browser (simulated trace)
              </span>
              <input type="file" accept="image/*" className="sr-only" onChange={pick} />
            </label>
          )}

          {stage === "detect" && (
            <div className="py-6 text-center" aria-live="polite">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-border-solid/20 border-t-border-solid" />
              <p className="mt-3 text-sm text-content-primary">Analysing {fileName}…</p>
            </div>
          )}

          {stage === "trace" && (
            <div className="py-6 text-center" aria-live="polite">
              <p className="text-sm font-medium text-content-primary">Floor plan detected</p>
              <div className="mx-auto mt-3 h-7 w-7 animate-spin rounded-full border-2 border-border-solid/20 border-t-border-solid" />
              <p className="mt-3 text-xs text-content-secondary">Tracing into the console…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
