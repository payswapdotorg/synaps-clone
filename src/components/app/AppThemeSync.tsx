"use client";

import { useEffect } from "react";

/**
 * Mirrors the app group's dark theme onto <html> while an app route is
 * mounted, and restores the previous (light) attributes on unmount —
 * i.e. when the user client-navigates back to the marketing or docs
 * surface. The wrapper div in the (app) layout already carries the theme
 * server-side; this only extends it to the document element so the
 * overscroll region and any future body-level portal match.
 */
export function AppThemeSync() {
  useEffect(() => {
    const html = document.documentElement;
    const prevTheme = html.getAttribute("data-theme");
    const prevBg = html.style.backgroundColor;
    html.setAttribute("data-theme", "dark");
    html.style.backgroundColor = "#101214";
    return () => {
      if (prevTheme === null) {
        html.removeAttribute("data-theme");
      } else {
        html.setAttribute("data-theme", prevTheme);
      }
      html.style.backgroundColor = prevBg;
    };
  }, []);
  return null;
}
