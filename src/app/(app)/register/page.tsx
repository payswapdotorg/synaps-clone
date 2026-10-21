"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "@/lib/session";
import { GoogleMockDialog } from "@/components/auth/GoogleMockDialog";

/**
 * /register — the observed register entry (register chunk + AuthEntryPage).
 * The real product offers account creation through Google SSO on the same
 * split AuthEntryPage surface as the sign-in (dark auth panel + paper
 * preview panel). The clone reuses the clearly-labelled mock chooser with
 * register wording.
 */

const INK = "#101314";

export default function RegisterPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const s = loadSession();
    if (s)
      window.location.replace(
        `/t/${s.teams.find((t) => t.id === s.activeTeamId)?.id ?? s.teams[0].id}`,
      );
  }, []);

  return (
    <main id="main" className="grid min-h-screen bg-surface-base lg:grid-cols-2">
      {/* Left: registration panel (same AuthEntryPage family as sign-in) */}
      <section
        className="flex flex-col justify-center px-8 py-16 sm:px-14"
        style={{ background: INK }}
        aria-label="Create account"
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
            Create your account
          </h1>
          <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.62)" }}>
            Sign up to start drafting. Free plan, no card required.
          </p>

          <button
            type="button"
            disabled={!checked}
            onClick={() => setDialogOpen(true)}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-control bg-[#4285F4] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3574db] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h11.9c-.2 2-1.5 5-4.8 7l7.3 5.7c4.4-4.1 6.7-10.1 6.7-16.3z" />
              <path fill="#34A853" d="M24 46c6.2 0 11.4-2 15.2-5.6l-7.3-5.7c-2 1.4-4.7 2.3-7.9 2.3-6 0-11.2-4-13-9.6l-7.6 5.9C7.2 41 15 46 24 46z" />
              <path fill="#FBBC05" d="M11 27.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.6-5.9C1.9 15.5 1 19.6 1 23s.9 7.5 2.4 10.3l7.6-5.9z" />
              <path fill="#EA4335" d="M24 10.2c3.4 0 6.4 1.2 8.8 3.4l6.6-6.6C35.4 3.6 30.2 1.5 24 1.5 15 1.5 7.2 6.5 3.4 13.7l7.6 5.9c1.8-5.6 7-9.4 13-9.4z" />
            </svg>
            Continue with Google
          </button>

          <label
            className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 size-3.5 accent-[#4285F4]"
            />
            I understand this is an educational clone: sign-in is simulated locally and no Google
            integration exists. See the{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-white/70">
              Terms
            </Link>
            .
          </label>

          <p className="mt-10 text-center text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-white underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* Right: paper preview panel (original artwork on the observed paper surface) */}
      <div
        className="relative hidden lg:block"
        style={{
          background: "linear-gradient(160deg, #eef1f4 0%, #e6ebf0 45%, #eef0ec 100%)",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 p-12">
          <div className="grid h-full w-full place-items-center">
            <svg viewBox="0 0 320 240" className="w-full max-w-md" role="presentation">
              <defs>
                <pattern id="reg-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="#c9ced1" />
                </pattern>
              </defs>
              <rect width="320" height="240" fill="url(#reg-grid)" />
              <g stroke="#101314" strokeWidth="3" fill="none">
                <path d="M60 190V90h130v100" />
                <path d="M190 140h70" />
              </g>
              <path d="M60 90a50 50 0 0 1 50-50" stroke="#1a73e8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <text x="70" y="150" fontSize="10" fill="#5a6165">Living</text>
              <text x="200" y="180" fontSize="10" fill="#5a6165">4.2 m</text>
            </svg>
          </div>
        </div>
      </div>

      {dialogOpen && <GoogleMockDialog onClose={() => setDialogOpen(false)} register />}
    </main>
  );
}
