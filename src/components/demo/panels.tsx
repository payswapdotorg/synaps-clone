"use client";

import type { Dispatch, ReactNode } from "react";
import { PlanCanvas } from "@/components/demo/PlanCanvas";
import { RoomScene } from "@/components/demo/RoomScene";
import {
  cameraOptions,
  finishOptions,
  formatBytes,
  layerOptions,
  mockFileNames,
  mockPromptSuggestion,
  mockRooms,
  sourceOptions,
  timeLabel,
  validateConfigure,
  type ValidationErrors,
} from "@/lib/demo";
import type { DemoAction, DemoState } from "@/lib/demo-state";

type PanelProps = {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
  errors: ValidationErrors;
};

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                 */
/* -------------------------------------------------------------------------- */

function Card({
  title,
  children,
  aside,
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="rounded-surface border border-border-solid/10 bg-surface-base">
      <header className="flex items-center justify-between gap-4 border-b border-border-solid/10 px-5 py-3">
        <h2 className="font-mono text-2xs uppercase tracking-[0.14em] text-content-muted">
          {title}
        </h2>
        {aside}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-content-primary">{label}</span>
        {hint ? (
          <span className="font-mono text-2xs text-content-muted">{hint}</span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-start gap-1.5 text-caption text-rose-text">
          <span aria-hidden="true">⚠</span>
          {error}
        </span>
      ) : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-control border border-border-solid/20 bg-background px-3 py-2 text-sm text-content-primary placeholder:text-content-disabled focus:border-accent-solid focus:outline-none";

/* -------------------------------------------------------------------------- */
/* 01 — Source                                                                 */
/* -------------------------------------------------------------------------- */

export function SourcePanel({
  state,
  dispatch,
}: Omit<PanelProps, "errors">) {
  return (
    <Card
      title="Source"
      aside={
        <span className="font-mono text-2xs text-content-muted">
          {state.credits} credits available
        </span>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {sourceOptions.map((option) => {
          const selected = state.source === option.kind;
          return (
            <button
              key={option.kind}
              type="button"
              onClick={() =>
                dispatch({ type: "set-source", source: option.kind })
              }
              aria-pressed={selected}
              className={[
                "flex flex-col gap-2 rounded-component border p-4 text-left transition-colors",
                selected
                  ? "border-accent-solid bg-accent-subtle"
                  : "border-border-solid/15 bg-background hover:border-border-solid/30",
              ].join(" ")}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-2xs uppercase tracking-[0.14em] text-content-muted">
                  {option.tag}
                </span>
                <span
                  className={[
                    "rounded-pill px-2 py-0.5 font-mono text-2xs",
                    selected
                      ? "bg-accent-solid text-accent-solid-foreground"
                      : "bg-control-button-default text-content-secondary",
                  ].join(" ")}
                >
                  {option.cost === 0 ? "Free" : `${option.cost} cr`}
                </span>
              </span>
              <span className="text-base font-medium text-content-primary">
                {option.title}
              </span>
              <span className="text-sm leading-relaxed text-content-secondary">
                {option.body}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* 02 — Configure                                                              */
/* -------------------------------------------------------------------------- */

export function ConfigurePanel({ state, dispatch, errors }: PanelProps) {
  return (
    <Card title="Configure">
      {state.source === "generate" ? (
        <div className="space-y-4">
          <Field
            label="Describe the space"
            hint="Describe the space. Get an editable plan."
            error={errors.prompt}
          >
            <textarea
              value={state.prompt}
              onChange={(event) =>
                dispatch({ type: "set-prompt", prompt: event.target.value })
              }
              rows={4}
              placeholder={mockPromptSuggestion}
              aria-invalid={Boolean(errors.prompt)}
              className={inputClass}
            />
          </Field>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "set-prompt", prompt: mockPromptSuggestion })
            }
            className="text-caption text-accent-text underline underline-offset-2"
          >
            Use the example prompt
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Field
            label="File"
            hint="Any photo, scan or sketch"
            error={errors.file}
          >
            <div className="flex flex-wrap items-center gap-3">
              <label className="btn-secondary touch-height cursor-pointer">
                Choose a file
                <input
                  type="file"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      dispatch({
                        type: "set-file",
                        fileName: file.name,
                        fileSize: file.size,
                      });
                    }
                  }}
                />
              </label>
              <span className="font-mono text-2xs text-content-muted">
                DWG · DXF · PDF · PNG · JPG
              </span>
            </div>
          </Field>

          {state.fileName ? (
            <div className="flex items-center justify-between gap-3 rounded-component border border-border-solid/15 bg-background px-3 py-2">
              <span className="truncate text-sm text-content-primary">
                {state.fileName}
              </span>
              <span className="font-mono text-2xs text-content-muted">
                {formatBytes(state.fileSize)}
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-mono text-2xs uppercase tracking-[0.14em] text-content-muted">
                No file chosen — pick one of these samples
              </p>
              <div className="flex flex-wrap gap-2">
                {mockFileNames.map((name, index) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "set-file",
                        fileName: name,
                        fileSize: 240_000 + index * 180_000,
                      })
                    }
                    className="rounded-control border border-border-solid/20 px-3 py-1.5 font-mono text-2xs text-content-secondary hover:border-accent-solid hover:text-accent-text"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Floors" hint="1 – 12" error={errors.floors}>
          <input
            type="number"
            min={1}
            max={12}
            value={state.floors}
            onChange={(event) =>
              dispatch({
                type: "set-floors",
                floors: Number(event.target.value),
              })
            }
            aria-invalid={Boolean(errors.floors)}
            className={inputClass}
          />
        </Field>

        <Field label="Credits" hint="Billing is simulated" error={errors.credits}>
          <div className="rounded-control border border-border-solid/20 bg-background px-3 py-2">
            <span className="font-mono text-sm text-content-primary">
              {state.credits} credits
            </span>
            <span className="ml-2 text-caption text-content-muted">
              this step costs{" "}
              {sourceOptions.find((o) => o.kind === state.source)?.cost ?? 0}
            </span>
          </div>
        </Field>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* 03 — Processing                                                             */
/* -------------------------------------------------------------------------- */

export function ProcessingPanel({ state, dispatch }: Omit<PanelProps, "errors">) {
  const running = state.status === "running";
  const failed = state.status === "error";
  const done = state.status === "done";

  return (
    <Card title="Processing">
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between font-mono text-2xs text-content-muted">
            <span>
              {done
                ? "Plan ready"
                : failed
                  ? "Stopped"
                  : running
                    ? "Building the plan…"
                    : "Ready"}
            </span>
            <span>{Math.round(state.progress)}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={Math.round(state.progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 w-full overflow-hidden rounded-pill bg-control-button-default"
          >
            <div
              className="h-full rounded-pill bg-accent-solid transition-[width] duration-200"
              style={{ width: `${state.progress}%` }}
            />
          </div>
        </div>

        {failed ? (
          <div
            role="alert"
            className="rounded-component border border-rose-border bg-rose-subtle p-4"
          >
            <p className="text-sm font-medium text-rose-subtle-foreground">
              The plan could not be built
            </p>
            <p className="mt-1 text-caption text-content-secondary">
              Simulated failure — this is a mock response, no service was
              contacted. Adjust the input and try again.
            </p>
            <button
              type="button"
              onClick={() => dispatch({ type: "process-start" })}
              className="btn-secondary mt-3"
            >
              Retry
            </button>
          </div>
        ) : null}

        {done ? (
          <div className="rounded-component border border-accent-solid bg-accent-subtle p-4">
            <p className="text-sm font-medium text-accent-subtle-foreground">
              Plan built
            </p>
            <p className="mt-1 text-caption text-content-secondary">
              {state.floors} floor{state.floors === 1 ? "" : "s"} ·{" "}
              {mockRooms.length} rooms · layers ready
            </p>
          </div>
        ) : null}

        <label className="flex items-center gap-2 text-caption text-content-secondary">
          <input
            type="checkbox"
            checked={state.simulateFailure}
            onChange={() => dispatch({ type: "toggle-simulate-failure" })}
            className="h-4 w-4 accent-[var(--accent--solid)]"
          />
          Simulate a failure on the next run
        </label>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* 04 — Draft                                                                  */
/* -------------------------------------------------------------------------- */

export function DraftPanel({ state, dispatch }: Omit<PanelProps, "errors">) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <Card
        title="Drafting canvas"
        aside={
          <span className="font-mono text-2xs text-content-muted">
            {state.angle}°
            {state.angleLocked ? " · locked" : ""}
          </span>
        }
      >
        <div className="rounded-inset border border-border-solid/10 bg-background">
          <PlanCanvas
            layers={state.layers}
            selectedRoom={state.selectedRoom}
            showGuides={state.showGuides}
            showCrosshair={state.showCrosshair}
            className="h-auto w-full"
          />
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {mockRooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => dispatch({ type: "select-room", room: room.id })}
              aria-pressed={state.selectedRoom === room.id}
              className={[
                "rounded-control border px-3 py-2 text-left",
                state.selectedRoom === room.id
                  ? "border-accent-solid bg-accent-subtle"
                  : "border-border-solid/15 hover:border-border-solid/30",
              ].join(" ")}
            >
              <span className="block text-sm text-content-primary">
                {room.name}
              </span>
              <span className="block font-mono text-2xs text-content-muted">
                {room.area}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-5">
        <Card title="Layers">
          <ul className="space-y-1.5">
            {layerOptions.map((layer) => (
              <li key={layer.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-control px-2 py-1.5 hover:bg-control-button-default">
                  <input
                    type="checkbox"
                    checked={state.layers[layer.id]}
                    onChange={() =>
                      dispatch({ type: "toggle-layer", layer: layer.id })
                    }
                    className="h-4 w-4 accent-[var(--accent--solid)]"
                  />
                  <span className="flex-1 text-sm text-content-primary">
                    {layer.label}
                  </span>
                  <span className="font-mono text-2xs text-content-muted">
                    {layer.detail}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Angle control">
          <p className="mb-3 text-caption text-content-secondary">
            Angle control. Lock the view. Reuse it across deliverables.
          </p>
          <input
            type="range"
            min={0}
            max={359}
            value={state.angle}
            disabled={state.angleLocked}
            onChange={(event) =>
              dispatch({ type: "set-angle", angle: Number(event.target.value) })
            }
            aria-label="View angle in degrees"
            className="w-full accent-[var(--accent--solid)]"
          />
          <div className="mt-2 flex items-center justify-between font-mono text-2xs text-content-muted">
            <span>{state.angle}°</span>
            <button
              type="button"
              onClick={() => dispatch({ type: "toggle-angle-lock" })}
              className="rounded-control border border-border-solid/20 px-2 py-1 hover:border-accent-solid hover:text-accent-text"
            >
              {state.angleLocked ? "Unlock" : "Lock"}
            </button>
          </div>
        </Card>

        <Card title="Canvas aids">
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-control px-2 py-1.5 hover:bg-control-button-default">
              <input
                type="checkbox"
                checked={state.showGuides}
                onChange={() => dispatch({ type: "toggle-guides" })}
                className="h-4 w-4 accent-[var(--accent--solid)]"
              />
              <span className="text-sm text-content-primary">Snapping guides</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-control px-2 py-1.5 hover:bg-control-button-default">
              <input
                type="checkbox"
                checked={state.showCrosshair}
                onChange={() => dispatch({ type: "toggle-crosshair" })}
                className="h-4 w-4 accent-[var(--accent--solid)]"
              />
              <span className="text-sm text-content-primary">Crosshair</span>
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 05 — Polish                                                                 */
/* -------------------------------------------------------------------------- */

export function PolishPanel({ state, dispatch }: Omit<PanelProps, "errors">) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <Card
        title="Scene"
        aside={
          <span className="font-mono text-2xs text-content-muted">
            {timeLabel(state.hours)}
          </span>
        }
      >
        <div className="rounded-inset border border-border-solid/10 bg-background">
          <RoomScene
            sunAngle={state.sunAngle}
            hours={state.hours}
            finishes={state.finishes}
            camera={state.camera}
            className="h-auto w-full"
          />
        </div>
      </Card>

      <div className="space-y-5">
        <Card title="Light">
          <p className="mb-3 text-caption text-content-secondary">
            Shadows. Cast and edit live. Sun position, time of day.
          </p>
          <label className="block">
            <span className="mb-1 flex justify-between font-mono text-2xs text-content-muted">
              <span>Sun position</span>
              <span>{state.sunAngle}°</span>
            </span>
            <input
              type="range"
              min={0}
              max={359}
              value={state.sunAngle}
              onChange={(event) =>
                dispatch({ type: "set-sun", sunAngle: Number(event.target.value) })
              }
              aria-label="Sun position in degrees"
              className="w-full accent-[var(--accent--solid)]"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1 flex justify-between font-mono text-2xs text-content-muted">
              <span>Time of day</span>
              <span>{timeLabel(state.hours)}</span>
            </span>
            <input
              type="range"
              min={5}
              max={21}
              step={0.5}
              value={state.hours}
              onChange={(event) =>
                dispatch({ type: "set-hours", hours: Number(event.target.value) })
              }
              aria-label="Time of day"
              className="w-full accent-[var(--accent--solid)]"
            />
          </label>
        </Card>

        <Card title="Finishes">
          <p className="mb-3 text-caption text-content-secondary">
            Change the light. Swap finishes. The scene catches up.
          </p>
          <div className="space-y-3">
            {(Object.keys(finishOptions) as (keyof typeof finishOptions)[]).map(
              (key) => (
                <fieldset key={key}>
                  <legend className="mb-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-content-muted">
                    {key}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {finishOptions[key].map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "set-finish",
                            finish: key,
                            label: option.label,
                          })
                        }
                        aria-pressed={state.finishes[key] === option.label}
                        className={[
                          "flex items-center gap-2 rounded-pill border px-2.5 py-1 text-2xs",
                          state.finishes[key] === option.label
                            ? "border-accent-solid bg-accent-subtle text-accent-subtle-foreground"
                            : "border-border-solid/20 text-content-secondary hover:border-border-solid/35",
                        ].join(" ")}
                      >
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 rounded-full border border-border-solid/25"
                          style={{ backgroundColor: option.swatch }}
                        />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ),
            )}
          </div>
        </Card>

        <Card title="Camera framing">
          <p className="mb-3 text-caption text-content-secondary">
            Walk the space. Camera framing built in.
          </p>
          <div className="space-y-2">
            {cameraOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => dispatch({ type: "set-camera", camera: option.id })}
                aria-pressed={state.camera === option.id}
                className={[
                  "flex w-full items-center justify-between gap-3 rounded-control border px-3 py-2 text-left",
                  state.camera === option.id
                    ? "border-accent-solid bg-accent-subtle"
                    : "border-border-solid/15 hover:border-border-solid/30",
                ].join(" ")}
              >
                <span className="text-sm text-content-primary">
                  {option.label}
                </span>
                <span className="font-mono text-2xs text-content-muted">
                  {option.detail}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 06 — Deliver                                                                */
/* -------------------------------------------------------------------------- */

export function DeliverPanel({ state, dispatch }: Omit<PanelProps, "errors">) {
  const formats = ["PDF", "DWG", "DXF", "PNG"] as const;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Export">
        <p className="mb-4 text-caption text-content-secondary">
          Document export and reuse. The file below is generated in the browser
          — nothing is uploaded.
        </p>
        <div className="flex flex-wrap gap-2">
          {formats.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => dispatch({ type: "set-format", format })}
              aria-pressed={state.exportFormat === format}
              className={[
                "rounded-control border px-3 py-1.5 font-mono text-2xs",
                state.exportFormat === format
                  ? "border-accent-solid bg-accent-solid text-accent-solid-foreground"
                  : "border-border-solid/20 text-content-secondary hover:border-accent-solid hover:text-accent-text",
              ].join(" ")}
            >
              {format}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-component border border-border-solid/15 bg-background p-4">
          <p className="font-mono text-2xs uppercase tracking-[0.14em] text-content-muted">
            studio-ground-floor.{state.exportFormat.toLowerCase()}
          </p>
          <p className="mt-1 text-sm text-content-primary">
            {mockRooms.length} rooms · {state.floors} floor
            {state.floors === 1 ? "" : "s"} · {state.exportFormat}
          </p>
          <p className="mt-1 font-mono text-2xs text-content-muted">
            14 pages · 2.4 MB · simulated
          </p>
        </div>
      </Card>

      <Card title="Share">
        <p className="mb-4 text-caption text-content-secondary">
          Sharing via members, invitations and notifications.
        </p>
        <label className="flex cursor-pointer items-center gap-3 rounded-control border border-border-solid/15 px-3 py-2.5">
          <input
            type="checkbox"
            checked={state.shared}
            onChange={() => dispatch({ type: "toggle-shared" })}
            className="h-4 w-4 accent-[var(--accent--solid)]"
          />
          <span className="flex-1 text-sm text-content-primary">
            Invite by email
          </span>
          <span className="font-mono text-2xs text-content-muted">members</span>
        </label>

        {state.shared ? (
          <div className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="name@example.com"
              aria-label="Invite by email"
              className={inputClass}
            />
            <button type="button" className="btn-secondary w-full">
              Send invitation
            </button>
            <p className="text-caption text-content-muted">
              Simulated — no email is sent.
            </p>
          </div>
        ) : null}

        <div className="mt-5 rounded-component border border-border-solid/15 bg-background p-4">
          <p className="font-mono text-2xs uppercase tracking-[0.14em] text-content-muted">
            Usage
          </p>
          <p className="mt-1 text-sm text-content-primary">
            {state.credits} credits remaining
          </p>
          <p className="mt-1 text-caption text-content-muted">
            Billing and credits are simulated in this demo.
          </p>
        </div>
      </Card>
    </div>
  );
}
