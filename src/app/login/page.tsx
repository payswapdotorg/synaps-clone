"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, loadSession } from "@/lib/session";
import { GoogleMockDialog } from "@/components/auth/GoogleMockDialog";

/**
 * Sign-in screen — reconstruction of the OBSERVED page.
 *
 * OBSERVED (live, with operator-authorized access, 2026-10-21):
 *   - split layout: dark panel with logo, “Welcome back” headline,
 *     “Sign in to continue to Synaps” sub-copy and a single blue
 *     “Continue with Google” button; right side shows a product
 *     preview — a project window with a Layers/Assets sidebar and a
 *     furnished floor plan on a soft gradient.
 *
 * This clone performs NO real authentication: the button opens a clearly
 * labelled mock Google account chooser that writes a simulated session to
 * localStorage and routes to /onboarding (first visit) or the team home.
 */

const INK = "#101314";

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
        const dest = session.onboarding ? `/t/${activeTeam(session).id}` : "/onboarding";
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
        style={{ background: INK }}
        aria-label="Sign in"
      >
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-white"
            aria-label="Synaps Clone home"
          >
            <svg width="24" height="26" viewBox="0 0 20 22" fill="none" aria-hidden="true">
              <path
                d="M15.5 2.5C10 2.5 4.5 4 4.5 8c0 3.4 4.2 3.9 7.5 4.6 3.1.7 6.5 1.5 6.5 4.6 0 3.6-5.1 5.3-11 4.9"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-semibold tracking-tight">Synaps Clone</span>
          </Link>

          <h1 className="mt-16 text-4xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.62)" }}>
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

          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.44)" }}
          >
            Educational clone — sign-in is simulated in your browser. No Google
            integration, no credentials, no session server.{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-white/70"
            >
              Terms
            </Link>{" "}
            ·{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-white/70"
            >
              Privacy
            </Link>
          </p>
        </div>
      </section>

      {/* Right: product preview — an original recreation of the observed
          project-window motif: Layers/Assets sidebar, page bar, and a
          furnished plan on a soft gradient. */}
      <section
        className="relative hidden overflow-hidden lg:block"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(160deg, #eef1f4 0%, #e6ebf0 45%, #eef0ec 100%)",
        }}
      >
        {/* window card */}
        <div
          className="absolute left-[7%] top-[9%] w-[86%] overflow-hidden rounded-xl"
          style={{
            bottom: "9%",
            background: "#fff",
            border: "1px solid rgba(8,9,11,0.10)",
            boxShadow:
              "0 30px 70px rgba(16,19,20,0.16), 0 4px 14px rgba(16,19,20,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* title bar */}
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5"
            style={{ borderColor: "rgba(8,9,11,0.08)" }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#d7dbe0",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#d7dbe0",
              }}
            />
            <span
              style={{
                marginLeft: 8,
                fontSize: 12.5,
                color: "rgba(8,9,11,0.55)",
              }}
            >
              Acme Project — Synaps
            </span>
          </div>

          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            {/* sidebar */}
            <div
              className="hidden w-44 flex-col border-r px-3 py-3 sm:flex"
              style={{ borderColor: "rgba(8,9,11,0.08)" }}
            >
              {[
                ["Layers", true],
                ["Assets", false],
                ["Pages", false],
              ].map(([label, active]) => (
                <div
                  key={label as string}
                  className="mb-1 rounded-md px-3 py-2"
                  style={{
                    fontSize: 13,
                    fontWeight: active ? 560 : 460,
                    color: active ? "#101314" : "rgba(8,9,11,0.55)",
                    background: active ? "rgba(8,9,11,0.05)" : "transparent",
                  }}
                >
                  {label as string}
                </div>
              ))}
              {["Walls", "Doors", "Windows", "Rooms", "Furniture"].map(
                (layer) => (
                  <div
                    key={layer}
                    className="flex items-center gap-2 px-3 py-1.5"
                    style={{ fontSize: 12, color: "rgba(8,9,11,0.5)" }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 2,
                        border: "1.4px solid rgba(8,9,11,0.35)",
                        background: layer === "Furniture" ? "transparent" : "rgba(16,96,192,0.5)",
                      }}
                    />
                    {layer}
                  </div>
                ),
              )}
            </div>

            {/* canvas */}
            <div
              className="relative flex-1"
              style={{
                background: "#EBEDEF",
                backgroundImage:
                  "radial-gradient(rgba(8,9,11,0.13) 1px, transparent 1.2px)",
                backgroundSize: "22px 22px",
              }}
            >
              <svg
                viewBox="0 0 560 430"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                {/* walls */}
                <g stroke="#2b2e33" strokeWidth="7" fill="none" strokeLinejoin="round">
                  <path d="M90 70h380v290H90z" />
                </g>
                <g stroke="#2b2e33" strokeWidth="5" fill="none">
                  <path d="M270 70v150M90 220h180M360 220v140M270 220h90" />
                </g>
                {/* door swings */}
                <g stroke="rgba(43,46,51,0.5)" strokeWidth="1.6" fill="none">
                  <path d="M270 120a50 50 0 0 1 50 50" />
                  <path d="M200 220a44 44 0 0 1 44-44" />
                </g>
                {/* furniture */}
                <g stroke="rgba(43,46,51,0.75)" strokeWidth="1.8" fill="none">
                  {/* sofa */}
                  <rect x="112" y="92" width="92" height="34" rx="6" />
                  <path d="M112 109h92M130 92v34" />
                  {/* coffee table */}
              <rect x="136" y="146" width="44" height="24" rx="3" />
                  {/* bed */}
                  <rect x="112" y="252" width="76" height="86" rx="4" />
                  <path d="M112 274h76M150 252v22" />
                  {/* dining set */}
                  <rect x="390" y="100" width="58" height="96" rx="3" />
                  <circle cx="392" cy="112" r="8" />
                  <circle cx="392" cy="148" r="8" />
                  <circle cx="392" cy="184" r="8" />
                  {/* kitchen counter */}
                  <path d="M300 92h150M300 92v26h150" />
                  <circle cx="330" cy="105" r="5" />
                  <circle cx="370" cy="105" r="5" />
                </g>
                {/* room label */}
                <g>
                  <rect
                    x="118"
                    y="188"
                    width="86"
                    height="20"
                    rx="4"
                    fill="rgba(16,96,192,0.10)"
                  />
                  <text
                    x="161"
                    y="201.5"
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="#1060c0"
                    fontFamily="ui-monospace, monospace"
                  >
                    18.4 m²
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* page bar */}
          <div
            className="flex items-center gap-2 border-t px-4 py-2"
            style={{ borderColor: "rgba(8,9,11,0.08)" }}
          >
            <span
              className="rounded px-2.5 py-1"
              style={{
                fontSize: 11.5,
                background: "rgba(8,9,11,0.06)",
                color: "rgba(8,9,11,0.7)",
              }}
            >
              Ground floor
            </span>
            <span
              className="rounded px-2.5 py-1"
              style={{
                fontSize: 11.5,
                color: "rgba(8,9,11,0.45)",
                border: "1px dashed rgba(8,9,11,0.2)",
              }}
            >
              + Page
            </span>
          </div>
        </div>
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
