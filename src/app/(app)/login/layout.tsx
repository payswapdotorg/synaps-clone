import type { Metadata } from "next";

/**
 * The observed auth entry page carries the bare product name as its
 * title ("Synaps"); the clone mirrors that pattern with its own name.
 * Login is a client component, so the title lives in this layout.
 */
export const metadata: Metadata = {
  title: { absolute: "Synaps Clone" },
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
