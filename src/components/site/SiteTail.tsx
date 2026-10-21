"use client";

/**
 * SiteTail — the universal pre-footer tail observed on every
 * synaps.app page: the “Real work built with Synaps” video stage,
 * directly followed by the dark footer (whose own CTA block carries
 * the “Architectural practice without the compromise.” heading — the
 * real site has no separate light CTA band). The header flips to its
 * dark variant (is-tail-dark) once the tail scrolls into view.
 */

import { useEffect, useRef } from "react";
import { VideoStage } from "@/components/site/VideoStage";

export function SiteTail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio > 0.08) document.body.classList.add("is-tail-dark");
          else document.body.classList.remove("is-tail-dark");
        }
      },
      { threshold: [0, 0.08, 0.3] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.body.classList.remove("is-tail-dark");
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <VideoStage />
    </div>
  );
}
