import type { BlogPostData } from "./types";

/**
 * Blog content — all 31 posts harvested from /news/blog/… .
 *
 * PROVENANCE:
 *  · Post titles, section h2/h3 headings, FAQ questions, dates, reading
 *    times and short factual strings (standard names, figures, tool and
 *    price names) are transcribed from the harvest of the analysed site
 *    (hub cards + per-post kicker lines), so the clone's information
 *    architecture and list order match the source.
 *  · Deks, paragraphs, list items and FAQ answers are original condensed
 *    writing that follows the same outline — NOT verbatim marketing prose.
 *  · Dates and minutes are the harvested published values (the hub lists
 *    newest first and the clone sorts the same way). Four early "Essay"
 *    posts predate 2026 and keep their harvested 2023–2024 dates.
 *  · The four essay posts carry no h2s in the harvest; their harvested h3
 *    headings are promoted to h2 verbatim. "Fast is more" has no body
 *    headings at all, so its three section headings are original.
 *  · The "Frequently asked questions", "Related reading" and "More from
 *    the blog" blocks of the harvest are handled by the page templates
 *    (faqs field / more-links), not as prose sections.
 */
export const blogPosts: BlogPostData[] = [
  {
    slug: "revit-vs-autocad",
    title: "Revit vs AutoCAD: which one your studio needs for each job",
    dek: "Revit for the model, AutoCAD for the drawings: which jobs suit each tool, how DWG files move between them, what the LT tiers leave out, and the US list prices read on 23 October 2026.",
    date: "2026-10-23",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/revit-vs-autocad.png",
    sections: [
      {
        h2: "Revit vs AutoCAD at a glance",
        paras: [
          "Revit holds the building as one model, and AutoCAD holds it as drawings. Autodesk's own Revit vs AutoCAD page calls AutoCAD a general drawing tool with broad applications and Revit a design and documentation solution — every other difference follows from that split.",
        ],
        list: [
          "What you work on — Revit: one building model with walls, doors and windows as elements. AutoCAD: lines, blocks and layers in DWG drawings.",
          "What changes when you edit — Revit: plans, sections and schedules update together. AutoCAD: each drawing is edited on its own.",
          "Schedules — Revit: generated from the model's elements. AutoCAD: drawn or exported separately.",
          "File format — Revit: RVT model, links and exports DWG. AutoCAD: native DWG, exports DXF and more.",
          "Where it runs — Revit: Windows. AutoCAD: Windows and macOS, with the toolsets tied to Windows.",
        ],
      },
      {
        h2: "What Revit adds: one model behind every drawing",
        paras: [
          "You place building elements once, and plans, schedules and sheets read from them. Walls, doors and windows go in as parametric elements; you add views to project sheets, customise title blocks and manage revisions from the model.",
          "Change is where the model pays back. Autodesk's comparison FAQ describes a model-based design approach where changes are automatically updated across all views and documentation — move a wall on a modelled job and the plans, sections and room schedule follow it.",
        ],
      },
      {
        h2: "What AutoCAD covers: drawings, DWG and the toolsets",
        paras: [
          "AutoCAD covers precise 2D and 3D drafting, with projects sitting in DWG files, design and modelling with solids, surfaces and mesh objects, and documentation features. It runs on Windows and macOS.",
          "For architects the toolsets matter more. AutoCAD comes with seven industry-specific toolsets on Windows, and Architecture is one of them — it can automatically generate floor plans, elevations, sections and ceiling grids from the drawing, and carries a library of architectural objects like walls, doors and windows.",
        ],
      },
      {
        h2: "Which tool for which studio job",
        paras: [
          "Put each job where its output lives: drawings that stay 2D go in AutoCAD, and coordinated work goes in Revit. The four jobs an independent studio runs most weeks:",
        ],
        subsections: [
          {
            h3: "Surveys and existing drawings",
            paras: [
              "AutoCAD or AutoCAD LT. Survey drawings usually arrive as DWG, and the record stays 2D.",
            ],
          },
          {
            h3: "Early options and planning drawings",
            paras: [
              "AutoCAD LT or another 2D tool. Options change daily, and a model is setup work for each one. An extension often stays in 2D; a larger scheme benefits from the model.",
            ],
          },
          {
            h3: "Coordinated documentation and schedules",
            paras: [
              "Revit. Schedules, sheets and revisions stay in step with the model, and changes propagate to every view.",
            ],
          },
          {
            h3: "Details and consultant backgrounds",
            paras: [
              "AutoCAD. Details are drawing work, and consultant files arrive as DWG.",
            ],
          },
        ],
      },
      {
        h2: "Moving work between Revit and AutoCAD",
        paras: [
          "Revit takes DWG in by linking or importing it, and sends views and sheets out as DWG or DXF. In most cases linking is preferred over importing: linked CAD files update when reloaded, so link any file you expect to change.",
          "Link the consultant's background once, reload it when a new issue arrives, and export the views the consultant needs as DWG. The import path also lists DGN, SAT, OBJ, 3DM, STEP, SKP, STL and AXM among its CAD formats.",
        ],
      },
      {
        h2: "What Revit and AutoCAD cost in 2026",
        paras: [
          "Autodesk publishes annual US list prices for one user on each product's buy page, read here on 23 October 2026 — prices vary by region and change without notice, so look up your own regional site before setting a budget.",
          "Monthly terms cost more over a year. Monthly US list prices for one user, read 23 October 2026, are $380 for Revit and $260 for AutoCAD; on the same terms AutoCAD LT and Revit LT cost $70 a month each, and the suite costs $85. These are suggested retail prices, excluding freight, handling and taxes.",
          "Budget seats against the jobs each person runs. Two Revit seats and four AutoCAD LT seats come to $8,170 a year at these US list prices; swapping the four LT seats for full AutoCAD adds $6,220.",
        ],
      },
      {
        h2: "Revit LT, AutoCAD LT or the suite",
        paras: [
          "Each LT tier keeps the core of its product and leaves out named features; the choice turns on whether you need 3D, the toolsets or a shared model.",
          "AutoCAD LT is 2D drafting and documentation — no 3D, no third-party connections, no development tools and none of the seven specialised toolsets, so the Architecture toolset needs full AutoCAD on Windows. Revit LT models buildings and produces coordinated drawings in a single-user workflow; full Revit adds multi-user collaboration, worksharing and in-place family editing. The suite bundles AutoCAD plus a specialised toolset.",
        ],
      },
      {
        h2: "Where Synaps fits: the plan before the model",
        paras: [
          "Synaps publishes this article, and the comparison above is research only, from Autodesk's pages read on 23 October 2026 — neither product was tested hands-on.",
          "Synaps is browser-based architectural drafting for the early plan, before a job needs a model. Bring the existing plan in as a PDF or image, trace it into editable walls, openings and rooms, or import a consultant's DXF. Draw new walls with a typed length and thickness, settle a few layout options, and hand the settled scheme to whichever tool the job calls for next. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Should a new architect learn AutoCAD or Revit first?",
        a: "Learn the tool your studio's live jobs run in, and learn 2D drafting either way, because consultant DWGs keep arriving. Autodesk's FAQ notes that moving from AutoCAD to Revit takes real adjustment — new terminology and a new user interface — and drawing conventions still matter, since every view Revit produces has to read as a drawing.",
      },
      {
        q: "Can Revit replace AutoCAD in a studio?",
        a: "Autodesk's own FAQ says Revit cannot fully replace AutoCAD, because the tools serve different but complementary purposes. Even a studio that models every job receives survey and consultant files as DWG — keep at least one AutoCAD LT seat for opening and marking up DWGs that never need to enter the model.",
      },
    ],
  },
  {
    slug: "standard-wall-thickness",
    title: "Standard wall thickness: draw the sum of the layers",
    dek: "Draw each wall at the sum of its layers: stud and board sizes from PS 20-20 and USG, Approved Document A masonry minimums for England, and which face to dimension.",
    date: "2026-10-22",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/standard-wall-thickness.png",
    sections: [
      {
        h2: "Standard wall thickness at a glance",
        paras: [
          "The drawn thickness of a wall is its core plus every layer fixed to it. These sums cover common stud partitions and the masonry minimums for England.",
        ],
        list: [
          "2x4 stud partition, 1/2 in board each side — 4-1/2 in (114 mm). Basis: PS 20-20 and USG sizes.",
          "2x4 stud partition, 5/8 in board each side — 4-3/4 in (121 mm). Basis: PS 20-20 and USG sizes.",
          "2x6 stud framing, 1/2 in board each side — 6-1/2 in (165 mm), framing and linings only. Basis: PS 20-20 and USG sizes.",
          "Cavity wall, England — 230 mm (90 mm leaf + 50 mm cavity + 90 mm leaf). Basis: Approved Document A, Section 2C.",
        ],
      },
      {
        h2: "Nominal vs actual: why a 2x4 is not 4 inches",
        paras: [
          "Under PS 20-20, the American Softwood Lumber Standard, a nominal 2x4 has a minimum dressed dry size of 1-1/2 by 3-1/2 in — so a stud wall starts at 3-1/2 in, not 4. Table 3 of the standard lists nominal sizes beside dressed sizes, in inches and millimetres, and wider nominal sizes lose width the same way.",
          "The nominal name is a label; the drawing needs the dressed figure.",
        ],
      },
      {
        h2: "Interior partitions: stud plus board each side",
        paras: [
          "USG lists its Sheetrock UltraLight panels at 1/2 in (12.7 mm) for interior walls and ceilings. A 2x4 stud with one panel each side gives 3-1/2 + 1/2 + 1/2 = 4-1/2 in — in millimetres, 89 + 12.7 + 12.7 = 114.4 mm, drawn as 114.",
          "Board thickness moves that figure. The same maker's Sheetrock Firecode X panels are 5/8 in (15.9 mm) Type X panels complying with ASTM C1396; with one of those each side the same stud gives 4-3/4 in, or 121 mm. The board in the specification decides the partition, not the stud alone.",
        ],
      },
      {
        h2: "Masonry walls in England: what Approved Document A sets",
        paras: [
          "Masonry minimums in England come from guidance, and they apply to a defined group of buildings. Approved Document A is the guidance on the structural elements of buildings in England; its Section 2C applies to residential buildings of not more than three storeys, small single-storey non-residential buildings and small annexes to residential buildings.",
          "For those buildings, all cavity walls should have leaves at least 90 mm thick and cavities at least 50 mm wide — two minimum leaves and a minimum cavity give 90 + 50 + 90 = 230 mm.",
        ],
      },
      {
        h2: "Load-bearing walls: the engineer sizes the core",
        paras: [
          "For a load-bearing wall, the core thickness comes from the structural engineer, and you draw the linings on top. The stud sizes and masonry minimums above say what materials measure and what guidance sets as a floor — they do not size a wall for its loads, spans or openings.",
          "Even within Approved Document A, the Section 2C figures hold only for walls that meet that section's conditions; a wall or building outside its scope needs a designed thickness. At early design, draw the load-bearing core at a provisional size and mark it for the engineer's confirmation.",
        ],
      },
      {
        h2: "How to draw wall thickness on a plan",
        paras: [
          "Draw each wall at its build-up, say which face each dimension measures to, and fix one alignment rule per wall type. Those three decisions keep rooms, dimensions and areas in step.",
        ],
        subsections: [
          {
            h3: "Set the drawn thickness to the build-up",
            paras: [
              "Make a short list of the wall types on the job, each with its layers and its total — a 2x4 partition with 1/2 in board, the same stud with 5/8 in board and a blockwork party wall are three types, not one. Draw every wall of a type at its listed total, and put the list in the general notes so consultants read the same figures.",
            ],
          },
          {
            h3: "Say which face each dimension measures to",
            paras: [
              "Write on the drawing whether dimensions run to the structural face, the board face or the finished face — room areas and clear widths change by the thickness of a board either way, and the reader cannot guess which you meant.",
            ],
          },
          {
            h3: "Set one alignment rule per wall type",
            paras: [
              "Fix one thickness and one alignment rule per wall type, so every wall of that type is drawn the same way — core centred on the setting-out line, for instance, or the structural face flush to the grid. Mixed alignments make rooms and dimensions drift.",
            ],
          },
        ],
      },
      {
        h2: "Set up wall build-ups in Synaps",
        paras: [
          "Synaps publishes this article. Synaps is browser-based architectural drafting software, and each wall carries its thickness and its build-up in layers — so the fit-out plan shows stud partitions at their real build-up instead of a round 100 mm.",
          "Draw the partition run with the wall tool — segments in one run join at the corners — entering L for length and A for angle when you have the figures. Select a wall to open its properties and set its thickness and layers; use the same thickness, layers and alignment for every wall of a type. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "How thick are exterior walls?",
        a: "Build an exterior wall from its layers the same way as a partition. A 2x6 frame with 1/2 in board inside is 5-1/2 + 1/2 = 6 in (152 mm), before sheathing, cladding and any insulation outside the frame. In England, a Section 2C cavity wall starts from the 90 + 50 + 90 mm minimums; take every other layer from its data sheet and add it to the sum.",
      },
      {
        q: "Should the plan show each layer of the wall?",
        a: "Show layers where the scale can carry them. At 1:100, a 114 mm partition is 1.14 mm on paper and each 12.7 mm board is about 0.13 mm — draw the outline and fill the cut at that scale. At 1:50 or larger, show the board as its own layer.",
      },
      {
        q: "How do I draw an existing wall when I can't see its build-up?",
        a: "Measure the overall thickness where the wall is open, such as at a doorway, and draw that total as a single layer. Note that the build-up is unknown, so nobody reads layers into it — replace it with real layers once a survey opens the wall.",
      },
      {
        q: "Does a thicker wall on the plan mean a stronger wall?",
        a: "No. Thickness on the plan records what gets built, and strength comes from the engineer's design of the core. Swapping 1/2 in board for 5/8 in board each side makes a partition thicker, and that change says nothing about load. Draw the total from the build-up and the core from the engineer.",
      },
      {
        q: "What sizes should I use for metric plasterboard and metal studs?",
        a: "Use the sizes on the manufacturer's data sheet for the product you specify. Metric boards and metal studs come in their own ranges, and the US sizes in this guide are not a stand-in for them. Sum the stud width and each board the same way, then write the total into your wall list.",
      },
    ],
  },

  {
    slug: "ai-floor-plan-generator",
    title: "AI floor plan generator: what it gives you and what to check",
    dek: "A generated plan is a starting draft, not a stamped drawing. Here is what the generator actually produces, and the ten-point check to run before anyone builds from it.",
    date: "2026-10-05",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/ai-floor-plan-generator.png",
    sections: [
      {
        h2: "What an AI floor plan generator gives you",
        paras: [
          "A generator turns a written brief — rooms, sizes, relationships — into a starting layout in seconds. What comes back is one of three things: a picture of a plan, linework to trace over, or an editable plan, and the type decides how much work follows.",
          "The value is in the iteration. Ten brief variations cost minutes, so you can test layouts against the brief before drawing anything by hand.",
        ],
      },
      {
        h2: "Write a brief the result can be checked against",
        paras: [
          "A checkable brief states the non-negotiables: total area, room count, which rooms need daylight, and how people move between them. Split it into fixed conditions (footprint, entrance, bedroom count, a stair you must keep) and preferences you would trade away.",
          "Keep the brief visible while reviewing — every point in it becomes a test the generated plan either passes or fails.",
        ],
      },
      {
        h2: "The 10-point check for any generated floor plan",
        paras: [
          "Run every generated plan through the same ten checks, in order, before it leaves your desk. The figures cited are examples from England and the US — use the standard that applies to your project.",
        ],
        subsections: [
          { h3: "1. Footprint and boundary fit", paras: ["Overlay the footprint from the brief and check that every external wall sits on it or inside it. Recesses, corners and irregular edges are where the fit slips first."] },
          { h3: "2. Room sizes and widths", paras: ["Measure each room's area and its narrowest width, then compare both with the brief and the standard. England's Nationally Described Space Standard asks at least 7.5 m² and 2.15 m wide for a single bedroom, 11.5 m² for a double."] },
          { h3: "3. Circulation and access", paras: ["Trace the route from the entrance to every room. No room should be reachable only through a bedroom or a bathroom, and nothing — wardrobe, kitchen run, door swing — should block the hall."] },
          { h3: "4. Doors", paras: ["Confirm every room has a door set in a wall a person can reach. Draw each swing and check it clears furniture, fittings and neighbouring doors."] },
          { h3: "5. Windows and escape", paras: ["Each habitable room needs a window, and bedrooms an escape opening where required. One cited US guide sets a net clear opening of at least 5.7 sq ft — check height, width and area separately, because the two minimums alone do not reach it."] },
          { h3: "6. Wet rooms and services", paras: ["Look at where the bathroom, en suite and kitchen sit. Grouping them around shared walls keeps drainage runs short; in flats they usually need to stack."] },
          { h3: "7. Structure", paras: ["A generated layout puts walls where rooms meet, not where loads go. Spans, bearing walls and load paths are yours to set — check that walls you expect to carry load line up between floors."] },
          { h3: "8. Storage", paras: ["Count built-in storage, not leftover corners. The NDSS asks for 1.5 m² in a one-bedroom two-person home, rising to 2.5 m² with three bedrooms."] },
          { h3: "9. Ceiling and headroom", paras: ["A plan shows no heights, so add them to the brief where they matter — rooms under roofs, in basements, inside existing buildings. The NDSS sets 2.3 m floor-to-ceiling for at least 75% of the gross internal area."] },
          { h3: "10. Labels against reality", paras: ["A room label and a bed symbol are not a check — furnished layouts are not required to demonstrate compliance. Measure what the geometry delivers, not what the label claims."] },
        ],
      },
      {
        h2: "Fix it or generate again",
        paras: [
          "Sort what you found into local problems (a door on the wrong wall, a bedroom 200 mm too narrow) and major misses that break the brief. Fix local problems in the drawing; change the brief and generate again rather than repairing a broken layout.",
        ],
      },
      {
        h2: "Where architects stand on AI",
        paras: [
          "Use is rising and the argument is about who judges the output. The RIBA AI Report 2025 put UK practices using AI at 59%, up from 41% a year earlier, while a US study of AIA-registered architects found only 6% using AI regularly — the surveys measure different things.",
          "The consistent position across practices: generation is a drafting accelerant, not a design authority. The architect owns the brief and the check; the machine owns the repetition.",
        ],
      },
      {
        h2: "Generating a floor plan in Synaps",
        paras: [
          "In Synaps the generator writes into the same editable canvas you draft on: optionally draw a closed boundary larger than 20 m², open command search, describe the space with the most important requirement first, and check the single resulting plan with Measure. Each submission produces one plan; the generator does not size structure or validate against regulations. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Can ChatGPT make a floor plan?",
        a: "Not as an editable drawing. A general chatbot can describe a layout, draw a picture of one or write code for simple linework — none of it gives you walls, rooms and openings as drawing elements.",
      },
      {
        q: "Is an AI-generated floor plan code compliant?",
        a: "No tool output is compliant on its own. Compliance depends on location, building use and the rules that apply, and a qualified person has to confirm it.",
      },
      {
        q: "Does an AI floor plan generator replace an architect?",
        a: "Few architects expect that — in the RIBA survey just 4% thought human creativity would no longer be needed for building design. A generator gives you a layout to react to; deciding what the building should be stays with you.",
      },
      {
        q: "How detailed should the brief be?",
        a: "Include everything you would reject a layout over. Room list, footprint, entrance and minimum dimensions matter more than adjectives — if a requirement is not in the brief, you cannot fairly fail the plan for missing it.",
      },
    ],
  },
  {
    slug: "architectural-paper-sizes",
    title: "Architectural paper sizes: ISO, ARCH and ANSI, and how to pick one",
    dek: "ISO A sheets, US ARCH and ANSI series, and the drawing space each one leaves after borders and a title block. How to pick one sheet size for the whole set — and which half-size prints keep a true scale.",
    date: "2026-10-21",
    minutes: 12,
    category: "Studio workflows",
    image: "/images/blog/covers/architectural-paper-sizes.png",
    sections: [
      {
        h2: "ISO A sizes and the drawing space ISO 5457 leaves",
        paras: [
          "Every A sheet is the one above it cut in half, so the proportion never changes: height divided by width is root two, and A0 covers one square metre.",
          "The trimmed sheet is not the area you draw on. ISO 5457 sets a 20 mm border on the left edge — a filing margin — and 10 mm on the other three sides.",
        ],
        list: [
          "A0: 841 × 1189 mm trimmed, 821 × 1159 mm of drawing space.",
          "A1: 594 × 841 mm trimmed, 574 × 811 mm of drawing space.",
          "A2: 420 × 594 mm trimmed, 400 × 564 mm of drawing space.",
          "A3: 297 × 420 mm trimmed, 277 × 390 mm of drawing space.",
          "A4: 210 × 297 mm trimmed, 180 × 277 mm of drawing space.",
        ],
      },
      {
        h2: "ARCH and ANSI sizes in inches, and the 30 × 42 naming conflict",
        paras: [
          "US sheets come in two inch series, ANSI and ARCH, and both use the letters D and E for different sheets — the source of the 30 × 42 naming conflict. Owner standards settle the choice: the US Army's A/E/C Graphics Standard requires ANSI D sheets, and ISO A1 for international projects.",
        ],
        list: [
          "ANSI A: 8.5 × 11.0 in (letter).",
          "ANSI B: 11.0 × 17.0 in (tabloid).",
          "ANSI C: 17.0 × 22.0 in.",
          "ANSI D: 22.0 × 34.0 in — the required drawing sheet in that standard.",
          "ANSI E: 34.0 × 44.0 in.",
        ],
      },
      {
        h2: "How much building fits on each sheet",
        paras: [
          "Convert the building to paper before you choose: drawing length in millimetres = building length in metres × 1000 ÷ scale denominator. At 1:100, the drawing space of an A1 sheet holds 81.1 m of building on its long side, before the title block takes its strip — a full-height block costs 18 m at 1:100 and 9 m at 1:50.",
        ],
        subsections: [
          {
            h3: "Example: a terrace of six houses",
            paras: [
              "A terrace 48 m long and 11 m deep draws at 480 × 110 mm at 1:100. A2 has 564 × 400 mm of drawing space, so the plan fits beside a corner title block — but leaves only 84 mm of length for dimension strings. A1 leaves 631 mm beside a full-height strip, which is why the terrace set goes out on A1.",
            ],
          },
        ],
      },
      {
        h2: "Half-size sets: which reductions keep a true scale",
        paras: [
          "A half-size print keeps a standard scale only when the small sheet is exactly half the large one. A1 to A3 passes (a 1:100 set prints at 1:200), ANSI D to ANSI B passes, and ARCH D to 12 × 18 passes. ARCH D to 11 × 17 does not — the factor is 0.458, not 0.5 — so that combination breaks the scale.",
        ],
      },
      {
        h2: "Use one sheet size for the whole set",
        paras: [
          "Choose one sheet size from the largest drawing in the set and use it for every sheet — the LANL manual states the rule directly. ISO 5457 sets the other limit: draw on the smallest sheet that still gives the necessary clarity and resolution.",
        ],
      },
      {
        h2: "Set up the sheets for a job in Synaps",
        paras: [
          "Each sheet in Synaps is a paper you size and scale on the canvas: press F for the Paper tool, pick A1 (or any ISO size from A0 to A6 and B0 to B5), set the scale, and swap width and height for landscape. ARCH D is not in the list, so the consultant's coordination set becomes a custom 610 × 914 mm paper kept as a separate set. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What should a print order say about sheet size?",
        a: "Give the sheet in inches or millimetres, the orientation and the print factor. Write \"50 per cent\" or \"100 per cent\" rather than \"half size\", so the print room cannot guess at the target sheet.",
      },
      {
        q: "Why does a half-size PDF sometimes print slightly under half?",
        a: "Fit-to-page lets the printer shrink the sheet to clear its own unprintable margin. Print at actual size onto the matching sheet, or set the reduction factor yourself.",
      },
      {
        q: "Should text be sized for the full sheet or the half-size copy?",
        a: "Size it for the print most people will read. If the team and the client mostly see A3 copies of an A1 set, choose text heights that still read at half size and let the full sheet look generous.",
      },
      {
        q: "Does a US consultant on an ISO job need the same sheet?",
        a: "No, but agree both sheets in writing at the start and name them in the appointment, so each set folds, files and reduces in a predictable way.",
      },
    ],
  },
  {
    slug: "bubble-diagram-architecture",
    title: "Architectural bubble diagram: how to draw one and turn it into a plan",
    dek: "A bubble diagram maps spaces, sizes and relationships before any wall exists. Draw it area-true, group it into zones, test it, then square it up into a scaled first plan.",
    date: "2026-10-20",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/bubble-diagram-architecture.png",
    sections: [
      {
        h2: "What a bubble diagram shows, and what it leaves out",
        paras: [
          "A bubble diagram shows which spaces exist, how big each one is, which pairs belong together and where you come in. Walls, room shapes, structure and exact positions stay off the sheet — a circle has no proportion to argue about.",
          "A CUNY City Tech course brief sets the order of work: a list of spaces, an adjacency matrix, then the bubble diagram, with each bubble drawing its information from the matrix.",
        ],
      },
      {
        h2: "When a bubble diagram is worth drawing",
        paras: [
          "Draw one while the arrangement is still open — a schedule and a matrix say what each room needs, not where it goes. Skip it when the arrangement is already fixed: a repeat flat type in a known core, or a fit-out the shell decides. Four situations call for one:",
        ],
        list: [
          "The site, orientation or outlook pulls rooms in competing directions.",
          "The entrance position is not fixed, or the plan has two possible entrances.",
          "More than one arrangement fits the brief and you need to compare them.",
          "A client or a colleague needs to see the reasoning before a plan.",
        ],
      },
      {
        h2: "How to draw a bubble diagram in six steps",
        paras: [
          "Work from the schedule outwards, with one decision per step.",
        ],
        subsections: [
          { h3: "List every space with its target area", paras: ["List rooms, circulation spaces and outdoor areas with their functions — and give the hall and the store their own target areas, because a tight plan loses them first."] },
          { h3: "Size each bubble from its target area", paras: ["Draw each bubble at its target area, not its importance: a bathroom matters a great deal and still needs only 5 m². A circle with the target area has a diameter of 2 × √(area ÷ π); at 1:100 the diameter in millimetres is 20 × √(area ÷ π). A 30.5 m² living space draws at 62 mm, a 13.5 m² bedroom at 41 mm."] },
          { h3: "Place the entrance and the hall first", paras: ["Start with an arrow for the entrance on the access side, then put the hall bubble on it. Every other room hangs off the hall, so its position fixes the rest. Place the largest space next, against the best outlook or the balcony."] },
          { h3: "Draw the relationships with a fixed legend", paras: ["Fix the legend before the first line and keep it on every option. A triple line means essential — a shared wall or a direct door. A single line means desirable — a short route crossing no other room. A dotted line with a cross means keep apart. No line means no direct link."] },
          { h3: "Mark daylight, outlook and the north point", paras: ["Every habitable room should touch the diagram's outer edge, which becomes the facade; the bathroom and the store can sit inboard. Add the north point, the sun path, arrows for outlook, and noise such as the street side."] },
          { h3: "Draw a second arrangement before you choose one", paras: ["Draw at least two arrangements and change one big move per version — the entrance side, the day zone's orientation or the bathroom's position."] },
        ],
      },
      {
        h2: "Group the bubbles into zones",
        paras: [
          "Draw a loose outline around rooms that share privacy, hours of use or services — those outlines fix the plan's big moves before any room has a shape. The example flat splits into a day zone for living, kitchen and dining and a night zone for the bedrooms and bathroom, with the hall as the hinge.",
        ],
      },
      {
        h2: "Test the diagram before you draw walls",
        paras: [
          "Run a pass-or-fail test on each arrangement, drawn from studio practice. Then check the arithmetic: the example rooms total 69.5 m² against a 74 m² target, leaving 4.5 m² for internal walls — and if the shell is already drawn, an area readout settles it without adding anything to the drawing.",
        ],
        list: [
          "Every essential pair touches, or sits close enough to share a wall.",
          "Every room is reachable from the hall without crossing another room.",
          "Every keep-apart pair sits in different zones, with no shared door.",
          "Every habitable room touches the outer edge.",
        ],
      },
      {
        h2: "Turn the bubble diagram into a scaled first plan",
        paras: [
          "Square each bubble into a rectangle of the same area, then close the gaps and overlaps between them.",
        ],
        subsections: [
          { h3: "Square each bubble into a rectangle of the same area", paras: ["Fix the narrow side first — the bed, the wardrobe and the door set a bedroom's width, and the length follows from the area. Bedroom 1 at 2.75 m wide needs 4.91 m of length to keep its 13.5 m². Type each rectangle's exact width and height as you draw, so the sheet keeps its target areas."] },
          { h3: "Turn link lines into doors and a hall", paras: ["Each triple line becomes a shared wall with a door where the pair needs a direct link; each single line becomes a route through the hall. Gaps become hall or storage, overlaps become shared walls. In England, Approved Document M Volume 1 sets the baseline for hall and door widths in new dwellings."] },
          { h3: "Read the areas back against the schedule", paras: ["Fixes move area and walls take thickness, so read both back. Extending the hall adds its area; partitions on wall centrelines take half their thickness off each room — a 3.0 × 4.5 m bedroom with a 100 mm partition on two sides drops to 2.95 × 4.45 m clear."] },
        ],
      },
      {
        h2: "Common bubble diagram mistakes",
        list: [
          "Sizing bubbles by eye can hide a room 3 m² short.",
          "Without an entrance arrow, the hall floats and every route becomes a guess.",
          "When every bubble touches every other, the legend carries no information.",
        ],
      },
      {
        h2: "From the squared-up sheet to an editable plan in Synaps",
        paras: [
          "The bubble diagram stays on tracing paper; the editable drawing starts at the squared-up sheet. Photograph or scan the sketch as a JPEG, PNG, WebP or PDF, drop it on the canvas and choose Trace, then adjust the detected regions before confirming. If the plan must sit inside a footprint, draw it as a closed outline larger than 20 m². (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Should a bubble diagram be drawn to scale?",
        a: "Draw it to scale once the schedule has target areas — that is what keeps room sizes honest. Before that, an unscaled diagram is fine for testing an idea with a client.",
      },
      {
        q: "What is the difference between a bubble diagram and an adjacency matrix?",
        a: "A matrix rates each pair once, so a missing rating stands out. A bubble diagram adds size and position, which exposes conflicts a grid hides — such as two bedrooms competing for one bathroom.",
      },
      {
        q: "Does the method work for a house over two floors?",
        a: "Yes, with one diagram per floor and a stair bubble in the same position on both sheets. Zones often split by floor — day zone on the entrance level, night zone above — and you test the route from the front door to each bedroom across both.",
      },
    ],
  },
  {
    slug: "ai-in-architecture",
    title: "AI in architecture: where it helps, and the studio rules to set first",
    dek: "AI earns its place at the start and the edges of a project — briefs, massing, layouts, traces — while the checks and sign-off stay with a named architect. What comes back at each stage, and the studio rules to write down first.",
    date: "2026-10-19",
    minutes: 13,
    category: "Practice",
    image: "/images/blog/covers/ai-in-architecture.png",
    sections: [
      {
        h2: "Where architects use AI today",
        paras: [
          "The most common use in the RIBA AI Report 2026 is early design visualisation, at around 56% of AI users. Compliance checking comes second at 40%, and practice management — drafting reports and project documentation — third at 32%.",
          "The survey drew over 1,100 design professionals, mostly RIBA members, between March and April.",
        ],
      },
      {
        h2: "What AI gives back at each project stage, and what you check",
        paras: [
          "Sort every AI result into one of two kinds before you use it: editable geometry you can develop, or a picture or a paragraph you read. Geometry can carry on into the drawing; text and images inform a decision and stop there.",
        ],
        subsections: [
          { h3: "Brief and research", paras: ["You feed in the client's brief, site notes, planning documents and meeting notes — stripped of client names and personal details unless your policy allows the tool to hold them. What comes back is text: summaries, open questions, a first draft of the brief. Every point gets traced back to its source document."] },
          { h3: "Concept and massing", paras: ["You feed in site constraints, area targets, reference images and early sketches; what comes back is usually a picture — a massing image, a mood view, form studies. Test each image against the site drawings before a client sees it: boundary, heights, the neighbours' windows, daylight. A picture can ignore all four."] },
          { h3: "Layouts from a brief", paras: ["You give a written brief — the type of space, the rooms and their relationships, plus a boundary if the footprint is fixed. What comes back depends on the tool: a picture of a plan, or a plan you can keep drawing. Areas, adjacencies and circulation are checked against the brief either way."] },
          { h3: "Existing drawings", paras: ["You give a scan, a PDF or a photo of a plan — on renovation, heritage and fit-out jobs often the only record of the building. What comes back is a reference image you draw over, or editable drawing elements; key dimensions are checked against a measured survey."] },
          { h3: "Interior images", paras: ["You give a viewpoint, a style and a short prompt about finishes and light. The image supports a conversation but carries no dimensions — compare its openings, furniture and proportions with the drawing, and label it as a concept image so nobody prices from it."] },
          { h3: "Specification, compliance and admin", paras: ["You give product data, regulations, project notes and meeting recordings. What comes back is text: draft specification clauses, compliance checklists, minutes and report drafts. Recordings often hold personal data, which the policy has to deal with."] },
        ],
      },
      {
        h2: "What architects worry about",
        paras: [
          "The recorded worries are specific, and most map to a rule a practice can write down. In the RIBA AI Report 2026, 76% of respondents agree that AI increases the risk of imitation.",
          "US architects in the AIA research reported in March 2025 named five areas of concern: inaccuracy (94%), unintended consequences (94%), privacy and security (93%), authenticity (90%) and lack of transparency (90%).",
        ],
      },
      {
        h2: "The studio rules to set before AI touches client work",
        paras: [
          "Write a one-page AI policy and agree it before anyone uses AI on a live job. Around 19% of practices say they have a documented policy, and about half either have one or plan one — which still leaves many without.",
          "The rules draw on published guidance with different reach — the AIA guidance for US members, the ICO, ARB and insurance sources for the UK — and none of it is legal advice. The core: tell clients when and how you use AI and put it in the appointment; keep personal data out of tools not cleared for it; label AI output for what it is; keep the sign-off with a named architect.",
        ],
      },
      {
        h2: "Using AI for early design in Synaps",
        paras: [
          "Synaps is browser-based design and drafting software where AI turns a brief into an editable plan and traces an image or PDF into editable drawing elements; a camera in the plan produces interior views. Draw a closed outline larger than 20 m² if the footprint is fixed, open Generate a floorplan, pick the boundary, describe the space, then develop the resulting plan with the normal drafting tools. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Should we tell clients when we use AI on their project?",
        a: "Tell them, and put it in writing at the start — a short paragraph in the fee proposal or appointment naming the stages where you use AI, the kind of output and who signs it off.",
      },
      {
        q: "How do we decide which stage to start with?",
        a: "Start where your own hours go: a renovation practice on existing drawings, a housing practice on early layouts. Then pick a stage whose check your team already knows how to make.",
      },
      {
        q: "What does a one-person practice need in an AI policy?",
        a: "Four rules cover it: disclosure to clients, no personal data in uncleared tools, labelled output, and a named person signing off. A sole practitioner still holds client data and carries professional indemnity cover, so the policy is not optional at any size.",
      },
    ],
  },
  {
    slug: "space-planning",
    title: "Space planning: how to test a layout against the brief before you draw it up",
    dek: "Turn the brief into a room schedule, test it against a space standard, read the adjacencies as zones, measure the circulation and furnish every room — all before the walls are fixed.",
    date: "2026-10-16",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/space-planning.png",
    sections: [
      {
        h2: "Start with a room schedule, not a sketch",
        paras: [
          "A room schedule turns the brief's prose into numbers you can test: every room, who uses it, and the area you are aiming for. Add the storage and the hall, because a brief rarely names them and a tight plan loses them first.",
          "Set targets from the brief and from comparable jobs, and keep them above any published minimum — with the minimum in its own column, so the margin stays visible as the plan changes. The worked example is a two-bedroom flat for four people: 74 m² target against a 70 m² standard minimum, bedrooms at 13.5 m² and 12.0 m² against an 11.5 m² minimum.",
        ],
      },
      {
        h2: "Check the schedule against a space standard",
        paras: [
          "England's nationally described space standard deals with internal space in new dwellings: gross internal areas at a defined occupancy, plus floor areas and dimensions for each room. Homes are described by bedrooms and bedspaces — the example flat is a 2b4p home — and one double bedroom must also reach the wider of the two published widths.",
        ],
      },
      {
        h2: "Read adjacencies into zones",
        paras: [
          "An adjacency matrix rates every pair of rooms once — read along the row and up the column. Three ratings are enough: essential (a shared wall or a direct door), desirable (a short route crossing no other room) and keep apart.",
          "The ratings tell you where shared walls and doors belong, and the groups they form are zones: a day zone for living, kitchen and dining, a night zone for bedrooms and bathroom, with the hall as the hinge between them.",
        ],
      },
      {
        h2: "Test circulation on the plan",
        paras: [
          "Circulation is the area nobody asked for, so measure it: add the hall and any corridor, divide by the gross internal area, and track that share across options. In the example, the 6.0 m² hall is about 8% of the 74 m² target.",
          "Then walk every route on the plan, from the entrance to the farthest door. Count the doors you pass through and the furniture you would step around — a route that cuts diagonally across the living room takes furnishable floor, even if it looks efficient.",
        ],
      },
      {
        h2: "Furnish every room before you fix the walls",
        paras: [
          "Furniture turns an area into a room, so place it before the walls are fixed. Start with the largest pieces — beds, the dining table, the sofa, the kitchen run — drawn at true size from manufacturer data or your office library.",
          "Then add every door swing, drawn the way the door will hang. A swing that hits a wardrobe or a bed corner is a layout problem, and the fix is a moved wall, not a smaller door.",
        ],
      },
      {
        h2: "Mistakes that show up after the layout is drawn",
        paras: [
          "Most layout problems that surface at dimensioning trace back to a skipped test:",
        ],
        list: [
          "Areas get read off the sketch instead of the schedule — a bedroom drawn by eye looks right until someone measures it.",
          "Width never gets tested — the room passes on area and then fails at the bed wall.",
          "External and internal measurements get mixed — a total to the outer wall face cannot be compared with the space standard.",
          "Storage is left to the end — cupboards end up in leftover corners, and the hall grows to make room for them.",
        ],
      },
      {
        h2: "Space planning in Synaps",
        paras: [
          "In Synaps you can draw or generate the plan and then test it with live room areas and measurements: draw the shell as a closed outline, open Generate a floorplan from command search, pick the boundary, and describe the space, rooms and relationships. Click inside each closed wall loop to define a room and watch its area as you move walls. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between space planning and interior design?",
        a: "Space planning decides where walls, doors and rooms go and how big each one is. Interior design works inside those decisions, with finishes, lighting, joinery and loose furniture. The two meet at the furniture layout.",
      },
      {
        q: "How much circulation is normal in a flat?",
        a: "Neither standard in the article sets a circulation share, so there is no published figure to hit. Compare your own options instead: a plan that opens rooms straight off the living space carries a small hall, while a corridor plan carries more.",
      },
      {
        q: "Which tools do architects use for space planning?",
        a: "Most studios mix several: the schedule in a spreadsheet, bubble diagrams on trace or a whiteboard, reviews in red pen on a print, and the measured layout in the studio's CAD or BIM tool.",
      },
    ],
  },
  {
    slug: "floor-plan-symbols",
    title: "Floor plan symbols: what each one means and how to keep them consistent",
    dek: "Door swings, window lines, section marks and grid bubbles are a plan's shorthand — and the legend decides what each one means. What the symbols say, who standardises them, and how to keep one standard across a practice.",
    date: "2026-10-15",
    minutes: 14,
    category: "Studio workflows",
    image: "/images/blog/covers/floor-plan-symbols.png",
    sections: [
      {
        h2: "Walls, openings and the line weights that carry them",
        paras: [
          "A plan reads through line weight before anyone looks at a symbol: walls cut by the plan plane take the heaviest line, elements below the cut a medium weight, and fixtures and hatch lines a light one.",
          "Poché — the fill inside cut walls — adds a second signal. Some offices fill every cut wall solid; others hatch by material so masonry, timber stud and concrete read differently at a glance. Either works when the legend says which.",
        ],
        subsections: [
          { h3: "Door symbols", paras: ["A hinged door carries three pieces of information: the hinge side, the swing direction and the leaf width, with the clear opening living in the door schedule. Draw the leaf at its full open position and the arc from the leaf tip. A double door shows two leaves and two arcs meeting at the centre; a sliding door shows offset leaves, often with an arrow; a pocket door adds its leaf as a dashed line inside the wall."] },
          { h3: "Window symbols", paras: ["A window shows the frame within the wall thickness and the glass as one or two thin lines, with the sill as a line on the outside face. Some offices add the opening type, such as a dashed arc for a casement; sill height belongs in the schedule, not on the plan."] },
        ],
      },
      {
        h2: "Stairs, fixtures and furniture",
        paras: [
          "A stair on plan shows treads as parallel lines, a direction arrow labelled UP (or DN on the floor above), and a break line where the plan plane cuts the flight.",
          "Fixtures are architectural symbols drawn at real size — a WC, basin, bath, shower tray or kitchen sink at its true footprint lets anyone check clearances from the plan alone. Take sizes from the manufacturer or an office library.",
        ],
      },
      {
        h2: "Reference and annotation symbols",
        paras: [
          "Reference symbols link one plan to the rest of the set, and most share one pattern: a circle split by a line, with the top half naming the drawing and the bottom half naming the sheet it sits on, plus an arrow showing which way the view looks.",
          "They are also the first thing to break — a section cut pointing to a renumbered sheet sends the reader nowhere, and a grid that differs from the structural engineer's grid makes coordination harder than it needs to be.",
        ],
      },
      {
        h2: "Who standardises floor plan symbols?",
        paras: [
          "Two national references set out symbol sets, one in the US and one in the UK.",
        ],
        subsections: [
          { h3: "The US National CAD Standard", paras: ["The United States National CAD Standard combines the AIA CAD Layer Guidelines, CSI's Uniform Drawing System and other modules, and adoption is voluntary. Symbols have their own module within the Uniform Drawing System, sorted by MasterFormat division numbers and titles, with a unique three-digit extension for each symbol."] },
          { h3: "BS 8541-2 in the UK", paras: ["BS 8541-2:2011 gives guidance and recommendations for symbols and graphic conventions, restricted to architectural and land registry symbols. Its compendium sorts them into six groups, from information devices and materials in section through to pipes, ducts, drains and sewers."] },
          { h3: "How the two references differ", paras: ["The US module files symbols under specification divisions; the British Standard groups them by what they represent. A practice working in both countries should choose one reference per job and name it in the legend."] },
        ],
      },
      {
        h2: "Set up one symbol standard for the practice",
        paras: [
          "An office symbol standard is a short written rule set plus a library of symbols drawn once. Five parts make it hold across jobs and across people.",
        ],
        subsections: [
          { h3: "Put a legend sheet in every set", paras: ["Draw a legend showing every symbol, line type and hatch the set uses, with a one-line meaning beside each. Name the reference it follows and mark any symbol you changed — the legend is the one place that settles a doubtful mark."] },
          { h3: "Draw each symbol once", paras: ["Draw every annotation symbol once and keep it as a reusable block: grid bubble, section mark, elevation marker, detail callout, level datum, north arrow, room and door tags. New copies come from the library, never from an old job."] },
          { h3: "Fix line weights and line types", paras: ["Write the line rules down with real pen values so nobody sets them by eye. Cut walls take the heaviest weight, elements below the cut a medium weight, fixtures and hatch lines a light weight, and elements above the cut or hidden are dashed."] },
          { h3: "Name the symbols and give them one owner", paras: ["Name each block for what it is and its version, such as grid_bubble_v2. Keep the library in one shared place and give it one owner — usually the design lead or a senior technologist — who approves changes and version bumps."] },
          { h3: "Check symbols before issue", paras: ["Run the pre-issue check: every symbol on the sheet appears in the legend; section, elevation and detail references point at sheets and drawing numbers that exist; grid letters and numbers match the structural drawings; door and room tags are unique and match their schedules."] },
        ],
      },
      {
        h2: "Mistakes that make a plan misread",
        paras: [
          "A misread plan usually traces back to one of four habits, and the office standard prevents each one.",
        ],
        subsections: [
          { h3: "Symbols copied from several sources", paras: ["The new hire's three door swings — each copied from a different old job — are the typical case. Symbols pasted from old jobs and consultant files drift apart in size, weight and meaning; replace them with library blocks before the first issue."] },
          { h3: "Swings that contradict the plan", paras: ["A door that opens into a corridor or across a stair landing leaves the reader unsure whether the plan or the symbol is wrong. Check every swing against how the door will actually be used."] },
          { h3: "Tags that drift from the schedules", paras: ["Doors and rooms get added and renumbered as the design moves. A tag that no longer matches its schedule row is worse than no tag — renumber the plan and the schedule in the same sitting."] },
          { h3: "Symbols that scale with the drawing", paras: ["A section mark drawn at model size for a 1:50 plan prints at a quarter of the size on a 1:200 plan. Size annotation symbols for the printed sheet instead."] },
        ],
      },
      {
        h2: "Draw and reuse plan symbols in Synaps",
        paras: [
          "In Synaps you draw the plan's walls, openings, rooms and annotations and keep reusable symbols as blocks: choose Door or Window, click a wall to set the position, click again to place the opening, then set width, height and sill in its geometry controls. Click inside a closed wall loop to create a room with a label and a live area, and press Cmd/Ctrl+B to turn a drawn symbol into a block whose contents update everywhere. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Do floor plan symbols change by country?",
        a: "Yes. The US National CAD Standard sorts its symbols by MasterFormat division, while BS 8541-2 sorts them by what each one represents — and offices in the same country vary the details too. Name the reference your legend follows.",
      },
      {
        q: "What does a triangle mean on a floor plan?",
        a: "Usually one of two things: a triangle on a short horizontal line with a value beside it is a level datum, giving a height above the project datum; a triangle with a number inside, often next to a cloud, is a revision tag.",
      },
      {
        q: "How do you read a symbol you do not know?",
        a: "Start with the legend, then the general notes. If the symbol carries a drawing or sheet number, follow it to the drawing it points to, then look it up in whichever reference the legend names. If none of that settles it, raise a query rather than guess.",
      },
      {
        q: "Do consultants have to use your symbols?",
        a: "Not usually, unless the appointment says so — each discipline keeps its own symbols and its own legend. Agree the shared ones at the start: grid, levels, north point and sheet referencing.",
      },
      {
        q: "Should a legend list every symbol or only the unusual ones?",
        a: "List every symbol that appears on the set, including the door swing and the north arrow. A symbol that looks obvious to you may be drawn differently in the reader's office or country, and a full legend gives the pre-issue check something to check against.",
      },
    ],
  },
  {
    slug: "redline-drawings",
    title: "Redline drawings: how to mark up a drawing set and close out the comments",
    dek: "A redline round works when every markup has an owner, a log entry and a closure against a numbered revision. How to mark up, how to run the comment log — and the four ways rounds break down.",
    date: "2026-10-14",
    minutes: 14,
    category: "Studio workflows",
    image: "/images/blog/covers/redline-drawings.png",
    sections: [
      {
        h2: "What a redline drawing is and who makes one",
        paras: [
          "A redline drawing is a copy of an issued sheet with the required changes marked on top; the issued drawing underneath stays untouched. The marks tell whoever revises the sheet next what to change, where and why.",
          "Four groups produce most redlines, each needing slightly different handling:",
        ],
        list: [
          "Internal check — a senior architect or the principal marks a sheet before it goes out.",
          "Consultant review — the structural or services engineer marks clashes, sizes and setting-out on your sheets.",
          "Client review — changes and questions, often mixed with preferences that need a conversation first.",
          "Contractor redlines — what was actually built, so the record drawings can be updated.",
        ],
      },
      {
        h2: "Colour and symbol conventions for redlining drawings",
        paras: [
          "Marking changes in red is the common thread across as-built and record specifications; beyond that, practice varies by office and by owner, so agree your team's set and write it into the office standard.",
          "One state manual gives the plainest rule for the two basic moves: write additions in red on the plans, and strike through deletions with the word \"deleted\" beside them. A strike-through is clearer than an erasure, because the reviewer can see what was removed.",
        ],
      },
      {
        h2: "How to mark up drawings so the drafter can act on them",
        paras: [
          "Write each markup for the drafter who was not in the review — that person has the sheet and the log, and nothing else. Five habits make a comment usable:",
        ],
        list: [
          "One comment per cloud — two changes inside one cloud tend to get half done, so split them and number each.",
          "A leader to the exact element — point at the wall, door or dimension that changes, not at the room around it.",
          "Words over sketches — write the change as a sentence and sketch only where the geometry needs it.",
          "Dimensions with units — give the new value, the unit and the point the dimension runs from.",
          "One question per comment, or one named change — each markup names the element and the change.",
        ],
      },
      {
        h2: "Keep a comment log and close every comment",
        paras: [
          "A comment log turns a pile of markups into a list someone can finish — one log per review round, or one per job if rounds overlap. An engineer's marked-up PDF, three client emails and a promised reissue all go into the same log.",
          "Close the loop in four steps, each with its own status: pick up (the owner reads the comment and asks about anything unclear), draft (the owner revises the drawing), back-check (someone other than the drafter compares the revised sheet with the original markup, comment by comment) and close (the checker records the revision that carries the fix).",
        ],
      },
      {
        h2: "Revision control on the reissued sheet",
        paras: [
          "The reissued sheet has to show what changed, in which revision and where that revision is recorded. University CAD standards are typical: revised areas shall be clouded and tagged with a delta triangle, with a revision schedule or row carrying the description and date.",
          "Cloud colour is where offices part ways — one standard wants revised areas outlined in black rather than red. Follow the client's or owner's standard where one exists, and your own otherwise.",
        ],
      },
      {
        h2: "Digital markup versus paper prints",
        paras: [
          "Red pen on a print was the original redline, and contractor record specifications still describe pencil on paper. Most design review now happens on PDFs, with the same marks drawn in software.",
          "Whichever tool you use, keep the markup separate from the drawing: the sheet underneath stays exactly as issued, so anyone can see what the reviewer was looking at, and each round sits on its own layer or in its own file named by revision.",
        ],
      },
      {
        h2: "Four ways a redline round breaks down",
        paras: [
          "Most lost comments trace back to one of four habits. Each has a plain fix you can write into the office standard.",
        ],
        subsections: [
          { h3: "Markups on an old revision", paras: ["A reviewer marks P02 while the drafter is already working on P03 — some comments are already fixed and others point at geometry that has moved. Write the revision on every markup and compare it with the current issue before anyone starts picking up comments."] },
          { h3: "Comments with no owner", paras: ["A comment addressed to \"the team\" tends to stay open. Assign every row in the log to one person when the round comes in, even if that person later passes it on."] },
          { h3: "Clouds that are never removed", paras: ["Clouds from three revisions ago make every sheet look changed, and readers stop trusting them. Turn off or clear the previous revision's clouds when a new issue supersedes them."] },
          { h3: "Verbal changes never recorded", paras: ["A client mentions a change on site, or a consultant agrees a beam size on a call, and it never reaches the drawing. Write every verbal change into the log with its source and date before anyone draws it, then confirm it in writing."] },
        ],
      },
      {
        h2: "Run a markup round on the drawing in Synaps",
        paras: [
          "The issued drawing and a round of markups can sit in the same project: import the issued PDF as an image, lock its layer so it cannot move, draw a closed dashed polyline in red around each change, and add leader text for the comment. The underlying sheet stays untouched. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between a redline and an as-built drawing?",
        a: "A redline is the markup. An as-built or record drawing is the clean sheet produced from the contractor's redlines once the work is done — the redline information is transferred to the new sheets and issued as a record.",
      },
      {
        q: "How should you number comments from several reviewers?",
        a: "Give each reviewer a prefix and number their comments in sequence — S01 for the structural engineer, C01 for the client. The number shows who raised the comment and stays unique across the log.",
      },
      {
        q: "What if you disagree with a comment?",
        a: "Answer it in the log rather than leaving it open: record the reason, discuss it with the person who raised it, and close the comment as \"no change\" once they agree. A comment closed with no change and no reason tends to return in the next round.",
      },
      {
        q: "Does a redline count as an instruction to change the work?",
        a: "That depends on the contract and on who issued the markup. Follow the contract's procedure for instructions and changes, and your practice's QA procedure for reviews and sign-off; where a markup's status is unclear, ask the issuer.",
      },
    ],
  },
  {
    slug: "web-based-cad",
    title: "Web-based CAD for architects: what to test before you move drafting",
    dek: "Before a studio moves drafting to the browser, one live job has to prove the consultant round trip, the printed scale, the oldest machine in the office and the way out. The checklist, question by question.",
    date: "2026-10-12",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/web-based-cad.png",
    sections: [
      {
        h2: "Files in and out: test the consultant round trip",
        paras: [
          "Start with the files, because a drafting tool that cannot take a consultant's drawing or send one back becomes an island. A typical job brings in a measured survey, a structural layout and services drawings, mostly as DWG or DXF.",
          "List what the test job actually exchanges before you open anything — the format each consultant sends, the format they need back, and the software they use. Then import the latest DXF, check that layers, text and hatches arrive, and send a DXF back the same way.",
        ],
      },
      {
        h2: "Precision and scale: typed lengths, snapping and a plotted check",
        paras: [
          "Precision is the item a screen hides best, so test it with numbers you already trust. Redraw one room from the measured survey with typed lengths and angles rather than drags, then compare the result with the survey figures.",
          "Snapping matters as much as typed input: try endpoints, midpoints, intersections and perpendiculars on walls you have just drawn, then snap to the imported consultant geometry, where tiny gaps and overlaps tend to show up. Finish with a plotted check — print a sheet at full size and put a scale rule on a known wall.",
        ],
      },
      {
        h2: "Sheets and printing: paper sizes, scales and title blocks",
        paras: [
          "Sheets are where a browser drawing becomes something a client or consultant receives. Set up the sheets you would actually issue on this job, at their real paper sizes and at each scale the job issues — a 1:100 plan, a 1:50 detail.",
          "Bring in your office title block rather than drawing a fresh one for the test. Fill in the job number, revision and drawing status, then see how the tool handles a revision change across several sheets.",
        ],
      },
      {
        h2: "The browser, the machine and the connection",
        paras: [
          "A browser tool still runs on hardware, so test it on the machines your team really uses — including the oldest one. Autodesk's AutoCAD web app page, for one, lists specific browsers it requires; and WebGL support, which browser tooling often leans on, needs hardware that supports it, not just a modern browser.",
          "Test the failure case too: disconnect mid-edit, keep drawing, reconnect, and note what was saved, what was lost and whether the tool warned you.",
        ],
      },
      {
        h2: "Saving, history and getting your work out",
        paras: [
          "Plan how you would leave before you commit, because a browser tool keeps your drawings in the vendor's account. Ask how and when work is saved, whether earlier versions can be restored, how far back they go and who can restore them.",
          "Then run the exit once on the test project: export every sheet and the drawing geometry, open the files in your office CAD tool and carry on drafting from them. If carrying on needs a redraw, the exit plan has failed.",
        ],
      },
      {
        h2: "Sharing, roles and who pays",
        paras: [
          "Sharing decides how the tool fits a team, and billing decides what it costs as the team grows. Map the roles on the test job first: who draws, who reviews and who only needs to look.",
          "Cloud working is already normal — an NBS survey of UK construction professionals found around eight in ten using some form of cloud computing daily, and three-quarters using it to collaborate — so the question is fit and cost, not fashion.",
        ],
      },
      {
        h2: "Data and security questions to ask the vendor",
        paras: [
          "A few written questions show how a vendor handles your drawings and your clients' information. The UK National Cyber Security Centre's cloud security principles give a useful frame, including where your data is stored, who can access it and which legal jurisdiction covers it.",
        ],
        list: [
          "Data in transit protection — how drawings are protected between your browser and the vendor's servers.",
          "Asset protection and resilience — where files are stored and how they are backed up.",
          "Secure user management — how you add people, change their role and remove them.",
          "Identity and authentication — how people sign in, and whether the account can require a second factor.",
        ],
      },
      {
        h2: "Run a one-project test before you move the team",
        paras: [
          "A one-project test turns the checklist into evidence. Pick a live job that is real but contained — a rear extension, the redraw of an existing flat — run it with the people who would use the tool every week, and agree the pass list up front.",
          "Sort what fails into two groups: items that rule the tool out (a failed round trip, a plotted scale that is wrong) and items that only narrow which jobs it suits (a feature you rarely use). A typical pass list covers consultant files in, files back out, typed precision, plotted scale, and the machines and browsers themselves.",
        ],
      },
      {
        h2: "Try the checklist in Synaps on a current job",
        paras: [
          "Synaps is browser-based design and drafting software for architects working on everyday buildings. To run the one-project test on a current job: export a DXF of the existing plan from your office CAD tool, import it, place walls with typed dimensions in the active controls, toggle snapping, then add a paper at an ISO size and set the drawing scale. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Can web-based CAD sit alongside AutoCAD, Revit or Archicad?",
        a: "Yes, and that is the calmer way to start. Give the browser tool a defined role — early plans, redraws of existing drawings, a second seat at home — and keep coordinated models and consultant drawing sets in the tools that already handle them.",
      },
      {
        q: "What happens if the internet drops while I am drafting?",
        a: "Find out on the test project rather than from the sales page: disconnect mid-edit, keep drawing for a minute, reconnect, and note what was saved, what was lost and whether the tool warned you. Repeat once on a slow connection.",
      },
      {
        q: "Who in a studio should run the test?",
        a: "The person who drafts most, with the principal alongside. The drafter finds the precision and file problems in daily use; the principal sees sharing, billing and what clients and consultants receive. Both should agree the pass list.",
      },
      {
        q: "What if a consultant only sends PDFs?",
        a: "Treat the PDF route as its own test item. A vector PDF holds lines and text a tool can extract, while a scan holds only pixels to trace or redraw. Ask the consultant for a DXF where they can produce one, and test both kinds of PDF if they cannot.",
      },
    ],
  },
  {
    slug: "ai-architecture-render",
    title: "AI architecture render from a floor plan: what to send and what comes back",
    dek: "A plan-based render carries the geometry you drew and invents what you left open. What to prepare on the plan, where to put the camera, and how to read the image honestly against the drawing.",
    date: "2026-10-11",
    minutes: 12,
    category: "Studio workflows",
    image: "/images/blog/covers/ai-architecture-render.png",
    sections: [
      {
        h2: "What an AI render from a plan carries and what it invents",
        paras: [
          "A render made from a plan carries what you drew and invents what you left open: the walls, openings and placed furniture set the room, and the camera sets what the view shows. Wall colour, floor material, light, plants, books and cushions come from the model.",
          "That split is the reason to render from a plan at all — text-to-image tools start from words, so the room shape is a guess. A plan-based tool gives the model your room to work from.",
        ],
      },
      {
        h2: "Prepare the plan before you render",
        paras: [
          "The render can only follow what the plan holds, so finish the plan for the room you want to show. Three things decide most of the result.",
        ],
        subsections: [
          { h3: "Openings at real size and sill height", paras: ["Draw every window and door in the view at its real width, height and sill height — a window drawn as a plain gap leaves the model to guess its shape, and a full-height glazed door lights a room very differently from a window with a 900 mm sill. Set the opening type as well as the size, and resize any prompt-generated openings before you place a camera."] },
          { h3: "Furniture at real size", paras: ["Place the furniture you want the client to see, at real size and in its real position — a 2.4 m sofa against a 3.6 m wall is a design statement. An empty room lets the model furnish it with whatever fits its own idea of the space."] },
          { h3: "One design question per view", paras: ["Decide what each view has to answer before you render it: whether the dining table fits beside the kitchen run, or whether a widened opening joins two rooms. A view that tries to answer three questions at once answers none of them well."] },
        ],
      },
      {
        h2: "Place and aim the camera",
        paras: [
          "The camera decides which part of the plan the client sees, so place it where a person would stand — at standing eye height, about 1.5 to 1.6 m, unless the question is about a seated view. A high camera flattens the furniture.",
          "Aim at the wall that answers the design question. For a widened opening, stand in one room and face the other through it; to show daylight on a material, aim across the window rather than straight at it, so the light falls across the surface.",
        ],
      },
      {
        h2: "Write a short brief",
        paras: [
          "The brief guides what the model invents, so spend it on the parts you left open — atmosphere, the finishes that matter for this view, and the time of day.",
          "Name materials the way you would to a client: pale oak, lime plaster, terrazzo with a white aggregate. Vague words such as \"modern\" or \"cosy\" leave the choice to the model. Keep to three or four finishes so each one stays readable.",
        ],
      },
      {
        h2: "Read the result against the plan",
        paras: [
          "Read the image the way you would read a consultant's drawing: against your own plan. Count the windows and doors in the view and match each one to the plan; count the seats, tables and beds; compare proportions such as ceiling height.",
          "Look at door swings and thresholds too — a door that opens the wrong way in the image tells the client something you did not draw.",
        ],
      },
      {
        h2: "Fix each problem at its source",
        paras: [
          "Correct the input that caused the problem: geometry lives in the plan, the viewpoint lives in the camera, and finishes live in the image. Moving a window in the image leaves the plan and the picture telling different stories.",
          "Render again after every plan change — a generated image shows the plan as it stood when you rendered it, and later edits do not reach it.",
        ],
        subsections: [
          { h3: "Test finishes on the image", paras: ["Finishes are the one input you can test directly on the image. Change one surface at a time, so the client can see what each decision does, and compare each version with the first image before moving to the next surface."] },
        ],
      },
      {
        h2: "Present it to the client honestly",
        paras: [
          "Show the image as what it is: a concept-stage view of one design question. Label it on the sheet — \"Concept view, finishes indicative\" — and put the plan beside it with the camera position marked, so the client knows where they are standing.",
          "The drawing is what the client agrees to; the image helps them read it.",
        ],
      },
      {
        h2: "Create interior views from your plan in Synaps",
        paras: [
          "In Synaps you create interior images from a camera placed in your own floor plan, test finishes on them, and export the view for the meeting: draw or trace the plan, furnish it from the asset library, choose Camera from the drawing tools, click to place it, aim, and select the camera alone to see its rendering prompt. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I render a plan that exists only as a scan or photo?",
        a: "Not directly — a render needs walls, openings and a camera position, and a picture holds none of them as geometry. Trace the picture into editable walls and openings first, or draw over it.",
      },
      {
        q: "How should I label and name the views on a sheet?",
        a: "Number each view and title it with the question it answers — \"View 2: kitchen to dining through the widened opening\" — and put the same number at the camera position on the plan. Keep the concept-stage note and the AI line underneath.",
      },
      {
        q: "How many views does a client meeting need?",
        a: "One per design question, which often means two to four for a flat or a house extension. A few labelled views are easier to discuss than a gallery.",
      },
      {
        q: "Should I keep older versions of a view?",
        a: "Keep the version the client approved, named with the date and the plan revision it came from. Retire superseded views from the presentation, so nobody discusses a layout that has moved on.",
      },
    ],
  },
  {
    slug: "image-to-cad",
    title: "Image to CAD: turn a JPG or photo of a plan into an editable DXF",
    dek: "A JPG of a plan holds pixels, not geometry — and nothing in the file says how big the building is. Rebuild the geometry by tracing, vectorising or drawing over an underlay, then set the scale from a dimension you trust.",
    date: "2026-10-10",
    minutes: 14,
    category: "Studio workflows",
    image: "/images/blog/covers/image-to-cad.png",
    sections: [
      {
        h2: "What a JPG or photo of a plan gives you",
        paras: [
          "A raster image carries what the plan shows, but none of its geometry and none of its scale: walls, doors and text are all coloured pixels on a grid, with no layers, no wall entities and no line weights.",
          "A DPI value stored in the image only tells a printer how large to print it, and the scale note on the sheet holds only if the photo is square-on and you know the print size. You rarely know the print size.",
        ],
      },
      {
        h2: "What an online image to DXF converter gives you",
        paras: [
          "Online converters vectorise the picture: they turn areas of dark pixels into outlines and save them as DXF on their own servers.",
          "On a plan, three things follow. A wall comes back as the outline of a dark shape, with two edges and nothing between them. Curves become chains of short straight pieces. Text becomes shapes — which is why converted drawings often need real text redrawn.",
        ],
      },
      {
        h2: "Prepare the photo or image before you convert it",
        paras: [
          "Most conversion problems start in the photo, so fix them before any software sees the file. When the client can reshoot, send them this list.",
        ],
        list: [
          "Shoot square-on, with the phone parallel to the sheet and centred over it.",
          "Lay the sheet flat — weigh down curled corners and take it out of any sleeve or frame.",
          "Use even daylight and no flash: glare wipes out lines, and a shadow across the sheet can read as a wall.",
          "Keep a figured dimension or a scale bar in the frame.",
          "Step back rather than zoom — phone lenses bend straight lines near the edges of a wide shot, and digital zoom costs pixels.",
        ],
      },
      {
        h2: "How much detail survives in a photo or scan",
        paras: [
          "Pixel count sets the smallest thing a photo can show, and on a large sheet that limit arrives early. A 12 MP phone photo of an A1 sheet that fills the frame gives about 21 mm of building per pixel at 1:100 — a 100 mm partition is about five pixels wide, with soft edges on both sides.",
          "Read any such figure with its condition: the sheet must fill the frame edge to edge, with no perspective.",
        ],
      },
      {
        h2: "Three routes from image to CAD",
        paras: [
          "Choose the route by what the image holds and what the drawing has to do next. All three end with the same scale step.",
        ],
        subsections: [
          { h3: "Trace into walls and openings", paras: ["Tracing reads the plan as architecture and returns walls, doors and windows rather than loose lines. It suits a legible plan of an existing building you are about to design on — and the traced elements are edited with the same drafting tools as walls drawn line by line."] },
          { h3: "Vectorise the linework", paras: ["Vectorising turns dark pixels into lines and arcs, with no idea which line is a wall. It works best on bitonal images — clean black ink on a white sheet — and leaves you a cleanup job on one layer."] },
          { h3: "Keep the image as an underlay and draw over it", paras: ["The underlay route keeps the picture as a reference while you redraw the plan line by line on top. It suits sketches, faint or damaged sheets, and plans where most walls will change anyway."] },
        ],
      },
      {
        h2: "Set the scale from a known dimension",
        paras: [
          "Take the scale from a written dimension, never from the scale note or a ruler laid on the print: a figured dimension records a measurement or a design decision, while a scale note assumes the sheet was printed at its original size.",
          "Pick the longest dimension you trust — an overall external length — so an error of a few pixels at its ends counts for less, and measure between the faces the dimension refers to.",
        ],
      },
      {
        h2: "Check the drawing after conversion",
        paras: [
          "Each check compares your drawing with something that does not come from the image. When the checks disagree by more than the job can carry, stop adjusting and measure the building — an old plan shows what someone intended, which is not always what was built.",
        ],
        list: [
          "Measure a second known dimension, ideally at right angles to the first — when both agree, the scale holds in both directions.",
          "Compare the overall footprint with a site plan, a survey or a measurement taken outside.",
          "Confirm that walls meant to meet at right angles do — a consistent skew points to a photo taken at an angle.",
          "Compare wall thicknesses: external walls of one build should read the same along their length.",
        ],
      },
      {
        h2: "Hand it on as DXF or PDF",
        paras: [
          "Send DXF when the recipient needs geometry — a services engineer drawing over your plan — and PDF when they need to read or print it. In practice, \"JPG to DWG\" means getting a DXF into AutoCAD and saving it there as DWG.",
        ],
      },
      {
        h2: "How to do it in Synaps",
        paras: [
          "In Synaps you drop the JPG, PNG, GIF, WebP or PDF onto the canvas, choose Trace when the detected floor plans are offered (or Keep as image for an underlay), adjust the highlighted regions so they cover the plan, then select everything and press S to scale from a wall of known length. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I convert an image to CAD online for free?",
        a: "Yes, for clean line art — free online converters turn a JPG or PNG into DXF outlines. On a plan, expect outlines rather than walls, text as shapes and no scale, so budget time for cleanup or trace the plan instead.",
      },
      {
        q: "Can I convert an estate agent's JPG plan to CAD?",
        a: "Yes, for the room layout. Marketing plans are often redrawn for the listing and marked as not to scale, so take the scale from a dimension measured on site — and make sure you have the right to reuse the plan.",
      },
      {
        q: "Does a PNG convert to DXF better than a JPG?",
        a: "Usually, yes. PNG compression is lossless, so thin lines keep sharp edges; JPG compression adds blocky artefacts around dark lines, which a vectoriser reads as noise. Export screenshots and scans as PNG at the highest resolution available.",
      },
      {
        q: "Can I convert a sketch to CAD?",
        a: "Yes — picture to CAD works the same way from a sketch, through the underlay or a trace. A sketch has no dimension you can measure, so scale it from a dimension you have fixed, such as the plot width from the site plan.",
      },
    ],
  },
  {
    slug: "architectural-title-block",
    title: "Architectural title block: what goes on it and how to set it up once",
    dek: "Project, sheet title and number, date, revision, and the names behind the sheet. What a title block must carry, where it sits on the sheet, and how to set it up once as an office standard.",
    date: "2026-10-09",
    minutes: 12,
    category: "Studio workflows",
    image: "/images/blog/covers/architectural-title-block.png",
    sections: [
      {
        h2: "What a title block must carry",
        paras: [
          "ISO 7200:2004 lists 19 data fields for a title block in three groups, 8 of them mandatory. Identifying fields carry the legal owner, an identification number, the date of issue, a revision index, the sheet count and the language. Descriptive fields carry the title — mandatory — and a supplementary title. Administrative fields carry the approval person, the creator, the document type, the department, a technical reference and a classification.",
          "The standard keeps the block short on purpose: scale, the projection symbol and general tolerances sit outside the block and appear only where they are used.",
        ],
      },
      {
        h2: "Where the title block sits and how big the sheet is",
        paras: [
          "ISO 5457:1999 puts the title block in the bottom right corner of the drawing space, with A0 to A3 sheets landscape only — A4 is the exception, carrying the block across the shorter, lower part of a portrait sheet.",
          "The border is 20 mm on the left as a filing margin and 10 mm on the other three sides, and ISO 7200 fixes the block's total width at 180 mm, so it fits an A4 sheet between those margins. The same block then serves every larger sheet unchanged.",
        ],
      },
      {
        h2: "Sheet numbers that survive a change to the set",
        paras: [
          "A sheet number should still be right after a sheet is added or pulled, which rules out numbering the set 1 to n.",
          "The US pattern joins a discipline letter, a sheet type digit and a sequence number — A-101. The Corps of Engineers' CAD standard lists eleven discipline letters, among them A for architectural, S for structural, M for mechanical and E for electrical.",
        ],
      },
      {
        h2: "Revisions, status and dates",
        paras: [
          "ISO 7200 allows a revision index of letters A to Z, then AA and AB, or figures 1, 2, 3 — avoid I and O, which read as 1 and 0. The date of issue alone may stand in for the index.",
          "Under ISO 7200 the date of issue is the day of the first official release and of each released version after it. University standards are blunt on the point: the original issue date does not change once the drawing has been issued.",
        ],
      },
      {
        h2: "Scale, north arrow and the sheet grid",
        paras: [
          "Put a graphic scale on every scaled drawing, so a print reduced to A3 still reads. The Corps of Engineers' graphics standard asks for at least one graphic scale per scale used on the sheet, and Los Alamos draws all principal plans in a set at one scale, with a graphic scale on each.",
        ],
      },
      {
        h2: "Seal, signature and who signs",
        paras: [
          "Some jurisdictions require a seal, a signature and a date on every sheet — Texas is one example, where an architect may not issue a regulated drawing unless it is sealed, signed and dated, legible on every copy, with electronic seals allowed on the same condition.",
          "The rule puts the seal, signature and date on each sheet of drawings and on the index sheet, and sets a minimum seal size of 1.5 in. Who signs is a licensure question: the sealing architect takes responsibility for the sheet.",
        ],
      },
      {
        h2: "Set it up once: the office standard",
        paras: [
          "Write the office standard as a one-page list that fixes six things: the field list, the sheet sizes, the number scheme, the revision scheme, the date format and the text heights — for which the GSA sets a floor of 1/8 in.",
          "Keep one block per sheet and lock it. One university standard requires exactly that: one title block per file, in paper space.",
        ],
      },
      {
        h2: "Title blocks in Synaps",
        paras: [
          "In Synaps you draw the sheet, block and fields once and reuse them on every paper: press F for a paper and pick an ISO size, draw the outline and cells as rectangles typed to size, place each field as text, and keep the per-sheet fields — sheet title, number, revision row — as plain text on each paper over the block. A studio with its block already drawn as DXF or SVG imports the file and makes the block from the imported lines. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the title block go on A4 sheets too?",
        a: "Yes — A4 is the one portrait sheet under ISO 5457, with the block across its lower part. Draw the block for A4 first and the larger sheets take it unchanged.",
      },
      {
        q: "What goes in the title block of a sketch?",
        a: "Enough to file it. Improvised blocks are accepted on sketches, provided they give the project number, drawing number, project title, sheet title, sheet number where one applies, and the author.",
      },
    ],
  },
  {
    slug: "floor-plan-dimensions",
    title: "Floor plan dimensions: how to dimension a plan a builder can use",
    dek: "Dimensions tell a builder where every wall, opening and column goes, measured from points they can find on site. Strings, faces, units and tolerances — and how to check the strings add up before issue.",
    date: "2026-10-08",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/floor-plan-dimensions.png",
    sections: [
      {
        h2: "What a dimensioned floor plan must let a builder do",
        paras: [
          "A dimensioned plan must let the builder set out the building and place every wall and opening without scaling the drawing. Setting out starts from a few fixed points — a slab edge, a grid line — and the controlling dimensions on the plan determine the positioning of the building.",
        ],
      },
      {
        h2: "What to dimension and in what order",
        paras: [
          "Dimension in parallel strings outside the building, with the smallest parts nearest the wall and the overall furthest out. Three strings cover most plans of everyday buildings, and the LANL CAD standard works the same progression outwards from centre lines.",
        ],
        list: [
          "Openings string — wall ends, door and window openings, piers — nearest the wall.",
          "Grid or structure string — grid lines, columns, loadbearing walls, stubs — in the middle.",
          "Overall string — the total length of each face of the building — furthest from the wall.",
        ],
      },
      {
        h2: "Which face to dimension from, and how to say so",
        paras: [
          "Pick one reference for each kind of element, write it in a general note and keep to it on every sheet. Offices choose differently and none of the cited standards settles the question, so the note does the work.",
          "One line can carry the choice — \"Dimensions are to structural faces unless marked clear\" — with every exception marked where it occurs. The general notes should also list the units and which walls are existing and which are new.",
        ],
        list: [
          "Structural face — blockwork, studs or concrete: the builder can set out from it before finishes go on, so it suits walls and openings in new work.",
          "Finished face — the plaster or lining: use it where a clear size matters, such as a minimum bedroom width or a fitted kitchen run.",
          "Centre line — grid lines and columns, and in some offices stud partitions and door openings.",
        ],
      },
      {
        h2: "Units and notation for floor plan dimensions",
        paras: [
          "Use one unit system, state it once on the sheet and keep the notation the same on every plan. On metric plans, write lengths in millimetres without a unit symbol and say so in a general note; write levels in metres.",
          "Owner standards set the text minimums: Los Alamos asks 3/32 in for any text including dimensions, Creighton not less than 1/8 in on printed drawings, and Illinois State 3/32 in text on a 3/8 in baseline spacing.",
        ],
      },
      {
        h2: "Room sizes and areas",
        paras: [
          "Give each room a clear size or an area, and say which face the area is measured to. Some owner standards ask for an area in every room — Creighton's format prints it as \"100 S.F.\"; on a metric plan, write the area in square metres beside the room name.",
        ],
      },
      {
        h2: "How to check that dimension strings add up",
        paras: [
          "Add every string and compare it with the string outside it, then with the overall. A kitchen-wall string that sums to 8850 against an overall of 8900 has 50 mm missing, and you find that before the sheet leaves the office — fix the geometry or the source figure, never the dimension text.",
        ],
        list: [
          "Sum each opening string and compare it with the grid or structure string beside it.",
          "Sum each grid string and compare it with the overall, and the overalls of opposite faces with each other.",
          "Follow each internal wall back to a grid line or an external face.",
          "Look for any figure given twice, and delete one.",
        ],
      },
      {
        h2: "Tolerances: how far built work can differ from the plan",
        paras: [
          "A plan dimension is the target the builder sets out to; setting out, straightness, level and flatness each carry their own tolerance on site. One UK warranty manual shows the values it accepts for new homes: a timber frame substructure within ±10 mm in length, width and line, and a wall out of straight on plan by up to ±8 mm in any length.",
        ],
      },
      {
        h2: "How to read floor plan dimensions you receive",
        paras: [
          "Read the general notes first, then the strings from the outside in — a plan from another office follows that office's habits.",
        ],
        list: [
          "Find the unit note and the reference face; if neither is stated, ask before you use any figure.",
          "Add one string yourself — if it does not close, report it rather than choosing the figure you prefer.",
          "Look for marks that change the reference, such as \"clear\", \"finish\" or a centre line symbol.",
          "Separate existing walls from new ones.",
        ],
      },
      {
        h2: "Dimensioning a floor plan in Synaps",
        paras: [
          "In Synaps you place a dimension in three clicks with D, run strings end to end with the Chained placement, create rooms by clicking inside closed wall loops for auto-numbered labels and live areas, and use Measure to check each string against the overall. Dimensions are static annotations — they do not follow a wall you move afterwards, so edit or replace them. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What does \"do not scale\" mean on a floor plan?",
        a: "It tells the reader to use only the written figures and keep a ruler off the print — a 1:50 sheet printed to fit is no longer 1:50. If a figure is missing, the builder asks the architect; put the note on every sheet.",
      },
      {
        q: "Should door openings be dimensioned to the centre line or to the edges?",
        a: "Either works if the note says which. Many offices dimension the structural opening edges, because that is what the builder forms; a centre line suits a door centred on a corridor or a window centred on a room.",
      },
      {
        q: "Can I trust dimensions on a plan converted from a PDF or a scan?",
        a: "Not until you check one. A scan can be stretched and a converted file can carry the wrong units — compare one known written dimension, such as an overall, with the drawn length before using anything from the file.",
      },
    ],
  },
  {
    slug: "schematic-design",
    title: "Schematic design: what it produces and how to run it",
    dek: "The phase where an agreed brief becomes a preliminary design the client can approve. What schematic design produces, seven steps to run it in a small practice, and the failure modes to avoid.",
    date: "2026-10-07",
    minutes: 14,
    category: "Practice",
    image: "/images/blog/covers/schematic-design.png",
    sections: [
      {
        h2: "What schematic design is",
        paras: [
          "Schematic design is the first design phase of a project, after the brief and before design development. The AIA B101-2017 owner-architect agreement lists the basic services phases as schematic design, design development and construction documents.",
          "The contract describes the output as a preliminary design illustrating the scale and relationship of the project components — you are deciding how big the building is and how its parts fit together.",
        ],
      },
      {
        h2: "What schematic design produces",
        paras: [
          "A small set of drawings and checks that let a client approve a scheme: preliminary building plans, sections and elevations, with optional study models and perspectives. The site plan settles footprint, orientation, access and boundaries; the sections settle floor levels and ceiling heights; the elevations settle massing, roof form and main openings.",
          "The AIA's schematic design checklist adds practical objectives — a structural grid and representative exterior modules fixed, and a schematic design estimate — that mark the difference between a sketch and a phase you can close.",
        ],
      },
      {
        h2: "How to run schematic design in a small practice",
        paras: [
          "Most practices that run this phase are small — about 75% of US architecture firms have fewer than 10 employees — so one or two people carry it from brief to sign-off. Seven steps cover the work.",
        ],
        subsections: [
          { h3: "1. Confirm the brief and programme", paras: ["Write the brief down and get the client to agree it: each room or space, its target area, the relationships that matter, the budget and the planning constraints you know of. RIBA places this agreement at the end of Stage 1, before concept design starts — if the brief is still moving, every option you draw moves with it."] },
          { h3: "2. Gather site and existing conditions", paras: ["Collect the site plan, the boundary, levels and planning history. For an extension, the existing house is part of the site — its walls, floor levels and openings decide where the new work can connect. Treat an old PDF of the existing house as a starting point, not evidence: check it on site before you design from it."] },
          { h3: "3. Explore options loosely", paras: ["Sketch several ideas quickly before drawing any of them properly, testing big moves: where the extension goes, how it meets the house, which way the main room faces. Sketch over the site plan so every idea stays inside the boundary. A generated layout can serve as one more starting point to react to."] },
          { h3: "4. Test options against the programme", paras: ["Test with numbers, not impressions: measure every room, add up the net area and compare it with the target, and check circulation, where area quietly disappears. Some public owners ask for this in writing — floor plans labelled with room name and room square footage."] },
          { h3: "5. Choose and draw one option properly", paras: ["Pick the option that fits the brief, the site and the budget, and draw that one properly: real wall thicknesses, true room sizes, floor levels that work. Details and specifications wait. Draw the plans first, then the main elevations, and one or two sections through the parts that matter."] },
          { h3: "6. Review with the client and get written sign-off", paras: ["Present the chosen scheme with the reasons it was chosen, and discuss alternative approaches as the AIA checklist expects. Then ask for approval in writing — a short approval that names the drawings, their revision or date, and the budget they were estimated against. Sheets take an ISO size and a scale such as 1:100 and export as PDF."] },
          { h3: "7. Hand over to design development", paras: ["Start design development from the approved drawings, not the sketches. Write down the questions the client left open — a window size, a roof finish — and carry them as a list. Detailed work on a concept without enough client buy-in risks abortive design work."] },
        ],
      },
      {
        h2: "How many options to show in schematic design",
        paras: [
          "Show the client two or three options at most, and recommend one — each extra option costs drawing time and makes the decision harder. Some public owners set the number in their own rules, capping the architect at a maximum of three proposed design solutions.",
        ],
      },
      {
        h2: "Fee share for the schematic design phase",
        paras: [
          "Where guidelines split the fee, schematic design takes a defined slice: Washington State's OFM gives it 18% of the basic services fee, and one school district's guidelines give it 15% of the total, with a separate 5% for programme verification. Treat any split as a starting point rather than a rule — the same documents say as much.",
        ],
      },
      {
        h2: "Common failure modes in schematic design",
        list: [
          "Starting before the brief is agreed — options drawn against a moving brief get redrawn.",
          "Designing on an unchecked existing plan — one misplaced wall on an old PDF can sink a whole option.",
          "Showing variations of one idea as separate options — the client chooses between finishes, not between different moves.",
          "Area drift — rooms shrink once walls get real thicknesses, so recheck areas after drawing the chosen option.",
        ],
      },
      {
        h2: "Checklist before client sign-off",
        list: [
          "The brief and programme are agreed in writing, with a date.",
          "Existing conditions are checked on site, not only copied from old drawings.",
          "Every room is named and has an area, and the total sits within the programme target.",
          "The footprint sits inside the site boundary and the planning limits you know of.",
        ],
      },
      {
        h2: "Running schematic design in Synaps",
        paras: [
          "In the schematic design phase Synaps covers the plan work: trace the old PDF or scan of the existing house, define rooms by clicking inside closed wall loops and watch their live areas, and draw the chosen option with typed wall lengths and angles. Generated plans are starting layouts you check against the brief and regulations. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between schematic design and design development?",
        a: "Schematic design decides what the building is — its size, layout and form. Design development decides how it works and what it is made of, with consultants such as a structural engineer. If a question changes the layout, settle it in schematic design.",
      },
      {
        q: "Do schematic design drawings need sections and elevations?",
        a: "Yes, in most cases. Even a single-storey extension needs one section to prove the levels and roof work with the existing house, and elevations show the client the roof form and main openings next to the existing building.",
      },
      {
        q: "How detailed should schematic design be?",
        a: "Detailed enough to decide on, and no more — RIBA describes the stage as more about rules of thumb than detailed analysis. Leave door schedules, specifications and service routes for later phases.",
      },
      {
        q: "What does the client sign at the end of schematic design?",
        a: "A short approval naming the drawings, their revision or date, and the budget they were estimated against — with the open questions listed in the same document, so the client knows what is still to decide.",
      },
    ],
  },
  {
    slug: "as-built-drawings",
    title: "As-built drawings: what they show and how to produce them",
    dek: "As-builts record what was actually built or what stands now — not what was designed. The three things the term covers, a six-step production workflow, and how to check a set you receive.",
    date: "2026-10-06",
    minutes: 14,
    category: "Studio workflows",
    image: "/images/blog/covers/as-built-drawings.png",
    sections: [
      {
        h2: "What as-built drawings are",
        paras: [
          "As-built drawings record what exists rather than what was intended, and in practice the term covers three different things made by different people at different times.",
        ],
        list: [
          "A contractor's as-built set — changes marked up by hand on the design drawings, during and at the end of construction.",
          "Record drawings — a formal, updated set compiled by the design professional from the contractor's markups.",
          "A measured survey or existing-conditions drawing — the building as it stands today, measured before a new project.",
        ],
      },
      {
        h2: "As-built vs record drawings",
        paras: [
          "The difference lies in who marks up and who compiles: one university standard has the construction manager deliver a complete set of redlined as-built drawings to the design professional, who compiles the record set.",
          "The reason an owner wants them is practical — record drawings let later consultants modify existing drawings instead of creating new ones from field measurements, which only works if the record set is trustworthy.",
        ],
      },
      {
        h2: "When you need as-built drawings",
        paras: [
          "At handover, before a renovation or extension, and whenever you alter a building whose drawings are lost. On projects with a health and safety file under CDM 2015, that file is the natural home for them at handover.",
        ],
      },
      {
        h2: "What to put on as-built drawings",
        paras: [
          "Decide what the drawings must show before anyone goes to site — the RICS standard for measured surveys calls these decisions critical to the success of any project relying on survey information. Start from the outputs a client can select:",
        ],
        list: [
          "Floor plans, roof plans and reflected ceiling plans.",
          "Sections and elevations.",
          "Walls, doors, windows, stairs, columns and beams.",
          "Ceiling heights and floor levels, including a level at the centre of each room.",
        ],
      },
      {
        h2: "How to produce as-built drawings of an existing building",
        paras: [
          "Six steps take you from an old drawing — or an empty folder — to a dated set you can design from.",
        ],
        subsections: [
          { h3: "1. Gather what exists", paras: ["Collect every drawing you can find: the client's old set, planning drawings from the council's portal, building control records, and photos from earlier building work, which sometimes show what nothing else does. An old scanned or PDF plan can become your underlay or an editable starting point."] },
          { h3: "2. Decide the accuracy and scale before you go", paras: ["The RICS standard links each survey accuracy band to a drawing scale, so choose the scale you will issue at first and measure to suit it. A 1:50 plan of a house asks for different care from a 1:20 heritage detail."] },
          { h3: "3. Measure on site", paras: ["Sketch every floor by hand before you measure anything, so each figure has a place to go. Take running dimensions from one corner along each wall rather than separate lengths per room — running figures keep small errors from adding up — and measure both diagonals of every room."] },
          { h3: "4. Draw up the same day", paras: ["Draw up while the site is fresh in your mind: gaps you notice that evening can still be filled with a return visit the next morning. Type wall lengths from the survey sheet into the drawing, and where your survey and an old traced plan disagree, the survey wins."] },
          { h3: "5. Check against the building", paras: ["Check the drawing against figures you did not use to draw it — the long overall dimension and the room diagonals are the best tests. Use Measure to check a known distance, and rescale if the whole traced drawing is the wrong size; the check is yours to make."] },
          { h3: "6. Issue with date and status", paras: ["Every sheet needs the survey date, the name of whoever measured it, the datum and a status note. Issue on ISO sheets at 1:50 or 1:100, export them as one combined PDF, and give a consultant who needs geometry the plan file as well."] },
        ],
      },
      {
        h2: "Survey accuracy bands and drawing scale",
        paras: [
          "The RICS standard pairs a plan accuracy with a scale for each survey band: a client requiring 10 mm plan accuracy at a 95% confidence interval should select a band C survey. Read the pairing in that direction — the scale you issue at points you to a band, and the tolerance grows quickly beyond 1:50.",
        ],
      },
      {
        h2: "Checking an as-built set you receive",
        paras: [
          "A set handed over at the end of a job, or passed on by a client, deserves the same doubt as an old planning drawing. Run these checks before you design from it — and if several fail, commission or carry out a measured survey instead.",
        ],
        list: [
          "Date and status: look for a survey or revision date and a note saying what the set is; treat an undated set with caution.",
          "Who made it: a contractor marked it up, a designer compiled it, or a surveyor measured it — each carries different weight.",
          "Three points on site: measure an overall length, one room and one opening, and compare all three with the drawing.",
          "Concealed services: ask whether drainage, pipes in floors and cables in walls were recorded before they were covered.",
        ],
      },
      {
        h2: "Producing as-built drawings in Synaps",
        paras: [
          "In Synaps you drop the plan image or PDF onto the canvas and choose Trace when the detected plans are offered, review the detected regions on every page and remove the ones you do not need, then compare the traced walls, doors and windows with the cropped reference before drawing up and issuing. The trace is a starting point that needs a legible source and still has to be checked against your site figures. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Who is responsible for as-built drawings?",
        a: "Whoever the contract or appointment names. During construction the contractor usually marks up changes and a design professional compiles the record set where the contract asks for one; for a measured survey, the surveyor or architect who measured stands behind the drawing.",
      },
      {
        q: "Are as-built drawings the same as a measured survey?",
        a: "Not always. A contractor's as-built set records changes against the design drawings during construction; a measured survey records the building as found, often years later, measuring everything afresh. For a renovation, a recent, checked record set can replace a new survey.",
      },
      {
        q: "How accurate do as-built drawings need to be?",
        a: "Accurate enough for the scale you issue at and the decisions you will make from them. Agree the band in writing before the survey starts, then put the band — or the measuring method — on the drawing, so the next person knows how far to trust it.",
      },
      {
        q: "Can I convert old paper drawings into CAD?",
        a: "Yes. Scan or photograph the sheet flat and square, because distortion carries into the trace, then trace it and check the result against site measurements before designing from it.",
      },
    ],
  },
  {
    slug: "cad-file-formats",
    title: "CAD file formats: DWG, DXF, IFC, PDF and which to ask for",
    dek: "DWG to edit in AutoCAD, DXF to move between programs, IFC to exchange a model, PDF to review and keep a record. What each format carries, its limits, and how to write a file request.",
    date: "2026-10-04",
    minutes: 13,
    category: "Studio workflows",
    image: "/images/blog/covers/cad-file-formats.png",
    sections: [
      {
        h2: "CAD file formats at a glance",
        paras: [
          "Seven formats cover most of what a practice sends and receives. The quick map: DWG is AutoCAD's native, proprietary drawing format; DXF is its documented exchange partner; DGN belongs to MicroStation and RVT to Revit; IFC is the open BIM exchange standard; PDF is a record copy with import limits; SVG is a web graphics format.",
          "What the sources leave unsaid is marked as such — the point of the table is what is known, not a guess.",
        ],
      },
      {
        h2: "DWG and DXF: AutoCAD's format and its exchange partner",
        paras: [
          "A DWG file is AutoCAD's own format — Autodesk calls it the native drawing file format of AutoCAD-based products, and the Open Design Alliance calls it the native and proprietary format for CAD data.",
          "DWG files also come in releases, and drawings from the latest release are sometimes not backwards compatible with an earlier one — which is why a file that opens fine for you may not open for your consultant.",
        ],
      },
      {
        h2: "DGN and RVT: native formats from other programs",
        paras: [
          "Two more native formats come from other tools: DGN from MicroStation and RVT from Revit.",
        ],
        subsections: [
          { h3: "DGN, MicroStation's format", paras: ["Bentley's help is plain that the V8 DGN file format is MicroStation's native format — and that MicroStation also opens and saves files in the AutoCAD DWG format. AutoCAD covers the other direction with its DGNIMPORT command, which imports data from DGN files."] },
          { h3: "RVT, Revit's model format", paras: ["Revit models are not backwards-compatible: once a model is upgraded and saved, it no longer opens in an earlier release. For people outside Revit, Autodesk points to IFC for applications that do not use the RVT format."] },
        ],
      },
      {
        h2: "IFC: the open BIM exchange format",
        paras: [
          "IFC stands for Industry Foundation Classes. buildingSMART International calls it a standardized, digital description of the built asset world — an open, international standard (ISO 16739-1:2024) meant to be vendor-neutral.",
          "One caveat travels with the openness: it is up to users to decide what they want to share from their model, so an IFC file is only as complete as the sender made it.",
        ],
      },
      {
        h2: "PDF: a record copy with import limits",
        paras: [
          "AutoCAD can take content out of a PDF — geometry, fills, raster images and TrueType text — but its PDF import does not support raster-to-vector conversion, so a scanned PDF gives you nothing but a picture.",
          "Precision differs too: DWG data is double precision, while PDF data is single. Text that used SHX fonts comes in as geometry, and a command exists to convert it back with manual checks.",
        ],
      },
      {
        h2: "SVG and image files",
        paras: [
          "SVG is a W3C specification for Scalable Vector Graphics — a Recommendation since 2011, with SVG 2 still at Candidate Recommendation status. Our reading: it is a graphics format first, and none of the sources describe it as a CAD exchange format.",
        ],
      },
      {
        h2: "Which format to ask for",
        paras: [
          "Choose the format by the job the recipient has to do, then say so in writing.",
        ],
        list: [
          "To edit a 2D drawing in AutoCAD: DWG, saved to a release you can open.",
          "To edit in another CAD program or a browser tool: DXF.",
          "To work from MicroStation files: DGN, or a DWG saved from MicroStation.",
          "To share a BIM model across programs: IFC.",
          "To review, print or keep a record: PDF, alongside the editable file.",
        ],
        subsections: [
          { h3: "US GSA: DWG plus PDF sheets", paras: ["The GSA's PBS CAD Standards are explicit: architects and engineers must submit CAD drawings in DWG file format, complying with the National CAD Standard, plus one full-size set of the drawing sheets as PDF files. The working file and the printable sheets, both."] },
          { h3: "UK BIM Framework: open formats where possible", paras: ["The UK BIM Framework's guidance defines open data as data not restricted to specific software solutions, and its examples of open formats include PDF, IFC, PNG and GIF. Its reading of ISO 19650-1 is that exchanges should use open formats where possible."] },
          { h3: "Advice: what to put in a file request", paras: ["Name the format and what you will do with it — edit, coordinate or review. Give your AutoCAD or Revit release, or the IFC version your tools read. State the units you expect. And ask for PDF sheets with every editable file, so you can compare what arrived against what was intended."] },
        ],
      },
      {
        h2: "Search interest in CAD file types",
        paras: [
          "Search data shows what people look up, not what they use: one tool reports 6,600 monthly US searches for \"dxf file\" and 5,400 for \"dwg file\", exact-phrase figures. On the less common types the tools disagree wildly, so treat any single number with care.",
        ],
      },
      {
        h2: "How Synaps handles CAD file formats",
        paras: [
          "The Synaps documentation lists four import formats: Image, DXF, SVG and PDF — DWG is not an option in the import menu, so a DWG source is converted to DXF first. A PDF import offers three results: an image placed for reference, vector extraction from a PDF that contains lines and fills, or a trace that reconstructs a floor plan as architectural elements. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the most common CAD file format?",
        a: "The sources do not measure how many architects use each format, so there is no honest single answer. Search interest suggests dxf and dwg dominate what people look up; what a practice sends still depends on the recipient's software.",
      },
      {
        q: "Is a PDF a CAD file?",
        a: "No — it is a record copy. AutoCAD can import parts of a PDF, but without raster-to-vector conversion and at single rather than double precision. Ask for the editable file alongside the PDF.",
      },
      {
        q: "What is an IFC file?",
        a: "An open, ISO-standardized format for exchanging BIM models between programs, maintained by buildingSMART. It carries what the sender chose to share — buildings and civil infrastructure among it — so check the content, not just the extension.",
      },
      {
        q: "Can I open a DWG without AutoCAD?",
        a: "Some programs can — MicroStation opens and saves DWG, and the Open Design Alliance publishes a DWG specification that other tools build on. Check that your program reads your file's release before relying on it.",
      },
    ],
  },
  {
    slug: "architectural-drawing-scales",
    title: "Architectural drawing scales: what two UK councils list",
    dek: "A scale is a ratio — at 1:50, one millimetre on the sheet is fifty in the building. What two UK councils list for each drawing type, and how to keep the written scale true once it reaches paper.",
    date: "2026-10-03",
    minutes: 8,
    category: "Studio workflows",
    image: "/images/blog/covers/architectural-drawing-scales.png",
    sections: [
      {
        h2: "What a drawing scale means",
        paras: [
          "A scale compares a length on paper with the same length in the building, both sides in the same unit. At 1:100, 1 mm on the sheet is 100 mm built, so a 10 m wall draws at 100 mm.",
          "A larger ratio number means a smaller drawing: a 1:200 plan shows more ground on the sheet than a 1:50 plan.",
        ],
      },
      {
        h2: "Which scale for which drawing",
        paras: [
          "Stroud District Council's drawing standards ask for \"a conventional metric scale such as 1:100 or 1:50\", and North Warwickshire's plans and drawings guidance lists similar pairings. What each drawing type expects, per those two documents — both dated, 2018 and 2015, so check the current rules of the authority you submit to:",
        ],
        list: [
          "Site location plan: 1:1000, 1:1250 or 1:2500 for larger sites; usually 1:1250.",
          "Block plan: 1:200 or 1:500.",
          "Floor plans: 1:100 or 1:50.",
          "Elevations: 1:100 or 1:50.",
          "Sections through a building: 1:50 or 1:100.",
        ],
      },
      {
        h2: "Choosing between 1:50 and 1:100",
        paras: [
          "Both councils list the pair for plans and elevations, and neither says how to choose, so use arithmetic. For a 12 m by 8 m house: at 1:50 it measures 240 × 160 mm, at 1:100 it measures 120 × 80 mm, and at 1:200 it measures 60 × 40 mm.",
          "The 1:50 drawing does not fit A4 portrait at 240 mm wide — A4 is 210 by 297 mm — and on A4 landscape only 57 mm remain across the width for margins and a title block. That is the real decision: sheet size and content, not taste.",
        ],
      },
      {
        h2: "Metric and imperial scales",
        paras: [
          "An imperial scale such as 1/4 inch to the foot is also a ratio. A foot has 12 inches, and 12 divided by 0.25 gives 48 — so 1/4 inch to the foot is 1:48. The same sum gives 1:96 for 1/8 inch and 1:24 for 1/2 inch.",
        ],
      },
      {
        h2: "Why a written scale needs its sheet size",
        paras: [
          "Both councils ask you to state the scale and the paper size together, and the reason is arithmetic: resize the sheet and the ratio changes. An A3 sheet is 297 by 420 mm and A4 is 210 by 297 mm — a factor of 0.707 — so a 1:100 sheet shrunk from A3 to A4 becomes about 1:141.",
        ],
      },
      {
        h2: "How to check the scale after export",
        list: [
          "Find one dimension you trust, such as a door width or a grid line.",
          "Measure it on the output file with the viewer's measuring tool.",
          "Compare the reading with the known value, and re-export if it is off.",
          "Print a test page at the size you plan to use.",
        ],
      },
      {
        h2: "Scale in Synaps",
        paras: [
          "A drawing sheet in Synaps is called a paper: the papers list ISO sheet sizes from A0 to A6 and B0 to B5, plus a custom size, and each paper carries its own scale setting. Pick the size, set the scale, and export from the paper's header. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "What is 1/4 inch to the foot as a ratio?",
        a: "1:48 — twelve inches divided by a quarter inch gives 48.",
      },
      {
        q: "Is 1:48 the same as 1:50?",
        a: "No. 1:48 is 1/4 inch to the foot; a 1:50 drawing read with a 1:48 ruler comes out about 4 percent short.",
      },
      {
        q: "Why does my printed plan not match its scale?",
        a: "The sheet was probably resized on the way to paper — fit-to-page printing shrinks it. Print at actual size, or trust a graphic scale bar drawn on the sheet.",
      },
    ],
  },
  {
    slug: "pdf-to-dwg",
    title: "PDF to DWG: convert a vector PDF, trace a scanned plan",
    dek: "A vector PDF holds lines, curves and text that AutoCAD can import as objects; a scanned PDF holds a picture that has to be traced or redrawn. How to tell them apart, and what changes in the conversion.",
    date: "2026-10-02",
    minutes: 11,
    category: "Studio workflows",
    image: "/images/blog/covers/pdf-to-dwg.png",
    sections: [
      {
        h2: "Vector PDF or scan: check before you convert",
        paras: [
          "Whether a PDF converts depends on what is inside it. A PDF generated from CAD holds paths composed of line segments and Bézier curves, fills, raster images and TrueType text; a scanned PDF holds only a raster — a grid of pixels, like a photo.",
        ],
        list: [
          "Zoom in to 800% in a PDF viewer: vector lines stay sharp, a scan turns into visible pixels.",
          "Try to select a word with the text tool — if you can, the PDF has live text (an OCR'd scan can also pass this test).",
          "Look for a slight tilt, paper texture or stains: those come from a scanner.",
          "Ask the sender which software made the file — a plan printed straight from CAD is likely vector.",
        ],
      },
      {
        h2: "How to convert a vector PDF to DWG in AutoCAD",
        paras: [
          "AutoCAD offers two ways to use a PDF: attach it as an underlay for reference, or import its data as objects you can modify.",
          "The import path runs through the PDFIMPORT command: run it and choose the PDF (one page at a time), pick the page, set the location, scale factor and rotation, then choose the data types to import — vector geometry, solid fills, TrueType text and raster images.",
        ],
      },
      {
        h2: "What changes when a PDF becomes CAD geometry",
        paras: [
          "A converted PDF is not the original CAD file. When a DWG is exported as PDF, information and precision are unavoidably lost, and importing the PDF does not give them back.",
          "Curves come in as polylines unless they are close enough to circles and arcs. Dimensions, leaders and patterned hatches explode into many separate objects, so redraw the ones you will rely on. TrueType text is preserved; SHX text arrives as separate geometric objects that a conversion command can turn back into text. Solid fills need their colour and transparency reset.",
        ],
      },
      {
        h2: "Scanned PDFs: why you trace instead of convert",
        paras: [
          "A scanned PDF has no lines to convert: AutoCAD can import the raster image from a PDF, but it does not support raster-to-vector conversion.",
          "Specialised software can turn pixels into lines, but even Autodesk is cautious — such conversion cannot provide the same level of precision as objects created directly. The practical routes are to redraw over the placed scan on a new layer, or use floor plan tracing that rebuilds walls and openings from the image.",
        ],
      },
      {
        h2: "Converting without AutoCAD",
        paras: [
          "AutoCAD is not the only route: QCAD Professional lists importing vector data and images from PDF, and its command line tools convert PDF to DXF and DWG. Another pattern is a tool that imports the PDF and exports DXF, which AutoCAD then opens and saves as DWG.",
          "Free online converters exist too — before you upload a client drawing, check whether your contract or the client allows it.",
        ],
      },
      {
        h2: "How Synaps handles a PDF",
        paras: [
          "When you import a PDF, Synaps asks what result you want: an image — a picture of the PDF for reference or composition; vectorize — extracting editable drawing content from a PDF that contains lines, text and fills; or trace — reconstructing a floor plan as architectural drawing elements, which suits a scan. Exports are PDF, DXF, PNG and JPEG, and a recipient who needs DWG opens the DXF in AutoCAD and saves it there. (Simulated in the clone.)",
        ],
      },
      {
        h2: "Checklist after any PDF conversion",
        list: [
          "Measure one dimension you know, such as a door width or a grid line, and scale the drawing if it is off.",
          "Zoom into corners and wall junctions, and close any small gaps.",
          "Check the curves — door swings may have become polylines.",
          "Replace exploded dimensions you will rely on with real dimension objects.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I convert a PDF to DWG without AutoCAD?",
        a: "Yes, with some tools — QCAD Professional lists PDF to DXF and DWG conversion, and any tool that exports DXF gets you one SAVEAS away from DWG in AutoCAD. Check which kind of PDF you have first.",
      },
      {
        q: "Why does converted text come in as lines?",
        a: "Text drawn with AutoCAD's SHX fonts is stored in a PDF as geometry. The PDFSHXTEXT command can turn it back into text, with some manual checking afterwards.",
      },
      {
        q: "Is a converted PDF to scale?",
        a: "Not always. The PDF's scale can be preserved on import, but the import does not use the units system variable — so measure a known dimension and rescale if needed.",
      },
      {
        q: "Can a scanned PDF become an editable DWG?",
        a: "Not by import alone. Redraw it over the placed scan, run a raster-to-vector tool, or trace the floor plan — then check the result against a known dimension.",
      },
    ],
  },
  {
    slug: "dwg-vs-dxf",
    title: "DWG vs DXF: which file to send, and what to check after",
    dek: "DWG is AutoCAD's native format; DXF is its documented exchange partner. Which one to send to whom, why files fail to open across releases, and the checks to run before anything leaves your desk.",
    date: "2026-10-01",
    minutes: 11,
    category: "Studio workflows",
    image: "/images/blog/covers/dwg-vs-dxf.png",
    sections: [
      {
        h2: "What DWG and DXF are",
        paras: [
          "DWG is AutoCAD's own drawing format — Autodesk calls it the native drawing file format of AutoCAD-based products, and the Open Design Alliance describes it as the native and proprietary file format.",
          "A DXF file, per Autodesk, is either a binary or an ASCII representation of a drawing file, often used to share drawing data between other CAD programs. One is a native format; the other is its exchange partner.",
        ],
      },
      {
        h2: "DWG and DXF side by side",
        paras: [
          "Put the same questions to both formats and the differences line up. Ownership: Autodesk holds the DWG trademark and publishes the DXF reference. Type: proprietary versus ASCII text or binary. Readers: AutoCAD-based products natively (and some third-party tools) versus other CAD programs, CNC software and web tools. Version trouble cuts both ways — newer DWGs sometimes fail in older releases, and many applications read only certain older DXF or DWG versions.",
        ],
      },
      {
        h2: "Which file to send",
        paras: [
          "Go by the recipient. An AutoCAD user gets DWG, saved to a release they can open. A GIS user can take either — Esri's conversion tool handles DWG, DXF and DGN in one operation — so ask which their workflow expects. A browser-based tool like Synaps takes DXF, because DWG is not in its import menu.",
          "And if you cannot ask: send the DXF, the DWG and a PDF. The recipient opens whichever suits their software, and the PDF shows what the drawing should look like.",
        ],
      },
      {
        h2: "Why a DWG will not open: format versions",
        paras: [
          "A DWG from a newer release can fail to open in older software — Autodesk says drawings created with the latest release are sometimes not backwards compatible, and the sender may have to use SAVEAS to save down to an earlier format.",
          "The formats follow the releases: the 2000 format covers AutoCAD 2000–2002, 2004 covers 2004–2006, 2007 covers 2007–2009, 2010 covers 2010–2012, 2013 covers 2013–2017, and so on. The sender does the saving; the recipient should not have to.",
        ],
      },
      {
        h2: "What Autodesk says can change when you save to DXF",
        paras: [
          "Current DXF versions can capture virtually all user-specified information in a drawing file, so a modern save-down is usually safe. The losses Autodesk documents are for the oldest DXF version, R12:",
        ],
        list: [
          "Dimension associativity is lost.",
          "Solids, ellipses, leaders and similar objects become basic line, arc and circle geometry.",
          "Only the Model tab and the current layout are saved.",
          "Layer and object names are limited to 32 characters.",
        ],
      },
      {
        h2: "Check units, external references and fonts before you send",
        paras: [
          "Three checks outside the drawing geometry decide whether the file works at the other end: units, external references and fonts.",
        ],
        subsections: [
          { h3: "Units", paras: ["The INSUNITS system variable controls the automatic scaling of blocks, images and xrefs when they are inserted or attached. A value of 0 means unspecified — no units — and any drawing with blocks or xrefs should carry a real value before it leaves."] },
          { h3: "External references and fonts", paras: ["Autodesk lists three xref path types — full, relative and \"No Path\", where the xref must sit in the same folder. A transmittal package collects the drawing, its xrefs, raster images, plot styles and printer configs automatically, but it does not include SHX and TTF fonts, hatch patterns or linetypes — add those files yourself."] },
          { h3: "Pre-send checklist", paras: ["Check INSUNITS and fix a zero. Measure one dimension you already know in the saved file and compare it with the original. Send the xrefs — via a transmittal package or one folder with No Path — and check whether fonts, hatch patterns and linetypes are included, adding them by hand if not."] },
        ],
      },
      {
        h2: "How Synaps handles DXF and DWG",
        paras: [
          "Per the Synaps documentation, DWG is not an import option — the import menu lists Image, DXF, SVG and PDF, and DXF is the supported CAD import route. Exports are PDF, DXF, PNG and JPEG, with one file per paper and a ZIP when there are several. (Simulated in the clone.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Is DXF better than DWG?",
        a: "Neither is better in every case. Choose by the recipient's software: DWG for AutoCAD users, DXF when the file moves between programs or into cutting and web tools.",
      },
      {
        q: "Can I open a DWG without AutoCAD?",
        a: "Yes, in some programs — QCAD Professional lists DWG read and write, and MicroStation opens and saves DWG. The Open Design Alliance also publishes a DWG specification that other tools build on.",
      },
      {
        q: "Does DXF keep layers and dimensions?",
        a: "Autodesk says DXF can capture virtually all user-specified information, so layers and dimensions should survive — but check them after every export with the pre-send checklist rather than trusting the format.",
      },
      {
        q: "Which DXF version should I choose?",
        a: "The version the recipient reads. Many applications only read certain older versions, and vendor pages disagree on defaults — one lists 2013, another R15 (2000). Ask, or send a modern version plus a PDF and be ready to save down.",
      },
    ],
  },
  {
    slug: "free-floor-plan-creators",
    title: "Free floor plan creators: AI, editing and export limits",
    dek: "Free access to drawing does not establish free generation, recognition or CAD export. What the current free plans of five tools actually include — and a completion sheet to test the task you have.",
    date: "2026-09-29",
    minutes: 5,
    category: "Studio workflows",
    image: "/images/blog/covers/free-floor-plan-creators.png",
    sections: [
      {
        h2: "What the current free plans include",
        paras: [
          "These are documentation findings from public plan pages, not tests of signed-in accounts, and promotions or entitlements can change them — check again before starting. One reading rule throughout: \"unknown\" does not mean unavailable, it means the source does not justify promising it.",
        ],
        list: [
          "Synaps: the freemium tier lists up to three models and three pages, with 300 signup credits plus 30 daily credits. DXF import and export, and watermark-free export, sit in paid tiers.",
          "Planner 5D: the free tier covers creating and sharing projects; AI plan recognition is listed under Premium and CAD export under Professional.",
          "Maket: free includes single-floor plan generation with 50 one-time credits; downloadable exports require a paid plan.",
          "Homestyler: Basic lists a cloud 3D floor planner and unlimited renders; a dependable Basic AI allowance was not established.",
          "Snaptrude: free lists three projects, basic BIM and Revit export; the checked pricing page does not quantify an AI allowance.",
        ],
      },
      {
        h2: "Budget operations, then check the output",
        paras: [
          "Credit quantities are meaningful only alongside operation costs, and those are displayed per action. Tracing can charge for individual retained plans in one file, and another generation or image edit is another operation.",
          "Arithmetic makes the budget concrete: at one tool's published rates, a floor generation costs 20 credits and a render 10, so two single-floor generations plus one render would use 50 credits — exactly a free one-time allowance, with nothing left for a retry.",
        ],
      },
      {
        h2: "Use a free-task completion sheet",
        paras: [
          "Write one sentence describing the task — \"I need to draw a small office, move a partition and send an editable file to my colleague\" — then fill in the record before committing to a tool. Mark the task complete only after checking the result where it will be used: a share link may solve a review task, but it does not substitute for an editable CAD file if the recipient needs to continue drawing.",
        ],
        list: [
          "What is the starting material? A brief, a scan, a vector PDF or an existing drawing.",
          "What operation do I need? Manual drawing, AI generation, recognition or editing.",
          "Can I perform the required edit? Record the actual wall, room or opening change you made.",
          "How much allowance does the task use? Note the displayed cost and any retry.",
          "What can I hand over? Name the format, and any watermark or quality requirement.",
        ],
      },
      {
        h2: "Test one bounded task in Synaps",
        paras: [
          "Pick one bounded task and run it end to end: for a new arrangement, a short brief with the boundary-generation flow; for an existing scan, the tracing workflow. Check the action cost first, inspect the editable result, and review the export notice before relying on the output — the current pricing table, not the export guide, determines what your plan can reach. (Simulated in the clone.)",
        ],
      },
    ],
  },
  {
    slug: "ai-tools-for-architects",
    title: "8 AI tools for architects in 2026, and what each one outputs",
    dek: "Eight AI tools grouped by what they return — editable geometry or images — plus the AI already inside Archicad, Revit and SketchUp. What each one outputs, what it costs, and the five-step test to run on a live job.",
    date: "2026-09-29",
    minutes: 14,
    category: "Studio workflows",
    image: "/images/blog/covers/ai-tools-for-architects.png",
    sections: [
      {
        h2: "Why AI adoption figures range from 6% to 98%",
        paras: [
          "Surveys of AI in architecture disagree because each one measures something different: some count individuals who use AI regularly, others any firm where anyone has tried a tool.",
          "The spread is real. The AIA's March 2025 research found only 6% of US architects using AI regularly, with 53% experimenting; a Bluebeam survey of over 1,000 AEC managers in five countries put firm-level use at 27%; and RIBA's 2026 report puts the share of UK practices using AI at 74%, up from 59% in 2025. Read each figure against its question.",
        ],
      },
      {
        h2: "Tools that give you editable plans and models",
        paras: [
          "These five tools return geometry you can select, measure and change. That matters most in schematic design, when the layout still moves every week.",
        ],
        subsections: [
          { h3: "1. Autodesk Forma Site Design: best for site and massing studies", paras: ["Forma sets up a site from contextual data and lets you test massing, with analyses Autodesk describes as AI-powered — sun hours and total carbon among them. It is the next evolution of Spacemaker. Output: editable massing and analysis results in the browser, with a proposal going to Revit as a geolocated native model, plus IFC and OBJ support and Rhino and Dynamo connections. From $59/month billed yearly ($85 monthly)."] },
          { h3: "2. Snaptrude: best for a BIM model from a brief", paras: ["Snaptrude builds a programme from a prompt or an uploaded RFP, then turns early massing into a BIM model — its homepage calls the result \"brief to BIM\". It is browser-based. Output: a BIM model, with Revit and Rhino export including .rvt files. Free for three projects."] },
          { h3: "3. TestFit: best for site test fits, parking and unit mix", paras: ["A test fit checks how much building, parking and housing a site can hold. TestFit generates site plans against a parking and unit-mix target and lets you edit the result, with generative design in its Site Solver suite. Output: editable site plans with parking counts, unit mix and quantity takeoffs, exporting to AutoCAD, SketchUp, Excel or PDF and pushing layouts to Revit. $195/month, generative design from $15,000."] },
          { h3: "4. Finch: best for residential unit layouts in Rhino or Revit", paras: ["Finch has a web app and connects to Rhino and Revit through plug-ins and to Grasshopper through a component. It optimises unit mix and circulation and generates floor plans on its top tier. Output: floor plans and BIM geometry, with a live continuous sync to Rhino and a one-way connection to Revit — you upload a mass and download a BIM model. Free plan; AI floor plans from €14,500/year."] },
          { h3: "5. Synaps: best for turning an existing plan or brief into an editable drawing", paras: ["Synaps is the product behind this article: browser-based, focused on the first drawing of an everyday building. You can trace a PDF, scan or photo of an existing plan into editable walls and openings — with manual tracing for messy inputs — or describe a brief and get an editable drawing to develop. Output: editable 2D drawings with DXF handoff. €59/editor/month."] },
        ],
      },
      {
        h2: "Tools that give you images",
        paras: [
          "These tools produce visuals for concept and client review. Their output is a picture, so any design change still happens in your drawing or model.",
        ],
        subsections: [
          { h3: "6. Chaos Veras: best for AI renders inside your modelling tool", paras: ["Veras turns a sketch or a 3D model view into rendered images and short videos, and it runs inside Revit, SketchUp, Rhino, Archicad, Vectorworks, Forma and Allplan, plus a web app. Output: images and video — Veras 5.0 added Image to 3D, matching an image to the closest Chaos Cosmos asset and placing it in your model."] },
          { h3: "7. D5 Render: best for real-time rendering with AI assets", paras: ["D5 Render is a real-time renderer listing more than ten AI features, including an AI Agent, model generation from text or images and material tools. Output: 4K stills, 60fps videos, interactive panoramas and virtual tours, plus AI-generated textures and 3D models."] },
          { h3: "8. Midjourney: best for concept and mood images", paras: ["Midjourney is a general image generator that runs on its website and on Discord; architects use it for mood boards and early concept images. Output: images and short videos — no drawing, no model, no scale."] },
        ],
      },
      {
        h2: "AI already inside the software you pay for",
        paras: [
          "Check your current licence before buying a new tool — three common desktop programs now include AI features, some still in preview.",
        ],
        subsections: [
          { h3: "Built-in AI in Archicad, Revit and SketchUp: best for teams that already own these tools", paras: ["These features work on the model you already have; they do not trace or generate a floor plan for you. The Autodesk Assistant in Revit 2027 is a tech preview whose chat panel can query the model and run tasks such as creating a schedule. SketchUp's AI Render turns the viewport into images and Generate Object creates native geometry from text or an image, with monthly credits by plan."] },
        ],
      },
      {
        h2: "AI tools for architects compared by output, platform and price",
        paras: [
          "Prices were listed on vendor pages on 29 September 2026, in each vendor's currency, and they change often — check the linked pages before buying. The comparison rows worth remembering: Forma Site Design, browser, editable massing, from $59/month; Snaptrude, browser, BIM model, free for three projects; TestFit, Windows and Mac app, editable site plans, $195/month with generative design from $15,000; Finch, web app and plug-ins, plans and BIM geometry, free plan with AI floor plans from €14,500/year; Synaps, browser, editable 2D drawings with DXF handoff, €59/editor/month.",
        ],
      },
      {
        h2: "Where AI tools still fall short",
        paras: [
          "Output quality is the standing complaint from architects who already use AI: in a 2026 survey by Chaos and Architizer of about 800 respondents, 48% of AI users cited poor or inconsistent output, and 33% cited poor compatibility with existing tools and workflows.",
          "The task data points the same way — practices use AI most for early visualisation and least for specification and technical design, which is exactly where consistency and integration matter most.",
        ],
      },
      {
        h2: "How to test an AI tool on a live project",
        paras: [
          "A demo shows the best case; one live project shows what you will actually get. Use the same five steps for every tool you shortlist, and write the results down — a tool can save time on one step and still fail a later one, which moves the work instead of removing it.",
        ],
        list: [
          "Pick one real input — an existing plan, a site or a brief from a current job, not a sample file.",
          "Time the first useful edit — how long before you change a wall, an opening or a room and keep that change.",
          "Count the cleanup — measure a few known dimensions, fix what is wrong, and record how many corrections you needed.",
          "Run one handoff — export in the format your consultant or next tool needs, open it there, and check layers, scale and text.",
          "Write it down — the same record for every tool, so the comparison is between evidence, not impressions.",
        ],
      },
      {
        h2: "How we selected these tools",
        paras: [
          "The list started from the tools named in top-ranking \"AI tools for architects\" articles and competitor research, then kept the ones with a current product page, public pricing and a clear output type, grouped by what they return.",
          "This is a research-based comparison, not a hands-on benchmark: the vendor pages were read on 29 September 2026 and no timed tests were run. Prices change often, so treat the figures as a snapshot.",
        ],
      },
      {
        h2: "Choosing your first AI tool",
        paras: [
          "Start from the job you repeat most. If you redraw existing plans or start many small projects from a brief, test a tool that returns editable drawings — Synaps, or Snaptrude if you need a BIM model early. If you need concept imagery, start with a renderer or an image generator instead.",
          "Whatever you pick, run the five-step test on one live job before buying seats for the team.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can AI replace architects?",
        a: "No tool on this list designs a building for you. Generators return starting layouts or images that an architect reviews — and in the RIBA 2026 survey, 77% agreed that AI can never replace human creativity in building design.",
      },
      {
        q: "Is there a free AI tool for architects?",
        a: "Yes, with limits. Snaptrude is free for three projects, Finch has a free plan without AI floor plan generation, and D5 Render's Community plan is free for non-commercial work only. Several others list free trials.",
      },
      {
        q: "Do AI architecture tools work with Revit?",
        a: "Several do. Forma sends proposals to Revit as native models; Snaptrude, TestFit and Finch name Revit as a handoff; Veras runs inside it. Test the round trip with your own template before relying on it.",
      },
      {
        q: "Can AI generate a floor plan I can edit?",
        a: "Some can. Finch on its enterprise tier and Synaps return editable floor plans, Snaptrude returns a BIM model with editable plans, and TestFit returns editable site layouts. Image generators do not.",
      },
    ],
  },
  {
    slug: "choose-floor-plan-software",
    title: "How to choose floor plan software for architectural work",
    dek: "Choose by the drawing you must deliver and the changes you must make before delivery — not by how the demo looks. Deliverables, precision tests, one evaluation card, and a decision made from the record.",
    date: "2026-09-29",
    minutes: 6,
    category: "Studio workflows",
    image: "/images/blog/covers/choose-floor-plan-software.png",
    sections: [
      {
        h2: "Define the deliverable first",
        paras: [
          "A file extension alone is not an acceptance test. Open the delivered file, check the units and inspect the content that matters — if the recipient needs editable objects, a matching image is insufficient.",
          "Match the task to the evidence: discussing a room arrangement needs a readable plan with controllable dimensions; revising a supplied scan needs a reconstruction you can inspect; detailed drawings need the required geometry, annotations and sheet control; continuing in another CAD application needs a supported export opened and checked there; coordinating a building model needs the required model objects and information.",
        ],
      },
      {
        h2: "Select tools for the relevant task",
        paras: [
          "The documented reasons to include a tool in an evaluation — not rankings, performance findings or promises that an export will meet your requirements. Sources checked in late September 2026: Synaps for plan tracing, generation and editable drawings; Planner 5D for home-layout projects and paid plan recognition; Maket for floor-plan generation with an editor; Homestyler for cloud 3D floor planning and interior visualisation; Snaptrude for basic BIM with Revit export.",
          "Pair each tool with one useful question for your trial — for example, \"Can I make my required architectural edit and hand over the result?\" — and let the answer come from the trial, not the marketing page.",
        ],
      },
      {
        h2: "Test precision through a change",
        paras: [
          "An input field accepting a dimension answers only one question. You also need to know what happens after you move a wall, change an opening or revise a room.",
          "Create a small drawing with a known dimension and record the measurement endpoints. Enter the intended value, measure the result, then make one relevant change and inspect wall connections, openings, nearby room boundaries and annotations for what moved that should not have.",
        ],
      },
      {
        h2: "Use one common evaluation card",
        paras: [
          "Take a hypothetical small office alteration — fixed entrance and exterior walls, one internal partition to move, meeting-room access to revise, desks to check against their actual dimensions, and a drawing to send on — and score every candidate on the same card. Mark each required row pass, fail or unresolved, keep optional preferences separate, and never average a failed mandatory export into a favourable overall score; if a tool needs a conversion step, include that work and check its result too.",
        ],
        list: [
          "Import or reconstruction: source format, missing content, correction work — can the team establish a usable starting drawing?",
          "Dimensioned edit: intended dimension, measured result, endpoint behaviour — does it meet the project's stated requirements?",
          "Nearby geometry: wall junctions, opening positions, room boundaries — are needed corrections understood and complete?",
          "Drawing detail: text, dimensions, symbols, line weights — can the recipient read the intended information?",
          "Export: format, units, differences in the receiving application — can the recipient perform the next task?",
        ],
      },
      {
        h2: "Check the input and plan restrictions",
        paras: [
          "Input routes differ enough to change the comparison: in Synaps the documented CAD import route is DXF, with direct DWG absent from the import menu, and PDFs can follow different routes for reference images, vector extraction or tracing. Check the import guide against your actual source.",
          "Plan access can change it again — Synaps lists DXF import and export under Pro and Studio, and Planner 5D lists plan recognition under Premium and CAD export under Professional. Check the current plans before testing, not after.",
        ],
      },
      {
        h2: "Make the decision from the record",
        paras: [
          "Choose the candidate that passes the required task with correction work and costs the team accepts, and record why the others were unsuitable for that particular job. Avoid general claims about a tool's quality based on one exercise — the record is about the fit, not the brand.",
        ],
      },
    ],
  },
  {
    slug: "between-autocad-and-bim",
    title: "Synaps: The AI architectural platform for drafting and design",
    // Standalone SEO title, transcribed verbatim: the live post ships this
    // custom title with no "| Synaps" suffix (and therefore no truncation).
    seoTitle: "Synaps: The AI architectural platform for drafting and design",
    dek: "Start from the material you have and the decision you need to make: a scan to reconstruct, a brief to develop into options, an image to discuss finishes. A working method for drafting with AI — and a worksheet to keep the decisions honest.",
    date: "2026-09-21",
    minutes: 5,
    category: "Studio workflows",
    image: "/images/blog/covers/between-autocad-and-bim.png",
    sections: [
      {
        h2: "Start with a drawing you can inspect",
        paras: [
          "Ask for the original drawing before reconstructing a scan. DXF import is documented; DWG is not in the current import menu. For PDFs, distinguish a scanned picture from a file containing vector drawing data, and for images, expect tracing rather than conversion.",
          "After tracing, compare the result with the supplied plan — the footprint, wall connections, openings and known dimensions — before redesigning the space. Keep the uncertainty visible: an old plan can help reconstruct a layout without being evidence of the building as built.",
        ],
      },
      {
        h2: "Develop options around a specific brief",
        paras: [
          "Take an apartment renovation: the client wants a more open kitchen and living area, better storage, and a bedroom separated from the entrance. Keep a checked copy of the existing layout, then develop alternatives with clearly named differences.",
          "For a new arrangement, use generation with a written brief: a closed rectangle or polyline larger than 20 m² as the boundary, the rooms and their relationships described, then generate the plan and compare it against the checked original.",
        ],
      },
      {
        h2: "Use images to discuss visual decisions",
        paras: [
          "A drawing establishes whether an arrangement fits; an interior image helps discuss materials and appearance. Place and aim a camera, choose a style or prompt, and generate the view — then compare options rather than judging one in isolation.",
          "Explore finishes through image editing, and record the accepted material choice in the drawing or the specification. An image edit does not automatically revise the plan, and a drawing edit does not refresh the image.",
        ],
      },
      {
        h2: "Use a decision worksheet on one project",
        paras: [
          "Take a second hypothetical task: comparing two arrangements for a street-level office with a fixed entrance, a meeting room, desks and storage. The worksheet is an evaluation method, not a product test — each row names the decision, the check, and the action if it stays unresolved.",
          "For each option, name the decision it answers, and add the source of each measurement, the responsible reviewer and any unresolved assumption. Two unlabelled variations are harder to review than two proposals with an explicit difference. The rows run from keeping the entrance and placing the meeting room, through arranging the desks with their actual dimensions, to choosing a floor finish and handing over the drawing.",
        ],
      },
      {
        h2: "Prepare the output the next person needs",
        paras: [
          "For drawing-sheet delivery, the documented exports are PDF, DXF, PNG and JPEG. Check the actual export in the receiving application: a visually correct PDF does not establish the editing quality of a DXF, and a drawing export does not create a model.",
          "Check access before starting — DXF import and export sit in the paid tiers, and AI actions carry their own displayed costs, with each new generation or image edit counting as another operation.",
        ],
      },
    ],
  },
  {
    slug: "scanned-floor-plan-to-editable-drawing",
    title: "Scanned floor plan to editable drawing: a workflow and buyer's checklist",
    dek: "Reconstruct the geometry, check it against known dimensions, correct the result, then test the file you will actually deliver. A workflow for tracing scans — and a buyer's checklist for comparing tools.",
    date: "2026-09-14",
    minutes: 8,
    category: "Studio workflows",
    image: "/images/blog/covers/scanned-floor-plan-to-editable-drawing.png",
    sections: [
      {
        h2: "Choose a route that matches the file",
        paras: [
          "Start by asking the supplier for the original drawing — a usable CAD file can save the whole reconstruction. If the only document is a PDF, establish whether it contains vector drawing data or a scan.",
          "Then match the route to the source: a scanned paper plan or photograph is traced into editable architectural elements; a vector PDF is vectorized when editable linework is the goal; an image needed only for reference stays on the canvas; a DXF drawing takes the documented import route; a DWG drawing needs a supported file before anything else happens.",
        ],
      },
      {
        h2: "Prepare a source you can check",
        paras: [
          "Keep the original file and record where it came from. Choose a clear scan or photograph that includes the whole footprint, and record the drawing's date and any changes the owner says happened later.",
          "The documented tracing inputs are JPEG, PNG, GIF, WebP and PDF, with a displayed 50 MB upload limit; SVG import is a separate capability and not a tracing input.",
        ],
      },
      {
        h2: "Reconstruct the selected plan",
        paras: [
          "Import the source, choose Trace where it is offered, and review the detected regions — in a multipage file, review every page, and retain only the plans you intend to reconstruct, since a separate trace may be charged for each.",
          "After tracing, compare the editable result with the source reference: the perimeter, wall connections, openings and room layout. Correct omissions before you begin changing the design.",
        ],
      },
      {
        h2: "Keep a measurement record",
        paras: [
          "Use a small worksheet to distinguish dimensions you have checked from assumptions you have carried forward. A uniform error has a mathematical correction factor — the reference length divided by the measured drawing length — so a 10.00 m reference against a 9.80 m traced length gives 1.0204, pointing at a scale correction rather than a redraw.",
          "A local disagreement is different: a bedroom width that departs from the overall ratio needs its own inspection, not a global rescale.",
        ],
      },
      {
        h2: "Check the edit you actually need",
        paras: [
          "A useful tracing result should support the next decision in your project, so test that decision before committing to a tool. If you need to compare kitchen arrangements, try moving the relevant partition and placing the required furniture. If you need a property marketing plan, check room names, readable dimensions and the intended image output.",
        ],
      },
      {
        h2: "Compare tools by the work required to reach a usable result",
        paras: [
          "Use the same source, target output and acceptance checks for each tool, and record failed attempts as well as successful ones — a clean demonstration image is not a fair comparison with your own difficult scan.",
          "Decide what \"acceptable\" means before running the comparison: an early layout study and a measured drawing for professional issue have different requirements. Record the source file and date, the intended next task, the tool, version and plan, and the import, processing, review and correction times.",
        ],
      },
      {
        h2: "Resolve problems before comparing alternatives",
        paras: [
          "A clearer upload may help detection, but it is not a guarantee of correct reconstruction; for a local error, a direct correction beats repeating the full trace. Check the displayed credit cost before any new submission.",
          "Work the problem list in order: no plan detected — try a clearer source or keep the image as a reference; a portion of the footprint missing — check the region bounds against the whole sheet; one opening missing — compare with the source and correct it locally; overall dimensions disagree — check the scale against a known length; different parts showing different errors — inspect the source for distortion.",
        ],
      },
      {
        h2: "Open the export before you hand it over",
        paras: [
          "The documented exports are PDF, DXF, PNG and JPEG from drawing sheets. Inspect the actual output for missing content, line weights, text and image quality — a PDF that looks right does not establish that its DXF counterpart will meet the need.",
          "Check access requirements before starting a paid workflow: the current pricing table lists DXF import and export under the paid tiers.",
        ],
      },
      {
        h2: "When is the plan ready to use?",
        paras: [
          "The plan is ready for its next task when you can explain what has been checked, what remains uncertain, and whether the output works where you need it. Tracing an old drawing does not establish the building's present condition — that takes a survey.",
        ],
      },
    ],
  },
  {
    slug: "generate-floor-plan-within-boundary",
    title: "AI floor plan generation within a boundary: what stays editable?",
    dek: "Draw a closed outline over 20 m², attach it, describe the rooms and their relationships, and generate one editable plan inside it. What stays editable, what to check before refining, and when to revise the brief instead.",
    date: "2026-09-07",
    minutes: 5,
    category: "Studio workflows",
    image: "/images/blog/covers/generate-floor-plan-within-boundary.png",
    sections: [
      {
        h2: "Separate fixed conditions from preferences",
        paras: [
          "An apartment may have a fixed entrance, structural elements, windows and service connections, while the client merely prefers a larger living room, an enclosed kitchen or more storage. Record those separately before generating.",
          "The selected boundary describes the footprint and nothing more — it does not communicate every restriction inside an existing building. Describe the relevant conditions in the brief, then verify them in the result; do not treat a prompt instruction as proof.",
        ],
      },
      {
        h2: "Draw and check the outline",
        paras: [
          "Open a project you can edit and draw a closed rectangle or polyline around the area to plan. The area must exceed 20 m² — a shape measuring exactly 20 m² does not meet the documented condition.",
          "Use Measure to check the dimensions, and inspect recesses and narrow sections of an irregular outline: an incorrectly sized footprint undermines a carefully written brief.",
        ],
      },
      {
        h2: "Describe accommodation and relationships",
        paras: [
          "For a roughly 100 m² apartment outline, write a brief you can check: a two-bedroom apartment with one double bedroom, one smaller bedroom that can also work as a study, one bathroom, a utility cupboard, and an open-plan kitchen, dining and living area — with the rooms that matter most described first.",
        ],
      },
      {
        h2: "Attach the boundary and generate",
        paras: [
          "Open command search, choose Generate a floorplan, and enter the room brief. Choose Pick a boundary shape, select the closed outline, and confirm that the Boundary tag identifies the intended shape.",
          "The documented result is a single editable plan with recognized walls, rooms and openings — recognized furnishings may also appear. Generation proposes a new arrangement; it does not certify one.",
        ],
      },
      {
        h2: "Check the proposal before refining it",
        paras: [
          "Use an acceptance record for the brief, filling in your actual observations: count the bedrooms and check the smaller room's width for a bed and a desk; compare the entrance with the agreed edge; trace the route to the bathroom and confirm it does not pass through a private room; measure the proposed storage near the entrance rather than reading its label; inspect the perimeter, corners and recesses for fit.",
          "A label and a furniture symbol do not establish a usable room. Measure the parts that decide whether the proposal works — project-specific technical and regulatory review remains yours before delivery.",
        ],
      },
      {
        h2: "Edit locally or revise the brief",
        paras: [
          "For a localized issue, select and adjust the recognized drawing elements. If the arrangement misses a major requirement, clarify the brief and submit again — a further submission can use additional credits.",
          "When the footprint itself changes — say the available area becomes narrower — keep the earlier plan as a labelled option, change the outline, and inspect what the old result now shows before deciding whether to edit it or generate afresh.",
        ],
      },
      {
        h2: "Resolve the next obstacle",
        paras: [
          "Work the failure list in order: a rejected boundary — confirm it is a closed rectangle or polyline over 20 m²; a missing room or relationship — correct the drawing or clarify the priorities in the brief; a failed generation — read the displayed error and resolve access or credit issues; an old plan that ignores an edited outline — edit the plan or make a new generation with the new boundary.",
        ],
      },
    ],
  },
  {
    slug: "architectural-post-production-image-editing",
    title: "Architectural post-production: a complete guide to image editing in Synaps",
    dek: "A warmer floor, different upholstery, a wider composition — most design conversations continue after the first interior image. Seven editing moves, from prompts to resolution, and how to sequence them for a client review.",
    date: "2026-08-31",
    minutes: 12,
    category: "Studio workflows",
    image: "/images/blog/covers/architectural-post-production-image-editing.png",
    sections: [
      {
        h2: "What architectural post-production changes",
        paras: [
          "Here, post-production means developing an existing architectural image: its finishes, furnishings, atmosphere, composition and presentation detail.",
          "You can start with an imported interior image or create one from a camera in your drawing. The visual is a separate canvas item either way — image edits do not automatically update the floor plan, replace its furniture or change its geometry.",
        ],
      },
      {
        h2: "Start with a useful source image",
        paras: [
          "Choose a view that clearly shows the surfaces or objects under discussion: a floor hidden behind furniture gives you little evidence for judging a flooring alternative, and a chair at the edge of the frame is a poor basis for an upholstery study.",
          "To bring in an existing image, open Import and choose Image. To create an interior render from a drawing, place and aim a Camera, select it, choose a style or none, add a prompt if needed, and apply.",
        ],
      },
      {
        h2: "Choose the tool by the revision you need",
        paras: [
          "The actions available for a detected region depend on its category — a floor, a carpet and a paintable wall expose different controls. Map the request to the tool: a different overall atmosphere goes to Edit with prompt; a change inside a manually selected area goes to a lasso selection plus the prompt; a target object or surface goes to Segment, with Re-segment when detection needs updating; another wall colour goes to Change paint; a wallpaper reference goes to Add/Change wallpaper.",
        ],
      },
      {
        h2: "1. Use prompts for broader visual changes",
        paras: [
          "Select one image and choose Edit with prompt, then describe the change and the context you want retained. An example shape: give the living room a softer evening atmosphere with warm lighting and muted textiles, while retaining the room geometry, window positions, furniture arrangement and camera viewpoint.",
        ],
      },
      {
        h2: "2. Use segmentation for targeted revisions",
        paras: [
          "Select the image, click Segment, and wait for detection. Move the pointer across the image to inspect the highlighted regions and their labels, click the intended object or surface, then choose an available action.",
          "Selecting a region does not change the image — it identifies the content for the next operation.",
        ],
      },
      {
        h2: "3. Compare paint, wallpaper and flooring",
        subsections: [
          { h3: "Change paint", paras: ["Select a detected paintable surface and choose Change paint: pick a colour or enter a six-digit hexadecimal value, then confirm. Compare the new colour beside the floor, furniture and adjacent surfaces, and inspect shadows and the edges of the painted area as well as the colour itself — a visual study narrows a direction, but physical samples remain useful."] },
          { h3: "Apply wallpaper", paras: ["Choose Add/Change wallpaper on a paintable surface, upload or drop a clear reference image, inspect the preview and apply. Check how the pattern reads across the wall, particularly at openings and corners — scale and direction change a pattern's character substantially."] },
          { h3: "Change flooring", paras: ["Select a detected floor and choose Change Flooring, supply a reference image of the intended finish, inspect it and apply. Look at plank or tile direction, transitions between surfaces and the floor around furniture, and keep the viewpoint consistent when comparing alternatives so the finish stays the main variable."] },
        ],
      },
      {
        h2: "4. Refine furniture, materials and decorative details",
        subsections: [
          { h3: "Change an object's material", paras: ["Use Change Material on a supported cloth or solid object when the question is about its finish — a different upholstery on a sofa, say. After selecting the detected object, upload a reference, inspect its preview and apply, then check folds, curves, edges and nearby content in the result."] },
          { h3: "Replace an object", paras: ["Use Replace Element to explore a different object: select the detected piece, upload an image of the alternative and run the replacement. Review its apparent size, perspective, contact with the floor and relationship to neighbours — the result is an interpretation of the reference, so confirm actual product dimensions separately."] },
          { h3: "Change artwork and carpet patterns", paras: ["For a detected wall picture, choose Change Art, supply the reference and apply; for a detected carpet, choose Change Pattern the same way. Inspect the artwork's perspective and edges, and the carpet pattern's direction and scale; if the question concerns a different object altogether, use Replace Element where available."] },
          { h3: "Turn supported lights and electronics on or off", paras: ["Detected electronic objects can offer Turn On/Off, useful for discussing atmosphere — the visual effect of a lamp being on. It is an image-editing action, not a lighting calculation, and availability depends on the detected category."] },
        ],
      },
      {
        h2: "5. Clean up the scene and create cutouts",
        paras: [
          "The cleanup tools produce different results, so pick by intent. Erase removes a detected object and generates content to fill its former location — use it when an object distracts from the composition, and inspect the reconstructed area for changes to floor patterns, wall edges or nearby furniture. Cutout work follows the same discipline: what surrounds the removed content has to survive convincingly.",
        ],
      },
      {
        h2: "6. Adjust the composition with Expand",
        paras: [
          "An image that works in a design review may need a wider composition for a presentation slide. Expand generates content beyond the existing edges: select the image, choose Expand, and adjust the bounds — Custom, Original, Square, 16:9, 4:3 or 3:2. Fit frame resets the bounds to the source; enlarge them beyond the image to create space around it.",
        ],
      },
      {
        h2: "7. Enhance resolution and export",
        paras: [
          "Once the composition and direction are settled, select the image and choose Boost resolution. It uses preset enhancement settings — there is no enlargement-factor or exact pixel-size control.",
          "Inspect the result at its intended presentation size, comparing fine edges, textures and any text with the original, and check the canvas size and position because they may change. Enhancement can alter detail, so judge the result visually.",
        ],
      },
      {
        h2: "A practical client-review sequence",
        paras: [
          "Imagine a client who likes the living-room arrangement but feels the finishes are too cool. A focused sequence: keep the original image as the comparison baseline; use Segment and Change paint to test a warmer wall colour; compare; test a flooring reference with Change Flooring; explore upholstery with Change Material — and use Replace Element only if the furniture piece itself is being reconsidered.",
          "This is an illustrative workflow, not a requirement to run every tool. Choose the actions that answer the current design question, and keep the camera angle, furniture and other finishes stable while comparing a single change.",
        ],
      },
      {
        h2: "Plan for credits across the workflow",
        paras: [
          "Camera rendering, segmentation, subsequent edits and re-segmentation are separate AI operations, so check the balance and the displayed action cost before running them. Some entitlements show unlimited credits rather than numeric costs.",
          "Repeating an action is another submission. Undo restores the earlier state and Cancel stops the local waiting flow, but neither guarantees a credit refund.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I edit an existing image, or must I generate a render first?",
        a: "You can start with either an imported image or a render created in the drawing. Select the image to see its available editing actions.",
      },
      {
        q: "Can I change one surface without requesting a whole-room redesign?",
        a: "Yes. Use Segment to select the detected surface and choose the relevant finish action. Inspect the surrounding content afterwards, since an AI edit can affect details beyond the intended change.",
      },
      {
        q: "Can I use my own material and furniture references?",
        a: "Yes. The reference workflows accept images for wallpaper, flooring, object materials, replacement objects, artwork and carpet patterns. A clear JPG or PNG is a useful starting point.",
      },
      {
        q: "Does changing an image update the architectural drawing?",
        a: "No. Update the corresponding drawing elements, placed assets and specifications separately once a direction is chosen — the image and the plan are two artefacts.",
      },
      {
        q: "What is the difference between Expand and Boost resolution?",
        a: "Expand adds generated surroundings beyond the existing image edges; Boost resolution enhances detail within them. Choose by whether you need a different composition or a clearer presentation image.",
      },
    ],
  },
  {
    slug: "why-were-not-trying-to-replace-revit",
    title: "Why we're not trying to replace Revit",
    dek: "An a16z article about software \"built in 1997\" resonated with us as a team building in AEC. Our answer to the question it raises: compete where the incumbents are weak — the fluid, early phase — not where they are strong.",
    date: "2026-03-31",
    minutes: 5,
    category: "Essay",
    image: "/images/blog/covers/why-were-not-trying-to-replace-revit.png",
    sections: [
      {
        h2: "Where existing tools are actually very good",
        paras: [
          "One mistake startups often make is assuming incumbents survive because markets are irrational. They don't: Revit survives because it does certain things extremely well.",
        ],
        list: [
          "Parametric documentation.",
          "Coordination across disciplines.",
          "Enterprise workflows.",
          "Complex building data management.",
        ],
      },
      {
        h2: "The part of architecture software that feels unfinished",
        paras: [
          "The biggest gap is not in construction documentation — it is earlier, already starting in schematic design. That is the exact process that is iterative and exploratory, where buildings are still fluid and taking shape.",
          "It is also the phase where architects need to move fast and explore heavily without locking into heavy models and parameters — sometimes as unpaid labour, since the contract may not have been secured yet.",
        ],
      },
      {
        h2: "Why we chose to start in 2D",
        paras: [
          "Synaps today is a 2D environment by design — not because we don't believe in 3D or BIM, but because software should match the phase of work it serves. 2D remains the fastest medium for thinking through early problems:",
        ],
        list: [
          "Spatial relationships.",
          "Circulation.",
          "Structure logic.",
          "Communication clarity.",
        ],
      },
      {
        h2: "Starting where most buildings actually begin",
        paras: [
          "Our strategy is to start where the majority of architectural work actually happens, not where the software industry traditionally focuses. Most buildings do not begin as complex BIM models — they begin as iterative floor plans, spatial diagrams and layouts.",
        ],
      },
      {
        h2: "Owning the AI layer of early design",
        paras: [
          "We believe AI's biggest near-term impact in AEC will come from removing the burden of manual drafting — not the architectural decisions themselves, but the mechanical work software still requires just to express those decisions.",
        ],
        list: [
          "Filling property panels just to draw a simple wall.",
          "Managing joins and constraints after every small change.",
          "Re-entering the same information over and over again.",
          "Tracing over existing plans just to get to point zero.",
        ],
      },
      {
        h2: "Integrating with BIM instead of replacing it",
        paras: [
          "Rather than positioning ourselves as a BIM replacement, we see a more practical path: becoming the lead environment before BIM. Instead of forcing firms to change their entire stack, the better strategy is compatibility — let architects work where speed matters, and let BIM take over where complexity matters.",
        ],
      },
      {
        h2: "Getting BIM-level outputs without BIM-level friction",
        paras: [
          "One question guides our roadmap: can modern AI allow simpler tools to produce outputs that previously required complex software? Historically, powerful output required a complex interface. AI is changing that relationship, and we intend to find out how far.",
        ],
      },
    ],
  },
  {
    slug: "prioritizing-design-craft",
    title: "Prioritizing design craft",
    dek: "Feature counts no longer win products on their own — care does. A short note on the \"Experience Era\" and why attention to detail is the differentiation that lasts.",
    date: "2024-08-12",
    minutes: 2,
    category: "Practice",
    image: "/images/blog/covers/prioritizing-design-craft.png",
    sections: [
      {
        h2: "Well… in recent years we have witnessed a major shift in the product value hierarchy. We entered the “Experience Era”!",
        paras: [
          "For decades, differentiation came primarily through features: the more a product offered, the greater its perceived value. That arithmetic has flipped, and crowded digital markets now separate products on how they feel to use.",
          "A creaky, worn door still does the job — but you would prefer a smooth, perfectly aligned one that closes effortlessly with a magnetic latch. It is not the beauty of the door that creates the value; it is the attention to detail and the care taken in making and installing it.",
        ],
      },
      {
        h2: "What was groundbreaking then is now becoming a standard expectation.",
        paras: [
          "Neuroaesthetics has already validated the dopamine effects of experiencing visual interfaces crafted with care and attention to detail — polish is no longer a bonus, it is the baseline users arrive with.",
          "When people genuinely care, they create great products. Great products inspire users, and inspired users drive business growth.",
        ],
      },
    ],
  },
  {
    slug: "fast-is-more",
    title: "Fast is more",
    dek: "Young architects arrive full of creativity and drown in complicated software. The research behind Synaps — 1,200 inventoried tools, 30 architects, 56 survivors — and the case for speed through simplicity.",
    date: "2024-07-09",
    minutes: 3,
    category: "Essay",
    image: "/images/blog/covers/fast-is-more.png",
    sections: [
      {
        h2: "The promise and the reality",
        paras: [
          "Every aspiring architect starts with a burning desire to design spaces that nurture people, stories and emotions, expecting that after years of study and internships the creativity will finally be unleashed.",
          "Reality paints a different picture: complicated software, an endless array of tools and features, and even the smallest change requiring a deep dive into documentation. For small practices and freelancers, that time is poorly compensated.",
        ],
      },
      {
        h2: "What the research found",
        paras: [
          "We questioned this complexity and researched the existing tools — AutoCAD, Revit and Archicad — inventorying their features and categorising them by function. Two findings stood out: the gap between 2D and 3D modelling is significant, and large and small projects suffer from different types of complexity.",
          "In 3D modelling and BIM, the third dimension adds a substantial layer of complexity — walls, windows, doors, stairs, columns and beams all demand numerous parameters, which is crucial for large unique projects but unnecessary for regular ones. AutoCAD, a revolutionary drafting tool from the early 80s, leans on basic primitives that can be manipulated into virtually anything, serving everyone from architects to naval engineers — and its generality is exactly what weighs on architectural drafting.",
          "Then came the epiphany. We compiled a list of 1,200 different entities from the existing software and asked 30 architects to choose the tools they needed and used most frequently. Out of 1,200, only 56 were chosen.",
        ],
      },
      {
        h2: "What Synaps does about it",
        paras: [
          "Synaps was created to offer a toolset for architectural drawings with minimal input and an intuitive, simplified user experience: BIM-style predefined walls, windows, doors, columns, beams and stairs integrated into a 2D CAD workflow, with the third dimension considered only from a visual perspective.",
          "Reduced parametrisation and a focused toolset are what make it fast — and fast, for the work architects actually do, is more.",
        ],
      },
    ],
  },
  {
    slug: "the-blueprint-of-architecture",
    title: "The blueprint of architecture",
    dek: "From caves to agriculture to the industrial revolution, architecture has always shaped the spaces we inhabit — yet the tools architects collaborate with lag behind other industries. A short essay on where collaborative tech takes the profession next.",
    date: "2023-09-28",
    minutes: 5,
    category: "Essay",
    image: "/images/blog/covers/the-blueprint-of-architecture.png",
    sections: [
      {
        h2: "The Evolution of Human Architecture",
        paras: [
          "Humanity's story began in the embrace of nature's own architectural marvels: caves, sculpted by a mother nature we can only marvel at as the original architect.",
          "A new chapter unfolded when people discovered agriculture. That transformative moment gave birth to the concept of culture — the ability to feed more mouths sparked a population explosion, and settled, built environments followed.",
        ],
      },
      {
        h2: "The Industrial Revolution and Beyond",
        paras: [
          "With the dawn of the industrial revolution, architecture underwent an ideological shift. New materials and construction methods emerged, paving the way for entirely new types of structures to grace the landscape — and for the profession to organise itself around them.",
        ],
      },
      {
        h2: "The Rise of Collaborative Tech",
        paras: [
          "Other industries confronted the collaboration challenge head-on, and recent years brought the rise of collaborative technology — a movement exemplified by the likes of Figma and Miro.",
          "What they brought to the table was not just any tooling: browser-based, exceptionally user-friendly and capable of real-time collaboration, they ushered in a new era of how teams work together.",
        ],
      },
      {
        h2: "The Future of Architecture",
        paras: [
          "What does all of this signify for architecture? Imagine colleagues working hand in hand, co-designing seamlessly — feedback loops become a thing of the past and every communication is meticulously documented.",
          "Contractors, electricians and other professionals can provide their input directly into the plan as it develops, closing the gap between design and build that the profession has carried for centuries.",
        ],
      },
    ],
  },
];
