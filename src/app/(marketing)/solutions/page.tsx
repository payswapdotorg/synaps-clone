import type { Metadata } from "next";
import {
  ArrowCards,
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
        title="One drawing canvas, every architectural workflow."
        lead="Pick the path that matches the work in front of you, by practice type, by output, or by deliverable."
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
    </main>
  );
}
