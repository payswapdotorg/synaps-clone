import Link from "next/link";
import type { Metadata } from "next";
import { AuthRedirect } from "@/components/auth/AuthRedirect";
import {
  AICardArt,
  ImportCardArt,
  PrecisionCardArt,
} from "@/components/site/art";
import { AssetsLibrary } from "@/components/site/AssetsLibrary";
import { JsonLd } from "@/components/site/JsonLd";
import { ScrollTiles } from "@/components/site/ScrollTiles";
import {
  organizationLd,
  siteNavLd,
  softwareAppLd,
  websiteLd,
} from "@/lib/seo";

/**
 * Marketing home — rebuilt against the synaps.app main-domain harvest
 * (docs/SITE-PARITY-PLAN.md): two-column hero with a dimmed second
 * headline line and black primary CTA; the 01/03–03/03 feature cards;
 * the manifesto + testimonial bridge; the 600svh Drafting → Polishing
 * capabilities scrollytelling; the scroll-bound native assets band.
 * The universal video-stage tail and closing CTA live in the marketing
 * layout. Headlines and micro-copy are the observed strings; artwork,
 * mockups and media are original.
 */

const CARDS = [
  {
    idx: "01 / 03",
    title: "Import your CAD files",
    body: "Works with the files you already have. Bring in DXF, PDF and image files.",
    art: <ImportCardArt />,
  },
  {
    idx: "02 / 03",
    title: "Draft with precision",
    body: "Documentation with the precision architects demand. Spatial logic in every detail.",
    art: <PrecisionCardArt />,
  },
  {
    idx: "03 / 03",
    title: "Design with AI",
    body: "Generate floor plans and explore different materials, furniture and lighting.",
    art: <AICardArt />,
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Synaps Clone — Architectural Practice without the compromise",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="content">
      <AuthRedirect />

      {/* Machine-facing head parity: the analysed home ships Organization,
          WebSite, SoftwareApplication and site-navigation schema blocks. */}
      <JsonLd data={[organizationLd, websiteLd, softwareAppLd, siteNavLd]} />

      {/* ---------------------------------------------------------- Hero */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div>
            <p className="home-hero-audience">
              For architects and developers
            </p>
            <h1>
              <span>From idea to</span> <span>client-ready design.</span>{" "}
              <span className="light">Within minutes.</span>
            </h1>
          </div>
          <aside className="home-hero-aside" aria-label="Get started">
            <p className="home-hero-sub">
              Create precise floor plans, explore design options, and turn the
              same drawing into presentation-ready visuals.
            </p>
            <div className="home-hero-cta">
              <Link href="/register" className="ms-btn">
                Start designing free
              </Link>
              <a
                href="https://cal.com/kevin-cobaj/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-btn ms-btn--outline"
              >
                Book a call
              </a>
            </div>
            <p className="home-hero-trust">
              Trusted by 80,000 architects worldwide.
            </p>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------- Feature cards */}
      <section className="home-features" aria-label="Product features">
        <div className="home-features-inner">
          {CARDS.map((card) => (
            <article key={card.idx} className="home-feature">
              <div className="home-feature-visual">{card.art}</div>
              <div className="home-feature-body">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="ms-h3">{card.title}</h2>
                  <span className="home-feature-index">{card.idx}</span>
                </div>
                <p className="ms-body">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------- Manifesto + quote */}
      <section className="home-quote-bridge">
        <div className="ms-container ms-container--wide ms-gridlines">
          <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <blockquote style={{ margin: 0 }}>
              <p
                style={{
                  fontSize: "clamp(19px, 1.8vw, 24px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  color: "var(--ms-ink-soft)",
                  margin: 0,
                }}
              >
                “I was amazed at the intelligent way of expressing something our
                practice was missing. Something extraordinary. It fills the gap
                between AutoCAD and BIM in a way that was lacking.”
              </p>
              <footer
                style={{
                  marginTop: 18,
                  fontSize: 13,
                  color: "var(--ms-muted)",
                }}
              >
                Atelier 4 — Architecture studio, Tirana
              </footer>
            </blockquote>
            <h2 className="ms-h2" style={{ alignSelf: "center" }}>
              Synaps is the radically simple, deeply connected tool for modern{" "}
              <span className="dim">architectural practice.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Hatch divider (live .section-divider-hatch #1: 6svh strip,
          12×12 diagonal-line mask tinted 5.5% ink, 86px side insets). */}
      <div className="section-divider-hatch" aria-hidden="true" />

      {/* --------------------------- Capabilities scrollytelling (600svh) */}
      <ScrollTiles />

      {/* Light→dark transition divider (live .section-divider-hatch #2:
          2× 6svh on the assets bg, white hatch + wire bracket marks). */}
      <div className="section-divider-hatch section-divider-hatch--dark" aria-hidden="true" />

      {/* --------------------------- Assets band (cinematic dark tail) */}
      <section className="assets-band" aria-label="Native library">
        <div className="ms-container ms-container--wide ms-stack-32">
          <div className="ms-stack-16">
            <span className="ms-label">Native library</span>
            <h2 className="ms-h2">
              Hatches, materials, blocks. <span className="dim">Native.</span>
            </h2>
            <p className="ms-body" style={{ maxWidth: "56ch" }}>
              Every fill, every block, every floorplan detail, built into the
              canvas. Drop a sofa, paint a wood grain, snap a window into place.
            </p>
          </div>
        </div>
        <AssetsLibrary />
      </section>
    </main>
  );
}
