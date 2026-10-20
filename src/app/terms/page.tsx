import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { termsPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Terms",
};

export default function Page() {
  return <ContentPage content={termsPage} />;
}
