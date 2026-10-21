"use client";

/**
 * AssetsLibrary — the “Hatches, materials, blocks. Native.” band.
 *
 * Observed on synaps.app: two horizontal tracks of asset cards that pan
 * in OPPOSITE directions, bound to scroll progress through the section
 * (`--assets-progress` 0→1; left track drifts further left, right track
 * drifts right). Cards alternate photographic material crops and plan-view
 * CAD block symbols. Original implementation; the material photos and
 * block drawings are original placeholder assets.
 */

import { useEffect, useRef } from "react";
import { BLOCK_KINDS, CadBlock, type BlockKind } from "./CadBlocks";

const MATERIALS = [
  { name: "Wood — Oak", img: "/images/site/lib/wood-crop.jpg" },
  { name: "Concrete", img: "/images/site/lib/concrete-crop.jpg" },
  { name: "Grass", img: "/images/site/lib/grass-crop.jpg" },
  { name: "Pavement", img: "/images/site/lib/pavement-crop.jpg" },
  { name: "Roofing", img: "/images/site/lib/roofing-crop.jpg" },
  { name: "Tiles", img: "/images/site/lib/tiles-crop.jpg" },
  { name: "Pavement 02", img: "/images/site/lib/pavement-02-crop.jpg" },
];

const BLOCK_NAMES: Record<BlockKind, string> = {
  sofa: "Sofa 3-seat",
  armchair: "Armchair",
  chaise: "Chaise lounge",
  bed: "Bed 160",
  tree: "Tree canopy",
  hedge: "Hedge",
  piano: "Grand piano",
  dining: "Dining 6",
  kitchen: "Kitchen layout",
  sink: "Bathroom sink",
};

type Card =
  | { type: "material"; name: string; img: string }
  | { type: "block"; name: string; kind: BlockKind };

function buildRow(offset: number): Card[] {
  const cards: Card[] = [];
  const n = 16;
  for (let i = 0; i < n; i++) {
    const j = i + offset;
    if (j % 2 === 0) {
      const m = MATERIALS[(j / 2) % MATERIALS.length];
      cards.push({ type: "material", name: m.name, img: m.img });
    } else {
      const kind = BLOCK_KINDS[Math.floor(j / 2) % BLOCK_KINDS.length];
      cards.push({ type: "block", name: BLOCK_NAMES[kind], kind });
    }
  }
  return cards;
}

function AssetCard({ card }: { card: Card }) {
  return (
    <div className="assets-library-card">
      <div className="assets-library-card-image">
        {card.type === "material" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.img} alt={card.name} loading="lazy" decoding="async" />
        ) : (
          <span className="assets-library-card-block">
            <CadBlock kind={card.kind} size={92} />
          </span>
        )}
      </div>
      <span className="assets-library-card-name">{card.name}</span>
    </div>
  );
}

export function AssetsLibrary() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const wh = window.innerHeight || 800;
      /* progress 0 when the section top hits the viewport bottom,
         1 when the section bottom reaches the viewport top. */
      const total = rect.height + wh;
      const passed = wh - rect.top;
      let p = passed / total;
      if (!Number.isFinite(p)) p = 0;
      p = Math.max(0, Math.min(1, p));
      section.style.setProperty("--assets-progress", p.toFixed(4));
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

  return (
    <div className="assets-library-rows" ref={sectionRef as React.RefObject<HTMLDivElement>}>
      <div className="assets-library-row" data-track="left">
        <div className="assets-library-track" data-track="left">
          {buildRow(0).map((card, i) => (
            <AssetCard key={`L${i}`} card={card} />
          ))}
        </div>
      </div>
      <div className="assets-library-row" data-track="right">
        <div className="assets-library-track" data-track="right">
          {buildRow(3).map((card, i) => (
            <AssetCard key={`R${i}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
