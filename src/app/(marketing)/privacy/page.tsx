import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { privacyDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the analysed product handles data — reconstructed.",
};

export default function PrivacyPage() {
  return (
    <main id="content">
      <LegalView doc={privacyDoc} />
    </main>
  );
}
