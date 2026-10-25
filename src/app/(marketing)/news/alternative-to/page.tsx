import type { Metadata } from "next";
import {
  ArrowCards,
  FaqList,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { JsonLd } from "@/components/site/JsonLd";
import { altTools } from "@/content/alternatives";
import { faqPageLd, pageMeta } from "@/lib/seo";

/**
 * Alternative-to hub — per the harvest: positioning copy, comparison
 * cards to each tool, "what Synaps optimises for", pilot guidance,
 * "Before you pilot" FAQ (single-open accordion, JSON-LD FAQPage).
 */

const FAQS = [
  {
    q: "Which architectural software is Synaps an alternative to?",
    a: "The 2D drafting slice of Revit, AutoCAD, SketchUp, Archicad, Vectorworks and BricsCAD workflows — not their BIM coordination or 3D modelling depth.",
  },
  {
    q: "Can we keep our current tool and use Synaps?",
    a: "That is the recommended posture. Draft and present 2D-heavy jobs in Synaps; keep BIM projects where they are; exchange DXF.",
  },
  {
    q: "What if we are mid-project?",
    a: "Finish the project in the current tool. Start the pilot on the next small job — mid-project migrations test nothing but patience.",
  },
  {
    q: "Do you publish a feature matrix against every tool?",
    a: "No — feature matrices age badly and reward checkbox counting. Each alternative page states where Synaps wins and where the incumbent stays.",
  },
  {
    q: "Who should run the pilot?",
    a: "The person who draws most — not the partner who evaluates software. One drafter, one live job, two weeks.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "Synaps Clone as an alternative to Revit, AutoCAD, SketchUp & more",
  absolute: true,
  description:
    "An alternative to Revit, AutoCAD, and SketchUp — where Synaps fits, and where it doesn't.",
  path: "/news/alternative-to",
});

export default function AltHubPage() {
  return (
    <main id="content">
      <JsonLd data={faqPageLd(FAQS)} />
      <PageHero
        title="An alternative to Revit, AutoCAD, and SketchUp."
        lead="Drafting-first software for studios that issue real drawing sets. Not one more model to feed, not a folder of DWGs to reconcile — the issued set is the job. Side-by-side comparisons, honest tradeoffs, and a two-week pilot path."
      />

      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-stack-40">
          <div className="ms-stack-24">
            <SectionHead title="Compare Synaps to" dim="your current tool." />
            <ArrowCards
              items={altTools.map((t) => ({
                label: t.tool,
                href: `/news/alternative-to/${t.slug}`,
                note: `Synaps vs ${t.tool}`,
              }))}
            />
          </div>

          <div className="ms-stack-24">
            <SectionHead title="What Synaps" dim="optimises for." />
            <div className="ms-grid-3">
              {[
                {
                  title: "Issued 2D sets",
                  body: "Plan production with layers, pages and DXF round-tripping — the weekly bread of a small practice.",
                },
                {
                  title: "Linked views",
                  body: "Draft, visualise and present from one model; the presentation is a view of the drawing, not an export.",
                },
                {
                  title: "Library discipline",
                  body: "Hatches, materials and blocks native to the canvas, so a drawing never waits on a missing asset.",
                },
              ].map((item) => (
                <article key={item.title} className="ms-card ms-card--hover" style={{ padding: "24px 26px" }}>
                  <h3 className="ms-h3" style={{ fontSize: 19 }}>{item.title}</h3>
                  <p className="ms-body" style={{ margin: "10px 0 0" }}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="ms-stack-24">
            <SectionHead
              title="Evaluate with a live job,"
              dim="not a sandbox."
              lead="Sandbox trials flatter every tool. Run one real project — a small extension, an interior fit-out — and compare the hours."
            />
          </div>

          <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <SectionHead title="Before you" dim="pilot." tier="mid" />
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      {/* Crosslinks, transcribed from live .ds-section--crosslinks
       * (27 Oct): "Continue reading" + Pricing / Release notes / Partners. */}
      <section className="ms-container" style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}>
        <div className="ms-stack-24">
          <SectionHead title="Continue" dim="reading." />
          <ArrowCards
            items={[
              {
                label: "Pricing",
                href: "/pricing",
                note: "Studio, Enterprise & Education plans",
              },
              {
                label: "Release notes",
                href: "/news/changelog",
                note: "What shipped recently",
              },
              {
                label: "Partners",
                href: "/resources/partners",
                note: "Integrations and rollout programs",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
