import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowCards,
  FaqList,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { JsonLd } from "@/components/site/JsonLd";
import { careers, companyBlocks } from "@/content/company";
import {
  aboutPageLd,
  breadcrumbLd,
  companyOrganizationLd,
  pageMeta,
} from "@/lib/seo";

/**
 * About page — section structure per the harvest (what Synaps does /
 * what makes it different / who uses it / how to get started / key
 * facts / FAQ / beliefs), plus the careers list.
 */

export const metadata: Metadata = pageMeta({
  title: "About Synaps Clone",
  absolute: true,
  description:
    "What Synaps does, what makes it different, who uses it and how to get started.",
  path: "/company",
});

function Block({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="ms-grid-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="ms-card ms-card--hover"
          style={{ padding: "24px 26px" }}
        >
          <h3 className="ms-h3" style={{ fontSize: 18.5 }}>
            {item.title}
          </h3>
          <p className="ms-body" style={{ margin: "10px 0 0" }}>
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}

/* Manifesto deck, transcribed verbatim from live
 * .company-section--manifesto (28 Oct): 7 belief cards. */
const MANIFESTO = [
  {
    title: "The drawing is the argument",
    paras: [
      "Plans, sections, and details are where architecture gets decided. Synaps keeps the drawing at the centre.",
      "Less friction between spatial intent and the documents that carry it.",
    ],
  },
  {
    title: "BIM thinking without the BIM tax",
    paras: [
      "Connected geometry and sheets that stay in sync, without a heavyweight stack for every phase.",
      "BIM-like discipline in an environment that still feels like drafting.",
    ],
  },
  {
    title: "Built for the studio floor",
    paras: [
      "Fast iteration, clean handoffs, and drawings clients can read without translation.",
      "The product matches how studios move from sketch to issued set.",
    ],
  },
  {
    title: "What we refuse to build",
    paras: [
      "No demo-only features. No basic drafting locked behind an enterprise upsell.",
      "We measure progress in time returned to design, not rows in a feature matrix.",
    ],
  },
  {
    title: "Precision without ceremony",
    paras: [
      "Exports, sheets, and linked views stay accurate without a separate publishing step.",
      "Precision is default infrastructure, not a quarterly project.",
    ],
  },
  {
    title: "Shaped with studios",
    paras: [
      "We build against real practice: partner studios and teams issuing live sets.",
      "A roadmap item earns its place when it unblocks a job someone is running this week.",
    ],
  },
  {
    title: "Calm by default",
    paras: [
      "Professional tools should feel quiet. Dense is fine, noisy is not.",
      "Every screen earns its complexity against a real working day.",
    ],
  },
];

export default function CompanyPage() {
  return (
    <main id="content">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "About Synaps", path: "/company" },
          ]),
          // Live /company/ mounts the RICH Organization variant
          // (legalName, foundingDate, PostalAddress, email, 2-entry
          // sameAs) — distinct from the home page's thin one.
          companyOrganizationLd,
          aboutPageLd,
        ]}
      />
      <PageHero
        title="About Synaps"
        lead="Synaps is architectural design software for architects and property developers. Create precise floor plans, explore designs with AI, and turn the same drawing into presentation-ready visuals."
      />

      {/* Content sections, transcribed from live company ds-sections
       * (28 Oct): five var/var sections, not one stacked container. */}
      <section className="ms-container ms-section">
        <div className="ms-stack-24">
          <SectionHead title="What Synaps" dim="does" />
          <Block items={companyBlocks.whatSynapsDoes} />
        </div>
      </section>

      <section className="ms-container ms-section">
        <div className="ms-stack-24">
          <SectionHead title="What makes Synaps" dim="different" />
          <Block items={companyBlocks.whatMakesItDifferent} />
        </div>
      </section>

      <section className="ms-container ms-section">
        <div className="ms-stack-24">
          <SectionHead title="Who uses" dim="Synaps" />
          <Block items={companyBlocks.whoUsesIt} />
        </div>
      </section>

      <section className="ms-container ms-section">
        <div className="ms-stack-24">
          <SectionHead title="How to get" dim="started" />
          <Block items={companyBlocks.howToStart} />
        </div>
      </section>

      <section className="ms-container ms-section">
        <div className="ms-stack-24">
          <SectionHead title="Key facts" dim="about Synaps" />
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {companyBlocks.keyFacts.map((fact) => (
            <li
              key={fact}
              style={{
                borderTop: "1px solid var(--ms-hairline)",
                padding: "13px 2px",
                fontSize: 16.5,
                color: "var(--ms-ink-soft)",
              }}
            >
              {fact}
            </li>
          ))}
          </ul>
        </div>
      </section>

      {/* FAQ band, transcribed from live .ds-faq (28 Oct): full-bleed
       * #F8F9FB tint with the collapsed faq rhythm (8svh/6svh). */}
      <section className="ms-faq-band">
        <div className="ms-container ms-faq-block">
          <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <SectionHead title="Frequently asked" dim="questions" tier="mid" />
            <FaqList
              items={[
                {
                  q: "What is Synaps?",
                  a: "Browser-based architectural software: 2D plan drafting, AI-assisted generation and styling, and client presentation on one canvas.",
                },
                {
                  q: "Who is Synaps for?",
                  a: "Architects, interior designers, real-estate professionals, freelancers, homeowners and students — anyone whose week is plans and presentations rather than BIM coordination.",
                },
                {
                  q: "Can I work with my existing CAD files?",
                  a: "DXF imports directly; PDFs and images trace into editable geometry; DWG arrives through the conversion pipeline (Pro).",
                },
                {
                  q: "Can I try Synaps for free?",
                  a: "Freemium is permanent: 300 signup credits plus 30 a day, three models, no card.",
                },
                {
                  q: "How can I contact the team?",
                  a: "The analysed site links a cal.com booking page; the clone mirrors it as the Book a call button.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="ms-container ms-section">
        <div className="ms-stack-24">
          <SectionHead title="What we" dim="believe" tier="compact" />
          <Block
            items={companyBlocks.beliefs.map((b) => ({
              title: b.split(" — ")[0],
              body: b.split(" — ")[1] ?? "",
            }))}
          />
        </div>
      </section>

      {/* Manifesto scroller, transcribed from live
       * .company-section--manifesto (28 Oct): 7 belief cards in a
       * full-bleed horizontal snap deck. Section rhythm pt 5svh /
       * pb 6svh. */}
      <section
        id="manifesto"
        aria-label="Manifesto"
        style={{
          paddingTop: "clamp(40px, 5svh, 60px)",
          paddingBottom: "clamp(40px, 6svh, 72px)",
        }}
      >
        <div className="company-manifesto-scroller" tabIndex={0}>
          <div className="company-manifesto-track" role="list">
            {MANIFESTO.map((card, i) => (
              <article key={card.title} className="company-manifesto-card" role="listitem">
                <div className="company-manifesto-card-paper" aria-hidden="true" />
                <div className="company-manifesto-card-inner">
                  <h3 className="company-manifesto-card-title">{card.title}</h3>
                  <div className="company-manifesto-card-body">
                    {card.paras.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  <footer className="company-manifesto-card-foot">
                    <span className="company-manifesto-card-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="company-manifesto-card-stamp" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")} / 07
                    </span>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers, transcribed from live .company-section--careers (28
       * Oct): section 0/0 wrapper + inner pt var / pb 6svh. Live
       * /company/ anchors it as #company-careers (role breadcrumbs). */}
      <section id="company-careers">
        <div
          className="ms-container"
          style={{
            paddingTop: "clamp(80px, 14svh, 160px)",
            paddingBottom: "clamp(40px, 6svh, 72px)",
          }}
        >
          <div className="ms-stack-24">
            <SectionHead
              title="Open"
              dim="positions"
              tier="compact"
              lead="Open roles when we have a real seat, otherwise we still read thoughtful general applications."
            />
            <ArrowCards
              items={careers.map((role) => ({
                label: role.title,
                href: `/company/careers/${role.slug}`,
                note: `${role.team} · ${role.location} · ${role.type}`,
              }))}
            />
            <p style={{ fontSize: 13, color: "var(--ms-muted)" }}>
              Historical note: the analysed site once carried a careers grid
              experiment and team-page variants, since retired from public URLs.
            </p>
          </div>
        </div>
      </section>

      {/* "Keep up to date", transcribed from live
       * .company-section-inner--keep-up (28 Oct): wire divider, compact
       * head (pt 5svh / pb 6svh), and the job-card follow grid with
       * 18px icons — LinkedIn/Instagram external, Blog/Release notes
       * internal, live hrefs and copy. */}
      <hr className="ms-wire" />
      <section>
        <div
          className="ms-container"
          style={{
            paddingTop: "clamp(40px, 5svh, 60px)",
            paddingBottom: "clamp(40px, 6svh, 72px)",
          }}
        >
          <div className="ms-stack-24">
            <SectionHead
              title="Keep up"
              dim="to date"
              tier="compact"
              lead="Get the latest updates on what we’re building."
            />
            <div className="company-keep-up-grid" role="list">
              <a
                className="company-keep-up-card"
                role="listitem"
                href="https://www.linkedin.com/company/synapsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="company-keep-up-card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </span>
                <span>
                  <span className="company-keep-up-card-title">LinkedIn</span>
                  <span className="company-keep-up-card-meta">
                    Keep up to date with what the team is building.
                  </span>
                </span>
              </a>
              <a
                className="company-keep-up-card"
                role="listitem"
                href="https://www.instagram.com/synaps.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="company-keep-up-card-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.13.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.13c-.3.78-.5 1.65-.56 2.92C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.14.56 2.92.3.79.72 1.45 1.38 2.13.67.66 1.34 1.08 2.13 1.38.77.3 1.65.5 2.92.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.14-.26 2.92-.56.79-.3 1.45-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.77.5-1.65.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.14-.56-2.92-.3-.79-.72-1.45-1.38-2.13C21.32.93 20.65.51 19.87.21c-.78-.3-1.65-.5-2.92-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </span>
                <span>
                  <span className="company-keep-up-card-title">Instagram</span>
                  <span className="company-keep-up-card-meta">
                    Follow along with what we’re working on.
                  </span>
                </span>
              </a>
              <Link
                className="company-keep-up-card"
                role="listitem"
                href="/news/blog"
              >
                <span className="company-keep-up-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                </span>
                <span>
                  <span className="company-keep-up-card-title">Blog</span>
                  <span className="company-keep-up-card-meta">
                    Be the first to get new Synaps updates.
                  </span>
                </span>
              </Link>
              <Link
                className="company-keep-up-card"
                role="listitem"
                href="/news/changelog"
              >
                <span className="company-keep-up-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="5" x="2" y="3" rx="1" />
                    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                    <path d="M10 12h4" />
                  </svg>
                </span>
                <span>
                  <span className="company-keep-up-card-title">Release notes</span>
                  <span className="company-keep-up-card-meta">
                    Stay on top of all releases and new features.
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
          </main>
  );
}
