import type { CareerData } from "./types";

/**
 * Company + careers content.
 *
 * PROVENANCE: role titles, section headings and team names are
 * transcribed from the harvest of /company/ and /company/careers/…;
 * all body copy is original.
 */

export const companyBlocks = {
  whatSynapsDoes: [
    {
      title: "Create and edit floor plans",
      body: "Draft dimension-driven 2D plans on a canvas built for architecture — walls, openings and rooms that behave like the objects they represent.",
    },
    {
      title: "Explore designs with AI",
      body: "Generate plan options from a brief and restyle them with materials, furniture and lighting until one is worth drawing properly.",
    },
    {
      title: "Prepare client presentations",
      body: "Turn the same drawing into the meeting: relight, annotate and present, then hand it to the client's phone.",
    },
  ],
  whatMakesItDifferent: [
    {
      title: "Start with the files you have",
      body: "DXF, PDF and image files import and trace into editable geometry, so day one starts from what already exists.",
    },
    {
      title: "Keep the plan editable",
      body: "Nothing you do freezes the drawing — generation and styling write back into the same editable objects you draft with.",
    },
    {
      title: "Present the same project",
      body: "Drafting, visualisation and presentation are one pipeline, not three exports.",
    },
  ],
  whoUsesIt: [
    { title: "Architects and architecture studios", body: "From solo practitioners to teams running parallel options studies." },
    { title: "Interior designers", body: "Finishes, furniture and lighting explored on the plan itself." },
    { title: "Property developers", body: "Quick layout tests and marketing-ready visuals from one source." },
  ],
  howToStart: [
    { title: "Create your account", body: "Freemium, no card — 300 signup credits and 30 a day to try the workflows." },
    { title: "Bring in your starting point", body: "Import a DXF or trace a scanned plan; the geometry becomes editable." },
    { title: "Develop and present", body: "Draft, generate options, polish, then present from the same model." },
  ],
  keyFacts: [
    "Three plans: Freemium, Pro (€59/49 per editor), Studio (€119/99 per editor)",
    "Trusted by 80,000 architects worldwide",
    "80,000-strong community across Instagram, LinkedIn and YouTube",
    "Book a call with the team via the site's cal.com link",
  ],
  beliefs: [
    "Fast is more — responsive tools change what you attempt.",
    "Prioritising design craft — software should get out of the way.",
    "The blueprint of architecture: drawing is still the core act.",
  ],
};

