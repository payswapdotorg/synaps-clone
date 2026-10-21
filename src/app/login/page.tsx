"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleMockDialog } from "@/components/auth/GoogleMockDialog";

/**
 * Sign-in screen — reconstruction of the OBSERVED page.
 *
 * OBSERVED (live, with operator-authorized access, 2026-10-21):
 *   - split layout: dark panel with logo, “Welcome back” headline,
 *     “Sign in to continue to Synaps” sub-copy and a single blue
 *     “Continue with Google” button; right side shows a product preview.
 *
 * This clone performs NO real authentication: the button opens a clearly
 * labelled mock Google account chooser that writes a simulated session to
 * localStorage and routes to /onboarding (first visit) or the team home.
 */
export default function LoginPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      const target = url.searchParams.get("redirectTo");
      if (target && target.startsWith("/") && !target.startsWith("//")) {
        setRedirectTo(target);
      }
      // already signed in? go straight through
      const raw = window.localStorage.getItem("synaps-clone:session");
      if (raw) {
        const session = JSON.parse(raw);
        const dest = session.onboarding ? `/t/${session.team.id}` : "/onboarding";
        window.location.replace(redirectTo ?? dest);
      }
    } catch {
      /* noop */
    }
  }, [redirectTo]);

  return (
    <main id="main" className="grid min-h-screen bg-surface-base lg:grid-cols-2">
      {/* Left: sign-in panel (observed: dark, centered) */}
      <section
        className="flex flex-col justify-center px-8 py-16 sm:px-14"
        style={{ background: "var(--surface--ink, #101314)" }}
        aria-label="Sign in"
      >
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-content-inverse"
            aria-label="Synaps Clone home"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
            <span className="text-lg font-semibold tracking-tight">Synaps Clone</span>
          </Link>

          <h1 className="mt-14 text-4xl font-semibold tracking-tight text-content-inverse">
            Welcome back
          </h1>
          <p className="mt-3 text-base text-content-inverse/60">
            Sign in to continue to Synaps
          </p>

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-control bg-[#4285F4] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3574db] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-xs leading-relaxed text-content-inverse/40">
            Educational clone — sign-in is simulated in your browser. No Google
            integration, no credentials, no session server.{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-content-inverse/70">
              Terms
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-content-inverse/70">
              Privacy
            </Link>
          </p>
        </div>
      </section>

      {/* Right: product preview (observed: floor-plan editor screenshot) */}
      <section className="relative hidden overflow-hidden lg:block" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--accent--canvas--dot) 40%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <svg
          viewBox="0 0 640 520"
          className="relative h-full w-full"
          role="img"
          aria-label="Original line drawing of the console this clone reconstructs"
        >
          <g stroke="var(--accent--canvas--crosshair)" strokeWidth="2" fill="none">
            <path d="M120 120h400v280H120z" />
            <path d="M120 260h180M300 120v150M300 270h220M420 270v130" />
          </g>
          <g stroke="var(--accent--canvas--dot-fuchsia)" strokeWidth="1.6" fill="none" opacity="0.9">
            <path d="M300 240a30 30 0 0 1 30 30" strokeDasharray="3 4" />
            <path d="M510 380a60 60 0 0 1-60 60" strokeDasharray="3 4" />
          </g>
          <g stroke="var(--accent--canvas--guide)" strokeWidth="1" fill="none" opacity="0.7">
            <path d="M120 90v30M160 120h-40M520 90v30M480 120h40" />
          </g>
          <g fill="var(--accent--canvas--crosshair)" opacity="0.8">
            <circle cx="300" cy="270" r="3" />
            <circle cx="420" cy="270" r="3" />
          </g>
        </svg>
      </section>

      {dialogOpen && (
        <GoogleMockDialog
          onClose={() => setDialogOpen(false)}
          redirectTo={redirectTo}
        />
      )}
    </main>
  );
}
