"use client";

/**
 * Cookie consent bar — behavior transcribed from the synaps.app harvest
 * (site-analytics-consent.js + the static #consent-bar markup):
 *
 * - Two independent categories, each its own cookie: analytics
 *   (synaps_analytics_consent + synaps_analytics_consent_record) and
 *   advertising (synaps_advertising_consent), 1 year, SameSite=Lax.
 * - Two-stage prompt: a first visit gets the FULL prompt; a visitor who
 *   already answered analytics (e.g. under the older notice) is asked
 *   only the advertising follow-up.
 * - Manage opens the three-row selection panel (Necessary locked),
 *   hides itself and reveals Reject all + Accept. Toggling advertising
 *   on also switches analytics on; switching analytics off switches
 *   advertising off (same coupling rule as the product).
 * - Accept all explicitly grants both; a fresh analytics grant (previous
 *   effective answer was denied) reloads so deferred scripts would boot
 *   clean — mirrored verbatim, harmless here.
 * - The footer's "Cookie settings" link reopens the bar with the panel.
 *
 * Honesty (clone rule): no real trackers exist here — the cookies only
 * record the visitor's own choice in this browser, and the panel says
 * so in a muted note.
 */
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ANALYTICS_COOKIE = "synaps_analytics_consent";
const ANALYTICS_RECORD_COOKIE = "synaps_analytics_consent_record";
const ADVERTISING_COOKIE = "synaps_advertising_consent";
const ANALYTICS_NOTICE_VERSION = 1;
const ADVERTISING_NOTICE_VERSION = 2;
const COOKIE_MAX_AGE = 31536000;
const RECORD_PATTERN = /^v(\d+):(granted|denied)$/;

const FULL_PROMPT =
  "We use optional analytics cookies from Google and PostHog, and advertising cookies from Google and Meta. ";
const SHORT_PROMPT =
  "We’d also like to use advertising cookies, shared with Google and Meta. ";

type Answer = "granted" | "denied";

function writeCookie(name: string, value: string) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push("Path=/", `Max-Age=${COOKIE_MAX_AGE}`, "SameSite=Lax");
  if (window.location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}

function readCookie(name: string): string | null {
  if (!document.cookie) return null;
  const prefix = `${name}=`;
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

function hasGlobalPrivacyControl(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true;
}

function getStored(kind: "analytics" | "advertising"): Answer | null {
  if (kind === "analytics") {
    const raw = readCookie(ANALYTICS_COOKIE);
    if (raw === "granted" || raw === "denied") return raw;
    return null;
  }
  const raw = readCookie(ADVERTISING_COOKIE);
  const match = RECORD_PATTERN.exec(raw || "");
  return match ? (match[2] as Answer) : null;
}

/** Effective answer: stored choice, else the global default. */
function getEffective(kind: "analytics" | "advertising"): Answer {
  if (kind === "analytics") {
    return getStored("analytics") ?? (hasGlobalPrivacyControl() ? "denied" : "granted");
  }
  // Advertising cannot remain granted after an analytics refusal.
  if (getEffective("analytics") === "denied") return "denied";
  return getStored("advertising") ?? (hasGlobalPrivacyControl() ? "denied" : "granted");
}

const CONSENT_CHANGE_EVENT = "synaps-clone:consent-change";

/** Notify the attribution layer (mirrors the real's sync hooks). */
function notifyConsentChange() {
  document.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT));
}

export { getEffective as getEffectiveConsent, CONSENT_CHANGE_EVENT };

