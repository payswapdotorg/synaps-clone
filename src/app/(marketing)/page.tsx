import { AssetsLibrary } from "@/components/landing/AssetsLibrary";
import { Capabilities } from "@/components/landing/Capabilities";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { ModeSections } from "@/components/landing/ModeSections";
import { StudioTabs } from "@/components/landing/StudioTabs";
import { AuthRedirect } from "@/components/auth/AuthRedirect";

/**
 * Marketing landing page.
 *
 * Section order follows the captured public marketing page (.rea/marketing.html)
 * as recorded in the COPY INVENTORY section of ANALYSIS.md:
 *
 *   hero → feature cards → quote bridge → capability grid → accordion →
 *   one canvas, two modes → native assets library → studio tabs →
 *   final CTA → "Alternative to" comparison
 *
 * The shared Nav and Footer come from the app shell (src/app/layout.tsx).
 */
export default function HomePage() {
  return (
    <main id="main">
      <AuthRedirect />
      <Hero />
      <FeatureCards />
      <Capabilities />
      <ModeSections />
      <AssetsLibrary />
      <StudioTabs />
      <FinalCta />
    </main>
  );
}
