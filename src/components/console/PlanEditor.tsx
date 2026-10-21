"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Pt,
  type Shape,
  type Tool,
  type Units,
  type AreaUnits,
  fmtLen,
  nid,
  snapPt,
  findWallAt,
  hitTest,
  translateShape,
} from "@/lib/editor";

/**
 * Interactive 2D plan canvas (original code).
 *
 * Mouse plan-space conversion via an SVG <g> transform (scale + translate).
 * Interactions: wall chains (click-click, Esc/right-click ends), door/window
 * snapping onto walls, room rectangles, dimensions, text labels, asset
 * stamps, select/move, delete, zoom (wheel), pan (tool / middle-drag),
 * grid + snapping, undo/redo.
 */

const WALL_T = 0.18; // wall thickness, meters

export type EditorSettings = {
  background: string;
  units: Units;
  precision: number;
  areaUnits: AreaUnits;
  grid: number;
  gridOn: boolean;
};

export function PlanEditor({
  shapes,
  setShapes,
  tool,
  assetSymbol,
  settings,
  onSelectionChange,
  undoRef,
}: {
  shapes: Shape[];
  setShapes: (updater: (prev: Shape[]) => Shape[]) => void;
  tool: Tool;
  assetSymbol: string;
  settings: EditorSettings;
  onSelectionChange: (id: string | null) => void;
  undoRef: React.RefObject<{ push: () => void; undo: () => void; redo: () => void } | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [view, setView] = useState({ x: 40, y: 40, scale: 60 }); // px offsets + px per meter
  const [cursor, setCursor] = useState<Pt>({ x: 0, y: 0 });
  /*
   * Two-click tools (wall chain, dimension) keep their anchor in a ref so
   * the second mousedown always sees the current value regardless of React’s
   * state-flush timing — rapid double-clicks must not restart the chain.
   */
  const chainRef = useRef<Pt | null>(null);
  const dimRef = useRef<Pt | null>(null);
  const [chainStart, setChainStart] = useState<Pt | null>(null);
  const [dimStart, setDimStart] = useState<Pt | null>(null);
  const [dragRect, setDragRect] = useState<{ a: Pt; b: Pt } | null>(null);
  const [wallPreview, setWallPreview] = useState<Pt | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [textDraft, setTextDraft] = useState<{ at: Pt; value: string } | null>(null);
  const dragMove = useRef<{ id: string; last: Pt } | null>(null);
  const panDrag = useRef<{ x: number; y: number } | null>(null);
  const history = useRef<{ past: Shape[][]; future: Shape[][] }>({ past: [], future: [] });

  const pushHistory = useCallback(() => {
    history.current.past.push(shapes);
    if (history.current.past.length > 60) history.current.past.shift();
    history.current.future = [];
  }, [shapes]);

  useEffect(() => {
    undoRef.current = {
      push: pushHistory,
      undo: () => {
        const h = history.current;
        if (!h.past.length) return;
        h.future.push(shapes);
        setShapes(() => h.past.pop()!);
      },
      redo: () => {
        const h = history.current;
        if (!h.future.length) return;
        h.past.push(shapes);
        setShapes(() => h.future.pop()!);
      },
    };
  }, [pushHistory, shapes, setShapes, undoRef]);

  useEffect(() => {
    onSelectionChange(selected);
  }, [selected, onSelectionChange]);

  const toPlan = useCallback(
    (e: { clientX: number; clientY: number }): Pt => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      return { x: (px - view.x) / view.scale, y: (py - view.y) / view.scale };
    },
    [view],
  );

  const snapOrFree = useCallback(
    (p: Pt): Pt => (settings.gridOn ? snapPt(p, settings.grid) : p),
    [settings.gridOn, settings.grid],
  );

  function addShape(s: Shape) {
    pushHistory();
    setShapes((prev) => [...prev, s]);
  }

  function deleteSelected() {
    if (!selected) return;
    pushHistory();
    setShapes((prev) => prev.filter((s) => s.id !== selected));
    setSelected(null);
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const rect = svgRef.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setView((v) => {
      const scale = Math.min(240, Math.max(12, v.scale * factor));
      const k = scale / v.scale;
      return { scale, x: px - (px - v.x) * k, y: py - (py - v.y) * k };
    });
  }

  function onMouseDown(e: React.MouseEvent) {
    if (e.button === 1 || tool === "pan" || (e.button === 0 && e.altKey)) {
      panDrag.current = { x: e.clientX, y: e.clientY };
      return;
    }
    if (e.button !== 0) return;
    const p = toPlan(e);

    if (tool === "select") {
      const hit = [...shapes].reverse().find((s) => hitTest(s, p, 6 / view.scale));
      setSelected(hit?.id ?? null);
      if (hit && (hit.kind === "room" || hit.kind === "text" || hit.kind === "asset")) {
        dragMove.current = { id: hit.id, last: p };
      }
      return;
    }
    if (tool === "eraser") {
      const hit = [...shapes].reverse().find((s) => hitTest(s, p, 6 / view.scale));
      if (hit) {
        pushHistory();
        setShapes((prev) => prev.filter((s) => s.id !== hit.id));
      }
      return;
    }
    if (tool === "wall") {
      const sp = snapOrFree(p);
      if (!chainRef.current) {
        chainRef.current = sp;
        setChainStart(sp);
      } else {
        addShape({ kind: "wall", id: nid("w"), a: chainRef.current, b: sp });
        chainRef.current = sp;
        setChainStart(sp);
      }
      return;
    }
    if (tool === "door" || tool === "window") {
      const near = findWallAt(shapes, p, 8 / view.scale);
      if (!near) return;
      const { wall, pt } = near;
      const angle = (Math.atan2(wall.b.y - wall.a.y, wall.b.x - wall.a.x) * 180) / Math.PI;
      addShape(
        tool === "door"
          ? { kind: "door", id: nid("d"), at: snapOrFree(pt), angle, width: 0.9 }
          : { kind: "window", id: nid("wd"), at: snapOrFree(pt), angle, width: 1.2 },
      );
      return;
    }
    if (tool === "room" || tool === "lasso") {
      setDragRect({ a: snapOrFree(p), b: snapOrFree(p) });
      return;
    }
    if (tool === "text") {
      setTextDraft({ at: p, value: "" });
      return;
    }
    if (tool === "dim") {
      if (!dimRef.current) {
        dimRef.current = snapOrFree(p);
        setDimStart(snapOrFree(p));
      } else {
        addShape({ kind: "dim", id: nid("dm"), a: dimRef.current, b: snapOrFree(p) });
        dimRef.current = null;
        setDimStart(null);
      }
      return;
    }
    if (tool === "asset") {
      addShape({ kind: "asset", id: nid("as"), at: p, symbol: assetSymbol, rot: 0 });
      return;
    }
  }

  function onMouseMove(e: React.MouseEvent) {
    if (panDrag.current) {
      const dx = e.clientX - panDrag.current.x;
      const dy = e.clientY - panDrag.current.y;
      panDrag.current = { x: e.clientX, y: e.clientY };
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
      return;
    }
    const p = toPlan(e);
    setCursor(p);
    if (dragMove.current) {
      const dx = p.x - dragMove.current.last.x;
      const dy = p.y - dragMove.current.last.y;
      dragMove.current.last = p;
      setShapes((prev) => prev.map((s) => (s.id === dragMove.current!.id ? translateShape(s, dx, dy) : s)));
      return;
    }
    if (dragRect) setDragRect({ a: dragRect.a, b: snapOrFree(p) });
    if (chainStart) setWallPreview(snapOrFree(p));
  }

  function onMouseUp() {
    if (dragRect) {
      const x = Math.min(dragRect.a.x, dragRect.b.x);
      const y = Math.min(dragRect.a.y, dragRect.b.y);
      const w = Math.abs(dragRect.a.x - dragRect.b.x);
      const h = Math.abs(dragRect.a.y - dragRect.b.y);
      if (w > 0.4 && h > 0.4) {
        if (tool === "lasso") {
          // Simulated magnetic lasso: the real product traces edges via
          // magneticLassoWorker; here the drag rect becomes a traced room.
          addShape({ kind: "room", id: nid("r"), x, y, w, h, label: "Traced area", provenance: "lasso" });
        } else {
          addShape({ kind: "room", id: nid("r"), x, y, w, h, label: "Room" });
        }
      }
      setDragRect(null);
    }
    dragMove.current = null;
    panDrag.current = null;
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        chainRef.current = null;
        dimRef.current = null;
        setChainStart(null);
        setDimStart(null);
        setSelected(null);
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selected && !textDraft) {
        deleteSelected();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) undoRef.current?.redo();
        else undoRef.current?.undo();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function commitText() {
    if (textDraft && textDraft.value.trim()) {
      addShape({ kind: "text", id: nid("t"), at: textDraft.at, text: textDraft.value.trim() });
    }
    setTextDraft(null);
  }

  const m = view.scale; // px per meter
  const gridSize = settings.grid;
  const gridW = Math.ceil(4000 / m / gridSize) * gridSize;

  const cursorCrosshair =
    tool === "select" || tool === "pan" ? "default" : "crosshair";

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: settings.background }}>
      <svg
        ref={svgRef}
        className="h-full w-full select-none"
        style={{ cursor: cursorCrosshair }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onContextMenu={(e) => {
          e.preventDefault();
          chainRef.current = null;
          dimRef.current = null;
          setChainStart(null);
          setDimStart(null);
        }}
        role="application"
        aria-label="Floor plan editing canvas"
      >
        <g transform={`translate(${view.x} ${view.y}) scale(${m} ${m})`}>
          {/* grid */}
          {settings.gridOn && (
            <g opacity="0.55" aria-hidden="true">
              <defs>
                <pattern id="plan-grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                  <path
                    d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                    fill="none"
                    stroke="var(--accent--canvas--dot)"
                    strokeWidth={0.6 / m}
                  />
                </pattern>
              </defs>
              <rect x={-gridW} y={-gridW} width={gridW * 2} height={gridW * 2} fill="url(#plan-grid)" />
            </g>
          )}

          {/* rooms */}
          {shapes.map((s) =>
            s.kind === "room" ? (
              <g key={s.id}>
                <rect
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  fill="var(--accent--canvas--dot-fuchsia)"
                  fillOpacity={0.06}
                  stroke="var(--accent--canvas--guide)"
                  strokeWidth={1.2 / m}
                  strokeDasharray={`${3 / m} ${3 / m}`}
                />
                <text
                  x={s.x + s.w / 2}
                  y={s.y + s.h / 2 - 0.15}
                  textAnchor="middle"
                  fontSize={0.32}
                  fill="#5b6411"
                  style={{ pointerEvents: "none" }}
                >
                  {s.label}
                </text>
                <text
                  x={s.x + s.w / 2}
                  y={s.y + s.h / 2 + 0.3}
                  textAnchor="middle"
                  fontSize={0.26}
                  fill="#5b6411"
                  opacity={0.8}
                  style={{ pointerEvents: "none" }}
                >
                  {(s.w * s.h).toFixed(1)} m²
                </text>
              </g>
            ) : null,
          )}

          {/* walls */}
          {shapes.map((s) =>
            s.kind === "wall" ? (
              <line
                key={s.id}
                x1={s.a.x}
                y1={s.a.y}
                x2={s.b.x}
                y2={s.b.y}
                stroke="var(--accent--canvas--crosshair)"
                strokeWidth={WALL_T}
                strokeLinecap="square"
              />
            ) : null,
          )}

          {/* doors + windows (drawn over walls with casing) */}
          {shapes.map((s) => {
            if (s.kind !== "door" && s.kind !== "window") return null;
            const rad = (s.angle * Math.PI) / 180;
            const half = s.width / 2;
            const cx = s.at.x;
            const cy = s.at.y;
            if (s.kind === "window") {
              const x1 = cx - Math.cos(rad) * half;
              const y1 = cy - Math.sin(rad) * half;
              const x2 = cx + Math.cos(rad) * half;
              const y2 = cy + Math.sin(rad) * half;
              return (
                <g key={s.id}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={settings.background} strokeWidth={WALL_T + 0.01} strokeLinecap="butt" />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent--canvas--crosshair)" strokeWidth={0.03} />
                  <line
                    x1={x1}
                    y1={y1 - 0.06}
                    x2={x2}
                    y2={y2 - 0.06}
                    stroke="var(--accent--canvas--crosshair)"
                    strokeWidth={0.03}
                    opacity={0.7}
                  />
                  <line
                    x1={x1}
                    y1={y1 + 0.06}
                    x2={x2}
                    y2={y2 + 0.06}
                    stroke="var(--accent--canvas--crosshair)"
                    strokeWidth={0.03}
                    opacity={0.7}
                  />
                </g>
              );
            }
            // door: casing gap + swing arc
            const hx = cx - Math.cos(rad) * half;
            const hy = cy - Math.sin(rad) * half;
            const tx = cx + Math.cos(rad) * half;
            const ty = cy + Math.sin(rad) * half;
            const hinge = { x: hx, y: hy };
            const endX = hx + Math.cos(rad - Math.PI / 2) * s.width;
            const endY = hy + Math.sin(rad - Math.PI / 2) * s.width;
            return (
              <g key={s.id}>
                <line x1={hx} y1={hy} x2={tx} y2={ty} stroke={settings.background} strokeWidth={WALL_T + 0.01} strokeLinecap="butt" />
                <line x1={hx} y1={hy} x2={endX} y2={endY} stroke="var(--accent--canvas--crosshair)" strokeWidth={0.035} />
                <path
                  d={`M ${endX} ${endY} A ${s.width} ${s.width} 0 0 1 ${tx} ${ty}`}
                  fill="none"
                  stroke="var(--accent--canvas--dot-fuchsia)"
                  strokeWidth={0.025}
                  opacity={0.9}
                />
                <circle cx={hinge.x} cy={hinge.y} r={0.045} fill="var(--accent--canvas--crosshair)" />
              </g>
            );
          })}

          {/* assets */}
          {shapes.map((s) =>
            s.kind === "asset" ? (
              <g key={s.id} transform={`translate(${s.at.x} ${s.at.y}) rotate(${s.rot})`}>
                <AssetSymbol symbol={s.symbol} />
              </g>
            ) : null,
          )}

          {/* dimensions */}
          {shapes.map((s) =>
            s.kind === "dim" ? (
              <DimLine key={s.id} a={s.a} b={s.b} units={settings.units} precision={settings.precision} />
            ) : null,
          )}

          {/* text */}
          {shapes.map((s) =>
            s.kind === "text" ? (
              <text
                key={s.id}
                x={s.at.x}
                y={s.at.y}
                fontSize={0.34}
                fill="#1c1e21"
                style={{ pointerEvents: "none" }}
              >
                {s.text}
              </text>
            ) : null,
          )}

          {/* selection highlight */}
          {shapes
            .filter((s) => s.id === selected)
            .map((s) => {
              if (s.kind === "wall") {
                return (
                  <line
                    key={`sel-${s.id}`}
                    x1={s.a.x}
                    y1={s.a.y}
                    x2={s.b.x}
                    y2={s.b.y}
                    stroke="var(--accent--canvas--dot-fuchsia)"
                    strokeWidth={WALL_T + 0.06}
                    opacity={0.45}
                    strokeLinecap="butt"
                  />
                );
              }
              if (s.kind === "room") {
                return (
                  <rect
                    key={`sel-${s.id}`}
                    x={s.x - 0.06}
                    y={s.y - 0.06}
                    width={s.w + 0.12}
                    height={s.h + 0.12}
                    fill="none"
                    stroke="var(--accent--canvas--dot-fuchsia)"
                    strokeWidth={0.04}
                    opacity={0.8}
                  />
                );
              }
              if (s.kind === "dim") {
                return (
                  <line
                    key={`sel-${s.id}`}
                    x1={s.a.x}
                    y1={s.a.y}
                    x2={s.b.x}
                    y2={s.b.y}
                    stroke="var(--accent--canvas--dot-fuchsia)"
                    strokeWidth={0.06}
                    opacity={0.6}
                  />
                );
              }
              const at = "at" in s ? s.at : { x: 0, y: 0 };
              return (
                <circle
                  key={`sel-${s.id}`}
                  cx={at.x}
                  cy={at.y}
                  r={0.4}
                  fill="none"
                  stroke="var(--accent--canvas--dot-fuchsia)"
                  strokeWidth={0.04}
                  opacity={0.8}
                />
              );
            })}

          {/* in-progress: wall chain */}
          {chainStart && wallPreview && (
            <line
              x1={chainStart.x}
              y1={chainStart.y}
              x2={wallPreview.x}
              y2={wallPreview.y}
              stroke="var(--accent--canvas--dot-fuchsia)"
              strokeWidth={WALL_T}
              opacity={0.5}
              strokeLinecap="square"
            />
          )}
          {/* in-progress: room rect */}
          {dragRect && (
            <rect
              x={Math.min(dragRect.a.x, dragRect.b.x)}
              y={Math.min(dragRect.a.y, dragRect.b.y)}
              width={Math.abs(dragRect.a.x - dragRect.b.x)}
              height={Math.abs(dragRect.a.y - dragRect.b.y)}
              fill="var(--accent--canvas--dot-fuchsia)"
              fillOpacity={0.08}
              stroke="var(--accent--canvas--dot-fuchsia)"
              strokeWidth={0.04}
            />
          )}
          {/* in-progress: dimension */}
          {dimStart && (
            <line
              x1={dimStart.x}
              y1={dimStart.y}
              x2={cursor.x}
              y2={cursor.y}
              stroke="var(--accent--canvas--guide)"
              strokeWidth={0.03}
              strokeDasharray={`${0.15} ${0.1}`}
            />
          )}
        </g>
      </svg>

      {/* floating text input */}
      {textDraft && (
        <input
          autoFocus
          value={textDraft.value}
          onChange={(e) => setTextDraft({ ...textDraft, value: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitText();
            if (e.key === "Escape") setTextDraft(null);
          }}
          onBlur={commitText}
          placeholder="Label…"
          className="absolute z-10 w-40 rounded-control border border-border-solid/40 bg-surface-base px-2 py-1 text-xs text-content-primary shadow"
          style={{ left: textDraft.at.x * m + view.x + 8, top: textDraft.at.y * m + view.y - 12 }}
        />
      )}

      {/* zoom hint / status readout */}
      <div className="pointer-events-none absolute bottom-2 left-2 rounded-control bg-surface-base/80 px-2 py-1 font-mono text-[10px] text-content-secondary">
        x {cursor.x.toFixed(1)} · y {cursor.y.toFixed(1)} · {Math.round(view.scale / 6)}%
      </div>
    </div>
  );
}

