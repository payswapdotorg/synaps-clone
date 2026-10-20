import type { ReactNode } from "react";
import { studioTabs } from "@/lib/landing";
import { SparkIcon } from "@/components/icons";

/**
 * The two studio tabs observed in the capture: "01 Vecy-1" and
 * "02 Made for the studio". CSS-only tab switch, no client JavaScript.
 */
export function StudioTabs() {
  const [vecy, studio] = studioTabs;

  return (
    <section
      className="border-y border-border-solid/10 bg-background"
      aria-labelledby="studio-title"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <input
          type="radio"
          name="studio-tab"
          value="vecy"
          id="studio-vecy"
          className="sr-only"
          defaultChecked
        />
        <input
          type="radio"
          name="studio-tab"
          value="studio"
          id="studio-made"
          className="sr-only"
        />

        <h2
          id="studio-title"
          className="text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl"
        >
          Made for the studio
        </h2>

        <div
          role="group"
          aria-label="Choose a studio story"
          className="mt-8 flex flex-wrap gap-2"
        >
          <label
            htmlFor="studio-vecy"
            className="touch-text cursor-pointer rounded-pill border border-border-solid/15 px-4 text-sm text-content-secondary transition-colors tab-vecy:border-accent-text tab-vecy:text-accent-text"
          >
            {vecy.label}
          </label>
          <label
            htmlFor="studio-made"
            className="touch-text cursor-pointer rounded-pill border border-border-solid/15 px-4 text-sm text-content-secondary transition-colors tab-studio:border-accent-text tab-studio:text-accent-text"
          >
            {studio.label}
          </label>
        </div>

        <div className="mt-8 hidden tab-vecy:block">
          <Panel
            title={vecy.title}
            body={vecy.body}
            icon={<SparkIcon className="h-6 w-6 text-accent-text" />}
          />
        </div>

        <div className="mt-8 hidden tab-studio:block">
          <Panel
            title={studio.title}
            body={studio.body}
            icon={
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-accent-text"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 20V9.5L12 4l9 5.5V20z" />
                <path d="M9 20v-6h6v6" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-surface border border-border-solid/10 bg-surface-base p-6 sm:p-10">
      <div className="flex items-center gap-4">
        {icon}
        <h3 className="text-xl font-semibold tracking-tight text-content-primary">
          {title}
        </h3>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-secondary">
        {body}
      </p>
    </div>
  );
}
