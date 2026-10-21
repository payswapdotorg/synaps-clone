/**
 * Shared marketing page primitives, following the layout patterns
 * extracted from the synaps.app harvest:
 *   · PageHero — the universal inner-page hero: two-line eyebrow
 *     ("Architectural practice / without the compromise.", middle words
 *     dimmed), solid h1 left, context lead right.
 *   · FaqList — hairline accordion with +/− affordance.
 *   · ArrowCards — white tiles with a trailing arrow (hubs, "continue").
 *   · CtaBand — the repeated dark-paper CTA before the footer.
 *   · CompareTable — plan/tool comparison tables.
 */
import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */

export function PageHero({
  title,
  lead,
  eyebrow = true,
  meta,
  back,
  children,
}: {
  title: string;
  lead?: string;
  /** Universal two-line eyebrow; pass false for the pages the harvest
   *  shows without it (changelog hub/entries, careers). */
  eyebrow?: boolean;
  /** Meta line under the h1 (dates, coverage, role meta). */
  meta?: ReactNode;
  /** Optional back-link above the h1 (changelog entries). */
  back?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <div className="ms-container">
      <div className="ms-page-hero">
        <div>
          {eyebrow ? (
            <p className="ms-eyebrow">
              Architectural practice
              <br />
              <span className="light">without the</span> compromise.
            </p>
          ) : null}
          {back ? (
            <p className="ms-back-link">
              <Link href={back.href}>
                <span aria-hidden="true">←</span> {back.label}
              </Link>
            </p>
          ) : null}
          <h1 className="ms-h1">{title}</h1>
          {meta ? <p className="ms-hero-meta">{meta}</p> : null}
        </div>
        <div className="ms-stack-16">
          {lead ? <p className="ms-lead">{lead}</p> : null}
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  dim,
  lead,
}: {
  eyebrow?: string;
  title: string;
  dim?: string;
  lead?: string;
}) {
  return (
    <div className="ms-stack-16" style={{ maxWidth: "44ch" }}>
      {eyebrow ? <span className="ms-label">{eyebrow}</span> : null}
      <h2 className="ms-h2">
        {title}
        {dim ? (
          <>
            {" "}
            <span className="dim">{dim}</span>
          </>
        ) : null}
      </h2>
      {lead ? <p className="ms-body">{lead}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/* FaqList moved to its own client module (single-open + scroll-anchor
   behavior); re-exported here so existing imports keep working. */
export { FaqList } from "./FaqList";

/* ------------------------------------------------------------------ */

export function ArrowCards({
  items,
}: {
  items: { label: string; href: string; note?: string }[];
}) {
  return (
    <div className="ms-grid-2">
      {items.map((item) => (
        <Link key={item.href + item.label} href={item.href} className="ms-arrow-card">
          <span style={{ fontWeight: 480, fontSize: 18 }}>{item.label}</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function CtaBand({
  title = "Architectural practice",
  dim = "without the compromise.",
}: {
  title?: string;
  dim?: string;
}) {
  return (
    <section className="ms-section" style={{ paddingBottom: "clamp(40px, 6vw, 88px)" }}>
      <div className="ms-container">
        <div className="ms-gridlines" style={{ borderRadius: 14, border: "1px solid var(--ms-hairline)" }}>
          <div className="ms-stack-24 px-6 py-14 text-center md:px-16 md:py-20">
            <h2 className="ms-h2">
              {title} <span className="dim">{dim}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/register" className="ms-btn">
                Start designing free
              </Link>
              <Link href="/faq" className="ms-btn ms-btn--outline">
                Book a call
              </Link>
            </div>
            <p style={{ fontSize: 13, color: "var(--ms-muted)" }}>
              Trusted by 80,000 architects worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function CompareTable({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div
      style={{
        border: "1px solid var(--ms-border)",
        borderRadius: 10,
        background: "var(--ms-bg-raise)",
        overflowX: "auto",
      }}
    >
      <table className="ms-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function PageShell({ children }: { children: ReactNode }) {
  /* The closing CTA band moved to the marketing layout (SiteTail) so
     every page shares the video-stage + CTA tail the real site ships. */
  return <main id="content">{children}</main>;
}
