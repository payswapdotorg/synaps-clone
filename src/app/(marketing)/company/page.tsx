import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/pages";
import { companyPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Company",
};

export default function Page() {
  return <ContentPage content={companyPage} />;
}
