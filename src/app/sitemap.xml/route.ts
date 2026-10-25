import { solutions } from "@/content/solutions";
import { blogPosts } from "@/content/blog";
import { changelogEntries } from "@/content/changelog";
import { altTools } from "@/content/alternatives";
import { careers } from "@/content/company";
import { docsPages } from "@/content/docs";
import { CONTENT_DATE, SITE_URL } from "@/lib/seo";

/**
 * sitemap.xml — emitted through a route handler (not the metadata
 * convention) because the analysed site's file shape is not expressible
 * through Next's serializer: date-only <lastmod> values (Next forces
 * full ISO timestamps), decimal-formatted <priority> ("1.0", not "1")
 * and the exact indentation. Content and semantics per
 * docs/AUDIT-2026-10-25.md (F4): priorities 1.0/0.9/0.8/0.7/0.6 by
 * route class, real per-page lastmods transcribed from the live file,
 * blog lastmod = newest post date (the live CMS's rule), changelog
 * fixed at the harvested 2026-10-08 stamp, and the /docs section as
 * the clone's own same-domain addition at a sub-news 0.5.
 *
 * Byte-shape transcribed from the live response (2-space indent,
 * LF newlines, no trailing blank line, application/xml; charset=utf-8).
 */

/** Live per-URL lastmods, transcribed 2026-10-25. */
const LASTMOD: Record<string, string> = {
  "/": "2026-09-30",
  "/company": "2026-10-08",
  "/cookies": "2026-09-14",
  "/faq": "2026-09-15",
  "/imprint": "2026-07-03",
  "/news/alternative-to": "2026-10-08",
  "/news/changelog": "2026-10-08",
  "/pricing": "2026-10-08",
  "/privacy": "2026-09-28",
  "/resources/partners": "2026-09-15",
  "/solutions": "2026-07-03",
  "/terms": "2026-09-28",
};

/** Live lastmods are uniform per section for these route classes. */
const CAREERS_LASTMOD = "2026-10-08";
const ALTERNATIVES_LASTMOD = "2026-09-29";
const SOLUTIONS_LASTMOD = "2026-09-16";
const CHANGELOG_LASTMOD = "2026-10-08";
/** The one solution page the live sitemap stamps differently. */
const SOLUTIONS_LASTMOD_OVERRIDES: Record<string, string> = {
  "client-collaboration": "2026-10-08",
};

function url(path: string, lastmod: string, priority: string): string {
  return [
    "  <url>",
    `    <loc>${SITE_URL}${path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export function GET() {
  // Blog rule: the live CMS stamps every blog URL with the newest post
  // date (all 31 = 2026-10-23 at harvest). Compute, don't hardcode.
  const newestPost = blogPosts.reduce((a, b) => (a.date > b.date ? a : b));
  const blogLastmod = newestPost.date;

  const entries: [string, string, string][] = [
    ["/", LASTMOD["/"], "1.0"],
    ["/pricing/", LASTMOD["/pricing"], "0.9"],
    ["/company/", LASTMOD["/company"], "0.8"],
    ["/solutions/", LASTMOD["/solutions"], "0.8"],
    ...solutions.map(
      (s) =>
        [
          `/solutions/${s.slug}/`,
          SOLUTIONS_LASTMOD_OVERRIDES[s.slug] ?? SOLUTIONS_LASTMOD,
          "0.8",
        ] as [string, string, string],
    ),
    ...careers.map(
      (c) => [`/company/careers/${c.slug}/`, CAREERS_LASTMOD, "0.8"] as [string, string, string],
    ),
    ["/faq/", LASTMOD["/faq"], "0.7"],
    ["/terms/", LASTMOD["/terms"], "0.7"],
    ["/privacy/", LASTMOD["/privacy"], "0.7"],
    ["/imprint/", LASTMOD["/imprint"], "0.7"],
    ["/cookies/", LASTMOD["/cookies"], "0.7"],
    ["/resources/partners/", LASTMOD["/resources/partners"], "0.7"],
    ["/news/blog/", blogLastmod, "0.6"],
    ...blogPosts.map(
      (b) => [`/news/blog/${b.slug}/`, blogLastmod, "0.6"] as [string, string, string],
    ),
    ["/news/changelog/", LASTMOD["/news/changelog"], "0.6"],
    ...changelogEntries.map(
      (e) => [`/news/changelog/${e.date}/`, CHANGELOG_LASTMOD, "0.6"] as [string, string, string],
    ),
    ["/news/alternative-to/", LASTMOD["/news/alternative-to"], "0.6"],
    ...altTools.map(
      (t) =>
        [`/news/alternative-to/${t.slug}/`, ALTERNATIVES_LASTMOD, "0.6"] as [string, string, string],
    ),
    // Docs: the clone's own same-domain addition — no live counterpart.
    ["/docs/", CONTENT_DATE, "0.5"],
    ...docsPages.map(
      (d) => [`/docs/${d.slug}/`, CONTENT_DATE, "0.5"] as [string, string, string],
    ),
  ];

  // The live file is lexicographically sorted by URL; keep the same
  // generation order (docs entries sort in as plain entries).
  entries.sort((a, b) => a[0].localeCompare(b[0]));
  const urls = entries.map(([path, lastmod, priority]) => url(path, lastmod, priority));

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
