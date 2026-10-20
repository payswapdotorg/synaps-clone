import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { pricingPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function Page() {
  return <ContentPage content={pricingPage} />;
}
