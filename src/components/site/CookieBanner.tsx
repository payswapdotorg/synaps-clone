"use client";

/**
 * Cookie consent banner — IA and copy transcribed from the synaps.app
 * harvest: bottom-left card, "We use optional analytics cookies from
 * Google and PostHog, and advertising cookies from Google and Meta." +
 * Cookie policy link; actions Manage / Reject all / Accept / Accept all,
 * with Manage revealing the three consent rows (Necessary always on,
 * Analytics, Advertising). The clone runs no real analytics: the choice
 * is stored locally and mirrored into the simulated session consent
 * store, and the manage panel says so — per the project's
 * simulated-feature labelling rule.
 */
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "synaps-clone:cookie-consent";

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
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      /* storage unavailable — stay hidden */
    }
  }, []);

  if (!open) return null;

  const decide = (analyticsOn: boolean, advertisingOn = false) => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          analytics: analyticsOn,
          advertising: advertisingOn,
          decidedAt: new Date().toISOString(),
        }),
      );
      // Mirror into the simulated session consent store when present.
      const raw = localStorage.getItem("synaps-clone:session");
      if (raw) {
        const session = JSON.parse(raw);
        if (session?.user?.consents)
          session.user.consents.analytics = analyticsOn;
        localStorage.setItem("synaps-clone:session", JSON.stringify(session));
      }
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <aside
      className="ms-cookie"
      role="dialog"
      aria-label="Cookie consent (simulated)"
    >
      <p className="ms-cookie-text">
        We use optional analytics cookies from Google and PostHog, and
        advertising cookies from Google and Meta.{" "}
        <Link href="/cookies" className="underline">
          Cookie policy
        </Link>
      </p>

      {managing ? (
        <div className="ms-cookie-panel">
          {CATEGORIES.map((cat) => {
            const checked = cat.locked
              ? true
              : cat.id === "analytics"
                ? analytics
                : advertising;
            return (
              <div key={cat.id} className="ms-cookie-row">
                <div>
                  <p className="ms-cookie-row-title">{cat.title}</p>
                  <p className="ms-cookie-row-desc">{cat.desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  aria-label={cat.title}
                  disabled={cat.locked}
                  className={`ms-cookie-switch${checked ? " is-on" : ""}`}
                  onClick={() => {
                    if (cat.id === "analytics") setAnalytics((v) => !v);
                    if (cat.id === "advertising") setAdvertising((v) => !v);
                  }}
                >
                  <span className="ms-cookie-thumb" aria-hidden="true" />
                </button>
              </div>
            );
          })}
          <p className="ms-cookie-note">
            Clone note: stored locally only — no real cookies are set.
          </p>
        </div>
      ) : null}

      <div className="ms-cookie-actions">
        <button
          className="ms-btn ms-btn--outline ms-btn--sm"
          onClick={() => setManaging((v) => !v)}
        >
          Manage
        </button>
        {managing ? (
          <button
            className="ms-btn ms-btn--outline ms-btn--sm"
            onClick={() => decide(false)}
          >
            Reject all
          </button>
        ) : null}
        {managing ? (
          <button
            className="ms-btn ms-btn--outline ms-btn--sm"
            onClick={() => decide(analytics, advertising)}
          >
            Accept
          </button>
        ) : null}
        <button
          className="ms-btn ms-btn--sm"
          onClick={() => decide(true, true)}
        >
          Accept all
        </button>
      </div>
    </aside>
  );
}
