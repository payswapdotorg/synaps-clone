import type { SolutionData } from "./types";

/**
 * Solutions content.
 *
 * PROVENANCE: page titles, feature-section headings, FAQ questions and
 * the comparison-table row labels are transcribed from the harvest of
 * /solutions/…; body copy, bullet text and table cells are original
 * condensed reconstructions. Cross-links mirror the analysed hub.
 */

export const solutionsHub = {
  byType: [
    { label: "Architecture Studio", href: "/solutions/architecture-studio", note: "Issue sets, real-time teamwork, presentations" },
    { label: "Interior Designers", href: "/solutions/interior-designers", note: "Finishes, furniture, lighting" },
    { label: "Freelancers & Homeowners", href: "/solutions/freelancers-and-homeowners", note: "One-person practices and renovations" },
    { label: "Real Estate Professionals", href: "/solutions/real-estate-professionals", note: "Listings, layouts, marketing plans" },
    { label: "Students & Educators", href: "/solutions/students-and-educators", note: "Learn drafting without licence friction" },
  ],
  byUseCase: [
    { label: "Precise drafting", href: "/solutions/precise-drafting", note: "Measured, CAD-grade 2D documentation" },
    { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing", note: "Scans and PDFs into editable plans" },
    { label: "Floor plan generation", href: "/solutions/floor-plan-generation", note: "From a brief to an editable draft" },
    { label: "Space visualization", href: "/solutions/space-visualization", note: "Relight, restyle, present" },
    { label: "Client collaboration", href: "/solutions/client-collaboration", note: "Share, comment, hand over" },
  ],
};

export const solutions: SolutionData[] = [
  {
    slug: "architecture-studio",
    title: "Architecture Studio",
    lead: "Run the whole job from sketch through DD in one project: draft the plan set, review it live with the team, and pull a hero plan straight into the fee proposal. You pay per active editor, not per seat.",
    features: [
      {
        title: "Draft technical plans",
        body: "Measured walls, openings and rooms with the spatial logic architects expect — snap to grid, dimension-driven elements, and layers that read like a drawing set.",
        bullets: [
          "Dimension-driven windows, doors and stairs that stay connected to their walls",
          "Layers, pages and title-block conventions that mirror an issued set",
          "DXF in and out, so consultants keep their toolchain",
        ],
      },
      {
        title: "Work together in real time",
        body: "Models live in a shared team workspace: spaces group projects, invitations bring collaborators in, and every edit syncs for the whole team without file ping-pong.",
        bullets: [
          "Per-editor billing — viewers and reviewers are never a seat",
          "Live multi-editor sessions with connection-safe saving",
          "Spaces and pages keep large portfolios navigable",
        ],
      },
      {
        title: "Client-ready presentations",
        body: "The same drawing becomes the presentation: polish mode relights and restyles the plan, presentation mode walks through building, site, section and elevation, and the phone handover puts the result in a client's pocket.",
        bullets: [
          "Reveal-artifact presentation flow built for client meetings",
          "Watermark-free, high-quality export on Pro and Studio",
          "QR handover to review on a phone",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Plan production", "2D drafting on one shared canvas", "CAD seat per drafter + file sharing"],
        ["Visualisation", "Same plan, relit and restyled", "Separate render pass per image"],
        ["Presentations", "Built-in, from the live model", "Exported stills into slide software"],
        ["Cost model", "Per active editor, monthly", "Named-user licences on annual terms"],
      ],
    },
    crossLinks: [
      { label: "Interior Designers", href: "/solutions/interior-designers" },
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Client collaboration", href: "/solutions/client-collaboration" },
    ],
    pathCards: [
      { label: "Start from scratch", href: "/register", note: "Open the console on an empty canvas" },
      { label: "Import an existing plan", href: "/register", note: "DXF, PDF, image — traced to editable geometry" },
      { label: "Talk to the team", href: "/resources/partners", note: "For studios above 50 editors" },
    ],
    faqs: [
      {
        q: "Does Synaps replace our existing CAD tool for issue sets?",
        a: "For 2D plan sets it can — layers, pages and DXF round-tripping cover the issue workflow. Studios that live in heavy BIM coordination usually run Synaps next to their BIM tool rather than instead of it.",
      },
      {
        q: "Can a four-person studio share one workspace without seat lock-in?",
        a: "Yes. A team workspace is free to create; you are billed per active editor and can add or remove editors any month. Viewers and reviewers never count.",
      },
      {
        q: "How does version control work when two architects are on the same plan?",
        a: "Edits sync live with connection-safe local saving, so a dropped network does not lose work. The drawing history keeps prior states recoverable.",
      },
      {
        q: "What happens to fee proposals, schedules, and presentation decks?",
        a: "They stay in your usual tools. Synaps covers the drawing pipeline — plans, visualisation and the in-app presentation — and exports what the rest of the practice needs.",
      },
    ],
  },
  {
    slug: "automated-floor-plan-tracing",
    title: "Automated floor plan tracing",
    lead: "Drop in a PDF, a scan, or an angled phone photo of a coffee-stained blueprint, set the scale against a known dimension, and trace it into clean, editable geometry, accurate to within 1 to 2% of the source.",
    features: [
      {
        title: "Import the existing floor plan",
        body: "The plan usually exists before the project does, and redrawing it by hand eats hours a deadline rarely has. Drop in the paper photo or the PDF, and the tracer returns the geometry instead.",
        bullets: [
          "Photos, scans and PDFs all work as tracing sources",
          "Detected line work is snapped to automatically on clean inputs",
          "Messy sources fall back to assisted manual tracing",
        ],
      },
      {
        title: "Automatic perspective & scale correction",
        body: "Photos arrive skewed and mis-scaled, so the tracer deals with both: once the image is on the canvas, the perspective is straightened and the true scale set automatically — landing within 1–2% of the original.",
        bullets: [
          "Perspective straightened as soon as the image hits the canvas",
          "Scale anchored to a known dimension — a door, a stair, a corridor",
          "Within 1–2% — renovation- and survey-grade",
        ],
      },
      {
        title: "Hand off editable deliverables",
        body: "What comes back is genuine drawing geometry, not a re-styled flat image. Finish and annotate it to your own standards, exactly as you would a plan you had drawn yourself.",
        bullets: [
          "Walls, openings and rooms come back as native editable objects",
          "Your layers, weights and hatching applied after the trace",
          "Exports as DXF, DWG, PDF or image for whoever is next in line",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Getting a plan in", "Photo, scan or PDF traced to geometry", "Manual redraw over a raster underlay"],
        ["Distorted sources", "Perspective and scale corrected in-canvas", "Straightened in an image editor first"],
        ["Fidelity", "Within 1–2% of the source", "As good as the drafter's patience"],
        ["Downstream use", "Styled and exported like any native plan", "A flat image — or a second redraw"],
      ],
    },
    crossLinks: [
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
      { label: "Space visualization", href: "/solutions/space-visualization" },
    ],
    pathCards: [
      { label: "Trace your first plan", href: "/register", note: "Drop in a photo or PDF and set the scale" },
      { label: "Start from a clean canvas", href: "/register", note: "No source material? Draft instead" },
      { label: "Talk to the team", href: "/resources/partners", note: "For tracing at studio scale" },
    ],
    faqs: [
      {
        q: "What kind of source material can I trace from?",
        a: "PDFs, JPGs, photos taken at an angle, scanned blueprints — stains included. Clean inputs get automatic line detection; rougher ones switch to assisted manual tracing. Most people's first source is simply a phone snap of the paper plan.",
      },
      {
        q: "How do I correct for perspective distortion in an angled photo?",
        a: "Mark two known dimensions on the photo — the lengths of two adjacent walls, for instance — and the image is straightened into orthogonal coordinates you can trace against. The result stays within 1–2% of the source, which covers renovation and survey work.",
      },
      {
        q: "Can I trace a plan one room at a time across separate sessions?",
        a: "Yes — tracing is non-destructive. Leave a project half-finished and the source photo and your partial trace reopen still aligned. There is no special tracing mode to get locked out of.",
      },
      {
        q: "What is the cleanest way to convert a hand sketch into editable geometry?",
        a: "Photograph the sketch flat, scale it from a labelled dimension, then trace the walls. The sketch stays a background image, so the geometry you get out has none of its roughness — just clean walls and openings to develop.",
      },
    ],
  },
  {
    slug: "client-collaboration",
    title: "Client collaboration",
    lead: "Clients point at the spot on the drawing and type, no signup, no install. The pin stays on that element, so “move the bedroom door” never gets lost in an email reply chain.",
    features: [
      {
        title: "Feedback in the drawing, not in email",
        body: "Feedback is pinned to the very spot on the drawing the client is talking about. No long email threads to reconstruct, no screenshots to decode.",
        bullets: [
          "Viewer links — no signup or install for the client",
          "Pins stay attached to the element they refer to",
          "'Move the bedroom door' stays findable forever",
        ],
      },
      {
        title: "Track the project progress",
        body: "Open a project again and the changes since the previous review are spelled out precisely. Clients stay current, and no meeting time goes to working out what is new.",
        bullets: [
          "'Show changes since' a date you pick",
          "Wall moves, furniture swaps and annotation edits highlighted",
          "Reviews start from the diff, not from zero",
        ],
      },
      {
        title: "Present options side by side",
        body: "Lay multiple design options out in one place and let the client compare them directly. Choices get clearer and decisions get made faster.",
        bullets: [
          "Option variants arranged on a single canvas",
          "The underlying shell is shared across variants",
          "Fullscreen walk-through of each option in the meeting",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Client feedback", "Pinned comments on the drawing", "Email threads and screenshots"],
        ["Reviewing changes", "Diff highlighted since a chosen date", "Change notes written by hand"],
        ["Options", "Variants side by side on one canvas", "Separate exports per option"],
        ["Proposals", "A scrollable page at a private link", "Slide decks assembled manually"],
        ["Procurement", "Paginated PDF on demand", "The deck, re-exported and re-paginated"],
      ],
    },
    crossLinks: [
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
    ],
    pathCards: [
      { label: "Share your first drawing", href: "/register", note: "Viewer links, no signup for clients" },
      { label: "Draft something worth sharing", href: "/register", note: "Open the console and start drawing" },
      { label: "Talk to the team", href: "/resources/partners", note: "For practices running many reviews" },
    ],
    faqs: [
      {
        q: "How does a client leave feedback without learning a new tool?",
        a: "They open a viewer link, click the spot on the drawing they have a question about, and type. No account, no install. The pin then lives on that element, so requests like moving a bedroom door never vanish into an email chain.",
      },
      {
        q: "How do I show the client what changed since last review?",
        a: "Switch on 'show changes since' and pick a date: every wall move, furniture swap and annotation edit since that snapshot lights up. The client sees what moved between versions without you writing release notes.",
      },
      {
        q: "Can I send a proposal that does not look like a slide deck?",
        a: "That is the point of the format: a long-form, scrollable page living at a private link. Plans, sections, materials, fee structure and timeline sit on one surface instead of fragmenting across dozens of slides.",
      },
      {
        q: "Can I export the proposal as a PDF for procurement?",
        a: "Yes. Print-to-PDF turns it into a paginated document — numbered pages, an automatic table of contents, drawings embedded at high resolution. The procurement officer gets their PDF; everyone else keeps the live link.",
      },
    ],
  },
  {
    slug: "floor-plan-generation",
    title: "Floor plan generation",
    lead: "Describe the constraints, site dimensions, required rooms, adjacencies, and get three to twelve plan options as real, editable geometry, not an image. Treat it as the starting point a junior would have handed you.",
    features: [
      {
        title: "From brief to editable floor plan",
        body: "Write down the space you need and a complete plan comes back in seconds — a genuine editable drawing rather than a flat image, so refinement starts immediately.",
        bullets: [
          "The brief covers rooms, dimensions and adjacencies",
          "Output is native geometry, not a picture of a plan",
          "Development starts the moment generation finishes",
        ],
      },
      {
        title: "Explore layouts in minutes",
        body: "One brief yields several layout options to compare side by side. You cover more design directions in minutes than a day of drawing by hand would allow.",
        bullets: [
          "Three to twelve options generated per brief",
          "Pin the promising ones, discard the rest",
          "Side-by-side comparison right on the canvas",
        ],
      },
      {
        title: "Built on real spatial logic",
        body: "Generated plans follow spatial logic that holds up: rooms, circulation and openings that make sense — something an architect could have drawn rather than filler geometry.",
        bullets: [
          "Adjacencies and circulation reasoned, not random",
          "Openings placed where they belong",
          "Plans that survive being looked at twice",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["First pass on a layout", "Generated from the brief in seconds", "Drawn from scratch by hand"],
        ["Option studies", "Three to twelve variants per brief", "One or two, time permitting"],
        ["Output", "Editable geometry you develop", "Images you redraw from"],
        ["Spatial quality", "Adjacencies and circulation reasoned", "Whatever the deadline allows"],
        ["Changing direction", "A sketch steers the next round", "Start again from zero"],
      ],
    },
    crossLinks: [
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
      { label: "Space visualization", href: "/solutions/space-visualization" },
    ],
    pathCards: [
      { label: "Generate your first options", href: "/register", note: "Write a brief, get geometry to refine" },
      { label: "Draft it yourself instead", href: "/register", note: "Skip generation, open the canvas" },
      { label: "Talk to the team", href: "/resources/partners", note: "For option studies at portfolio scale" },
    ],
    faqs: [
      {
        q: "What does \"generate\" actually mean here, am I getting AI slop?",
        a: "You set out constraints — site dimensions, rooms, adjacencies — and the generator proposes plans that respect them, as real editable geometry. It is a competent first draft in the sense of what a junior would hand you; you rework it into the plan you actually want.",
      },
      {
        q: "How many options can I generate from a single brief?",
        a: "Anywhere from three to twelve — it depends on how tight the brief is. A nailed-down five-room villa converges quickly; a loose programme on an irregular site spreads wide. Pin what works, drop the rest.",
      },
      {
        q: "Does the generator handle structural feasibility or just spatial fit?",
        a: "It reasons about spatial fit — adjacencies, light, circulation — and nothing beyond: no beam sizing, no span checks. Treat the output as a viable layout to take to a structural engineer rather than a structurally vetted plan; the phases stay separate on purpose.",
      },
      {
        q: "Can I steer the generator with a sketch instead of a written brief?",
        a: "Yes. A sketched bubble diagram or rough massing works as a soft constraint: the options follow your sketched intent without being forced to match it exactly. Think of it as a steering input, not a stencil.",
      },
    ],
  },
  {
    slug: "freelancers-and-homeowners",
    title: "Freelancers & Homeowners",
    lead: "Turn a rough idea or a photo of an existing plan into a labeled floor plan in under thirty minutes. One person, one browser tab, no seat bundles, whether you draft for clients or for your own four walls.",
    features: [
      {
        title: "No need to start from scratch",
        body: "The plan usually exists before you do — so begin there. PDF, print or photo, whatever shape it is in, it comes back as clean geometry you can edit within minutes.",
        bullets: [
          "PDF, printed plan or photo as the starting point",
          "Editable geometry returned in minutes",
          "Renovation work starts from what exists",
        ],
      },
      {
        title: "Visualize before you decide",
        body: "Watch the space take shape visually before anything is committed. No guessing from a 2D drawing — and no expensive surprises once the build starts.",
        bullets: [
          "Realistic views generated straight from the plan",
          "Decisions made on pictures, not on guesswork",
          "Changes are cheapest at this stage",
        ],
      },
      {
        title: "From start to finish - in one tool",
        body: "One place carries the whole job, first plan to final image — no stitching a project together across three tools just to see it finished.",
        bullets: [
          "Trace, draft and visualize in the same tab",
          "Nothing exported-and-reimported between steps",
          "The output is ready to share at the end of the session",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Starting point", "Existing plan traced in minutes", "Redrawn from scratch"],
        ["Hardware", "Any laptop with a browser", "A CAD-spec machine"],
        ["Visualisation", "Generated from the plan itself", "A separate tool — or imagination"],
        ["Pricing", "One active editor: you", "Licences, seats and bundles"],
        ["Learning curve", "First usable layout in an afternoon", "Training before the first drawing"],
      ],
    },
    crossLinks: [
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
      { label: "Space visualization", href: "/solutions/space-visualization" },
    ],
    pathCards: [
      { label: "Start with your own plan", href: "/register", note: "Photo or PDF in, editable plan out" },
      { label: "Sketch it from nothing", href: "/register", note: "Open a blank canvas and draft" },
      { label: "Talk to the team", href: "/resources/partners", note: "For anything unusual" },
    ],
    faqs: [
      {
        q: "I freelance for several clients at once, how does pricing work for me?",
        a: "The bill covers a single active editor: you. Clients read and comment through viewer links without ever taking a seat, and a collaborator can be given temporary editor access per project or phase — revoked again once the engagement closes.",
      },
      {
        q: "Does it run on my own laptop without a workstation?",
        a: "Yes. Everything runs in the browser, with heavy rendering offloaded to servers when needed. Even a 2018-era machine on integrated graphics copes with a typical project — the hardware budget stays in your pocket.",
      },
      {
        q: "I have never used a design tool before, is Synaps actually usable for me?",
        a: "Onboarding starts with one room and nothing else. The typical homeowner has a first usable layout within half an hour — if you can rearrange shapes in a Notion page, you can drive Synaps.",
      },
      {
        q: "How do I bring in my existing house plan as a starting point?",
        a: "Start from a photo or a scan of the plan in a fresh project, then fix the scale by clicking both endpoints of a dimension you know — the front door usually serves. Trace the walls and add rooms on top of the photo.",
      },
    ],
  },
  {
    slug: "interior-designers",
    title: "Interior Designers",
    lead: "Lay out rooms, drop your own furniture and finishes as native blocks, and tag each one with vendor, lead time, and price. Swap a chair once and it updates everywhere it lives in the project.",
    features: [
      {
        title: "Make your existing floor plan editable",
        body: "The space predates the project — so skip the redraw. Feed in the PDF or the photo and a clean, editable layout comes back, ready for the actual design work.",
        bullets: [
          "Existing plan in, editable layout out",
          "Minutes rather than a redrafting afternoon",
          "Design work starts on day one",
        ],
      },
      {
        title: "Find every asset in one library",
        body: "The whole furnishing palette lives in a single library. Browse it, drag onto the drawing, and set how each item draws so the plan matches your studio's brand.",
        bullets: [
          "Browse, drag and drop onto the plan",
          "Graphic representation matched to your brand",
          "Your own supplier items become native blocks",
        ],
      },
      {
        title: "Visuals without the 3D modeling",
        body: "The layout becomes a realistic view of the finished room with no 3D software involved. No modelling, no render pipeline — just a prompt between the plan and the picture.",
        bullets: [
          "Finished-space views straight from the plan",
          "No modelling, no render pipeline to learn",
          "Quality that carries a concept review",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Starting plan", "PDF or photo made editable", "Redrawn in CAD first"],
        ["Furniture & finishes", "Native blocks with tags, one library", "Symbols plus a separate spreadsheet"],
        ["Visuals", "Generated from the plan, no 3D work", "Modelled and rendered per view"],
        ["Schedules", "Tags and exports stay in sync with the plan", "Reconciled by hand, eventually"],
        ["Options", "Variants sharing one shell", "Duplicated files that drift apart"],
      ],
    },
    crossLinks: [
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
      { label: "Space visualization", href: "/solutions/space-visualization" },
      { label: "Client collaboration", href: "/solutions/client-collaboration" },
    ],
    pathCards: [
      { label: "Import the plan you have", href: "/register", note: "Photo or PDF, editable in minutes" },
      { label: "Furnish from the library", href: "/register", note: "Drag, drop, tag and schedule" },
      { label: "Talk to the team", href: "/resources/partners", note: "For studios with deep asset libraries" },
    ],
    faqs: [
      {
        q: "Can I work with my existing furniture and material library?",
        a: "Yes — supplier PDFs, fabric photos, finish samples: all importable as your own native blocks. Tag them, and one chair can appear across every room layout; swap it once and each occurrence updates.",
      },
      {
        q: "How do I show three layout options to a client in one meeting?",
        a: "Duplicate the plan into option variants. The copies sit next to each other on one canvas over a shared shell, so a change to the existing layout flows into all of them. Present each option fullscreen in the meeting, no app-switching.",
      },
      {
        q: "Does Synaps handle FF&E schedules and ordering specs?",
        a: "Every furniture block can carry vendor, lead time and price, and the schedule exports to CSV or PDF. Ordering stays yours, but the list is generated from the plan — delete an item there and the schedule follows suit.",
      },
      {
        q: "Is the visual quality good enough for client signoff renders?",
        a: "Yes, at the schematic and concept stage — the in-canvas output carries most signoff conversations. For photoreal final renders, send the spaces to your usual render engine and keep the spec list anchored to the plan.",
      },
    ],
  },
  {
    slug: "precise-drafting",
    title: "Precise drafting",
    lead: "Draw to 1 mm snap in metric or imperial, with dimensions computed from the geometry so a tape measure against the printout reads true. Your layer names, line weights, and hatching come from your own studio template.",
    features: [
      {
        title: "Drawings worth presenting",
        body: "Define the line weights, hatching and annotation style a single time; every subsequent drawing obeys. The set that results carries your studio's familiar hierarchy and clarity — not the installer's defaults.",
        bullets: [
          "Line weights, hatches and annotations defined once",
          "Every drawing in the set follows suit",
          "Your studio's standards, not the installer's",
        ],
      },
      {
        title: "Configurable elements",
        body: "A wall is composed, not sketched: structure through to finish, layer by layer. Openings go further — sashes, transoms, opening mechanisms — all configured without the long input lists BIM usually demands.",
        bullets: [
          "Walls composed from structure to finish",
          "Sashes, transoms and opening mechanisms on openings",
          "None of BIM's input overhead",
        ],
      },
      {
        title: "Export to any format",
        body: "Drawings leave as DWG, DXF or PDF, openable in whatever your collaborators run. And because nothing freezes, whoever is next continues from your last line rather than from a flat export.",
        bullets: [
          "DWG, DXF and PDF out of the same model",
          "Opens cleanly in your collaborators' tools",
          "Nothing frozen into a dumb export",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Precision", "1 mm snap, metric or imperial", "Bounded by the tool's unit setup"],
        ["Standards", "Your template's layers and weights", "The software's defaults"],
        ["Elements", "Layered walls and sashed windows, few inputs", "Full BIM input lists"],
        ["Dimensions", "Computed from geometry, auto-updating", "Hand-typed tags that drift"],
        ["Exchange", "DWG, DXF and PDF out", "Translator and plugin roulette"],
      ],
    },
    crossLinks: [
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
      { label: "Space visualization", href: "/solutions/space-visualization" },
    ],
    pathCards: [
      { label: "Set up your studio template", href: "/register", note: "Layers, weights and hatching, once" },
      { label: "Draft your first plan", href: "/register", note: "Open the console at 1 mm snap" },
      { label: "Talk to the team", href: "/resources/partners", note: "For standards migration" },
    ],
    faqs: [
      {
        q: "What scales and units does the drafting environment support?",
        a: "Metric and imperial, switchable per project. Drawing scales run 1:1 through 1:200, and grid snap increments reach 1 mm or 1/32\". Dimensions update themselves when the geometry moves, which eliminates the forgotten-tag class of error.",
      },
      {
        q: "Can I keep my drafting standards, layer names, line weights, hatching?",
        a: "Yes. Set up a studio template — layer taxonomy, line-weight scale, hatching set — and new projects are born from it. Template updates made later propagate into ongoing projects when you ask.",
      },
      {
        q: "How accurate are dimensions and areas at print time?",
        a: "Dimensions are computed from the geometry, not typed by hand. Print at 1:50 and measuring the paper against the source checks out; computed areas agree with an external GFA audit down to two decimal places.",
      },
      {
        q: "Does it export DWG cleanly for collaborators who still use AutoCAD?",
        a: "Yes — the DWG path keeps layers, line weights, blocks and dimensions intact and opens cleanly in AutoCAD 2018 and newer. Round-trip tests against AutoCAD run weekly, so hand-offs do not degrade the drawing.",
      },
    ],
  },
  {
    slug: "real-estate-professionals",
    title: "Real Estate Professionals",
    lead: "Turn a phone photo of a paper plan into a clean, labeled floor plan you can export for an MLS listing or a buyer packet. No architect on staff required.",
    features: [
      {
        title: "Editable floor plans from any image",
        body: "Whether the job is a renovation, an extension or a redesign, the starting point is a plan that already exists. Give it the PDF or the photo and the editable version comes back seconds later.",
        bullets: [
          "Any image of the plan works as input",
          "Clean, editable geometry in seconds",
          "Label and style it for the listing",
        ],
      },
      {
        title: "Test floor-plan arrangements",
        body: "Write down what the space needs to be and an editable layout arrives on the spot. Arrange it differently, weigh the variants, and put the unit's potential in front of the client.",
        bullets: [
          "Layouts generated from a description",
          "Arrangements tested before committing",
          "The potential of a unit made visible",
        ],
      },
      {
        title: "Client-ready visualizations",
        body: "Offer more than the bare plan without ever modelling in 3D — furnished, realistic views generated from the drawing in seconds.",
        bullets: [
          "Furnished visuals straight from the plan",
          "No 3D modelling involved",
          "Marketing-ready in the same session",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Plan for a listing", "Photo traced to a clean labelled plan", "Outsourced redraft or a raw scan"],
        ["Layout studies", "Variants forked from one shell", "One layout, take it or leave it"],
        ["Visuals", "Furnished views from the drawing", "Staging photos or nothing"],
        ["Sharing", "Viewer link, no signup", "PDF attachments in email"],
        ["Speed", "Same-session turnaround", "Days of vendor ping-pong"],
      ],
    },
    crossLinks: [
      { label: "Client collaboration", href: "/solutions/client-collaboration" },
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
    ],
    pathCards: [
      { label: "Turn a photo into a plan", href: "/register", note: "Scale it, trace it, list it" },
      { label: "Generate layout options", href: "/register", note: "Describe the unit, compare variants" },
      { label: "Talk to the team", href: "/resources/partners", note: "For agencies with many listings" },
    ],
    faqs: [
      {
        q: "Can I produce a marketing-ready floor plan from a phone photo of a paper plan?",
        a: "Yes. Put the photo into a project, anchor the scale on a dimension you know — a door, a stair — and trace it. What you get is editable geometry: tidy it, label it, and export it as a high-resolution image for the listing, the brochure or the buyer packet.",
      },
      {
        q: "Do I need an architect on staff to use this productively?",
        a: "No — solo real-estate users are one of the most common profiles here. The feature set targets plan readability and spatial clarity — not construction documentation — meaning a leasing agent or a property scout can carry a project end to end.",
      },
      {
        q: "How do I compare three layout strategies for a vacant unit?",
        a: "Draw the shell once and fork it into three variants — say one-bedroom, studio and co-living — then gather them on one comparison page for the owner. Square footage and room counts recalculate per variant.",
      },
      {
        q: "Can I share a plan with a buyer who has never used a CAD tool?",
        a: "Yes. Share a viewer link — the recipient needs no signup. The buyer can pan and zoom, flip between variants and drop pinned questions on the drawing, and you are told when they looked and where they lingered.",
      },
    ],
  },
  {
    slug: "space-visualization",
    title: "Space visualization",
    lead: "Step a camera through the space at eye level straight from the plan, record a 30-second walkthrough, or run a daylight study from latitude, date, and orientation. No separate model to keep in sync.",
    features: [
      {
        title: "Renders that match the floor plan",
        body: "Drop a camera anywhere in the plan and the view that comes back is the space at true scale. These are visuals generated to the plan's own dimensions — not generic AI images that resemble your design only vaguely.",
        bullets: [
          "Camera placed anywhere, at eye level",
          "Views true to the plan's scale",
          "The space you drew, not a lookalike",
        ],
      },
      {
        title: "Explore every design decision",
        body: "Each view can spawn the next: isolate a region, reprompt, follow a different lead. However many options it takes, you converge on the right decision sooner.",
        bullets: [
          "Branch and isolate from any generated view",
          "Reprompt to explore the next direction",
          "More decisions tested per hour",
        ],
      },
      {
        title: "Consistent visuals from different angles",
        body: "A new camera position does not reset the look: style and scale carry over from the first render. The set of views reads as one coherent project, not a collage.",
        bullets: [
          "Style and scale preserved across angles",
          "Views that visibly belong together",
          "A presentation, not a collage",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Source of visuals", "The plan itself, always in sync", "A separate model per render"],
        ["First view", "Camera placed, image returned", "Model, light, render, repeat"],
        ["Option studies", "Branch and reprompt per view", "Every variant re-rendered"],
        ["Angles", "Consistent style across all of them", "Restyled from scratch each time"],
        ["Handoff", "OBJ or FBX with layers intact", "Geometry rebuilt in the render engine"],
      ],
    },
    crossLinks: [
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
      { label: "Automated floor plan tracing", href: "/solutions/automated-floor-plan-tracing" },
      { label: "Floor plan generation", href: "/solutions/floor-plan-generation" },
    ],
    pathCards: [
      { label: "Render your first view", href: "/register", note: "Place a camera in the plan" },
      { label: "Draft the plan behind it", href: "/register", note: "Open the canvas and draw" },
      { label: "Talk to the team", href: "/resources/partners", note: "For studios with heavy viz needs" },
    ],
    faqs: [
      {
        q: "What level of visual fidelity does Synaps produce in-canvas?",
        a: "Schematic to concept-render quality — materials read convincingly, light behaves like light — good for early-phase client reviews and internal massing studies, but not photoreal. For photoreal work, hand off to your render engine with the geometry pre-cleaned.",
      },
      {
        q: "Can I generate a quick walkthrough for a client presentation?",
        a: "Yes. The walkthrough moves a virtual camera at eye height through the space — capture a 30-second clip, or hop from room to room by clicking the plan. Plenty of studios run it instead of a static section perspective at the second review.",
      },
      {
        q: "Do you handle daylight studies or just material rendering?",
        a: "Daylight is in scope, within limits: choose latitude, date, time and orientation, and Synaps works out shadow studies and sunlight-hours visualisations against your geometry — fit for site-specific design decisions, not a substitute for a formal daylight-credit analysis.",
      },
      {
        q: "Can I export the visual to Rhino, 3ds Max, or Blender for further work?",
        a: "Yes — OBJ and FBX both export, materials and lights included, with the layer structure intact so the renderer can reassign shaders without re-tagging geometry. One file across the wall to the render specialist, not a rebuild.",
      },
    ],
  },
  {
    slug: "students-and-educators",
    title: "Students & Educators",
    lead: "Get to a buildable plan in an afternoon. The drawing model is closer to Figma than to AutoCAD, no command line, no layer politics, and it is free for the whole degree with a .edu email.",
    features: [
      {
        title: "Never start from a blank page",
        body: "Write the brief — the rooms and sizes you need — and a complete editable plan lands in seconds. From there it is yours: push walls around, add rooms, keep designing.",
        bullets: [
          "A written brief instead of a blank canvas",
          "Complete editable geometry in seconds",
          "Studio time spent designing, not drafting",
        ],
      },
      {
        title: "Work from any laptop",
        body: "The app lives wholly in the browser: no installer, no update prompts. Any machine that can run a browser runs Synaps, so whatever laptop you already have will do.",
        bullets: [
          "No install, no updates, no licence server",
          "Runs in the campus library as at home",
          "Your existing laptop is the workstation",
        ],
      },
      {
        title: "Collaborative group projects",
        body: "The whole group draws on one shared sheet — from the studio, from home, from another campus. No emailed files, no version confusion, and no one absorbing all the drafting.",
        bullets: [
          "Same drawing, live, from anywhere",
          "Contributions visible per person",
          "The group's file is always the current one",
        ],
      },
    ],
    compare: {
      head: ["Area", "With Synaps", "The usual stack"],
      rows: [
        ["Cost while studying", "Free Pro licence with a .edu email", "Student licences renewed yearly"],
        ["Install", "None — it is a browser tab", "Multi-gigabyte CAD installs"],
        ["Learning curve", "A drawing model like a design tool", "Commands and layer politics"],
        ["Group work", "One shared drawing, live", "Files emailed between versions"],
        ["Starting point", "Generated plan to develop", "The blank page"],
      ],
    },
    crossLinks: [
      { label: "Space visualization", href: "/solutions/space-visualization" },
      { label: "Client collaboration", href: "/solutions/client-collaboration" },
      { label: "Precise drafting", href: "/solutions/precise-drafting" },
    ],
    pathCards: [
      { label: "Claim your student licence", href: "/register", note: "Free Pro with a university email" },
      { label: "Start a studio project", href: "/register", note: "Generate, then make it yours" },
      { label: "Talk to the team", href: "/resources/partners", note: "For course and cohort setup" },
    ],
    faqs: [
      {
        q: "Is Synaps free while I am still in school?",
        a: "Yes — an enrolled architecture student with a .edu or university-issued email receives Pro free of charge, and the licence lasts the whole degree. Proof is submitted once; nobody asks again before graduation.",
      },
      {
        q: "How steep is the learning curve before I can submit my first studio project?",
        a: "Expect a buildable plan on day one, within one afternoon. The interaction model resembles a modern design tool — no command line, no layer politics, and not twenty modifier-key rituals standing between you and the first wall.",
      },
      {
        q: "How does Synaps work for a 24-student studio course?",
        a: "Every student holds an individual free educational licence; the instructor sees the cohort's project tiles in one roster grid and can slip into any plan to pin a comment in seconds. A curated starter set can be cloned to all of them when the semester starts.",
      },
      {
        q: "Can I assign templates and starter geometry for an assignment?",
        a: "Yes. Compose a master template — site, scale bar, hatch standards, layer scheme — and push it to the cohort with a single click. Students each fork a copy, the original stays pristine for next year, and a one-menu reset restores the baseline.",
      },
    ],
  },
];
