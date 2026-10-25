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

/**
 * Long-form date display transcribed from the live site ("23 October 2026"
 * inside <time datetime="2026-10-23">); the clone previously displayed
 * raw ISO strings.
 */
export function formatDisplayDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00.000Z`));
}

/* ------------------------------------------------------------------ */
/* Live-title truncation rule                                          */
/* ------------------------------------------------------------------ */

/**
 * The analysed site truncates the FINAL title string (post title +
 * " | Synaps") at the last word boundary within 69 characters and
 * appends "…"; og:title truncates identically. Fitted against all 14
 * truncated and all non-truncated live titles (max non-truncated = 69).
 * Applied against the live-suffix string so the cut points are identical;
 * non-truncated titles flow through the normal "%s | Synaps Clone"
 * template (identity-adjusted suffix).
 */
export function truncatedLiveTitle(postTitle: string): string | null {
  const full = `${postTitle} | Synaps`;
  if (full.length <= 69) return null;
  const cut = full.slice(0, 69);
  const sp = cut.lastIndexOf(" ");
  return `${sp === -1 ? cut : cut.slice(0, sp)}…`;
}

/* ------------------------------------------------------------------ */
/* Per-page Metadata helper                                            */
/* ------------------------------------------------------------------ */

/**
 * Normalizes a route path to the live site's trailing-slash URL shape
 * ("/pricing" → "/pricing/", "/" stays "/"). Single choke point for
 * canonical + og:url emission under trailingSlash: true.
 */
function slashPath(path: string): string {
  // Fragment-aware: "/company#careers" → "/company/#careers".
  const [route, fragment] = path.split("#");
  const slashed =
    route === "/" || route === ""
      ? "/"
      : `/${route.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
  return fragment ? `${slashed}#${fragment}` : slashed;
}

export function pageMeta(opts: {
  title: string;
  /** Set when the title is a full standalone string (the analysed site
   *  uses "X, Synaps" comma titles and standalone titles on some pages)
   *  so the root "%s | Synaps Clone" template must not be applied. */
  absolute?: boolean;
  description?: string;
  path: string;
  type?: "website" | "article";
  /** Per-post cover image (mirrors the live per-post CMS og:image). */
  image?: string;
}): Metadata {
  const url = slashPath(opts.path);
  return {
    title: opts.absolute ? { absolute: opts.title } : opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    alternates: { canonical: url },
    openGraph: {
      url,
      type: opts.type ?? "website",
      ...(opts.image ? { images: [opts.image] } : {}),
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
  ["Pricing", "/pricing/"],
  ["Solutions", "/solutions/"],
  ["Company", "/company/"],
  ["Blog", "/news/blog/"],
  ["Release notes", "/news/changelog/"],
  ["Alternatives", "/news/alternative-to/"],
  ["Partners", "/resources/partners/"],
  ["FAQ", "/faq/"],
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
      item: `${SITE_URL}${slashPath(it.path)}`,
    })),
  };
}

/**
 * The rich Organization variant the analysed site mounts on /company/
 * (distinct from the home page's thin variant): legalName, foundingDate,
 * PostalAddress, email and a two-entry sameAs. Harvested facts kept
 * verbatim; `name` is the clone's own identity per the doctrine.
 */
export const companyOrganizationLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "synaps GmbH",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Synaps is architectural design software for architects and property developers. Create precise floor plans, explore designs with AI, and turn the same drawing into presentation-ready visuals.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vienna",
    addressCountry: "AT",
  },
  email: "office@synaps.app",
  sameAs: [
    "https://www.linkedin.com/company/synapsapp",
    "https://www.instagram.com/synaps.app/",
  ],
};

export const aboutPageLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/company/#webpage`,
  url: `${SITE_URL}/company/`,
  name: "About Synaps Clone",
  about: { "@id": `${SITE_URL}/#organization` },
};

/** All live role pages carry datePosted 2026-07-06 (careers launch). */
const CAREERS_DATE_POSTED = "2026-07-06";

export function jobPostingLd(role: {
  title: string;
  lead: string;
  type: string;
}): JsonLdObject {
  // Live employmentType: PART_TIME for the working-student role,
  // FULL_TIME for the rest — matches the type strings displayed both sides.
  const employmentType = role.type === "Working student" ? "PART_TIME" : "FULL_TIME";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.lead,
    hiringOrganization: { "@type": "Organization", name: SITE_NAME },
    jobLocationType: "TELECOMMUTE",
    employmentType,
    datePosted: CAREERS_DATE_POSTED,
  };
}

export function blogPostingLd(post: {
  slug: string;
  title: string;
  dek: string;
  date: string;
  category: string;
  image: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.dek,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: post.date,
    articleSection: post.category,
    image: `${SITE_URL}${post.image}`,
    mainEntityOfPage: `${SITE_URL}/news/blog/${post.slug}/`,
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
    mainEntityOfPage: `${SITE_URL}/news/changelog/${entry.date}/`,
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
