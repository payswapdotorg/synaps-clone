import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { imprintPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Imprint",
};

export default function Page() {
  return <ContentPage content={imprintPage} />;
}
