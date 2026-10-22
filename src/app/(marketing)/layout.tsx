import "../site.css";
import { Attribution } from "@/components/site/Attribution";
import { CookieBanner } from "@/components/site/CookieBanner";
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
    </div>
  );
}
