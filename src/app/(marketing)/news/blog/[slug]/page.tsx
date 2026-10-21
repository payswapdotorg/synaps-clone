import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/blocks";
import { BlogPostView } from "@/components/site/templates";
import { blogPosts } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Blog", description: post?.dek };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex((p) => p.slug === slug);
  const more = sorted
    .slice(idx + 1, idx + 4)
    .map((p) => ({ title: p.title, href: `/news/blog/${p.slug}` }));

  return (
    <PageShell>
      <BlogPostView data={post} more={more} />
    </PageShell>
  );
}
