"use client";

/**
 * Pricing cards with the monthly/annual toggle transcribed from the
 * harvest: Freemium €0 · Pro €59 (€49 annual) · Studio €119 (€99
 * annual), "Save 17%", Pro marked "Recommended". Clicking a plan CTA
 * routes to the register screen — no real payment happens anywhere in
 * the clone.
 */
import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    name: "Freemium",
    monthly: 0,
    annual: 0,
    unit: "",
    audience: "For individuals and students.",
    features: [
      "300 signup credits + 30 / day",
      "Up to 3 models and 3 pages",
      "Up to 3 editors",
      "Limited libraries",
    ],
    cta: "Try for free",
    href: "/register",
    recommended: false,
  },
  {
    name: "Pro",
    monthly: 59,
    annual: 49,
    unit: "per editor / month",
    audience: "For draftsmen, freelancers and small teams.",
    features: [
      "4,500 credits / month, rolls over",
      "Unlimited models, pages and libraries",
      "Up to 10 editors",
      "DXF, high-quality and watermark-free export",
      "Hot servers",
    ],
    cta: "Get started",
    href: "/register",
    recommended: true,
  },
  {
    name: "Studio",
    monthly: 119,
    annual: 99,
    unit: "per editor / month",
    audience: "For managers and mid-sized studios.",
    features: [
      "Unlimited credits",
      "Up to 50 editors",
      "Personal support",
      "Opt out of data training",
    ],
    cta: "Get started",
    href: "/register",
    recommended: false,
  },
];

export function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="ms-stack-32">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <div
          className="flex items-center gap-1 rounded-full border p-1"
          style={{ borderColor: "var(--ms-border-visible)", background: "#fff" }}
          role="group"
          aria-label="Billing period"
        >
          {(["Monthly", "Annual"] as const).map((label) => {
            const active = (label === "Annual") === annual;
            return (
              <button
                key={label}
                onClick={() => setAnnual(label === "Annual")}
                aria-pressed={active}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-[14px]"
                style={{
                  background: active ? "var(--ms-ink)" : "transparent",
                  color: active ? "#fff" : "var(--ms-ink-soft)",
                  border: 0,
                  cursor: "pointer",
                  fontWeight: active ? 550 : 450,
                  transition: "all .3s var(--ms-ease)",
                }}
              >
                {label}
                {label === "Annual" ? (
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: active
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(16,96,192,0.1)",
                      color: active ? "#fff" : "var(--ms-draft)",
                    }}
                  >
                    Save 17%
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="ms-grid-3" style={{ alignItems: "stretch" }}>
        {PLANS.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          return (
            <article
              key={plan.name}
              className="ms-card ms-card--hover"
              style={{
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                position: "relative",
                borderColor: plan.recommended
                  ? "var(--ms-ink)"
                  : "var(--ms-border)",
                borderWidth: plan.recommended ? 1.5 : 1,
                boxShadow: plan.recommended
                  ? "0 24px 56px rgba(8,9,11,0.10)"
                  : undefined,
              }}
            >
              {plan.recommended ? (
                <span
                  className="ms-label"
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 24,
                    background: "var(--ms-ink)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: 999,
                  }}
                >
                  Recommended
                </span>
              ) : null}

              <h3 className="ms-h3">{plan.name}</h3>

              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span
                  style={{
                    fontSize: 54,
                    fontWeight: 540,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  €{price}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--ms-muted)",
                    maxWidth: "12ch",
                    lineHeight: 1.35,
                  }}
                >
                  {price === 0
                    ? ""
                    : plan.unit + (annual ? ", billed annually" : ", billed monthly")}
                </span>
              </div>

              <p className="ms-body" style={{ margin: 0 }}>
                {plan.audience}
              </p>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      borderTop: "1px solid var(--ms-hairline)",
                      padding: "11px 2px",
                      fontSize: 14.5,
                      color: "var(--ms-ink-soft)",
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{ color: "var(--ms-draft)", fontWeight: 600 }}
                      aria-hidden
                    >
                      ·
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={
                  plan.recommended ? "ms-btn" : "ms-btn ms-btn--outline"
                }
                style={{ width: "100%" }}
              >
                {plan.cta}
              </Link>
            </article>
          );
        })}
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 13.5,
          color: "var(--ms-muted)",
          margin: 0,
        }}
      >
        More than 50 editors?{" "}
        <Link href="/resources/partners" className="underline">
          Get in touch.
        </Link>{" "}
        Trusted by 80,000 architects worldwide.
      </p>
    </div>
  );
}
