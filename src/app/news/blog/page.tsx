import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { blogPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  return <ContentPage content={blogPage} />;
}
