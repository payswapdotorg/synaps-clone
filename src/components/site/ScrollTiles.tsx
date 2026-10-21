"use client";

/**
 * ScrollTiles — the homepage “Everything you need” capabilities
 * scrollytelling observed on synaps.app.
 *
 * Original implementation of the harvested behavior:
 *  - A 600svh section pins a two-panel stage to the viewport. The LEFT
 *    panel holds the Drafting word list; the RIGHT panel holds the
 *    Drafting visuals. Scroll drives the active word + cross-fading
 *    image (440ms) + a fast caption swap (90ms).
 *  - At the mid-point a mode switch (Drafting ↔ Polishing) rises in,
 *    its thumb builds tension with the scroll, then springs across at
 *    the snap: the stage curtain flips to the dark theme, the panels
 *    swap (words ↔ visuals switch sides) and the 5 Polishing steps run.
 *  - Words are click-to-jump: clicking scrolls so that step lands at
 *    its phase midpoint.
 *  - ≤899px the stage collapses into two snap carousels (Drafting,
 *    Polishing) with named dot navigation.
 *
 * Phase budget (measured from the live JS):
 *   DRAFT 0..0.28 · FLIP 0.28..0.58 · POLISH 0.58..0.93 · TAIL ..1
 */

import { useCallback, useEffect, useRef, useState } from "react";

const DRAFT_END = 0.28;
const SNAP_THRESHOLD = 0.58;
const POLISH_ITEMS_END = 0.93;
const ENTRANCE_SUB_END = 0.55;
const PANE_EXIT_SUB_END = 0.55;
const THUMB_AT_SNAP = 0.25;
const SNAP_SPRING_HOLD_MS = 540;
const SNAP_DISMISS_MS = 480;
const REVERSE_TRANSITION_MS = 850;

type Cap = { word: string; meta: string; img: string; alt: string };

const DRAFT: Cap[] = [
  {
    word: "Accurate floor plans",
    meta: "Multilayer walls. Rooms shaped with precision.",
    img: "/images/site/home/drafting-floor-plans.jpg",
    alt: "Canvas showing a dimensioned floor plan of a sofa, plant, and herringbone floor.",
  },
  {
    word: "Configurable elements",
    meta: "Windows, doors, stairs, editable and connected.",
    img: "/images/site/home/drafting-elements.jpg",
    alt: "Element configuration panel for windows, doors and stairs.",
  },
  {
    word: "Floor plan tracer",
    meta: "Any photo, scan or sketch, traced into editable lines.",
    img: "/images/site/home/drafting-tracer.jpg",
    alt: "A hand sketch being traced into editable CAD lines.",
  },
  {
    word: "Floor plan generator",
    meta: "Describe the space. Get an editable plan.",
    img: "/images/site/home/drafting-generator.jpg",
    alt: "A text prompt generating an editable floor plan.",
  },
];

