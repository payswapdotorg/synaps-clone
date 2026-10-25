import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/JsonLd";
import { PageShell } from "@/components/site/blocks";
import { BlogPostView } from "@/components/site/templates";
import { blogPosts } from "@/content/blog";
import { blogPostingLd, pageMeta, truncatedLiveTitle } from "@/lib/seo";

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
  // Live title rule: the final title (post title + " | Synaps") is cut at
  // the last word boundary within 69 chars with a trailing "…"; og:title
  // truncates identically. One post (between-autocad-and-bim) ships a
  // standalone SEO title instead (seoTitle). Non-truncated titles flow
  // through the "%s | Synaps Clone" template.
  const truncated = post?.seoTitle ? null : post ? truncatedLiveTitle(post.title) : null;
  const standalone = post?.seoTitle ?? truncated;
  return pageMeta({
    title: standalone ?? post?.title ?? "Blog",
    ...(standalone ? { absolute: true } : {}),
    description: post?.dek,
    path: `/news/blog/${slug}`,
    type: "article",
    ...(post ? { image: post.image } : {}),
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
  /* Live "More from the blog" rule (verified on the oldest post): the
   * next-3-newest, wrapping past the end back to the newest posts. */
  const more = Array.from(
    { length: Math.min(3, sorted.length - 1) },
    (_, i) => sorted[(idx + 1 + i) % sorted.length],
  ).filter((p) => p.slug !== slug);

  return (
    <PageShell>
      {/* Live post pages carry exactly one JSON-LD block (BlogPosting). */}
      <JsonLd data={blogPostingLd(post)} />
      <BlogPostView data={post} more={more} />
    </PageShell>
  );
}
