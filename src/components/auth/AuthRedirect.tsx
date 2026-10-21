"use client";

import { useEffect } from "react";
import { loadSession } from "@/lib/session";

/**
 * Mirrors the observed behaviour of the real product root: an authenticated
 * visitor is redirected to their team home (`/t/{teamId}`), an anonymous one
 * sees the marketing page. Runs client-side on mount; the landing page
 * stays server-rendered for everyone else.
 */
export function AuthRedirect() {
  useEffect(() => {
    const s = loadSession();
    if (s) {
      window.location.replace(`/t/${s.team.id}`);
    }
  }, []);
  return null;
}
