import type { Metadata } from "next";
import { LegalView } from "@/components/site/templates";
import { cookiesDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Cookies and similar technologies — what the clone actually sets.",
};

export default function CookiesPage() {
  return (
    <main id="content">
      <LegalView doc={cookiesDoc} />
    </main>
  );
}
