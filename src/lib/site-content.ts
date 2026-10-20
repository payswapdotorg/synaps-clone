/**
 * Marketing + app content for the clone.
 *
 * PROVENANCE RULES FOR THIS FILE
 * ------------------------------
 *  - Strings that are "observed" are quoted verbatim from the COPY INVENTORY
 *    section of ANALYSIS.md (the REA of beta.synaps.app's captured public
 *    surface). They are short UI headlines/body sentences, reproduced so the
 *    clone reads like the surface that was analysed.
 *  - Anything the analysis did NOT observe (pricing figures, legal text,
 *    blog bodies, partner names, comparison rows) is authored for the clone
 *    and is explicitly labelled as a reconstruction on the rendered page.
 *  - No proprietary markup, imagery, fonts or third-party content is used.
 *
 * Route paths are stored WITHOUT a trailing slash. The captured marketing IA
 * used trailing-slash URLs (e.g. "/pricing/"); the clone normalises them to
 * Next.js canonical form. docs/ROUTES.md records the mapping.
 */

/* -------------------------------------------------------------------------- */
/* Generic content-page model                                                  */
/* -------------------------------------------------------------------------- */

export type ContentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "cards"; title: string; items: { title: string; body: string }[] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "table"; title: string; head: string[]; rows: string[][] }
  | { kind: "faq"; title: string; items: { q: string; a: string }[] }
  | { kind: "links"; title: string; items: { label: string; href: string }[] }
  | { kind: "notice"; text: string };

export type ContentPageData = {
  /** Small mono label above the title. */
  eyebrow: string;
  title: string;
  lead?: string;
  blocks: ContentBlock[];
};

/* -------------------------------------------------------------------------- */
/* Solutions hub                                                               */
/* -------------------------------------------------------------------------- */

