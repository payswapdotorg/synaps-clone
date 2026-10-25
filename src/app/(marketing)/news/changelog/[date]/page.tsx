import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { PageShell } from "@/components/site/blocks";
import { ChangelogEntryView } from "@/components/site/templates";
import { changelogEntries } from "@/content/changelog";
import { changelogArticleLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return changelogEntries.map((e) => ({ date: e.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const entry = changelogEntries.find((e) => e.date === date);
  return pageMeta({
    title: entry?.title ?? "Release notes",
    description: entry?.summary,
    path: `/news/changelog/${date}`,
    type: "article",
  });
}

export default async function ChangelogEntryPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const entry = changelogEntries.find((e) => e.date === date);
  if (!entry) notFound();

  return (
    <PageShell>
      {/* Live changelog entries carry exactly one JSON-LD block
       * (Article). */}
      <JsonLd data={changelogArticleLd(entry)} />
      {/* Live changelog entries end after the entry — no "more" section. */}
      <ChangelogEntryView data={entry} />
    </PageShell>
  );
}
