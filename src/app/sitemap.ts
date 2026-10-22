import type { MetadataRoute } from "next";
import { solutions } from "@/content/solutions";
import { blogPosts } from "@/content/blog";
import { changelogEntries } from "@/content/changelog";
import { altTools } from "@/content/alternatives";
import { careers } from "@/content/company";
import { docsPages } from "@/content/docs";
import { CONTENT_DATE, SITE_URL } from "@/lib/seo";

/**
 * Sitemap — mirrors the analysed site's 77-path marketing sitemap (same
 * route inventory, harvested 2026-10) and adds this clone's on-domain
 * documentation section (the analysed docs live on a subdomain that keeps
 * them out of its sitemap; here they are same-domain routes).
 *
 * lastModified uses the content's own dates: the post/entry date for
 * blog and release notes, the corpus freshness anchor otherwise.
 */

const STATIC_MARKETING: { path: string }[] = [
  { path: "/" },
  { path: "/solutions" },
  { path: "/pricing" },
  { path: "/faq" },
  { path: "/company" },
  { path: "/news/blog" },
  { path: "/news/changelog" },
  { path: "/news/alternative-to" },
  { path: "/resources/partners" },
  { path: "/terms" },
  { path: "/privacy" },
  { path: "/imprint" },
  { path: "/cookies" },
  { path: "/docs" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const anchor = new Date(`${CONTENT_DATE}T00:00:00.000Z`);

  const staticEntries: MetadataRoute.Sitemap = STATIC_MARKETING.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: anchor,
  }));

  const solutionEntries: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${SITE_URL}/solutions/${s.slug}`,
    lastModified: anchor,
  }));

  const careerEntries: MetadataRoute.Sitemap = careers.map((c) => ({
    url: `${SITE_URL}/company/careers/${c.slug}`,
    lastModified: anchor,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${SITE_URL}/news/blog/${b.slug}`,
    lastModified: new Date(`${b.date}T00:00:00.000Z`),
  }));

  const changelogEntriesMap: MetadataRoute.Sitemap = changelogEntries.map((e) => ({
    url: `${SITE_URL}/news/changelog/${e.date}`,
    lastModified: new Date(`${e.date}T00:00:00.000Z`),
  }));

  const altEntries: MetadataRoute.Sitemap = altTools.map((t) => ({
    url: `${SITE_URL}/news/alternative-to/${t.slug}`,
    lastModified: anchor,
  }));

  const docsEntries: MetadataRoute.Sitemap = docsPages.map((d) => ({
    url: `${SITE_URL}/docs/${d.slug}`,
    lastModified: anchor,
  }));

  return [
    ...staticEntries,
    ...solutionEntries,
    ...careerEntries,
    ...blogEntries,
    ...changelogEntriesMap,
    ...altEntries,
    ...docsEntries,
  ];
}
