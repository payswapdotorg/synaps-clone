"use client";

/**
 * Right-hand "On this page" outline — transcribed from the GitBook
 * harvest: w-64 sticky column, hidden below xl, uppercase label with a
 * disclosure chevron, h2 anchors with the active one highlighted via
 * scroll-spy.
 */
import { useEffect, useState } from "react";
import { anchorId } from "@/lib/anchor";

export function DocsToc({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(headings[0] ?? "");

  useEffect(() => {
    if (!headings.length) return;
    const observers: IntersectionObserver[] = [];
    for (const h of headings) {
      const el = document.getElementById(anchorId(h));
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(h);
          }
        },
        { rootMargin: "-15% 0px -70% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="docs-toc" aria-label="On this page">
      <p className="docs-toc-label">
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        On this page
      </p>
      <ul>
        {headings.map((h) => (
          <li key={h}>
            <a
              href={`#${anchorId(h)}`}
              className={h === active ? "is-active" : undefined}
            >
              {h}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
