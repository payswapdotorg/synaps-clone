"use client";

/**
 * Simulated product session for the educational clone.
 *
 * The real beta.synaps.app authenticates through Google SSO (Supabase GoTrue)
 * and keeps a `sb-auth-auth-token` entry in localStorage (observed live).
 * This clone performs NO real authentication: “signing in” with the mock
 * Google dialog only writes the simulated session below to localStorage.
 */

export type SimUser = {
  id: string;
  email: string;
  name: string;
};

export type SimModel = {
  id: string;
  name: string;
  spaceId: string;
  pageId: string;
  edited: string; // ISO timestamp
  source: "scratch" | "upload" | "ai" | "template" | "fixture";
  prompt?: string;
};

export type SimSpace = {
  id: string;
  name: string;
};

export type SimTeam = {
  id: string;
  name: string;
  plan: "Free";
  credits: number;
};

export type SimAnswers = Record<string, string | string[] | undefined>;

export type SimSession = {
  user: SimUser;
  team: SimTeam;
  spaces: SimSpace[];
  models: SimModel[];
  onboarding: SimAnswers | null;
  createdAt: string;
};

const KEY = "synaps-clone:session";

export const DEFAULT_TEAM_ID = "t-demo-team";
const DEFAULT_SPACE = { id: "sp-residential", name: "Residential Projects" };

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function fixtureModels(): SimModel[] {
  const now = Date.now();
  return [
    {
      id: "m-uploaded-plan",
      name: "Uploaded Plan",
      spaceId: DEFAULT_SPACE.id,
      pageId: "p-uploaded-plan",
      edited: new Date(now - 26 * 3600_000).toISOString(),
      source: "fixture",
    },
  ];
}

export function loadSession(): SimSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SimSession;
  } catch {
    return null;
  }
}

export function saveSession(s: SimSession | null) {
  if (typeof window === "undefined") return;
  if (s) window.localStorage.setItem(KEY, JSON.stringify(s));
  else window.localStorage.removeItem(KEY);
}

export function createSession(email: string, name: string): SimSession {
  const s: SimSession = {
    user: { id: uid("u"), email, name },
    team: {
      id: DEFAULT_TEAM_ID,
      name: `${name.split(" ")[0]}'s team`,
      plan: "Free",
      credits: 300,
    },
    spaces: [DEFAULT_SPACE],
    models: fixtureModels(),
    onboarding: null,
    createdAt: new Date().toISOString(),
  };
  saveSession(s);
  return s;
}

export function addModel(
  s: SimSession,
  input: { name?: string; source: SimModel["source"]; prompt?: string },
): { session: SimSession; model: SimModel } {
  const model: SimModel = {
    id: uid("m"),
    name: input.name || "Model 1",
    spaceId: DEFAULT_SPACE.id,
    pageId: uid("p"),
    edited: new Date().toISOString(),
    source: input.source,
    prompt: input.prompt,
  };
  const session = { ...s, models: [model, ...s.models] };
  saveSession(session);
  return { session, model };
}

export function touchModel(s: SimSession, modelId: string): SimSession {
  const session = {
    ...s,
    models: s.models.map((m) =>
      m.id === modelId ? { ...m, edited: new Date().toISOString() } : m,
    ),
  };
  saveSession(session);
  return session;
}

export const FREE_MODEL_LIMIT = 3;
