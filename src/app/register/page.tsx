"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "@/lib/session";
import { GoogleMockDialog } from "@/components/auth/GoogleMockDialog";

/**
 * /register — the observed register entry (register chunk + AuthEntryPage).
 * The real product offers account creation through Google SSO; the clone
 * reuses the clearly-labelled mock chooser with register wording.
 */
export default function RegisterPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const s = loadSession();
    if (s) window.location.replace(`/t/${s.teams.find((t) => t.id === s.activeTeamId)?.id ?? s.teams[0].id}`);
  }, []);

  return (
    <main className="grid min-h-screen bg-surface-base lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 py-16 sm:px-14">
        <Link href="/" className="inline-flex items-center gap-2 text-content-inverse" style={{ color: "var(--surface--ink, #101314)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          </svg>
          <span className="text-lg font-semibold tracking-tight">Synaps Clone home</span>
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="mt-10 text-2xl font-semibold tracking-tight" style={{ color: "var(--surface--ink, #101314)" }}>
            Create your account
          </h1>
          <p className="mt-2 text-base text-content-inverse/60" style={{ color: "var(--surface--ink, #101314)", opacity: 0.6 }}>
            Sign up to start drafting. Free plan, no card required.
          </p>

          <button
            type="button"
            disabled={!checked}
            onClick={() => setDialogOpen(true)}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-control border border-border-solid/20 bg-surface-base px-4 py-2.5 text-sm font-medium text-content-primary transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h11.9c-.2 2-1.5 5-4.8 7l7.3 5.7c4.4-4.1 6.7-10.1 6.7-16.3z" />
              <path fill="#34A853" d="M24 46c6.2 0 11.4-2 15.2-5.6l-7.3-5.7c-2 1.4-4.7 2.3-7.9 2.3-6 0-11.2-4-13-9.6l-7.6 5.9C7.2 41 15 46 24 46z" />
              <path fill="#FBBC05" d="M11 27.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.6-5.9C1.9 15.5 1 19.6 1 23s.9 7.5 2.4 10.3l7.6-5.9z" />
              <path fill="#EA4335" d="M24 10.2c3.4 0 6.4 1.2 8.8 3.4l6.6-6.6C35.4 3.6 30.2 1.5 24 1.5 15 1.5 7.2 6.5 3.4 13.7l7.6 5.9c1.8-5.6 7-9.4 13-9.4z" />
            </svg>
            Continue with Google
          </button>

          <label className="mt-4 flex items-start gap-2 text-2xs leading-relaxed text-content-muted">
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-0.5 size-3.5" />
            I understand this is an educational clone: sign-in is simulated locally and no Google
            integration exists. See the{" "}
            <Link href="/terms" className="underline underline-offset-2">Terms</Link>.
          </label>

          <p className="mt-6 text-center text-sm text-content-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-medium underline underline-offset-2">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block" style={{ background: "var(--surface--canvas, #EBEDEF)" }} aria-hidden>
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
