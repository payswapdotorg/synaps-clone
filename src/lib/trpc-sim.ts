"use client";

/**
 * trpc-sim — the simulated tRPC client.
 *
 * The real beta.synaps.app talks to api.synaps.app over tRPC; the full
 * procedure inventory was recovered from the production bundle (REA
 * analysis, 2026-10-21 — see docs/REMAINING-FUNCTIONALITIES.md §B). This
 * module mirrors that surface one-to-one: every namespace and procedure
 * name below matches the bundle. Each call resolves after a short simulated
 * latency and operates on the localStorage session — no network leaves the
 * browser. Devtools markers ("[trpc-sim]") label every simulated round-trip.
 */

import {
  activeTeam,
  addModel,
  addTeam,
  freeEntitlements,
  loadSession,
  proEntitlements,
  saveSession,
  uid,
  updateSession,
  type MemberRole,
  type SimNotification,
} from "@/lib/session";
import { PUBLIC_TEMPLATES, templateById } from "@/lib/templates";

const LATENCY = 220 + Math.random() * 260;

function wait<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

function mark(procedure: string) {
  // One quiet, greppable line per simulated round-trip (honesty marker).
  console.debug(`[trpc-sim] ${procedure} (simulated — no network)`);
}

function requireSession() {
  const s = loadSession();
  if (!s) throw new Error("trpc-sim: no session");
  return s;
}

function notify(s: ReturnType<typeof requireSession>, n: Omit<SimNotification, "id" | "at" | "read">) {
  return {
    ...s,
    notifications: [
      { ...n, id: uid("n"), at: new Date().toISOString(), read: false },
      ...s.notifications,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* users                                                               */
/* ------------------------------------------------------------------ */

export const users = {
  me: () => wait(requireSession().user),
  onSignup: (input: { email: string; name: string }) =>
    mark("users.onSignup") as unknown as Promise<void>,
  onboardingStatus: () => wait({ completed: Boolean(requireSession().onboarding) }),
  consentStatus: () => wait({ analytics: requireSession().consents.analytics }),
  emitJourneyEvent: (input: { name: string; props?: Record<string, unknown> }) =>
    mark(`users.emitJourneyEvent(${input.name})`) as unknown as Promise<void>,
};

/* ------------------------------------------------------------------ */
/* teams                                                               */
/* ------------------------------------------------------------------ */

export const teams = {
  getDefault: () => wait(activeTeam(requireSession())),
  getById: (id: string) =>
    wait(requireSession().teams.find((t) => t.id === id) ?? null),
  list: () => wait(requireSession().teams),
  getMembers: (teamId: string) =>
    wait(requireSession().teams.find((t) => t.id === teamId)?.members ?? []),
  removeMember: (input: { teamId: string; memberId: string }) => {
    mark("teams.removeMember");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === input.teamId
          ? { ...t, members: t.members.filter((m) => m.id !== input.memberId) }
          : t,
      ),
    }));
    return wait({ ok: true });
  },
  updateMemberRole: (input: { teamId: string; memberId: string; role: MemberRole }) => {
    mark("teams.updateMemberRole");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === input.teamId
          ? {
              ...t,
              members: t.members.map((m) =>
                m.id === input.memberId ? { ...m, role: input.role } : m,
              ),
            }
          : t,
      ),
    }));
    return wait({ ok: true });
  },
  removeResourceGuest: (input: { teamId: string; resourceId: string }) => {
    mark("teams.removeResourceGuest");
    return wait({ ok: true, resourceId: input.resourceId });
  },
  getInviteContext: (teamId: string) => {
    const t = requireSession().teams.find((x) => x.id === teamId);
    return wait({
      teamName: t?.name ?? "Team",
      plan: t?.plan ?? "Free",
      inviterName: requireSession().user.name,
    });
  },
  previewMemberEditorCharge: (input: { teamId: string; seats: number }) => {
    mark("teams.previewMemberEditorCharge");
    const t = requireSession().teams.find((x) => x.id === input.teamId);
    const perSeat = t?.plan === "Pro" ? 0 : 50;
    return wait({ perSeatCredits: perSeat, totalCredits: perSeat * input.seats });
  },
  createTeam: (name: string) => {
    mark("teams.create (simulated extension of teams.list surface)");
    updateSession((s) => addTeam(s, name));
    return wait({ ok: true });
  },
};

/* ------------------------------------------------------------------ */
/* invitations                                                         */
/* ------------------------------------------------------------------ */

