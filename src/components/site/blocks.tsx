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
  stacked,
  children,
}: {
  title: string;
  lead?: string;
  /** Universal two-line eyebrow; pass false for the pages the harvest
   *  shows without it (changelog hub/entries, careers). */
  eyebrow?: boolean;
  /** Stacked hero (live changelog hub, 28 Oct): no aside — the lede
   *  sits under the h1 and an empty 72px grid row follows, matching
   *  live's .hero-inner (195px inner @900 → h1 at 168). */
  stacked?: boolean;
  /** Meta line under the h1 (dates, coverage, role meta). */
  meta?: ReactNode;
  /** Optional back-link above the h1 (changelog entries). */
  back?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <div className="ms-container">
      <div className={stacked ? "ms-page-hero ms-page-hero--stacked" : "ms-page-hero"}>
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
          {stacked && lead ? (
            <p className="ms-lead" style={{ marginTop: 24 }}>
              {lead}
            </p>
          ) : null}
        </div>
        {!stacked && (lead || children) ? (
          <aside className="ms-stack-16">
            {lead ? <p className="ms-lead">{lead}</p> : null}
            {children}
          </aside>
        ) : null}
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
  tier,
}: {
  eyebrow?: string;
  title: string;
  dim?: string;
  lead?: string;
  /** Section-title tier, transcribed from live (27 Oct): "mid" =
   * 37.44px tier (embedded FAQ blocks), "compact" = 34px tier
   * (solutions grouping + company tail); default = 51.84px tier. */
  tier?: "mid" | "compact";
}) {
  const h2Cls =
    tier === "mid" ? "ms-h2-mid" : tier === "compact" ? "ms-h2-compact" : "ms-h2";
  return (
    <div className="ms-stack-16" style={{ maxWidth: "44ch" }}>
      {eyebrow ? <span className="ms-label">{eyebrow}</span> : null}
      <h2 className={h2Cls}>
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
  columns,
}: {
  items: { label: string; href: string; note?: string }[];
  /** 3 renders the live ds-crosslink-grid (3 columns, tighter gap);
   *  default keeps the two-column ms-grid-2. */
  columns?: 3;
}) {
  return (
    <div
      className={columns === 3 ? undefined : "ms-grid-2"}
      style={
        columns === 3
          ? {
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "clamp(12px, 1.4vw, 16px)",
            }
          : undefined
      }
    >
      {items.map((item) => (
        <Link key={item.href + item.label} href={item.href} className="ms-arrow-card">
          {item.note ? (
            /* Job-card anatomy (live company-job-card family): stacked
             * 17px/400 title + 14px meta line. */
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 400,
                  letterSpacing: "-0.014em",
                  lineHeight: 1.3,
                  color: "var(--ms-ink)",
                }}
              >
                {item.label}
              </span>
              <span style={{ fontSize: 14, color: "var(--ms-muted)" }}>
                {item.note}
              </span>
            </span>
          ) : (
            /* Live .solution-related-card-title (28 Oct): 17px/400,
             * -0.014em — title + arrow only, no note. */
            <span
              style={{
                fontWeight: 400,
                fontSize: 17,
                letterSpacing: "-0.014em",
                lineHeight: 1.3,
              }}
            >
              {item.label}
            </span>
          )}
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
    /* Site tail keeps its own (previously verified) rhythm, independent of
     * the transcribed subpage section pad. */
    <section
      className="ms-section"
      style={{
        paddingBlock: "clamp(44px, 6vw, 84px) clamp(40px, 6vw, 88px)",
      }}
    >
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
