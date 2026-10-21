import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/site/blocks";
import { blogPosts } from "@/content/blog";

/**
 * Blog hub — featured image band + the article list, per the harvest.
 */

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and references on floor plans, CAD practice and AI in architecture.",
};

/**
 * Featured-post illustration — an original high-contrast drafting-table
 * drawing in the spirit of the analysed hub's hero photograph.
 */
function BlogHeroArt() {
  return (
    <div style={{ position: "relative", height: 300, background: "#15171a" }} aria-hidden>
      <svg
        viewBox="0 0 900 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* table surface perspective lines */}
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
          <path d="M0 300L330 130H900" fill="none" />
          <path d="M0 300L420 118H900" fill="none" opacity="0.6" />
          <path d="M60 300L360 200H860" fill="none" opacity="0.5" />
        </g>
        {/* rolled drawing */}
        <g>
          <rect x="120" y="96" width="250" height="12" rx="6" fill="#e8e6e1" transform="rotate(-4 120 96)" />
          <path d="M370 92l24 8-23 9z" fill="#e8e6e1" transform="rotate(-4 370 92)" />
        </g>
        {/* the plan on the table */}
        <g transform="translate(330 150) rotate(-2)" stroke="#f2f0ec" fill="none" strokeWidth="2.2">
          <path d="M0 0h180v120H0z" />
          <path d="M80 0v60M0 60h80M120 60v60" />
          <path d="M80 30a30 30 0 0 1 30 30" strokeWidth="1.4" opacity="0.8" />
          <rect x="16" y="16" width="42" height="24" rx="3" strokeWidth="1.4" opacity="0.8" />
        </g>
        {/* triangle + pencil */}
        <g transform="translate(580 176) rotate(8)">
          <path d="M0 70L64 0l0 70z" fill="none" stroke="#f2f0ec" strokeWidth="2" />
        </g>
        <g transform="translate(700 150) rotate(24)">
          <rect width="74" height="8" rx="2" fill="#f2f0ec" />
          <path d="M74 0l16 4-16 4z" fill="#ff6a00" />
        </g>
        {/* lamp glow */}
        <radialGradient id="blog-glow" cx="0.62" cy="0.3" r="0.55">
          <stop offset="0" stopColor="rgba(255,236,200,0.20)" />
          <stop offset="1" stopColor="rgba(255,236,200,0)" />
        </radialGradient>
        <rect width="900" height="300" fill="url(#blog-glow)" />
      </svg>
      <span
        className="ms-label"
        style={{
          position: "absolute",
          left: 20,
          bottom: 16,
          background: "var(--ms-bg-raise)",
          padding: "6px 12px",
          borderRadius: 999,
        }}
      >
        Latest
      </span>
    </div>
  );
}

export default function BlogHubPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main id="content">
      <div className="ms-container">
        <div className="ms-page-hero">
          <div className="ms-stack-16">
            <span
              style={{
                fontSize: 13,
                fontWeight: 520,
                color: "var(--ms-ink-soft)",
              }}
            >
              Architectural practice without the compromise.
            </span>
            <h1 className="ms-h1">Blog</h1>
          </div>
          <div className="ms-stack-16">
            <p className="ms-lead">
              Product notes, studio workflows, and essays on architectural
              tooling, written for people who issue real drawings. (Original
              articles in the clone; the analysed site's list is mirrored
              here.)
            </p>
          </div>
        </div>
      </div>

      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 96px)" }}
      >
        <div className="ms-stack-32">
          {featured ? (
            <Link
              href={`/news/blog/${featured.slug}`}
              className="ms-card ms-card--hover block no-underline"
              style={{ borderRadius: 12, overflow: "hidden", color: "inherit" }}
            >
              <BlogHeroArt />
              <div style={{ padding: "24px 26px" }}>
                <span
                  className="ms-label"
                  style={{ color: "var(--ms-draft)" }}
                >
                  Studio workflows
                </span>
                <h2 className="ms-h3" style={{ marginTop: 10 }}>
                  {featured.title}
                </h2>
                <p className="ms-body" style={{ margin: "10px 0 0" }}>
                  {featured.dek}
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "var(--ms-muted)",
                    marginTop: 12,
                  }}
                >
                  {featured.date} · {featured.minutes} min read ·{" "}
                  <span style={{ color: "var(--ms-ink)", fontWeight: 520 }}>
                    Read article →
                  </span>
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

      <CtaBand />
    </main>
  );
}
