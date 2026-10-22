import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { PageShell } from "@/components/site/blocks";
import { BlogPostView } from "@/components/site/templates";
import { blogPosts } from "@/content/blog";
import { blogPostingLd, organizationLd, pageMeta } from "@/lib/seo";

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
  return pageMeta({
    title: post?.title ?? "Blog",
    description: post?.dek,
    path: `/news/blog/${slug}`,
    type: "article",
    ...(post ? { publishedTime: post.date } : {}),
  });
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
      <JsonLd data={[organizationLd, blogPostingLd(post)]} />
      <BlogPostView data={post} more={more} />
    </PageShell>
  );
}
