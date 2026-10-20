/**
 * Demo flow — state machine.
 *
 * A plain reducer: the flow is entirely client-side, makes no network calls,
 * and runs on mock data. The state shape mirrors the journey recorded in the
 * PRODUCT FLOW section of ANALYSIS.md (steps 5–8: source → configure →
 * processing → draft → polish → deliver).
 */

import {
  layerOptions,
  sourceByKind,
  type CameraId,
  type ExportFormat,
  type FinishId,
  type LayerId,
  type SourceKind,
  type StepId,
} from "@/lib/demo";

export type ProcessStatus = "idle" | "running" | "done" | "error";

export type DemoState = {
  /** Current step. */
  step: StepId;
  /** Every step the user has reached, so the stepper can navigate backwards. */
  visited: StepId[];

  /* -- Source / configure ------------------------------------------------- */
  source: SourceKind;
  prompt: string;
  fileName: string;
  fileSize: number;
  floors: number;
  credits: number;

  /* -- Processing --------------------------------------------------------- */
  progress: number;
  status: ProcessStatus;
  /** Simulated failure, so the error branch is reachable and testable. */
  simulateFailure: boolean;

  /* -- Draft -------------------------------------------------------------- */
  layers: Record<LayerId, boolean>;
  selectedRoom: string | null;
  /** Angle control — "Lock the view. Reuse it across deliverables." */
  angle: number;
  angleLocked: boolean;
  showGuides: boolean;
  showCrosshair: boolean;

  /* -- Polish ------------------------------------------------------------- */
  sunAngle: number;
  hours: number;
  finishes: Record<FinishId, string>;
  camera: CameraId;

  /* -- Deliver ------------------------------------------------------------ */
  exportFormat: ExportFormat;
  shared: boolean;
};

export type DemoAction =
  | { type: "goto"; step: StepId }
  | { type: "back" }
  | { type: "next" }
  | { type: "set-source"; source: SourceKind }
  | { type: "set-prompt"; prompt: string }
  | { type: "set-file"; fileName: string; fileSize: number }
  | { type: "set-floors"; floors: number }
  | { type: "toggle-layer"; layer: LayerId }
  | { type: "select-room"; room: string | null }
  | { type: "set-angle"; angle: number }
  | { type: "toggle-angle-lock" }
  | { type: "toggle-guides" }
  | { type: "toggle-crosshair" }
  | { type: "toggle-simulate-failure" }
  | { type: "set-sun"; sunAngle: number }
  | { type: "set-hours"; hours: number }
  | { type: "set-finish"; finish: FinishId; label: string }
  | { type: "set-camera"; camera: CameraId }
  | { type: "set-format"; format: ExportFormat }
  | { type: "toggle-shared" }
  | { type: "process-start" }
  | { type: "process-tick"; amount: number }
  | { type: "process-done" }
  | { type: "process-fail" }
  | { type: "consume-credits"; amount: number }
  | { type: "reset" };

export const initialState: DemoState = {
  step: "source",
  visited: ["source"],

  source: "generate",
  prompt: "",
  fileName: "",
  fileSize: 0,
  floors: 1,
  credits: 40,

  progress: 0,
  status: "idle",
  simulateFailure: false,

  layers: Object.fromEntries(
    layerOptions.map((layer) => [layer.id, true]),
  ) as Record<LayerId, boolean>,
  selectedRoom: null,
  angle: 0,
  angleLocked: false,
  showGuides: false,
  showCrosshair: true,

  sunAngle: 210,
  hours: 14,
  finishes: {
    floor: "Polished concrete",
    wall: "Lime plaster",
    ceiling: "Flat white",
  },
  camera: "corner",

  exportFormat: "PDF",
  shared: false,
};

/** The step that follows `step` in the recorded flow. */
export const nextStep: Record<StepId, StepId> = {
  source: "configure",
  configure: "processing",
  processing: "draft",
  draft: "polish",
  polish: "deliver",
  deliver: "deliver",
};

export const prevStep: Record<StepId, StepId> = {
  source: "source",
  configure: "source",
  processing: "configure",
  draft: "processing",
  polish: "draft",
  deliver: "polish",
};

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "goto":
      return {
        ...state,
        step: action.step,
        visited: state.visited.includes(action.step)
          ? state.visited
          : [...state.visited, action.step],
      };

    case "back":
      return { ...state, step: prevStep[state.step] };

    case "next":
      return {
        ...state,
        step: nextStep[state.step],
        visited: state.visited.includes(nextStep[state.step])
          ? state.visited
          : [...state.visited, nextStep[state.step]],
      };

    case "set-source":
      return {
        ...state,
        source: action.source,
        // Switching method invalidates the other method's input.
        prompt: action.source === "generate" ? state.prompt : "",
        fileName: action.source === "import" ? state.fileName : "",
      };

    case "set-prompt":
      return { ...state, prompt: action.prompt };

    case "set-file":
      return { ...state, fileName: action.fileName, fileSize: action.fileSize };

    case "set-floors":
      return { ...state, floors: action.floors };

    case "toggle-layer":
      return {
        ...state,
        layers: { ...state.layers, [action.layer]: !state.layers[action.layer] },
      };

    case "select-room":
      return {
        ...state,
        selectedRoom: state.selectedRoom === action.room ? null : action.room,
      };

    case "set-angle":
      return state.angleLocked
        ? state
        : { ...state, angle: ((action.angle % 360) + 360) % 360 };

    case "toggle-angle-lock":
      return { ...state, angleLocked: !state.angleLocked };

    case "toggle-guides":
      return { ...state, showGuides: !state.showGuides };

    case "toggle-crosshair":
      return { ...state, showCrosshair: !state.showCrosshair };

    case "toggle-simulate-failure":
      return { ...state, simulateFailure: !state.simulateFailure };

    case "set-sun":
      return { ...state, sunAngle: action.sunAngle };

    case "set-hours":
      return { ...state, hours: action.hours };

    case "set-finish":
      return {
        ...state,
        finishes: { ...state.finishes, [action.finish]: action.label },
      };

    case "set-camera":
      return { ...state, camera: action.camera };

    case "set-format":
      return { ...state, exportFormat: action.format };

    case "toggle-shared":
      return { ...state, shared: !state.shared };

    case "process-start":
      return { ...state, status: "running", progress: 0 };

    case "process-tick":
      return {
        ...state,
        progress: Math.min(100, state.progress + action.amount),
      };

    case "process-done":
      return { ...state, status: "done", progress: 100 };

    case "process-fail":
      return { ...state, status: "error", progress: 0 };

    case "consume-credits":
      return { ...state, credits: Math.max(0, state.credits - action.amount) };

    case "reset":
      return { ...initialState };

    default:
      return state;
  }
}

/** Cost in credits of the currently selected source method. */
export const currentCost = (source: SourceKind) => sourceByKind(source).cost;