const CATEGORIES = [
  {
    id: "necessary",
    title: "Necessary",
    desc: "Required for the site to work. Always on.",
    locked: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    desc: "Helps us understand and improve Synaps.",
    locked: false,
  },
  {
    id: "advertising",
    title: "Advertising",
    desc: "Lets us measure our ads and show them to the right people.",
    locked: false,
  },
] as const;

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [managing, setManaging] = useState(false);
  const [shortPrompt, setShortPrompt] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [advertisingOn, setAdvertisingOn] = useState(false);

  useEffect(() => {
    // The real bar opens when either stored answer is missing.
    if (getStored("analytics") === null || getStored("advertising") === null) {
      setShortPrompt(getStored("analytics") !== null);
      setAnalyticsOn(getStored("analytics") === "granted");
      setAdvertisingOn(getStored("advertising") === "granted");
      setOpen(true);
    }
  }, []);

  /** settle(): null leaves a category as it stands. */
  const settle = useCallback(
    (nextAnalytics: Answer | null, nextAdvertising: Answer | null) => {
      let reload = false;
      const analyticsRunning = getEffective("analytics") === "granted";
      if (nextAnalytics !== null && nextAnalytics !== getStored("analytics")) {
        writeCookie(ANALYTICS_COOKIE, nextAnalytics);
        writeCookie(
          ANALYTICS_RECORD_COOKIE,
          `v${ANALYTICS_NOTICE_VERSION}:${nextAnalytics}`,
        );
        if (nextAnalytics === "granted" && !analyticsRunning) reload = true;
      }
      if (nextAdvertising !== null && nextAdvertising !== getStored("advertising")) {
        writeCookie(
          ADVERTISING_COOKIE,
          `v${ADVERTISING_NOTICE_VERSION}:${nextAdvertising}`,
        );
      }
      // Mirror the effective analytics answer into the simulated session
      // store when one exists — the real shares the answer with the
      // product through the .synaps.app cookie domain; the clone's
      // app settings toggle reads this (see (app)/settings).
      try {
        const raw = localStorage.getItem("synaps-clone:session");
        if (raw) {
          const session = JSON.parse(raw);
          if (session?.user?.consents) {
            session.user.consents.analytics =
              (nextAnalytics ?? getEffective("analytics")) === "granted";
            localStorage.setItem("synaps-clone:session", JSON.stringify(session));
          }
        }
      } catch {
        /* no session / storage unavailable */
      }
      notifyConsentChange();
      setOpen(false);
      setManaging(false);
      if (reload) window.location.reload();
    },
    [],
  );

  /** Footer "Cookie settings": reopen with the panel (event delegation,
   *  same as the real — the footer link is server-rendered). */
  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("#consent-settings");
      if (!link) return;
      event.preventDefault();
      setShortPrompt(getStored("analytics") !== null);
      setAnalyticsOn(
        getStored("analytics") === "granted" || getStored("advertising") === "granted",
      );
      setAdvertisingOn(getStored("advertising") === "granted");
      setOpen(true);
      setManaging(true);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  if (!open) return null;

  const toggle = (id: "analytics" | "advertising") => {
    if (id === "analytics") {
      const next = !analyticsOn;
      setAnalyticsOn(next);
      // Same visible selection rule as the product: no ads without analytics.
      if (!next) setAdvertisingOn(false);
    } else {
      const next = !advertisingOn;
      setAdvertisingOn(next);
      if (next) setAnalyticsOn(true);
    }
  };

  return (
    <div
      id="consent-bar"
      className="consent-bar"
      role="region"
      aria-label="Cookie consent"
    >
      <p className="consent-bar-text" id="consent-text">
        {shortPrompt ? SHORT_PROMPT : FULL_PROMPT}
        <Link href="/cookies">Cookie policy</Link>
      </p>

      {managing ? (
        <div className="consent-bar-panel" id="consent-panel">
          {CATEGORIES.map((cat) => {
            const checked = cat.locked
              ? true
              : cat.id === "analytics"
                ? analyticsOn
                : advertisingOn;
            return (
              <div key={cat.id} className="consent-row">
                <div className="consent-row-copy">
                  <p className="consent-row-title" id={`consent-${cat.id}-title`}>
                    {cat.title}
                  </p>
                  <p className="consent-row-desc">{cat.desc}</p>
                </div>
                <button
                  type="button"
                  className="consent-toggle"
                  role="switch"
                  aria-checked={checked}
                  aria-labelledby={`consent-${cat.id}-title`}
                  disabled={cat.locked}
                  data-consent-category={cat.id}
                  onClick={() => toggle(cat.id as "analytics" | "advertising")}
                >
                  <span className="consent-toggle-thumb" aria-hidden="true" />
                </button>
              </div>
            );
          })}
          <p className="consent-bar-note">
            Clone note: your choice is stored in this browser only — no real
            trackers load on this site.
          </p>
        </div>
      ) : null}

      <div className="consent-bar-actions">
        <button
          type="button"
          className="ms-btn ms-btn--outline ms-btn--sm"
          id="consent-manage"
          hidden={managing}
          onClick={() => {
            setAnalyticsOn(
              getStored("analytics") === "granted" ||
                getStored("advertising") === "granted",
            );
            setAdvertisingOn(getStored("advertising") === "granted");
            setManaging(true);
          }}
        >
          Manage
        </button>
        <button
          type="button"
          className="ms-btn ms-btn--outline ms-btn--sm"
          id="consent-reject"
          hidden={!managing}
          onClick={() => settle("denied", "denied")}
        >
          Reject all
        </button>
        <button
          type="button"
          className="ms-btn ms-btn--outline ms-btn--sm"
          id="consent-accept"
          hidden={!managing}
          onClick={() =>
            settle(analyticsOn ? "granted" : "denied", advertisingOn ? "granted" : "denied")
          }
        >
          Accept
        </button>
        <button
          type="button"
          className="ms-btn ms-btn--sm"
          id="consent-accept-all"
          onClick={() => settle("granted", "granted")}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
