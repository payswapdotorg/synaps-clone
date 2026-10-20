import type { ReactNode, ReactElement } from "react";

/**
 * Original line-art icon set.
 *
 * Every glyph in this file is hand-authored SVG for this clone — nothing is
 * traced, extracted or copied from the captured assets. The visual language
 * (thin strokes, 24-unit grid, geometric construction) matches the drafting
 * aesthetic recorded in the design tokens.
 */

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function Svg({
  className,
  strokeWidth = 1.4,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Floor plan: outer wall, an internal partition and a door swing. */
export function PlanIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 4.5h18v15H3z" />
      <path d="M3 13.5h6.5V4.5" />
      <path d="M9.5 13.5H14v6" />
      <path d="M14 13.5h7" />
      <path d="M6.5 13.5a2.5 2.5 0 0 1 2.5-2.5" />
      <path d="M16 7.5h3" />
    </Svg>
  );
}

/** Configurable elements: a window, a door and a stair run. */
export function ElementsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M12 4v5" />
      <path d="M12 9h3.5a2.5 2.5 0 0 1 0 5H12" />
      <path d="M3 18h4M19 12v4" />
    </Svg>
  );
}

/** Floor plan tracer: a photo frame resolving into vector lines. */
export function TracerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 15.5 8 11l4 3.5 3-2.5 6 5" />
      <circle cx="8.5" cy="9" r="1.4" />
      <path d="M12 19.5h9" strokeDasharray="2 2" />
    </Svg>
  );
}

/** Floor plan generator: a prompt caret resolving into a plan block. */
export function GeneratorIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5h16" />
      <path d="M8 9.5 11 12l-3 2.5" />
      <path d="M13 14.5h7" />
      <rect x="3" y="18" width="18" height="4" rx="1" />
    </Svg>
  );
}

/** Shadows: sun disc with cast shadow rays. */
export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </Svg>
  );
}

/** Spatial visualization: a camera framing a corner. */
export function CameraIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 7.5h5l1.5-2h5L16 7.5h5v11H3z" />
      <circle cx="12" cy="13" r="3.2" />
    </Svg>
  );
}

/** Angle control: a locked view angle. */
export function AngleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h16" />
      <path d="M4 20 15 6" />
      <path d="M4 20a11 11 0 0 0 5.5-5.5" />
      <path d="M9.5 14.5 10 9l5.5-.5-.5 5.5z" />
    </Svg>
  );
}

/** Relight & resurface: a light cone over a surface. */
export function RelightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="6" r="2.4" />
      <path d="M8 8.4 3.5 19h17z" />
      <path d="M8 12h9" />
    </Svg>
  );
}

/** Replace & restyle: swappable layers. */
export function RestyleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </Svg>
  );
}

/** CAD import: a file dropping onto a grid. */
export function CadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v11" />
      <path d="m8 10 4 4 4-4" />
      <path d="M3.5 17.5h17" />
      <path d="M3.5 21h17" strokeDasharray="2 2" />
    </Svg>
  );
}

/** AI mark for the Vecy-1 tab. */
export function SparkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.9 9 19.5 11 13.9 13 12 18.5 10.1 13 4.5 11 10.1 9z" />
      <path d="M18.5 4v3M20 5.5h-3" />
    </Svg>
  );
}

/** Arrow used on the final call to action. */
export function ArrowIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

/** Icon registry — keyed by the `icon` strings in src/lib/landing.ts. */
export const icons: Record<string, (props: IconProps) => ReactElement> = {
  plan: PlanIcon,
  elements: ElementsIcon,
  tracer: TracerIcon,
  generator: GeneratorIcon,
  sun: SunIcon,
  camera: CameraIcon,
  angle: AngleIcon,
  relight: RelightIcon,
  restyle: RestyleIcon,
  cad: CadIcon,
  spark: SparkIcon,
};
