import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { THEME_COLOR } from "@/lib/tokens";
import "./globals.css";

/**
 * The app shell uses the stack the analysis recorded for the product UI
 * ("Inter, system-ui, -apple-system, …"). The variable is exposed as
 * --font-inter and is composed into --font-sans / --stack-app in globals.css.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Synaps Clone — Architectural Practice without the compromise",
    template: "%s · Synaps Clone",
  },
  description:
    "Educational clone of beta.synaps.app, rebuilt from a reverse-engineering analysis of its public surface. Not affiliated with, endorsed by, or connected to Synaps.",
  applicationName: "Synaps Clone",
  keywords: [
    "architecture",
    "floor plan",
    "drafting",
    "spatial visualization",
    "educational clone",
  ],
  openGraph: {
    title: "Synaps Clone — Architectural Practice without the compromise",
    description:
      "Educational clone of beta.synaps.app, rebuilt from a reverse-engineering analysis of its public surface.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-theme="light" data-mode="draft">
      <body className="min-h-screen bg-background text-content-primary">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface-base focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
