"use client";

import type { LayerId } from "@/lib/demo";

type PlanCanvasProps = {
  layers: Record<LayerId, boolean>;
  /** Room id that is currently selected (highlighted with a fill). */
  selectedRoom: string | null;
  /** Show the fuchsia snapping guides (from the canvas tokens). */
  showGuides: boolean;
  /** Show the crosshair marker. */
  showCrosshair: boolean;
  className?: string;
};

/**
 * The drafting canvas — an original, hand-authored SVG floor plan.
 *
 * Nothing here is traced from the original product: the geometry is a simple
 * hand-built three-room plan used to make the simulated layers legible.
 *
 * The visual language follows the tokens recorded in ANALYSIS.md:
 *  · multilayer walls (a heavy poché line plus an offset skin)
 *  · glazing drawn as parallel lines across an opening
 *  · door leaves with a swing arc
 *  · stair treads with a direction arrow
 *  · hatch fill from the "Hatches, materials, blocks." layer
 *  · a crosshair, a dot grid and fuchsia snapping guides
 */
export function PlanCanvas({
  layers,
  selectedRoom,
  showGuides,
  showCrosshair,
  className,
}: PlanCanvasProps) {
  const roomFill = (id: string) =>
    selectedRoom === id ? "var(--accent--canvas--guide-fill)" : "transparent";

  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      role="img"
      aria-label="Simulated floor plan with layered walls, windows, doors, stairs and hatches"
    >
      <defs>
        <pattern
          id="demo-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="var(--accent--canvas--crosshair)"
            strokeWidth="1"
            opacity="0.45"
          />
        </pattern>
        <pattern
          id="demo-dots"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="1.5"
            cy="1.5"
            r="1"
            fill="var(--accent--canvas--dot)"
            opacity="0.35"
          />
        </pattern>
      </defs>

      {/* Dot grid — the drafting surface, from the canvas tokens. */}
      <rect x="0" y="0" width="640" height="400" fill="url(#demo-dots)" />

      {/* Room fills — also carries the selection highlight. */}
      {layers.walls ? (
        <>
          <rect x="60" y="50" width="240" height="280" fill={roomFill("studio")} />
          <rect x="300" y="50" width="280" height="150" fill={roomFill("meeting")} />
          <rect x="300" y="200" width="280" height="130" fill={roomFill("studio-b")} />
        </>
      ) : null}

      {/* Hatches — "Hatches, materials, blocks." */}
      {layers.hatches ? (
        <g>
          <rect
            x="320"
            y="70"
            width="70"
            height="60"
            fill="url(#demo-hatch)"
            stroke="var(--border--solid)"
            strokeWidth="0.75"
            opacity="0.9"
          />
          <rect
            x="420"
            y="220"
            width="120"
            height="80"
            fill="url(#demo-hatch)"
            stroke="var(--border--solid)"
            strokeWidth="0.75"
            opacity="0.55"
          />
        </g>
      ) : null}

      {/* Multilayer walls — heavy poché line plus an offset skin. */}
      {layers.walls ? (
        <g
          stroke="var(--content--primary)"
          fill="none"
          strokeLinecap="square"
        >
          <rect x="60" y="50" width="520" height="280" strokeWidth="9" />
          <rect x="66" y="56" width="508" height="268" strokeWidth="1.5" opacity="0.7" />

          <path d="M300 50 V330" strokeWidth="7" />
          <path d="M307 50 V330" strokeWidth="1.5" opacity="0.7" />

          <path d="M300 200 H580" strokeWidth="7" />
          <path d="M300 207 H580" strokeWidth="1.5" opacity="0.7" />
        </g>
      ) : null}

      {/* Windows — glazing drawn as parallel lines across the opening. */}
      {layers.windows ? (
        <g stroke="var(--accent--canvas--crosshair)" strokeWidth="1.2">
          {/* north wall, two openings */}
          <path d="M110 50 H170 M113 46.5 H167 M116 43 H164" />
          <path d="M390 50 H450 M393 46.5 H447 M396 43 H444" />
          {/* west wall */}
          <path d="M60 120 V180 M56.5 123 V177 M53 126 V174" />
          {/* south wall */}
          <path d="M340 330 H400 M343 333.5 H397 M346 337 H394" />
        </g>
      ) : null}

      {/* Doors — leaf plus swing arc. */}
      {layers.doors ? (
        <g
          stroke="var(--content--primary)"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          {/* studio → meeting */}
          <path d="M300 130 H336" />
          <path d="M336 130 A36 36 0 0 0 300 94" opacity="0.75" />
          {/* meeting → studio B */}
          <path d="M360 200 V236" />
          <path d="M360 236 A36 36 0 0 1 396 200" opacity="0.75" />
          {/* entrance, south wall */}
          <path d="M200 330 V294" />
          <path d="M200 294 A36 36 0 0 1 236 330" opacity="0.75" />
        </g>
      ) : null}

      {/* Stairs — treads and a direction arrow. */}
      {layers.stairs ? (
        <g
          stroke="var(--content--primary)"
          fill="none"
          strokeWidth="1"
          opacity="0.85"
        >
          <rect x="84" y="236" width="86" height="76" strokeWidth="1.2" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M84 ${244 + i * 10} H170`} />
          ))}
          <path d="M127 300 V256 M127 256 L121 266 M127 256 L133 266" />
        </g>
      ) : null}

      {/* Room labels + areas. */}
      {layers.labels ? (
        <g
          fill="var(--content--primary)"
          fontFamily="var(--font-mono)"
          textAnchor="middle"
        >
          <text x="180" y="130" fontSize="13" letterSpacing="1.6">
            STUDIO
          </text>
          <text x="180" y="146" fontSize="10" opacity="0.6">
            48.2 m²
          </text>
          <text x="440" y="168" fontSize="13" letterSpacing="1.6">
            MEETING
          </text>
          <text x="440" y="184" fontSize="10" opacity="0.6">
            21.6 m²
          </text>
          <text x="440" y="256" fontSize="13" letterSpacing="1.6">
            STUDIO B
          </text>
          <text x="440" y="272" fontSize="10" opacity="0.6">
            31.4 m²
          </text>
        </g>
      ) : null}

      {/* Dimension line. */}
      {layers.dimensions ? (
        <g
          stroke="var(--content--secondary)"
          strokeWidth="0.9"
          fontFamily="var(--font-mono)"
          fill="var(--content--secondary)"
        >
          <path d="M60 366 V344 M580 366 V344 M60 360 H580" />
          <path d="M60 356 L66 360 L60 364 M580 356 L574 360 L580 364" />
          <rect x="296" y="350" width="48" height="14" fill="var(--surface--base)" />
          <text x="320" y="361" fontSize="10" textAnchor="middle">
            8 400
          </text>
        </g>
      ) : null}

      {/* Snapping guides — fuchsia when active (canvas token). */}
      {showGuides ? (
        <g
          stroke="var(--accent--canvas--dot-fuchsia)"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.9"
        >
          <path d="M300 24 V384" />
          <path d="M34 200 H606" />
        </g>
      ) : null}

      {/* Crosshair. */}
      {showCrosshair ? (
        <g
          stroke="var(--accent--canvas--crosshair)"
          strokeWidth="1"
          opacity="0.9"
        >
          <path d="M196 116 H224 M210 102 V130" />
          <circle cx="210" cy="116" r="7" fill="none" />
        </g>
      ) : null}
    </svg>
  );
}
