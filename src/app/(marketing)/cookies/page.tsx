import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { cookiesDoc } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cookie policy, Synaps Clone",
  absolute: true,
  description: "Cookies and similar technologies — what the clone actually sets.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <main id="content">
      <LegalView doc={cookiesDoc} />
    </main>
  );
}