export const invitations = {
  listForTeam: (teamId: string) =>
    wait(requireSession().teams.find((t) => t.id === teamId)?.invitations ?? []),
  create: (input: { teamId: string; email: string; role: "editor" | "viewer" }) => {
    mark("invitations.create");
    const token = uid("inv");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === input.teamId
          ? {
              ...t,
              invitations: [
                {
                  id: uid("i"),
                  email: input.email,
                  role: input.role,
                  status: "pending",
                  createdAt: new Date().toISOString(),
                  token,
                },
                ...t.invitations,
              ],
            }
          : t,
      ),
    }));
    return wait({ token, acceptUrl: `/invite/${token}` });
  },
  revoke: (input: { teamId: string; invitationId: string }) => {
    mark("invitations.revoke");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === input.teamId
          ? {
              ...t,
              invitations: t.invitations.map((i) =>
                i.id === input.invitationId ? { ...i, status: "revoked" } : i,
              ),
            }
          : t,
      ),
    }));
    return wait({ ok: true });
  },
  updateRole: (input: { teamId: string; invitationId: string; role: "editor" | "viewer" }) => {
    mark("invitations.updateRole");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === input.teamId
          ? {
              ...t,
              invitations: t.invitations.map((i) =>
                i.id === input.invitationId ? { ...i, role: input.role } : i,
              ),
            }
          : t,
      ),
    }));
    return wait({ ok: true });
  },
  previewEditorInviteCharge: (input: { seats: number }) => {
    mark("invitations.previewEditorInviteCharge");
    const t = activeTeam(requireSession());
    const perSeat = t.plan === "Pro" ? 0 : 50;
    return wait({ perSeatCredits: perSeat, totalCredits: perSeat * input.seats });
  },
};

/* ------------------------------------------------------------------ */
/* credits / gates                                                     */
/* ------------------------------------------------------------------ */

export const credits = {
  getBalance: (teamId: string) =>
    wait(requireSession().teams.find((t) => t.id === teamId)?.credits ?? 0),
  mode: () => wait({ mode: "rolling" as const, note: "simulated" }),
};

export const gates = {
  getTeamEntitlements: (teamId: string) =>
    wait(requireSession().teams.find((t) => t.id === teamId)?.entitlements ?? freeEntitlements()),
  requireDxfImport: (teamId: string) => {
    const ent = requireSession().teams.find((t) => t.id === teamId)?.entitlements;
    if (!ent?.dxfImport) {
      return wait({ ok: false, reason: "DXF import not entitled on this plan" });
    }
    return wait({ ok: true });
  },
};

/* ------------------------------------------------------------------ */
/* stripe (billing) — fully simulated                                  */
/* ------------------------------------------------------------------ */

export const stripe = {
  listProducts: () =>
    wait([
      {
        id: "prod-free",
        name: "Free",
        price: 0,
        currency: "usd",
        features: ["3 models", "3 pages per model", "300 rolling credits", "Watermarked exports"],
      },
      {
        id: "prod-pro",
        name: "Pro",
        price: 24,
        currency: "usd",
        interval: "month",
        features: ["Unlimited models", "Unlimited pages", "Rolling credits", "No watermarks", "DWG import/export"],
      },
    ]),
  createCheckout: (input: { teamId: string; productId: string }) => {
    mark("stripe.createCheckout");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === input.teamId
          ? { ...t, plan: "Pro", entitlements: proEntitlements(), credits: t.credits + 300 }
          : t,
      ),
    }));
    return wait({ url: null, simulated: true, note: "checkout simulated locally" });
  },
  createPortalSession: (teamId: string) => {
    mark("stripe.createPortalSession");
    const t = requireSession().teams.find((x) => x.id === teamId);
    return wait({ simulated: true, plan: t?.plan ?? "Free" });
  },
  getSubscription: (teamId: string) => {
    const t = requireSession().teams.find((x) => x.id === teamId);
    return wait({
      plan: t?.plan ?? "Free",
      status: t?.plan === "Pro" ? ("active" as const) : null,
      renewsAt: null,
      simulated: true,
    });
  },
  updateSubscription: (input: { teamId: string; seats?: number }) => {
    mark("stripe.updateSubscription");
    return wait({ ok: true, simulated: true });
  },
  cancelSubscription: (teamId: string) => {
    mark("stripe.cancelSubscription");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === teamId ? { ...t, plan: "Free", entitlements: freeEntitlements() } : t,
      ),
    }));
    return wait({ ok: true, simulated: true });
  },
  listInvoices: (teamId: string) =>
    wait(requireSession().teams.find((t) => t.id === teamId)?.invoices ?? []),
  validatePromo: (code: string) => {
    mark("stripe.validatePromo");
    const ok = code.trim().toUpperCase() === "SYNAPS-CLONE";
    return wait({
      ok,
      percentOff: ok ? 10 : null,
      note: ok ? "Promo applied (simulated)" : "Invalid code",
    });
  },
};

/* ------------------------------------------------------------------ */
/* templates                                                           */
/* ------------------------------------------------------------------ */

