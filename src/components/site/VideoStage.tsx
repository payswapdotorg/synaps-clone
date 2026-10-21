"use client";

/**
 * VideoStage — the universal “Real work built with Synaps” pre-footer
 * showcase observed on every synaps.app page.
 *
 * Behavior transcribed from the live site (original implementation):
 *  - A tall rail holds a sticky video frame; as the rail scrolls through
 *    the viewport the frame expands from inset (content margins) to full
 *    bleed via a scroll-driven `--video-stage-progress` 0→1.
 *  - Two self-hosted, muted, looping clips cross-fade (opacity) between
 *    each other; an 8s auto-cycle advances them with a progress fill.
 *  - Clicking a progress item switches to that clip and restarts the
 *    cycle. Cycling pauses when the tab is hidden or the section is out
 *    of view, and is disabled entirely under prefers-reduced-motion.
 *  - Each clip carries a caption overlay (name + meta, optional overline)
 *    above the progress navigation.
 *
 * Clips are ORIGINAL placeholder footage (procedural attractor + a slow
 * architectural pan) — the real deployment ships product capture videos.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const CLIP_DURATION_MS = 8000;

type Clip = {
  src: string;
  poster: string;
  ariaLabel: string;
  overline?: string;
  name: string;
  meta: string;
  title: string;
};

const CLIPS: Clip[] = [
  {
    src: "/images/site/clips/fluid-loop.mp4",
    poster: "/images/site/clips/fluid-loop-poster.jpg",
    ariaLabel: "Floor-plan tracer fluid loop",
    name: "Introducing Vecy-1",
    meta: "Our proprietary SOTA floor plan generation model achieves best-in-class benchmark performance in geometric validity, coherence, and spatial reasoning.",
    title: "Vecy-1",
  },
  {
    src: "/images/site/clips/office-pan.mp4",
    poster: "/images/site/clips/office-pan-poster.jpg",
    ariaLabel: "Architecture studio",
    overline: "Made for the studio",
    name: "Built for the everyday architecture practice",
    meta: "The drafting tool a working studio runs on",
    title: "Made for the studio",
  },
];

export function VideoStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cycleStart = useRef(0);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  /* Scroll-driven expansion: as the rail top travels from 65% of the
     viewport down to 8% (desktop; 86%→20% on small screens), progress
     goes 0→1 and the frame's inline margins collapse to full bleed. */
  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");

    const update = () => {
      raf = 0;
      if (reduce.matches) {
        section.style.setProperty("--video-stage-progress", "1");
        return;
      }
      const wh = window.innerHeight || 800;
      const rect = rail.getBoundingClientRect();
      const start = desktop.matches ? wh * 0.65 : wh * 0.86;
      const end = desktop.matches ? wh * 0.08 : wh * 0.2;
      let p = (start - rect.top) / (start - end);
      if (!Number.isFinite(p)) p = 0;
      p = Math.max(0, Math.min(1, p));
      section.style.setProperty("--video-stage-progress", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Auto-cycle: 8s per clip, rAF-driven so the progress fill stays in
     lockstep with the timer. The fill is written straight to the CSS
     variable (no React state) so the 60fps loop never re-renders.
     Pauses when hidden or out of view. */
  const tick = useCallback(() => {
    rafRef.current = 0;
    if (!runningRef.current) return;
    const section = sectionRef.current;
    const elapsed = performance.now() - cycleStart.current;
    const p = Math.min(1, elapsed / CLIP_DURATION_MS);
    if (section) section.style.setProperty("--video-stage-clip-progress", p.toFixed(3));
    if (p >= 1) {
      cycleStart.current = performance.now();
      setActive((a) => (a + 1) % CLIPS.length);
      if (section) section.style.setProperty("--video-stage-clip-progress", "0");
    }
    if (p < 1) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const startCycle = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    /* Reset the clock when the cycle (re)starts — otherwise the elapsed
       time since mount fires an instant advance on first visibility. */
    cycleStart.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopCycle = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      sectionRef.current?.style.setProperty("--video-stage-clip-progress", "1");
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !document.hidden) startCycle();
          else stopCycle();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(section);

    const onVis = () => {
      if (document.hidden) stopCycle();
      else {
        const r = section.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) startCycle();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    cycleStart.current = performance.now();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stopCycle();
    };
  }, [startCycle, stopCycle]);

  /* Keep only the active clip playing (the others pause off-stage). */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const vids = Array.from(section.querySelectorAll<HTMLVideoElement>(".video-stage-clip video"));
    vids.forEach((v, i) => {
      if (i === active) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const selectClip = (idx: number) => {
    setActive(idx);
    sectionRef.current?.style.setProperty("--video-stage-clip-progress", "0");
    cycleStart.current = performance.now();
  };

  return (
    <section
      ref={sectionRef}
      className="video-stage"
      id="real-work"
      data-theme="dark"
      aria-label="Real work built with Synaps"
    >
      <div className="video-stage-inner">
        <div className="video-stage-rail" ref={railRef} id="video-stage-rail">
          <div className="video-stage-frame">
            {CLIPS.map((clip, i) => (
              <figure
                key={clip.src}
                className={"video-stage-clip" + (i === active ? " is-active" : "")}
                data-clip={i}
                style={{ backgroundImage: `url(${clip.poster})` }}
                aria-hidden={i === active ? undefined : true}
              >
                <video
                  src={clip.src}
                  poster={clip.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={clip.ariaLabel}
                />
                <figcaption className="video-stage-caption">
                  {clip.overline ? (
                    <span className="video-stage-caption-overline">{clip.overline}</span>
                  ) : null}
                  <strong className="video-stage-caption-name">{clip.name}</strong>
                  <span className="video-stage-caption-meta">{clip.meta}</span>
                </figcaption>
              </figure>
            ))}
            <nav className="video-stage-progress" aria-label="Project navigation">
              {CLIPS.map((clip, i) => (
                <button
                  key={clip.title}
                  type="button"
                  className={"video-stage-progress-item" + (i === active ? " is-active" : "")}
                  data-clip={i}
                  aria-label={`Show clip ${i + 1}`}
                  onClick={() => selectClip(i)}
                >
                  <span className="video-stage-progress-track">
                    <span className="video-stage-progress-fill" />
                  </span>
                  <span className="video-stage-progress-meta">
                    <span className="video-stage-progress-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="video-stage-progress-title">{clip.title}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
