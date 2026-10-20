/**
 * Demo flow — data model, step definitions, mock data and validation.
 *
 * SCOPE / HONESTY NOTE
 * This models the journey recorded in the PRODUCT FLOW section of ANALYSIS.md
 * (steps 5–8 of the inferred flow):
 *
 *   5. Draft mode  — import an input, then AI generate ("Describe the space.
 *      Get an editable plan.") or AI trace ("Any photo, scan or sketch,
 *      traced into editable lines.") → a layered plan.
 *   6. Draft refine — direct manipulation on the drafting canvas: dot grid,
 *      crosshair, snapping guides, angle control, hatches/materials/blocks.
 *   7. Polish mode — cast/edit shadows live, sun position & time of day, swap
 *      finishes, camera framing ("Walk the space").
 *   8. Deliver — document export/reuse; credits and billing gate usage;
 *      sharing via members, invitations, notifications.
 *
 * Every string below is either quoted from the COPY INVENTORY of ANALYSIS.md
 * or is plain instructional text for the simulation. Nothing here describes a
 * real, working service.
 *
 * NO NETWORK CALLS. The flow is entirely client-side and uses mock data.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type StepId =
  | "source"
  | "configure"
  | "processing"
  | "draft"
  | "polish"
  | "deliver";

export type SourceKind = "generate" | "trace" | "import";

export type LayerId =
  | "walls"
  | "windows"
  | "doors"
  | "stairs"
  | "hatches"
  | "labels"
  | "dimensions";

export type Units = "mm" | "cm" | "m";

export type FinishId = "floor" | "wall" | "ceiling";

export type CameraId = "entry" | "corner" | "elevated";

export type ExportFormat = "PDF" | "DWG" | "DXF" | "PNG";

export type StepDef = {
  id: StepId;
  index: string;
  title: string;
  summary: string;
};

/* -------------------------------------------------------------------------- */
/* Step definitions                                                            */
/* -------------------------------------------------------------------------- */

export const steps: StepDef[] = [
  {
    id: "source",
    index: "01",
    title: "Source",
    summary: "Choose how the plan begins.",
  },
  {
    id: "configure",
    index: "02",
    title: "Configure",
    summary: "Describe the space, or attach a file.",
  },
  {
    id: "processing",
    index: "03",
    title: "Processing",
    summary: "The plan is built from your input.",
  },
  {
    id: "draft",
    index: "04",
    title: "Draft",
    summary: "Walls, openings, layers, angle control.",
  },
  {
    id: "polish",
    index: "05",
    title: "Polish",
    summary: "Light, finishes and camera framing.",
  },
  {
    id: "deliver",
    index: "06",
    title: "Deliver",
    summary: "Export the drawing and share it.",
  },
];

/** Ordered ids, used by the reducer to compute back/next transitions. */
export const stepOrder: StepId[] = steps.map((step) => step.id);

/* -------------------------------------------------------------------------- */
/* Source options — copy quoted from the COPY INVENTORY                        */
/* -------------------------------------------------------------------------- */

export const sourceOptions: {
  kind: SourceKind;
  title: string;
  body: string;
  cost: number;
  tag: string;
}[] = [
  {
    kind: "generate",
    title: "Generate",
    body: "Describe the space. Get an editable plan.",
    cost: 8,
    tag: "AI generate",
  },
  {
    kind: "trace",
    title: "Trace",
    body: "Any photo, scan or sketch, traced into editable lines.",
    cost: 5,
    tag: "AI trace",
  },
  {
    kind: "import",
    title: "Import",
    body: "Import your CAD files",
    cost: 0,
    tag: "Native import",
  },
];

export const sourceByKind = (kind: SourceKind) =>
  sourceOptions.find((option) => option.kind === kind) ?? sourceOptions[0];

/* -------------------------------------------------------------------------- */
/* Layer definitions                                                           */
/* -------------------------------------------------------------------------- */

