import type { Metadata } from "next";
import Link from "next/link";
import { ArrowCards, PageHero, SectionHead } from "@/components/site/blocks";
import { changelogEntries } from "@/content/changelog";
import { formatDisplayDate, pageMeta } from "@/lib/seo";

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

/* Hub body copy, transcribed verbatim from the live release-notes list
 * (28 Oct harvest). Entry pages keep the clone's own summaries. */
const LIVE_HUB_BODIES: Record<string, string> = {
  "2026-10-07":
    "Synaps now features a faster graphics engine for smoother and more responsive drawing, especially with large files. Drawings load reliably, even on strict networks, and brief connection drops no longer interrupt your work. This update also adds easier asset browsing with the mouse wheel, meters as the default unit, improved hex color entry, and leaner DXF imports.",
  "2026-09-30":
    "Snap to the visible drawing grid, jump to the location of a comment, and see what is using a model's memory. This update also includes several important fixes for copying, pasting, numeric fields, and Safari trackpad zoom.",
  "2026-09-23":
    "Wall layer controls are now simpler to access with both mouse and keyboard, and account creation is smoother even if optional services encounter issues.",
  "2026-09-16":
    "Room fills now stay neatly within wall outlines, and Safari performs better when zoomed out with comments and collaborator cursors visible.",
  "2026-09-09":
    "Large drawings receive clearer warnings, and undo does less work for individual edits. We also fixed stale block contents and selection of image-based papers.",
  "2026-09-02":
    "Opening drawings with many reusable assets is now more efficient, and revisiting a team invitation provides clearer feedback.",
  "2026-08-26":
    "This update makes wall adjustments and SVG imports more reliable. Rotating layered walls is now smoother, resizing wall groups keeps wall thickness correct, and imported SVGs better preserve overlapping colored details.",
  "2026-08-19":
    "This week's update makes small adjustments even easier. You'll notice smoother control over hatch scale, color codes that save reliably, more consistent arrowhead sizing, and clearer messages when editing isn't available.",
  "2026-08-12":
    "Now you can combine selected papers into a single PDF, use a visible drawing grid for easier alignment, and keep objects moving straight along horizontal or vertical axes. This week's update also makes plan resizing and SVG artwork placement more intuitive.",
  "2026-08-05":
    "Enjoy greater flexibility with measurement precision, duplicate objects as you drag, and export selected images directly. Papers now keep their names consistent when reordered, and dimension labels remain correctly positioned during editing.",
  "2026-07-29":
    "See measurements update as you drag, find library assets faster, and select papers more easily. This week's updates also make subtraction cutouts more reliable and ensure filled objects stay neatly within their papers.",
  "2026-07-22":
    "Place copied objects exactly where you want them, keep your page orientation when resizing, and enjoy more dependable group locking. This update also brings smoother uploads for shared projects and a new text justification option.",
  "2026-07-15":
    "Invite colleagues by email, respond to invitations in Synaps, and keep drawing details visible as you work. This update also includes fixes for hatch backgrounds and ensures content stays visible after moving object groups.",
  "2026-07-08":
    "We've made it easier to start drawing. Floorplan tracing now waits for your confirmation before it begins, PDF imports are more reliable (especially on Safari), and switching teams will land you on the correct dashboard.",
};

/* Live "Covers ..." range (28 Oct): from the previous entry's date (or
 * the 1 July series start for the oldest) through the day before this
 * entry, long-form. */
function coversFor(date: string, all: { date: string }[]): string {
  const sorted = [...all].map((e) => e.date).sort();
  const idx = sorted.indexOf(date);
  const startIso = idx > 0 ? sorted[idx - 1] : "2026-07-01";
  const end = new Date(date + "T00:00:00Z");
  end.setUTCDate(end.getUTCDate() - 1);
  const endIso = end.toISOString().slice(0, 10);
  return `${formatDisplayDate(startIso)} through ${formatDisplayDate(endIso)}`;
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
        stacked
        title="Release notes"
        lead="Weekly product updates, with the context behind each improvement and fix."
      />
      {/* Entries section, transcribed from live .ds-section-inner--article
       * (28 Oct re-harvest): a FLAT list of .ds-changelog-release
       * articles — month label h2 (51.84/400, mb 12) and entry articles
       * (meta 13px/22.1 #686D74 mb 18 with a two-line date + covers
       * range; h3 17px/600 linked with underline, mb 12; body 15px/22.5
       * ink). Every row after the first of its group carries pt
       * clamp(32px,4svh,48px); no hairlines. Section pads pt
       * clamp(32px,5svh,60px) / pb clamp(40px,5svh,56px). */}
      <section
        className="ms-container"
        style={{
          paddingTop: "clamp(32px, 5svh, 60px)",
          paddingBottom: "clamp(40px, 5svh, 56px)",
        }}
      >
        <div className="ms-chg-list">
          {groups.map((group, gi) => (
            <div key={group.label}>
              <article style={gi === 0 ? undefined : { paddingTop: "clamp(32px, 4svh, 48px)" }}>
                <h2 className="ms-h2" style={{ marginBottom: 12 }}>
                  {group.label}
                </h2>
              </article>
              {group.entries.map((entry, ei) => (
                <article
                  key={entry.date}
                  style={{
                    marginBottom: 24,
                    ...(ei === 0 ? undefined : { paddingTop: "clamp(32px, 4svh, 48px)" }),
                  }}
                >
                  <p className="ms-chg-meta">
                    <time dateTime={entry.date}>{formatDisplayDate(entry.date)}</time>
                    <br />
                    Covers {coversFor(entry.date, changelogEntries)}
                  </p>
                  <h3 className="ms-chg-title">
                    <Link href={`/news/changelog/${entry.date}`}>{entry.title}</Link>
                  </h3>
                  <p className="ms-chg-body">{LIVE_HUB_BODIES[entry.date] ?? entry.summary}</p>
                  <p className="ms-chg-read">
                    <Link href={`/news/changelog/${entry.date}`}>
                      Read this week&rsquo;s update
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* "Release history" — transcribed from live .ds-section--changelog
       * (27 Oct): semantic-version block with a pill + date head, a "New"
       * tag group, and a 5-item list. */}
      {/* "Release history" — transcribed from live
       * .ds-section-inner--wide (28 Oct): pt clamp(32px,5svh,60px) /
       * pb var (clamp(80px,14svh,160px)). */}
      <section
        className="ms-container"
        style={{
          paddingTop: "clamp(32px, 5svh, 60px)",
          paddingBottom: "clamp(80px, 14svh, 160px)",
        }}
      >
        <div className="ms-stack-24">
          <SectionHead
            title="Release"
            dim="history"
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
      {/* Crosslinks — live changelog crosslinks inner (28 Oct):
       * pt clamp(32px,5svh,60px) / pb var. */}
      <section
        className="ms-container"
        style={{
          paddingTop: "clamp(32px, 5svh, 60px)",
          paddingBottom: "clamp(80px, 14svh, 160px)",
        }}
      >
        <div className="ms-stack-24">
          <SectionHead title="Continue" dim="reading" />
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
