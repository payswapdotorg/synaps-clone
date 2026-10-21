"use client";

import { useEffect, useState } from "react";
import { activeTeam, loadSession } from "@/lib/session";
import { GoogleMockDialog } from "@/components/auth/GoogleMockDialog";
import { AuthFrame } from "@/components/auth/AuthFrame";

/**
 * Sign-in screen — reconstruction of the OBSERVED AuthEntryPage
 * (live-measured 2026-10-22): framed dark layout, 32px logo top,
 * “Welcome back” 40px/500 with a single 400×34 accent Google button,
 * terms footer bottom, and the raised preview panel right.
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
        const dest = session.onboarding
          ? `/t/${activeTeam(session).id}`
          : "/onboarding";
        window.location.replace(redirectTo ?? dest);
      }
    } catch {
      /* noop */
    }
  }, [redirectTo]);

  return (
    <AuthFrame
      title="Welcome back"
      subtitle="Sign in to continue to Synaps"
      onGoogleClick={() => setDialogOpen(true)}
    >
      {dialogOpen && (
        <GoogleMockDialog
          onClose={() => setDialogOpen(false)}
          redirectTo={redirectTo}
        />
      )}
    </AuthFrame>
  );
}
