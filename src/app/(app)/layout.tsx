import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppThemeSync } from "@/components/app/AppThemeSync";

/**
 * The authenticated-app surface — every route behind the sign-in wall.
 *
 * GROUND TRUTH (harvested production document + stylesheet, Task 34):
 * the real beta.synaps.app serves `<html lang="en" class="dark">`, and the
 * :root token set in its shipped stylesheet IS the dark theme (surface base
 * #151719, content primary #f8fafc). The light marketing site is a separate
 * deployment with a separate design language — this clone mirrors that split:
 * the (marketing) and (docs) groups stay light; this group runs dark.
 *
 * The theme is applied through a [data-theme="dark"] scope on the wrapper
 * (server-rendered, so there is no flash), and AppThemeSync mirrors it onto
 * <html> after hydration so the overscroll region and any future body-level
 * portal inherit the same theme while an app route is active.
 *
 * SEO posture: on the real web the product surface lives on a separate
 * origin (beta.synaps.app, an SPA with an empty head — and synaps.app/login
 * is a plain 404), so it is out of the main domain's index by construction.
 * This clone serves both surfaces on one origin, so the same intent is
 * expressed explicitly: the authenticated app routes are noindex — search
 * engines index the marketing/docs site, never the app shell.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="dark"
      data-mode="draft"
      className="app-surface min-h-dvh bg-surface-base text-content-primary"
    >
      <AppThemeSync />
      {children}
    </div>
  );
}
