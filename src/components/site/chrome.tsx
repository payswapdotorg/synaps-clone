/**
 * Marketing chrome — header, logo mark, footer.
 *
 * Design language and information architecture transcribed from the
 * synaps.app main-domain harvest (docs/SITE-PARITY-PLAN.md): logo +
 * Solutions · Documentation ↗ · Blog · Alternative to · Pricing on the
 * left/center; Login visible at rest with the two CTAs sliding in on
 * scroll (HeaderActions); dark footer with the CTA block and
 * Product / Company / Legal link columns.
 *
 * The logo mark is an original S-curve glyph (mirroring the analysed
 * lockup: curvy leading mark + lowercase wordmark) — drawn for this
 * clone; no served asset or brand path is copied.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderActions } from "./HeaderActions";

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function SiteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 22"
      width="18"
      height="20"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      {/* Original S-curve glyph — a single fluid double-arc stroke with
          round caps, drawn for this clone in the spirit of the analysed
          lockup's leading mark (which is a filled ribbon S). */}
      <path
        d="M15.5 2.5C10 2.5 4.5 4 4.5 8c0 3.4 4.2 3.9 7.5 4.6 3.1.7 6.5 1.5 6.5 4.6 0 3.6-5.1 5.3-11 4.9"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5 no-underline"
      style={{ color: dark ? "#fff" : "var(--ms-ink)" }}
      aria-label="Synaps home"
    >
      <SiteMark />
      <span
        style={{
          fontSize: 16,
          fontWeight: 520,
          letterSpacing: "-0.025em",
          lineHeight: 1,
          transform: "translateY(0.5px)",
        }}
      >
        synaps
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

/* Small original line icons for the Solutions dropdown (14×14 stroke
   drawings made for this clone — the real panel carries per-item
   icons, so the structure is transcribed with original artwork). */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const SOLUTION_ICONS: Record<string, ReactNode> = {
  "Architecture Studio": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M0.5 2.5v10h8v-10a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1z"/><path d="M4.5 12.5v-2"/><path d="M3 8.5v-1M6 8.5v-1M6 5v1M3 5v1"/><path d="M8.5 12.5h5"/><path d="M12 12.5V10"/><path d="M10.5 7a1.5 1.5 0 0 1 3 0v1.5a1.5 1.5 0 0 1-3 0z"/></g></svg>
  ),
  "Interior Designers": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M7 5a5 5 0 0 0-5 5.5h10A5 5 0 0 0 7 5z"/><path d="M7 5V0.5"/><path d="M9.5 11a2.5 2.5 0 0 1-5 0"/></g></svg>
  ),
  "Freelancers & Homeowners": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M3.5 1a2.5 2.5 0 0 1-2.5 2.5"/><path d="M5 1h1"/><path d="M1 5v1"/><path d="M4 4l0.75 0.75"/><circle cx="9" cy="5.5" r="2"/><path d="M12 13h1a4 4 0 0 0-4-4"/><path d="M1 8.5 2 13h5.5l-1-4.5z"/><path d="M7.5 13H10"/></g></svg>
  ),
  "Real Estate Professionals": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M8.5 3.5h-3l-0.56-1.68a1 1 0 0 1 0.95-1.32h2.22a1 1 0 0 1 0.95 1.32z"/><path d="M8.5 3.5 10 11l-3 2.5L4 11l1.5-7.5"/></g></svg>
  ),
  "Students & Educators": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M7 1.5 13.5 4.3 7 7.1 0.5 4.3z"/><path d="M1.7 10.1V4.8"/><circle cx="1.7" cy="11.3" r="1.2"/><path d="M3.7 5.7v3.2s0.8 1.4 3.3 1.4 3.3-1.4 3.3-1.4V5.7"/></g></svg>
  ),
  "Precise drafting": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M9 7.46 6 8l0.5-3 4.23-4.18a1.1 1.1 0 0 1 1.55 1.55z"/><path d="M5 3.52A5 5 0 1 0 10.48 9"/><path d="M4 6.5a2.5 2.5 0 0 0 3.5 3.5"/></g></svg>
  ),
  "Automated floor plan tracing": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M7 1.5H2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1H7"/><path d="M9 1.5h2.5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9"/><path d="M7 0.5v13"/></g></svg>
  ),
  "Floor plan generation": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M7 0.5V2.5"/><circle cx="7" cy="4" r="1.5"/><path d="M5.5 4.5 2.5 13.5"/><path d="M8.5 4.5l3 9"/><path d="M3 9h8"/><path d="M7 8v2"/></g></svg>
  ),
  "Space visualization": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><path d="M11.5 7S10 10 7 10 2.5 7 2.5 7 4 4 7 4s4.5 3 4.5 3z"/><circle cx="7" cy="7" r="0.5"/><path d="M13 10v2a1 1 0 0 1-1 1h-2"/><path d="M10 1h2a1 1 0 0 1 1 1v2"/><path d="M1 4V2a1 1 0 0 1 1-1h2"/><path d="M4 13H2a1 1 0 0 1-1-1v-2"/></g></svg>
  ),
  "Client collaboration": (
    <svg viewBox="0 0 14 14" width="14" height="14"><g {...S}><circle cx="7" cy="4.5" r="1.5"/><path d="M7 7.5a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z"/><path d="M4.14 12.84A6.5 6.5 0 1 0 1.5 7c0 1.33 0.4 2.57 1.09 3.6"/><path d="M4.15 12.84 0.5 13.5l1.09-2.9"/></g></svg>
  ),
};

/* Monogram tiles for the Alternative-to panel (the real panel carries
   the vendors' logo marks; the clone uses original letter tiles in the
   same slot). */