export const careers: CareerData[] = [
  {
    slug: "frontend-engineer-2d-editor",
    title: "Frontend Engineer, 2D Editor (Geometry)",
    location: "Remote (Europe)",
    team: "Engineering",
    type: "Full-time",
    lead: "Own the geometry core of the 2D editor — the code that makes walls snap, rooms compute and drawings feel instant.",
    sections: [
      {
        h2: "What you'll work on",
        paras: [
          "The editor's geometry layer: snapping, constraints, area computation and the interaction model between pointer events and drawing objects. The work the user feels as 'it just draws right'.",
        ],
        list: [
          "Wall, door and window placement with snap and absorb behaviour",
          "Room polygon computation and live area labels",
          "Selection, move and transform ergonomics on large drawings",
        ],
      },
      {
        h2: "Our stack",
        paras: [
          "A modern TypeScript web app: React on the surface, canvas/WebGPU rendering underneath, geometry computed in the browser with Rust/WASM where it pays.",
        ],
      },
      {
        h2: "What you bring",
        list: [
          "Several years building interactive 2D editing surfaces (CAD, diagramming, design tools)",
          "Comfortable computational geometry — you know why floating-point snaps drift",
          "Care for the last 16 milliseconds",
        ],
      },
      {
        h2: "Nice to have",
        list: [
          "DXF/DWG format experience",
          "WebGPU or WebGL rendering work",
          "Contributions to an open-source editor",
        ],
      },
      {
        h2: "How we work",
        paras: [
          "Small team, written-first, weekly release notes to users. Weekly product changes" + " ship every Tuesday.",
        ],
      },
      {
        h2: "Perks and benefits",
        list: [
          "Remote-first within European hours",
          "Realistic on-call (the release notes brag about reconnects, not heroics)",
          "Hardware of your choice, learning budget",
        ],
      },
      {
        h2: "Hiring process",
        list: [
          "Intro call (30 min)",
          "Craft conversation about a past editing surface you built",
          "Paid work sample on a toy editor",
          "Team conversations and offer",
        ],
      },
    ],
  },
  {
    slug: "architectural-designer",
    title: "Architectural Designer",
    location: "Remote (Europe)",
    team: "Design",
    type: "Working student",
    lead: "The role design students dream of: paid to explore, iterate and design — without clients breathing down the process or coursework constraining the brief — with the output shipping inside a product used by thousands.",
    sections: [
      {
        h2: "What you'll work on",
        paras: [
          "The job straddles design practice and product: you shape what Synaps shows and, in part, what it is.",
        ],
        list: [
          "Architectural layouts and presentations across formats — residential, commercial, mixed-use and beyond",
          "A growing library of architectural templates and assets",
          "Example projects and reference designs used by thousands of users",
          "Content production with Synaps and its influencers: educational material, demos, showcases",
          "Close collaboration with product and engineering to improve the editor from real design workflows",
        ],
      },
      {
        h2: "What you bring",
        list: [
          "Real intellectual curiosity about architecture and interior design",
          "A love of clear, well-crafted architectural drawings",
          "Confident design and CAD skills",
          "Time spent in AutoCAD, Archicad or Revit",
          "Working knowledge of Illustrator, Photoshop or Figma",
          "Enrolled in an architecture or interior design Bachelor's or Master's right now",
          "Curiosity about new digital tools, workflows and ways of designing",
        ],
      },
      {
        h2: "Nice to have",
        list: [
          "An interest in typologies, modularity and architectural systems",
          "Happy to experiment with unfamiliar tools and workflows",
          "Enjoys explaining design ideas visually",
        ],
      },
      {
        h2: "How we work",
        paras: [
          "Early-stage and deliberate about it: responsibility lands on you quickly, feedback arrives just as fast, and what you make reaches thousands of professionals. Craft, clarity and practical impact are the currencies here.",
        ],
      },
      {
        h2: "Perks and benefits",
        list: [
          "Competitive compensation",
          "Flexible, trust-based working hours around your studies",
          "Team offsites worth travelling to",
          "A device of your choice",
          "Five weeks of paid leave",
        ],
      },
      {
        h2: "Hiring process",
        list: [
          "Send your CV and portfolio by email",
          "Screening call (30 min, remote)",
          "Design deep dive (2 hours, remote or in person)",
          "Meet the team (2 hours, remote or in person)",
        ],
      },
    ],
  },
  {
    slug: "backend-engineer-realtime",
    title: "Backend Engineer, Real-time infrastructure",
    location: "Remote (Europe)",
    team: "Engineering",
    type: "Full-time",
    lead: "Own the real-time layer beneath collaborative editing: rooms, presence, synchronization and the recovery paths that make multiplayer drafting feel instant.",
    sections: [
      {
        h2: "What you'll work on",
        paras: [
          "You own the real-time layer that collaborative editing runs on: presence that feels instant, edits that stay in sync, and sessions that recover without drama when networks or clients misbehave.",
        ],
        list: [
          "WebSocket servers for real-time collaboration, built with PartyKit on Cloudflare",
          "Room lifecycle design — what state is ephemeral, what persists",
          "Presence: live cursors, selections and updates",
          "Flows for reconnect, resync and conflict recovery",
          "CRDT-driven synchronization (Loro; Yjs familiarity welcome)",
          "Fan-out, batching, throttling and backpressure",
          "A room architecture on Durable Objects",
        ],
      },
      {
        h2: "Our stack",
        list: [
          "TypeScript",
          "PartyKit",
          "Cloudflare Workers and Durable Objects",
          "WebSockets",
          "CRDTs (Loro, Yjs concepts)",
          "A React and XState frontend you integrate with rather than build",
        ],
      },
      {
        h2: "What you bring",
        list: [
          "Strong background in real-time or shared-state systems",
          "Comfort running and designing stateful WebSocket services",
          "A good instinct for event ordering, consistency and failure modes",
          "Hands-on CRDT experience, or a firm theoretical grasp",
          "Production operations scars and an appetite for edge-case debugging",
          "A habit of designing for correctness, not only latency",
        ],
      },
      {
        h2: "Nice to have",
        list: [
          "Background in collaborative editors, multiplayer products or document systems",
          "Familiarity with Cloudflare Workers or Durable Objects",
          "An interest in distributed systems where UX correctness is the point",
        ],
      },
      {
        h2: "How we work",
        paras: [
          "Startup-mode: real ownership, fast movement, core product. Collaboration sits at the heart of what Synaps ships, so this codebase decides how teams design together.",
        ],
      },
      {
        h2: "Perks and benefits",
        list: [
          "Competitive compensation",
          "Flexible, trust-based work setup",
          "Relocation and visa support",
          "Team offsites worth travelling to",
          "A device of your choice",
          "Five weeks of paid leave",
        ],
      },
      {
        h2: "Hiring process",
        list: [
          "Screening call (30 min, remote)",
          "Technical assignment (3–4 hours, remote or in person)",
          "Founders interview (1 hour, remote or in person)",
          "Meet the team (2 hours, remote or in person)",
        ],
      },
    ],
  },
  {
    slug: "frontend-engineer-product-ui",
    title: "Frontend Engineer, Product UI",
    location: "Remote (Europe)",
    team: "Engineering",
    type: "Full-time",
    lead: "Build the surface around the editor — navigation, panels, modals, onboarding — where thoughtful design becomes an experience the user barely notices.",
    sections: [
      {
        h2: "What you'll work on",
        paras: [
          "The editor's UI and UX, implemented: everything users touch that is not the geometry core.",
        ],
        list: [
          "Pixel-perfect interfaces realised from Figma designs",
          "Interaction and motion specs turned into smooth, intuitive behaviour",
          "Consistency, responsiveness and accessibility held across the product",
          "Interactions refined with product designers mid-implementation",
          "Polished features shipped end to end alongside product and engineering",
          "The design system and UI primitives, maintained and extended",
        ],
      },
      {
        h2: "Our stack",
        list: [
          "React and TypeScript",
          "Tailwind CSS",
          "Component-driven UI architecture",
          "Figma as the source of truth for design",
          "Daily collaboration between product design and frontend engineering",
        ],
      },
      {
        h2: "What you bring",
        list: [
          "Strong track record shipping production UIs in React",
          "Deep ease with CSS and layout, Tailwind or equivalent",
          "Fluency in animation and micro-interactions",
          "A sharp eye for spacing, alignment, typography and hierarchy",
          "Experience with complex interaction states and transitions",
          "Comfort working from Figma, shoulder to shoulder with designers",
          "An obsession with quality, polish and pixel-level detail",
          "Speed that does not come from cutting corners",
        ],
      },
      {
        h2: "Nice to have",
        list: [
          "Some design experience of your own",
          "UI work on Figma-like editors",
          "An interest in creative tools and design-heavy products",
        ],
      },
      {
        h2: "How we work",
        paras: [
          "Startup-mode: real ownership and fast shipping, with design and engineering working side by side rather than handing work over the wall.",
        ],
      },
      {
        h2: "Perks and benefits",
        list: [
          "Competitive compensation",
          "Flexible, trust-based work setup",
          "Relocation and visa support",
          "Team offsites worth travelling to",
          "A device of your choice",
          "Five weeks of paid leave",
        ],
      },
      {
        h2: "Hiring process",
        list: [
          "Screening call (30 min, remote)",
          "Technical assignment (3–4 hours, remote or in person)",
          "Founders interview (1 hour, remote or in person)",
          "Meet the team (2 hours, remote or in person)",
        ],
      },
    ],
  },
  {
    slug: "fullstack-engineer-data-conversion",
    title: "Fullstack Engineer, Data Conversion",
    location: "Remote (Europe)",
    team: "Engineering",
    type: "Full-time",
    lead: "Own the machinery that moves architectural files in and out of Synaps — DXF, DWG, SVG and their relatives, converted faithfully and at scale.",
    sections: [
      {
        h2: "What you'll work on",
        paras: [
          "The bridge between Synaps and the wider architectural ecosystem: pipelines that bring industry-standard file formats into the core data model — and take them back out.",
        ],
        list: [
          "Import/export pipelines for vector and CAD/BIM formats — DXF, DWG, PLN, SVG, RVT and more",
          "Mapping external file structures onto Synaps's internal data model, and back",
          "Conversion workflows placed in the frontend or the backend as constraints dictate",
          "External conversion APIs and services, integrated",
          "Validation, error handling and data integrity through the conversion",
          "Pipelines that stay fast as they scale",
          "Fidelity and correctness held together with the editor and infrastructure teams",
        ],
      },
      {
        h2: "Our stack",
        list: [
          "TypeScript",
          "Node.js and Deno as backend runtimes",
          "React for frontend integration",
          "External conversion APIs and services",
          "An internal domain-specific data model for architectural geometry",
          "Cloud infrastructure that evolves with scale",
        ],
      },
      {
        h2: "What you bring",
        list: [
          "Strong fullstack or backend-leaning engineering background",
          "Familiarity with file formats, parsers, serializers and transformation pipelines",
          "Hands-on time in Node.js, Deno or similar runtimes",
          "Comfort mapping complex data models to and from foreign formats",
          "The judgement to place logic — frontend or backend — and defend the why",
          "Care for correctness, edge cases and real-world messy data",
          "Pragmatism: a reliable system beats a perfect abstraction",
        ],
      },
      {
        h2: "Nice to have",
        list: [
          "Time with CAD, BIM or vector formats — DXF, DWG, SVG, IFC and kin",
          "Familiarity with architectural and design software ecosystems",
          "Third-party file-processing APIs, integrated before",
          "An interest in interoperability and standards-heavy territory",
        ],
      },
      {
        h2: "How we work",
        paras: [
          "Startup-mode, with full ownership of the systems that decide how users' existing work arrives in Synaps — and how it leaves.",
        ],
      },
      {
        h2: "Perks and benefits",
        list: [
          "Competitive compensation",
          "Flexible, trust-based work setup",
          "Relocation and visa support",
          "Team offsites worth travelling to",
          "A device of your choice",
          "Five weeks of paid leave",
        ],
      },
      {
        h2: "Hiring process",
        list: [
          "Screening call (30 min, remote)",
          "Technical assignment (3–4 hours, remote or in person)",
          "Founders interview (1 hour, remote or in person)",
          "Meet the team (2 hours, remote or in person)",
        ],
      },
    ],
  },
];
