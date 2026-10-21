"use client";

import { useMemo, useRef, useState } from "react";
import { PlanEditor, AssetSymbol, type EditorSettings } from "./PlanEditor";
import {
  type Shape,
  type Tool,
  type Units,
  type AreaUnits,
  deriveLayers,
  ASSET_CATEGORIES,
  demoPlan,
} from "@/lib/editor";

/**
 * Console chrome — reconstruction of the OBSERVED modeler screen
 * (live observation 2026-10-21 + VLM pass over the capture):
 *   - top bar: model icon, “Model 1” + “Residential Projects”, copy-link,
 *     avatar / help / feedback icons, blue Share button
 *   - left dock: Layers / Assets tabs, Models section with the active model,
 *     layer list (“No layers yet. Anything you draw appears here.”)
 *   - right panel: Canvas settings (Background, Length units, Precision,
 *     Area units, Grid)
 *   - status bar: grid size, units, zoom
 *   - floating bottom-center toolbar with the CAD tools
 */

const TOOLS: { id: Tool; label: string; key: string }[] = [
  { id: "select", label: "Select", key: "V" },
  { id: "pan", label: "Pan", key: "H" },
  { id: "wall", label: "Wall", key: "W" },
  { id: "door", label: "Door", key: "D" },
  { id: "window", label: "Window", key: "N" },
  { id: "room", label: "Room", key: "R" },
  { id: "dim", label: "Dimension", key: "M" },
  { id: "text", label: "Text", key: "T" },
  { id: "asset", label: "Asset", key: "A" },
  { id: "eraser", label: "Delete", key: "E" },
];

function ToolIcon({ id }: { id: Tool }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "select":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M5 3l10 8-4.5.8L13 16l-2 .9-2.4-4.3L5 15z" {...p} />
        </svg>
      );
    case "pan":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M10 3v14M3 10h14" {...p} />
          <path d="M8 5l2-2 2 2M8 15l2 2 2-2M5 8l-2 2 2 2M15 8l2 2-2 2" {...p} />
        </svg>
      );
    case "wall":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M4 14h12" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" />
        </svg>
      );
    case "door":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M4 15h12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          <path d="M6 15V5a9 9 0 0 1 9 9" {...p} />
        </svg>
      );
    case "window":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M4 10h12" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" />
          <path d="M4 8.4h12M4 11.6h12" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      );
    case "room":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <rect x="4" y="4" width="12" height="12" rx="1" strokeDasharray="2.4 2" {...p} />
        </svg>
      );
    case "dim":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M4 14h12M4 12v4M16 12v4M7 14l6-6" {...p} />
        </svg>
      );
    case "text":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M5 5h10M10 5v10M8 15h4" {...p} />
        </svg>
      );
    case "asset":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <rect x="4" y="4" width="5" height="5" rx="1" {...p} />
          <rect x="11" y="4" width="5" height="5" rx="1" {...p} />
          <rect x="4" y="11" width="5" height="5" rx="1" {...p} />
          <rect x="11" y="11" width="5" height="5" rx="1" {...p} />
        </svg>
      );
    case "eraser":
      return (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path d="M4 13l6-6 6 6-3 3H7z" {...p} />
          <path d="M4 16h12" {...p} />
        </svg>
      );
  }
}

