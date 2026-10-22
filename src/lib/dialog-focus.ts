"use client";

/**
 * Keyboard + focus contract for the clone's hand-rolled dialogs and drawers.
 *
 * Every overlay in this project (mobile team-nav drawer, console dock and
 * canvas-settings overlays, docs table-of-contents drawer, and the centred
 * modal dialogs) is custom markup rather than a component-library dialog, so
 * the standard dialog contract has to be applied by hand. These overlays are
 * clone-original patterns — the analysed product's app shell sits behind SSO
 * and focus behaviour is invisible to black-box browsing — so this module
 * implements the WAI-ARIA dialog convention instead of a harvested one:
 *
 *   - on open, focus moves into the dialog (first focusable element)
 *   - while open, Tab / Shift+Tab wrap within the dialog
 *   - Escape closes the dialog (scrim / X / navigate-close still work)
 *   - on close, focus returns to the element that opened the dialog
 *   - when dialogs nest (e.g. "New team" inside the team-nav drawer), the
 *     innermost dialog that contains focus owns the keyboard
 *
 * Attach the returned ref to the visible dialog PANEL (the box, not the
 * scrim). `role="dialog"` + `aria-modal="true"` should sit on the panel (or
 * its wrapper) — the ownership walk below looks for the nearest
 * `[role="dialog"]` ancestor, so either placement works.
 */
import { useEffect, useRef, useState } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/** Nearest `[role="dialog"]` ancestor of `node` (or `node` itself). */
function innermostDialog(node: HTMLElement): HTMLElement | null {
  let cur: HTMLElement | null = node;
  while (cur) {
    if (cur.getAttribute("role") === "dialog") return cur;
    cur = cur.parentElement;
  }
  return null;
}

export function useDialogFocus<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T | null>(null);
  // Keep the latest close callback without re-running the effect: the console
  // re-renders on every canvas interaction and focus must not jump mid-edit.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    // Remember what had focus so we can hand it back on close.
    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Move focus into the dialog: an [autofocus] element if the dialog
    // declares one, else the first focusable element, else the container.
    const el = ref.current;
    if (el) {
      const first =
        el.querySelector<HTMLElement>("[autofocus]") ??
        el.querySelector<HTMLElement>(FOCUSABLE);
      if (first) first.focus();
      else {
        el.tabIndex = -1;
        el.focus();
      }
    }

    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (!el || !active || !el.contains(active)) return;
      // A dialog nested inside this one (and holding focus) owns the keyboard.
      const inner = innermostDialog(active);
      if (inner && inner !== el && el.contains(inner)) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("keydown", onKey, true);
      if (returnTo && document.contains(returnTo)) returnTo.focus();
    };
  }, [open]);

  return ref;
}

/**
 * Reactive CSS media query (SSR-safe: renders `false`, updates after mount).
 * Used to toggle dialog semantics on panels that are overlays on small
 * screens and static regions on large ones (console dock / settings).
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}