function DimLine({
  a,
  b,
  units,
  precision,
}: {
  a: Pt;
  b: Pt;
  units: Units;
  precision: number;
}) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return (
    <g>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--accent--canvas--guide)" strokeWidth={0.025} />
      <circle cx={a.x} cy={a.y} r={0.04} fill="var(--accent--canvas--guide)" />
      <circle cx={b.x} cy={b.y} r={0.04} fill="var(--accent--canvas--guide)" />
      <g transform={`translate(${mx} ${my}) rotate(${angle})`}>
        <rect x={-0.55} y={-0.22} width={1.1} height={0.2} fill="#ffffff" opacity={0.85} rx={0.04} />
        <text
          textAnchor="middle"
          y={-0.06}
          fontSize={0.22}
          fill="#5b6411"
          style={{ pointerEvents: "none" }}
        >
          {fmtLen(len, units, precision)}
        </text>
      </g>
    </g>
  );
}

/** Original SVG symbols for the asset library (simple line-art). */
export function AssetSymbol({ symbol }: { symbol: string }) {
  const stroke = "var(--accent--canvas--crosshair)";
  const s = { stroke, strokeWidth: 0.035, fill: "none" as const };
  switch (symbol) {
    case "toilet":
      return (
        <g>
          <ellipse cx={0} cy={0.12} rx={0.19} ry={0.24} {...s} />
          <rect x={-0.16} y={-0.32} width={0.32} height={0.18} rx={0.04} {...s} />
        </g>
      );
    case "sink":
      return (
        <g>
          <rect x={-0.22} y={-0.16} width={0.44} height={0.32} rx={0.04} {...s} />
          <circle cx={0} cy={0} r={0.05} {...s} />
        </g>
      );
    case "shower":
      return (
        <g>
          <rect x={-0.22} y={-0.22} width={0.44} height={0.44} {...s} />
          <line x1={-0.22} y1={-0.22} x2={0.22} y2={0.22} {...s} />
          <line x1={-0.22} y1={0.22} x2={0.22} y2={-0.22} {...s} />
        </g>
      );
    case "bathtub":
      return (
        <g>
          <rect x={-0.42} y={-0.2} width={0.84} height={0.4} rx={0.06} {...s} />
          <circle cx={-0.3} cy={0} r={0.04} {...s} />
        </g>
      );
    case "bed-double":
      return (
        <g>
          <rect x={-0.5} y={-0.32} width={1} height={0.64} rx={0.04} {...s} />
          <line x1={-0.5} y1={-0.12} x2={0.5} y2={-0.12} {...s} />
          <rect x={-0.44} y={-0.28} width={0.2} height={0.14} {...s} />
          <rect x={0.24} y={-0.28} width={0.2} height={0.14} {...s} />
        </g>
      );
    case "bed-single":
      return (
        <g>
          <rect x={-0.32} y={-0.32} width={0.64} height={0.64} rx={0.04} {...s} />
          <line x1={-0.32} y1={-0.1} x2={0.32} y2={-0.1} {...s} />
        </g>
      );
    case "wardrobe":
      return (
        <g>
          <rect x={-0.45} y={-0.2} width={0.9} height={0.4} {...s} />
          <line x1={0} y1={-0.2} x2={0} y2={0.2} {...s} />
        </g>
      );
    case "counter":
      return <rect x={-0.5} y={-0.25} width={1} height={0.5} {...s} />;
    case "stove":
      return (
        <g>
          <rect x={-0.3} y={-0.28} width={0.6} height={0.56} {...s} />
          <circle cx={-0.13} cy={-0.1} r={0.08} {...s} />
          <circle cx={0.13} cy={-0.1} r={0.08} {...s} />
          <circle cx={-0.13} cy={0.12} r={0.08} {...s} />
          <circle cx={0.13} cy={0.12} r={0.08} {...s} />
        </g>
      );
    case "fridge":
      return (
        <g>
          <rect x={-0.25} y={-0.3} width={0.5} height={0.6} {...s} />
          <line x1={-0.25} y1={-0.08} x2={0.25} y2={-0.08} {...s} />
        </g>
      );
    case "dining-table":
      return (
        <g>
          <ellipse cx={0} cy={0} rx={0.42} ry={0.26} {...s} />
          <circle cx={-0.2} cy={-0.26} r={0.05} {...s} />
          <circle cx={0.2} cy={-0.26} r={0.05} {...s} />
          <circle cx={-0.2} cy={0.26} r={0.05} {...s} />
          <circle cx={0.2} cy={0.26} r={0.05} {...s} />
        </g>
      );
    case "sofa":
      return (
        <g>
          <rect x={-0.5} y={-0.2} width={1} height={0.4} rx={0.08} {...s} />
          <rect x={-0.5} y={-0.32} width={1} height={0.14} rx={0.05} {...s} />
        </g>
      );
    case "armchair":
      return (
        <g>
          <rect x={-0.28} y={-0.24} width={0.56} height={0.48} rx={0.07} {...s} />
          <rect x={-0.28} y={-0.36} width={0.56} height={0.14} rx={0.05} {...s} />
        </g>
      );
    case "coffee-table":
      return <ellipse cx={0} cy={0} rx={0.3} ry={0.18} {...s} />;
    case "tv":
      return (
        <g>
          <rect x={-0.45} y={-0.06} width={0.9} height={0.12} {...s} />
          <line x1={-0.45} y1={-0.14} x2={0.45} y2={-0.14} {...s} />
        </g>
      );
    case "desk":
      return <rect x={-0.5} y={-0.24} width={1} height={0.48} {...s} />;
    case "office-chair":
      return (
        <g>
          <circle cx={0} cy={0} r={0.16} {...s} />
          <rect x={-0.14} y={-0.3} width={0.28} height={0.12} rx={0.03} {...s} />
        </g>
      );
    case "bookshelf":
      return (
        <g>
          <rect x={-0.35} y={-0.08} width={0.7} height={0.16} {...s} />
          <line x1={-0.12} y1={-0.08} x2={-0.12} y2={0.08} {...s} />
          <line x1={0.12} y1={-0.08} x2={0.12} y2={0.08} {...s} />
        </g>
      );
    case "plant":
      return (
        <g>
          <circle cx={0} cy={0} r={0.12} {...s} />
          <circle cx={0} cy={0} r={0.05} {...s} />
        </g>
      );
    case "stairs":
      return (
        <g>
          <rect x={-0.35} y={-0.22} width={0.7} height={0.44} {...s} />
          <line x1={-0.35} y1={-0.07} x2={0.35} y2={-0.07} {...s} />
          <line x1={-0.35} y1={0.08} x2={0.35} y2={0.08} {...s} />
        </g>
      );
    default:
      return <circle cx={0} cy={0} r={0.2} {...s} />;
  }
}
