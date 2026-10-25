import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/blocks";
import { blogPosts } from "@/content/blog";
import { formatDisplayDate, pageMeta } from "@/lib/seo";

/**
 * Blog hub — featured card + image-card grid, per the harvest: the
 * analysed hub renders every post as a card (image → category ·
 * date/read → title → excerpt) with a featured variant for the newest.
 * Covers are the clone's own AI-generated B&W editorial assets
 * (public/images/blog/covers/{slug}.png) — no served asset is copied.
 */

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Guides and references on floor plans, CAD practice and AI in architecture.",
  path: "/news/blog",
});

function CoverArt({
  slug,
  alt,
  eager,
}: {
  slug: string;
  alt: string;
  eager?: boolean;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`/images/blog/covers/${slug}.png`}
      alt={alt}
      width={1344}
      height={768}
      style={{ display: "block", width: "100%", height: "auto" }}
      {...(eager ? { fetchPriority: "high" as const } : { decoding: "async" })}
    />
  );
}

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
        style={{ paddingBottom: "clamp(48px, 6vw, 96px)" }}
      >
        <div className="ms-stack-32">
          {featured ? (
            <Link
              href={`/news/blog/${featured.slug}`}
              className="ms-card ms-card--hover block no-underline"
              style={{ borderRadius: 6, overflow: "hidden", color: "inherit" }}
            >
              <CoverArt
                slug={featured.slug}
                alt={`${featured.title} — cover image`}
                eager
              />
              <div style={{ padding: "22px 26px 26px" }}>
                <div
                  className="flex items-baseline justify-between gap-4"
                  style={{ marginBottom: 10 }}
                >
                  <span className="ms-label">{featured.category}</span>
                  <span style={{ fontSize: 12.5, color: "var(--ms-muted)" }}>
                    {formatDisplayDate(featured.date)} · {featured.minutes} min
                    read
                  </span>
                </div>
                <h2 className="ms-h3">{featured.title}</h2>
                <p className="ms-body" style={{ margin: "10px 0 0" }}>
                  {featured.dek}
                </p>
              </div>
            </Link>
          ) : null}

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/news/blog/${post.slug}`}
                  className="ms-card ms-card--hover block no-underline"
                  style={{
                    borderRadius: 6,
                    overflow: "hidden",
                    color: "inherit",
                    height: "100%",
                  }}
                >
                  <CoverArt slug={post.slug} alt={`${post.title} — cover image`} />
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div
                      className="flex items-baseline justify-between gap-4"
                      style={{ marginBottom: 8 }}
                    >
                      <span className="ms-label">{post.category}</span>
                      <span style={{ fontSize: 12.5, color: "var(--ms-muted)" }}>
                        {formatDisplayDate(post.date)} · {post.minutes} min read
                      </span>
                    </div>
                    <h3 className="ms-h3" style={{ fontSize: 19 }}>
                      {post.title}
                    </h3>
                    <p
                      className="ms-body"
                      style={{
                        margin: "8px 0 0",
                        fontSize: 14,
                        color: "var(--ms-muted)",
                      }}
                    >
                      {post.dek}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
