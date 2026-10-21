"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, updateSession, uid, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";

/**
 * /invitations — the observed invitations index (invitations.listForTeam /
 * create / revoke / updateRole, with the editor-invite charge preview).
 */
export default function InvitationsPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"editor" | "viewer">("editor");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in to manage invitations</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);
  const pending = team.invitations.filter((i) => i.status === "pending");

  function create() {
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === team.id
          ? {
              ...t,
              invitations: [
                { id: uid("i"), email, role, status: "pending", createdAt: new Date().toISOString(), token: uid("inv") },
                ...t.invitations,
              ],
            }
          : t,
      ),
    }));
    setCreateOpen(false);
    setEmail("");
    setSession(loadSession());
  }

  function revoke(id: string) {
    updateSession((s) => ({
      ...s,
      teams: s.teams.map((t) =>
        t.id === team.id
          ? { ...t, invitations: t.invitations.map((i) => (i.id === id ? { ...i, status: "revoked" } : i)) }
          : t,
      ),
    }));
    setSession(loadSession());
  }

  return (
    <AppPage
      section="invitations"
      title="Invitations"
      subtitle={`${pending.length} pending in ${team.name} · editor invites cost ${team.plan === "Pro" ? "0" : "50"} credits/seat (simulated)`}
    >
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="rounded-control px-4 py-2 text-sm font-medium text-accent-solid-foreground"
          style={{ background: "var(--accent--solid)" }}
        >
          New invitation
        </button>
      </div>

      {team.invitations.length === 0 ? (
        <p className="text-sm text-content-secondary">
          No invitations yet. Invite teammates as editors or viewers — the accept flow lives at
          {" "}<code className="text-xs">/invite/&#123;token&#125;</code>.
        </p>
      ) : (
        <ul className="divide-y divide-border-solid/10 rounded-surface border border-border-solid/15">
          {team.invitations.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-content-primary">{i.email}</span>
                <span className="block text-xs text-content-secondary">
                  {i.role} · {i.status} · created {new Date(i.createdAt).toLocaleDateString()}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Link
                  href={`/invitations/${i.id}`}
                  className="rounded-control border border-border-solid/20 px-2 py-1 text-xs text-content-secondary hover:text-content-primary"
                >
                  Details
                </Link>
                {i.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard?.writeText(`${window.location.origin}/invite/${i.token}`);
                        setCopied(i.id);
                        setTimeout(() => setCopied(null), 1500);
                      }}
                      className="rounded-control border border-border-solid/20 px-2 py-1 text-xs text-content-secondary hover:text-content-primary"
                    >
                      {copied === i.id ? "Copied!" : "Copy link"}
                    </button>
                    <button
                      type="button"
                      onClick={() => revoke(i.id)}
                      className="rounded-control border border-border-solid/20 px-2 py-1 text-xs text-content-secondary hover:text-content-primary"
                    >
                      Revoke
                    </button>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-container border border-border-solid/15 bg-surface-base p-6 shadow-2xl">
            <h2 className="text-base font-semibold text-content-primary">New invitation</h2>
            <p className="mt-1 text-xs text-content-secondary">
              Editor invites: {team.plan === "Pro" ? "included" : "50 credits/seat"} (simulated charge preview).
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@studio.com"
              type="email"
              aria-label="Email"
              className="mt-4 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            />
            <label className="mt-3 block text-xs text-content-secondary" htmlFor="inv-role">Role</label>
            <select
              id="inv-role"
              value={role}
              onChange={(e) => setRole(e.target.value as "editor" | "viewer")}
              className="mt-1 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setCreateOpen(false)} className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised">
                Cancel
              </button>
              <button
                type="button"
                disabled={!email.includes("@")}
                onClick={create}
                className="rounded-control px-4 py-2 text-sm font-medium text-accent-solid-foreground disabled:opacity-50" style={{ background: "var(--accent--solid)" }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <SimNote>
        Educational clone — mirrors invitations.create / revoke / updateRole / listForTeam and the
        editor-invite charge preview (invitations.previewEditorInviteCharge) recovered from the
        production bundle. Emails are never sent; accept links are local only.
      </SimNote>
    </AppPage>
  );
}
