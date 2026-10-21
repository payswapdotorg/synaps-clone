import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/blocks";
import { AltToolView } from "@/components/site/templates";
import { altTools } from "@/content/alternatives";

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
  return {
    title: tool ? `An alternative to ${tool.tool}` : "Alternative to",
    description: tool?.lead,
  };
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
      <AltToolView data={data} others={others} />
    </PageShell>
  );
}
