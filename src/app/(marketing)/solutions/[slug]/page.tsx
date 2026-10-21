import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/blocks";
import { SolutionView } from "@/components/site/templates";
import { solutions } from "@/content/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = solutions.find((s) => s.slug === slug);
  return {
    title: data ? data.title : "Solutions",
    description: data?.lead,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = solutions.find((s) => s.slug === slug);
  if (!data) notFound();
  return (
    <PageShell>
      <SolutionView data={data} />
    </PageShell>
  );
}
