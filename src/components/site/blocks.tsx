/**
 * Shared marketing page primitives, following the layout patterns
 * extracted from the synaps.app harvest:
 *   · PageHero — two columns (headline left with a dimmed tail line,
 *     context/lead right), used on every inner page.
 *   · FaqList — hairline accordion with +/− affordance.
 *   · ArrowCards — white rows with a trailing arrow (hubs, "continue").
 *   · CtaBand — the repeated dark-paper CTA before the footer.
 *   · CompareTable — plan/tool comparison tables.
 */
import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  dim,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Words rendered in the lighter grey tail of the headline. */
  dim?: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="ms-container">
      <div className="ms-page-hero">
        <div className="ms-stack-16">
          {eyebrow ? <span className="ms-label">{eyebrow}</span> : null}
          <h1 className="ms-h1">
            {title}
            {dim ? (
              <>
                {" "}
                <span className="dim">{dim}</span>
              </>
            ) : null}
          </h1>
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

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="ms-accordion">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            <span>{item.q}</span>
            <span className="tick" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="answer">
            <p style={{ margin: 0 }}>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

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
          <span>
            <span style={{ fontWeight: 550, fontSize: 17 }}>{item.label}</span>
            {item.note ? (
              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 13.5,
                  color: "var(--ms-muted)",
                }}
              >
                {item.note}
              </span>
            ) : null}
          </span>
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
  return (
    <main id="content">
      {children}
      <CtaBand />
    </main>
  );
}
