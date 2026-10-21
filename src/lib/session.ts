"use client";

/**
 * Simulated product session for the educational clone — v2 (full-product).
 *
 * The real beta.synaps.app authenticates through Google SSO (Supabase GoTrue)
 * and keeps a `sb-auth-auth-token` entry in localStorage (observed live).
 * This clone performs NO real authentication: “signing in” with the mock
 * Google dialog only writes the simulated session below to localStorage.
 *
 * v2 extends the model to the full product surface reconstructed from the
 * production bundle (REA analysis, 2026-10-21): multiple teams, spaces,
 * multi-page models, members, invitations, notifications, entitlements,
 * invoices, template saves and consents. A v1 session (pre-F1) is migrated
 * in place on load.
 */

export type SimUser = { id: string; email: string; name: string };

export type SimPage = { id: string; name: string };

export type SimModel = {
  id: string;
  name: string;
  spaceId: string;
  pages: SimPage[];
  edited: string; // ISO timestamp
  source: "scratch" | "upload" | "ai" | "template" | "fixture" | "journey";
  prompt?: string;
  fromTemplateId?: string;
};

export type SimSpace = { id: string; name: string };

export type MemberRole = "owner" | "editor" | "viewer";

export type SimMember = {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  since: string;
};

export type SimInvitation = {
  id: string;
  email: string;
  role: Exclude<MemberRole, "owner">;
  status: "pending" | "revoked" | "accepted";
  createdAt: string;
  token: string;
};

export type SimNotification = {
  id: string;
  kind: "invite" | "credits" | "system" | "model";
  title: string;
  body: string;
  at: string;
  read: boolean;
};

/** Mirrors the entitlement keys observed in the bundle (gates.getTeamEntitlements). */
export type SimEntitlements = {
  maxModels: number;
  maxPages: number;
  dwgImport: boolean;
  dxfImport: boolean;
  dwgExport: boolean;
  watermarked: boolean;
};

export type SimInvoice = {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: "paid" | "open";
  date: string;
  description: string;
};

export type SimTeam = {
  id: string;
  name: string;
  plan: "Free" | "Pro";
  credits: number;
  spaces: SimSpace[];
  models: SimModel[];
  members: SimMember[];
  invitations: SimInvitation[];
  entitlements: SimEntitlements;
  invoices: SimInvoice[];
};

export type SimAnswers = Record<string, string | string[] | undefined>;

export type SimSession = {
  version: 2;
  user: SimUser;
  teams: SimTeam[];
  activeTeamId: string;
  onboarding: SimAnswers | null;
  consents: { analytics: boolean };
  notifications: SimNotification[];
  savedTemplates: string[]; // ids of templates saved from models
  createdAt: string;
};

const KEY = "synaps-clone:session";

export const DEFAULT_TEAM_ID = "t-demo-team";
const DEFAULT_SPACE = { id: "sp-residential", name: "Residential Projects" };

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export const FREE_MODEL_LIMIT = 3;

export function freeEntitlements(): SimEntitlements {
  return {
    maxModels: 3,
    maxPages: 3,
    dwgImport: false,
    dxfImport: true,
    dwgExport: false,
    watermarked: true,
  };
}

export function proEntitlements(): SimEntitlements {
  return {
    maxModels: Number.POSITIVE_INFINITY,
    maxPages: Number.POSITIVE_INFINITY,
    dwgImport: true,
    dxfImport: true,
    dwgExport: true,
    watermarked: false,
  };
}

export function fixtureModels(): SimModel[] {
  return [
    {
      id: "m-uploaded-plan",
      name: "Uploaded Plan",
      spaceId: DEFAULT_SPACE.id,
      pages: [{ id: "p-uploaded-plan", name: "Page 1" }],
      edited: new Date(Date.now() - 26 * 3600_000).toISOString(),
      source: "fixture",
    },
  ];
}

function seedNotifications(user: string): SimNotification[] {
  const now = Date.now();
  return [
    {
      id: uid("n"),
      kind: "system",
      title: "Welcome to Synaps",
      body: `This simulated notification centre mirrors the NotificationGallery observed in the production bundle. Signed in as ${user}.`,
      at: new Date(now - 2 * 3600_000).toISOString(),
      read: false,
    },
    {
      id: uid("n"),
      kind: "credits",
      title: "300 credits added",
      body: "Free plan accounts start with 300 rolling credits. Upgrade to Pro for unlimited models and pages.",
      at: new Date(now - 26 * 3600_000).toISOString(),
      read: false,
    },
  ];
}

/** v1 shape (pre-F1) kept for migration typing only. */
type V1Session = {
  user: SimUser;
  team: { id: string; name: string; plan: "Free"; credits: number };
  spaces: SimSpace[];
  models: {
    id: string;
    name: string;
    spaceId: string;
    pageId: string;
    edited: string;
    source: SimModel["source"];
    prompt?: string;
  }[];
  onboarding: SimAnswers | null;
  createdAt: string;
};

