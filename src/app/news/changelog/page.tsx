import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { changelogPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Release notes",
};

export default function Page() {
  return <ContentPage content={changelogPage} />;
}