const POLISH: Cap[] = [
  {
    word: "Shadows",
    meta: "Cast and edit live. Sun position, time of day.",
    img: "/images/site/home/polish-shadows.jpg",
    alt: "Sun-path control with sunrise at 06:00 and the sun at 08:44.",
  },
  {
    word: "Spatial visualization",
    meta: "Walk the space. Camera framing built in.",
    img: "/images/site/home/polish-spatial.jpg",
    alt: "Interior visualization generated from the plan.",
  },
  {
    word: "Angle control",
    meta: "Lock the view. Reuse it across deliverables.",
    img: "/images/site/home/polish-angle.jpg",
    alt: "A locked camera angle with a view cone on the plan.",
  },
  {
    word: "Relight & resurface",
    meta: "Change the light. Swap finishes. The scene catches up.",
    img: "/images/site/home/polish-relight.jpg",
    alt: "The same room relit from cool morning to warm sunset.",
  },
  {
    word: "Replace & restyle",
    meta: "Swap an element or restyle the whole project. Connections stay.",
    img: "/images/site/home/polish-restyle.jpg",
    alt: "Floor material being swapped with finish chips.",
  },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ScrollTiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [snapPhase, setSnapPhase] = useState<"none" | "spring" | "dismiss" | "done">("none");
  const [mobileDraft, setMobileDraft] = useState(0);
  const [mobilePolish, setMobilePolish] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const scrollToProgress = useCallback((p: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + scrollable * p, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktop = window.matchMedia("(min-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let snapFired = false;
    let reverseTimer: ReturnType<typeof setTimeout> | null = null;

    const setFlipTheme = (v: number) => {
      section.style.setProperty("--flip-theme", v.toFixed(4));
      const root = document.documentElement;
      root.style.setProperty("--flip-theme", v >= 1 ? "1" : "0");
    };

    const setSwitch = (ty: number, scale: number, rotate: number) => {
      const sw = section.querySelector<HTMLElement>(".mode-switch-flip");
      if (!sw) return;
      sw.style.setProperty("--flip-translate-y", `${ty.toFixed(2)}vh`);
      sw.style.setProperty("--flip-scale", scale.toFixed(3));
      sw.style.setProperty("--flip-rotate", `${rotate.toFixed(2)}deg`);
    };

    const setThumb = (t: number) => {
      const sw = section.querySelector<HTMLElement>(".mode-switch-flip");
      sw?.style.setProperty("--thumb-follow", t.toFixed(3));
    };

    const setPaneY = (draftY: number, polishY: number) => {
      section.style.setProperty("--draft-pane-y", `${draftY.toFixed(2)}%`);
      section.style.setProperty("--polish-pane-y", `${polishY.toFixed(2)}%`);
    };

    const activate = (mode: "draft" | "polish", idx: number) => {
      const scope = mode === "draft" ? '[data-pane-mode="draft"]' : '[data-pane-mode="polish"]';
      section
        .querySelectorAll<HTMLElement>(`${scope} .scroll-tiles-word`)
        .forEach((w, k) => w.classList.toggle("is-active", k === idx));
      section
        .querySelectorAll<HTMLElement>(`${scope} .scroll-tiles-image`)
        .forEach((g, k) => g.classList.toggle("is-active", k === idx));
      const caps = Array.from(
        section.querySelectorAll<HTMLElement>(`${scope} .scroll-tiles-caption-live`),
      );
      const metas = mode === "draft" ? DRAFT : POLISH;
      caps.forEach((c) => {
        const text = metas[idx]?.meta ?? "";
        if (c.dataset.text === text) return;
        c.dataset.text = text;
        c.style.opacity = "0";
        setTimeout(() => {
          c.textContent = text;
          c.style.opacity = "1";
        }, 90);
      });
    };

    const update = () => {
      raf = 0;
      if (!desktop.matches) return;

      const rect = section.getBoundingClientRect();
      const prevMode = section.dataset.mode || "draft";
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(scrollable, -rect.top));
      const p = scrollable > 0 ? scrolled / scrollable : 0;

      if (p < DRAFT_END) {
        /* ---------------- DRAFT phase ---------------- */
        section.dataset.mode = "draft";
        if (snapFired) {
          // scrolled back before the flip: reset the snap state
          snapFired = false;
          setSnapPhase("none");
          section.classList.remove("is-revealing-polish");
          setFlipTheme(0);
          setSwitch(100, 0.35, -5);
          setThumb(0);
          setPaneY(0, 100);
          document.body.classList.remove("is-section-dark");
        }
        const local = p / DRAFT_END;
        const idx = Math.min(DRAFT.length - 1, Math.floor(local * DRAFT.length));
        activate("draft", idx);
        // word track drifts up as steps advance (last step keeps center)
        const drift = Math.min(1, local) * 22;
        section.style.setProperty("--tiles-track-y", `${drift.toFixed(1)}svh`);
      } else if (p < SNAP_THRESHOLD) {
        /* ---------------- FLIP phase ----------------- */
        section.dataset.mode = "flip";
        const sub = (p - DRAFT_END) / (SNAP_THRESHOLD - DRAFT_END);
        // draft pane exits upward through the first part of the flip
        const paneExit = Math.min(1, sub / PANE_EXIT_SUB_END);
        setPaneY(-paneExit * 100, 100);
        // switch entrance completes alongside the pane exit
        const entrance = Math.min(1, sub / ENTRANCE_SUB_END);
        const eased = easeOutCubic(entrance);
        setSwitch(100 * (1 - eased), 0.35 + 0.65 * eased + 0.05 * Math.max(0, sub - ENTRANCE_SUB_END), -5 * (1 - eased));
        // thumb tension builds across the whole flip zone (ease-out)
        setThumb(THUMB_AT_SNAP * easeOutCubic(sub));
        // the curtain dims scroll-by-scroll during the build-up
        setFlipTheme(Math.min(0.45, sub * 0.45));
        if (snapFired) {
          snapFired = false;
          setSnapPhase("none");
          section.classList.remove("is-revealing-polish");
        }
      } else {
        /* ---------------- SNAP + POLISH -------------- */
        section.dataset.mode = "polish";
        if (!snapFired) {
          snapFired = true;
          setFlipTheme(1);
          document.body.classList.add("is-section-dark");
          // panes swap: draft stays gone, polish slides up into place
          setPaneY(-100, 0);
          // timed spring: thumb snaps home, then the switch flies out
          setSnapPhase("spring");
          const t1 = setTimeout(() => {
            setSnapPhase("dismiss");
            section.classList.add("is-revealing-polish");
          }, SNAP_SPRING_HOLD_MS);
          const t2 = setTimeout(() => setSnapPhase("done"), SNAP_SPRING_HOLD_MS + SNAP_DISMISS_MS);
          timers.current.push(t1, t2);
        }
        const local = Math.max(0, Math.min(1, (p - SNAP_THRESHOLD) / (POLISH_ITEMS_END - SNAP_THRESHOLD)));
        const idx = Math.min(POLISH.length - 1, Math.floor(local * POLISH.length));
        activate("polish", idx);
        const drift = local * 26;
        section.style.setProperty("--tiles-track-y", `${drift.toFixed(1)}svh`);
        if (p >= POLISH_ITEMS_END) {
          // tail: release the dark header as the section leaves
          if (rect.bottom < window.innerHeight * 0.6) {
            document.body.classList.remove("is-section-dark");
          }
        }
      }

      // reverse boundary smoothing (observed 850ms class toggle)
      if (p < DRAFT_END && prevMode === "polish") {
        section.classList.add("is-reversing-from-polish");
        if (reverseTimer) clearTimeout(reverseTimer);
        reverseTimer = setTimeout(
          () => section.classList.remove("is-reversing-from-polish"),
          REVERSE_TRANSITION_MS,
        );
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    if (reduce.matches) {
      // reduced motion: static polish state, no dark flip
      setFlipTheme(0);
      activate("draft", 0);
      return;
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove("is-section-dark");
      document.documentElement.style.removeProperty("--flip-theme");
    };
  }, []);

  const wordClick = (mode: "draft" | "polish", idx: number) => {
    if (mode === "draft") {
      const step = DRAFT_END / DRAFT.length;
      scrollToProgress(step * (idx + 0.5));
    } else {
      const span = POLISH_ITEMS_END - SNAP_THRESHOLD;
      const step = span / POLISH.length;
      scrollToProgress(SNAP_THRESHOLD + step * (idx + 0.5));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-tiles"
      id="studio-capabilities"
      aria-label="Product capabilities"
      style={{
        ["--draft-pane-y" as string]: "0%",
        ["--polish-pane-y" as string]: "100%",
        ["--flip-theme" as string]: 0,
        ["--tiles-track-y" as string]: "0svh",
      }}
    >
      {/* ---------- Desktop sticky stage ---------- */}
      <div className="scroll-tiles-stage">
        {/* LEFT panel: draft text | polish visuals */}
        <div className="scroll-tiles-panel" data-panel="left">
          <div className="scroll-tiles-pane" data-pane-mode="draft">
            <div className="scroll-tiles-copy">
              <div className="scroll-tiles-track" data-pane="left-draft">
                <h2 className="scroll-tiles-kicker">Everything you need</h2>
                <div className="scroll-tiles-list" role="group" aria-label="Drafting capabilities">
                  <div className="scroll-tiles-section-marker is-draft" aria-hidden="true">
                    <svg className="scroll-tiles-section-marker-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M4.07 0.8h10.28c.19 0 .34.15.34.34v2.6M4.07 0.8H1.14c-.19 0-.34.15-.34.34v2.93M4.07 0.8v3.28m0 0H0.8m3.27 0v3.26m0-3.26h3.27M0.8 4.08v10.27c0 .19.15.34.34.34h2.59M4.07 7.34H2.84m1.23 0v2.45m0 0H2.84m1.23 0v2.45m0 0H2.84m4.5-7.72v2.89m0 2.9v2.89m-1.45-4.34H6.52m6.52 0H9.31m4.34 0h-2.89"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="label-name">Drafting</span>
                  </div>
                  {DRAFT.map((cap, i) => (
                    <span
                      key={cap.word}
                      className={"scroll-tiles-word" + (i === 0 ? " is-active" : "")}
                      data-step={i}
                      data-mode="draft"
                      role="button"
                      tabIndex={0}
                      onClick={() => wordClick("draft", i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") wordClick("draft", i);
                      }}
                    >
                      {cap.word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-tiles-pane" data-pane-mode="polish" data-has-visual>
            <div className="scroll-tiles-visual" aria-live="polite">
              {POLISH.map((cap, i) => (
                <figure key={cap.word} className={"scroll-tiles-image" + (i === 0 ? " is-active" : "")} data-step={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cap.img} alt={cap.alt} loading="lazy" decoding="async" width={1200} height={1600} />
                  <figcaption className="scroll-tiles-image-meta">{cap.meta}</figcaption>
                </figure>
              ))}
            </div>
            <p className="scroll-tiles-caption-live" data-caption-pane="polish-left" aria-live="polite">
              {POLISH[0].meta}
            </p>
          </div>
        </div>

        {/* RIGHT panel: draft visuals | polish text */}
        <div className="scroll-tiles-panel" data-panel="right">
          <div className="scroll-tiles-pane" data-pane-mode="draft" data-has-visual>
            <div className="scroll-tiles-visual" aria-live="polite">
              {DRAFT.map((cap, i) => (
                <figure key={cap.word} className={"scroll-tiles-image" + (i === 0 ? " is-active" : "")} data-step={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cap.img} alt={cap.alt} loading="lazy" decoding="async" width={1200} height={1600} />
                  <figcaption className="scroll-tiles-image-meta">{cap.meta}</figcaption>
                </figure>
              ))}
            </div>
            <p className="scroll-tiles-caption-live" data-caption-pane="draft-right" aria-live="polite">
              {DRAFT[0].meta}
            </p>
          </div>
          <div className="scroll-tiles-pane" data-pane-mode="polish">
            <div className="scroll-tiles-copy">
              <div className="scroll-tiles-track" data-pane="right-polish">
                <div className="scroll-tiles-list" role="group" aria-label="Polishing capabilities">
                  <div className="scroll-tiles-section-marker is-polish" aria-hidden="true">
                    <svg className="scroll-tiles-section-marker-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M8 1.5c.8 5 2 6.2 7 7-5 .8-6.2 2-7 7-.8-5-2-6.2-7-7 5-.8 6.2-2 7-7Z"
                        stroke="currentColor"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="label-name">Polishing</span>
                  </div>
                  {POLISH.map((cap, i) => (
                    <span
                      key={cap.word}
                      className={"scroll-tiles-word" + (i === 0 ? " is-active" : "")}
                      data-step={i}
                      data-mode="polish"
                      role="button"
                      tabIndex={0}
                      onClick={() => wordClick("polish", i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") wordClick("polish", i);
                      }}
                    >
                      {cap.word}
                    </span>
                  ))}
                </div>
                <p className="scroll-tiles-footer">in a single connected environment</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Flip overlay: the mode switch ---------- */}
        <div className="scroll-tiles-flip-overlay" aria-hidden="true">
          <span
            className={
              "mode-switch mode-switch-flip is-drafting" +
              (snapPhase === "spring" || snapPhase === "dismiss" || snapPhase === "done" ? " is-polish" : "") +
              (snapPhase === "dismiss" || snapPhase === "done" ? " is-snapping-out" : "")
            }
            aria-hidden="true"
          >
            <span className="mode-switch-thumb" aria-hidden="true" />
            <span className="mode-switch-btn btn-drafting" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4.07 0.8h10.28c.19 0 .34.15.34.34v2.6M4.07 0.8H1.14c-.19 0-.34.15-.34.34v2.93M4.07 0.8v3.28m0 0H0.8m3.27 0v3.26m0-3.26h3.27M0.8 4.08v10.27c0 .19.15.34.34.34h2.59M4.07 7.34H2.84m1.23 0v2.45m0 0H2.84m1.23 0v2.45m0 0H2.84m4.5-7.72v2.89m0 2.9v2.89m-1.45-4.34H6.52m6.52 0H9.31m4.34 0h-2.89"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="mode-switch-btn btn-polish" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5c.8 5 2 6.2 7 7-5 .8-6.2 2-7 7-.8-5-2-6.2-7-7 5-.8 6.2-2 7-7Z" stroke="currentColor" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </div>
      </div>

      {/* ---------- Mobile: two snap carousels ---------- */}
      <div className="scroll-tiles-mobile-ui" aria-hidden="false">
        {(
          [
            ["Drafting", DRAFT, mobileDraft, setMobileDraft, "is-draft"],
            ["Polishing", POLISH, mobilePolish, setMobilePolish, "is-polish"],
          ] as const
        ).map(([label, caps, idx, setIdx, markerClass]) => (
          <div key={label} className="mobile-story-section" data-mode={label.toLowerCase()}>
            <div className={"scroll-tiles-section-marker " + markerClass}>
              <svg className="scroll-tiles-section-marker-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                {markerClass === "is-draft" ? (
                  <path d="M4.07 0.8h10.28c.19 0 .34.15.34.34v2.6M4.07 0.8H1.14c-.19 0-.34.15-.34.34v2.93M4.07 0.8v3.28m0 0H0.8m3.27 0v3.26m0-3.26h3.27M0.8 4.08v10.27c0 .19.15.34.34.34h2.59M4.07 7.34H2.84m1.23 0v2.45m0 0H2.84m1.23 0v2.45m0 0H2.84m4.5-7.72v2.89m0 2.9v2.89m-1.45-4.34H6.52m6.52 0H9.31m4.34 0h-2.89" stroke="currentColor" strokeLinecap="round" />
                ) : (
                  <path d="M8 1.5c.8 5 2 6.2 7 7-5 .8-6.2 2-7 7-.8-5-2-6.2-7-7 5-.8 6.2-2 7-7Z" stroke="currentColor" strokeLinejoin="round" />
                )}
              </svg>
              <span className="label-name">{label}</span>
            </div>
            <div className="mobile-story-viewport">
              <div className="mobile-story-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
                {caps.map((cap) => (
                  <figure key={cap.word} className="mobile-story-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cap.img} alt={cap.alt} loading="lazy" decoding="async" />
                    <figcaption>
                      <strong>{cap.word}</strong>
                      <span>{cap.meta}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="mobile-carousel-dots" role="group" aria-label={`${label} capabilities`}>
              {caps.map((cap, i) => (
                <button
                  key={cap.word}
                  type="button"
                  className={"mobile-carousel-dot" + (i === idx ? " is-active" : "")}
                  aria-label={cap.word}
                  onClick={() => setIdx(i)}
                >
                  <span className="sr-only">{cap.word}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