function ToolMonogram({ label }: { label: string }) {
  return (
    <span className="ms-nav-mono" aria-hidden="true">
      {label.slice(0, 1)}
    </span>
  );
}

const NAV: {
  label: string;
  href: string;
  ext?: boolean;
  groups?: { label: string; items: { label: string; href: string }[] }[];
  children?: { label: string; href: string }[];
}[] = [
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        label: "By type",
        items: [
          { label: "Architecture Studio", href: "/solutions/architecture-studio" },
          { label: "Interior Designers", href: "/solutions/interior-designers" },
          { label: "Freelancers & Homeowners", href: "/solutions/freelancers-and-homeowners" },
          { label: "Real Estate Professionals", href: "/solutions/real-estate-professionals" },
          { label: "Students & Educators", href: "/solutions/students-and-educators" },
        ],
      },
      {
        label: "By use case",
        items: [
          { label: "Precise drafting", href: "/solutions/precise-drafting" },
          { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
          { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
          { label: "Space visualization", href: "/solutions/space-visualization" },
          { label: "Client collaboration", href: "/solutions/client-collaboration" },
        ],
      },
    ],
  },
  { label: "Documentation", href: "/docs", ext: true },
  { label: "Blog", href: "/news/blog" },
  {
    label: "Alternative to",
    href: "/news/alternative-to",
    children: [
      { label: "Revit", href: "/news/alternative-to/revit" },
      { label: "AutoCAD", href: "/news/alternative-to/autocad" },
      { label: "SketchUp", href: "/news/alternative-to/sketchup" },
      { label: "ArchiCAD", href: "/news/alternative-to/archicad" },
      { label: "Vectorworks", href: "/news/alternative-to/vectorworks" },
      { label: "BricsCAD", href: "/news/alternative-to/bricscad" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ms-nav-ext-icon"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="ms-header">
      <div className="ms-container ms-header-inner">
        <SiteLogo />
        <nav aria-label="Primary" className="ms-nav-links">
          {NAV.map((item) =>
            item.groups ? (
              <div key={item.href} className="ms-nav-group">
                <Link href={item.href}>{item.label}</Link>
                <div className="ms-nav-panel ms-nav-panel--groups">
                  {item.groups.map((group) => (
                    <div key={group.label} className="ms-nav-panel-group">
                      <span className="ms-nav-group-label">{group.label}</span>
                      {group.items.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <span className="ms-nav-icon-slot" aria-hidden="true">
                            {SOLUTION_ICONS[child.label]}
                          </span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : item.children ? (
              <div key={item.href} className="ms-nav-group">
                <Link href={item.href}>{item.label}</Link>
                <div className="ms-nav-panel">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <ToolMonogram label={child.label} />
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={item.ext ? "ext" : undefined}
              >
                {item.label}
                {item.ext ? <ExternalLinkIcon /> : null}
              </Link>
            ),
          )}
        </nav>
        <HeaderActions />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

const FOOTER_LINKS: {
  section: string;
  items: { label: string; href: string; id?: string }[];
}[] = [
  {
    section: "Product",
    items: [
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Alternative to", href: "/news/alternative-to" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    section: "Company",
    items: [
      { label: "About Synaps", href: "/company" },
      { label: "Blog", href: "/news/blog" },
      { label: "Release notes", href: "/news/changelog" },
      { label: "Partners", href: "/resources/partners" },
    ],
  },
  {
    section: "Legal",
    items: [
      { label: "FAQ", href: "/faq" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      {
        label: "Cookie settings",
        href: "/cookies",
        id: "consent-settings",
      },
      { label: "Imprint", href: "/imprint" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="ms-footer">
      <div className="ms-container">
        {/* CTA block */}
        <div className="grid gap-10 py-16 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:py-20">
          <div className="ms-stack-24">
            <h2 className="ms-h2" style={{ color: "#fff", maxWidth: "16ch" }}>
              Architectural practice{" "}
              <span style={{ color: "rgba(255,255,255,0.42)" }}>
                without the compromise.
              </span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="ms-btn ms-btn--light">
                Start designing free
              </Link>
              <Link href="https://cal.com/kevin-cobaj/30min" className="ms-btn ms-btn--ghost-light">
                Book a call
              </Link>
            </div>
            <p style={{ fontSize: 13, color: "var(--ms-dark-soft)" }}>
              Trusted by 80,000 architects worldwide.
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="ms-stack-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.section}>
                {group.items.map((item, i) => {
                  // "Cookie settings" is a BUTTON, not a link: it opens the
                  // consent bar's manage panel in place (CookieBanner's
                  // delegated listener). The real site uses a plain <a> +
                  // delegated preventDefault (multi-page site); in this
                  // single-origin clone the App Router soft-navigates
                  // same-origin anchors asynchronously no matter what the
                  // click handlers do, so a button is the only element
                  // that reliably reproduces the observed behavior
                  // (click → panel reopens, page does not change).
                  if (item.id === "consent-settings") {
                    return (
                      <button
                        key={`${item.href}-${item.label}`}
                        type="button"
                        id={item.id}
                        className="ms-footer-row ms-footer-row--button"
                      >
                        {item.label}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="ms-footer-row"
                      {...(item.id ? { id: item.id } : {})}
                    >
                      {i === 0 ? (
                        <span style={{ color: "#fff" }}>{item.label}</span>
                      ) : (
                        item.label
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Meta row */}
        <div className="ms-footer-meta">
          <SiteLogo dark />
          <span>
            © {new Date().getFullYear()} Synaps Clone — a study clone. Socials,
            docs and the app itself are simulated reconstructions.
          </span>
        </div>
      </div>
    </footer>
  );
}
