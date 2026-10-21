import type { ChangelogEntryData } from "./types";

/**
 * Release notes content.
 *
 * PROVENANCE: entry titles, dates, item kinds and item titles are
 * transcribed from the harvest of /news/changelog/…; item bodies are
 * original condensed summaries of the same information. Summaries at
 * the top of each entry are likewise condensed.
 */
export const changelogEntries: ChangelogEntryData[] = [
  {
    date: "2026-10-07",
    title: "Faster drawing, smoother loading, and seamless connectivity",
    summary:
      "A faster graphics engine makes drawing smoother — especially with large files. Drawings load reliably even on strict networks, brief connection drops no longer interrupt your work, and this update adds mouse-wheel asset browsing, metres as the default unit, hex colour entry and leaner DXF imports.",
    items: [
      {
        kind: "New",
        title: "V3 is here: A faster drawing engine for everyone",
        body: "The new graphics engine — the layer that turns lines, hatches, text and images into the picture you see on every pan, zoom and edit — is now standard for all accounts, handling large detailed drawings with less effort. Dashboard project cards show a real preview of your drawing instead of a placeholder, and incompatible browsers fall back to the previous engine automatically.",
      },
      {
        kind: "Improved",
        title: "Keep working through short reconnects",
        body: "Short connection drops no longer disrupt your work. Changes are held safely in your browser and sent once you are back online; the connection status only appears when something actually needs attention, and Synaps makes room automatically if browser storage fills so unsaved changes are not lost.",
      },
      {
        kind: "Improved",
        title: "Scroll asset categories with a mouse wheel",
        body: "The row of asset-category filters in the Assets tab now scrolls sideways with a plain up-and-down mouse wheel, not just trackpad swipes or Shift+wheel. At either end of the row the wheel passes through to the content behind it, so nothing feels stuck.",
      },
      {
        kind: "Improved",
        title: "Leaner drawings after DXF imports and Isolate",
        body: "DXF imports now bring in only the block definitions your drawing actually uses instead of every unused layout, and the Isolate tool saves new images like other uploads — less file size and history clutter. If an upload fails, Isolate stops without spending credits.",
      },
      {
        kind: "Improved",
        title: "Metric lengths start in metres",
        body: "In metric regions the starting unit for lengths is now metres rather than millimetres (imperial regions still start in feet). The choice only affects initial setup — existing projects and saved preferences are unchanged.",
      },
      {
        kind: "Fixed",
        title: "Drawings load reliably on filtered networks",
        body: "Ad blockers, antivirus tools and company firewalls no longer stop drawings from opening: files now load directly from Synaps instead of a separately filtered service, and a drawing that fails to load the first time is retried automatically.",
      },
      {
        kind: "Fixed",
        title: "Type hex codes into color fields",
        body: "You can type a hex colour code into colour fields without the field mangling the value as you type.",
      },
    ],
  },
  {
    date: "2026-09-30",
    title: "Grid snapping, memory controls and copying fixes",
    summary:
      "Objects can now snap to the visible drawing grid, comments in the sidebar jump straight to their pin, and a new memory panel shows what a large model is spending its budget on. The week also brings fixes for copied images, pasting objects from groups, numeric fields and Safari trackpad zoom.",
    items: [
      {
        kind: "New",
        title: "Snap objects to the drawing grid",
        body: "With grid snapping enabled (it is off by default), placement targets sit on the grid's intersections and follow its type, angle and spacing. Snapping only applies while the grid is visible at your current zoom, so distant views stay uncluttered.",
      },
      {
        kind: "New",
        title: "Monitor and manage a model's memory usage",
        body: "A new memory panel warns as browser memory runs low, helps you find and remove large or unneeded items, and can purge unused blocks. At the limit, adding content pauses until you shrink the model; once saved, you are prompted to reload before continuing.",
      },
      {
        kind: "Improved",
        title: "Jump directly to a comment's location",
        body: "Selecting a comment in the sidebar now centers the camera on its pin and opens the thread beside it, so feedback is easier to find and act on.",
      },
      {
        kind: "Fixed",
        title: "Copied images survive deletion of their source page",
        body: "An image copied to another page stays readable for authorized copies even after the page holding the original upload is deleted.",
      },
      {
        kind: "Fixed",
        title: "Paste objects from groups at the correct position",
        body: "An object copied out of a group is now treated as the root of the pasted content, with its position and geometry converted to the destination's coordinates. This resolves offset or misplaced geometry when pasting between drawings.",
      },
      {
        kind: "Fixed",
        title: "Numeric edits reach the drawing",
        body: "Values set by dragging a numeric control now commit to the drawing just like typed values, and a half-typed decimal no longer corrupts hatch settings while you are still entering it.",
      },
      {
        kind: "Fixed",
        title: "Pinch to zoom with a Safari trackpad",
        body: "Safari's pinch gesture now drives the canvas zoom, focusing smoothly around the cursor without jumping or zooming twice.",
      },
    ],
  },
  {
    date: "2026-09-23",
    title: "Easier wall layer controls and more reliable signup",
    summary:
      "Wall layer rows are now easier to reorder and open with both mouse and keyboard. Account creation also completes even when optional services hit errors along the way.",
    items: [
      {
        kind: "Improved",
        title: "More accessible wall layer controls",
        body: "Layer rows can now be focused and opened with Enter or Space, and the reorder handle stays reachable from the side. Clicking near a layer's trailing control is also less likely to open the settings dialog by accident.",
      },
      {
        kind: "Fixed",
        title: "Account setup is more resilient to service errors",
        body: "Creating an account now finishes independently of optional analytics or marketing services. If one of those extras fails, your account and personal team are still created successfully.",
      },
    ],
  },
  {
    date: "2026-09-16",
    title: "Cleaner room fills and smoother zooming in Safari",
    summary:
      "Room fills now stay inside the inner edge of their wall outlines. Safari also stays responsive when you zoom out with comments and collaborator cursors on screen.",
    items: [
      {
        kind: "Fixed",
        title: "Room hatches stay inside wall outlines",
        body: "Room fills now position their edge inward based on the wall stroke, so fills remain within the visible outline even when wall styles change.",
      },
      {
        kind: "Fixed",
        title: "Safari zooming stays responsive with comments and cursors",
        body: "Comments and collaborator cursors are positioned in a way that avoids oversized browser layers, keeping zoomed-out views smooth and efficient in Safari while placement stays correct.",
      },
    ],
  },
  {
    date: "2026-09-09",
    title: "More control when a drawing becomes large",
    summary:
      "Very large models now warn you before editing becomes unsafe, and undo records only what it needs to reverse an edit. Stale block contents and the selection of image-based papers are fixed too. This entry was added retrospectively on 5 October 2026.",
    items: [
      {
        kind: "New",
        title: "See when a model is approaching its limit",
        body: "Synaps now warns when a model grows very large and suggests removing unused content or moving part of the drawing to a new model. At the critical limit the model becomes view-only, with a route to continue in a new model.",
      },
      {
        kind: "Improved",
        title: "Undo individual edits with less overhead",
        body: "Each undo step now stores just the changes needed to reverse it instead of reprocessing the whole drawing. The memory used by undo history is also bounded, so a long edit log cannot exhaust the browser; the oldest steps may be discarded when the budget is reached.",
      },
      {
        kind: "Fixed",
        title: "Removed block structures no longer leave stale objects",
        body: "Refreshing a changed block now includes its descendants, so geometry moved out of a deleted block definition no longer stays visible on the canvas.",
      },
      {
        kind: "Fixed",
        title: "Select image-based papers from their visible edges",
        body: "Papers built from raster content are now selected through their visible geometry instead of a header hit area you may not be able to see. A paper with content still avoids stealing clicks meant for the objects inside it.",
      },
    ],
  },
  {
    date: "2026-09-02",
    title: "Better loading for large drawings and returning teammates",
    summary:
      "Drawings packed with reusable blocks open faster because the canvas only prepares the content they need. Reopening a team invitation you already accepted now recognises your membership instead of reporting it as missing.",
    items: [
      {
        kind: "Improved",
        title: "Efficient loading for drawings with many blocks",
        body: "Opening a drawing no longer preloads every stored block definition for the renderer. Synaps prepares only the definitions the drawing needs and reuses them for repeated assets, which speeds up documents with many blocks.",
      },
      {
        kind: "Fixed",
        title: "Reopen an invitation after joining the team",
        body: "Reopening an invitation email with the invited account now displays it as already accepted rather than claiming it cannot be found, as long as that account is still a member of the team.",
      },
    ],
  },
  {
    date: "2026-08-26",
    title: "More predictable wall transforms and SVG imports",
    summary:
      "Wall adjustments and SVG imports behave more predictably this week. Rotating multi-layered walls no longer gets stuck, resizing a wall group keeps thickness intact, and imported SVGs preserve their overlapping coloured details.",
    items: [
      {
        kind: "Fixed",
        title: "Rotate layered walls without getting stuck",
        body: "During the final aiming stage, the moving edges of a multi-layered wall no longer capture the pointer and freeze the angle. The tool excludes the selected geometry at that stage, while you can still use it to pick the rotation centre and reference point.",
      },
      {
        kind: "Fixed",
        title: "Resize a wall group without stretching wall thickness",
        body: "Grouped walls now resize under their own geometry rules instead of being stretched like an image, so wall thickness stays consistent when you adjust a larger section of a plan.",
      },
      {
        kind: "Fixed",
        title: "Keep overlapping details in imported SVGs",
        body: "The SVG importer checks for overlapping colours before removing fills, so repeated same-colour fills no longer cause visible elements to disappear from imported artwork.",
      },
    ],
  },
  {
    date: "2026-08-19",
    title: "Finer hatch controls and clearer view-only states",
    summary:
      "Small adjustments get easier this week. Hatch scale gains finer control at small sizes, typed colour codes save instantly, arrowhead sizes mean the same thing across styles, and the editor explains clearly why editing is unavailable when it is.",
    items: [
      {
        kind: "Improved",
        title: "Fine-tune hatch scale",
        body: "The scale slider is now proportional, giving you finer control over small hatch patterns while still reaching large ones.",
      },
      {
        kind: "Fixed",
        title: "Typed colors stay applied",
        body: "A colour code typed into the appearance controls saves immediately once the full code is entered. Previously a typed colour was only a preview and reverted when you entered or left editing.",
      },
      {
        kind: "Improved",
        title: "More consistent arrowhead sizes",
        body: "Arrowhead styles — triangles, dots, squares and more — now share one sizing method, so switching styles keeps the size you set.",
      },
      {
        kind: "Improved",
        title: "Clearer messages when editing is unavailable",
        body: "When editing is off, the message now says why: view-only access, a lost connection, or a sync still in progress. Editing controls also follow your current permission state more reliably.",
      },
    ],
  },
  {
    date: "2026-08-12",
    title: "Export a drawing set in one PDF",
    summary:
      "Selected papers can now be exported together as one multi-page PDF, and a visible drawing grid — orthogonal, diagonal, isometric or a custom angle — helps with alignment. Shift constrains movement to an axis, plan resizing updates nested content consistently, and imported SVG artwork lands sized to its real bounds.",
    items: [
      {
        kind: "New",
        title: "Export multiple papers as a single PDF",
        body: "Select several papers and export them as one multi-page PDF in the order shown in the Layers panel, with each sheet keeping its original size and scale — separate PDFs remain an option. Portrait papers and rotations of exactly 90 degrees are supported; other angles are not yet.",
      },
      {
        kind: "New",
        title: "Use a visible drawing grid",
        body: "A customizable grid now sits behind your drawing — orthogonal, diagonal, isometric or a custom angle — with spacing and style controls in the sidebar's Grid section. Deselect your objects to find them.",
      },
      {
        kind: "Fixed",
        title: "Press Shift and move straight",
        body: "Holding Shift now locks movement to the dominant horizontal or vertical axis, so objects stay aligned. Snapping uses the same logic.",
      },
      {
        kind: "Fixed",
        title: "Rooms and nested content resize together",
        body: "Multi-object resizing now updates rooms and nested objects with the right geometry. This fixes cases where an outer group changed size while the content inside kept stale geometry.",
      },
      {
        kind: "Improved",
        title: "Imported SVG artwork fits the canvas",
        body: "SVG files you drop or paste are measured by their actual drawing bounds and fitted to your current view. Importing several at once arranges them neatly around your insertion point.",
      },
    ],
  },
  {
    date: "2026-08-05",
    title: "More control over measurements, copying and export",
    summary:
      "Measurement precision becomes a per-drawing setting, Alt or Option during a drag places copies, and selected images export straight to PNG or JPG. Papers keep their numbers when reordered, and dimension labels open their text editor exactly where the label sits.",
    items: [
      {
        kind: "Improved",
        title: "Customize measurement precision for each drawing",
        body: "Each drawing can now set its own units and decimal places (zero to four, or Auto), with individual dimensions able to override. Precision changes the label you read, not the underlying geometry; drawing-level preferences are saved per browser and not shared with your team.",
      },
      {
        kind: "New",
        title: "Duplicate while dragging",
        body: "Hold Alt on Windows or Option on Mac while dragging to place a copy instead of moving the original. Pressing or releasing the modifier mid-drag switches between the two modes.",
      },
      {
        kind: "New",
        title: "Export selected images as PNG or JPG",
        body: "Select one or more images on the canvas and download them as PNG or JPG from the export controls, with no paper arrangement needed. The export section appears when images are selected and notes whether a watermark applies.",
      },
      {
        kind: "Improved",
        title: "Paper names remain consistent when reordered",
        body: "Moving papers in your list no longer changes their generated numbers. Each paper keeps its name across the canvas and Layers panel, and only new papers take the next available number.",
      },
      {
        kind: "Fixed",
        title: "Dimension labels stay aligned while editing",
        body: "The text editor for a dimension label now opens where the label is actually drawn, instead of beside the line. The duplicate canvas text hides while you type, and the dimension line and arrowheads stay visible.",
      },
    ],
  },
  {
    date: "2026-07-29",
    title: "Live measurements and more accurate shape editing",
    summary:
      "Width, height and wall length update live in the sidebar while you drag, asset search puts exact name and tag matches first, and papers are selected from their headers. Subtraction now produces true cutouts, and filled shapes stay inside their paper boundaries.",
    items: [
      {
        kind: "Improved",
        title: "Read measurements while dragging",
        body: "The sidebar's measurement fields now follow the in-progress geometry rather than waiting for the drag to end. A field you are actively typing into keeps your value, so background updates never interrupt your input.",
      },
      {
        kind: "Fixed",
        title: "Accurate cutouts with subtraction",
        body: "The Difference operation now leaves a true cutout: a filled outer shape with a hollow inner space. Selection logic detects the opening instead of treating the empty centre as part of the filled object.",
      },
      {
        kind: "Improved",
        title: "Smarter asset search",
        body: "Searching the asset library now leads with exact name matches, then exact tag matches, then everything else — and that order holds as you scroll and more results load.",
      },
      {
        kind: "Fixed",
        title: "Filled objects respect paper boundaries",
        body: "Filled shapes no longer spill past the edge of their paper. The fill is clipped to the boundary like the rest of the object, keeping designs neat on the canvas.",
      },
      {
        kind: "Improved",
        title: "Select papers from headers",
        body: "Papers are now selected by clicking their header rather than across their entire area, so an empty sheet stops capturing clicks meant for nearby content.",
      },
    ],
  },
  {
    date: "2026-07-22",
    title: "Paste in place and more reliable editing",
    summary:
      "Paste in Place drops copied objects at their original coordinates, locked groups protect their contents, and page size changes keep their orientation. Project editors can upload images directly, and text on the canvas gains justified alignment.",
    items: [
      {
        kind: "New",
        title: "Paste at the original position",
        body: "Paste in Place inserts copied objects at their exact original coordinates, keeping their spacing intact — useful when aligning designs or moving layouts between drawings. It lives in the context menu, or use Command+Option+V on Mac and Ctrl+Alt+V on Windows.",
      },
      {
        kind: "Fixed",
        title: "Locked groups protect the objects inside",
        body: "Locking or hiding a group or paper now protects everything inside it. Selection and drawing tools respect the container's settings, and hidden containers are skipped when placing new objects so nothing disappears into a hidden parent.",
      },
      {
        kind: "Fixed",
        title: "Page orientation stays correct when resizing",
        body: "Changing a paper's size — say A4 to A3 — now carries its current orientation across instead of flipping landscape to portrait. This applies whether you are setting up one paper or several at once.",
      },
      {
        kind: "Fixed",
        title: "Upload images with project edit access",
        body: "The upload check now follows project-level access, so a colleague invited as an editor on one project can upload files there without permission errors — even without being an editor across the whole team.",
      },
      {
        kind: "New",
        title: "Justified text on the canvas",
        body: "A Justify option joins the text alignments, aligning paragraphs to both edges of their text box for a polished look. For now it applies on the canvas only — PDF and DXF exports still use left alignment.",
      },
    ],
  },
  {
    date: "2026-07-15",
    title: "Email invitations and polished drawing visibility",
    summary:
      "Team invitations can now be sent by email, with a role chosen per colleague and any paid editor seat showing its expected charge before you confirm. Hatch backgrounds keep their chosen colour on redraw, and grouped content no longer disappears after a move.",
    items: [
      {
        kind: "New",
        title: "Invite colleagues by email",
        body: "Email invitations can now share access to your teams and projects. You pick the right role for each colleague, recipients accept or decline inside Synaps, and if an invitation adds a paid editor seat you see the expected charge before confirming.",
      },
      {
        kind: "Fixed",
        title: "Hatch backgrounds update correctly",
        body: "Wall layer hatch backgrounds now keep the colour you selected when the drawing redraws, instead of losing it after a layer's appearance changes.",
      },
      {
        kind: "Fixed",
        title: "Grouped items stay visible after moving",
        body: "Content no longer disappears after moving a group or container. The display updates so every object appears at its correct new position.",
      },
    ],
  },
  {
    date: "2026-07-08",
    title: "Improved floorplan tracing and smoother imports",
    summary:
      "Floorplan tracing now waits for your confirmation before it starts — and before any credits are spent — with a clear outline and progress indication once it runs. PDF imports are more reliable in Safari, and switching teams lands you on that team's dashboard.",
    items: [
      {
        kind: "Improved",
        title: "Review floorplans before tracing begins",
        body: "Detected floorplans are now shown for review before any tracing starts, so credits are only spent once you confirm the selection. An animated outline and progress indicator make clear when the trace is running.",
      },
      {
        kind: "Fixed",
        title: "PDF imports in Safari",
        body: "An issue that could prevent PDF files from importing in Safari has been fixed, so PDF drawings now come in smoothly regardless of your browser version.",
      },
      {
        kind: "Fixed",
        title: "Easier team switching",
        body: "The team switcher now always lands you on the selected team's dashboard, where that team's own projects and spaces live — no more detours before you can pick your project.",
      },
    ],
  },
];
