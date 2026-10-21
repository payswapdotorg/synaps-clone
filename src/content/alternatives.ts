import type { AltToolData } from "./types";

/**
 * Alternative-to content.
 *
 * PROVENANCE: page titles, section headings, FAQ questions and tool
 * names are transcribed from the harvest of /news/alternative-to/…;
 * table cells, list items and answers are original condensed
 * reconstructions.
 */

export const altTools: AltToolData[] = [
  {
    slug: "revit",
    tool: "Autodesk Revit",
    heroDim: "",
    lead: "A drafting-first counterpart to Revit for studios that still issue weekly PDF sets: coordination stays in Revit, documentation moves to Synaps.",
    sections: [
      {
        h2: "See Synaps in context",
        paras: [
          "Every plan, section and schedule in Revit is a view of one parametric database — the source of both its coordination strength and its documentation weight. Synaps takes the documentation half of that workload (drafting, sheet sets, weekly PDF issue) and leaves federated coordination in Revit.",
        ],
      },
      {
        h2: "Pilot Synaps next to Revit",
        paras: [
          "Run it as a two-week pilot on a live job with one measure: if documentation does not get faster, stop — even if the comparison reads in Synaps's favour.",
        ],
        list: [
          "Week 1 — migrate one office library slice and pick one live sheet set to own in Synaps.",
          "Week 2 — move internal review to Synaps; Revit stays the federated archive.",
          "Week 3–4 — issue one PDF set from Synaps and measure plan-edit-to-re-export hours.",
        ],
      },
    ],
    compare: {
      head: ["Feature", "Synaps", "Revit"],
      rows: [
        ["Primary surface", "2D drafting plus a sheet index", "Federated 3D BIM model"],
        ["Linked views", "Plans, sections and details stay live across edits", "Native, but coupled to the full model"],
        ["Sheet sets", "First-class, drag to reorder, auto-numbered", "Sheet manager inside the model"],
        ["Multi-discipline coordination", "Not the goal", "Core strength"],
        ["Clash detection", "No", "Yes, with Navisworks"],
        ["Learning curve", "2–5 days for an editor", "2–4 weeks plus office standards"],
      ],
    },
    switchWhen: [
      "Documentation consumes more partner hours than coordination does",
      "Re-exporting sheets after a plan change takes an afternoon, not minutes",
      "Library governance lives in one person's head rather than a system",
      "You issue weekly 2D sets while the model plays a supporting role",
    ],
    stayWhen: [
      "The federated model itself is the contract deliverable",
      "Clash detection and multi-discipline coordination are the job",
      "You owe the client FM handover or IFC compliance",
      "Nobody in the office can own a two-week documentation pilot",
    ],
    faqs: [
      {
        q: "Can we keep Revit and use Synaps for drafting?",
        a: "Yes — that is the most common mixed stack. Revit stays the coordination and archive model; Synaps owns drafting, libraries and the weekly issued set.",
      },
      {
        q: "Does Synaps import Revit (.rvt) files?",
        a: "Not wholesale. Synaps reads the IFC and DWG exports from Revit for geometry and view setup, and pilots start with one sheet set and grow from there.",
      },
      {
        q: "Do we lose multi-discipline coordination by switching documentation?",
        a: "Only if coordination was happening inside 2D sheet sets, which it usually is not. Federated coordination stays where it belongs: in your BIM tool.",
      },
      {
        q: "How does pricing compare to Revit?",
        a: "Synaps is per active editor, monthly, without seat lock-in or annual commitment. Studios commonly pilot with two editors and a studio lead.",
      },
    ],
  },
  {
    slug: "autocad",
    tool: "Autodesk AutoCAD",
    heroDim: "",
    lead: "A modern counterpart to AutoCAD for studios tired of reconciling fourteen DWGs before a client meeting: CAD-fast drawing inside one live project context.",
    sections: [
      {
        h2: "Pilot Synaps next to AutoCAD",
        paras: [
          "Run it as a two-week pilot on a live job with one measure: if documentation does not get faster, stop — even if the comparison reads in Synaps's favour.",
        ],
        list: [
          "Week 1 — import one DWG library slice and pick one live sheet set to own in Synaps.",
          "Week 2 — run internal review in Synaps; AutoCAD stays open for legacy details.",
          "Week 3–4 — issue one PDF set from Synaps and compare hours against the same set in AutoCAD.",
        ],
      },
    ],
    compare: {
      head: ["Feature", "Synaps", "AutoCAD"],
      rows: [
        ["Primary unit", "One project with linked views", "A separate file per drawing"],
        ["Sheet sets", "Built in, auto-numbered, drag to reorder", "Sheet Set Manager add-on"],
        ["Linked plan / section / detail", "Live across edits", "Xrefs plus sheet-set discipline"],
        ["Customisation", "Plugin API and design tokens", "LISP, ARX and VBA ecosystem"],
        ["DWG import / export", "Round-trip supported", "Native format"],
        ["Pricing model", "Per editor, monthly", "Per seat, annual"],
      ],
    },
    switchWhen: [
      "Friday afternoons go to reconciling a folder of DWGs instead of designing",
      "Editors copy details between files because linking them is harder",
      "Office standards live in scattered folders with version-suffix names",
      "You want sheet sets without buying Sheet Set Manager licences",
    ],
    stayWhen: [
      "Decades of LISP, ARX or VBA automation you cannot retire yet",
      "Clients mandate raw DWG deliverables exactly as authored",
      "The office standard is immovable and nobody owns a migration",
    ],
    faqs: [
      {
        q: "Does Synaps open DWG files?",
        a: "Yes — Synaps reads and writes DWG, so drawings round-trip with AutoCAD-class tools without conversion detours.",
      },
      {
        q: "Can we keep our LISP tooling?",
        a: "LISP runs in AutoCAD, not in Synaps. Studios usually keep an AutoCAD seat for legacy automation and move documentation across incrementally.",
      },
      {
        q: "Does Synaps replace Sheet Set Manager?",
        a: "Sheet sets are first-class in Synaps: drag-to-reorder, automatic numbering and linked title blocks, with no add-on licence.",
      },
      {
        q: "Is Synaps cheaper than AutoCAD?",
        a: "Per editor, usually yes — and without annual lock-in. Most pilots start with two editors and a studio lead.",
      },
    ],
  },
  {
    slug: "sketchup",
    tool: "SketchUp Pro & LayOut",
    heroDim: "",
    lead: "A documentation-grade counterpart to SketchUp for studios that need to issue technical drawing sets, not just persuasive visuals.",
    sections: [
      {
        h2: "Pilot Synaps next to SketchUp",
        paras: [
          "Run it as a two-week pilot on a live job with one measure: if documentation does not get faster, stop — even if the comparison reads in Synaps's favour.",
        ],
        list: [
          "Week 1 — import SketchUp geometry as reference and set up one project in Synaps.",
          "Week 2 — draft plans and sections in Synaps; keep SketchUp for ongoing client visuals.",
          "Week 3–4 — issue the first PDF set from Synaps and decide which phase lives where going forward.",
        ],
      },
    ],
    compare: {
      head: ["Feature", "Synaps", "SketchUp"],
      rows: [
        ["Primary use", "Technical documentation", "Concept modelling and presentation"],
        ["Plans, sections, details", "First-class and linked", "Generated in LayOut, rebuilt on change"],
        ["Dimensioning & tolerances", "Construction-grade", "Indicative"],
        ["Sheet sets", "Native", "LayOut documents with manual sync"],
        ["Rendering", "Not the goal", "Plugin ecosystem (V-Ray, Enscape, and friends)"],
        ["Pricing model", "Per editor, monthly", "Per user, annual"],
      ],
    },
    switchWhen: [
      "Your set needs construction-grade dimensions, not just visuals",
      "Contractors ask for tolerances while LayOut keeps drifting from the model",
      "Materials need office governance instead of one-off textures",
      "You draw the same plan twice because only the second one counts as real",
    ],
    stayWhen: [
      "Deliverables are visual only, with no path to issued plans",
      "The firm sells design intent rather than construction documentation",
      "Concept work dominates and documentation arrives from a partner downstream",
    ],
    faqs: [
      {
        q: "Does Synaps import SketchUp files?",
        a: "Yes — SKP geometry comes in as reference for plan layout. The push-pull workflow stays in SketchUp; the issued drawing set lives in Synaps.",
      },
      {
        q: "Do we need to abandon SketchUp?",
        a: "No. The common pattern is SketchUp for concept and client persuasion, Synaps once the set has to be issued.",
      },
      {
        q: "Can Synaps render like V-Ray or Enscape?",
        a: "Synaps is not a renderer. It outputs construction-grade documentation; keep your renderer of choice for photo-real visuals.",
      },
      {
        q: "Is Synaps overkill for a small studio?",
        a: "If you never issue technical drawing sets, yes. If you do and SketchUp plus LayOut keeps drifting, run a two-week pilot and decide.",
      },
    ],
  },
  {
    slug: "archicad",
    tool: "Graphisoft Archicad",
    heroDim: "",
    lead: "Where Synaps fits next to Archicad: fast 2D plan production and client-facing presentation, without the BIM overhead — for the projects that never needed full BIM.",
    sections: [
      {
        h2: "See Synaps in context",
        paras: [
          "Archicad is a full BIM authoring environment: element classification, schedules, documentation sets. Synaps is a connected 2D-first canvas with presentation built in. They solve different halves of an architectural practice's week.",
        ],
      },
      {
        h2: "Pilot Synaps next to Archicad",
        paras: [
          "The honest pilot is a live job with a real deadline: a small extension, an interior fit-out, a planning-stage options study. Run it in Synaps while the main projects stay in Archicad, and compare hours spent on plan production and presentation prep.",
          "Import the DXF of the existing survey, draft the options, present from presentation mode, and export DXF back for anyone still in Archicad.",
        ],
      },
    ],
    compare: {
      head: ["Area", "Synaps", "Archicad"],
      rows: [
        ["Model type", "2D-first canvas, presentation built in", "Full BIM authoring"],
        ["Plan production", "Fast, dimension-driven 2D", "Documentation from the BIM model"],
        ["Schedules / quantities", "Not the focus", "Generated from model data"],
        ["Learning curve", "Hours for a CAD-literate drafter", "A serious onboarding investment"],
        ["Licensing", "Per active editor, monthly, free tier", "Per named user, annual terms"],
      ],
    },
    switchWhen: [
      "Your weekly work is 2D plans, options and presentations, not BIM coordination",
      "Per-seat legacy pricing hurts a small or fluctuating team",
      "Clients need fast, good-looking visuals from the same drawing you draft in",
      "Consultants only ever exchange DXF and PDF anyway",
    ],
    stayWhen: [
      "You depend on schedules, quantities and model-derived documentation",
      "Multi-office BIM collaboration and issue management are core to the practice",
      "Your regulatory workflow is certified around BIM deliverables",
      "The team's muscle memory and libraries live in Archicad",
    ],
    faqs: [
      {
        q: "Does Synaps work with IFC?",
        a: "Not as a BIM round-trip. DXF, PDF and images are the exchange formats today; IFC import is not part of the analysed surface.",
      },
      {
        q: "Can we run Archicad and Synaps in parallel?",
        a: "Yes — that is the recommended posture. Draft and present the 2D-heavy jobs in Synaps, keep BIM projects in Archicad, exchange via DXF.",
      },
      {
        q: "How does Synaps compare to Teamwork + BIMcloud?",
        a: "Synaps collaboration is lighter: a shared team workspace with live co-editing and viewer access. It is not a BIM server — no element reservation across a model graph.",
      },
      {
        q: "Is Synaps cheaper than Archicad?",
        a: "On licence line-items, usually yes — per active editor with a free tier versus per named user on annual terms. The real comparison is which tool the week's work actually needs.",
      },
    ],
  },
  {
    slug: "vectorworks",
    tool: "Vectorworks Architect",
    heroDim: "",
    lead: "A drafting-first counterpart to Vectorworks for studios that issue weekly sets: keep Vectorworks for BIM authoring and site tools, move documentation to Synaps.",
    sections: [
      {
        h2: "See Synaps in context",
        paras: [
          "Vectorworks keeps BIM and 2D together in one file, so sheet sets, resources and libraries all move at the pace of that model file. Synaps lifts documentation and library governance out of it — linked views and weekly PDF issue that do not wait on the design layers — while Vectorworks keeps BIM authoring and its site tools.",
        ],
      },
      {
        h2: "Pilot Synaps next to Vectorworks",
        paras: [
          "Run it as a two-week pilot on a live job with one measure: if documentation does not get faster, stop — even if the comparison reads in Synaps's favour.",
        ],
        list: [
          "Week 1 — export one symbol-library slice and one sheet set, then set up the project in Synaps.",
          "Week 2 — run internal review in Synaps; Vectorworks stays the design archive.",
          "Week 3–4 — issue one PDF set from Synaps and measure hours against the same set in Vectorworks.",
        ],
      },
    ],
    compare: {
      head: ["Feature", "Synaps", "Vectorworks"],
      rows: [
        ["Primary surface", "2D drafting plus a sheet index", "BIM and 2D hybrid model"],
        ["Sheet sets", "First-class, drag to reorder", "Sheet layers and viewports"],
        ["Linked views", "Live across plan, section and detail", "Viewports tied to design layers"],
        ["Landscape & site", "Plan-driven", "Strong site and Landmark tools"],
        ["IFC / OPEN BIM", "Import and export", "Core workflow"],
        ["Pricing model", "Per editor, monthly", "Per seat, annual"],
      ],
    },
    switchWhen: [
      "Sheet sets drift every time a design layer changes",
      "Resource Manager governance lives in tribal knowledge rather than a system",
      "Documentation hours exceed modelling hours on issued jobs",
      "You want weekly PDF issue off the critical path of the model file",
    ],
    stayWhen: [
      "Landscape, entertainment or site design is the core deliverable",
      "OPEN BIM and IFC are contractually central to every job",
      "The office standard is deeply embedded in Vectorworks templates",
    ],
    faqs: [
      {
        q: "Does Synaps replace Vectorworks entirely?",
        a: "Rarely on day one. Studios usually keep Vectorworks for BIM and site tools while Synaps owns drafting, libraries and the issued sets.",
      },
      {
        q: "Can Synaps import Vectorworks files?",
        a: "Not the native format. Synaps reads the DWG and IFC exports from Vectorworks for geometry and view setup; pilots start with one sheet set, not a wholesale migration.",
      },
      {
        q: "What about Landmark or Spotlight?",
        a: "Those verticals stay in Vectorworks. Synaps targets architectural documentation — plans, sections, details and sheet sets.",
      },
      {
        q: "How does pricing compare?",
        a: "Synaps is per active editor, monthly, without annual lock-in. Pilots typically start with two editors and a studio lead.",
      },
    ],
  },
  {
    slug: "bricscad",
    tool: "BricsCAD Pro",
    heroDim: "",
    lead: "A modern counterpart to BricsCAD for studios that want one live project context across plans, sections and sheets — not a folder of DWGs.",
    sections: [
      {
        h2: "Pilot Synaps next to BricsCAD",
        paras: [
          "Run it as a two-week pilot on a live job with one measure: if documentation does not get faster, stop — even if the comparison reads in Synaps's favour.",
        ],
        list: [
          "Week 1 — import one DWG library slice and pick one live sheet set to own in Synaps.",
          "Week 2 — run internal review in Synaps; BricsCAD stays open for legacy exports.",
          "Week 3–4 — issue one PDF set from Synaps and compare hours against the BricsCAD workflow.",
        ],
      },
    ],
    compare: {
      head: ["Feature", "Synaps", "BricsCAD"],
      rows: [
        ["Primary unit", "One project with linked views", "A DWG file per drawing"],
        ["Sheet sets", "Built in, auto-numbered", "Layouts and viewports per file"],
        ["Office libraries", "Publish, edit and view roles", "Tool palettes and block libraries"],
        ["DWG round-trip", "Yes", "Native"],
        ["BIM (BricsCAD BIM)", "Not the goal", "Available in the BIM edition"],
        ["Pricing model", "Per editor, monthly", "Perpetual or subscription"],
      ],
    },
    switchWhen: [
      "You reconcile a folder of DWGs before every client meeting",
      "Sheet numbering is tracked in a spreadsheet beside the drawings",
      "Library updates do not reliably reach active jobs",
      "You want sheet sets without per-file layout administration",
    ],
    stayWhen: [
      "BricsCAD BIM is your federated coordination surface",
      "Clients mandate raw DWG containing BricsCAD-specific objects",
      "Perpetual licences or fully offline deployment are non-negotiable",
    ],
    faqs: [
      {
        q: "Does Synaps open BricsCAD DWG files?",
        a: "Yes — Synaps reads and writes DWG for round-trip with BricsCAD and other CAD-class tools.",
      },
      {
        q: "What about BricsCAD BIM?",
        a: "Keep BricsCAD BIM as your coordination surface if you use it. Synaps targets documentation, not federated clash detection.",
      },
      {
        q: "Is Synaps cheaper than BricsCAD?",
        a: "Per editor, often yes — and without perpetual upgrade cycles. Compare total cost on a two-week pilot rather than list price alone.",
      },
      {
        q: "Can we keep BricsCAD for contractors who require DWG?",
        a: "Yes. Synaps exports DWG and PDF, and many studios keep BricsCAD as the compatibility export path during the transition.",
      },
    ],
  },
];
