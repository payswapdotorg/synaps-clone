"use client";

/**
 * Console feature suite — original implementations of the capabilities
 * recovered from the production bundle (see docs/REMAINING-FUNCTIONALITIES.md
 * §D): page management (pageActions), the import worker suite (image / PDF /
 * SVG / DXF / DWG with importMergeProvenance), the export suite (DXF, site
 * plan with papers / delivery modes / watermark), presentation mode
 * (reveal-artifact state machine), phone handover, polish mode with material
 * patterns and sunlight state, and the editor error fallback.
 *
 * Everything that would touch a server, a WASM kernel or a phone is clearly
 * labelled simulated — no network, no workers, no WebGPU.
 */

import { Component, useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Page bar — multi-page models                                        */
/* ------------------------------------------------------------------ */

export interface ConsolePage {
  id: string;
  name: string;
}

export function PageBar({
  pages,
  activePageId,
  maxPages,
  onSelect,
  onAdd,
  onRename,
  onDuplicate,
  onDelete,
}: {
  pages: ConsolePage[];
  activePageId: string;
  maxPages: number;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-border-solid/10 bg-surface-base px-3 py-1.5" role="tablist" aria-label="Model pages">
      {pages.map((p) => (
        <span key={p.id} className="flex items-center">
          {editing === p.id ? (
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => {
                onRename(p.id, draft.trim() || p.name);
                setEditing(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRename(p.id, draft.trim() || p.name);
                  setEditing(null);
                }
                if (e.key === "Escape") setEditing(null);
              }}
              aria-label="Page name"
              className="w-24 rounded-control border border-border-solid/30 bg-surface-base px-2 py-0.5 text-xs text-content-primary"
            />
          ) : (
            <button
              type="button"
              role="tab"
              aria-selected={p.id === activePageId}
              onClick={() => onSelect(p.id)}
              onDoubleClick={() => {
                setEditing(p.id);
                setDraft(p.name);
              }}
              title="Double-click to rename"
              className={
                p.id === activePageId
                  ? "rounded-control bg-surface-raised px-2.5 py-1 text-xs font-medium text-content-primary"
                  : "rounded-control px-2.5 py-1 text-xs text-content-secondary hover:bg-surface-raised hover:text-content-primary"
              }
            >
              {p.name}
            </button>
          )}
          <span className="group relative">
            <button type="button" aria-label={`Page actions for ${p.name}`} className="px-1 text-[10px] text-content-secondary hover:text-content-primary">⋯</button>
            <span className="absolute left-0 top-full z-30 hidden w-36 rounded-control border border-border-solid/15 bg-surface-base p-1 text-xs shadow-lg group-hover:block">
              <button type="button" onClick={() => onDuplicate(p.id)} className="block w-full rounded-control px-2 py-1 text-left text-content-primary hover:bg-surface-raised">Duplicate</button>
              <button type="button" disabled={pages.length <= 1} onClick={() => onDelete(p.id)} className="block w-full rounded-control px-2 py-1 text-left text-content-primary hover:bg-surface-raised disabled:opacity-40">Delete</button>
            </span>
          </span>
        </span>
      ))}
      <button
        type="button"
        onClick={onAdd}
        disabled={pages.length >= maxPages}
        title={pages.length >= maxPages ? `Page limit (${maxPages}) reached` : "Add page"}
        className="ml-1 rounded-control border border-border-solid/20 px-2 py-0.5 text-xs text-content-secondary hover:text-content-primary disabled:opacity-40"
      >
        + Page
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Import suite                                                        */
/* ------------------------------------------------------------------ */

export type ImportFormat = "image" | "pdf" | "svg" | "dxf" | "dwg";

const IMPORT_STEPS: Record<ImportFormat, string[]> = {
  image: ["read raster", "magneticLassoWorker: edge trace (simulated)", "vectorize walls", "merge with provenance"],
  pdf: ["pdf.worker: page parse (simulated)", "extract line geometry", "snap to grid", "merge with provenance"],
  svg: ["parse paths", "flatten transforms", "unit-normalize", "merge with provenance"],
  dxf: ["parse entities", "occt-wasm: resolve geometry (simulated)", "layer mapping", "merge with provenance"],
  dwg: ["unpack container", "occt-wasm: resolve geometry (simulated)", "layer mapping", "merge with provenance"],
};

export function ImportDialog({
  onClose,
  onImported,
  entitlements,
}: {
  onClose: () => void;
  onImported: (format: ImportFormat, filename: string) => void;
  entitlements: { dxfImport: boolean; dwgImport: boolean };
}) {
  const [format, setFormat] = useState<ImportFormat>("image");
  const [file, setFile] = useState<string | null>(null);
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);

  const gated = (format === "dxf" && !entitlements.dxfImport) || (format === "dwg" && !entitlements.dwgImport);
  const steps = IMPORT_STEPS[format];

  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setFile(f.name);
  }

  function run() {
    setStep(0);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i >= steps.length) {
        setStep(steps.length);
        setDone(true);
        return;
      }
      setStep(i);
      setTimeout(tick, 550);
    };
    setTimeout(tick, 550);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Import floorplan" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-container border border-border-solid/15 bg-surface-base p-6 shadow-2xl">
        <h2 className="text-base font-semibold text-content-primary">Import floorplan</h2>
        <p className="mt-1 text-xs text-content-secondary">
          The real product runs import workers (pdf.worker, shapeMapImport.worker, occt-wasm); this
          clone simulates the pipeline locally.
        </p>

        <div className="mt-4 flex flex-wrap gap-1" role="tablist" aria-label="Import format">
          {(["image", "pdf", "svg", "dxf", "dwg"] as ImportFormat[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={format === f}
              onClick={() => {
                setFormat(f);
                setStep(-1);
                setDone(false);
              }}
              className={
                format === f
                  ? "rounded-pill bg-surface-raised px-3 py-1 text-xs font-medium text-content-primary"
                  : "rounded-pill border border-border-solid/20 px-3 py-1 text-xs text-content-secondary hover:text-content-primary"
              }
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {gated ? (
          <p className="mt-4 rounded-control border border-border-solid/15 bg-surface-raised px-3 py-2 text-xs text-content-secondary">
            {format.toUpperCase()} import is not entitled on this plan{format === "dwg" ? " (dwg-import flag off)" : ""}.
            Upgrade in Billing to unlock it (simulated entitlement).
          </p>
        ) : (
          <>
            <label className="mt-4 flex cursor-pointer items-center justify-between rounded-control border border-dashed border-border-solid/30 px-3 py-3 text-xs text-content-secondary hover:border-border-solid/50">
              <span>{file ?? "Choose a file (any file — only the name is read)"}</span>
              <span className="rounded-control border border-border-solid/20 px-2 py-0.5">Browse</span>
              <input type="file" className="sr-only" onChange={pick} aria-label="File to import" />
            </label>

            {step >= 0 && (
              <ol className="mt-4 space-y-1.5" aria-label="Import pipeline">
                {steps.map((s, i) => (
                  <li key={s} className={`flex items-center gap-2 text-xs ${i < step ? "text-content-primary" : i === step ? "text-content-primary" : "text-content-secondary opacity-60"}`}>
                    <span aria-hidden>{i < step ? "✓" : i === step ? "◐" : "○"}</span>
                    {s}
                  </li>
                ))}
              </ol>
            )}

            {done && (
              <p className="mt-3 rounded-control border border-border-solid/15 bg-surface-raised px-3 py-2 text-xs text-content-primary">
                Imported with provenance (importMergeProvenance) — elements land as editable shapes.
              </p>
            )}
          </>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised">Close</button>
          {!gated && !done && (
            <button
              type="button"
              disabled={!file || step >= 0}
              onClick={run}
              className="rounded-control bg-content-inverse px-4 py-2 text-sm font-medium text-content-inverse-foreground disabled:opacity-50"
            >
              Import
            </button>
          )}
          {done && (
            <button
              type="button"
              onClick={() => onImported(format, file ?? "imported plan")}
              className="rounded-control px-4 py-2 text-sm font-medium text-content-inverse"
              style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
            >
              Open in console
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Export suite                                                        */
/* ------------------------------------------------------------------ */

const PAPERS = ["A4", "A3", "A2", "A1", "Letter", "Legal"];

export function ExportDialog({
  onClose,
  onExportPng,
  onExportSvg,
  entitlements,
  modelName,
}: {
  onClose: () => void;
  onExportPng: () => void;
  onExportSvg: () => void;
  entitlements: { dwgExport: boolean; watermarked: boolean };
  modelName: string;
}) {
  const [tab, setTab] = useState<"image" | "dxf" | "siteplan">("image");
  const [paper, setPaper] = useState("A3");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [delivery, setDelivery] = useState<"single_file" | "zip">("single_file");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function runSitePlan() {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setResult(
        `Site plan exported · ${paper} ${orientation} · ${delivery === "zip" ? "ZIP bundle" : "single file"}` +
          (entitlements.watermarked ? " · watermarked (Free plan)" : "") +
          " (simulated — the real product writes paper-sized PDFs server-side)",
      );
    }, 700);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Export plan" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-container border border-border-solid/15 bg-surface-base p-6 shadow-2xl">
        <h2 className="text-base font-semibold text-content-primary">Export</h2>

        <div className="mt-4 flex gap-1" role="tablist" aria-label="Export format">
          {([["image", "PNG / SVG"], ["dxf", "DXF"], ["siteplan", "Site plan"]] as const).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => {
                setTab(k);
                setResult(null);
              }}
              className={
                tab === k
                  ? "rounded-pill bg-surface-raised px-3 py-1 text-xs font-medium text-content-primary"
                  : "rounded-pill border border-border-solid/20 px-3 py-1 text-xs text-content-secondary hover:text-content-primary"
              }
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "image" && (
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={onExportPng} className="flex-1 rounded-control border border-border-solid/20 px-4 py-2 text-sm text-content-primary hover:bg-surface-raised">Download PNG</button>
            <button type="button" onClick={onExportSvg} className="flex-1 rounded-control border border-border-solid/20 px-4 py-2 text-sm text-content-primary hover:bg-surface-raised">Download SVG</button>
          </div>
        )}

        {tab === "dxf" && (
          <div className="mt-5">
            {entitlements.dwgExport ? (
              <>
                <p className="text-xs text-content-secondary">
                  export.dxf writes a DXF of the current page (simulated — the clone generates a
                  labelled placeholder file).
                </p>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setBusy(true);
                    setTimeout(() => {
                      setBusy(false);
                      const blob = new Blob(
                        [`0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n; ${modelName} — simulated DXF export (educational clone)\n0\nENDSEC\n0\nEOF\n`],
                        { type: "application/dxf" },
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${modelName.replace(/\s+/g, "-").toLowerCase()}.dxf`;
                      a.click();
                      URL.revokeObjectURL(url);
                      setResult("DXF downloaded (simulated content).");
                    }, 500);
                  }}
                  className="mt-3 w-full rounded-control bg-content-inverse px-4 py-2 text-sm font-medium text-content-inverse-foreground disabled:opacity-60"
                >
                  {busy ? "Exporting…" : "Export DXF"}
                </button>
              </>
            ) : (
              <p className="rounded-control border border-border-solid/15 bg-surface-raised px-3 py-2 text-xs text-content-secondary">
                DXF/DWG export requires Pro (dwg-export entitlement). Upgrade in Billing (simulated).
              </p>
            )}
          </div>
        )}

        {tab === "siteplan" && (
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="paper" className="text-xs text-content-secondary">Paper</label>
              <select id="paper" value={paper} onChange={(e) => setPaper(e.target.value)} className="rounded-control border border-border-solid/20 bg-surface-base px-2 py-1 text-xs text-content-primary">
                {PAPERS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-content-secondary">Orientation</span>
              <span className="flex gap-1">
                {(["portrait", "landscape"] as const).map((o) => (
                  <button key={o} type="button" onClick={() => setOrientation(o)} className={orientation === o ? "rounded-pill bg-surface-raised px-3 py-1 text-xs font-medium text-content-primary" : "rounded-pill border border-border-solid/20 px-3 py-1 text-xs text-content-secondary"}>
                    {o}
                  </button>
                ))}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-content-secondary">Delivery</span>
              <span className="flex gap-1">
                {(["single_file", "zip"] as const).map((d) => (
                  <button key={d} type="button" onClick={() => setDelivery(d)} className={delivery === d ? "rounded-pill bg-surface-raised px-3 py-1 text-xs font-medium text-content-primary" : "rounded-pill border border-border-solid/20 px-3 py-1 text-xs text-content-secondary"}>
                    {d === "zip" ? "ZIP bundle" : "Single file"}
                  </button>
                ))}
              </span>
            </div>
            <p className="text-[11px] text-content-secondary">
              {entitlements.watermarked ? "Free plan: exports are watermarked." : "Pro: no watermark."}
            </p>
            <button type="button" disabled={busy} onClick={runSitePlan} className="w-full rounded-control bg-content-inverse px-4 py-2 text-sm font-medium text-content-inverse-foreground disabled:opacity-60">
              {busy ? "Exporting…" : "Export Site Plan"}
            </button>
          </div>
        )}

        {result && <p className="mt-3 rounded-control border border-border-solid/15 bg-surface-raised px-3 py-2 text-xs text-content-primary">{result}</p>}

        <div className="mt-5 flex justify-end">
          <button type="button" onClick={onClose} className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised">Close</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Presentation mode — reveal-artifact machine                         */
/* ------------------------------------------------------------------ */

const ARTIFACTS = [
  { id: "building", title: "Building", durationMs: 2500, blurb: "The whole model, revealed as one artifact." },
  { id: "site", title: "Site", durationMs: 5000, blurb: "The building in its site context." },
  { id: "section", title: "Section", durationMs: 5000, blurb: "A cut through the interior." },
  { id: "elevation", title: "Elevation", durationMs: 5000, blurb: "The external face of the design." },
] as const;

export function PresentationMode({ onExit, modelName }: { onExit: () => void; modelName: string }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"welcome" | "committed">("welcome");
  const artifact = ARTIFACTS[index];

  useEffect(() => {
    const t = setTimeout(() => advance(), artifact.durationMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phase]);

  function advance() {
    if (phase === "welcome") {
      setPhase("committed");
      return;
    }
    if (index < ARTIFACTS.length - 1) {
      setIndex(index + 1);
      setPhase("welcome");
    } else {
      onExit();
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") advance();
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#0f172a] text-white" role="dialog" aria-modal="true" aria-label="Presentation mode">
      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-sm font-semibold tracking-tight">{modelName} — presentation</p>
        <button type="button" onClick={onExit} className="rounded-control border border-white/20 px-3 py-1 text-xs text-white/80 hover:text-white">Exit (Esc)</button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8" onClick={advance}>
        <svg viewBox="0 0 320 200" className="w-full max-w-2xl" role="img" aria-label={`${artifact.title} artifact`}>
          <rect width="320" height="200" fill="#10192e" />
          {artifact.id === "building" && (
            <g stroke="#7dd3fc" strokeWidth="2" fill="none">
              <path d="M80 150V80h100v70" />
              <path d="M180 120h60" />
              <path d="M80 80l50-30 50 30" />
            </g>
          )}
          {artifact.id === "site" && (
            <g>
              <rect x="40" y="120" width="240" height="40" fill="#1e3a5f" stroke="#7dd3fc" strokeWidth="1" />
              <path d="M120 120V90h60v30" stroke="#7dd3fc" strokeWidth="2" fill="none" />
              <path d="M40 160h240" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          )}
          {artifact.id === "section" && (
            <g stroke="#7dd3fc" strokeWidth="2" fill="none">
              <path d="M70 150V70h180v80" />
              <path d="M70 110h180" strokeDasharray="6 4" />
              <path d="M130 150v-40h60v40" />
            </g>
          )}
          {artifact.id === "elevation" && (
            <g stroke="#7dd3fc" strokeWidth="2" fill="none">
              <path d="M70 150V90h180v60" />
              <path d="M100 150v-25h30v25M150 150v-25h30v25M200 150v-25h30v25" strokeWidth="1" />
            </g>
          )}
          <text x="160" y="185" textAnchor="middle" fontSize="9" fill="#94a3b8">reveal-artifact: {artifact.id} · {phase}</text>
        </svg>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">{phase === "welcome" ? "revealing" : "committed"}</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">{artifact.title}</h2>
          <p className="mt-2 max-w-md text-sm text-white/60">{artifact.blurb}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 pb-6" aria-label="Artifacts">
        {ARTIFACTS.map((a, i) => (
          <span key={a.id} className={`h-1.5 w-8 rounded-pill ${i < index ? "bg-white/70" : i === index ? "bg-sky-300" : "bg-white/20"}`} />
        ))}
      </div>
      <p className="pb-4 text-center text-[10px] text-white/40">
        Presentation state machine transcribed from the bundle (reveal-artifact · building/site/section/elevation · durations 2500/5000ms). Click or press → to advance.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone handover                                                      */
/* ------------------------------------------------------------------ */

export function PhoneHandoverDialog({ onClose, modelName }: { onClose: () => void; modelName: string }) {
  const code = useRef(Math.random().toString(36).slice(2, 8).toUpperCase());
  const [dots] = useState(() => {
    // Deterministic pseudo-QR from the pairing code (visual only).
    let h = 0;
    for (const c of code.current) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const arr: boolean[] = [];
    let x = h || 12345;
    for (let i = 0; i < 21 * 21; i += 1) {
      x = (1103515245 * x + 12345) >>> 0;
      arr.push((x & 0x10000) !== 0);
    }
    return arr;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Open on phone" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm rounded-container border border-border-solid/15 bg-surface-base p-6 text-center shadow-2xl">
        <h2 className="text-base font-semibold text-content-primary">Open on your phone</h2>
        <p className="mt-1 text-xs text-content-secondary">
          Pair “{modelName}” with the phone canvas (phone-canvas-loader in the real product).
        </p>
        <svg viewBox="0 0 21 21" className="mx-auto mt-4 size-40 rounded-surface border border-border-solid/15 bg-white p-1" role="img" aria-label="Pairing code QR (visual only)">
          {dots.map((on, i) =>
            on ? <rect key={i} x={i % 21} y={Math.floor(i / 21)} width="1" height="1" fill="#101314" /> : null,
          )}
        </svg>
        <p className="mt-3 text-lg font-mono font-semibold tracking-[0.3em] text-content-primary">{code.current}</p>
        <p className="mt-2 text-[11px] text-content-secondary">
          Simulated pairing — the QR is decorative (drawn from the code, not a real URL). The real
          product streams the canvas to a paired phone session.
        </p>
        <button type="button" onClick={onClose} className="mt-5 w-full rounded-control border border-border-solid/20 px-4 py-2 text-sm text-content-secondary hover:text-content-primary">Close</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Editor error fallback                                               */
/* ------------------------------------------------------------------ */

interface FallbackProps {
  children: ReactNode;
}

export class EditorErrorFallback extends Component<FallbackProps, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("[console] editor failure:", error);
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-surface-base p-8 text-center" role="alert">
          <h2 className="text-base font-semibold text-content-primary">The canvas hit an error</h2>
          <p className="max-w-sm text-sm text-content-secondary">
            The editor was recovered by the error boundary (EditorErrorFallback in the original
            product). Your work up to the last action is kept.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ failed: false })}
            className="rounded-control px-4 py-2 text-sm font-medium text-content-inverse"
            style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
