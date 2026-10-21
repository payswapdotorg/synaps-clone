import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { termsDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms-of-service structure, reconstructed.",
};

export default function TermsPage() {
  return (
    <main id="content">
      <LegalView doc={termsDoc} />
    </main>
  );
}
