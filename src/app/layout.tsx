import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { THEME_COLOR } from "@/lib/tokens";
import { OG_DEFAULT, SITE_NAME, SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Synaps Clone — Architectural Practice without the compromise",
    template: "%s | Synaps Clone",
  },
  description:
    "Educational clone of beta.synaps.app, rebuilt from a reverse-engineering analysis of its public surface. Not affiliated with, endorsed by, or connected to Synaps.",
  applicationName: SITE_NAME,
  keywords: [
    "architecture",
    "floor plan",
    "drafting",
    "spatial visualization",
    "educational clone",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    // Transcribed quirk: the analysed site points apple-touch-icon at the
    // SVG favicon, not a PNG.
    apple: [{ url: "/favicon.svg" }],
  },
  openGraph: {
    title: "Synaps Clone — Architectural Practice without the compromise",
    description:
      "Educational clone of beta.synaps.app, rebuilt from a reverse-engineering analysis of its public surface.",
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    // Bare string — the analysed site emits a single og:image meta with no
    // width/height/alt sub-tags.
    images: [OG_DEFAULT],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synaps Clone — Architectural Practice without the compromise",
    description:
      "Educational clone of beta.synaps.app, rebuilt from a reverse-engineering analysis of its public surface.",
    images: [OG_DEFAULT],
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  // Transcribed: the analysed site ships viewport-fit=cover.
  viewportFit: "cover",
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
