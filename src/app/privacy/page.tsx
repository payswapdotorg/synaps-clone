import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { privacyPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function Page() {
  return <ContentPage content={privacyPage} />;
}
