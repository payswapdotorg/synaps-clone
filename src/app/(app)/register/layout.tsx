import type { Metadata } from "next";

/**
 * Register shares the observed auth entry page's bare-name title
 * pattern. Register is a client component, so the title lives here.
 */
export const metadata: Metadata = {
  title: { absolute: "Synaps Clone" },
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
