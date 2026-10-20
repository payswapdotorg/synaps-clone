import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { solutionsHub } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Solutions",
};

export default function Page() {
  return <ContentPage content={solutionsHub} />;
}
