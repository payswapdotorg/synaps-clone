import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared marketing primitives.
 *
 * These are built from the design-token layer in src/app/globals.css, which
 * mirrors the token system recorded in the DESIGN TOKENS section of
 * ANALYSIS.md: the accent ramps, the surface/content/border roles, the
 * radius scale and the mono readout font.
 *
 * All graphics are original CSS/SVG — nothing is scraped.
 */

/* -------------------------------------------------------------------------- */
/* Section index eyebrow — the “[01] DRAFTING / SECTION 1 / 4” pattern        */
/* -------------------------------------------------------------------------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow-index">{children}</p>;
}

/* -------------------------------------------------------------------------- */
/* Page header                                                                 */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="border-b border-border-solid/10 bg-surface-base">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-base text-content-secondary md:text-lg">
            {lead}
          </p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                     */
/* -------------------------------------------------------------------------- */

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="touch-text inline-flex items-center justify-center rounded-pill bg-accent-solid px-5 py-2.5 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="btn-secondary touch-text inline-flex items-center justify-center rounded-pill px-5 py-2.5 text-sm font-medium text-content-primary transition-colors"
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Section shell                                                               */
/* -------------------------------------------------------------------------- */

export function Section({
  children,
  tone = "base",
  id,
}: {
  children: ReactNode;
  tone?: "base" | "raised";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={
        tone === "raised"
          ? "border-b border-border-solid/10 bg-surface-base"
          : "border-b border-border-solid/10"
      }
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">{children}</div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-content-primary md:text-2xl">
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/* Card grid                                                                   */
/* -------------------------------------------------------------------------- */

export function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-1 gap-4 md:grid-cols-2"
          : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      }
    >
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-container border border-border-solid/10 bg-surface-base p-5"
        >
          <h3 className="text-sm font-semibold text-content-primary">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Notice — the honest "reconstruction" banner                                 */
/* -------------------------------------------------------------------------- */

export function Notice({
  children,
  tone = "reconstruction",
}: {
  children: ReactNode;
  tone?: "reconstruction" | "demo";
}) {
  const label = tone === "demo" ? "Demo" : "Reconstruction";
  return (
    <aside className="rounded-container border border-border-solid/15 bg-background p-4">
      <p className="eyebrow-index mb-1">{label}</p>
      <p className="text-sm leading-relaxed text-content-secondary">{children}</p>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Canvas panel — the drafting-surface treatment from the analysis             */
/* -------------------------------------------------------------------------- */

export function CanvasPanel({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <div className="overflow-hidden rounded-container border border-border-solid/10 bg-surface-base">
      <div className="canvas-grid relative min-h-[220px] p-6">{children}</div>
      {caption ? (
        <p className="ds-accent-mono border-t border-border-solid/10 px-4 py-2 text-2xs text-content-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat strip                                                                  */
/* -------------------------------------------------------------------------- */

export function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="ds-chip-edge rounded-pill px-3 py-1 text-2xs text-content-secondary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
