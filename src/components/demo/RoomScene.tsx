"use client";

import { finishOptions, type CameraId, type FinishId } from "@/lib/demo";

type RoomSceneProps = {
  /** Sun azimuth in degrees — drives the shadow direction. */
  sunAngle: number;
  /** Time of day in decimal hours. */
  hours: number;
  finishes: Record<FinishId, string>;
  camera: CameraId;
  className?: string;
};

/**
 * The polish-mode scene — an original axonometric SVG of a room.
 *
 * Hand-authored geometry, no traced assets. The shadow polygon is derived
 * from the sun angle, and the floor/wall/ceiling colours come from the
 * finish swatches, which is what the polish step lets you change:
 *
 *   "Shadows. Cast and edit live. Sun position, time of day."
 *   "Change the light. Swap finishes. The scene catches up."
 *   "Walk the space. Camera framing built in."
 */
export function RoomScene({
  sunAngle,
  hours,
  finishes,
  camera,
  className,
}: RoomSceneProps) {
  const swatch = (id: FinishId, index: number) => {
    const options = finishOptions[id];
    return options.find((o) => o.label === finishes[id])?.swatch ?? options[index].swatch;
  };

  const floorColor = swatch("floor", 0);
  const wallColor = swatch("wall", 0);
  const ceilingColor = swatch("ceiling", 0);

  // Light direction, projected onto the plan. Midday sun is short shadows,
  // morning/evening sun is long.
  const azimuth = (sunAngle * Math.PI) / 180;
  const daylight = Math.max(0, Math.sin(((hours - 6) / 12) * Math.PI));
  const length = 40 + (1 - daylight) * 120;
  const dx = Math.cos(azimuth) * length;
  const dy = Math.abs(Math.sin(azimuth)) * length * 0.35;

  // The window opening on the back wall, and where its light lands.
  const winLeft = 380;
  const winRight = 500;
  const winTop = 96;
  const winBottom = 150;

  const shadow = [
    [winLeft, winBottom],
    [winRight, winBottom],
    [winRight + dx, winBottom + dy],
    [winLeft + dx, winBottom + dy],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const shadowOpacity = (0.08 + daylight * 0.22).toFixed(2);

  // Camera framing — each preset shifts the drawing group.
  const cameraTransform = {
    entry: "translate(30 26) scale(0.92)",
    corner: "translate(0 10) scale(1)",
    elevated: "translate(-10 34) scale(1.06)",
  }[camera];

  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      role="img"
      aria-label="Simulated axonometric room preview with adjustable sun and finishes"
    >
      <defs>
        <linearGradient id="demo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wallColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={wallColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform={cameraTransform}>
        {/* Back wall */}
        <polygon
          points="260,210 620,210 620,70 260,70"
          fill={wallColor}
          stroke="var(--border--solid)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Left wall */}
        <polygon
          points="140,320 260,210 260,70 140,180"
          fill={wallColor}
          opacity="0.82"
          stroke="var(--border--solid)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Floor */}
        <polygon
          points="140,320 500,320 620,210 260,210"
          fill={floorColor}
          stroke="var(--border--solid)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Ceiling edge */}
        <polygon
          points="140,180 260,70 620,70 500,180"
          fill={ceilingColor}
          opacity="0.5"
          stroke="var(--border--solid)"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />

        {/* Shadow cast through the window */}
        <polygon points={shadow} fill="#000000" opacity={shadowOpacity} />

        {/* Window opening on the back wall */}
        <rect
          x={winLeft}
          y={winTop}
          width={winRight - winLeft}
          height={winBottom - winTop}
          fill="var(--accent--canvas--badge)"
          stroke="var(--border--solid)"
          strokeWidth="1"
        />
        <line
          x1={(winLeft + winRight) / 2}
          y1={winTop}
          x2={(winLeft + winRight) / 2}
          y2={winBottom}
          stroke="var(--border--solid)"
          strokeWidth="0.75"
        />

        {/* Furniture blocks — a table and two seats */}
        <polygon
          points="250,268 340,268 372,240 282,240"
          fill={ceilingColor}
          opacity="0.9"
          stroke="var(--border--solid)"
          strokeWidth="0.9"
        />
        <polygon
          points="250,268 340,268 340,288 250,288"
          fill="var(--content--primary)"
          opacity="0.16"
          stroke="var(--border--solid)"
          strokeWidth="0.9"
        />
        <polygon
          points="340,268 372,240 372,260 340,288"
          fill="var(--content--primary)"
          opacity="0.26"
          stroke="var(--border--solid)"
          strokeWidth="0.9"
        />

        {/* Sun marker on the floor */}
        <g transform={`translate(${60 + dx * 0.5} ${250 + dy * 0.5})`}>
          <circle r="13" fill="var(--accent--canvas--badge)" opacity="0.9" />
          <path
            d="M-6 0 H6 M0 -6 V6"
            stroke="var(--accent--canvas--badge-text)"
            strokeWidth="1.4"
          />
        </g>
      </g>

      {/* Readout strip */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--content--muted)">
        <text x="20" y="384">
          SUN {String(Math.round(sunAngle)).padStart(3, "0")}° ·{" "}
          {String(Math.floor(hours)).padStart(2, "0")}:
          {String(Math.round((hours % 1) * 60)).padStart(2, "0")}
        </text>
        <text x="620" y="384" textAnchor="end">
          {camera.toUpperCase()}
        </text>
      </g>

      <rect
        x="0"
        y="0"
        width="640"
        height="400"
        fill="url(#demo-sky)"
        pointerEvents="none"
      />
    </svg>
  );
}
