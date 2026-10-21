import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/blocks";
import { CareerView } from "@/components/site/templates";
import { careers } from "@/content/company";

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = careers.find((c) => c.slug === slug);
  return { title: role?.title ?? "Careers", description: role?.lead };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = careers.find((c) => c.slug === slug);
  if (!data) notFound();

  const otherRoles = careers
    .filter((c) => c.slug !== slug)
    .map((c) => ({ label: c.title, href: `/company/careers/${c.slug}` }));

  return (
    <PageShell>
      <CareerView data={data} otherRoles={otherRoles} />
    </PageShell>
  );
}
