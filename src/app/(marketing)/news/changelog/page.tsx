import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/site/blocks";
import { changelogEntries } from "@/content/changelog";

/**
 * Release-notes hub — entries grouped by month, per the harvest.
 */

export const metadata: Metadata = {
  title: "Release notes",
  description: "Weekly product changes, grouped by month.",
};

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
              <h2 className="ms-h3">{group.label}</h2>
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
    </main>
  );
}
