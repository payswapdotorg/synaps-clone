import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { imprintDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Media-owner disclosures, reconstructed.",
};

export default function ImprintPage() {
  return (
    <main id="content">
      <LegalView doc={imprintDoc} />
    </main>
  );
}
