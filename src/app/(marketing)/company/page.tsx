import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowCards,
  FaqList,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { careers, companyBlocks } from "@/content/company";

/**
 * About page — section structure per the harvest (what Synaps does /
 * what makes it different / who uses it / how to get started / key
 * facts / FAQ / beliefs), plus the careers list.
 */

export const metadata: Metadata = {
  title: "About Synaps",
  description:
    "What Synaps does, what makes it different, who uses it and how to get started.",
};

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

export default function CompanyPage() {
  return (
    <main id="content">
      <PageHero
        title="About Synaps"
        lead="Synaps is architectural design software for architects and property developers. Create precise floor plans, explore designs with AI, and turn the same drawing into presentation-ready visuals."
      />

      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-stack-40">
          <div className="ms-stack-24">
            <SectionHead title="What Synaps" dim="does." />
            <Block items={companyBlocks.whatSynapsDoes} />
          </div>

          <div className="ms-stack-24">
            <SectionHead title="What makes Synaps" dim="different." />
            <Block items={companyBlocks.whatMakesItDifferent} />
          </div>

          <div className="ms-stack-24">
            <SectionHead title="Who uses" dim="Synaps." />
            <Block items={companyBlocks.whoUsesIt} />
          </div>

          <div className="ms-stack-24">
            <SectionHead title="How to get" dim="started." />
            <Block items={companyBlocks.howToStart} />
          </div>

          <div className="ms-stack-24">
            <SectionHead title="Key facts" dim="about Synaps." />
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

          <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <SectionHead title="Frequently asked" dim="questions." />
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

          <div className="ms-stack-24">
            <SectionHead title="What we" dim="believe." />
            <Block
              items={companyBlocks.beliefs.map((b) => ({
                title: b.split(" — ")[0],
                body: b.split(" — ")[1] ?? "",
              }))}
            />
          </div>

          {/* Careers */}
          <div id="careers" className="ms-stack-24">
            <SectionHead
              title="Open"
              dim="roles."
              lead="Small team, weekly ship cadence — the release notes are the culture document."
            />
            <ArrowCards
              items={careers.map((role) => ({
                label: role.title,
                href: `/company/careers/${role.slug}`,
                note: `${role.team} · ${role.location} · ${role.type}`,
              }))}
            />
          </div>

          <p style={{ fontSize: 13, color: "var(--ms-muted)" }}>
            Historical note: the analysed site once carried a careers grid
            experiment and team-page variants, since retired from public URLs.
          </p>
        </div>
      </section>
    </main>
  );
}
