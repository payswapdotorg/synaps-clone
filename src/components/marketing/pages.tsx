import Link from "next/link";
import {
  CardGrid,
  ChipRow,
  Notice,
  PageHeader,
  PrimaryLink,
  Section,
  SectionTitle,
  SecondaryLink,
} from "./ui";
import {
  getAlternative,
  getSolution,
  type ContentBlock,
  type ContentPageData,
} from "@/lib/site-content";

/* -------------------------------------------------------------------------- */
/* Solution detail page                                                        */
/* -------------------------------------------------------------------------- */

export function SolutionPage({ slug }: { slug: string }) {
  const solution = getSolution(slug);
  if (!solution) {
    return (
      <main id="main">
        <PageHeader eyebrow="Solutions" title="Solution not found" />
      </main>
    );
  }

  return (
    <main id="main">
      <PageHeader
        eyebrow={solution.eyebrow}
        title={solution.title}
        lead={solution.lead}
        actions={
          <>
            <PrimaryLink href="/register">Start designing free</PrimaryLink>
            <SecondaryLink href="/demo">Try the demo flow</SecondaryLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle>What it does</SectionTitle>
            <div className="mt-5 space-y-3">
              {solution.points.map((point) => (
                <div
                  key={point.title}
                  className="rounded-container border border-border-solid/10 bg-surface-base p-5"
                >
                  <h3 className="text-sm font-semibold text-content-primary">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <ChipRow
                items={
                  solution.mode === "draft"
                    ? ["Drafting mode", "Editable geometry", "Connected elements"]
                    : ["Polishing mode", "Live lighting", "Camera framing"]
                }
              />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-container border border-border-solid/10 bg-surface-base p-5">
              <p className="eyebrow-index mb-3">Mode</p>
              <p className="text-lg font-semibold text-content-primary">
                {solution.mode === "draft" ? "Drafting" : "Polishing"}
              </p>
              <p className="mt-2 text-sm text-content-secondary">
                One canvas, two modes. The analysis recorded the product as a single
                environment that carries a drawing from linework through to a
                finished scene.
              </p>
            </div>
            <Notice>
              Reconstructed page. The path and the headline come from the captured
              site’s IA and copy inventory; the supporting paragraphs were written for
              this clone.
            </Notice>
          </aside>
        </div>
      </Section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* "Alternative to …" page                                                     */
/* -------------------------------------------------------------------------- */

export function AlternativePage({ slug }: { slug: string }) {
  const alternative = getAlternative(slug);
  if (!alternative) {
    return (
      <main id="main">
        <PageHeader eyebrow="Alternative to" title="Comparison not found" />
      </main>
    );
  }

  return (
    <main id="main">
      <PageHeader
        eyebrow="Alternative to"
        title={`Alternative to ${alternative.name}`}
        lead="Architectural drafting without the legacy CAD overhead."
        actions={
          <>
            <PrimaryLink href="/register">Start designing free</PrimaryLink>
            <SecondaryLink href="/demo">Try the demo flow</SecondaryLink>
          </>
        }
      />

      <Section>
        <div className="max-w-3xl space-y-4">
          <Notice>
            Reconstructed page. The original comparison page existed at the captured
            path but its rows were never retrieved. Nothing below is a claim about{" "}
            {alternative.name}: the table shows the clone’s own feature areas with the
            comparison column intentionally left empty.
          </Notice>

          <div className="overflow-x-auto rounded-container border border-border-solid/10 bg-surface-base">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border-solid/10">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-content-muted">
                    Area
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-content-muted">
                    Synaps Clone
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-content-muted">
                    {alternative.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Accurate floor plans.",
                  "Windows, doors, stairs, editable and connected.",
                  "Shadows. Cast and edit live. Sun position, time of day.",
                  "Walk the space. Camera framing built in.",
                  "Configurable elements",
                ].map((row) => (
                  <tr key={row} className="border-b border-border-solid/5 last:border-0">
                    <td className="px-4 py-3 text-content-secondary">{row}</td>
                    <td className="px-4 py-3 text-content-primary">—</td>
                    <td className="px-4 py-3 text-content-muted">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <PrimaryLink href="/register">Start designing free</PrimaryLink>
            <SecondaryLink href="/pricing">Pricing</SecondaryLink>
          </div>
        </div>
      </Section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Generic content page — pricing, company, legal, faq, blog, partners, hub     */
/* -------------------------------------------------------------------------- */

function renderBlock(block: ContentBlock, key: string) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p key={key} className="max-w-3xl text-sm leading-relaxed text-content-secondary">
          {block.text}
        </p>
      );
    case "cards":
      return (
        <div key={key}>
          <SectionTitle>{block.title}</SectionTitle>
          <div className="mt-4">
            <CardGrid items={block.items} />
          </div>
        </div>
      );
    case "list":
      return (
        <div key={key}>
          <SectionTitle>{block.title}</SectionTitle>
          <ul className="mt-4 max-w-3xl space-y-2">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-control border border-border-solid/10 bg-surface-base px-4 py-3 text-sm text-content-secondary"
              >
                <span aria-hidden="true" className="text-accent-text">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "table":
      return (
        <div key={key}>
          <SectionTitle>{block.title}</SectionTitle>
          <div className="mt-4 overflow-x-auto rounded-container border border-border-solid/10 bg-surface-base">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border-solid/10">
                  {block.head.map((cell) => (
                    <th
                      key={cell}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-content-muted"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border-solid/5 last:border-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? "px-4 py-3 font-medium text-content-primary"
                            : "px-4 py-3 text-content-secondary"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "faq":
      return (
        <div key={key}>
          <SectionTitle>{block.title}</SectionTitle>
          <div className="mt-4 max-w-3xl space-y-2">
            {block.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-container border border-border-solid/10 bg-surface-base px-4 py-3"
              >
                <summary className="cursor-pointer list-none text-sm font-medium text-content-primary marker:hidden">
                  <span className="text-accent-text">+</span> {item.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      );
    case "links":
      return (
        <div key={block.title}>
          <SectionTitle>{block.title}</SectionTitle>
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {block.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="touch-target flex items-center justify-between rounded-container border border-border-solid/10 bg-surface-base px-4 py-3 text-sm text-content-primary transition-colors hover:bg-control-button-default"
              >
                {item.label}
                <span aria-hidden="true" className="text-content-muted">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      );
    case "notice":
      return <Notice key={key}>{block.text}</Notice>;
  }
}

export function ContentPage({ content }: { content: ContentPageData }) {
  return (
    <main id="main">
      <PageHeader
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        actions={
          <>
            <PrimaryLink href="/register">Start designing free</PrimaryLink>
            <SecondaryLink href="/demo">Try the demo flow</SecondaryLink>
          </>
        }
      />
      <Section>
        <div className="space-y-8">{content.blocks.map((b, i) => renderBlock(b, String(i)))}</div>
      </Section>
    </main>
  );
}
