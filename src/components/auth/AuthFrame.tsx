"use client";

/**
 * AuthFrame — the observed AuthEntryPage layout (live-measured
 * 2026-10-22 against beta.synaps.app/login + /register):
 *
 *   - full-viewport dark surface (#151719) with a 64px frame at ≥lg
 *     (24px below); the content never touches the viewport edge.
 *   - two flex-1 columns separated by a 50px gap (min content width
 *     960px at ≥lg; the preview column hides below lg).
 *   - LEFT: justify-between, py-40px — 32px logo at top, form block
 *     (max-w-400px: h1 40px/500, sub, 400×34 accent button) in the
 *     middle, 12px terms footer at the bottom.
 *   - RIGHT: raised surface (#242628) with a 0.5px border holding a
 *     full-bleed cover preview (saturate 0.94 / contrast 1.03).
 *
 * The preview artwork is original (a Synaps-style project window with
 * Layers sidebar and a furnished plan on drafting paper) — the real
 * page ships a product screenshot, which an honest clone redraws.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { SiteMark } from "@/components/site/chrome";

export function AuthFrame({
  title,
  subtitle,
  onGoogleClick,
  googleLabel = "Continue with Google",
  googleDisabled = false,
  children,
}: {
  title: string;
  subtitle: string;
  onGoogleClick: () => void;
  googleLabel?: string;
  googleDisabled?: boolean;
  children?: ReactNode;
}) {
  return (
    <main
      id="main"
      className="flex min-h-dvh w-full bg-surface-base p-6 lg:p-16"
    >
      <div className="flex w-full items-stretch lg:min-w-[960px] lg:gap-[50px]">
        {/* ------------------------------------------------ left: form column */}
        <section
          className="flex flex-1 basis-0 flex-col justify-between py-10 max-lg:py-12 lg:pl-10"
          aria-label={title}
        >
          <Link
            href="/"
            className="inline-flex w-fit text-content-primary"
            aria-label="Synaps Clone home"
          >
            <SiteMark className="h-[32px] w-[29px]" />
          </Link>

          <div className="flex w-full max-w-[400px] flex-col">
            <h1 className="text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-content-primary">
              {title}
            </h1>
            <p
              className="mt-3 text-[14px] leading-[1.5]"
              style={{ color: "var(--content--secondary)" }}
            >
              {subtitle}
            </p>

            <button
              type="button"
              onClick={onGoogleClick}
              disabled={googleDisabled}
              className="mt-6 flex h-[34px] w-full items-center justify-center gap-2.5 rounded-[4px] text-[11px] font-medium text-[#f8fafc] transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: "var(--accent--solid)" }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
                />
              </svg>
              {googleLabel}
            </button>

            {children}
          </div>

          <div>
            <p
              className="max-w-[400px] text-[12px] leading-[16px]"
              style={{ color: "var(--content--secondary)" }}
            >
              By using Synaps you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-content-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-content-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p
              className="mt-2 max-w-[400px] text-[11px] leading-[15px]"
              style={{ color: "var(--content--tertiary)" }}
            >
              Educational clone — sign-in is simulated in your browser. No
              Google integration, no credentials, no session server.
            </p>
          </div>
        </section>

        {/* --------------------------------------- right: preview panel */}
        <section
          className="relative hidden flex-1 basis-0 overflow-hidden lg:block"
          aria-hidden="true"
          style={{
            background: "var(--surface--raised)",
            border: "0.5px solid var(--border--default)",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col"
            style={{ filter: "saturate(0.94) contrast(1.03)" }}
          >
            <AuthPreviewArt />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Original preview artwork — a Synaps-style project window: Layers/
 * Assets sidebar, furnished plan on drafting paper, page bar.        */

function AuthPreviewArt() {
  return (
    <>
      {/* title bar */}
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: "rgba(8,9,11,0.08)", background: "#fff" }}
      >
        <span
          style={{ width: 10, height: 10, borderRadius: 999, background: "#d7dbe0" }}
        />
        <span
          style={{ width: 10, height: 10, borderRadius: 999, background: "#d7dbe0" }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 12.5,
            color: "rgba(8,9,11,0.55)",
          }}
        >
          Acme Project — Synaps
        </span>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* sidebar */}
        <div
          className="hidden w-44 flex-col border-r px-3 py-3 sm:flex"
          style={{ borderColor: "rgba(8,9,11,0.08)", background: "#fff" }}
        >
          {[
            ["Layers", true],
            ["Assets", false],
            ["Pages", false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className="mb-1 rounded-md px-3 py-2"
              style={{
                fontSize: 13,
                fontWeight: active ? 560 : 460,
                color: active ? "#101314" : "rgba(8,9,11,0.55)",
                background: active ? "rgba(8,9,11,0.05)" : "transparent",
              }}
            >
              {label as string}
            </div>
          ))}
          {["Walls", "Doors", "Windows", "Rooms", "Furniture"].map((layer) => (
            <div
              key={layer}
              className="flex items-center gap-2 px-3 py-1.5"
              style={{ fontSize: 12, color: "rgba(8,9,11,0.5)" }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 2,
                  border: "1.4px solid rgba(8,9,11,0.35)",
                  background:
                    layer === "Furniture" ? "transparent" : "rgba(16,96,192,0.5)",
                }}
              />
              {layer}
            </div>
          ))}
        </div>

        {/* canvas */}
        <div
          className="relative flex-1"
          style={{
            background: "#EBEDEF",
            backgroundImage:
              "radial-gradient(rgba(8,9,11,0.13) 1px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        >
          <svg
            viewBox="0 0 560 430"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* walls */}
            <g stroke="#2b2e33" strokeWidth="7" fill="none" strokeLinejoin="round">
              <path d="M90 70h380v290H90z" />
            </g>
            <g stroke="#2b2e33" strokeWidth="5" fill="none">
              <path d="M270 70v150M90 220h180M360 220v140M270 220h90" />
            </g>
            {/* door swings */}
            <g stroke="rgba(43,46,51,0.5)" strokeWidth="1.6" fill="none">
              <path d="M270 120a50 50 0 0 1 50 50" />
              <path d="M200 220a44 44 0 0 1 44-44" />
            </g>
            {/* furniture */}
            <g stroke="rgba(43,46,51,0.75)" strokeWidth="1.8" fill="none">
              <rect x="112" y="92" width="92" height="34" rx="6" />
              <path d="M112 109h92M130 92v34" />
              <rect x="136" y="146" width="44" height="24" rx="3" />
              <rect x="112" y="252" width="76" height="86" rx="4" />
              <path d="M112 274h76M150 252v22" />
              <rect x="390" y="100" width="58" height="96" rx="3" />
              <circle cx="392" cy="112" r="8" />
              <circle cx="392" cy="148" r="8" />
              <circle cx="392" cy="184" r="8" />
              <path d="M300 92h150M300 92v26h150" />
              <circle cx="330" cy="105" r="5" />
              <circle cx="370" cy="105" r="5" />
            </g>
            {/* room label */}
            <g>
              <rect
                x="118"
                y="188"
                width="86"
                height="20"
                rx="4"
                fill="rgba(16,96,192,0.10)"
              />
              <text
                x="161"
                y="201.5"
                textAnchor="middle"
                fontSize="10.5"
                fill="#1060c0"
                fontFamily="ui-monospace, monospace"
              >
                18.4 m²
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* page bar */}
      <div
        className="flex items-center gap-2 border-t px-4 py-2"
        style={{ borderColor: "rgba(8,9,11,0.08)", background: "#fff" }}
      >
        <span
          className="rounded px-2.5 py-1"
          style={{
            fontSize: 11.5,
            background: "rgba(8,9,11,0.06)",
            color: "rgba(8,9,11,0.7)",
          }}
        >
          Ground floor
        </span>
        <span
          className="rounded px-2.5 py-1"
          style={{
            fontSize: 11.5,
            color: "rgba(8,9,11,0.45)",
            border: "1px dashed rgba(8,9,11,0.2)",
          }}
        >
          + Page
        </span>
      </div>
    </>
  );
}
