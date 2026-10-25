import type { Metadata } from "next";
import {
  ArrowCards,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { solutionsHub } from "@/content/solutions";
import { pageMeta } from "@/lib/seo";

/**
 * Solutions hub — "By type" / "By use case" arrow-card groups, per the
 * harvested /solutions/ page.
 */

export const metadata: Metadata = pageMeta({
  title: "Solutions, Synaps Clone",
  absolute: true,
  description:
    "One drawing canvas, every architectural workflow — by type and by use case.",
  path: "/solutions",
});

export default function SolutionsHubPage() {
  return (
    <main id="content">
      <PageHero
        title="One drawing canvas, every architectural workflow."
        lead="Pick the path that matches the work in front of you, by practice type, by output, or by deliverable."
      />
      {/* Solutions hub, transcribed from live .ds-section--solutions-hub
       * (28 Oct): one var/var section; group headers carry their own
       * rhythm — "By type" pt clamp(52px,8svh,88px) pb clamp(22px,3.2svh,32px),
       * "By use case" pt clamp(28px,4svh,48px) pb clamp(22px,3.2svh,32px)
       * — with 45px bottom air after each grid. */}
      <section className="ms-container ms-section">
        <div
          style={{
            paddingTop: "clamp(52px, 8svh, 88px)",
            marginBottom: "clamp(22px, 3.2svh, 32px)",
          }}
        >
          <SectionHead title="By type" tier="compact" />
        </div>
        <div style={{ paddingBottom: 45 }}>
          <ArrowCards
            items={solutionsHub.byType.map(({ label, href }) => ({ label, href }))}
          />
        </div>
        <div
          style={{
            paddingTop: "clamp(28px, 4svh, 48px)",
            marginBottom: "clamp(22px, 3.2svh, 32px)",
          }}
        >
          <SectionHead title="By use case" tier="compact" />
        </div>
        <div style={{ paddingBottom: 45 }}>
          <ArrowCards
            items={solutionsHub.byUseCase.map(({ label, href }) => ({ label, href }))}
          />
        </div>
      </section>
    </main>
  );
}
