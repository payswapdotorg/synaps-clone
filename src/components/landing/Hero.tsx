import Link from "next/link";
import { hero } from "@/lib/landing";

/**
 * Hero — the first block of the captured marketing page.
 *
 * Structure mirrors the capture: an intro column (audience label + three-line
 * headline) and an aside (sub-copy, the two CTAs, the trust line). The third
 * headline line is dimmed, matching the `.light` span in the capture.
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border-solid/10"
      aria-labelledby="hero-title"
    >
      {/* Drafting-paper backdrop: the canvas dot grid from the token set. */}
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-end lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow-index">{hero.audience}</p>

          <h1
            id="hero-title"
            className="mt-5 text-4xl font-semibold leading-[1.06] tracking-tight text-content-primary sm:text-5xl lg:text-6xl"
          >
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className={i === hero.headline.length - 1 ? "block text-content-muted" : "block"}
              >
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="lg:pb-2">
          <p className="max-w-xl text-base leading-relaxed text-content-secondary">
            {hero.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="touch-text rounded-pill bg-accent-solid px-6 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
            >
              {hero.primaryCta.label}
            </Link>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <p className="mt-6 text-2xs text-content-muted">{hero.trust}</p>
        </div>
      </div>
    </section>
  );
}
