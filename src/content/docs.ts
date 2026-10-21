import type { DocsPageData } from "./types";

/**
 * Documentation content for /docs (the GitBook-style section).
 *
 * PROVENANCE: all 20 pages of docs.synaps.app are covered. Group names,
 * page titles, section headings (h2) and subsection headings (h3) follow
 * the harvested outline of docs.synaps.app; short factual strings (paper
 * sizes, timestamps, credits, chapter titles) are transcribed from the
 * harvest. All step-by-step text is original writing for the clone's
 * simulated surface — where the clone simulates (or omits) a feature, the
 * page says so once, in the style of the exemplar below.
 */
export const docsPages: DocsPageData[] = [
  /* ------------------------------ Get started ----------------------- */
  {
    slug: "get-started",
    group: "Get started",
    title: "Get started with Synaps",
    lead: "From an empty account to your first drawing in one sitting.",
    sections: [
      {
        h2: "New to Synaps?",
        paras: [
          "Sign in, answer the short questionnaire, and you land in a team workspace with a starter model seeded from your answers — unless you choose to start fresh.",
        ],
        list: [
          "Sign in with Google (simulated in the clone)",
          "Finish the 8-question welcome flow",
          "Open the starter model from Continue working, or start from scratch",
        ],
      },
      {
        h2: "Create your first drawing",
        paras: [
          "Pick the Wall tool and draw the outline of a room — walls snap to the grid and to each other. Drop a door onto a wall and it absorbs, with a swing arc. Rooms label themselves with live area as they close.",
        ],
      },
      {
        h2: "Open your first project",
        paras: [
          "The team home lists everything under Continue working. Models group pages; pages are separate sheets inside one model. Open any page to resume exactly where it was left.",
        ],
      },
      {
        h2: "Choose a first task",
        paras: [
          "The team home asks “What are we creating today?” and offers four starting points:",
        ],
        list: [
          "Start from scratch — an empty canvas in the drafting console",
          "Upload floorplan — bring in an image, PDF, SVG, DXF or DWG to trace (simulated pipeline in the clone)",
          "Generate with AI — describe the plan you want and let the mock generator draft it",
          "Start from a template — instantiate a starter plan such as the corner café or the townhouse",
        ],
      },
    ],
  },
  {
    slug: "get-started/create-your-first-drawing",
    group: "Get started",
    title: "Create your first drawing",
    lead: "A five-minute rectangle-and-circle exercise that teaches the gestures every drawing relies on.",
    sections: [
      {
        h2: "Before you start",
        paras: [
          "Open a project with Start from scratch from the team home — you need editing access. The original tutorial drives its Rectangle (R) and Circle (O) tools; the clone's palette is architectural, so the exercise uses the closest equivalents (simulated in the clone).",
        ],
        subsections: [
          {
            h3: "Draw the rectangle",
            paras: [
              "Take the Room tool and drag out a 4 m × 3 m rectangle. The room reports its area live while you draw, so you can stop at 12 m², and grid snapping keeps the edges on the 0.5 m grid.",
            ],
          },
          {
            h3: "Add the circle",
            paras: [
              "The clone has no circle tool. Pick the Asset tool, open the Kitchen category and place a dining table on empty canvas beside the rectangle — it stands in for the original's 0.5 m circle.",
            ],
          },
          {
            h3: "Move the circle",
            paras: [
              "Switch to Select and drag the table to a new position. The table moves; the rectangle stays where it was.",
            ],
          },
          {
            h3: "Undo and repeat",
            paras: [
              "Cmd/Ctrl+Z undoes the completed move and Cmd/Ctrl+Shift+Z redoes it — the toolbar carries Undo and Redo buttons alongside. Move the table again for practice.",
            ],
          },
        ],
      },
      {
        h2: "Check your result",
        paras: [
          "The canvas should hold exactly one rectangle and one circle-equivalent. If either is off-screen, zoom out with the wheel and pan — the Pan tool, middle-drag or Alt-drag — until both are in view.",
        ],
      },
      {
        h2: "Next step",
        paras: [
          "Move around the canvas until panning and zooming feel automatic, then open the drafting guide for walls, openings, dimensions and assets.",
        ],
      },
    ],
  },
  {
    slug: "get-started/open-your-first-project",
    group: "Get started",
    title: "Open your first project",
    lead: "Start a blank project, seed one from an upload, AI or a template, or pick up recent work.",
    sections: [
      {
        h2: "Start a new project",
        paras: [
          "The team home offers a starting point for each kind of task:",
        ],
        list: [
          "A blank canvas — Start from scratch",
          "A plan to trace — Upload floorplan (image, PDF, SVG, DXF, DWG)",
          "A plan described in words — Generate with AI (simulated in the clone)",
          "An example to explore — Start from a template, the clone's stand-in for the original's demo project",
        ],
      },
      {
        h2: "Reopen a recent project",
        paras: [
          "The Continue working row on the team home lists your models, freshest edit first. Click a card to open it at its first page; See all opens the full recent list. Renames persist, so a named page is findable later.",
        ],
      },
      {
        h2: "Organise your projects",
        paras: [
          "Models live in spaces — Residential Projects and the like — reachable from the team sidebar. In the console, double-click a page tab to rename it. The original product adds card actions for duplicating, moving and thumbnails; the clone keeps renaming and spaces.",
        ],
      },
      {
        h2: "What you'll see",
        paras: [
          "The project opens in the drafting console with the page bar, tool palette and canvas settings. Generate with AI opens the floorplan prompt before creating the model; Upload floorplan opens the import dialog directly. Free teams are capped at the displayed model limit — the banner appears when you reach it.",
        ],
      },
    ],
  },

  /* ------------------------------- Drafting -------------------------- */
  {
    slug: "drafting",
    group: "Draw and edit",
    title: "Draw and edit",
    lead: "The console's drafting tools — walls, rooms, openings, dimensions, text and assets — and the gestures that edit them.",
    sections: [
      {
        h2: "Correct and adjust",
        paras: [
          "Select clicks a shape and drags it somewhere else; Eraser removes it; Undo and Redo work from the keyboard (Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z) and the toolbar.",
          "The original editor additionally rotates, resizes, mirrors, offsets, trims and extends geometry — those operations are outside the clone's simulated palette. If this is your first time drawing, run the Create your first drawing exercise first.",
        ],
      },
      {
        h2: "Draw",
        paras: [
          "The clone's palette is the architectural set: Wall, Door, Window, Room, Text, Dimension and Asset, plus the lasso. The original product's Line, Polyline, Rectangle and Circle tools are documented on the real site and not part of the clone.",
        ],
        subsections: [
          {
            h3: "Draw to exact lengths and angles",
            paras: [
              "Canvas settings set the unit (m or ft), the precision and the grid — 0.5 m by default. Wall endpoints and shape corners snap to the grid, and rooms report their area live, so dimensions stay checkable while you draw.",
            ],
          },
        ],
      },
      {
        h2: "Build",
        subsections: [
          {
            h3: "Draw a wall",
            paras: [
              "The Wall tool chains two-click segments. Each wall carries its own construction line, and endpoints snap to other walls so corners close cleanly.",
            ],
          },
          {
            h3: "Define a room",
            paras: [
              "The Room tool drags out a rectangle that labels itself with live area. In Polish view a room can be restyled per material — see Assets and materials.",
            ],
          },
          {
            h3: "Add a door or window",
            paras: [
              "Doors and windows host themselves on a wall: two clicks place the opening, and a door draws its swing arc so you can read the clearance.",
            ],
          },
          {
            h3: "Add stairs",
            paras: [
              "The clone places stairs from the asset library's Others category rather than a dedicated stair tool; the original sets rectangular and spiral staircases by bounds.",
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------ AI workflows ----------------------- */
  {
    slug: "ai-workflows",
    group: "AI workflows",
    title: "AI workflows",
    lead: "Recipes that chain the AI tools into a full run — brief or scan in, an inspected result out.",
    sections: [
      {
        h2: "Turn a brief into an editable plan",
        paras: [
          "Start from the written requirements, generate a layout, then check and develop its editable geometry. In the clone, generation is the “Describe your floorplan…” dialog (simulated in the clone), so the workflow runs end to end on a mock generator.",
        ],
      },
      {
        h2: "Turn a scan into an editable drawing",
        paras: [
          "Import the scan, trace the useful regions, then compare the reconstruction with its source and verify dimensions before relying on it. The clone simulates the pipeline in the import dialog and marks lasso traces with their provenance.",
        ],
      },
      {
        h2: "Explore interior finishes",
        paras: [
          "A sequence of focused image edits — segmentation first, one finish decision at a time. Image editing is not simulated in the clone; the closest surface is the Draft/Polish switch with its per-room material picker.",
        ],
      },
      {
        h2: "Review before delivery",
        paras: [
          "Check dimensions and geometry on anything generated, and content and appearance on any generated or edited image — an image change never flows back into the editable drawing.",
          "Plan for the credit cost when a workflow chains generation with segmentation and repeat edits.",
        ],
      },
    ],
  },
  {
    slug: "ai-workflows/brief-to-editable-plan",
    group: "AI workflows",
    title: "Turn a brief into an editable plan",
    lead: "From written requirements to generated geometry you can keep editing.",
    sections: [
      {
        h2: "Before you start",
        paras: [
          "Open a project you can edit and have your room requirements — and any fixed boundary — ready. Check AI credits before generating. In the clone the generator is the “Describe your floorplan…” dialog: it wants at least twelve characters and offers example prompts to start from (simulated in the clone).",
        ],
      },
      {
        h2: "Steps",
        subsections: [
          {
            h3: "Write the brief",
            paras: [
              "Name the type of space, the rooms required and the relationships that matter most — for instance, bedrooms away from the entrance and a kitchen open to the living area.",
            ],
          },
          {
            h3: "Prepare the footprint",
            paras: [
              "If the boundary is fixed, draw the closed outline first — the original expects more than 20 m². The real product can then pick that outline as the generation boundary; the clone's generator produces its demo plan without a boundary pick.",
            ],
          },
          {
            h3: "Generate the plan",
            paras: [
              "Run the generator. The clone shows a short “Generating your floorplan…” pass and lands the result on the canvas when it finishes.",
            ],
          },
          {
            h3: "Review the layout",
            paras: [
              "Compare the result with the brief — circulation, room arrangement, openings and footprint — before investing effort in finishes.",
            ],
          },
          {
            h3: "Develop the drawing",
            paras: [
              "Measure the room sizes, move things around, fix a wall or an opening — then look at the junctions and dimensions again once you have.",
            ],
          },
        ],
      },
      {
        h2: "What you'll see",
        paras: [
          "An editable drawing: walls, rooms and openings you keep developing with the normal drafting tools, plus any furnishings the generator placed.",
        ],
      },
      {
        h2: "Decide what to do next",
        paras: [
          "Broadly right? Refine the drawing directly and prepare the deliverable.",
          "Missing a major requirement? Revise the brief — name the missing requirement — and check the cost before generating again.",
          "Want the interior appearance? Move to the visual side (in the clone, Draft/Polish): rendering produces an image, never a second editable plan.",
        ],
      },
    ],
  },
  {
    slug: "ai-workflows/explore-interior-finishes",
    group: "AI workflows",
    title: "Explore interior finishes",
    lead: "Test paints, flooring, materials and object swaps in an interior image, one decision at a time.",
    sections: [
      {
        h2: "Before you start",
        paras: [
          "Start from an existing interior image — generated or imported — and keep the original aside for comparison. Each edit alters the picture only; the editable drawing underneath is untouched. Segmentation and image edits are not simulated in the clone; the closest surface is the Draft/Polish switch, which restyles rooms by material.",
        ],
      },
      {
        h2: "Steps",
        subsections: [
          {
            h3: "Inspect the detected content",
            paras: [
              "Select the image and run Segment to list the objects and surfaces it detects.",
            ],
          },
          {
            h3: "Choose one design question",
            paras: [
              "Take one question at a time: a wall palette through Change paint, a patterned finish through Add/Change wallpaper.",
            ],
          },
          {
            h3: "Compare the result",
            paras: [
              "Inspect the edited area and its surroundings against your original before changing another surface.",
            ],
          },
          {
            h3: "Explore the next finish",
            paras: [
              "Continue with a flooring reference, an object's material or a replacement object, using the action that fits the detected content.",
            ],
          },
          {
            h3: "Review the complete image",
            paras: [
              "Re-segment once an edit has moved the picture far enough that the earlier detection stops making sense, then read the whole composition before using it in a presentation.",
            ],
          },
        ],
      },
      {
        h2: "What you'll see",
        paras: [
          "An image carrying the finishes you chose to test. Because each change was reviewed on its own — wall colour first, then floor, then one object — you can tell which decision actually moved the composition forward.",
        ],
      },
    ],
  },
  {
    slug: "ai-workflows/scan-to-editable-drawing",
    group: "AI workflows",
    title: "Turn a scan into an editable drawing",
    lead: "Rebuild a scanned plan as editable geometry, check it against its source, then keep drafting.",
    sections: [
      {
        h2: "Before you start",
        paras: [
          "Pick a legible image or PDF where walls and openings are visible, and know which plan you need when a page holds several. Keep a known dimension handy for checking — the review does not calibrate from a distance you type. In the clone, upload runs the simulated pipeline (page parse, vectorize, provenance merge) and the magnetic lasso marks traced rooms with their source (simulated in the clone).",
        ],
      },
      {
        h2: "Steps",
        subsections: [
          {
            h3: "Import the scan",
            paras: [
              "Upload the source through the import dialog and let the pipeline finish before touching the canvas.",
            ],
          },
          {
            h3: "Choose the regions",
            paras: [
              "Keep only the regions worth tracing: the run processes everything you retain, not merely the one currently highlighted.",
            ],
          },
          {
            h3: "Run the trace",
            paras: [
              "Start it once the scope and the credit requirements look right.",
            ],
          },
          {
            h3: "Compare with the source",
            paras: [
              "Set the editable result beside its reference image and work through the checklist: outer footprint, wall connections, doors, windows, room labels, any furniture that was detected.",
            ],
          },
          {
            h3: "Verify dimensions",
            paras: [
              "Measure a distance you know and a couple of room sizes; fix walls and openings where they disagree, and glance at the junctions again after every fix.",
            ],
          },
        ],
      },
      {
        h2: "What you'll see",
        paras: [
          "The canvas gains editable geometry alongside a cropped copy of the source, and from there the tracing behaves like any hand-drawn content. In the clone, lasso-traced rooms carry a “Traced area” provenance marker that records where the content came from.",
        ],
      },
      {
        h2: "When tracing is not the right route",
        paras: [
          "Keep the file as an image when you only need a visual reference. When detection finds nothing, tighten the crop or find a clearer source and try again — otherwise leave it in place and draw over it by hand.",
        ],
      },
    ],
  },

  /* ---------------------------- Import & export ---------------------- */
  {
    slug: "import-and-export",
    group: "Import and export",
    title: "Import and export",
    lead: "Bring reference images and editable drawings in, and send drawing sheets or images out.",
    sections: [
      {
        h2: "Import a drawing or image",
        paras: [
          "The import dialog accepts Image, PDF, SVG, DXF and DWG — DWG is entitlement-gated — and simulates the real product's worker pipeline before merging content onto the canvas with its provenance.",
        ],
      },
      {
        h2: "Export your drawing",
        paras: [
          "The export dialog offers PNG/SVG downloads for the current page, a Pro-gated DXF tab, and the site-plan route with paper, orientation and delivery choices.",
        ],
      },
      {
        h2: "DXF support",
        paras: [
          "DXF is the supported CAD interchange route: import maps entities to layers through the simulated occt-wasm step, and export writes a labelled placeholder file (the clone is educational, not a full CAD writer). Give anything converted a once-over before another application has to depend on it.",
        ],
      },
    ],
  },
  {
    slug: "import-and-export/import-a-drawing-or-image",
    group: "Import and export",
    title: "Import a drawing or image",
    lead: "Bring an image, DXF, SVG or PDF onto the canvas and choose what a PDF should become.",
    sections: [
      {
        h2: "Steps",
        list: [
          "Open a project you can edit and press Import in the editor's file actions",
          "Pick a format tab: Image, PDF, SVG, DXF or DWG",
          "Choose your file — the clone reads only its name — and press Import",
          "Watch the pipeline run, open the result in the console, and inspect its size, position and appearance",
        ],
      },
      {
        h2: "Choose how to import a PDF",
        paras: [
          "The original chooser offers three results: Image for a picture to reference, Vectorize for editable extraction from lines, text and fills, and Trace for reconstructing a floor plan as architectural elements. The clone runs a single simulated pdf.worker pipeline that lands editable shapes, so reach for the tracing workflow when you need walls rather than a picture (simulated in the clone).",
        ],
      },
      {
        h2: "What you'll see",
        paras: [
          "An image stays a picture; DXF and SVG come in as editable content to the extent their importers support it. The clone reports “Imported with provenance (importMergeProvenance)” — elements land as editable shapes and keep a record of where they came from.",
        ],
      },
      {
        h2: "Controls and limits",
        paras: [
          "DWG import is entitlement-gated (the dwg-import flag): upgrade in Billing to unlock it. Uploads are limited to 50 MB on the real product, and extracting vectors and tracing floor plans are separate operations, each with its own access and credit requirements.",
          "If the imported drawing has unexpected dimensions, measure a known distance, scale the content, then measure again.",
        ],
      },
    ],
  },
  {
    slug: "import-and-export/export-your-drawing",
    group: "Import and export",
    title: "Export your drawing",
    lead: "Send a drawing out as an image, DXF or site plan, directly from the console.",
    sections: [
      {
        h2: "Export a standard paper",
        list: [
          "Open Export in the editor's file actions",
          "On the Site plan tab, choose the paper (A4, A3, A2, A1, Letter, Legal), the orientation and the delivery",
          "Export — Free-plan output carries a watermark; Pro removes it",
        ],
        paras: [
          "The PNG / SVG tab downloads the current page directly. The DXF tab is Pro-gated (the dwg-export entitlement) and writes a labelled placeholder file (simulated in the clone).",
        ],
      },
      {
        h2: "Export several papers",
        paras: [
          "A model holds multiple pages — add them in the page bar; Free caps at the displayed page count and Pro is unlimited. The site-plan delivery can be a single file or a ZIP bundle when several sheets are involved.",
        ],
      },
      {
        h2: "Export selected images",
        paras: [
          "Generated and imported images go out through the PNG / SVG route. The real product additionally exposes image-only PNG/JPG controls on a pure image selection; the clone offers the page-level download.",
        ],
      },
      {
        h2: "Check the output",
        paras: [
          "Open what you exported in whatever application the recipient will use, and check line weights, text, hatches and imagery. The site-plan route reports its paper, orientation, delivery and watermark state in the result line, so the label tells you what left the building.",
        ],
      },
    ],
  },

  /* ------------------------------- Visualize ------------------------- */
  {
    slug: "visualize",
    group: "Visualise and present",
    title: "Visualise and present",
    lead: "Explore a space visually, then compose and present drawing sheets.",
    sections: [
      {
        h2: "Explore a space with a camera",
        paras: [
          "On the real product this is camera placement and interior rendering — see Create an interior render. The clone does not simulate rendering; its closest surface is the Draft/Polish switch, where Polish renders rooms with material patterns, a sun shadow driven by azimuth and elevation, and a per-room material picker.",
        ],
      },
      {
        h2: "Prepare drawing-sheet output",
        paras: [
          "Organise pages as sheets in the page bar, then use the export dialog's site-plan route — papers, orientation, single file or ZIP, watermark on Free. Presentation mode walks the model through its reveal sequence — Building, Site, Section, Elevation — with keyboard advance and Esc to exit (simulated in the clone).",
        ],
      },
    ],
  },

  /* ------------------------------ Collaborate ------------------------ */
  {
    slug: "collaborate",
    group: "Teams and projects",
    title: "Teams and projects",
    lead: "Who is in which team, which space holds which model, and how finished work reaches other people.",
    sections: [
      {
        h2: "Workspaces and people",
        paras: [
          "The sidebar lists your teams, their spaces and their people; leaving a team — or deleting one you own — runs through the same settings surfaces. Everything below lives in the clone's app shell (simulated in the clone).",
        ],
        subsections: [
          {
            h3: "Switch, create and rename teams",
            paras: [
              "Switch from the sidebar's team menu; new teams are created from the same place, and renames live in team settings.",
            ],
          },
          {
            h3: "Invite and manage team members",
            paras: [
              "The Members page sends invitations and shows who is in the team; the sidebar badge tracks the pending count.",
            ],
          },
          {
            h3: "Accept or decline an invitation",
            paras: [
              "Invitees see the invitation in their dashboard and accept straight into the team — the clone has a working token-accept flow.",
            ],
          },
          {
            h3: "Organise spaces and projects",
            paras: [
              "Models sit in spaces such as Residential Projects; the sidebar moves between them, and page tabs rename on double-click.",
            ],
          },
        ],
      },
      {
        h2: "Share a project or send a file",
        paras: [
          "Share when someone needs access to the project itself — an invitation by email. Export when they need a deliverable instead — a file they can open without an account.",
        ],
      },
    ],
  },

  /* -------------------------------- Assets --------------------------- */
  {
    slug: "assets",
    group: "Assets and materials",
    title: "Assets and materials",
    lead: "Browse the library, place symbols on the canvas, and restyle what you have placed.",
    sections: [
      {
        h2: "Browse and place assets",
        paras: [
          "The Asset tool opens a category picker (simulated in the clone); pick a symbol, click the canvas to place it, and move placed assets with Select like any other shape:",
        ],
        list: [
          "Bathroom — toilet, sink, shower, bathtub",
          "Bedroom — beds, wardrobe",
          "Kitchen — counter, stove, fridge, dining table",
          "Living Room and Office — sofas, tables, desks",
          "Others — plants and stairs",
        ],
      },
      {
        h2: "Assets in camera views",
        paras: [
          "On the real product, assets marked with a camera badge appear in camera renders — see Assets in camera views on the original docs. The clone has no camera rendering: assets appear on the drafting canvas and in Polish view's material treatment.",
        ],
      },
      {
        h2: "Restyle a placed asset",
        paras: [
          "The clone's restyling surface is Polish view: pick a room's material from the palette and the pattern re-renders across the room. Restyling an individual placed asset belongs to the real product's image tools and is not simulated here.",
        ],
      },
    ],
  },

  /* ---------------------------- AI & automation ---------------------- */
  {
    slug: "ai-and-automation",
    group: "AI tools",
    title: "AI tools",
    lead: "The generation, tracing and image-editing operations, sorted by what they produce.",
    sections: [
      {
        h2: "Plans and drawings",
        paras: [
          "Generate a floor plan from a brief — the clone's “Generate with AI” dialog (simulated in the clone) — or trace one from a scan through the simulated import pipeline and magnetic lasso. Both land editable geometry you develop with the drafting tools.",
        ],
      },
      {
        h2: "Create and improve images",
        list: [
          "Create an interior render from a camera view",
          "Edit an image with a prompt",
          "Expand an image beyond its edges",
          "Remove an image background",
          "Increase image resolution",
        ],
        paras: [
          "These operations are not simulated in the clone; they are documented for parity with the real product.",
        ],
      },
      {
        h2: "Select and change image content",
        paras: [
          "Begin with segmentation, then choose an action that fits the detected object or surface. An image edit never reaches the editable floor plan behind the picture — look the result over and carry any change into the drawing by hand, and remember that each operation consumes credits, so a chain of edits costs more than one generation:",
        ],
        list: [
          "Erase or isolate an object",
          "Change paint",
          "Change flooring",
          "Change an object's material",
          "Replace an object from a reference",
        ],
      },
    ],
  },
  {
    slug: "ai-and-automation/create-an-interior-render",
    group: "AI tools",
    title: "Create an interior render",
    lead: "A camera, a style and one Apply click turn the plan into an interior image — on the real product.",
    sections: [
      {
        h2: "Before you start",
        paras: [
          "Get the drawing into shape and put the assets you want visible into position first; you need editing access and the applicable credit entitlement. The clone does not simulate cameras or image generation — its visual surface is the Draft/Polish switch — so read the steps for the real product, and use Polish view (simulated in the clone) to preview materials instead.",
        ],
      },
      {
        h2: "Steps",
        list: [
          "Choose Camera from the drawing tools",
          "Click to place the camera, move the pointer to aim it, click again to set the direction",
          "Switch to Select and click just that camera — alone — to reveal its rendering prompt",
          "Choose an interior style — or No style — and write a prompt to guide the appearance",
          "Press Apply and wait for the generated image",
        ],
      },
      {
        h2: "What you'll see",
        paras: [
          "An image area appears next to the camera, runs its progress state, then settles into the finished interior — a standalone canvas item that swaps out neither the camera nor the editable plan, and never refreshes itself from later drawing changes.",
        ],
      },
      {
        h2: "Guide the appearance",
        paras: [
          "A style works on its own, with no written instruction; choose No style when none of the presets fits. For a different viewpoint, re-aim the camera and render again; for a local finish change, segment the generated image. An example prompt: soft daylight, pale timber and warm neutral walls, keeping the camera viewpoint unchanged.",
        ],
      },
    ],
  },

  /* -------------------------- Workspace & billing -------------------- */
  {
    slug: "workspace-and-billing",
    group: "Account, plans and credits",
    title: "Account, plans and credits",
    lead: "Personal settings, the team subscription and how AI credits are spent.",
    sections: [
      {
        h2: "Find the right settings",
        list: [
          "Your name, photo, privacy or appearance — Settings, from your avatar at the top right",
          "The team's name, members or subscription — Settings, from the gear beside the team name at the top left",
          "Billing, invoices and plan changes — the Billing page of the team you mean to change",
        ],
        paras: [
          "Billing is the owner's alone to view and change — pick the right team before touching a subscription.",
        ],
      },
      {
        h2: "Account and privacy",
        subsections: [
          {
            h3: "Change your name and profile photo",
            paras: [
              "Profile settings update what your teammates see.",
            ],
          },
          {
            h3: "Choose your privacy preferences",
            paras: [
              "Opt in or out of optional analytics and advertising data in the consent tab.",
            ],
          },
          {
            h3: "Change the app appearance",
            paras: [
              "Light, dark, or follow the device's appearance.",
            ],
          },
          {
            h3: "Delete your account",
            paras: [
              "Removes the account and its data — confirm in settings, and check what a deletion takes with it first.",
            ],
          },
        ],
      },
      {
        h2: "Plans and billing",
        paras: [
          "Free caps models and pages and watermarks exports; Pro lifts the caps, unlocks DWG import and DXF export, and drops the watermark. Upgrade and cancel from the Billing page — the clone simulates the upgrade, generates invoices and accepts the promo code SYNAPS-CLONE.",
          "AI credits meter generation, segmentation and edits on the real product; the clone advertises the credit banners without metering.",
        ],
      },
    ],
  },

  /* ------------------------------- Reference ------------------------- */
  {
    slug: "reference",
    group: "Reference and troubleshooting",
    title: "Reference and troubleshooting",
    lead: "Keyboard shortcuts, quick fixes and where each setting lives — dip in rather than read end to end.",
    sections: [
      {
        h2: "Fix a specific problem",
        list: [
          "A wall or shape will not move — click it with Select first; a shape must be selected before it drags",
          "Inputs land on round numbers — grid snapping is on; adjust the grid and precision in canvas settings",
          "The wrong regions were traced — review what you retained before running the trace; it processes all of them",
          "Export controls are missing — DWG import and DXF export are entitlement-gated; check the plan in Billing",
        ],
      },
      {
        h2: "Browse reference",
        subsections: [
          {
            h3: "Shortcuts and gestures",
            paras: [
              "Cmd/Ctrl+Z undo, Cmd/Ctrl+Shift+Z redo, wheel to zoom, middle-drag or Alt-drag to pan, and a double-click on a page tab to rename it.",
            ],
          },
          {
            h3: "Tips and tricks",
            paras: [
              "Let the layers panel derive its layers from shape kinds; rename pages to keep multi-sheet models findable; every starting point in the clone seeds a demo plan, so there is always something on the canvas to try a tool on.",
            ],
          },
          {
            h3: "Properties",
            paras: [
              "Units (m or ft), precision, grid and background live in canvas settings; rooms expose their area and material; doors and windows their width.",
            ],
          },
        ],
      },
    ],
  },

  /* ---------------------------- Video tutorials ---------------------- */
  {
    slug: "video-tutorials",
    group: "Video tutorials",
    title: "Video tutorials",
    lead: "Complete workflows on film, plus timestamps that jump straight to a single action.",
    sections: [
      {
        h2: "Start here",
        paras: [
          "Begin with the AutoCAD-to-Synaps tutorial below — it covers tracing, generation, manual drafting and visuals in a single sitting. The videos live on the original product's channel; the clone documents them without hosting them.",
        ],
      },
      {
        h2: "Short tool demonstrations",
        paras: [
          "On the real site, every tool guide — Line, Polyline, Rectangle, Circle or arc, Wall — embeds a short clip next to its written steps, with worked numeric input. The clone keeps the written steps on its drafting pages, without the embedded players.",
        ],
      },
      {
        h2: "Jump to an AI example",
        paras: [
          "Each timestamp starts the original video at that exact moment:",
        ],
        list: [
          "Trace a floor plan — 0:18–1:29",
          "Generate a floor plan — 6:07–7:04",
          "Create an interior render — 2:50–3:20",
          "Change flooring — 3:45–4:24",
          "Edit a selected area with a prompt — 4:58–5:30",
        ],
      },
    ],
  },
  {
    slug: "video-tutorials/autocad-to-synaps",
    group: "Video tutorials",
    title: "From AutoCAD to Synaps: drafting and rendering",
    lead: "Melos takes one project from a paper sketch to rendered interiors — drafting habits included.",
    sections: [
      {
        h2: "Sections at a glance",
        paras: [
          "Presented by Melos Azemi, published 2026-08-25, running 22:11 — from the original video “Why I switched from AutoCAD to Synaps”.",
        ],
        list: [
          "0:00 — Trace a sketch",
          "2:16 — Generate a layout",
          "4:36 — Draft the plan",
          "12:15 — Furnish and style",
          "19:08 — Render and edit",
        ],
      },
      {
        h2: "Related guides",
        paras: [
          "In the clone's documentation, the chapters map to the pages you are reading: the reference page for finding controls, the scan workflow for tracing, the brief workflow for generation, and the render page for visuals.",
        ],
      },
    ],
  },
];
