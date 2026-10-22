"use client";

/**
 * Cross-page navigation chrome — the JS half of the synaps.app harvest.
 * Ported from nav-transitions.js: an unmodified left-click on an internal
 * link becomes a full document navigation, coordinated through a
 * sessionStorage flag — exactly like the real (multi-page) site:
 *
 *  - Engines with cross-document view transitions (Chrome 126+):
 *    navigate at once; the CSS (@view-transition + view-transition-name)
 *    animates the header morph and root cross-fade.
 *  - Older engines: the page layer fades out (280ms), the document
 *    navigates, and the next document fades in (320ms) via the
 *    synaps-nav-* classes.
 *
 * Clone-specific exclusion: the real's beta product lives on another
 * origin (beta.synaps.app), so its links are NOT internal and never
 * fade. The clone serves both surfaces on one origin, so the app
 * prefixes below stand in for that boundary and are excluded the same
 * way (/docs is also excluded — the real docs are a separate origin
 * too, so navigation there is immediate).
 *
 * Also tags <html data-page-kind> per page (home / site-subpage /
 * solution-subpage) so the CSS can mirror the real's ≤900px rule that
 * disables transitions on subpages.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const EXIT_MS = 280;
const ENTER_MS = 320;
const NAV_FLAG = "synaps-nav";

/** Paths that belong to the app surface (or other origins in the real's
 *  topology) — navigation there is immediate, without the fade. */
const NON_FADING_PREFIXES = [
  "/login",
  "/register",
  "/onboarding",
  "/recent",
  "/settings",
  "/members",
  "/billing",
  "/notifications",
  "/invitations",
  "/invite",
  "/templates",
  "/template/",
  "/storage",
  "/credits-banners",
  "/admin",
  "/sculpt-studio",
  "/onboarding-lab",
  "/testing/",
  "/components",
  "/t/",
  "/m/",
  "/docs",
];

function isNonFadingPath(pathname: string): boolean {
  return NON_FADING_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(p),
  );
}

function isInternalLink(anchor: HTMLAnchorElement): boolean {
  if (anchor.hasAttribute("download")) return false;
  const target = anchor.getAttribute("target");
  if (target && target !== "_self") return false;
  const href = anchor.getAttribute("href");
  if (!href || href.charAt(0) === "#") return false;
  if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
  try {
    const url = new URL(href, location.href);
    return url.origin === location.origin;
  } catch {
    return false;
  }
}

export function NavTransitions() {
  const pathname = usePathname();

  // Tag the page kind for the CSS opt-out rules.
  useEffect(() => {
    const root = document.documentElement;
    if (pathname === "/") {
      delete root.dataset.pageKind;
    } else if (pathname.startsWith("/solutions/")) {
      root.dataset.pageKind = "solution-subpage";
    } else {
      root.dataset.pageKind = "site-subpage";
    }
    return () => {
      delete root.dataset.pageKind;
    };
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Native cross-document view transitions (Chrome 126+): the CSS
    // (@view-transition + view-transition-name) drives the visuals.
    const nativeCrossDocNav =
      typeof PageRevealEvent !== "undefined" || typeof PageSwapEvent !== "undefined";
    if (reduced) return;

    // Enter pass — only the JS fallback animates the landing document;
    // with native support the cross-document transition covers it.
    if (!nativeCrossDocNav) {
      try {
        if (sessionStorage.getItem(NAV_FLAG)) {
          sessionStorage.removeItem(NAV_FLAG);
          const root = document.documentElement;
          root.classList.add("synaps-nav-enter");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              root.classList.add("synaps-nav-enter-active");
              window.setTimeout(() => {
                root.classList.remove("synaps-nav-enter", "synaps-nav-enter-active");
              }, ENTER_MS + 40);
            });
          });
        }
      } catch {
        /* storage blocked — no enter pass */
      }
    }

    // bfcache restore: clear any lingering transition classes.
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      document.documentElement.classList.remove(
        "synaps-nav-exit",
        "synaps-nav-enter",
        "synaps-nav-enter-active",
      );
      try {
        sessionStorage.removeItem(NAV_FLAG);
      } catch {
        /* storage blocked */
      }
    };
    window.addEventListener("pageshow", onPageShow);

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !isInternalLink(anchor)) return;

      // The consent bar's footer link (#consent-settings) is handled by
      // the CookieBanner's own delegation listener, which preventDefaults
      // and reopens the bar — it must never navigate. On the real site
      // nav-transitions bails entirely in VT-capable browsers, so the
      // consent handler always wins there; mirror that outcome.
      if (anchor.id === "consent-settings") return;

      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (
        url.pathname === location.pathname &&
        url.search === location.search &&
        url.hash === location.hash
      ) {
        return;
      }
      // Cross-surface / cross-origin-equivalent paths navigate immediately.
      if (isNonFadingPath(url.pathname)) return;

      // The real site is multi-page: every internal link is a full
      // document navigation, which is what makes its transition chrome
      // work (native @view-transition on new engines, the JS fade on
      // old ones). The clone renders an SPA, so convert the click into
      // the same document navigation:
      //  - native cross-doc support: navigate at once, CSS animates.
      //  - otherwise: fade the layer out first (280ms), then navigate.
      try {
        if (!nativeCrossDocNav) sessionStorage.setItem(NAV_FLAG, "1");
      } catch {
        return; // storage blocked — let the browser follow normally
      }
      event.preventDefault();
      if (nativeCrossDocNav) {
        location.href = anchor.href;
        return;
      }
      document.documentElement.classList.add("synaps-nav-exit");
      window.setTimeout(() => {
        location.href = anchor.href;
      }, EXIT_MS);
    };
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("click", handleClick, true);
      document.documentElement.classList.remove(
        "synaps-nav-exit",
        "synaps-nav-enter",
        "synaps-nav-enter-active",
      );
    };
  }, []);

  return null;
}
