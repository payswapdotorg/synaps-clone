import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/blocks";
import { blogPosts } from "@/content/blog";
import { formatDisplayDate, pageMeta } from "@/lib/seo";

/**
 * Blog hub — transcribed from the live ds-blog-index (26 Oct harvest):
 * a full-width featured card (21/9 hero crop, "Read article" CTA) over an
 * always-two-column card grid. Cards: inset 3/2 cover image with a wire
 * border → stacked category / date·read meta → 17px title → 3-line-clamped
 * excerpt. Covers are the clone's own AI-generated B&W editorial assets
 * (public/images/blog/covers/{slug}.png) — no served asset is copied.
 */

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Guides and references on floor plans, CAD practice and AI in architecture.",
  path: "/news/blog",
});

export default function BlogHubPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main id="content">
      <PageHero
        title="Blog"
        lead="Product notes, studio workflows, and essays on architectural tooling, written for people who issue real drawings."
      />

      <section
        className="ms-container"
        style={{ paddingBlock: "clamp(80px, 14svh, 160px)" }}
      >
        {featured ? (
          <Link
            href={`/news/blog/${featured.slug}`}
            className="ms-blog-card ms-blog-card--featured"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/blog/covers/${featured.slug}.png`}
              alt=""
              width={1344}
              height={768}
              loading="lazy"
              decoding="async"
            />
            <div>
              <span className="ms-blog-card-category">
                {featured.category}
              </span>
              <span className="ms-blog-card-meta">
                {formatDisplayDate(featured.date)} · {featured.minutes} min
                read
              </span>
              <h3 className="ms-blog-card-title">{featured.title}</h3>
              <p className="ms-blog-card-excerpt">{featured.dek}</p>
              <span className="ms-blog-card-cta">Read article</span>
            </div>
          </Link>
        ) : null}

        <div className="ms-blog-grid">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/news/blog/${post.slug}`}
              className="ms-blog-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/blog/covers/${post.slug}.png`}
                alt=""
                width={1344}
                height={768}
                loading="lazy"
                decoding="async"
              />
              <div>
                <span className="ms-blog-card-category">{post.category}</span>
                <span className="ms-blog-card-meta">
                  {formatDisplayDate(post.date)} · {post.minutes} min read
                </span>
                <h3 className="ms-blog-card-title">{post.title}</h3>
                <p className="ms-blog-card-excerpt">{post.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
