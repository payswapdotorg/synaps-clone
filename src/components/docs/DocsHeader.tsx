"use client";

/**
 * Docs header — transcribed from the docs.synaps.app (GitBook) harvest:
 * compact 64px sticky bar, hairline bottom + backdrop blur; left carries
 * the Synaps mark + "documentation"; right carries a working page-filter
 * search (the clone's stand-in for GitBook search — it filters the 20
 * local pages), social glyph links and an "Open Synaps" link into the
 * simulated product. Social glyphs are original simplified line marks.
 */
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { docsPages } from "@/content/docs";
import { SiteMark } from "@/components/site/chrome";
import { DocsNavBody } from "@/components/docs/DocsSidebar";

function SearchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

const SOCIALS: { label: string; href: string; glyph: React.ReactNode }[] = [
  {
    label: "instagram",
    href: "/docs",
    glyph: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "x",
    href: "/docs",
    glyph: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    ),
  },
  {
    label: "linkedin",
    href: "/docs",
    glyph: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5V17M8 7.6v.1M12 17v-3.6c0-1.2 1-2.2 2.2-2.2s2.3 1 2.3 2.2V17" />
      </svg>
    ),
  },
  {
    label: "youtube",
    href: "/docs",
    glyph: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
        <path d="M10.2 9.6l4.6 2.4-4.6 2.4z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function DocsHeader() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return docsPages
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.group.toLowerCase().includes(q) ||
          p.sections.some((s) => s.h2.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node))
        setOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // While the table-of-contents drawer is open: lock scrolling, close on Escape.
  useEffect(() => {
    if (!tocOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTocOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [tocOpen]);

  return (
    <header className="docs-header">
      <div className="docs-header-inner">
        <div className="docs-header-left">
          <button
            type="button"
            className="docs-toc-toggle"
            aria-label="Open table of contents"
            aria-expanded={tocOpen}
            aria-controls="docs-toc-drawer"
            onClick={() => setTocOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </button>
          <Link href="/docs" className="docs-brand" aria-label="Synaps documentation">
            <SiteMark />
            <span className="docs-brand-text">
              synaps <span className="docs-brand-dim">documentation</span>
            </span>
          </Link>
        </div>

        <div className="docs-search" ref={boxRef}>
          <button
            type="button"
            className="docs-search-trigger"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <SearchGlyph />
            <span className="docs-search-hint">Search docs…</span>
            <kbd aria-hidden="true">/</kbd>
          </button>
          {open ? (
            <div
              className="docs-search-panel"
              role="dialog"
              aria-label="Search documentation"
            >
              <input
                autoFocus
                type="search"
                placeholder="Filter pages, groups and headings…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search documentation"
              />
              {query.trim() ? (
                results.length ? (
                  <ul>
                    {results.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={p.slug ? `/docs/${p.slug}` : "/docs"}
                          onClick={() => setOpen(false)}
                        >
                          <span className="docs-search-group">{p.group}</span>
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="docs-search-empty">
                    No pages match “{query.trim()}”.
                  </p>
                )
              ) : (
                <p className="docs-search-empty">
                  Type to filter the 20 local pages — the clone’s stand-in for
                  the analysed site’s search.
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div className="docs-header-right" ref={moreRef}>
          <nav className="docs-socials" aria-label="Social profiles (simulated)">
            {SOCIALS.map((s) => (
              <Link key={s.label} href={s.href} aria-label={s.label} title={s.label}>
                {s.glyph}
              </Link>
            ))}
          </nav>

          <Link href="/login" className="docs-open-app">
            Open Synaps
          </Link>

          <div className="docs-more">
            <button
              type="button"
              className="docs-more-btn"
              aria-label="More links"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
              </svg>
            </button>
            {moreOpen ? (
              <div className="docs-more-menu" role="menu" aria-label="Social profiles (simulated)">
                {SOCIALS.map((s) => (
                  <Link key={s.label} href={s.href} role="menuitem" className="docs-more-item">
                    {s.glyph}
                    <span>{s.label}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {tocOpen ? (
        <div className="docs-drawer-root">
          <button
            type="button"
            className="docs-drawer-scrim"
            aria-label="Close table of contents"
            onClick={() => setTocOpen(false)}
          />
          <div
            id="docs-toc-drawer"
            className="docs-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Table of contents"
          >
            <div className="docs-drawer-head">
              <span className="docs-drawer-title">Synaps documentation</span>
              <button
                type="button"
                className="docs-drawer-close"
                aria-label="Close table of contents"
                onClick={() => setTocOpen(false)}
              >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>
            <DocsNavBody onNavigate={() => setTocOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
