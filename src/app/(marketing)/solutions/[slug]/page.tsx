import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { PageShell } from "@/components/site/blocks";
import { SolutionView } from "@/components/site/templates";
import { solutions } from "@/content/solutions";
import { breadcrumbLd, faqPageLd, pageMeta } from "@/lib/seo";

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
  return pageMeta({
    title: data ? data.title : "Solutions",
    description: data?.lead,
    path: `/solutions/${slug}`,
  });
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
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: data.title, path: `/solutions/${slug}` },
          ]),
          faqPageLd(data.faqs),
        ]}
      />
      <SolutionView data={data} />
    </PageShell>
  );
}
