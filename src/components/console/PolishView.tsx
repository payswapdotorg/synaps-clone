"use client";

/**
 * Polish view — the clone's original interpretation of the product's second
 * canvas mode. The real product switches to a WebGPU renderer (WebGPURenderer,
 * CanvasRenderer, CanvasPool, BuildingScene, sunlightState) with 74 procedural
 * texture datasets (Brick/Concrete/Diagrammatic/Earth/Glass/Grass/Insulation/
 * Metal/Pavement/Roofing/Sand/Stone/Tile/Water/Wood). This clone renders the
 * same plan as polished SVG: material patterns (original SVG artwork), a
 * sunlight control (azimuth/elevation → shadow overlay) and per-room material
 * assignment. Clearly labelled: no 3D, no WebGPU, no texture datasets.
 */

import type { Shape } from "@/lib/editor";

export type MaterialId =
  | "brick" | "concrete" | "wood" | "tile" | "glass" | "metal" | "grass" | "water" | "sand";

export interface MaterialDef {
  id: MaterialId;
  label: string;
  fill: string;
  stroke: string;
}

export const MATERIALS: MaterialDef[] = [
  { id: "brick", label: "Brick", fill: "#b0715a", stroke: "#8a5644" },
  { id: "concrete", label: "Concrete", fill: "#c8c8c4", stroke: "#a6a6a2" },
  { id: "wood", label: "Wood", fill: "#c99b6a", stroke: "#a87c4f" },
  { id: "tile", label: "Tile", fill: "#d8d3c8", stroke: "#b3ada0" },
  { id: "glass", label: "Glass", fill: "#bcd9e8", stroke: "#8fb8cc" },
  { id: "metal", label: "Metal", fill: "#c3c9d1", stroke: "#98a1ab" },
  { id: "grass", label: "Grass", fill: "#9fc08a", stroke: "#7ba267" },
  { id: "water", label: "Water", fill: "#9ec3d8", stroke: "#75a3bd" },
  { id: "sand", label: "Sand", fill: "#e0d0a8", stroke: "#c2b088" },
];

export const DEFAULT_MATERIAL: MaterialId = "concrete";

export function materialOf(id: string | undefined): MaterialDef {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[1];
}

/** Per-material SVG pattern definitions (original artwork). */
export function MaterialPatterns({ idPrefix = "polish" }: { idPrefix?: string }) {
  return (
    <defs>
      {MATERIALS.map((m) => (
        <pattern key={m.id} id={`${idPrefix}-${m.id}`} width="0.5" height="0.5" patternUnits="userSpaceOnUse">
          <rect width="0.5" height="0.5" fill={m.fill} />
          {m.id === "brick" && (
            <>
              <path d="M0 0.125h0.5M0 0.375h0.5M0.125 0.125v0.25M0.375 0.375v0.25" stroke={m.stroke} strokeWidth="0.02" />
            </>
          )}
          {m.id === "concrete" && <circle cx="0.15" cy="0.2" r="0.03" fill={m.stroke} opacity="0.5" />}
          {m.id === "wood" && <path d="M0 0.25q0.125 -0.08 0.25 0t0.25 0" stroke={m.stroke} strokeWidth="0.025" fill="none" />}
          {m.id === "tile" && <path d="M0.25 0v0.5M0 0.25h0.5" stroke={m.stroke} strokeWidth="0.015" />}
          {m.id === "glass" && <path d="M0 0.5L0.5 0" stroke="#ffffff" strokeWidth="0.04" opacity="0.6" />}
          {m.id === "metal" && <path d="M0 0.15h0.5M0 0.35h0.5" stroke={m.stroke} strokeWidth="0.02" />}
          {m.id === "grass" && <path d="M0.1 0.4l0.05 -0.15M0.3 0.45l0.05 -0.2" stroke={m.stroke} strokeWidth="0.025" />}
          {m.id === "water" && <path d="M0 0.2q0.125 0.05 0.25 0t0.25 0" stroke={m.stroke} strokeWidth="0.02" fill="none" />}
          {m.id === "sand" && <circle cx="0.3" cy="0.3" r="0.02" fill={m.stroke} />}
        </pattern>
      ))}
    </defs>
  );
}

/**
 * The polished plan render. Walls get depth (double stroke), rooms get their
 * material fill, and the sunlight control casts a soft shadow offset derived
 * from azimuth/elevation (a simple original approximation).
 */
