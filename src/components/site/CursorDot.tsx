"use client";

/**
 * CursorDot — the custom pointer observed on every synaps.app marketing
 * page (harvest: `.cursor-dot` + `setupCursorDot()` from the live site).
 *
 * On precise pointers (hover: hover + pointer: fine) the native cursor is
 * hidden site-wide and replaced by a fixed white dot (mix-blend-mode:
 * difference, so it stays visible over both light and dark sections). The
 * dot inflates to a soft 36px ring over interactive elements, hides when
 * the pointer leaves the window, and the whole feature is skipped for
 * touch/coarse pointers and prefers-reduced-motion users (who keep their
 * native cursor).
 *
 * Position is driven by JS on every pointermove via `transform` (RAF-
 * throttled, translate3d for the compositor); the look (color, blend,
 * hover scaling) is CSS in site.css, exactly as the live site splits it.
 */

import { useEffect, useRef } from "react";

export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;

    /* Bail on touch / coarse-pointer devices and when reduced motion
       is requested. The CSS @media rules already hide the dot in
       these cases, but we also want to skip event wiring + RAF work. */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reducedMotion.matches) return;

    /* Selector for "this element looks clickable / interactive", the
       dot inflates over anything matching it. Large containers
       (<section>, <header>) are deliberately excluded so the dot
       doesn't spend most of the page inflated. Transcribed from the
       live list; class names that exist in this clone are kept
       (.mode-switch), the live-only ones map to anchors/buttons here. */
    const HOVER_SELECTOR = [
      "a[href]",
      "button",
      "input",
      "textarea",
      "select",
      "label",
      '[role="button"]',
      "[data-hoverable]",
      ".mode-switch",
    ].join(",");

    /* Elements that match HOVER_SELECTOR but should NOT trigger the
       inflate — reserved for elements carrying their own bespoke
       cursor effect ([data-cursor-default] opt-out, as on the live
       site's footer-logo). */
    const HOVER_EXCLUDE_SELECTOR = ["[data-cursor-default]"].join(",");

    let x = -100;
    let y = -100;
    let raf = 0;
    let lastHoverTarget: Element | null = null;

    const render = () => {
      raf = 0;
      /* translate3d nudges the dot onto the GPU compositor layer so
         pointer tracking stays smooth even when the rest of the page
         is busy (scroll-tile transforms, video stages, etc.). */
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      /* Ignore touch / pen, only react to mouse-style pointers. */
      if (e.pointerType && e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);

      /* Hover detection: match against the selector at the actual
         pointer target (closest() lets nested icons inside an <a>,
         the <svg> inside a button, etc. match). Double-check the
         exclude list, and only flip the class when the result
         changes, to avoid layout thrash. */
      let target: Element | null = null;
      if (e.target && (e.target as Element).closest) {
        target = (e.target as Element).closest(HOVER_SELECTOR);
        if (target && (e.target as Element).closest(HOVER_EXCLUDE_SELECTOR)) {
          target = null;
        }
      }
      if (target !== lastHoverTarget) {
        lastHoverTarget = target;
        dot.classList.toggle("is-hover", !!target);
      }
    };

    /* Hide the dot when the pointer leaves the window so it doesn't
       sit forever at the last known position when the user alt-tabs
       away or hovers over the browser chrome. */
    const hide = () => {
      dot.classList.add("is-hidden");
    };
    const show = () => {
      dot.classList.remove("is-hidden");
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
