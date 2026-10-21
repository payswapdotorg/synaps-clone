"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, updateSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { relTime } from "@/app/(app)/t/[teamId]/page";

/** /invitations/{invitationId} — detail/manager view for one invitation. */
export default function InvitationDetail({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) {
  const [session, setSession] = useState<SimSession | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    void params.then((p) => setId(p.invitationId));
    setSession(loadSession());
  }, [params]);

  if (!session || !id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);
  const inv = team.invitations.find((i) => i.id === id);

  if (!inv) {
    return (
      <AppPage section="invitations" title="Invitation not found">
        <p className="text-sm text-content-secondary">
          This invitation does not exist in the local session.{" "}
          <Link href="/invitations" className="underline underline-offset-2">Back to invitations</Link>
        </p>
      </AppPage>
    );
  }

  return (
    <AppPage section="invitations" title={`Invitation · ${inv.email}`}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-content-secondary">Email</dt>
        <dd className="text-content-primary">{inv.email}</dd>
        <dt className="text-content-secondary">Role</dt>
        <dd className="text-content-primary">{inv.role}</dd>
        <dt className="text-content-secondary">Status</dt>
        <dd className="text-content-primary">{inv.status}</dd>
        <dt className="text-content-secondary">Created</dt>
        <dd className="text-content-primary">{relTime(inv.createdAt)}</dd>
        <dt className="text-content-secondary">Accept link</dt>
        <dd className="text-content-primary">
          <code className="text-xs">/invite/{inv.token}</code>{" "}
          <Link href={`/invite/${inv.token}`} className="text-xs underline underline-offset-2">
            open
          </Link>
        </dd>
      </dl>

      {inv.status === "pending" && (
        <div className="mt-6 flex gap-2">
          {(["editor", "viewer"] as const)
            .filter((r) => r !== inv.role)
            .map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  updateSession((s) => ({
                    ...s,
                    teams: s.teams.map((t) =>
                      t.id === team.id
                        ? { ...t, invitations: t.invitations.map((x) => (x.id === inv.id ? { ...x, role: r } : x)) }
                        : t,
                    ),
                  }));
                  setSession(loadSession());
                }}
                className="rounded-control border border-border-solid/20 px-3 py-1.5 text-xs text-content-secondary hover:text-content-primary"
              >
                Change to {r}
              </button>
            ))}
          <button
            type="button"
            onClick={() => {
              updateSession((s) => ({
                ...s,
                teams: s.teams.map((t) =>
                  t.id === team.id
                    ? { ...t, invitations: t.invitations.map((x) => (x.id === inv.id ? { ...x, status: "revoked" } : x)) }
                    : t,
                ),
              }));
              setSession(loadSession());
            }}
            className="rounded-control border border-border-solid/20 px-3 py-1.5 text-xs text-content-secondary hover:text-content-primary"
          >
            Revoke
          </button>
        </div>
      )}
      <SimNote />
    </AppPage>
  );
}