function migrate(raw: unknown): SimSession | null {
  const v1 = raw as V1Session & Partial<SimSession>;
  if (v1.version === 2 && Array.isArray(v1.teams)) return raw as SimSession;
  if (!v1.user || !v1.team) return null;
  const team: SimTeam = {
    id: v1.team.id,
    name: v1.team.name,
    plan: v1.team.plan ?? "Free",
    credits: v1.team.credits ?? 300,
    spaces: v1.spaces?.length ? v1.spaces : [DEFAULT_SPACE],
    models: (v1.models ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      spaceId: m.spaceId,
      pages: [{ id: m.pageId, name: "Page 1" }],
      edited: m.edited,
      source: m.source,
      prompt: m.prompt,
    })),
    members: [
      {
        id: uid("mem"),
        name: v1.user.name,
        email: v1.user.email,
        role: "owner",
        since: v1.createdAt ?? new Date().toISOString(),
      },
    ],
    invitations: [],
    entitlements: freeEntitlements(),
    invoices: [],
  };
  return {
    version: 2,
    user: v1.user,
    teams: [team],
    activeTeamId: team.id,
    onboarding: v1.onboarding ?? null,
    consents: { analytics: false },
    notifications: seedNotifications(v1.user.email),
    savedTemplates: [],
    createdAt: v1.createdAt ?? new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Store: session state + subscriptions (tiny client store)            */
/* ------------------------------------------------------------------ */

let cache: SimSession | null = null;
const listeners = new Set<() => void>();

export function loadSession(): SimSession | null {
  if (typeof window === "undefined") return null;
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const s = migrate(JSON.parse(raw));
    if (s) cache = s;
    return s;
  } catch {
    return null;
  }
}

export function saveSession(s: SimSession | null) {
  if (typeof window === "undefined") return;
  cache = s;
  if (s) window.localStorage.setItem(KEY, JSON.stringify(s));
  else window.localStorage.removeItem(KEY);
  listeners.forEach((l) => l());
}

/** Apply a transaction to the session; persists and notifies. */
export function updateSession(fn: (s: SimSession) => SimSession): SimSession {
  const cur = loadSession();
  if (!cur) throw new Error("no session");
  const next = fn(cur);
  saveSession(next);
  return next;
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ------------------------------------------------------------------ */
/* Construction                                                        */
/* ------------------------------------------------------------------ */

export function createSession(email: string, name: string): SimSession {
  const team: SimTeam = {
    id: DEFAULT_TEAM_ID,
    name: `${name.split(" ")[0]}'s team`,
    plan: "Free",
    credits: 300,
    spaces: [DEFAULT_SPACE],
    models: fixtureModels(),
    members: [
      {
        id: uid("mem"),
        name,
        email,
        role: "owner",
        since: new Date().toISOString(),
      },
    ],
    invitations: [],
    entitlements: freeEntitlements(),
    invoices: [],
  };
  const s: SimSession = {
    version: 2,
    user: { id: uid("u"), email, name },
    teams: [team],
    activeTeamId: team.id,
    onboarding: null,
    consents: { analytics: false },
    notifications: seedNotifications(email),
    savedTemplates: [],
    createdAt: new Date().toISOString(),
  };
  saveSession(s);
  return s;
}

/* ------------------------------------------------------------------ */
/* Helpers used across app pages                                       */
/* ------------------------------------------------------------------ */

export function activeTeam(s: SimSession): SimTeam {
  return s.teams.find((t) => t.id === s.activeTeamId) ?? s.teams[0];
}

export function addTeam(s: SimSession, name: string): SimSession {
  const team: SimTeam = {
    id: uid("t"),
    name,
    plan: "Free",
    credits: 300,
    spaces: [{ id: uid("sp"), name: "General" }],
    models: [],
    members: [
      { id: uid("mem"), name: s.user.name, email: s.user.email, role: "owner", since: new Date().toISOString() },
    ],
    invitations: [],
    entitlements: freeEntitlements(),
    invoices: [],
  };
  return { ...s, teams: [...s.teams, team], activeTeamId: team.id };
}

export function addModel(
  s: SimSession,
  input: { name?: string; source: SimModel["source"]; prompt?: string; fromTemplateId?: string; teamId?: string },
): { session: SimSession; model: SimModel } {
  const teamId = input.teamId ?? s.activeTeamId;
  const team = s.teams.find((t) => t.id === teamId) ?? activeTeam(s);
  const model: SimModel = {
    id: uid("m"),
    name: input.name || "Model 1",
    spaceId: team.spaces[0]?.id ?? DEFAULT_SPACE.id,
    pages: [{ id: uid("p"), name: "Page 1" }],
    edited: new Date().toISOString(),
    source: input.source,
    prompt: input.prompt,
    fromTemplateId: input.fromTemplateId,
  };
  const session: SimSession = {
    ...s,
    teams: s.teams.map((t) =>
      t.id === team.id ? { ...t, models: [model, ...t.models] } : t,
    ),
  };
  saveSession(session);
  return { session, model };
}

export function touchModel(s: SimSession, teamId: string, modelId: string): SimSession {
  const session: SimSession = {
    ...s,
    teams: s.teams.map((t) =>
      t.id === teamId
        ? {
            ...t,
            models: t.models.map((m) =>
              m.id === modelId ? { ...m, edited: new Date().toISOString() } : m,
            ),
          }
        : t,
    ),
  };
  saveSession(session);
  return session;
}
