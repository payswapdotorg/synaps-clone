import Link from "next/link";
import { alternatives, finalCta } from "@/lib/landing";
import { ArrowIcon } from "@/components/icons";

/**
 * The closing call to action plus the "Alternative to" comparison strip.
 *
 * "Architectural practice without the compromise." is the final headline of
 * the captured page; the comparison targets are the ones listed in the
 * captured "Alternative to" menu and footer "By type" column.
 */
export function FinalCta() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <div className="rounded-surface border border-border-solid/10 bg-surface-base p-8 sm:p-14">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-content-primary sm:text-5xl">
            {finalCta.headline}
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={finalCta.primaryCta.href}
              className="touch-text rounded-pill bg-accent-solid px-6 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
            >
              {finalCta.primaryCta.label}
            </Link>
            <a
              href={finalCta.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              {finalCta.secondaryCta.label}
            </a>
          </div>

          <p className="mt-6 text-2xs text-content-muted">{finalCta.trust}</p>
        </div>
      </section>

      <section
        className="border-t border-border-solid/10 bg-background"
        aria-label="Alternative to"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <p className="eyebrow-index">Alternative to</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {alternatives.map((alt) => (
              <li key={alt.label}>
                <Link
                  href={alt.href}
                  className="ds-chip-edge touch-text px-4 text-sm text-content-secondary transition-colors hover:bg-control-button-default hover:text-content-primary"
                >
                  {alt.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/register"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent-text hover:underline"
          >
            Start designing free
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
