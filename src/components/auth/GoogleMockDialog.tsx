"use client";

import { useState } from "react";
import { createSession } from "@/lib/session";

/**
 * Mock Google account chooser.
 *
 * The real product forwards to accounts.google.com (Supabase GoTrue OAuth).
 * This clone cannot and does not: the dialog is a clearly labelled local
 * simulation. “Signing in” writes a simulated session to localStorage and
 * routes into the clone (onboarding on first sign-in, team home after).
 */
export function GoogleMockDialog({
  onClose,
  redirectTo,
}: {
  onClose: () => void;
  redirectTo?: string | null;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function signIn(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address (any address — it stays local).");
      return;
    }
    setError(null);
    setBusy(true);
    const displayName = name.trim() || trimmed.split("@")[0].replace(/[._-]+/g, " ");
    const session = createSession(trimmed, displayName);
    const dest = redirectTo ?? (session.onboarding ? `/t/${session.team.id}` : "/onboarding");
    window.setTimeout(() => {
      window.location.href = dest;
    }, 500);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Simulated Google sign-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm overflow-hidden rounded-container border border-border-solid/20 bg-surface-base shadow-2xl">
        <div className="px-8 pt-8 text-center">
          <svg width="40" height="40" viewBox="0 0 18 18" aria-hidden="true" className="mx-auto">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
          </svg>
          <h2 className="mt-4 text-lg font-normal text-content-primary">Sign in with Google</h2>
          <p className="mt-1 text-sm text-content-secondary">to continue to Synaps Clone</p>
        </div>

        <form onSubmit={signIn} className="mt-6 space-y-3 border-t border-border-solid/10 px-8 py-6">
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoFocus
              className="w-full rounded-control border border-border-solid/30 bg-background px-4 py-3 text-sm text-content-primary focus:border-border-solid focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="sr-only">Name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              className="w-full rounded-control border border-border-solid/30 bg-background px-4 py-3 text-sm text-content-primary focus:border-border-solid focus:outline-none"
            />
          </label>
          {error && <p className="text-xs text-accent-crimson">{error}</p>}

          <div className="rounded-control bg-background p-3 text-[11px] leading-relaxed text-content-secondary">
            <strong>Simulation notice.</strong> This is not a real Google page.
            The original product uses Google SSO; this educational clone stores
            a simulated session in your browser only.
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-control px-4 py-2 text-sm text-content-secondary hover:bg-surface-raised"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-control bg-[#1a73e8] px-6 py-2 text-sm font-medium text-white hover:bg-[#1765cc] disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
