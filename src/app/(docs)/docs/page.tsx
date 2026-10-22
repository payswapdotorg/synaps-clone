import type { Metadata } from "next";
import Link from "next/link";
import { docsPages } from "@/content/docs";
import { DocsToc } from "@/components/docs/DocsToc";
import { pageMeta } from "@/lib/seo";

/**
 * Docs home — flowing GitBook landing transcribed from the harvest:
 * h1 + intro line, then five h2 sections ("New to Synaps?", "Learn by
 * watching", "Choose your first result", "Find a specific task",
 * "Know what the result means") with inline links into the pages.
 * Connecting prose is original and condensed.
 */

export const metadata: Metadata = pageMeta({
  title: "Documentation",
  description: "Guides for every Synaps workflow.",
  path: "/docs",
});

const H2S = [
  "New to Synaps?",
  "Learn by watching",
  "Choose your first result",
  "Find a specific task",
  "Know what the result means",
];

function find(slug: string) {
  return docsPages.find((p) => p.slug === slug);
}

export default function DocsHomePage() {
  const firstProject = find("get-started/open-your-first-project");
  const firstDrawing = find("get-started/create-your-first-drawing");
  const videos = find("video-tutorials");
  const brief = find("ai-workflows/brief-to-editable-plan");
  const scan = find("ai-workflows/scan-to-editable-drawing");
  const finishes = find("ai-workflows/explore-interior-finishes");

  return (
    <>
      <main id="content" className="docs-main">
        <header className="docs-article-head">
          <h1>Synaps documentation</h1>
          <p className="docs-article-lead">
            Create editable plans, develop drawings and explore interior
            images with Synaps. Start with the result you need.
          </p>
        </header>

        <div className="docs-prose">
          <section id="new-to-synaps">
            <h2>New to Synaps?</h2>
            <p>
              Open Synaps to follow along.{" "}
              <Link href={firstProject ? `/docs/${firstProject.slug}` : "/docs"}>
                Open your first project
              </Link>
              , then{" "}
              <Link href={firstDrawing ? `/docs/${firstDrawing.slug}` : "/docs"}>
                create your first drawing
              </Link>
              . Practise a rectangle, a circle, moving and Undo before
              choosing a larger workflow.
            </p>
          </section>

          <section id="learn-by-watching">
            <h2>Learn by watching</h2>
            <p>
              Browse{" "}
              <Link href={videos ? `/docs/${videos.slug}` : "/docs"}>
                Video tutorials
              </Link>{" "}
              for walkthroughs with quick section summaries. The clone
              documents the analysed site&rsquo;s tutorials as outlines —
              start with the AutoCAD-to-Synaps transfer or choose a focused
              tracing, generation or rendering tutorial.
            </p>
          </section>

          <section id="choose-your-first-result">
            <h2>Choose your first result</h2>
            <p>
              Three AI workflows cover the three results studios ask for
              first:
            </p>
            <div className="docs-card-grid">
              <Link
                href={brief ? `/docs/${brief.slug}` : "/docs"}
                className="docs-card"
              >
                <span className="docs-card-title">Brief to editable plan</span>
                Turn a space brief into an editable starting layout.
              </Link>
              <Link
                href={scan ? `/docs/${scan.slug}` : "/docs"}
                className="docs-card"
              >
                <span className="docs-card-title">Scan to editable drawing</span>
                Trace a scan or photo of an existing plan into geometry.
              </Link>
              <Link
                href={finishes ? `/docs/${finishes.slug}` : "/docs"}
                className="docs-card"
              >
                <span className="docs-card-title">Explore interior finishes</span>
                Restyle the same plan with different materials and light.
              </Link>
            </div>
          </section>

          <section id="find-a-specific-task">
            <h2>Find a specific task</h2>
            <p>
              Every guide is one page. The sidebar groups them by workflow —
              drafting, import and export, visualisation, collaboration,
              assets, workspace and billing, and reference material for when
              something behaves unexpectedly.
            </p>
          </section>

          <section id="know-what-the-result-means">
            <h2>Know what the result means</h2>
            <p>
              Pages say what the product produces and what stays editable
              afterwards. Where the clone simulates a pipeline (generation,
              tracing, rendering) the page says so once, up front — the
              structure follows the analysed docs; the step-by-step text is
              original writing for this study clone.
            </p>
          </section>
        </div>
      </main>
      <DocsToc headings={H2S} />
    </>
  );
}