export const layerOptions: { id: LayerId; label: string; detail: string }[] = [
  { id: "walls", label: "Walls", detail: "Multilayer walls" },
  { id: "windows", label: "Windows", detail: "Glazed openings" },
  { id: "doors", label: "Doors", detail: "Openings with swing" },
  { id: "stairs", label: "Stairs", detail: "Rise and run" },
  { id: "hatches", label: "Hatches", detail: "Hatches, materials, blocks." },
  { id: "labels", label: "Labels", detail: "Room names and areas" },
  { id: "dimensions", label: "Dimensions", detail: "Overall measurement" },
];

/* -------------------------------------------------------------------------- */
/* Finishes — for the polish step                                              */
/* -------------------------------------------------------------------------- */

export const finishOptions: Record<FinishId, { label: string; swatch: string }[]> = {
  floor: [
    { label: "Polished concrete", swatch: "#c9cdd3" },
    { label: "Oak boards", swatch: "#c79a63" },
    { label: "Terrazzo", swatch: "#ded8cf" },
  ],
  wall: [
    { label: "Lime plaster", swatch: "#e7e5e4" },
    { label: "Clay render", swatch: "#d9c3a5" },
    { label: "Board-formed", swatch: "#b9b2a8" },
  ],
  ceiling: [
    { label: "Flat white", swatch: "#f8fafc" },
    { label: "Exposed slab", swatch: "#c4c7cb" },
    { label: "Acoustic panel", swatch: "#aab6c4" },
  ],
};

export const cameraOptions: { id: CameraId; label: string; detail: string }[] = [
  { id: "entry", label: "Entry", detail: "Eye level on the threshold" },
  { id: "corner", label: "Corner", detail: "Wide angle from the corner" },
  { id: "elevated", label: "Elevated", detail: "Looking down over the plan" },
];

/* -------------------------------------------------------------------------- */
/* Mock data — the plan the simulation "produces"                              */
/* -------------------------------------------------------------------------- */

export const mockRooms = [
  { id: "studio", name: "Studio", area: "48.2 m²" },
  { id: "meeting", name: "Meeting", area: "21.6 m²" },
  { id: "studio-b", name: "Studio B", area: "31.4 m²" },
];

export const mockPromptSuggestion =
  "A 101 m² open-plan studio with a meeting room and a second workspace, one entrance, and windows along the north wall.";

export const mockFileNames = [
  "scan-ground-floor.png",
  "sketch-lobby.jpg",
  "existing-conditions.dwg",
  "traced-plan.dxf",
];

/* -------------------------------------------------------------------------- */
/* Validation                                                                  */
/* -------------------------------------------------------------------------- */

const SUPPORTED_EXTENSIONS = /\.(dwg|dxf|pdf|png|jpe?g|webp)$/i;

export type ValidationErrors = Partial<Record<string, string>>;

/**
 * Validates the configure step. Returns a map of field → message; an empty
 * object means the step may proceed.
 */
export function validateConfigure(state: {
  source: SourceKind;
  prompt: string;
  fileName: string;
  floors: number;
  credits: number;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (state.source === "generate") {
    const prompt = state.prompt.trim();
    if (!prompt) {
      errors.prompt = "Describe the space. Get an editable plan.";
    } else if (prompt.length < 12) {
      errors.prompt =
        "Add a little more detail — describe the space in at least 12 characters.";
    }
  } else {
    if (!state.fileName) {
      errors.file = "Attach a file to continue.";
    } else if (!SUPPORTED_EXTENSIONS.test(state.fileName)) {
      errors.file = "Supported formats: DWG, DXF, PDF, PNG, JPG, WEBP.";
    }
  }

  if (!Number.isFinite(state.floors) || state.floors < 1 || state.floors > 12) {
    errors.floors = "Enter between 1 and 12 floors.";
  }

  const cost = sourceByKind(state.source).cost;
  if (cost > state.credits) {
    errors.credits = `This step needs ${cost} credits and you have ${state.credits}.`;
  }

  return errors;
}

/** Formats a byte count for the mock file chip. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Hours → a readable time-of-day label, for the polish step. */
export function timeLabel(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
