import type { Metadata } from "next";
import { DemoFlow } from "@/components/demo/DemoFlow";

export const metadata: Metadata = {
  title: "Interactive demo",
  description:
    "A client-side simulation of the drafting flow recorded in the analysis: source, configure, processing, draft, polish and deliver. Mock data only.",
};

const banner =
  "Demo — simulated, no real verification";

/**
 * The interactive demo page.
 *
 * The journey implemented here follows the PRODUCT FLOW section of ANALYSIS.md
 * (steps 5–8 of the inferred flow): import or generate a plan, refine it on
 * the drafting canvas, relight and resurface it in polish mode, then export
 * and share.
 *
 * Nothing on this page performs, contacts or claims any real verification.
 * There is no identity check, no document verification and no network call —
 * it is a UI simulation built from mock data.
 */
export default function DemoPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 pb-12 pt-[107px] md:pt-[113px]">
      <header className="mb-8">
        <p className="eyebrow-index mb-3">[DEMO] INTERACTIVE FLOW</p>
        <h1 className="text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl">
          Draft, polish and deliver
        </h1>
        <p className="mt-3 max-w-2xl text-content-secondary">
          A step-by-step simulation of the product journey recorded in the
          reverse-engineering analysis: choose a source, describe the space,
          watch a plan being built, refine the layers, relight the scene, then
          export.
        </p>
      </header>

      <div
        role="note"
        className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-component border border-accent-solid bg-accent-subtle px-4 py-3"
      >
        <span className="font-mono text-2xs uppercase tracking-[0.14em] text-accent-subtle-foreground">
          {banner}
        </span>
        <span className="text-caption text-content-secondary">
          Client-side mock data. No API calls, no uploads, no identity checks —
          and this clone is not affiliated with Synaps.
        </span>
      </div>

      <DemoFlow />
    </main>
  );
}
