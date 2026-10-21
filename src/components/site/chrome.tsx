/**
 * Marketing chrome — header, logo mark, footer.
 *
 * Design language and information architecture transcribed from the
 * synaps.app main-domain harvest (docs/SITE-PARITY-PLAN.md): logo +
 * Solutions · Documentation ↗ · Blog · Alternative to · Pricing on the
 * left/center, Login on the right; dark footer with the CTA block and
 * Product / Company / Legal link columns.
 *
 * The logo mark is an original angular "drafting spark" glyph in the
 * spirit of the analysed wordmark; no served asset is copied.
 */
import Link from "next/link";
import { HeaderCta } from "./HeaderCta";

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function SiteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 22"
      width="19"
      height="21"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      {/* Original drafting-spark glyph: a thin, single-stroke S-curve
          with an open terminal — same spirit as the analysed mark. */}
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
      className="flex items-center gap-2.5 no-underline"
      style={{ color: dark ? "#fff" : "var(--ms-ink)" }}
      aria-label="Synaps home"
    >
      <SiteMark />
      <span
        style={{
          fontSize: 17,
          fontWeight: 560,
          letterSpacing: "-0.02em",
        }}
      >
        Synaps
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

const NAV: {
  label: string;
  href: string;
  ext?: boolean;
  children?: { label: string; href: string }[];
}[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Architecture Studio", href: "/solutions/architecture-studio" },
      { label: "Interior Designers", href: "/solutions/interior-designers" },
      { label: "Freelancers & Homeowners", href: "/solutions/freelancers-and-homeowners" },
      { label: "Real Estate Professionals", href: "/solutions/real-estate-professionals" },
      { label: "Students & Educators", href: "/solutions/students-and-educators" },
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
      { label: "Space visualization", href: "/solutions/space-visualization" },
      { label: "Client collaboration", href: "/solutions/client-collaboration" },
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

export function SiteHeader() {
  return (
    <header className="ms-header">
      <div className="ms-container ms-header-inner">
        <SiteLogo />
        <nav aria-label="Primary" className="ms-nav-links">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.href} className="ms-nav-group">
                <Link href={item.href}>{item.label}</Link>
                <div className="ms-nav-panel">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
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
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="no-underline text-[14px]"
            style={{ color: "var(--ms-ink-soft)" }}
          >
            Login
          </Link>
          <HeaderCta />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

const FOOTER_LINKS: {
  section: string;
  items: { label: string; href: string }[];
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
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    section: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
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
              <Link href="/faq" className="ms-btn ms-btn--ghost-light">
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
                {group.items.map((item, i) => (
                  <Link key={item.href} href={item.href} className="ms-footer-row">
                    {i === 0 ? (
                      <span style={{ color: "#fff" }}>{item.label}</span>
                    ) : (
                      item.label
                    )}
                  </Link>
                ))}
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
