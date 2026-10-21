"use client";

/**
 * Cookie consent banner — transcribed IA from the synaps.app harvest
 * (bottom-left card, Manage / Accept all, link to the cookie policy).
 * The clone runs no real analytics: the choice is stored locally and
 * mirrored into the simulated session consent store, and the banner
 * says so — per the project's simulated-feature labelling rule.
 */
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "synaps-clone:cookie-consent";

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      /* storage unavailable — stay hidden */
    }
  }, []);

  if (!open) return null;

  const decide = (analytics: boolean) => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ analytics, decidedAt: new Date().toISOString() }),
      );
      // Mirror into the simulated session consent store when present.
      const raw = localStorage.getItem("synaps-clone:session");
      if (raw) {
        const session = JSON.parse(raw);
        if (session?.user?.consents)
          session.user.consents.analytics = analytics;
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
      <p style={{ margin: 0 }}>
        This is a study clone, so no real analytics or advertising cookies are
        set. The choice below is stored locally only, mirroring the consent
        flow observed on the analysed site.{" "}
        <Link href="/cookies" className="underline">
          Cookie policy
        </Link>
        .
      </p>
      <div className="mt-3.5 flex gap-2.5">
        <button
          className="ms-btn ms-btn--outline ms-btn--sm"
          onClick={() => decide(false)}
        >
          Manage
        </button>
        <button className="ms-btn ms-btn--sm" onClick={() => decide(true)}>
          Accept all
        </button>
      </div>
    </aside>
  );
}
