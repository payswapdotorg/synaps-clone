"use client";

/**
 * Feature-flag registry — keys, fallbacks and override rules transcribed
 * from the beta.synaps.app production bundle (REA analysis, 2026-10-21).
 *
 * The real product gates features through a flag registry where some flags
 * explicitly disallow local overrides (`allowLocalOverride: false`). This
 * clone mirrors that registry honestly: server-locked flags stay locked,
 * overridable flags can be toggled locally (persisted to localStorage) and
 * the UI always labels the state as simulated.
 */

export type FlagKey =
  | "dwg-import"
  | "dwg-export"
  | "iceberg-release"
  | "redesign-shell"
  | "redesign-v1-6"
  | "native-export"
  | "onboarding-generated-floors"
  | "renderer-v3-culling"
  | "renderer-v3-kernel";

export interface FlagDef {
  key: FlagKey;
  /** Value used when no override exists. */
  fallback: boolean;
  /** false = server-controlled; local toggles are refused. */
  allowLocalOverride: boolean;
  note: string;
}

export const FLAG_DEFS: FlagDef[] = [
  { key: "dwg-import", fallback: false, allowLocalOverride: true, note: "DWG import (OpenCascade occt-wasm in the real product)" },
  { key: "dwg-export", fallback: false, allowLocalOverride: true, note: "DWG export" },
  { key: "iceberg-release", fallback: false, allowLocalOverride: false, note: "Iceberg release wave (server-locked)" },
  { key: "redesign-shell", fallback: false, allowLocalOverride: true, note: "Redesigned app shell (released with iceberg-release)" },
  { key: "redesign-v1-6", fallback: false, allowLocalOverride: true, note: "v1.6 redesign surface" },
  { key: "native-export", fallback: false, allowLocalOverride: false, note: "Native export pipeline (server-locked)" },
  { key: "onboarding-generated-floors", fallback: false, allowLocalOverride: true, note: "Seed generated floors from onboarding answers" },
  { key: "renderer-v3-culling", fallback: true, allowLocalOverride: true, note: "Renderer v3 culling (defaults on)" },
  { key: "renderer-v3-kernel", fallback: true, allowLocalOverride: true, note: "Renderer v3 kernel (defaults on)" },
];

const KEY = "synaps-clone:flags";

type Overrides = Partial<Record<FlagKey, boolean>>;

function loadOverrides(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Overrides;
  } catch {
    return {};
  }
}

function saveOverrides(o: Overrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(o));
}

export function flagValue(key: FlagKey): boolean {
  const def = FLAG_DEFS.find((d) => d.key === key);
  if (!def) return false;
  const o = loadOverrides();
  if (def.allowLocalOverride && key in o) return Boolean(o[key]);
  return def.fallback;
}

/** Returns false when the flag is server-locked (no local override possible). */
export function setFlag(key: FlagKey, value: boolean): boolean {
  const def = FLAG_DEFS.find((d) => d.key === key);
  if (!def || !def.allowLocalOverride) return false;
  const o = loadOverrides();
  o[key] = value;
  saveOverrides(o);
  return true;
}

export function resetFlags() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}
