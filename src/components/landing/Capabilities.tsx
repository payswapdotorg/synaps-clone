import { accordion, capabilityGroups, quote } from "@/lib/landing";
import { icons } from "@/components/icons";

/**
 * The "Everything you need" capability grid, followed by the
 * "Synaps is the radically simple…" quote bridge and the two-part accordion.
 *
 * The quote bridge and the accordion are separate blocks in the capture and
 * are kept separate here.
 */
export function Capabilities() {
  return (
    <>
      <section
        className="border-y border-border-solid/10 bg-background"
        aria-labelledby="capabilities-title"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <h2
            id="capabilities-title"
            className="text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl"
          >
            Everything you need
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {capabilityGroups.map((group) => (
              <div key={group.label}>
                <p className="eyebrow-index">{group.label}</p>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {group.items.map((item) => {
                    const Icon = icons[item.icon] ?? icons.plan;
                    return (
                      <li
                        key={item.title}
                        className="rounded-component border border-border-solid/10 bg-surface-base p-4"
                      >
                        <Icon className="h-5 w-5 text-accent-text" />
                        <h3 className="mt-3 text-sm font-medium text-content-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-2xs leading-relaxed text-content-secondary">
                          {item.body}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBridge />
      <Accordion />
    </>
  );
}

/** The one-sentence statement beat, with its attribution. */
export function QuoteBridge() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24"
      aria-label="Synaps in one sentence"
    >
      <figure className="max-w-3xl">
        <blockquote className="text-2xl font-medium leading-snug tracking-tight text-content-primary sm:text-3xl">
          {quote.headline}
        </blockquote>
        <figcaption className="mt-4 text-2xs text-content-muted">
          {quote.attribution}
        </figcaption>
      </figure>
    </section>
  );
}

/** "Drafting, everything you need" / "Polishing, in a single connected environment". */
function Accordion() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-20"
      aria-label="Everything you need, in detail"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {accordion.map((block) => (
          <details
            key={block.title}
            className="group rounded-container border border-border-solid/10 bg-surface-base open:shadow-sm"
          >
            <summary className="touch-height flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-content-primary">
              {block.title}
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 shrink-0 text-content-muted transition-transform group-open:rotate-45"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
            </summary>
            <ul className="border-t border-border-solid/10 px-5 py-4">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-border-solid/5 py-2.5 text-sm leading-relaxed text-content-secondary last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-accent-text"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
