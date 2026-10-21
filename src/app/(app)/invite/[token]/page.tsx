"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, uid, updateSession } from "@/lib/session";

/**
 * /invite/{token} — the observed invite-accept entry (public route in the
 * real product; invite._token chunk with invite-accept-error states). In the
 * clone the token is matched against the local session's invitations; the
 * accept action adds the inviter's team to the invitee's session (simulated
 * both-ends since there is only one browser).
 */
export default function InviteAccept({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "found" | "invalid" | "revoked" | "accepted">("loading");
  const [context, setContext] = useState<{ teamName: string; inviter: string; role: string } | null>(null);

  useEffect(() => {
    void params.then((p) => setToken(p.token));
  }, [params]);

  useEffect(() => {
    if (!token) return;
    const s = loadSession();
    if (!s) {
      setState("invalid");
      return;
    }
    for (const t of s.teams) {
      const inv = t.invitations.find((i) => i.token === token);
      if (inv) {
        setContext({ teamName: t.name, inviter: t.members[0]?.name ?? "A teammate", role: inv.role });
        setState(inv.status === "revoked" ? "revoked" : "found");
        return;
      }
    }
    setState("invalid");
  }, [token]);

  function accept() {
    if (!token) return;
    updateSession((s) => {
      for (const t of s.teams) {
        const inv = t.invitations.find((i) => i.token === token);
        if (inv && inv.status === "pending") {
          const teamId = t.id;
          return {
            ...s,
            teams: s.teams.map((x) =>
              x.id === teamId
                ? {
                    ...x,
                    members: [
                      ...x.members,
                      {
                        id: uid("mem"),
                        name: s.user.name,
                        email: inv.email,
                        role: inv.role,
                        since: new Date().toISOString(),
                      },
                    ],
                    invitations: x.invitations.map((i) => (i.token === token ? { ...i, status: "accepted" as const } : i)),
                  }
                : x,
            ),
            notifications: [
              {
                id: uid("n"),
                kind: "invite" as const,
                title: `You joined ${t.name}`,
                body: `Invitation accepted as ${inv.role} (simulated).`,
                at: new Date().toISOString(),
                read: false,
              },
              ...s.notifications,
            ],
          };
        }
      }
      return s;
    });
    setState("accepted");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-base px-6">
      <div className="w-full max-w-md rounded-container border border-border-solid/15 bg-surface-base p-8 text-center shadow-xl">
        {state === "loading" && <p className="text-sm text-content-secondary">Loading invitation…</p>}
        {state === "invalid" && (
          <>
            <h1 className="text-lg font-semibold text-content-primary">Invitation not found</h1>
            <p className="mt-2 text-sm text-content-secondary">
              This invite link is not valid in your local session. In the real product the token is
              verified server-side (teams.getInviteContext).
            </p>
            <Link href="/login" className="mt-6 inline-block text-sm underline underline-offset-2">
              Back to sign-in
            </Link>
          </>
        )}
        {state === "revoked" && (
          <>
            <h1 className="text-lg font-semibold text-content-primary">Invitation revoked</h1>
            <p className="mt-2 text-sm text-content-secondary">This invitation was revoked by the team owner.</p>
          </>
        )}
        {state === "found" && context && (
          <>
            <p className="eyebrow-index">Join team</p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-content-primary">
              {context.inviter} invited you to {context.teamName}
            </h1>
            <p className="mt-2 text-sm text-content-secondary">You would join as {context.role}.</p>
            <button
              type="button"
              onClick={accept}
              className="mt-6 w-full rounded-control px-6 py-2.5 text-sm font-medium text-accent-solid-foreground"
              style={{ background: "var(--accent--solid)" }}
            >
              Accept invitation
            </button>
            <p className="mt-3 text-[11px] text-content-secondary">
              Simulated — the clone has one browser session, so the invitee joins the same local
              session's team.
            </p>
          </>
        )}
        {state === "accepted" && context && (
          <>
            <h1 className="text-lg font-semibold text-content-primary">Welcome to {context.teamName}</h1>
            <p className="mt-2 text-sm text-content-secondary">You joined as {context.role}.</p>
            <Link
              href={`/t/${activeTeam(loadSession() ?? ({} as never))?.id ?? ""}`}
              className="mt-6 inline-block text-sm underline underline-offset-2"
            >
              Go to team home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
