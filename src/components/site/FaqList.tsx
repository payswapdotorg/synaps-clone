"use client";

/**
 * FaqList — native <details> accordion with the single-open +
 * scroll-anchored toggle behavior observed on synaps.app
 * (site-enhance.js): opening one item collapses the others in the same
 * frame, and the clicked question is pinned to its viewport position so
 * a collapsing item above it never jumps the page.
 */

import { useEffect, useRef } from "react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onClick = (e: MouseEvent) => {
      const summary = (e.target as HTMLElement).closest("summary");
      if (!summary || !list.contains(summary)) return;
      const item = summary.parentElement;
      if (!item || item.tagName !== "DETAILS") return;

      // Drive the open state manually and synchronously (no flicker).
      e.preventDefault();

      const willOpen = !(item as HTMLDetailsElement).open;
      const anchorTop = summary.getBoundingClientRect().top;

      // Single-open: collapse the others, then toggle this one.
      list.querySelectorAll("details[open]").forEach((other) => {
        if (other !== item) (other as HTMLDetailsElement).open = false;
      });
      (item as HTMLDetailsElement).open = willOpen;

      // Reading the rect forces synchronous layout, so the correction
      // lands in the same frame: the question stays exactly where it was.
      const delta = summary.getBoundingClientRect().top - anchorTop;
      if (delta) {
        window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
      }
    };

    list.addEventListener("click", onClick);
    return () => list.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="ms-accordion" ref={listRef}>
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            <span>{item.q}</span>
            <span className="tick" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="answer">
            <p style={{ margin: 0 }}>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