export function PolishView({
  shapes,
  materials,
  sunlight,
  grid,
  width = 800,
  height = 560,
}: {
  shapes: Shape[];
  materials: Record<string, MaterialId>;
  sunlight: { azimuth: number; elevation: number };
  grid: number;
  width?: number;
  height?: number;
}) {
  // Shadow offset: azimuth 0..360°, elevation 10..80° → px offset.
  const rad = (sunlight.azimuth * Math.PI) / 180;
  const strength = Math.max(0.1, 1 - sunlight.elevation / 90);
  const dx = Math.cos(rad) * 10 * strength;
  const dy = Math.sin(rad) * 10 * strength;

  const pad = 2;
  const rooms = shapes.filter((s): s is Extract<Shape, { kind: "room" }> => s.kind === "room");
  const walls = shapes.filter((s): s is Extract<Shape, { kind: "wall" }> => s.kind === "wall");

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${width / 60 + pad * 2} ${height / 60 + pad * 2}`}
      className="h-full w-full"
      role="img"
      aria-label="Polished plan render (simulated)"
      style={{ background: "#e8e4dc" }}
    >
      <MaterialPatterns idPrefix="polish" />
      {/* ground */}
      <rect x={-pad} y={-pad} width={width / 60 + pad * 2} height={height / 60 + pad * 2} fill="#e8e4dc" />
      {/* soft sun shadow under rooms */}
      <g opacity={0.25 * strength} fill="#4a4438">
        {rooms.map((r) => (
          <rect key={`sh-${r.id}`} x={r.x + dx / 60} y={r.y + dy / 60} width={r.w} height={r.h} rx="0.08" />
        ))}
      </g>
      {/* rooms with materials */}
      {rooms.map((r) => (
        <g key={r.id}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={`url(#polish-${materialOf(materials[r.id]).id})`} stroke={materialOf(materials[r.id]).stroke} strokeWidth="0.05" rx="0.04" />
          <text x={r.x + 0.15} y={r.y + 0.42} fontSize="0.28" fill="#2c2c28">{r.label}</text>
        </g>
      ))}
      {/* walls with depth */}
      {walls.map((w) => (
        <g key={w.id}>
          <line x1={w.a.x + dx / 120} y1={w.a.y + dy / 120} x2={w.b.x + dx / 120} y2={w.b.y + dy / 120} stroke="#8a857c" strokeWidth="0.22" strokeLinecap="round" />
          <line x1={w.a.x} y1={w.a.y} x2={w.b.x} y2={w.b.y} stroke="#f4f1ea" strokeWidth="0.14" strokeLinecap="round" />
        </g>
      ))}
      {/* sun indicator */}
      <g transform={`translate(${width / 60 - 1.4}, 0.6)`}>
        <circle r="0.28" fill="#f5c451" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={Math.cos(a) * 0.36} y1={Math.sin(a) * 0.36} x2={Math.cos(a) * 0.52} y2={Math.sin(a) * 0.52} stroke="#f5c451" strokeWidth="0.05" />;
        })}
      </g>
      <text x={0.1} y={height / 60 - 0.15} fontSize="0.2" fill="#6b665c">
        Polish mode (simulated) · sun az {Math.round(sunlight.azimuth)}° · el {Math.round(sunlight.elevation)}° · grid {grid} m
      </text>
    </svg>
  );
}

/** Sunlight control panel (sunlightState in the original). */
export function SunlightPanel({
  sunlight,
  onChange,
}: {
  sunlight: { azimuth: number; elevation: number };
  onChange: (next: { azimuth: number; elevation: number }) => void;
}) {
  return (
    <div className="rounded-surface border border-border-solid/15 bg-surface-base p-3">
      <p className="text-2xs font-semibold uppercase tracking-wide text-content-secondary">Sunlight</p>
      <label className="mt-2 block text-[11px] text-content-secondary" htmlFor="sun-az">Azimuth {Math.round(sunlight.azimuth)}°</label>
      <input
        id="sun-az"
        type="range"
        min={0}
        max={360}
        value={sunlight.azimuth}
        onChange={(e) => onChange({ ...sunlight, azimuth: Number(e.target.value) })}
        className="w-full"
      />
      <label className="mt-1 block text-[11px] text-content-secondary" htmlFor="sun-el">Elevation {Math.round(sunlight.elevation)}°</label>
      <input
        id="sun-el"
        type="range"
        min={10}
        max={80}
        value={sunlight.elevation}
        onChange={(e) => onChange({ ...sunlight, elevation: Number(e.target.value) })}
        className="w-full"
      />
    </div>
  );
}
