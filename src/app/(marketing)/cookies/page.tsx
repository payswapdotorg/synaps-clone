import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { cookiesPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Cookie policy",
};

export default function Page() {
  return <ContentPage content={cookiesPage} />;
}
