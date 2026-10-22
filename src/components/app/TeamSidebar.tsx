"use client";

/**
 * TeamSidebar — the app-wide navigation, reconstructed from the observed
 * TeamSidebarV2 surface (team switcher + plan badge, Home/Recent/Spaces,
 * credits pill) and extended with the account-area links recovered from the
 * production bundle router (members, invitations, notifications, settings,
 * billing, storage, templates, admin, sculpt studio).
 *
 * MOBILE NOTE (clone-original design): the real product's authenticated shell
 * sits behind an SSO wall, so its small-screen behaviour could not be
 * harvested. The mobile drawer below is therefore this clone's own honest
 * design — a standard slide-in drawer that keeps every section reachable
 * below the md breakpoint — and is NOT claimed as parity with the original.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  activeTeam,
  addTeam,
  loadSession,
  saveSession,
  subscribe,
  updateSession,
  type SimSession,
} from "@/lib/session";

export type SidebarSection =
  | "home" | "recent" | "space" | "members" | "invitations" | "notifications"
  | "settings" | "billing" | "storage" | "templates" | "credits-banners"
  | "admin" | "sculpt-studio";

/** Map a pathname to the highlighted sidebar section (used by the mobile drawer). */
function sectionFromPath(pathname: string): SidebarSection {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/recent") return "recent";
  if (p.startsWith("/t/")) return p.includes("/w/") ? "space" : "home";
  const direct: Record<string, SidebarSection> = {
    "/members": "members",
    "/invitations": "invitations",
    "/billing": "billing",
    "/notifications": "notifications",
    "/settings": "settings",
    "/storage": "storage",
    "/templates": "templates",
    "/credits-banners": "credits-banners",
    "/admin": "admin",
    "/sculpt-studio": "sculpt-studio",
  };
  return direct[p] ?? "home";
}

export function useAppSession(): SimSession | null {
  const [session, setSession] = useState<SimSession | null>(null);
  useEffect(() => {
    setSession(loadSession());
    const off = subscribe(() => setSession(loadSession()));
    return () => {
      off();
    };
  }, []);
  return session;
}

export function TeamSidebar({
  teamId,
  active,
}: {
  teamId: string;
  active: SidebarSection;
}) {
  const s = loadSession();
  if (!s) return null;
  return (
    <aside
      className="hidden w-60 shrink-0 flex-col border-r border-border-solid/10 bg-surface-base px-4 py-5 md:flex"
      aria-label="Team navigation"
    >
      <TeamSidebarNav teamId={teamId} active={active} />
    </aside>
  );
}

/**
 * The sidebar body — shared by the desktop rail and the mobile drawer.
 * `onNavigate` fires after any in-app navigation so the drawer can close.
 */
