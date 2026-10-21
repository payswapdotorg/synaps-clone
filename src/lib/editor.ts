/**
 * Plan editor model — original code.
 *
 * The original console is a full CAD kernel (walls with openings, buildings,
 * floors, stairs…). This clone implements a credible 2D floor-plan subset:
 * walls, doors, windows, rooms, dimensions, text labels and asset stamps,
 * with grid snapping, unit switching and undo/redo. All geometry is stored
 * in meters; display converts per the selected units (observed originals:
 * Length units / Precision / Area units / Grid in the Canvas panel).
 */

export type Pt = { x: number; y: number };

export type Shape =
  | { kind: "wall"; id: string; a: Pt; b: Pt }
  | { kind: "door"; id: string; at: Pt; angle: number; width: number }
  | { kind: "window"; id: string; at: Pt; angle: number; width: number }
  | { kind: "room"; id: string; x: number; y: number; w: number; h: number; label: string; material?: string; provenance?: "import" | "lasso" }
  | { kind: "text"; id: string; at: Pt; text: string }
  | { kind: "dim"; id: string; a: Pt; b: Pt }
  | { kind: "asset"; id: string; at: Pt; symbol: string; rot: number };

export type Tool =
  | "select"
  | "pan"
  | "wall"
  | "door"
  | "window"
  | "room"
  | "lasso"
  | "text"
  | "dim"
  | "asset"
  | "eraser";

export type Units = "m" | "ft";
export type AreaUnits = "m2" | "ft2";

export const M_TO_FT = 3.280839895;

export function fmtLen(m: number, units: Units, precision: number): string {
  const v = units === "ft" ? m * M_TO_FT : m;
  return `${v.toFixed(precision)} ${units}`;
}

export function fmtArea(m2: number, units: AreaUnits, precision: number): string {
  const v = units === "ft2" ? m2 * M_TO_FT * M_TO_FT : m2;
  const unit = units === "ft2" ? "sq ft" : "m²";
  return `${v.toFixed(precision)} ${unit}`;
}

