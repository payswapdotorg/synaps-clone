/**
 * Landing-page copy and data.
 *
 * Every string is quoted verbatim from the COPY INVENTORY section of
 * ANALYSIS.md, which was extracted from the captured public marketing page
 * (.rea/marketing.html). Section order follows the captured document order.
 *
 * No prose here is invented: anything not observed is either absent or
 * explicitly marked as inferred.
 */

export type Feature = {
  index: string;
  title: string;
  body: string;
};

export type Capability = {
  title: string;
  body: string;
  /** Key into the original SVG icon set (src/components/icons.tsx). */
  icon: string;
};

export type ModeStep = {
  counter: string;
  title: string;
  body: string;
  icon: string;
};

export const hero = {
  audience: "For architects and developers",
  /** Three lines, as in the captured hero: two solid, one dimmed. */
  headline: ["From idea to", "client-ready design.", "Within minutes."],
  sub: "Create precise floor plans, explore design options, and turn the same drawing into presentation-ready visuals.",
  primaryCta: { label: "Start designing free", href: "/register" },
  secondaryCta: { label: "Book a call", href: "https://cal.com/kevin-cobaj/30min" },
  trust: "Trusted by 80,000 architects worldwide.",
};

export const features: Feature[] = [
  {
    index: "01 / 03",
    title: "Import your CAD files",
    body: "Works with the files you already have. Bring in DXF, PDF and image files.",
  },
  {
    index: "02 / 03",
    title: "Draft with precision",
    body: "Documentation with the precision architects demand. Spatial logic in every detail.",
  },
  {
    index: "03 / 03",
    title: "Design with AI",
    body: "Generate floor plans and explore different materials, furniture and lighting.",
  },
];

export const quote = {
  headline:
    "Synaps is the radically simple, deeply connected tool for modern architectural practice.",
  attribution: "Architecture studio, Tirana",
};

export const capabilityGroups: { label: string; items: Capability[] }[] = [
  {
    label: "Drafting",
    items: [
      {
        title: "Accurate floor plans",
        body: "Multilayer walls. Rooms shaped with precision.",
        icon: "plan",
      },
      {
        title: "Configurable elements",
        body: "Windows, doors, stairs, editable and connected.",
        icon: "elements",
      },
      {
        title: "Floor plan tracer",
        body: "Any photo, scan or sketch, traced into editable lines.",
        icon: "tracer",
      },
      {
        title: "Floor plan generator",
        body: "Describe the space. Get an editable plan.",
        icon: "generator",
      },
    ],
  },
  {
    label: "Polishing",
    items: [
      {
        title: "Shadows",
        body: "Cast and edit live. Sun position, time of day.",
        icon: "sun",
      },
      {
        title: "Spatial visualization",
        body: "Walk the space. Camera framing built in.",
        icon: "camera",
      },
      {
        title: "Angle control",
        body: "Lock the view. Reuse it across deliverables.",
        icon: "angle",
      },
      {
        title: "Relight & resurface",
        body: "Change the light. Swap finishes. The scene catches up.",
        icon: "relight",
      },
      {
        title: "Replace & restyle",
        body: "Swap an element or restyle the whole project. Connections stay.",
        icon: "restyle",
      },
    ],
  },
];

/** The "Everything you need" accordion, verbatim from the capture. */
export const accordion = [
  {
    title: "Drafting, everything you need",
    items: [
      "Accurate floor plans. Multilayer walls. Rooms shaped with precision.",
      "Configurable elements. Windows, doors, stairs, editable and connected.",
      "Floor plan tracer. Any photo, scan or sketch, traced into editable lines.",
      "Floor plan generator. Describe the space. Get an editable plan.",
    ],
  },
  {
    title: "Polishing, in a single connected environment",
    items: [
      "Shadows. Cast and edit live. Sun position, time of day.",
      "Spatial visualization. Walk the space. Camera framing built in.",
      "Angle control. Lock the view. Reuse it across deliverables.",
      "Relight & resurface. Change the light. Swap finishes. The scene catches up.",
      "Replace & restyle. Swap an element or restyle the whole project. Connections stay.",
    ],
  },
];

/** "One canvas, two modes" — the two mode tracks of the capture. */
export const modeTracks: {
  id: string;
  label: string;
  lead: string;
  steps: ModeStep[];
}[] = [
  {
    id: "drafting",
    label: "Drafting",
    lead: "Everything you need to build the connected foundation.",
    steps: [
      {
        counter: "1 / 4",
        title: "Accurate floor plans",
        body: "Multilayer walls. Rooms shaped with precision.",
        icon: "plan",
      },
      {
        counter: "2 / 4",
        title: "Configurable elements",
        body: "Windows, doors, stairs, editable and connected.",
        icon: "elements",
      },
      {
        counter: "3 / 4",
        title: "Floor plan tracer",
        body: "Any photo, scan or sketch, traced into editable lines.",
        icon: "tracer",
      },
      {
        counter: "4 / 4",
        title: "Floor plan generator",
        body: "Describe the space. Get an editable plan.",
        icon: "generator",
      },
    ],
  },
  {
    id: "polishing",
    label: "Polishing",
    lead: "In a single connected environment.",
    steps: [
      {
        counter: "1 / 5",
        title: "Shadows",
        body: "Cast and edit live. Sun position, time of day.",
        icon: "sun",
      },
      {
        counter: "2 / 5",
        title: "Spatial visualization",
        body: "Walk the space. Camera framing built in.",
        icon: "camera",
      },
      {
        counter: "3 / 5",
        title: "Angle control",
        body: "Lock the view. Reuse it across deliverables.",
        icon: "angle",
      },
      {
        counter: "4 / 5",
        title: "Relight & resurface",
        body: "Change the light. Swap finishes. The scene catches up.",
        icon: "relight",
      },
      {
        counter: "5 / 5",
        title: "Replace & restyle",
        body: "Swap an element or restyle the whole project. Connections stay.",
        icon: "restyle",
      },
    ],
  },
];

/** The native-assets library block (dark section in the capture). */
export const assetsLibrary = {
  headline: ["Hatches, materials, blocks.", "Native."],
  sub: "Every fill, every block, every floorplan detail, built into the canvas. Drop a sofa, paint a wood grain, snap a window into place.",
};

export const studioTabs = [
  {
    id: "vecy",
    label: "01 Vecy-1",
    title: "Introducing Vecy-1",
    body: "Design with AI. Generate floor plans and explore different materials, furniture and lighting.",
  },
  {
    id: "studio",
    label: "02 Made for the studio",
    title: "Made for the studio",
    body: "Built for the everyday architecture practice. The drafting tool a working studio runs on.",
  },
];

export const finalCta = {
  headline: "Architectural practice without the compromise.",
  primaryCta: { label: "Start designing free", href: "/register" },
  secondaryCta: { label: "Book a call", href: "https://cal.com/kevin-cobaj/30min" },
  trust: "Trusted by 80,000 architects worldwide.",
};

/** "Alternative to" comparison targets, per the captured nav + footer. */
export const alternatives = [
  { label: "ArchiCAD", href: "/news/alternative-to/archicad" },
  { label: "AutoCAD", href: "/news/alternative-to/autocad" },
  { label: "BricsCAD", href: "/news/alternative-to/bricscad" },
  { label: "Revit", href: "/news/alternative-to/revit" },
  { label: "SketchUp", href: "/news/alternative-to/sketchup" },
  { label: "Vectorworks", href: "/news/alternative-to/vectorworks" },
];
