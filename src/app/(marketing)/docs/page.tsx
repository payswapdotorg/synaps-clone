import type { Metadata } from "next";
import Link from "next/link";
import { docsPages } from "@/content/docs";

/**
 * Docs home — mirrors the analysed GitBook landing: "New to Synaps?",
 * "Learn by watching", "Choose your first result", "Find a specific
 * task", "Know what the result means".
 */

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides for every Synaps workflow.",
};

export default function DocsHomePage() {
  const first = docsPages.find((p) => p.slug === "get-started") ?? docsPages[0];

  return (
    <main id="content" className="ms-stack-40" style={{ maxWidth: 860 }}>
      <div className="ms-stack-16">
        <span className="ms-label">Documentation</span>
        <h1 className="ms-h2">Synaps documentation</h1>
        <p className="ms-lead">
          Everything the analysed docs site covers, reconstructed with
          original step-by-step text for the clone's simulated surface.
        </p>
      </div>

      <div className="ms-grid-2">
        <Link
          href={first ? `/docs/${first.slug}` : "/docs"}
          className="ms-card ms-card--hover no-underline"
          style={{ padding: "22px 24px", color: "inherit" }}
        >
          <span className="ms-label">New to Synaps?</span>
          <h2 className="ms-h3" style={{ marginTop: 10, fontSize: 19 }}>
            Get started
          </h2>
          <p className="ms-body" style={{ margin: "8px 0 0" }}>
            From an empty account to your first drawing in one sitting.
          </p>
        </Link>
        <div className="ms-card" style={{ padding: "22px 24px" }}>
          <span className="ms-label">Learn by watching</span>
          <h2 className="ms-h3" style={{ marginTop: 10, fontSize: 19 }}>
            Video tutorials
          </h2>
          <p className="ms-body" style={{ margin: "8px 0 0" }}>
            The analysed docs link walkthroughs such as AutoCAD to Synaps;
            the clone documents them as outlines.
          </p>
        </div>
      </div>

      <div className="ms-stack-16">
        <span className="ms-label">Find a specific task</span>
        <div className="ms-grid-2">
          {docsPages.map((page) => (
            <Link
              key={page.slug}
              href={`/docs/${page.slug}`}
              className="ms-arrow-card"
              style={{ padding: "16px 18px" }}
            >
              <span>
                <span style={{ fontWeight: 550, fontSize: 15.5 }}>
                  {page.title}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 12.5,
                    color: "var(--ms-muted)",
                  }}
                >
                  {page.group}
                </span>
              </span>
              <span className="arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
