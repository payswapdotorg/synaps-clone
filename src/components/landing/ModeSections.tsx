import { modeTracks } from "@/lib/landing";
import { icons } from "@/components/icons";

/**
 * "One canvas, two modes" — the drafting and polishing tracks.
 *
 * The captured page shipped a Drafting/Polishing toggle. This clone renders
 * the same two tracks as a CSS-only segmented control: the radio inputs hold
 * the state, and the `mode-draft` / `mode-polish` variants (defined in
 * globals.css) reveal the matching panel. No client JavaScript.
 */
export function ModeSections() {
  const [draft, polish] = modeTracks;

  return (
    <section
      className="border-y border-border-solid/10 bg-surface-base"
      aria-labelledby="modes-title"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <input
          type="radio"
          name="mode-track"
          value="draft"
          id="mode-drafting"
          className="sr-only"
          defaultChecked
        />
        <input
          type="radio"
          name="mode-track"
          value="polish"
          id="mode-polishing"
          className="sr-only"
        />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="modes-title"
              className="text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl"
            >
              One canvas, two modes
            </h2>
            <p className="mt-2 text-sm text-content-secondary">
              Drafting and polishing, in the same environment.
            </p>
          </div>

          <div
            role="group"
            aria-label="Choose a mode"
            className="inline-flex w-fit items-center gap-1 rounded-pill border border-border-solid/10 bg-background p-1"
          >
            <label
              htmlFor="mode-drafting"
              className="touch-text cursor-pointer rounded-pill px-4 text-sm text-content-secondary transition-colors mode-draft:bg-accent-solid mode-draft:text-accent-solid-foreground"
            >
              Drafting
            </label>
            <label
              htmlFor="mode-polishing"
              className="touch-text cursor-pointer rounded-pill px-4 text-sm text-content-secondary transition-colors mode-polish:bg-accent-solid mode-polish:text-accent-solid-foreground"
            >
              Polishing
            </label>
          </div>
        </div>

        <div className="mt-10 hidden mode-draft:block">
          <Track track={draft} />
        </div>

        <div className="mt-10 hidden mode-polish:block">
          <Track track={polish} />
        </div>
      </div>
    </section>
  );
}

type TrackData = {
  id: string;
  label: string;
  lead: string;
  steps: { counter: string; title: string; body: string; icon: string }[];
};

function Track({ track }: { track: TrackData }) {
  return (
    <div>
      <p className="eyebrow-index">{track.label}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-content-primary">
        {track.lead}
      </h3>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {track.steps.map((step) => {
          const Icon = icons[step.icon] ?? icons.plan;
          return (
            <li
              key={step.counter}
              className="flex flex-col rounded-component border border-border-solid/10 bg-background p-5"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-accent-text" />
                <span className="ds-accent-mono text-2xs">{step.counter}</span>
              </div>
              <h4 className="mt-4 text-sm font-medium text-content-primary">
                {step.title}
              </h4>
              <p className="mt-1.5 text-2xs leading-relaxed text-content-secondary">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
