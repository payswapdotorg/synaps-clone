"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, updateSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { relTime } from "@/app/t/[teamId]/page";

/**
 * /members — team member management. Mirrors the observed surface:
 * teams.getMembers / updateMemberRole / removeMember, with the editor-seat
 * charge preview (teams.previewMemberEditorCharge — 50 credits/seat on Free).
 */
export default function MembersPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"editor" | "viewer">("editor");

  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in to manage members</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);
  const perSeat = team.plan === "Pro" ? 0 : 50;
  const editorSeats = team.members.filter((m) => m.role === "editor").length;
  const total = perSeat * editorSeats;

  function changeRole(memberId: string, next: "owner" | "editor" | "viewer") {
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === team.id
          ? { ...t, members: t.members.map((m) => (m.id === memberId ? { ...m, role: next } : m)) }
          : t,
      ),
    }));
    setSession(loadSession());
  }

  function removeMember(memberId: string) {
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === team.id ? { ...t, members: t.members.filter((m) => m.id !== memberId) } : t,
      ),
    }));
    setSession(loadSession());
  }

  function addMember() {
    const name = email.split("@")[0].replace(/[._-]+/g, " ");
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === team.id
          ? {
              ...t,
              members: [
                ...t.members,
                { id: `mem-${Math.random().toString(36).slice(2, 8)}`, name, email, role, since: new Date().toISOString() },
              ],
            }
          : t,
      ),
    }));
    setInviteOpen(false);
    setEmail("");
    setSession(loadSession());
  }

  return (
    <AppPage
      section="members"
      title="Members"
      subtitle={`${team.members.length} member${team.members.length === 1 ? "" : "s"} in ${team.name}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-content-secondary">
          Editor seats preview: {perSeat === null ? "—" : `${perSeat} credits/seat`}
          {total !== null ? ` · ${total} credits total` : ""}
        </p>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="rounded-control px-4 py-2 text-sm font-medium text-content-inverse"
          style={{ background: "var(--accent--canvas--guide, #1a73e8)" }}
        >
          Add member
        </button>
      </div>

      <ul className="divide-y divide-border-solid/10 rounded-surface border border-border-solid/15">
        {team.members.map((m) => (
          <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-content-primary">{m.name}</span>
              <span className="block text-xs text-content-secondary">
                {m.email} · joined {relTime(m.since)}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <label className="sr-only" htmlFor={`role-${m.id}`}>Role for {m.name}</label>
              <select
                id={`role-${m.id}`}
                value={m.role}
                disabled={m.role === "owner"}
                onChange={(e) => changeRole(m.id, e.target.value as "editor" | "viewer")}
                className="rounded-control border border-border-solid/20 bg-surface-base px-2 py-1 text-xs text-content-primary disabled:opacity-60"
              >
                <option value="owner">Owner</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              {m.role !== "owner" && (
                <button
                  type="button"
                  onClick={() => removeMember(m.id)}
                  className="rounded-control border border-border-solid/20 px-2 py-1 text-xs text-content-secondary hover:text-content-primary"
                >
                  Remove
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>

      {inviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-container border border-border-solid/15 bg-surface-base p-6 shadow-2xl">
            <h2 className="text-base font-semibold text-content-primary">Add member (simulated)</h2>
            <p className="mt-1 text-xs text-content-secondary">
              The real product sends an invitation via email; here the member joins the local session directly.
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@studio.com"
              aria-label="Email"
              type="email"
              className="mt-4 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            />
            <label className="mt-3 block text-xs text-content-secondary" htmlFor="member-role">Role</label>
            <select
              id="member-role"
              value={role}
              onChange={(e) => setRole(e.target.value as "editor" | "viewer")}
              className="mt-1 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            >
              <option value="editor">Editor {team.plan === "Free" ? "(50 credits/seat)" : ""}</option>
              <option value="viewer">Viewer (free)</option>
            </select>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setInviteOpen(false)} className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised">
                Cancel
              </button>
              <button
                type="button"
                disabled={!email.includes("@")}
                onClick={addMember}
                className="rounded-control bg-content-inverse px-4 py-2 text-sm font-medium text-content-inverse-foreground disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <SimNote>
        Educational clone — member management mirrors teams.getMembers / updateMemberRole /
        removeMember and the editor-seat charge preview observed in the production bundle.
        Everything is simulated locally.
      </SimNote>
    </AppPage>
  );
}
