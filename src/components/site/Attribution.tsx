"use client";

/**
 * First-touch campaign attribution — simulated port of the synaps.app
 * harvest (site-analytics-attribution.js, DEV-825). On the real site
 * this captures the /go/{handle} or /go/{campaign}/{handle} redirect
 * labels (utm_source/utm_medium/utm_campaign) plus any ad click IDs
 * into a first-party JSON cookie (synaps_attribution, 90 days) that the
 * product later reads to credit the creator.
 *
 * Honesty (clone rule): nothing here is sent anywhere — the cookie is
 * inert first-touch data stored in the visitor's own browser, exactly
 * the same shape as the real site's so the observable behavior matches.
 * It is captured under the same consent rule (advertising granted,
 * default-on) and cleared when advertising consent is denied.
 */
import { useEffect } from "react";
import { getEffectiveConsent, CONSENT_CHANGE_EVENT } from "./CookieBanner";

const COOKIE_NAME = "synaps_attribution";
const COOKIE_MAX_AGE = 7776000; // 90 days, like the real.

const QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "gbraid",
  "wbraid",
  "dclid",
  "landing_variant",
] as const;

type Attribution = Partial<Record<(typeof QUERY_KEYS)[number] | "referrer" | "landing_path", string>>;

function readCookie(): string | null {
  if (!document.cookie) return null;
  const prefix = `${COOKIE_NAME}=`;
  for (const part of document.cookie.split("; ")) {
    if (part.startsWith(prefix)) {
      try {
        return decodeURIComponent(part.slice(prefix.length));
      } catch {
        return null;
      }
    }
  }
  return null;
}

function writeCookie(payload: Attribution) {
  const parts = [`${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(payload))}`];
  parts.push("Path=/", `Max-Age=${COOKIE_MAX_AGE}`, "SameSite=Lax");
  if (window.location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}

function clearCookie() {
  const parts = [`${COOKIE_NAME}=`, "Path=/", "Max-Age=0", "SameSite=Lax"];
  if (window.location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}

function sanitizeValue(value: string | null): string {
  return typeof value === "string" && value.length > 0 && value.length < 2048
    ? value
    : "";
}

/** Sanitize into the real's shape: non-empty strings only, referrer as
 *  origin+pathname, landing_path as pathname. */
function buildPayload(): Attribution {
  const out: Attribution = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of QUERY_KEYS) {
    const value = sanitizeValue(params.get(key));
    if (value) out[key] = value;
  }
  const referrer = sanitizeValue(document.referrer);
  if (referrer) {
    try {
      const url = new URL(referrer);
      out.referrer = url.origin + url.pathname;
    } catch {
      /* invalid referrer — omit */
    }
  }
  out.landing_path = window.location.pathname;
  return out;
}

function sync() {
  const advertising = getEffectiveConsent("advertising");
  if (advertising === "denied") {
    clearCookie();
    return;
  }
  // First touch is one coherent snapshot: only write when absent.
  if (readCookie() !== null) return;
  writeCookie(buildPayload());
}

export function Attribution() {
  useEffect(() => {
    sync();
    document.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => document.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);
  return null;
}
