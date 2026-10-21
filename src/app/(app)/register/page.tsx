"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "@/lib/session";
import { GoogleMockDialog } from "@/components/auth/GoogleMockDialog";
import { AuthFrame } from "@/components/auth/AuthFrame";

/**
 * /register — the observed AuthEntryPage twin (live-measured
 * 2026-10-22): “Create your account” 40px/500, “Sign up to start using
 * Synaps”, single 400×34 accent Google button, terms footer. The real
 * product offers account creation through Google SSO only.
 *
 * The clone keeps a compact honesty checkbox (educational clone,
 * simulated sign-in) directly under the button.
 */

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
    <AuthFrame
      title="Create your account"
      subtitle="Sign up to start using Synaps"
      onGoogleClick={() => setDialogOpen(true)}
      googleDisabled={!checked}
    >
      <label
        className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed"
        style={{ color: "var(--content--tertiary)" }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-0.5 size-3.5"
          style={{ accentColor: "var(--accent--solid)" }}
        />
        <span>
          I understand this is an educational clone: sign-in is simulated
          locally and no Google integration exists. See the{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-content-primary"
          >
            Terms
          </Link>
          .
        </span>
      </label>

      {dialogOpen && (
        <GoogleMockDialog onClose={() => setDialogOpen(false)} register />
      )}
    </AuthFrame>
  );
}
