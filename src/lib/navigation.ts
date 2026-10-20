/**
 * Navigation data for the clone.
 *
 * Every href is taken verbatim from the ROUTE MAP section of ANALYSIS.md
 * (REA of the public surface of beta.synaps.app). Several marketing
 * destinations exist in the captured IA but are not implemented yet — they are
 * still wired as real <Link> targets so the route graph can be filled in by
 * later milestones.
 *
 * App-side paths (/login, /register, …) are this clone's own routes, not the
 * original service.
 */

export type NavLink = {
  label: string;
  href: string;
  /** External destinations open in a new tab. */
  external?: boolean;
};

export type NavGroup = {
  heading: string;
  links: NavLink[];
};

/** Top-level marketing navigation: Product · Solutions · Pricing · Company. */
export const primaryLinks: NavLink[] = [
  { label: "Solutions", href: "/solutions/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Company", href: "/company/" },
  { label: "Demo", href: "/demo" },
];

/**
 * The "Product" group. The captured IA has no dedicated /polishing/ path, so
 * "Polishing" and "Spatial visualization" currently share the closest mapped
 * route until dedicated pages are built in a later milestone.
 */
export const productLinks: NavLink[] = [
  { label: "Drafting", href: "/solutions/precise-drafting/" },
  { label: "Polishing", href: "/solutions/space-visualization/" },
  { label: "Spatial visualization", href: "/solutions/space-visualization/" },
];

/** Auth actions + the primary CTA. */
export const authLinks: NavLink[] = [
  { label: "Log in", href: "/login" },
  { label: "Login", href: "/login" },
];

export const primaryCta: NavLink = {
  label: "Start designing free",
  href: "/register",
};

/** Footer columns, as observed in the captured marketing footer. */
export const footerGroups: NavGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Precise drafting", href: "/solutions/precise-drafting/" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation/" },
      {
        label: "Automated floor plan tracing",
        href: "/solutions/automated-floor-plan-tracing/",
      },
      { label: "Spatial visualization", href: "/solutions/space-visualization/" },
      { label: "Client collaboration", href: "/solutions/client-collaboration/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Synaps", href: "/company/" },
      { label: "Partners", href: "/resources/partners/" },
      { label: "Blog", href: "/news/blog/" },
      { label: "Release notes", href: "/news/changelog/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Cookie policy", href: "/cookies/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
      { label: "Imprint", href: "/imprint/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.synaps.app", external: true },
      { label: "FAQ", href: "/faq/" },
      { label: "Book a call", href: "https://cal.com/kevin-cobaj/30min", external: true },
    ],
  },
  {
    heading: "By type",
    links: [
      { label: "ArchiCAD", href: "/news/alternative-to/archicad/" },
      { label: "AutoCAD", href: "/news/alternative-to/autocad/" },
      { label: "BricsCAD", href: "/news/alternative-to/bricscad/" },
      { label: "Revit", href: "/news/alternative-to/revit/" },
      { label: "SketchUp", href: "/news/alternative-to/sketchup/" },
      { label: "Vectorworks", href: "/news/alternative-to/vectorworks/" },
    ],
  },
  {
    heading: "By use case",
    links: [
      // The captured IA lists both "Architectural practice" and
      // "Architecture Studio" but only ships one matching path.
      { label: "Architectural practice", href: "/solutions/architecture-studio/" },
      { label: "Architecture Studio", href: "/solutions/architecture-studio/" },
      { label: "Interior Designers", href: "/solutions/interior-designers/" },
      { label: "Real Estate Professionals", href: "/solutions/real-estate-professionals/" },
      { label: "Freelancers & homeowners", href: "/solutions/freelancers-and-homeowners/" },
      { label: "Students & educators", href: "/solutions/students-and-educators/" },
    ],
  },
];

/** Cookie-consent utility row (exact labels from the captured footer). */
export const cookieControls: NavLink[] = [
  { label: "Cookie policy", href: "/cookies/" },
  { label: "Cookie settings", href: "/cookies/" },
  { label: "Accept all", href: "/cookies/" },
  { label: "Accept", href: "/cookies/" },
  { label: "Reject all", href: "/cookies/" },
  { label: "Necessary", href: "/cookies/" },
  { label: "Manage", href: "/cookies/" },
];

export const cookieCopy = {
  analytics: "Helps us understand and improve Synaps.",
  advertising: "Lets us measure our ads and show them to the right people.",
};
