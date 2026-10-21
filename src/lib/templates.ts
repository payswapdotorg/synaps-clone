"use client";

/**
 * Simulated template catalogue.
 *
 * The real product exposes templates.listPublic / listAll / forModel and a
 * template gallery route. Titles follow the example prompts observed in the
 * production bundle (Corner café / Townhouse / Courtyard house) plus the
 * "What are you designing today?" onboarding answers. Each template carries
 * a small original starter plan expressed in the clone's editor shape
 * vocabulary (see src/lib/editor.ts).
 */

import type { Shape } from "@/lib/editor";

export interface SimTemplate {
  id: string;
  name: string;
  description: string;
  category: "residential" | "commercial" | "public";
  rooms: number;
  areaM2: number;
  /** Starter shapes instantiated when the template is used. */
  shapes: Shape[];
}

function box(x: number, y: number, w: number, h: number, label: string): Shape {
  return { kind: "room", id: `t-${label}-${x}-${y}`, x, y, w, h, label };
}

function wall(x1: number, y1: number, x2: number, y2: number): Shape {
  return { kind: "wall", id: `t-w-${x1}-${y1}-${x2}-${y2}`, a: { x: x1, y: y1 }, b: { x: x2, y: y2 } };
}

export const PUBLIC_TEMPLATES: SimTemplate[] = [
  {
    id: "tpl-corner-cafe",
    name: "Corner café",
    description: "Compact café with service counter, seating and a small kitchen.",
    category: "commercial",
    rooms: 3,
    areaM2: 96,
    shapes: [
      wall(0, 0, 12, 0), wall(12, 0, 12, 8), wall(12, 8, 0, 8), wall(0, 8, 0, 0),
      box(0, 0, 4, 3, "Counter"),
      box(4.5, 0.5, 4, 3.5, "Seating"),
      box(9, 4, 3, 4, "Kitchen"),
      { kind: "door", id: "t-d1", at: { x: 6, y: 0 }, angle: 0, width: 1 },
    ],
  },
  {
    id: "tpl-townhouse",
    name: "Townhouse",
    description: "Narrow three-storey townhouse floor — living, kitchen and garden access.",
    category: "residential",
    rooms: 4,
    areaM2: 84,
    shapes: [
      wall(0, 0, 6, 0), wall(6, 0, 6, 14), wall(6, 14, 0, 14), wall(0, 14, 0, 0),
      box(0, 0, 6, 5, "Living"),
      box(0, 5.5, 6, 4, "Kitchen"),
      box(0.5, 10, 5, 4, "Garden room"),
      { kind: "door", id: "t-d2", at: { x: 3, y: 14 }, angle: 180, width: 1 },
    ],
  },
  {
    id: "tpl-courtyard-house",
    name: "Courtyard house",
    description: "House wrapped around a central courtyard with shaded veranda.",
    category: "residential",
    rooms: 5,
    areaM2: 168,
    shapes: [
      wall(0, 0, 14, 0), wall(14, 0, 14, 12), wall(14, 12, 0, 12), wall(0, 12, 0, 0),
      box(0, 0, 5, 6, "Master"),
      box(9, 0, 5, 6, "Bedroom"),
      box(0, 8, 5, 4, "Study"),
      box(9, 8, 5, 4, "Kitchen"),
      box(5.5, 5.5, 3, 3, "Courtyard"),
    ],
  },
  {
    id: "tpl-office",
    name: "Open workspace",
    description: "Open-plan office with meeting rooms and phone booths.",
    category: "commercial",
    rooms: 4,
    areaM2: 220,
    shapes: [
      wall(0, 0, 20, 0), wall(20, 0, 20, 11), wall(20, 11, 0, 11), wall(0, 11, 0, 0),
      box(0, 0, 20, 6, "Open workspace"),
      box(0, 6.5, 5, 4.5, "Meeting A"),
      box(5.5, 6.5, 5, 4.5, "Meeting B"),
      box(15, 7, 5, 4, "Booths"),
    ],
  },
  {
    id: "tpl-retail",
    name: "Retail / hospitality",
    description: "Shop floor with stockroom and fitting alcoves.",
    category: "commercial",
    rooms: 3,
    areaM2: 110,
    shapes: [
      wall(0, 0, 11, 0), wall(11, 0, 11, 10), wall(11, 10, 0, 10), wall(0, 10, 0, 0),
      box(0, 0, 11, 6, "Shop floor"),
      box(8, 6.5, 3, 3.5, "Stock"),
      box(0.5, 6.5, 3, 3, "Fitting"),
    ],
  },
  {
    id: "tpl-apartment",
    name: "Apartment",
    description: "One-bedroom apartment with an open kitchen-living area.",
    category: "residential",
    rooms: 3,
    areaM2: 58,
    shapes: [
      wall(0, 0, 8, 0), wall(8, 0, 8, 7), wall(8, 7, 0, 7), wall(0, 7, 0, 0),
      box(0, 0, 8, 4, "Living + kitchen"),
      box(5.5, 4.5, 2.5, 2.5, "Bedroom"),
      box(0, 4.5, 2, 2.5, "Bath"),
      { kind: "door", id: "t-d3", at: { x: 4, y: 0 }, angle: 0, width: 0.9 },
    ],
  },
];

export function templateById(id: string): SimTemplate | undefined {
  return PUBLIC_TEMPLATES.find((t) => t.id === id);
}
