import Link from "next/link";
import type { Metadata } from "next";
import { Notice } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Reconstruction of the observed registration entry point of beta.synaps.app. This clone does not create accounts.",
};

/**
 * Registration entry point — a reconstruction of the OBSERVED public page.
 *
 * OBSERVED: /register returned 200 as a public entry point, and the public
 * bundle contains `signInWithOAuth` plus the register error strings:
 *   - “Let’s set up your account.”
 *   - “Unexpected error in register”
 *   - “You must provide either an email or phone number and a password”
 *   - “You must provide either an email or phone number and a type”
 *   - “You must provide either an email or phone number.”
 *
 * NOT OBSERVED: the rendered form. The live register page was observed only as
 * a 200 response; its actual fields were never retrieved, so the field set
 * below is a reconstruction. The Google OAuth affordance is inert — this clone
 * contacts no identity provider and creates no account.
 */
export default function RegisterPage() {
  return (
    <main id="main" className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-container border border-border-solid/10 bg-surface-base p-8">
          <p className="eyebrow-index text-center">Synaps Clone</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-content-primary">
            Let’s set up your account.
          </h1>

          <div className="mt-7 space-y-3">
            <label className="block">
              <span className="eyebrow-index mb-1 block">Email</span>
              <input
                type="email"
                placeholder="demo@example.invalid"
                readOnly
                className="w-full rounded-control border border-border-solid/15 bg-background px-3 py-2 text-sm text-content-secondary"
              />
            </label>
            <label className="block">
              <span className="eyebrow-index mb-1 block">Password</span>
              <input
                type="password"
                placeholder="Demo only"
                readOnly
                className="w-full rounded-control border border-border-solid/15 bg-background px-3 py-2 text-sm text-content-secondary"
              />
            </label>
          </div>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="btn-secondary mt-5 w-full cursor-not-allowed opacity-60"
          >
            Create account
          </button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border-solid/10" />
            <span className="eyebrow-index">or</span>
            <span className="h-px flex-1 bg-border-solid/10" />
          </div>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="btn-secondary w-full cursor-not-allowed opacity-60"
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
            Reconstruction of an observed entry point. The form is inert — no account
            is created and no credential is handled.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Notice>
            <strong className="font-medium text-content-primary">
              Observed route, reconstructed form.
            </strong>{" "}
            The route and the heading come from the live page and the public bundle.
            The field set was never retrieved, so it is written for this clone.
          </Notice>

          <p className="text-center text-sm text-content-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-accent-text underline underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