let counter = 0;
export function nid(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function snap(v: number, grid: number): number {
  return Math.round(v / grid) * grid;
}

export function snapPt(p: Pt, grid: number): Pt {
  return { x: snap(p.x, grid), y: snap(p.y, grid) };
}

/** Nearest point on segment [a,b] to p, with its distance. */
export function nearestOnSegment(p: Pt, a: Pt, b: Pt): { pt: Pt; dist: number; t: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  const pt = { x: a.x + t * dx, y: a.y + t * dy };
  return { pt, dist: Math.hypot(p.x - pt.x, p.y - pt.y), t };
}

export function findWallAt(shapes: Shape[], p: Pt, tolerance: number) {
  let best: { wall: Extract<Shape, { kind: "wall" }>; pt: Pt; dist: number } | null = null;
  for (const s of shapes) {
    if (s.kind !== "wall") continue;
    const n = nearestOnSegment(p, s.a, s.b);
    if (n.dist <= tolerance && (!best || n.dist < best.dist)) {
      best = { wall: s, pt: n.pt, dist: n.dist };
    }
  }
  return best;
}

export function shapeBounds(s: Shape): { x: number; y: number; w: number; h: number } {
  switch (s.kind) {
    case "wall": {
      const x = Math.min(s.a.x, s.b.x);
      const y = Math.min(s.a.y, s.b.y);
      return { x, y, w: Math.abs(s.a.x - s.b.x), h: Math.abs(s.a.y - s.b.y) };
    }
    case "room":
      return { x: s.x, y: s.y, w: s.w, h: s.h };
    case "dim": {
      const x = Math.min(s.a.x, s.b.x);
      const y = Math.min(s.a.y, s.b.y);
      return { x, y, w: Math.abs(s.a.x - s.b.x), h: Math.abs(s.a.y - s.b.y) };
    }
    case "text":
      return { x: s.at.x - 0.5, y: s.at.y - 0.3, w: 1, h: 0.6 };
    case "door":
    case "window":
    case "asset":
      return { x: s.at.x - 0.5, y: s.at.y - 0.5, w: 1, h: 1 };
  }
}

export function hitTest(s: Shape, p: Pt, tolerance: number): boolean {
  const b = shapeBounds(s);
  if (s.kind === "wall") {
    const n = nearestOnSegment(p, s.a, s.b);
    return n.dist <= tolerance;
  }
  return (
    p.x >= b.x - tolerance &&
    p.x <= b.x + b.w + tolerance &&
    p.y >= b.y - tolerance &&
    p.y <= b.y + b.h + tolerance
  );
}

export function translateShape(s: Shape, dx: number, dy: number): Shape {
  switch (s.kind) {
    case "wall":
      return { ...s, a: { x: s.a.x + dx, y: s.a.y + dy }, b: { x: s.b.x + dx, y: s.b.y + dy } };
    case "room":
      return { ...s, x: s.x + dx, y: s.y + dy };
    case "text":
    case "door":
    case "window":
    case "asset":
      return { ...s, at: { x: s.at.x + dx, y: s.at.y + dy } };
    case "dim":
      return { ...s, a: { x: s.a.x + dx, y: s.a.y + dy }, b: { x: s.b.x + dx, y: s.b.y + dy } };
  }
}

/** Layers auto-generated from the drawing (observed: “No layers yet. Anything you draw appears here.”). */
export function deriveLayers(shapes: Shape[]): { name: string; count: number }[] {
  const order: Shape["kind"][] = ["room", "wall", "door", "window", "asset", "dim", "text"];
  const names: Record<string, string> = {
    room: "Rooms",
    wall: "Walls",
    door: "Doors",
    window: "Windows",
    asset: "Assets",
    dim: "Dimensions",
    text: "Annotations",
  };
  const out: { name: string; count: number }[] = [];
  for (const k of order) {
    const c = shapes.filter((s) => s.kind === k).length;
    if (c > 0) out.push({ name: names[k], count: c });
  }
  return out;
}

/** Asset library (observed category names, original SVG symbols). */
export const ASSET_CATEGORIES: { name: string; symbols: { id: string; label: string }[] }[] = [
  {
    name: "Bathroom",
    symbols: [
      { id: "toilet", label: "Toilet" },
      { id: "sink", label: "Sink" },
      { id: "shower", label: "Shower" },
      { id: "bathtub", label: "Bathtub" },
    ],
  },
  {
    name: "Bedroom",
    symbols: [
      { id: "bed-double", label: "Double bed" },
      { id: "bed-single", label: "Single bed" },
      { id: "wardrobe", label: "Wardrobe" },
    ],
  },
  {
    name: "Kitchen",
    symbols: [
      { id: "counter", label: "Counter" },
      { id: "stove", label: "Stove" },
      { id: "fridge", label: "Fridge" },
      { id: "dining-table", label: "Dining table" },
    ],
  },
  {
    name: "Living Room",
    symbols: [
      { id: "sofa", label: "Sofa" },
      { id: "armchair", label: "Armchair" },
      { id: "coffee-table", label: "Coffee table" },
      { id: "tv", label: "TV unit" },
    ],
  },
  {
    name: "Office",
    symbols: [
      { id: "desk", label: "Desk" },
      { id: "office-chair", label: "Chair" },
      { id: "bookshelf", label: "Bookshelf" },
    ],
  },
  {
    name: "Others",
    symbols: [
      { id: "plant", label: "Plant" },
      { id: "stairs", label: "Stairs" },
    ],
  },
];

/** A deterministic demo plan (used by “demo project” / “generate with AI” / “upload”). */
export function demoPlan(): Shape[] {
  const W = (x1: number, y1: number, x2: number, y2: number): Shape => ({
    kind: "wall",
    id: nid("w"),
    a: { x: x1, y: y1 },
    b: { x: x2, y: y2 },
  });
  const D = (x: number, y: number, angle: number, width = 0.9): Shape => ({
    kind: "door",
    id: nid("d"),
    at: { x, y },
    angle,
    width,
  });
  const Wd = (x: number, y: number, angle: number, width = 1.2): Shape => ({
    kind: "window",
    id: nid("wd"),
    at: { x, y },
    angle,
    width,
  });
  return [
    // outer shell 9.0 x 6.5
    W(0, 0, 9, 0), W(9, 0, 9, 6.5), W(9, 6.5, 0, 6.5), W(0, 6.5, 0, 0),
    // interior
    W(5, 0, 5, 4), W(5, 4, 9, 4), W(0, 4, 2.5, 4), W(2.5, 4, 2.5, 6.5),
    // openings
    D(2.2, 0, 0), D(6.5, 4, 0, 0.8), D(1.25, 4, 0, 0.8),
    Wd(3.5, 6.5, 0, 1.6), Wd(7, 0, 0, 1.4), Wd(0, 2, 90, 1.4),
    // rooms
    { kind: "room", id: nid("r"), x: 0.2, y: 4.2, w: 2.1, h: 2.1, label: "Bedroom" },
    { kind: "room", id: nid("r"), x: 5.2, y: 0.2, w: 3.6, h: 3.6, label: "Living" },
    { kind: "room", id: nid("r"), x: 0.2, y: 0.2, w: 4.4, h: 3.4, label: "Kitchen" },
    // annotations
    { kind: "text", id: nid("t"), at: { x: 4.4, y: -0.7 }, text: "Demo plan — 58.5 m²" },
    { kind: "dim", id: nid("dm"), a: { x: 0, y: -0.35 }, b: { x: 9, y: -0.35 } },
  ];
}
