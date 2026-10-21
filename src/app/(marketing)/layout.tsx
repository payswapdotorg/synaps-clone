import "../site.css";
import { CookieBanner } from "@/components/site/CookieBanner";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";

/**
 * Marketing shell — the public site (landing, solutions, pricing, blog,
 * docs, legal…) renders inside the synaps.app-style chrome: sticky
 * light header, dark CTA footer, cookie consent banner. Authenticated
 * app routes (/login, /onboarding, /t, /m) render BARE, like the
 * original product.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="ms" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <div style={{ flex: 1 }}>{children}</div>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
