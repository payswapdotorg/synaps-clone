import type { Metadata } from "next";
import Link from "next/link";
import { ArrowCards, PageHero, SectionHead } from "@/components/site/blocks";
import { changelogEntries } from "@/content/changelog";
import { pageMeta } from "@/lib/seo";

/**
 * Release-notes hub — entries grouped by month, per the harvest.
 */

export const metadata: Metadata = pageMeta({
  title: "Release notes",
  description: "Weekly product changes, grouped by month.",
  path: "/news/changelog",
});

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function monthLabel(date: string) {
  const [y, m] = date.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export default function ChangelogHubPage() {
  const entries = [...changelogEntries].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  const groups: { label: string; entries: typeof entries }[] = [];
  for (const entry of entries) {
    const label = monthLabel(entry.date);
    const group = groups.find((g) => g.label === label);
    if (group) group.entries.push(entry);
    else groups.push({ label, entries: [entry] });
  }

  return (
    <main id="content">
      <PageHero
        eyebrow={false}
        title="Release notes"
        lead="Weekly product updates, with the context behind each improvement and fix."
      />
      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 96px)" }}
      >
        <div className="ms-stack-40">
          {groups.map((group) => (
            <div key={group.label} className="ms-stack-24">
              <h2 className="ms-h2">{group.label}</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {group.entries.map((entry) => (
                  <li
                    key={entry.date}
                    style={{ borderTop: "1px solid var(--ms-hairline)" }}
                  >
                    <Link
                      href={`/news/changelog/${entry.date}`}
                      className="ms-arrow-card"
                      style={{
                        background: "transparent",
                        border: 0,
                        borderRadius: 0,
                        padding: "18px 2px",
                      }}
                    >
                      <span>
                        <span style={{ fontWeight: 550, fontSize: 17 }}>
                          {entry.title}
                        </span>
                        <span
                          style={{
                            display: "block",
                            marginTop: 4,
                            fontSize: 13,
                            color: "var(--ms-muted)",
                          }}
                        >
                          {entry.date} · {entry.items.length} changes
                        </span>
                      </span>
                      <span className="arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* "Release history" — transcribed from live .ds-section--changelog
       * (27 Oct): semantic-version block with a pill + date head, a "New"
       * tag group, and a 5-item list. */}
      <section
        className="ms-container"
        style={{ paddingBlock: "clamp(112px, 8.75vw, 126px)" }}
      >
        <div className="ms-stack-24">
          <SectionHead
            title="Release"
            dim="history."
            lead="Semantic versions for the studio app. Breaking API changes are called out explicitly."
          />
          <article className="ms-release">
            <header className="ms-release-head">
              <span className="ms-release-pill">v1.5</span>
              <time className="ms-release-date">June 2026</time>
            </header>
            <div>
              <span className="ms-release-tag">New</span>
              <ul className="ms-release-list">
                <li>
                  Initial public release of Synaps, the collaborative drafting
                  environment for architects.
                </li>
                <li>
                  Real-time multiplayer editing, draw plans, sections, and
                  details together in the browser.
                </li>
                <li>
                  Architectural tools for walls, doors, windows, stairs, and
                  columns with minimal parametric input.
                </li>
                <li>
                  Sheet sets with a live index, automatic numbering, and PDF
                  export tuned for issued documentation.
                </li>
                <li>
                  Office libraries for shared components, with DWG and IFC
                  round-trip to existing CAD and BIM tools.
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Crosslinks, transcribed from live changelog hub
       * .ds-section--crosslinks (27 Oct): Blog / Documentation /
       * Synaps Studio (mapped to the clone's app entry per the standing
       * beta.synaps.app disclosure). */}
      <section
        className="ms-container"
        style={{ paddingBlock: "clamp(112px, 8.75vw, 126px)" }}
      >
        <div className="ms-stack-24">
          <SectionHead title="Continue" dim="reading." />
          <ArrowCards
            items={[
              {
                label: "Blog",
                href: "/news/blog",
                note: "Longer reads on product decisions",
              },
              {
                label: "Documentation",
                href: "https://docs.synaps.app",
                note: "API and product reference",
              },
              {
                label: "Synaps Studio",
                href: "/login",
                note: "Try the latest build",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
