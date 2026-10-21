import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

/**
 * Marketing shell: the public site (landing, solutions, pricing, legal…)
 * renders inside the Nav + Footer chrome, matching the observed public
 * product. Authenticated app routes (/login, /onboarding, /t, /m) render
 * BARE — like the original product, whose signed-in surface has no
 * marketing navigation.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
