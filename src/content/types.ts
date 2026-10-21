/**
 * Content model for the marketing site surface.
 *
 * PROVENANCE (docs/SITE-PARITY-PLAN.md):
 *  · Headings, page titles, plan names/prices, FAQ questions and other
 *    short factual strings are transcribed from the harvest of the
 *    analysed site so the clone's information architecture matches.
 *  · Body copy (paragraphs, answers, list items) is original condensed
 *    text conveying the same information — NOT verbatim marketing prose.
 *  · Authors of these modules must follow the header comment of each
 *    module and keep types exactly as declared here.
 */

export type FaqItem = { q: string; a: string };

export type ProseSubsection = {
  h3: string;
  paras?: string[];
  list?: string[];
};

export type ProseSection = {
  h2: string;
  paras?: string[];
  list?: string[];
  subsections?: ProseSubsection[];
};

/* ------------------------------------------------------------------ */

export type BlogPostData = {
  slug: string;
  title: string;
  dek: string;
  date: string; // YYYY-MM-DD
  minutes: number; // reading time
  sections: ProseSection[];
  faqs?: FaqItem[];
};

export type ChangelogItemData = {
  kind: "New" | "Improved" | "Fixed";
  title: string;
  body: string;
};

export type ChangelogEntryData = {
  date: string; // YYYY-MM-DD
  title: string;
  summary: string;
  items: ChangelogItemData[];
};

export type AltToolData = {
  slug: string;
  tool: string; // "Graphisoft Archicad"
  heroDim: string; // dimmed tail of the h1
  lead: string;
  sections: ProseSection[]; // narrative sections before the comparison
  compare: { head: string[]; rows: string[][] };
  switchWhen: string[];
  stayWhen: string[];
  faqs: FaqItem[];
};

export type SolutionData = {
  slug: string;
  title: string;
  lead: string;
  features: { title: string; body: string; bullets?: string[] }[];
  compare: { head: string[]; rows: string[][] };
  crossLinks: { label: string; href: string; note?: string }[];
  pathCards: { label: string; href: string; note?: string }[];
  faqs: FaqItem[];
};

export type CareerData = {
  slug: string;
  title: string;
  location: string;
  team: string;
  type: string;
  lead: string;
  sections: ProseSection[];
};

export type LegalDoc = {
  title: string;
  lead?: string;
  sections: { h3: string; paras: string[] }[];
};

export type DocsPageData = {
  slug: string; // e.g. "get-started/create-your-first-drawing"
  group: string; // sidebar group, e.g. "Get started"
  title: string;
  lead: string;
  sections: ProseSection[];
};
