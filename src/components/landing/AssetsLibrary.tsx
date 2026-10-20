import { assetsLibrary } from "@/lib/landing";

/**
 * The native-assets library block.
 *
 * The captured section ran on the dark theme (`data-theme="dark"`), so this
 * clone re-declares the dark token scope locally on the panel and draws the
 * material swatches with original SVG.
 */
export function AssetsLibrary() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20"
      aria-labelledby="assets-title"
    >
      <div
        data-theme="dark"
        className="overflow-hidden rounded-surface border border-border-solid/10 bg-background p-6 sm:p-10"
      >
        <h2
          id="assets-title"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl"
        >
          {assetsLibrary.headline[0]}{" "}
          <span className="text-content-muted">{assetsLibrary.headline[1]}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-content-secondary">
          {assetsLibrary.sub}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((swatch) => (
            <div
              key={swatch.name}
              className="rounded-component border border-border-solid/10 bg-surface-base p-3"
            >
              <div
                className="h-20 w-full rounded-element"
                style={{ background: swatch.fill }}
                aria-hidden="true"
              />
              <p className="ds-accent-mono mt-2 text-2xs">{swatch.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Original CSS-gradient material swatches — hatches, wood grain, stone and
 * metal reads, built without any image asset.
 */
const swatches = [
  { name: "HATCH", fill: "repeating-linear-gradient(45deg, #6ba5f5 0 2px, transparent 2px 8px)" },
  { name: "WOOD", fill: "repeating-linear-gradient(90deg, #c7560a 0 3px, #974108 3px 6px)" },
  { name: "STONE", fill: "radial-gradient(circle at 30% 30%, #a1a3a5, #505254)" },
  { name: "METAL", fill: "linear-gradient(135deg, #f3f5f7 0%, #717375 45%, #f3f5f7 70%, #717375 100%)" },
  { name: "GLASS", fill: "linear-gradient(135deg, #6ba5f5aa, #1573e533)" },
  { name: "FELT", fill: "radial-gradient(circle at 70% 25%, #fb7185aa, #4c0519)" },
];
