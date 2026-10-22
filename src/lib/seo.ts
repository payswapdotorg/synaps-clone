import type { Metadata } from "next";
import type { FaqItem } from "@/content/types";

/**
 * SEO/metadata layer for the marketing surface.
 *
 * PROVENANCE: the JSON-LD shapes, per-page title patterns, robots/sitemap
 * structure and OG/Twitter card configuration mirror the analysed site's
 * machine-facing head (harvested 2026-10). Identity strings are the clone's
 * own ("Synaps Clone", this deployment URL); FAQ answers, prices and
 * descriptions come from the clone's own content modules — nothing is
 * copied from the analysed site's assets.
 */

export const SITE_URL = "https://synaps-clone.vercel.app";
export const SITE_NAME = "Synaps Clone";
export const OG_DEFAULT = "/images/og-default.png";

/** Content freshness anchor: the newest changelog entry in the corpus. */
export const CONTENT_DATE = "2026-10-07";

export type JsonLdObject = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Per-page Metadata helper                                            */
/* ------------------------------------------------------------------ */

export function pageMeta(opts: {
  title: string;
  /** Set when the title is a full standalone string (the analysed site
   *  uses "X, Synaps" comma titles and standalone titles on some pages)
   *  so the root "%s | Synaps Clone" template must not be applied. */
  absolute?: boolean;
  description?: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  return {
    title: opts.absolute ? { absolute: opts.title } : opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    alternates: { canonical: opts.path },
    openGraph: {
      url: opts.path,
      type: opts.type ?? "website",
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export const organizationLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Educational clone of the Synaps product surface, rebuilt from scratch from a reverse-engineering analysis of its public pages. Not affiliated with, endorsed by, or connected to Synaps.",
  sameAs: ["https://github.com/payswapdotorg/synaps-clone"],
};

export const websiteLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Mirrors the analysed home's software schema with the clone's own
 *  displayed monthly prices (Freemium €0 / Pro €59 / Studio €119). */
export const softwareAppLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: [
    { "@type": "Offer", name: "Freemium", price: "0", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Pro", price: "59", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Studio", price: "119", priceCurrency: "EUR" },
  ],
};

const SITE_NAV: [string, string][] = [
  ["Pricing", "/pricing"],
  ["Solutions", "/solutions"],
  ["Company", "/company"],
  ["Blog", "/news/blog"],
  ["Release notes", "/news/changelog"],
  ["Alternatives", "/news/alternative-to"],
  ["Partners", "/resources/partners"],
  ["FAQ", "/faq"],
];

export const siteNavLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#sitenav`,
  name: "Synaps Clone site navigation",
  itemListElement: SITE_NAV.map(([name, path], i) => ({
    "@type": "SiteNavigationElement",
    position: i + 1,
    name,
    url: `${SITE_URL}${path}`,
  })),
};

export function faqPageLd(items: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export const aboutPageLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/company/#webpage`,
  url: `${SITE_URL}/company`,
  name: "About Synaps Clone",
  about: { "@id": `${SITE_URL}/#organization` },
};

export function jobPostingLd(role: {
  title: string;
  lead: string;
  location: string;
  type: string;
}): JsonLdObject {
  const employmentType = role.type === "Working student" ? "PART_TIME" : "FULL_TIME";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.lead,
    hiringOrganization: { "@type": "Organization", name: SITE_NAME },
    jobLocationType: "TELECOMMUTE",
    employmentType,
    ...(role.location ? { applicantLocationRequirements: role.location } : {}),
  };
}

export function blogPostingLd(post: {
  slug: string;
  title: string;
  dek: string;
  date: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    image: `${SITE_URL}${OG_DEFAULT}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/news/blog/${post.slug}`,
  };
}

export function changelogArticleLd(entry: {
  date: string;
  title: string;
  summary: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    image: `${SITE_URL}${OG_DEFAULT}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/news/changelog/${entry.date}`,
  };
}

/** Mirrors the analysed pricing page's Product + AggregateOffer shape with
 *  the clone's own displayed monthly prices. */
export const pricingProductLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: SITE_NAME,
  description:
    "Educational clone of the Synaps drafting surface with transparent per-editor pricing.",
  brand: { "@type": "Brand", name: SITE_NAME },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "0",
    highPrice: "119",
    offerCount: "3",
    offers: [
      { "@type": "Offer", name: "Freemium", price: "0", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Pro", price: "59", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Studio", price: "119", priceCurrency: "EUR" },
    ],
  },
};