export const templates = {
  listPublic: () => wait(PUBLIC_TEMPLATES),
  listAll: () => wait(PUBLIC_TEMPLATES),
  forModel: (modelId: string) => wait(PUBLIC_TEMPLATES.slice(0, 2)),
  getById: (id: string) => wait(templateById(id) ?? null),
  saveModelAsTemplate: (input: { modelId: string; name: string; description?: string }) => {
    mark("templates.saveModelAsTemplate");
    updateSession((s) => ({ ...s, savedTemplates: [...s.savedTemplates, input.modelId] }));
    return wait({ ok: true });
  },
  delete: (id: string) => wait({ ok: true }),
  prepareSourceAccess: (id: string) => {
    mark("templates.prepareSourceAccess");
    return wait({ ok: true, simulated: true });
  },
};

/* ------------------------------------------------------------------ */
/* resources (models)                                                  */
/* ------------------------------------------------------------------ */

export const resources = {
  create: (input: { teamId: string; name?: string; source: "scratch" | "upload" | "ai" | "template" | "journey"; prompt?: string; fromTemplateId?: string }) => {
    mark("resources.create");
    const s = requireSession();
    const { session, model } = addModel(s, input);
    void session;
    return wait(model);
  },
  getById: (id: string) => {
    for (const t of requireSession().teams) {
      const m = t.models.find((x) => x.id === id);
      if (m) return wait({ ...m, teamId: t.id });
    }
    return wait(null);
  },
  list: (teamId: string) =>
    wait(requireSession().teams.find((t) => t.id === teamId)?.models ?? []),
};

/* ------------------------------------------------------------------ */
/* storage / assets                                                    */
/* ------------------------------------------------------------------ */

export const storage = {
  list: () => wait([] as unknown[]),
  getSignedUrls: (keys: string[]) =>
    wait(keys.map((k) => ({ key: k, url: `simulated-signed:${k}` }))),
  copyAssetsIntoTeam: (input: { teamId: string; keys: string[] }) => {
    mark("storage.copyAssetsIntoTeam");
    return wait({ copied: input.keys.length, simulated: true });
  },
  isServer: () => wait(false),
  supabase: () => wait({ configured: false, note: "simulated — no Supabase in the clone" }),
};

export const assets = {
  list: () => wait([]),
  getShapes: (ids: string[]) => wait([]),
  mutate: (input: unknown) => wait({ ok: true, simulated: true }),
};

/* ------------------------------------------------------------------ */
/* ai / layout / export                                                */
/* ------------------------------------------------------------------ */

export const ai = {
  operationId: () => wait(uid("op")),
  image: (input: { prompt: string }) => {
    mark("ai.image");
    return wait({ simulated: true, note: "no image generation in the clone" });
  },
};

export const layout = {
  layoutBox: () => wait({ simulated: true }),
  source: () => wait({ simulated: true }),
  generate: (input: { prompt: string; teamId: string }) => {
    mark("layout.generate");
    const { session, model } = addModel(requireSession(), {
      teamId: input.teamId,
      name: input.prompt.slice(0, 40) || "AI draft",
      source: "ai",
      prompt: input.prompt,
    });
    void session;
    return wait({ modelId: model.id, pageId: model.pages[0].id, simulated: true });
  },
  trace: (input: { teamId: string; filename: string }) => {
    mark("layout.trace");
    const { session, model } = addModel(requireSession(), {
      teamId: input.teamId,
      name: input.filename.replace(/\.[a-z0-9]+$/i, "") || "Traced plan",
      source: "upload",
    });
    void session;
    return wait({ modelId: model.id, pageId: model.pages[0].id, simulated: true });
  },
};

export const exportDxf = {
  dxf: (input: { modelId: string }) => {
    mark("export.dxf");
    return wait({ ok: true, bytes: null, simulated: true });
  },
};

/* ------------------------------------------------------------------ */
/* admin / realtime                                                    */
/* ------------------------------------------------------------------ */

export const admin = {
  signOut: () => {
    mark("admin.signOut");
    saveSession(null);
    return wait({ ok: true });
  },
};

export const realtime = {
  synaps: () => wait({ simulated: true, note: "no realtime backend in the clone" }),
  setAuth: () => wait({ ok: true, simulated: true }),
  getChannels: () => wait([]),
  removeChannel: () => wait({ ok: true }),
  removeAllChannels: () => wait({ ok: true }),
};

/* ------------------------------------------------------------------ */
/* notifications (client-side extension of the observed surface)        */
/* ------------------------------------------------------------------ */

export const notificationsApi = {
  list: () => wait(requireSession().notifications),
  markRead: (id: string) => {
    updateSession((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
    return wait({ ok: true });
  },
  markAllRead: () => {
    updateSession((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));
    return wait({ ok: true });
  },
  push: (n: Omit<SimNotification, "id" | "at" | "read">) => {
    updateSession((s) => notify(s, n));
    return wait({ ok: true });
  },
};

export const trpc = {
  users,
  teams,
  invitations,
  credits,
  gates,
  stripe,
  templates,
  resources,
  storage,
  assets,
  ai,
  layout,
  export: exportDxf,
  admin,
  realtime,
  notifications: notificationsApi,
};
