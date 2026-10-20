import Link from "next/link";
import type { Metadata } from "next";
import { Notice } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Welcome back",
  description:
    "Reconstruction of the observed sign-in screen of beta.synaps.app. This clone does not authenticate anyone.",
};

/**
 * Sign-in screen — a reconstruction of the OBSERVED public page.
 *
 * OBSERVED (live, unauthenticated, per ANALYSIS.md):
 *   - the page renders at /login
 *   - headline “Welcome back”
 *   - sub-copy “Sign in to continue to Synaps”
 *   - exactly one sign-in affordance, “Continue with Google”
 *   - the original footer linked out to www.synaps.app/terms/ and
 *     synaps.app/privacy/
 *
 * NOT OBSERVED: everything behind the sign-in. The button here is inert — the
 * clone contacts no identity provider, holds no credentials and creates no
 * session. The original's external legal links are intentionally NOT mirrored:
 * this clone points at its own /terms and /privacy instead, so the legal text
 * a reader sees describes this clone rather than someone else's product.
 */
export default function LoginPage() {
  return (
    <main id="main" className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-container border border-border-solid/10 bg-surface-base p-8">
          <p className="eyebrow-index text-center">Synaps Clone</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-content-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-sm text-content-secondary">
            Sign in to continue to Synaps
          </p>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="btn-secondary mt-7 w-full cursor-not-allowed opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
              <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M6 9h6M9 6v6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-4 text-center text-2xs leading-relaxed text-content-muted">
            Reconstruction of an observed screen. The button is inert — this clone does
            not authenticate, and it handles no credentials.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Notice>
            <strong className="font-medium text-content-primary">
              Observed page, reconstructed.
            </strong>{" "}
            The copy and the single Google affordance come from the live page; nothing
            behind it was ever reached, so no behaviour is reproduced.
          </Notice>

          <p className="text-center text-sm text-content-secondary">
            No account?{" "}
            <Link href="/register" className="text-accent-text underline underline-offset-4">
              Create one
            </Link>
          </p>

          <p className="text-center text-sm text-content-secondary">
            <Link href="/project" className="text-accent-text underline underline-offset-4">
              Explore the reconstructed workspace
            </Link>
          </p>

          <p className="text-center text-2xs text-content-muted">
            <Link href="/terms" className="underline underline-offset-4">
              Terms
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
