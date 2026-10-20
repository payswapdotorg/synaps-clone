import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { faqPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function Page() {
  return <ContentPage content={faqPage} />;
}
