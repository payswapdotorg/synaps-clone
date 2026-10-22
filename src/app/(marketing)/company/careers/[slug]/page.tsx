import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { PageShell } from "@/components/site/blocks";
import { CareerView } from "@/components/site/templates";
import { careers } from "@/content/company";
import { breadcrumbLd, jobPostingLd, pageMeta } from "@/lib/seo";

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
  return pageMeta({
    title: role ? `${role.title}, Careers` : "Careers",
    description: role?.lead,
    path: `/company/careers/${slug}`,
  });
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
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Company", path: "/company" },
            { name: "Careers", path: "/company#careers" },
            { name: data.title, path: `/company/careers/${slug}` },
          ]),
          jobPostingLd(data),
        ]}
      />
      <CareerView data={data} otherRoles={otherRoles} />
    </PageShell>
  );
}
