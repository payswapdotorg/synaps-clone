import { features } from "@/lib/landing";

/**
 * The three feature cards (01 / 03 → 03 / 03) from the capture.
 *
 * The original used photographic panels; this clone replaces them with
 * original CSS/SVG "drafting paper" scenes built from the canvas tokens
 * (dot grid, guide lines, crosshair) — no proprietary imagery.
 */
export function FeatureCards() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20"
      aria-label="Key capabilities"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((feature, i) => (
          <article
            key={feature.index}
            className="group relative flex flex-col overflow-hidden rounded-surface border border-border-solid/10 bg-surface-base transition-colors hover:border-border-solid/25"
          >
            <div className="relative h-44 w-full overflow-hidden border-b border-border-solid/10 bg-background sm:h-52">
              {i === 0 ? <CadScene /> : i === 1 ? <PrecisionScene /> : <AiScene />}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <span className="ds-accent-mono text-2xs">{feature.index}</span>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-content-primary">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                {feature.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * SVG-native dot grid (pattern + rect). Must NOT render an HTML <div> —
 * an HTML element inside <svg> gets relocated by the HTML parser during
 * hydration, causing a React #418 hydration mismatch on the homepage.
 */
function DotGrid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--accent--canvas--dot)" fillOpacity={0.22} />
        </pattern>
      </defs>
      <rect aria-hidden="true" x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </>
  );
}

function Guide({ d, className = "" }: { d: string; className?: string }) {
  return (
    <path
      d={d}
      className={className}
      stroke="var(--accent--canvas--guide)"
      strokeWidth={1}
      fill="none"
    />
  );
}

/** 01 — a CAD drawing dropping onto a measured grid. */
function CadScene() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="relative h-full w-full"
      role="img"
      aria-label="Original line drawing of a CAD file arriving over an architectural grid"
    >
      <DotGrid id="feature-cad-dots" />
      <Guide d="M0 40h320M0 160h320M40 0v200M280 0v200" />
      <g
        stroke="var(--accent--canvas--crosshair)"
        strokeWidth={1.2}
        fill="none"
        opacity={0.85}
      >
        <path d="M120 70h80v60h-80z" />
        <path d="M120 100h34M154 100v30" />
      </g>
      <g transform="translate(150 30)">
        <path
          d="M10 0h40l10 10v40H10z"
          fill="var(--surface--base)"
          stroke="var(--accent--canvas--crosshair)"
          strokeWidth={1.4}
        />
        <path d="M50 0v10h10" stroke="var(--accent--canvas--crosshair)" strokeWidth={1.4} fill="none" />
      </g>
      <g stroke="var(--accent--canvas--dot-fuchsia)" strokeWidth={1} fill="none" opacity={0.7}>
        <path d="M0 130h320" strokeDasharray="4 6" />
      </g>
      <g
        transform="translate(20 148)"
        stroke="var(--accent--canvas--crosshair)"
        strokeWidth={1.2}
        fill="none"
      >
        <path d="M0 0v22M0 0h34M8 0v6M17 0v6M26 0v6" />
      </g>
    </svg>
  );
}

/** 02 — a protractor arc over a precise plan corner. */
function PrecisionScene() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="relative h-full w-full"
      role="img"
      aria-label="Original line drawing of angle markings over a drafted plan"
    >
      <DotGrid id="feature-precision-dots" />
      <Guide d="M0 60h320M0 140h320" />
      <g
        stroke="var(--accent--canvas--crosshair)"
        strokeWidth={1.3}
        fill="none"
        opacity={0.9}
      >
        <path d="M60 60h150v80H60z" />
        <path d="M60 110h70v30M130 60v50" />
      </g>
      <g transform="translate(130 110)" fill="none" stroke="var(--accent--canvas--dot-fuchsia)" strokeWidth={1.1} opacity={0.85}>
        <path d="M0 0a60 60 0 0 1 60-60" strokeDasharray="3 4" />
        <path d="M0-14v14M14 0H0" />
        <path d="M22-18 0 0" />
      </g>
      <g stroke="var(--accent--canvas--crosshair)" strokeWidth={1.2} fill="none" opacity={0.75}>
        <path d="M210 60v80" strokeDasharray="5 5" />
        <path d="M204 60h12M204 140h12" />
      </g>
    </svg>
  );
}

/** 03 — a generated plan with AI vector marks. */
function AiScene() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="relative h-full w-full"
      role="img"
      aria-label="Original line drawing of a generated floor plan with AI markers"
    >
      <DotGrid id="feature-ai-dots" />
      <g
        stroke="var(--accent--canvas--crosshair)"
        strokeWidth={1.3}
        fill="none"
        opacity={0.9}
      >
        <path d="M90 50h140v100H90z" />
        <path d="M90 100h50V50M140 100h40v50M180 100h50" />
      </g>
      <g
        stroke="var(--accent--canvas--dot-fuchsia)"
        strokeWidth={1.2}
        fill="none"
        opacity={0.9}
      >
        <path d="M150 20v18M141 29h18" />
        <path d="M232 70v14M225 77h14" />
      </g>
      <g stroke="var(--accent--canvas--guide)" strokeWidth={1} fill="none">
        <path d="M20 20h40M20 20v40M300 180h-40M300 180v-40" />
      </g>
    </svg>
  );
}
