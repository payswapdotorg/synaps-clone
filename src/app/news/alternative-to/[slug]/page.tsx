import type { Metadata } from "next";
import { AlternativePage } from "@/components/marketing/pages";
import { alternatives, getAlternative } from "@/lib/site-content";

export function generateStaticParams() {
  return alternatives.map((alternative) => ({ slug: alternative.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const alternative = getAlternative(slug);
  return { title: alternative ? `Alternative to ${alternative.name}` : "Comparison" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AlternativePage slug={slug} />;
}
