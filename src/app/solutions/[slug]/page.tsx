import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/pages";
import { getSolution, solutions } from "@/lib/site-content";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return { title: solution?.title ?? "Solution" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SolutionPage slug={slug} />;
}
