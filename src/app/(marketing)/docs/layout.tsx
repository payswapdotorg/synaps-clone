import Link from "next/link";
import { docsPages } from "@/content/docs";

/**
 * Docs chrome — GitBook-style: grouped sidebar + content column.
 * Sidebar groups derive from the harvested docs.synaps.app outline.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groups: { group: string; pages: typeof docsPages }[] = [];
  for (const page of docsPages) {
    const existing = groups.find((g) => g.group === page.group);
    if (existing) existing.pages.push(page);
    else groups.push({ group: page.group, pages: [page] });
  }

  return (
    <div className="ms-container" style={{ paddingBlock: "clamp(32px, 4vw, 56px)" }}>
      <div
        className="docs-grid"
        style={{
          display: "grid",
          gap: 40,
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <aside aria-label="Documentation">
          <div className="ms-stack-24 lg:sticky lg:top-24">
            <span className="ms-label">Documentation</span>
            <nav className="ms-stack-16">
              {groups.map((group) => (
                <div key={group.group} className="ms-stack-8">
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ms-muted)",
                    }}
                  >
                    {group.group}
                  </div>
                  {group.pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={page.slug ? `/docs/${page.slug}` : "/docs"}
                      className="block no-underline"
                      style={{
                        fontSize: 14,
                        color: "var(--ms-ink-soft)",
                        padding: "3px 0",
                      }}
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </aside>
        <div style={{ minWidth: 0 }}>{children}</div>
      </div>
      <style>{`
        @media (min-width: 960px) {
          .docs-grid { grid-template-columns: 240px minmax(0, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
