"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Root 404 — theme-aware.
 *
 * Unmatched URLs render here under the root layout. The clone serves two
 * surfaces with different design languages: the light marketing/docs site
 * and the dark authenticated app (the real beta.synaps.app ships
 * <html class="dark>). This page picks the scope by path so a stale app
 * deep link (/t/…/something) still lands on a dark page and an unknown
 * marketing path lands on the light site.
 */

const APP_PREFIXES = [
  "/login",
  "/register",
  "/onboarding",
  "/recent",
  "/settings",
  "/members",
  "/billing",
  "/notifications",
  "/invitations",
  "/invite",
  "/templates",
  "/template/",
  "/storage",
  "/credits-banners",
  "/admin",
  "/sculpt-studio",
  "/onboarding-lab",
  "/testing/",
  "/components",
  "/t/",
  "/m/",
];

function isAppPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p));
}

export default function NotFound() {
  const pathname = usePathname();

  if (isAppPath(pathname)) {
    return (
      <main
        id="main"
        data-theme="dark"
        className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ background: "#151719", color: "#f8fafc" }}
      >
        <p className="ds-accent-mono text-2xs uppercase tracking-wide">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          This page doesn’t exist
        </h1>
        <p className="max-w-md text-sm" style={{ color: "#a1a3a5" }}>
          The link may be stale — models, spaces and invitations live under
          their team. Head back to the team home and continue from there.
        </p>
        <Link
          href="/login"
          className="mt-2 rounded-control px-5 py-2 text-sm font-medium"
          style={{ background: "#1573e5", color: "#f8fafc" }}
        >
          Go to team home
        </Link>
        <p className="mt-4 text-[11px]" style={{ color: "#717375" }}>
          Educational clone — simulated app surface.
        </p>
      </main>
    );
  }

  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: "#f8f9fb", color: "#08090b" }}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.12em]" style={{ color: "rgba(8,9,11,0.55)" }}>
        404 — page not found
      </p>
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Architectural practice, without this page
      </h1>
      <p className="max-w-md text-sm" style={{ color: "rgba(8,9,11,0.62)" }}>
        The address didn’t resolve to anything on this site. Head back to the
        homepage, or check the documentation.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-pill px-5 py-2.5 text-sm font-medium"
          style={{ background: "#08090b", color: "#f8f9fb" }}
        >
          Back to home
        </Link>
        <Link
          href="/docs"
          className="rounded-pill border px-5 py-2.5 text-sm font-medium"
          style={{ borderColor: "rgba(8,9,11,0.16)", color: "#08090b" }}
        >
          Documentation
        </Link>
      </div>
    </main>
  );
}
