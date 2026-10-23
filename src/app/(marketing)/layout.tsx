import "../site.css";
import type { Viewport } from "next";
import { Attribution } from "@/components/site/Attribution";
import { CookieBanner } from "@/components/site/CookieBanner";
import { CursorDot } from "@/components/site/CursorDot";
import { NavTransitions } from "@/components/site/NavTransitions";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { SiteTail } from "@/components/site/SiteTail";

/**
 * Marketing shell — the public site (landing, solutions, pricing, blog,
 * docs, legal…) renders inside the synaps.app-style chrome: sticky
 * light header, dark CTA footer, cookie consent banner. Authenticated
 * app routes (/login, /onboarding, /t, /m) render BARE, like the
 * original product.
 *
 * The universal tail observed on every synaps.app page — the “Real work
 * built with Synaps” video stage, then the closing CTA — lives here so
 * each page ends the same way the real site does.
 *
 * The header sits OUTSIDE .ms-page-layer and the page content inside
 * it, mirroring the real's .page-layer > :not(.header) fade target for
 * cross-page navigation transitions (see NavTransitions + site.css).
 */
export const viewport: Viewport = {
  /* Scheme-aware browser-chrome color pair, transcribed from the live
     synaps.app <meta name="theme-color"> set (light #F8F9FB / dark
     #0F0F0E). The marketing surface itself stays light in both schemes
     — exactly as the real site does — the pair only tints the mobile
     browser chrome around it. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0E" },
  ],
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="ms" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <NavTransitions />
      <Attribution />
      <SiteHeader />
      <div className="ms-page-layer" style={{ flex: 1 }}>
        {children}
        <SiteTail />
        <SiteFooter />
      </div>
      <CookieBanner />
      <CursorDot />
    </div>
  );
}
