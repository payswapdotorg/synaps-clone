import type { Metadata } from "next";
import {
  ArrowCards,
  CtaBand,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { solutionsHub } from "@/content/solutions";

/**
 * Solutions hub — "By type" / "By use case" arrow-card groups, per the
 * harvested /solutions/ page.
 */

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "One drawing canvas, every architectural workflow — by type and by use case.",
};

export default function SolutionsHubPage() {
  return (
    <main id="content">
      <PageHero
        eyebrow="Solutions"
        title="One drawing canvas,"
        dim="every architectural workflow."
        lead="Start from the work you actually do this week — the surface follows."
      />
      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-stack-40">
          <div className="ms-stack-24">
            <SectionHead title="By type" />
            <ArrowCards items={solutionsHub.byType} />
          </div>
          <div className="ms-stack-24">
            <SectionHead title="By use case" />
            <ArrowCards items={solutionsHub.byUseCase} />
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
