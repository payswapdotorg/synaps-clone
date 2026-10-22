import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { imprintDoc } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Imprint, Synaps Clone",
  absolute: true,
  description: "Media-owner disclosures, reconstructed.",
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <main id="content">
      <LegalView doc={imprintDoc} />
    </main>
  );
}
