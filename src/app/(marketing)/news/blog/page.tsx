import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/blocks";
import { blogPosts } from "@/content/blog";
import { pageMeta } from "@/lib/seo";

/**
 * Blog hub — featured image band + the article list, per the harvest.
 */

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Guides and references on floor plans, CAD practice and AI in architecture.",
  path: "/news/blog",
});

/**
 * Featured-post image — an original AI-generated black-and-white
 * studio photograph (public/images/blog/studio-table.png) standing in
 * for the analysed hub's hero photograph; no served asset is copied.
 */
function BlogHeroArt() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/blog/studio-table.png"
      alt="Printed floor plan drawings and drafting tools on a studio worktable"
      width={1344}
      height={768}
      style={{ display: "block", width: "100%", height: "auto" }}
      decoding="async"
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
              <BlogHeroArt />
              <div style={{ padding: "22px 26px 26px" }}>
                <div
                  className="flex items-baseline justify-between gap-4"
                  style={{ marginBottom: 10 }}
                >
                  <span className="ms-label">Studio workflows</span>
                  <span style={{ fontSize: 12.5, color: "var(--ms-muted)" }}>
                    {featured.date} · {featured.minutes} min read
                  </span>
                </div>
                <h2 className="ms-h3">{featured.title}</h2>
                <p className="ms-body" style={{ margin: "10px 0 0" }}>
                  {featured.dek}
                </p>
              </div>
            </Link>
          ) : null}

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rest.map((post) => (
              <li key={post.slug} style={{ borderTop: "1px solid var(--ms-hairline)" }}>
                <Link
                  href={`/news/blog/${post.slug}`}
                  className="ms-arrow-card"
                  style={{
                    background: "transparent",
                    border: 0,
                    borderRadius: 0,
                    padding: "20px 2px",
                  }}
                >
                  <span>
                    <span style={{ fontWeight: 550, fontSize: 17.5 }}>
                      {post.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: 5,
                        fontSize: 13.5,
                        color: "var(--ms-muted)",
                      }}
                    >
                      {post.date} · {post.minutes} min read
                    </span>
                  </span>
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