export function ConsoleChrome({
  modelName,
  spaceName,
  initialDemo,
  onShareLabel,
}: {
  modelName: string;
  spaceName: string;
  initialDemo: boolean;
  onShareLabel: string;
}) {
  const [shapes, setShapes] = useState<Shape[]>(() => (initialDemo ? demoPlan() : []));
  const [tool, setTool] = useState<Tool>("select");
  const [assetSymbol, setAssetSymbol] = useState("sofa");
  const [dockTab, setDockTab] = useState<"layers" | "assets">("layers");
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [settings, setSettings] = useState<EditorSettings>({
    background: "#EBEDEF",
    units: "m",
    precision: 2,
    areaUnits: "m2",
    grid: 0.5,
    gridOn: true,
  });
  const undoRef = useRef<{ push: () => void; undo: () => void; redo: () => void } | null>(null);

  const layers = useMemo(() => deriveLayers(shapes), [shapes]);
  const selectedShape = shapes.find((s) => s.id === selectedId) ?? null;

  function exportPng() {
    const svg = document.querySelector('svg[role="application"]');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${modelName.replace(/\s+/g, "-").toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-base">
      {/* Top bar (observed) */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border-solid/10 px-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-content-secondary">
          <path d="M5 4h10l4 4v12H5z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-content-primary">{modelName}</p>
          <p className="truncate text-2xs text-content-secondary">{spaceName}</p>
        </div>
        <div className="ml-2 flex items-center gap-1">
          <button
            type="button"
            aria-label="Copy link"
            title="Copy link (simulated)"
            onClick={() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1500);
            }}
            className="rounded-control p-1.5 text-content-secondary hover:bg-surface-raised hover:text-content-primary"
          >
            {copied ? "✓" : (
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="7" y="7" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button type="button" aria-label="Help" className="rounded-control p-1.5 text-content-secondary hover:bg-surface-raised" title="Educational clone — no help desk">
            ?
          </button>
          <button type="button" aria-label="Feedback" className="rounded-control p-1.5 text-content-secondary hover:bg-surface-raised" title="Feedback (simulated)">
            💬
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="rounded-control px-4 py-1.5 text-sm font-medium text-content-inverse"
            style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
          >
            Share
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Left dock (observed) */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-border-solid/10" aria-label="Models, layers and assets">
          <div className="flex border-b border-border-solid/10" role="tablist" aria-label="Dock sections">
            <button
              type="button"
              role="tab"
              aria-selected={dockTab === "layers"}
              onClick={() => setDockTab("layers")}
              className={`flex-1 px-3 py-2.5 text-sm font-medium ${dockTab === "layers" ? "bg-surface-raised text-content-primary" : "text-content-secondary hover:text-content-primary"}`}
            >
              Layers
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={dockTab === "assets"}
              onClick={() => setDockTab("assets")}
              className={`flex-1 px-3 py-2.5 text-sm font-medium ${dockTab === "assets" ? "bg-surface-raised text-content-primary" : "text-content-secondary hover:text-content-primary"}`}
            >
              Assets
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {dockTab === "layers" ? (
              <>
                <div className="flex items-center justify-between px-1 pb-1">
                  <span className="text-2xs font-semibold uppercase tracking-wide text-content-secondary">Models</span>
                  <span className="text-content-secondary" title="Add model (simulated)">+</span>
                </div>
                <div className="mb-4 rounded-control bg-surface-raised px-3 py-2 text-sm font-medium text-content-primary">
                  {modelName}
                </div>
                <span className="block px-1 pb-2 text-2xs font-semibold uppercase tracking-wide text-content-secondary">
                  Layers
                </span>
                {layers.length === 0 ? (
                  <p className="px-1 text-xs italic text-content-secondary">
                    No layers yet. Anything you draw appears here.
                  </p>
                ) : (
                  <ul className="space-y-0.5">
                    {layers.map((l) => (
                      <li key={l.name} className="flex items-center justify-between rounded-control px-2 py-1.5 text-sm text-content-primary hover:bg-surface-raised">
                        <span className="flex items-center gap-2">
                          <span aria-hidden="true" style={{ color: "var(--accent--canvas--guide)" }}>◉</span>
                          {l.name}
                        </span>
                        <span className="text-2xs text-content-secondary">{l.count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div>
                <input
                  type="search"
                  placeholder="Search assets…"
                  className="mb-3 w-full rounded-control border border-border-solid/20 bg-background px-3 py-1.5 text-xs text-content-primary focus:border-border-solid focus:outline-none"
                  aria-label="Search assets"
                />
                {ASSET_CATEGORIES.map((cat) => (
                  <details key={cat.name} className="group mb-1" {...(cat.name === "Living Room" ? { open: true } : {})}>
                    <summary className="cursor-pointer list-none rounded-control px-2 py-1.5 text-xs font-medium text-content-secondary hover:bg-surface-raised hover:text-content-primary">
                      {cat.name}
                    </summary>
                    <ul className="grid grid-cols-3 gap-1.5 p-1.5">
                      {cat.symbols.map((sym) => (
                        <li key={sym.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setAssetSymbol(sym.id);
                              setTool("asset");
                            }}
                            title={`${sym.label} — click, then stamp on canvas`}
                            aria-label={`Place ${sym.label}`}
                            className={`flex h-16 flex-col items-center justify-center gap-1 rounded-control border text-2xs ${
                              assetSymbol === sym.id && tool === "asset"
                                ? "border-border-solid bg-surface-raised text-content-primary"
                                : "border-border-solid/15 text-content-secondary hover:border-border-solid/40"
                            }`}
                          >
                            <svg viewBox="-0.7 -0.7 1.4 1.4" className="h-8 w-8" aria-hidden="true">
                              <AssetSymbol symbol={sym.id} />
                            </svg>
                            {sym.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Canvas area */}
        <div className="relative min-w-0 flex-1">
          <PlanEditor
            shapes={shapes}
            setShapes={setShapes}
            tool={tool}
            assetSymbol={assetSymbol}
            settings={settings}
            onSelectionChange={setSelectedId}
            undoRef={undoRef}
          />

          {/* Floating toolbar (observed: bottom center) */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-border-solid/15 bg-surface-base px-2 py-1.5 shadow-lg" role="toolbar" aria-label="Drawing tools">
            <button type="button" onClick={() => undoRef.current?.undo()} title="Undo (Ctrl+Z)" aria-label="Undo" className="rounded-full p-2 text-content-secondary hover:bg-surface-raised hover:text-content-primary">
              <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
                <path d="M8 5L4 9l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 9h7a4 4 0 0 1 0 8h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={() => undoRef.current?.redo()} title="Redo (Ctrl+Shift+Z)" aria-label="Redo" className="rounded-full p-2 text-content-secondary hover:bg-surface-raised hover:text-content-primary">
              <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
                <path d="M12 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 9H9a4 4 0 0 0 0 8h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <span className="mx-1 h-5 w-px bg-border-solid/15" aria-hidden="true" />
            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTool(t.id)}
                title={`${t.label} (${t.key})`}
                aria-label={t.label}
                aria-pressed={tool === t.id}
                className={`rounded-full p-2 ${tool === t.id ? "text-content-inverse" : "text-content-secondary hover:bg-surface-raised hover:text-content-primary"}`}
                style={tool === t.id ? { background: "var(--accent--canvas--guide, #1a73e8)" } : undefined}
              >
                <ToolIcon id={t.id} />
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-border-solid/15" aria-hidden="true" />
            <button type="button" onClick={exportPng} title="Export" aria-label="Export plan" className="rounded-full p-2 text-content-secondary hover:bg-surface-raised hover:text-content-primary">
              <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
                <path d="M10 4v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Status bar (observed: bottom) */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border-solid/10 bg-surface-base/85 px-4 py-1 font-mono text-[10px] text-content-secondary">
            <span>
              Grid {settings.gridOn ? `${settings.grid} ${settings.units}` : "off"} · snap {settings.gridOn ? "on" : "off"}
            </span>
            <span>
              {settings.units === "m" ? "Meters" : "Feet"} · {selectedShape ? `selected: ${selectedShape.kind}` : "no selection"} · {onShareLabel}
            </span>
          </div>
        </div>

        {/* Right panel: Canvas settings (observed) */}
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-l border-border-solid/10 p-4 lg:flex" aria-label="Canvas settings">
          <h2 className="text-sm font-semibold text-content-primary">Canvas</h2>

          <label className="mt-4 block text-xs font-medium text-content-secondary" htmlFor="bg-color">
            Background
          </label>
          <input
            id="bg-color"
            type="text"
            value={settings.background}
            onChange={(e) => setSettings((s) => ({ ...s, background: e.target.value }))}
            className="mt-1 w-full rounded-control border border-border-solid/20 bg-background px-2.5 py-1.5 font-mono text-xs text-content-primary focus:border-border-solid focus:outline-none"
          />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="len-units" className="block text-xs font-medium text-content-secondary">
                Length units
              </label>
              <select
                id="len-units"
                value={settings.units}
                onChange={(e) => setSettings((s) => ({ ...s, units: e.target.value as Units }))}
                className="mt-1 w-full rounded-control border border-border-solid/20 bg-background px-2 py-1.5 text-xs text-content-primary focus:border-border-solid focus:outline-none"
              >
                <option value="m">Meters</option>
                <option value="ft">Feet</option>
              </select>
            </div>
            <div>
              <label htmlFor="precision" className="block text-xs font-medium text-content-secondary">
                Precision
              </label>
              <select
                id="precision"
                value={settings.precision}
                onChange={(e) => setSettings((s) => ({ ...s, precision: Number(e.target.value) }))}
                className="mt-1 w-full rounded-control border border-border-solid/20 bg-background px-2 py-1.5 text-xs text-content-primary focus:border-border-solid focus:outline-none"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          </div>

          <label htmlFor="area-units" className="mt-4 block text-xs font-medium text-content-secondary">
            Area units
          </label>
          <select
            id="area-units"
            value={settings.areaUnits}
            onChange={(e) => setSettings((s) => ({ ...s, areaUnits: e.target.value as AreaUnits }))}
            className="mt-1 w-full rounded-control border border-border-solid/20 bg-background px-2 py-1.5 text-xs text-content-primary focus:border-border-solid focus:outline-none"
          >
            <option value="m2">Square meters</option>
            <option value="ft2">Square feet</option>
          </select>

          <div className="mt-5 rounded-control border border-border-solid/15 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-content-secondary">Grid</span>
              <button
                type="button"
                role="switch"
                aria-checked={settings.gridOn}
                onClick={() => setSettings((s) => ({ ...s, gridOn: !s.gridOn }))}
                className={`relative h-5 w-9 rounded-full transition-colors ${settings.gridOn ? "" : "bg-border-solid/30"}`}
                style={settings.gridOn ? { background: "var(--accent--canvas--guide, #1a73e8)" } : undefined}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${settings.gridOn ? "left-[18px]" : "left-0.5"}`} />
              </button>
            </div>
            {settings.gridOn && (
              <select
                value={settings.grid}
                onChange={(e) => setSettings((s) => ({ ...s, grid: Number(e.target.value) }))}
                aria-label="Grid size"
                className="mt-2 w-full rounded-control border border-border-solid/20 bg-background px-2 py-1.5 text-xs text-content-primary focus:border-border-solid focus:outline-none"
              >
                <option value={0.1}>0.1 m</option>
                <option value={0.25}>0.25 m</option>
                <option value={0.5}>0.5 m</option>
                <option value={1}>1 m</option>
              </select>
            )}
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-content-secondary">
            Educational clone — the console reconstructs the observed layout
            (Layers / Assets dock, Canvas settings, floating tool palette,
            status bar). Drawing is fully local; nothing is saved or sent.
          </p>
        </aside>
      </div>

      {/* Share dialog (simulated) */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Share"
          onClick={(e) => e.target === e.currentTarget && setShareOpen(false)}
        >
          <div className="w-full max-w-sm rounded-container border border-border-solid/15 bg-surface-base p-6 shadow-2xl">
            <h2 className="text-base font-semibold tracking-tight text-content-primary">Share</h2>
            <p className="mt-2 text-sm text-content-secondary">
              The original creates share links with viewer roles. This clone
              has no server, so the link below is a local placeholder.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                readOnly
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/m/demo?pageId=shared`}
                className="min-w-0 flex-1 rounded-control border border-border-solid/20 bg-background px-3 py-2 font-mono text-xs text-content-secondary"
                aria-label="Share link"
              />
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(`${window.location.origin}/m/demo?pageId=shared`);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="rounded-control px-3 py-2 text-xs font-medium text-content-inverse"
                style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShareOpen(false)}
              className="mt-5 w-full rounded-control border border-border-solid/20 px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
