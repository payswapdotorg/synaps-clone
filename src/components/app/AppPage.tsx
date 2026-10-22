"use client";

/**
 * AppPage — shared frame for the authenticated app surface: auth gate,
 * TeamSidebar, top bar, and a titled content area. Used by every app route
 * that is not the team dashboard itself (settings, members, billing, …).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession, type SimSession } from "@/lib/session";
import { AppTopBar, TeamSidebar, type SidebarSection } from "@/components/app/TeamSidebar";
import type { ReactNode } from "react";

export type AppSection = SidebarSection;

export function AppPage({
  teamId: tid,
  section,
  title,
  subtitle,
  children,
  wide,
}: {
  teamId?: string;
  section: AppSection;
  title: string;
  subtitle?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const [session, setSession] = useState<SimSession | null>(null);
  const [teamId, setTeamId] = useState<string | null>(tid ?? null);

  useEffect(() => {
    const s = loadSession();
    setSession(s);
    setTeamId(tid ?? (s ? activeTeam(s).id : null));
  }, [tid]);

  if (!session || !teamId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <div className="text-center">
          <p className="text-sm text-content-secondary">
            {session === null ? "No session — sign in first." : "Loading…"}
          </p>
          {session === null && (
            <Link href="/login" className="mt-4 inline-block text-sm underline underline-offset-2">
              Go to sign-in
            </Link>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-surface-base">
      <TeamSidebar teamId={teamId} active={section} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar teamId={teamId} />
        <div className={`mx-auto w-full flex-1 px-6 py-10 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          <h1 className="text-xl font-semibold tracking-tight text-content-primary">{title}</h1>
          {subtitle ? (
            <p className="mt-1.5 text-sm text-content-secondary">{subtitle}</p>
          ) : null}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

/** The honest footer note printed on simulated app pages. */
export function SimNote({ children }: { children?: ReactNode }) {
  return (
    <p className="mt-12 text-[11px] leading-relaxed text-content-secondary">
      {children ??
        "Educational clone — this screen reconstructs the structure of the original product's authenticated surface. All data and actions are simulated locally in your browser; nothing leaves this page."}
    </p>
  );
}
