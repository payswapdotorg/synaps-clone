import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/blocks";
import { ChangelogEntryView } from "@/components/site/templates";
import { changelogEntries } from "@/content/changelog";

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
  return { title: entry?.title ?? "Release notes", description: entry?.summary };
}

export default async function ChangelogEntryPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const entry = changelogEntries.find((e) => e.date === date);
  if (!entry) notFound();

  const sorted = [...changelogEntries].sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex((e) => e.date === date);
  const more = sorted
    .slice(idx + 1, idx + 3)
    .map((e) => ({
      title: e.title,
      href: `/news/changelog/${e.date}`,
      date: e.date,
    }));

  return (
    <PageShell>
      <ChangelogEntryView data={entry} more={more} />
    </PageShell>
  );
}
