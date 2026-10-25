"use client";

/**
 * Partners enquiry form, transcribed from live /resources/partners/
 * .company-job-apply-form (27 Oct harvest): two-column field grid, a
 * button-triggered partner-type menu (the live site reuses its
 * pricing-credits dropdown pattern), a full-width textarea, consent
 * checkbox with inline Privacy link, and stacked full-width actions
 * ("Send enquiry" + "Email instead" mailto). The live form posts to
 * #enquiry; the clone renders a success state on submit (no backend,
 * same disclosure rule as the login mocks).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PARTNER_TYPES = [
  "Technology",
  "Materials & libraries",
  "Rollout",
  "Influencer / creator",
  "Personality / ambassador",
  "Other",
] as const;

export function PartnersForm() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<string>("");
  const [sent, setSent] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (sent) {
    return (
      <div className="ms-apply-success" role="status">
        <strong>Enquiry received.</strong>
        <p className="ms-body" style={{ margin: 0 }}>
          We reply when there is a clear fit — typically within a week.
        </p>
      </div>
    );
  }

  return (
    <form
      className="ms-apply-form"
      action="#enquiry"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="ms-apply-fields">
        <div className="ms-apply-field">
          <label htmlFor="pf-name">Full name</label>
          <input
            id="pf-name"
            name="name"
            type="text"
            className="ms-apply-input"
            autoComplete="name"
            required
          />
        </div>
        <div className="ms-apply-field">
          <label htmlFor="pf-org">Organisation (optional)</label>
          <input
            id="pf-org"
            name="organisation"
            type="text"
            className="ms-apply-input"
            autoComplete="organization"
          />
        </div>
        <div className="ms-apply-field">
          <label htmlFor="pf-email">Email</label>
          <input
            id="pf-email"
            name="email"
            type="email"
            className="ms-apply-input"
            autoComplete="email"
            required
          />
        </div>
        <div className="ms-apply-field">
          <label htmlFor="pf-site">Website (optional)</label>
          <input
            id="pf-site"
            name="website"
            type="url"
            placeholder="https://"
            className="ms-apply-input"
          />
        </div>
        <div className="ms-apply-field ms-apply-field--full">
          <div className="ms-apply-select" ref={selectRef}>
            <button
              type="button"
              className="ms-apply-select-trigger"
              aria-expanded={menuOpen}
              aria-haspopup="listbox"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span>{partnerType || "What you build or the audience you reach"}</span>
              <svg
                className="chev"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {menuOpen ? (
              <div className="ms-apply-select-menu" role="listbox" aria-label="Partner type">
                {PARTNER_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="option"
                    aria-selected={t === partnerType}
                    className="ms-apply-select-option"
                    onClick={() => {
                      setPartnerType(t);
                      setMenuOpen(false);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : null}
            <input type="hidden" name="partner_type" value={partnerType} />
          </div>
        </div>
        <div className="ms-apply-field ms-apply-field--full">
          <label htmlFor="pf-msg">What you build or the audience you reach</label>
          <textarea
            id="pf-msg"
            name="message"
            className="ms-apply-input"
            placeholder="Tell us about your product, program, or audience, the studios or people you reach, and what a partnership would unlock."
            required
          />
        </div>
        <div className="ms-apply-field ms-apply-field--full">
          <label className="ms-apply-consent">
            <input type="checkbox" name="consent" required />
            <span>
              I agree that Synaps may process my enquiry in line with the{" "}
              <Link href="/privacy" className="ms-link">
                Privacy policy
              </Link>
              .
            </span>
          </label>
        </div>
      </div>
      <div className="ms-apply-actions">
        <button type="submit" className="ms-btn">
          Send enquiry
        </button>
        <a
          className="ms-btn ms-btn--outline"
          href="mailto:support@synaps.app?subject=Synaps%20partner%20enquiry"
        >
          Email instead
        </a>
      </div>
    </form>
  );
}