export const solutionsHub: ContentPageData = {
  eyebrow: "Solutions",
  title: "Everything you need to build the connected foundation.",
  lead: "One canvas, two modes.",
  blocks: [
    {
      kind: "links",
      title: "By use case",
      items: [
        { label: "Architecture Studio", href: "/solutions/architecture-studio" },
        { label: "Interior Designers", href: "/solutions/interior-designers" },
        { label: "Real Estate Professionals", href: "/solutions/real-estate-professionals" },
        { label: "Freelancers & homeowners", href: "/solutions/freelancers-and-homeowners" },
        { label: "Students and educators", href: "/solutions/students-and-educators" },
      ],
    },
    {
      kind: "links",
      title: "By type",
      items: [
        { label: "Precise drafting", href: "/solutions/precise-drafting" },
        { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
        {
          label: "Automated floor plan tracing",
          href: "/solutions/automated-floor-plan-tracing",
        },
        { label: "Spatial visualization", href: "/solutions/space-visualization" },
        { label: "Client collaboration", href: "/solutions/client-collaboration" },
      ],
    },
    {
      kind: "notice",
      text: "The captured marketing site linked this hub with the labels “By use case” and “By type”. The individual destination pages listed here are reconstructed from the copy inventory — their prose is not a capture of the original pages.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Solution detail pages                                                       */
/* -------------------------------------------------------------------------- */

export type SolutionEntry = {
  slug: string;
  /** Headline — quoted from the copy inventory. */
  title: string;
  eyebrow: string;
  lead: string;
  mode: "draft" | "polish";
  points: { title: string; body: string }[];
};

export const solutions: SolutionEntry[] = [
  {
    slug: "architecture-studio",
    title: "Architecture Studio",
    eyebrow: "Solutions",
    lead: "Made for the studio",
    mode: "draft",
    points: [
      {
        title: "Accurate floor plans.",
        body: "Multilayer walls. Rooms shaped with precision.",
      },
      {
        title: "Windows, doors, stairs, editable and connected.",
        body: "Every element stays linked to the geometry it belongs to, so a change upstream carries downstream.",
      },
      {
        title: "Replace & restyle",
        body: "Swap finishes across the whole drawing and the scene catches up.",
      },
    ],
  },
  {
    slug: "automated-floor-plan-tracing",
    title: "Automated floor plan tracing",
    eyebrow: "Solutions",
    lead: "Floor plan tracer",
    mode: "draft",
    points: [
      {
        title: "Any photo, scan or sketch, traced into editable lines.",
        body: "The tracer returns connected linework rather than a flat image, so the result can be drafted on directly.",
      },
      {
        title: "Configurable elements",
        body: "Hatches, materials, blocks.",
      },
      {
        title: "Import your CAD files",
        body: "Bring existing drawings in and keep working on them in the same canvas.",
      },
    ],
  },
  {
    slug: "client-collaboration",
    title: "Client collaboration",
    eyebrow: "Solutions",
    lead: "Built for the everyday architecture practice",
    mode: "polish",
    points: [
      {
        title: "Walk the space. Camera framing built in.",
        body: "Present a room from inside the scene instead of a detached screenshot.",
      },
      {
        title: "Change the light. Swap finishes. The scene catches up.",
        body: "One connected model, so revisions reach the render without a re-export.",
      },
      {
        title: "Architectural drafting without the legacy CAD overhead.",
        body: "The connected foundation stays legible for everyone who touches the project.",
      },
    ],
  },
  {
    slug: "floor-plan-generation",
    title: "Floor plan generation",
    eyebrow: "Solutions",
    lead: "Design with AI",
    mode: "draft",
    points: [
      {
        title: "Describe the space. Get an editable plan.",
        body: "The generated plan is a starting geometry, not a locked image — every wall stays adjustable.",
      },
      {
        title: "Accurate floor plans",
        body: "Multilayer walls. Rooms shaped with precision.",
      },
      {
        title: "Within minutes.",
        body: "From a written brief to a plan you can draft on.",
      },
    ],
  },
  {
    slug: "freelancers-and-homeowners",
    title: "Freelancers & homeowners",
    eyebrow: "Solutions",
    lead: "Architectural Practice without the compromise",
    mode: "draft",
    points: [
      {
        title: "Any photo, scan or sketch, traced into editable lines.",
        body: "Start from what you already have — a snapshot of the room, a survey, a rough sketch.",
      },
      {
        title: "Describe the space. Get an editable plan.",
        body: "A written brief is enough to reach a first plan.",
      },
      {
        title: "Configurable elements",
        body: "Hatches, materials, blocks.",
      },
    ],
  },
  {
    slug: "interior-designers",
    title: "Interior Designers",
    eyebrow: "Solutions",
    lead: "Built for the everyday architecture practice",
    mode: "polish",
    points: [
      {
        title: "Change the light. Swap finishes. The scene catches up.",
        body: "Finishes are the fastest lever in an interior job, so they stay live in the scene.",
      },
      {
        title: "Replace & restyle",
        body: "Restyle a room and everything placed inside it updates together.",
      },
      {
        title: "Shadows. Cast and edit live. Sun position, time of day.",
        body: "Light is a design decision, not a render-time accident.",
      },
    ],
  },
  {
    slug: "precise-drafting",
    title: "Precise drafting",
    eyebrow: "Solutions",
    lead: "Draft with precision",
    mode: "draft",
    points: [
      {
        title: "Drafting, everything you need",
        body: "Windows, doors, stairs, editable and connected.",
      },
      {
        title: "Configurable elements",
        body: "Hatches, materials, blocks.",
      },
      {
        title: "Import your CAD files",
        body: "Keep the work you already did.",
      },
    ],
  },
  {
    slug: "real-estate-professionals",
    title: "Real Estate Professionals",
    eyebrow: "Solutions",
    lead: "Built for the everyday architecture practice",
    mode: "polish",
    points: [
      {
        title: "Walk the space. Camera framing built in.",
        body: "Show a buyer the room rather than a floor plan alone.",
      },
      {
        title: "Angle control. Lock the view. Reuse it across deliverables.",
        body: "A consistent view keeps every deliverable comparable.",
      },
      {
        title: "Within minutes.",
        body: "From a listing description to a presentable scene.",
      },
    ],
  },
  {
    slug: "space-visualization",
    title: "Spatial visualization",
    eyebrow: "Solutions",
    lead: "Polishing, in a single connected environment",
    mode: "polish",
    points: [
      {
        title: "Shadows. Cast and edit live. Sun position, time of day.",
        body: "The sun is a parameter you can move, not a fixed pass.",
      },
      {
        title: "Change the light. Swap finishes. The scene catches up.",
        body: "Relight & resurface without leaving the model.",
      },
      {
        title: "Walk the space. Camera framing built in.",
        body: "Framing is part of the tool, so it is part of the drawing.",
      },
    ],
  },
  {
    slug: "students-and-educators",
    title: "Students and educators",
    eyebrow: "Solutions",
    lead: "Architectural Practice without the compromise",
    mode: "draft",
    points: [
      {
        title: "Describe the space. Get an editable plan.",
        body: "A fast way to reach a first draft for a studio brief.",
      },
      {
        title: "Accurate floor plans",
        body: "Multilayer walls. Rooms shaped with precision.",
      },
      {
        title: "Import your CAD files",
        body: "Reuse course material without starting over.",
      },
    ],
  },
];

export function getSolution(slug: string): SolutionEntry | undefined {
  return solutions.find((s) => s.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* "Alternative to …" comparison pages                                         */
/* -------------------------------------------------------------------------- */

export type AlternativeEntry = {
  slug: string;
  /** The product name, as recorded in the copy inventory. */
  name: string;
};

export const alternatives: AlternativeEntry[] = [
  { slug: "archicad", name: "ArchiCAD" },
  { slug: "autocad", name: "AutoCAD" },
  { slug: "bricscad", name: "BricsCAD" },
  { slug: "revit", name: "Revit" },
  { slug: "sketchup", name: "SketchUp" },
  { slug: "vectorworks", name: "Vectorworks" },
];

export function getAlternative(slug: string): AlternativeEntry | undefined {
  return alternatives.find((a) => a.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Pricing                                                                     */
/* -------------------------------------------------------------------------- */

export const pricingPage: ContentPageData = {
  eyebrow: "Pricing",
  title: "Pricing",
  lead: "Architectural drafting without the legacy CAD overhead.",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — pricing was not captured. The original page was observed in the site’s IA (path “/pricing/”) but its tier names and figures were never retrieved, so no numbers are invented here. The tier structure below is a placeholder that demonstrates the layout only.",
    },
    {
      kind: "table",
      title: "Tiers",
      head: ["Tier", "Seats", "Billing", "Price"],
      rows: [
        ["Solo", "1", "Monthly", "—"],
        ["Practice", "Up to 5", "Monthly", "—"],
        ["Studio", "Unlimited", "Annual", "—"],
      ],
    },
    {
      kind: "cards",
      title: "What every tier shares",
      items: [
        {
          title: "One canvas, two modes.",
          body: "Drafting and polishing live in the same environment rather than in separate tools.",
        },
        {
          title: "Accurate floor plans.",
          body: "Multilayer walls. Rooms shaped with precision.",
        },
        {
          title: "Client collaboration",
          body: "Walk the space. Camera framing built in.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

export const companyPage: ContentPageData = {
  eyebrow: "Company",
  title: "The drafting tool a working studio runs on",
  lead: "Architectural Practice without the compromise",
  blocks: [
    {
      kind: "paragraph",
      text: "Built for the everyday architecture practice. The product narrative captured from the public marketing site is reproduced here through its own headings, because those headings are the most reliable description of the surface that was analysed.",
    },
    {
      kind: "cards",
      title: "Principles",
      items: [
        {
          title: "One canvas, two modes.",
          body: "Drafting and polishing are connected rather than separate products.",
        },
        {
          title: "Native.",
          body: "The tools are built into the drawing instead of wrapping another application.",
        },
        {
          title: "Within minutes.",
          body: "The first plan is close to the first prompt.",
        },
      ],
    },
    {
      kind: "notice",
      text: "Reconstruction — the company page’s real body copy, team information and legal entity details were not captured, so none are invented. This clone describes only what the analysis observed.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Blog + changelog                                                            */
/* -------------------------------------------------------------------------- */

export const blogPage: ContentPageData = {
  eyebrow: "News",
  title: "Blog",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — the blog index existed in the captured IA (path “/news/blog/”) but no article list was retrieved. The three entries below are placeholders that demonstrate the list layout.",
    },
    {
      kind: "list",
      title: "Latest posts",
      items: [
        "Sample post — placeholder for a captured article",
        "Sample post — placeholder for a captured article",
        "Sample post — placeholder for a captured article",
      ],
    },
    {
      kind: "links",
      title: "Also in News",
      items: [
        { label: "Release notes", href: "/news/changelog" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ],
};

export const changelogPage: ContentPageData = {
  eyebrow: "News",
  title: "Release notes",
  lead: "Introducing Vecy-1",
  blocks: [
    {
      kind: "notice",
      text: "Partial capture — “Introducing Vecy-1” is the only release-note string recovered from the public surface. The remaining entries below are placeholders that demonstrate the timeline layout.",
    },
    {
      kind: "list",
      title: "Timeline",
      items: [
        "Introducing Vecy-1",
        "Sample release — placeholder for a captured entry",
        "Sample release — placeholder for a captured entry",
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Partners                                                                    */
/* -------------------------------------------------------------------------- */

export const partnersPage: ContentPageData = {
  eyebrow: "Resources",
  title: "Partners",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — the partners page existed in the captured IA (path “/resources/partners/”) but no partner list was retrieved. No company names are invented here; the layout below uses placeholders.",
    },
    {
      kind: "cards",
      title: "Partner slots",
      items: [
        { title: "Sample partner", body: "Placeholder entry." },
        { title: "Sample partner", body: "Placeholder entry." },
        { title: "Sample partner", body: "Placeholder entry." },
      ],
    },
    {
      kind: "links",
      title: "Related",
      items: [
        { label: "Documentation", href: "/faq" },
        { label: "Book a call", href: "/demo" },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faqPage: ContentPageData = {
  eyebrow: "Resources",
  title: "FAQ",
  blocks: [
    {
      kind: "notice",
      text: "The original FAQ page was not captured, so the answers below are written for this clone and answer questions about the clone itself. They are not the original vendor’s answers.",
    },
    {
      kind: "faq",
      title: "About this site",
      items: [
        {
          q: "Is this the real Synaps product?",
          a: "No. This is an educational clone rebuilt from a reverse-engineering analysis of the public surface of beta.synaps.app. It is not affiliated with, endorsed by, or connected to Synaps.",
        },
        {
          q: "What is the demo flow?",
          a: "A six-step, entirely client-side simulation: choose a source, configure the run, watch a mocked processing step, review a generated plan, polish the scene, and deliver. No network calls are made and no data leaves the page.",
        },
        {
          q: "Why is the app area mostly placeholders?",
          a: "The real product’s authenticated app was never observed during the analysis, because sign-in is Google-only and no credentials were used. Those screens are honest reconstructions of the structure that was recorded, populated with obviously-demo fixtures.",
        },
        {
          q: "Is any real verification or generation performed?",
          a: "No. Nothing in this clone verifies identity, generates real geometry, or contacts any backend.",
        },
        {
          q: "How was this built?",
          a: "From the analysis recorded in ANALYSIS.md: a public-surface REA of the marketing site, the stylesheet token system, and the strings recoverable from the public application bundle.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Legal pages — authored for the clone, never presented as the original terms */
/* -------------------------------------------------------------------------- */

export const cookiesPage: ContentPageData = {
  eyebrow: "Legal",
  title: "Cookie policy",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — placeholder text. The original cookie policy at synaps.app was not captured, and nothing here is the original vendor’s legal text. This clone sets no cookies and runs no analytics or advertising scripts.",
    },
    {
      kind: "list",
      title: "What this clone stores",
      items: [
        "Nothing. The demo flow keeps all state in the browser tab and discards it on reload.",
        "No analytics, no advertising, no third-party trackers, no embedded media.",
      ],
    },
    {
      kind: "paragraph",
      text: "The footer exposes the cookie-control labels observed on the original site — Accept all, Accept, Reject all, Necessary, Manage — as inert controls, because the consent behaviour was not part of the observed public surface.",
    },
  ],
};

export const privacyPage: ContentPageData = {
  eyebrow: "Legal",
  title: "Privacy",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — placeholder text. The original privacy policy at synaps.app was not captured and nothing here is the original vendor’s legal text.",
    },
    {
      kind: "list",
      title: "This clone collects",
      items: [
        "No personal data.",
        "No account, no sign-in, no cookies, no server-side sessions.",
        "No analytics or advertising code of any kind.",
      ],
    },
    {
      kind: "paragraph",
      text: "The sign-in screen at /login reproduces the observed copy of the original page, but its button is inert: it performs no authentication and contacts no identity provider.",
    },
  ],
};

export const termsPage: ContentPageData = {
  eyebrow: "Legal",
  title: "Terms",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — placeholder text. The original terms at synaps.app were not captured and nothing here is the original vendor’s legal text. These terms cover the clone only.",
    },
    {
      kind: "list",
      title: "Terms of this clone",
      items: [
        "Provided for educational and study purposes, as a demonstration of reverse-engineering analysis and re-implementation.",
        "Not affiliated with, endorsed by, sponsored by, or connected to Synaps in any way.",
        "All product names, marks and quoted marketing copy belong to their respective owners and are used here for identification and analysis only.",
        "No warranty is given about accuracy, fitness, or fitness for any particular purpose.",
      ],
    },
  ],
};

export const imprintPage: ContentPageData = {
  eyebrow: "Legal",
  title: "Imprint",
  blocks: [
    {
      kind: "notice",
      text: "Reconstruction — placeholder text. The original imprint was not captured. The clone is a study artefact and names no legal entity.",
    },
    {
      kind: "paragraph",
      text: "This repository is an educational clone of beta.synaps.app, built from an analysis of that site’s public surface. It is a demonstration of what a public-surface REA can recover and what a faithful re-implementation looks like.",
    },
  ],
};
