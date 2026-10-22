"use client";

/**
 * Docs sidebar — transcribed structure from the docs.synaps.app
 * (GitBook) harvest: w-72 sticky column, "Synaps documentation"
 * heading, then one collapsible row per group with an icon and a
 * disclosure chevron; the active page is highlighted. Group icons are
 * original 14×14 line drawings (the real panel carries GitBook's own
 * icon set).
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { docsPages } from "@/content/docs";

const G = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GROUP_ICONS: Record<string, React.ReactNode> = {
  "Get started": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M3 13c3-1 4-3.5 4-6.5V2l4 2v2.5L7.5 8"/><path d="M3 13 1.5 8l4-1.5"/><circle cx="10" cy="4" r="0.4" fill="currentColor"/></g></svg>
  ),
  "Video tutorials": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><rect x="1.5" y="3" width="11" height="8" rx="2"/><path d="M6 5.5l3 1.5-3 1.5z"/></g></svg>
  ),
  "Draw and edit": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M9 7.46 6 8l0.5-3 4.23-4.18a1.1 1.1 0 0 1 1.55 1.55z"/><path d="M5 3.52A5 5 0 1 0 10.48 9"/><path d="M4 6.5a2.5 2.5 0 0 0 3.5 3.5"/></g></svg>
  ),
  "AI workflows": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M7 1v3M7 10v3M1 7h3M10 7h3M3 3l2 2M9 9l2 2M11 3 9 5M5 9l-2 2"/></g></svg>
  ),
  "AI tools": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M11.5 2.5 8 6l-1.5 3.5L10 8l3.5-3.5z"/><path d="M5 12.5 2 9.5M3.5 5A3.5 3.5 0 0 1 7 1.5"/></g></svg>
  ),
  "Assets and materials": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1"/><rect x="8" y="1.5" width="4.5" height="4.5" rx="1"/><rect x="1.5" y="8" width="4.5" height="4.5" rx="1"/><path d="M8 10.25h4.5M10.25 8v4.5"/></g></svg>
  ),
  "Visualise and present": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M11.5 7S10 10 7 10 2.5 7 2.5 7 4 4 7 4s4.5 3 4.5 3z"/><circle cx="7" cy="7" r="0.6"/></g></svg>
  ),
  "Import and export": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M4 1.5v11M4 1.5 2 3.5M4 1.5 6 3.5M4 12.5 2 10.5M4 12.5l2-2"/><path d="M10 12.5v-11M10 12.5 8 10.5M10 12.5l2-2M10 1.5 8 3.5M10 1.5l2 2"/></g></svg>
  ),
  "Teams and projects": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><circle cx="5" cy="4.5" r="1.8"/><path d="M5 7.5a3.2 3.2 0 0 0-3.2 3.2h6.4A3.2 3.2 0 0 0 5 7.5z"/><circle cx="10" cy="5.5" r="1.4"/><path d="M10 8.2c1.8 0 3 1 3 2.5"/></g></svg>
  ),
  "Account, plans and credits": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><rect x="1.5" y="3" width="11" height="8" rx="1.5"/><path d="M1.5 6h11M4 9.5h3"/></g></svg>
  ),
  "Reference and troubleshooting": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...G}><path d="M7 2.2C5.8 1.4 4 1.2 1.8 1.5v9.8C4 11 5.8 11.2 7 12c1.2-.8 3-1 5.2-0.7V1.5C10 1.2 8.2 1.4 7 2.2z"/><path d="M7 2.2v9.8"/></g></svg>
  ),
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.18s ease",
        flex: "none",
      }}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/** Sidebar order transcribed from the harvested docs.synaps.app nav. */
const GROUP_ORDER = [
  "Get started",
  "Video tutorials",
  "Draw and edit",
  "AI workflows",
  "AI tools",
  "Assets and materials",
  "Visualise and present",
  "Import and export",
  "Teams and projects",
  "Account, plans and credits",
  "Reference and troubleshooting",
];

/** The nav body (title + grouped pages), shared by the desktop sidebar and the mobile drawer. */
export function DocsNavBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const current = pathname.replace(/^\/docs\/?/, "");

  const groups: { group: string; pages: typeof docsPages }[] = [];
  for (const page of docsPages) {
    const existing = groups.find((g) => g.group === page.group);
    if (existing) existing.pages.push(page);
    else groups.push({ group: page.group, pages: [page] });
  }
  groups.sort(
    (a, b) =>
      (GROUP_ORDER.indexOf(a.group) ?? 99) -
      (GROUP_ORDER.indexOf(b.group) ?? 99),
  );

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const activeGroup = groups.find((g) =>
    g.pages.some(
      (p) => (p.slug || "") === current || (current === "" && !p.slug),
    ),
  )?.group;

  // GitBook default: every group collapsed except the one holding the
  // active page (transcribed behaviour from the harvest).
  const isExpanded = (group: string, userToggled: boolean, open: boolean) =>
    userToggled ? open : group === activeGroup;

  return (
    <>
      <p className="docs-sidebar-title">
        <span className="docs-sidebar-mark" aria-hidden="true">
          <svg viewBox="0 0 14 14" width="13" height="13"><g {...G}><path d="M7 1v12M2.2 3.75l9.6 6.5M2.2 10.25l9.6-6.5"/></g></svg>
        </span>
        Synaps documentation
      </p>
      <div className="docs-sidebar-groups">
        {groups.map((g) => {
          const userToggled = g.group in collapsed;
          const open = isExpanded(g.group, userToggled, !collapsed[g.group]);
          const containsActive = g.group === activeGroup;
          return (
            <div key={g.group} className="docs-sidebar-group">
              <button
                type="button"
                className={`docs-sidebar-trigger${containsActive ? " contains-active" : ""}`}
                aria-expanded={open}
                onClick={() =>
                  setCollapsed((c) => ({ ...c, [g.group]: open }))
                }
              >
                <span className="docs-sidebar-icon" aria-hidden="true">
                  {GROUP_ICONS[g.group]}
                </span>
                <span className="docs-sidebar-label">{g.group}</span>
                <Chevron open={open} />
              </button>
              {open ? (
                <div className="docs-sidebar-items">
                  {g.pages.map((page) => {
                    const slug = page.slug || "";
                    const href = slug ? `/docs/${slug}` : "/docs";
                    const active = slug === current;
                    return (
                      <Link
                        key={slug}
                        href={href}
                        onClick={onNavigate}
                        className={`docs-sidebar-link${active ? " is-active" : ""}`}
                      >
                        {page.title}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function DocsSidebar() {
  return (
    <nav className="docs-sidebar" aria-label="Documentation">
      <DocsNavBody />
    </nav>
  );
}