function TeamSidebarNav({
  teamId,
  active,
  onNavigate,
}: {
  teamId: string;
  active: SidebarSection;
  onNavigate?: () => void;
}) {
  const s = loadSession();
  const [teamMenu, setTeamMenu] = useState(false);
  const [newTeam, setNewTeam] = useState(false);
  const [name, setName] = useState("");
  if (!s) return null;
  const team = s.teams.find((t) => t.id === teamId) ?? activeTeam(s);
  const unread = s.notifications.filter((n) => !n.read).length;

  const item = (key: SidebarSection, href: string, label: string, badge?: number) => (
    <Link
      key={key}
      href={href}
      aria-current={active === key ? "page" : undefined}
      onClick={onNavigate}
      className={
        active === key
          ? "flex items-center justify-between rounded-control bg-surface-raised px-3 py-1.5 text-sm font-medium text-content-primary"
          : "flex items-center justify-between rounded-control px-3 py-1.5 text-sm text-content-secondary hover:bg-surface-raised hover:text-content-primary"
      }
    >
      <span>{label}</span>
      {badge ? (
        <span className="rounded-pill bg-accent-subtle px-1.5 text-[10px] font-semibold text-accent-subtle-foreground">
          {badge}
        </span>
      ) : null}
    </Link>
  );

  return (
    <>
      <div className="relative">
        <button
          type="button"
          aria-label="Switch team"
          aria-haspopup="menu"
          aria-expanded={teamMenu}
          onClick={() => setTeamMenu((v) => !v)}
          className="flex w-full items-center justify-between rounded-control px-2 py-1.5 text-sm font-medium text-content-primary hover:bg-surface-raised"
        >
          <span className="truncate">{team.name}</span>
          <span className="text-[10px] text-content-secondary">{team.plan}</span>
        </button>
        {teamMenu && (
          <div
            className="absolute left-0 right-0 top-full z-20 mt-1 rounded-control border border-border-solid/15 bg-surface-base p-1 shadow-lg"
            role="menu"
          >
            {s.teams.map((t) => (
              <button
                key={t.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  updateSession((cur) => ({ ...cur, activeTeamId: t.id }));
                  setTeamMenu(false);
                  window.location.href = `/t/${t.id}`;
                }}
                className="flex w-full items-center justify-between rounded-control px-3 py-2 text-left text-sm text-content-primary hover:bg-surface-raised"
              >
                <span className="truncate">{t.name}</span>
                <span className="text-[10px] text-content-secondary">{t.plan}</span>
              </button>
            ))}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setNewTeam(true);
                setTeamMenu(false);
              }}
              className="w-full rounded-control px-3 py-2 text-left text-sm text-content-secondary hover:bg-surface-raised hover:text-content-primary"
            >
              + New team
            </button>
          </div>
        )}
      </div>

      <nav className="mt-6 space-y-1 text-sm" aria-label="Team sections">
        {item("home", `/t/${team.id}`, "Home")}
        {item("recent", "/recent", "Recent")}
        <p className="px-3 pt-4 pb-1 text-2xs font-semibold uppercase tracking-wide text-content-secondary">
          Spaces
        </p>
        {team.spaces.map((sp) => item("space", `/t/${team.id}/w/${sp.id}`, sp.name))}
        <p className="px-3 pt-4 pb-1 text-2xs font-semibold uppercase tracking-wide text-content-secondary">
          Team
        </p>
        {item("members", "/members", "Members", team.members.length)}
        {item("invitations", "/invitations", "Invitations", team.invitations.filter((i) => i.status === "pending").length)}
        {item("billing", "/billing", "Billing")}
        <p className="px-3 pt-4 pb-1 text-2xs font-semibold uppercase tracking-wide text-content-secondary">
          Account
        </p>
        {item("notifications", "/notifications", "Notifications", unread)}
        {item("settings", "/settings", "Settings")}
        {item("storage", "/storage", "Storage")}
        {item("templates", "/templates", "Templates")}
        {item("credits-banners", "/credits-banners", "Credits banners")}
        <p className="px-3 pt-4 pb-1 text-2xs font-semibold uppercase tracking-wide text-content-secondary">
        Internal
        </p>
        {item("admin", "/admin", "Admin")}
        {item("sculpt-studio", "/sculpt-studio", "Sculpt studio")}
      </nav>

      <div className="mt-auto rounded-control border border-border-solid/15 px-3 py-2 text-xs text-content-secondary">
        <span className="font-medium text-content-primary">{team.credits} credits</span>
        <span className="block text-2xs">{team.plan} plan · simulated</span>
      </div>

      {newTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-container border border-border-solid/15 bg-surface-base p-6 shadow-2xl">
            <h2 className="text-base font-semibold text-content-primary">New team</h2>
            <p className="mt-1 text-xs text-content-secondary">Simulated — teams are local only.</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Team name"
              aria-label="Team name"
              className="mt-4 w-full rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setNewTeam(false)} className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised">
                Cancel
              </button>
              <button
                type="button"
                disabled={!name.trim()}
                onClick={() => {
                  const t = name.trim();
                  updateSession((cur) => addTeam(cur, t));
                  setNewTeam(false);
                  setName("");
                  window.location.reload();
                }}
                className="rounded-control px-4 py-2 text-sm font-medium text-accent-solid-foreground disabled:opacity-50"
                style={{ background: "var(--accent--solid)" }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Account avatar + sign-out header used across app pages. */
export function AppTopBar({ teamId, right }: { teamId: string; right?: React.ReactNode }) {
  const s = loadSession();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const active = sectionFromPath(pathname);

  // While the mobile drawer is open: lock scrolling and close on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  if (!s) return null;
  return (
    <header className="flex items-center justify-between border-b border-border-solid/10 px-3 py-3 md:px-6">
      <div className="flex min-w-0 items-center gap-1">
        <button
          type="button"
          aria-label="Open team navigation"
          aria-expanded={drawerOpen}
          aria-controls="team-nav-drawer"
          onClick={() => setDrawerOpen(true)}
          className="mr-1 flex size-9 shrink-0 items-center justify-center rounded-control text-content-secondary hover:bg-surface-raised hover:text-content-primary md:hidden"
        >
          <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <Link href={`/t/${teamId}`} className="truncate text-sm font-semibold tracking-tight text-content-primary">
          Synaps Clone
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {right}
        <div className="relative">
          <button
            type="button"
            aria-label="Account menu"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-7 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-content-primary"
          >
            {s.user.name.slice(0, 1).toUpperCase()}
          </button>
          {open && (
            <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-control border border-border-solid/15 bg-surface-base p-1 shadow-lg" role="menu">
              <div className="px-3 py-2 text-xs text-content-secondary">{s.user.email}</div>
              <Link href={`/t/${teamId}/settings`} className="block rounded-control px-3 py-2 text-sm text-content-primary hover:bg-surface-raised">
                Settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  saveSession(null);
                  window.location.href = "/login";
                }}
                className="w-full rounded-control px-3 py-2 text-left text-sm text-content-primary hover:bg-surface-raised"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Team navigation">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            id="team-nav-drawer"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col overflow-y-auto border-r border-border-solid/15 bg-surface-base px-4 py-5 shadow-2xl"
          >
            <TeamSidebarNav teamId={teamId} active={active} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
