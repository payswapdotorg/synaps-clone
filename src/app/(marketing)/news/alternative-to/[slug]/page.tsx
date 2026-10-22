import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { PageShell } from "@/components/site/blocks";
import { AltToolView } from "@/components/site/templates";
import { altTools } from "@/content/alternatives";
import { faqPageLd, pageMeta } from "@/lib/seo";

/** Page titles mirror the analysed per-tool patterns ("Synaps vs X, …")
 *  with this clone's own name substituted. */
const PAGE_TITLES: Record<string, string> = {
  revit: "Synaps Clone vs Revit, a drafting-first alternative",
  autocad: "Synaps Clone vs AutoCAD, a modern alternative to Autodesk AutoCAD",
  sketchup: "Synaps Clone vs SketchUp, for documentation-grade drawings",
  archicad: "Synaps Clone vs Archicad, a drafting-first alternative",
  vectorworks: "Synaps Clone vs Vectorworks, a drafting-first alternative",
  bricscad: "Synaps Clone vs BricsCAD, a modern alternative to BricsCAD Pro",
};

export function generateStaticParams() {
  return altTools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = altTools.find((t) => t.slug === slug);
  return pageMeta({
    title: PAGE_TITLES[slug] ?? (tool ? `An alternative to ${tool.tool}` : "Alternative to"),
    absolute: true,
    description: tool?.lead,
    path: `/news/alternative-to/${slug}`,
  });
}

export default async function AltToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = altTools.find((t) => t.slug === slug);
  if (!data) notFound();

  const others = altTools
    .filter((t) => t.slug !== slug)
    .map((t) => ({ label: t.tool, href: `/news/alternative-to/${t.slug}` }));

  return (
    <PageShell>
      <JsonLd data={faqPageLd(data.faqs)} />
      <AltToolView data={data} others={others} />
    </PageShell>
  );
}
