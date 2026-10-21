import Link from "next/link";
import { AuthRedirect } from "@/components/auth/AuthRedirect";
import {
  AICardArt,
  AssetsMarquee,
  ConfigPanelMockup,
  GeneratorMockup,
  ImportCardArt,
  PrecisionCardArt,
} from "@/components/site/art";
import { CtaBand } from "@/components/site/blocks";

/**
 * Marketing home — rebuilt against the synaps.app main-domain harvest
 * (docs/SITE-PARITY-PLAN.md): two-column hero with a dimmed second
 * headline line and black primary CTA; the 01/03–03/03 feature cards;
 * the manifesto + testimonial bridge; Drafting / Polishing feature
 * splits with product mockups; the "Everything you need" capability
 * grid; the native assets band. Headlines and micro-copy are the
 * observed strings; artwork and mockups are original.
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

const CAPABILITIES: { group: string; accent: "draft" | "polish"; items: string[] }[] = [
  {
    group: "Drafting",
    accent: "draft",
    items: ["Accurate floor plans", "Configurable elements", "Floor plan tracer", "Floor plan generator"],
  },
  {
    group: "Polishing",
    accent: "polish",
    items: ["Shadows", "Spatial visualization", "Angle control", "Relight & resurface", "Replace & restyle"],
  },
];

export default function HomePage() {
  return (
    <main id="content">
      <AuthRedirect />

      {/* ---------------------------------------------------------- Hero */}
      <section
        className="ms-container"
        style={{ paddingTop: "clamp(28px, 3.4vw, 52px)" }}
      >
        <div
          className="ms-page-hero"
          style={{
            paddingBottom: "clamp(30px, 4vw, 56px)",
            alignItems: "center",
          }}
        >
          <div className="ms-stack-16">
            <span
              style={{
                fontSize: 13,
                fontWeight: 520,
                color: "var(--ms-ink-soft)",
              }}
            >
              For architects and developers
            </span>
            <h1 className="ms-h1" style={{ maxWidth: "13ch" }}>
              From idea to client-ready design.
              <span className="dim" style={{ display: "block" }}>
                Within minutes.
              </span>
            </h1>
          </div>
          <div className="ms-stack-16" style={{ alignSelf: "center" }}>
            <p className="ms-lead">
              Create precise floor plans, explore design options, and turn the
              same drawing into presentation-ready visuals.
            </p>
            <div className="flex flex-wrap gap-3">
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
      </section>

      {/* ------------------------------------------------- Feature cards */}
      <section className="ms-container" style={{ paddingBottom: "clamp(64px, 8vw, 110px)" }}>
        <div className="ms-grid-3">
          {CARDS.map((card) => (
            <article key={card.idx} className="ms-stack-16">
              {card.art}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="ms-h3">{card.title}</h3>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    color: "var(--ms-muted)",
                  }}
                >
                  {card.idx}
                </span>
              </div>
              <p className="ms-body">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------- Manifesto + quote */}
      <section className="ms-hatch--soft">
        <div
          className="ms-container ms-gridlines"
          style={{
            paddingBlock: "clamp(72px, 9vw, 128px)",
            borderTop: "1px solid var(--ms-hairline)",
            borderBottom: "1px solid var(--ms-hairline)",
          }}
        >
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

      {/* --------------------------------------------- Feature splits */}
      <section className="ms-container ms-section ms-stack-40">
        {/* Drafting */}
        <div className="ms-split">
          <div className="ms-split-text ms-stack-16" style={{ position: "relative" }}>
            <span
              className="ms-watermark"
              style={{ top: "-0.35em", left: "-0.06em" }}
              aria-hidden
            >
              Accurate
              <br />
              floor plans
            </span>
            <span className="ms-chip" style={{ position: "relative" }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 14L14 2M4 2h10v10" />
              </svg>
              Drafting
            </span>
            <h2 className="ms-h2" style={{ position: "relative" }}>
              Configurable <span className="dim">elements.</span>
            </h2>
            <p className="ms-body" style={{ maxWidth: "46ch", position: "relative" }}>
              Windows, doors and stairs are editable, dimension-driven objects —
              change the type, the width or the frame and every dependent opening
              updates. Styles are saved and reused across the plan.
            </p>
            <p
              style={{
                fontSize: 12.5,
                color: "var(--ms-muted)",
                position: "relative",
              }}
            >
              Windows, doors, stairs, editable and connected.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <ConfigPanelMockup />
          </div>
        </div>

        {/* Polishing */}
        <div className="ms-split ms-split--flip">
          <div className="ms-split-text ms-stack-16" style={{ position: "relative" }}>
            <span
              className="ms-watermark"
              style={{ bottom: "-0.3em", left: "-0.06em" }}
              aria-hidden
            >
              Floor plan
              <br />
              generator
            </span>
            <span className="ms-chip ms-chip--polish" style={{ position: "relative" }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 1.5c.8 5 2 6.2 7 7-5 .8-6.2 2-7 7-.8-5-2-6.2-7-7 5-.8 6.2-2 7-7Z" />
              </svg>
              Polishing
            </span>
            <h2 className="ms-h2" style={{ position: "relative" }}>
              Floor plan <span className="dim">generator.</span>
            </h2>
            <p className="ms-body" style={{ maxWidth: "46ch", position: "relative" }}>
              Describe the space in plain language and get an editable plan back —
              walls, rooms and openings as real drafting objects, ready to adjust.
              (Simulated in the clone.)
            </p>
            <p
              style={{
                fontSize: 12.5,
                color: "var(--ms-muted)",
                position: "relative",
              }}
            >
              Describe the space. Get an editable plan.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <GeneratorMockup />
          </div>
        </div>
      </section>

      {/* --------------------------------------- Everything you need */}
      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(64px, 8vw, 110px)" }}
      >
        <div className="ms-stack-32">
          <h2 className="ms-h2">
            Everything you <span className="dim">need.</span>
          </h2>
          <div className="ms-grid-2" style={{ gap: "clamp(20px, 2.4vw, 36px)" }}>
            {CAPABILITIES.map((cap) => (
              <div key={cap.group} className="ms-stack-16">
                <span
                  className="ms-label"
                  style={{
                    color: cap.accent === "draft" ? "var(--ms-draft)" : "#c7560a",
                  }}
                >
                  {cap.group}
                </span>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        borderTop: "1px solid var(--ms-hairline)",
                        padding: "13px 2px",
                        fontSize: "clamp(17px, 1.5vw, 20px)",
                        fontWeight: 520,
                        letterSpacing: "-0.012em",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      {item}
                      <span style={{ color: "var(--ms-ink-faint)" }} aria-hidden>
                        +
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Assets band */}
      <section className="ms-hatch--soft" style={{ borderTop: "1px solid var(--ms-hairline)" }}>
        <div className="ms-container ms-section ms-stack-32">
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
          <AssetsMarquee />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
