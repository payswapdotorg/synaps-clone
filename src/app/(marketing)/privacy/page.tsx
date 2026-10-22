import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { privacyDoc } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy policy, Synaps Clone",
  absolute: true,
  description: "How the analysed product handles data — reconstructed.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="content">
      <LegalView doc={privacyDoc} />
    </main>
  );
}
