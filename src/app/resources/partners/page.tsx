import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { partnersPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Partners",
};

export default function Page() {
  return <ContentPage content={partnersPage} />;
}
