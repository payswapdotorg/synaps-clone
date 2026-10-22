import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { termsDoc } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of service, Synaps Clone",
  absolute: true,
  description: "Terms-of-service structure, reconstructed.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="content">
      <LegalView doc={termsDoc} />
    </main>
  );
}
