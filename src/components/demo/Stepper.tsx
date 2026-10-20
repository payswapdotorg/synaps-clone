"use client";

import { steps, type StepId } from "@/lib/demo";

type StepperProps = {
  current: StepId;
  /** Steps the user has reached at least once. */
  visited: StepId[];
  onSelect: (step: StepId) => void;
};

/**
 * Horizontal stepper for the demo flow.
 *
 * Mirrors the progress affordances recorded in ANALYSIS.md → COMPONENTS: a
 * mono index label ("[01] DRAFTING"), a sliding segmented thumb and the
 * dotted drafting grid. Steps the user has not reached yet are inert.
 */
export function Stepper({ current, visited, onSelect }: StepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === current);

  return (
    <nav aria-label="Demo progress" className="w-full">
      <ol className="flex flex-wrap items-stretch gap-1.5">
        {steps.map((step, index) => {
          const isCurrent = step.id === current;
          const isVisited = visited.includes(step.id);
          const isDone = index < currentIndex;
          const reachable = isVisited || isCurrent;

          return (
            <li key={step.id} className="min-w-[8.5rem] flex-1">
              <button
                type="button"
                onClick={() => reachable && onSelect(step.id)}
                disabled={!reachable}
                aria-current={isCurrent ? "step" : undefined}
                className={[
                  "group flex w-full flex-col gap-1 rounded-component border px-3 py-2.5 text-left transition-colors",
                  isCurrent
                    ? "border-accent-solid bg-accent-subtle"
                    : "border-border-solid/10 bg-surface-base hover:border-border-solid/25",
                  !reachable ? "opacity-45" : "",
                ].join(" ")}
              >
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={[
                      "font-mono text-2xs uppercase tracking-[0.14em]",
                      isCurrent
                        ? "text-accent-subtle-foreground"
                        : "text-content-muted",
                    ].join(" ")}
                  >
                    [{step.index}] {step.title}
                  </span>
                  {isDone ? (
                    <span
                      aria-hidden="true"
                      className="font-mono text-2xs text-accent-text"
                    >
                      ✓
                    </span>
                  ) : null}
                </span>
                <span className="text-caption leading-snug text-content-secondary">
                  {step.summary}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
