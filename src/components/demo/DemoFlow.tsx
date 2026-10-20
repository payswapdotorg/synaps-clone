"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Stepper } from "@/components/demo/Stepper";
import {
  ConfigurePanel,
  DeliverPanel,
  DraftPanel,
  ProcessingPanel,
  PolishPanel,
  SourcePanel,
} from "@/components/demo/panels";
import { validateConfigure, type StepId, type ValidationErrors } from "@/lib/demo";
import {
  currentCost,
  demoReducer,
  initialState,
  nextStep,
  prevStep,
} from "@/lib/demo-state";

/**
 * The interactive demo flow.
 *
 * Client-side only. There are no network calls anywhere in this component
 * tree: the "processing" step is a timer, the plan is drawn from hand-authored
 * SVG, and the export is a description of a file that is never written to
 * disk. Nothing here verifies identity, and nothing here talks to the
 * original service.
 */
export function DemoFlow() {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const cost = currentCost(state.source);

  /* -- Processing timer --------------------------------------------------- */
  useEffect(() => {
    if (state.step !== "processing") return;

    if (state.status === "idle") {
      dispatch({ type: "process-start" });
      return;
    }

    if (state.status !== "running") return;

    const timer = window.setTimeout(() => {
      const amount = 7 + Math.random() * 12;
      const projected = state.progress + amount;

      if (state.simulateFailure && projected >= 45) {
        dispatch({ type: "process-fail" });
        return;
      }

      if (projected >= 100) {
        dispatch({ type: "process-done" });
        dispatch({ type: "consume-credits", amount: cost });
        return;
      }

      dispatch({ type: "process-tick", amount });
    }, 280);

    return () => window.clearTimeout(timer);
  }, [state.step, state.status, state.progress, state.simulateFailure, cost]);

  /* -- Validation --------------------------------------------------------- */
  const computedErrors = useMemo(
    () =>
      validateConfigure({
        source: state.source,
        prompt: state.prompt,
        fileName: state.fileName,
        floors: state.floors,
        credits: state.credits,
      }),
    [state.source, state.prompt, state.fileName, state.floors, state.credits],
  );

  const visibleErrors = showErrors ? computedErrors : {};

  /* -- Navigation --------------------------------------------------------- */
  const canAdvance = useCallback((): boolean => {
    if (state.step === "configure") {
      if (Object.keys(computedErrors).length > 0) {
        setErrors(computedErrors);
        setShowErrors(true);
        return false;
      }
      setErrors({});
      setShowErrors(false);
      return true;
    }

    if (state.step === "processing") {
      return state.status === "done";
    }

    return true;
  }, [state.step, state.status, computedErrors]);

  const handleNext = useCallback(() => {
    if (!canAdvance()) return;
    dispatch({ type: "next" });
  }, [canAdvance]);

  const handleBack = useCallback(() => {
    setShowErrors(false);
    dispatch({ type: "back" });
  }, []);

  const handleGoto = useCallback((step: StepId) => {
    setShowErrors(false);
    dispatch({ type: "goto", step });
  }, []);

  const handleReset = useCallback(() => {
    setShowErrors(false);
    setErrors({});
    dispatch({ type: "reset" });
  }, []);

  /* -- Render ------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      <Stepper
        current={state.step}
        visited={state.visited}
        onSelect={handleGoto}
      />

      {state.step === "source" ? (
        <SourcePanel state={state} dispatch={dispatch} />
      ) : null}

      {state.step === "configure" ? (
        <ConfigurePanel state={state} dispatch={dispatch} errors={visibleErrors} />
      ) : null}

      {state.step === "processing" ? (
        <ProcessingPanel state={state} dispatch={dispatch} />
      ) : null}

      {state.step === "draft" ? (
        <DraftPanel state={state} dispatch={dispatch} />
      ) : null}

      {state.step === "polish" ? (
        <PolishPanel state={state} dispatch={dispatch} />
      ) : null}

      {state.step === "deliver" ? (
        <DeliverPanel state={state} dispatch={dispatch} />
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <p
          role="alert"
          className="rounded-component border border-rose-border bg-rose-subtle px-4 py-3 text-sm text-rose-subtle-foreground"
        >
          Fix the highlighted fields before continuing.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-solid/10 pt-5">
        <button
          type="button"
          onClick={handleBack}
          disabled={state.step === "source"}
          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-control px-3 py-2 text-sm text-content-muted hover:text-content-primary"
          >
            Reset demo
          </button>

          {state.step !== "deliver" ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-control bg-accent-solid px-5 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
            >
              {state.step === "processing" ? "Open the draft" : "Continue"}
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-control bg-accent-solid px-5 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
            >
              Run it again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
