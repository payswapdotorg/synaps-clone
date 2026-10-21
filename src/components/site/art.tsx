/**
 * Original artwork for the marketing home — SVG/CSS pieces that recreate
 * the *motifs* observed on the analysed site (format chips on a dark
 * grid, a protractor-and-sheets technical drawing, sparkles on textured
 * paper, product mockups for the feature splits, an assets marquee).
 * Everything here is drawn from scratch; no served asset is copied.
 */

/* ------------------------------------------------------------------ */
/* Hero feature cards (01/03 … 03/03)                                  */
/* ------------------------------------------------------------------ */

function CardFrame({
  children,
  dark = false,
  ratio = "4 / 3",
  flush = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
  ratio?: string;
  flush?: boolean;
}) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        background: dark ? "#101318" : "#f3f0ec",
        borderRadius: flush ? 0 : 10,
        border: flush ? "none" : "1px solid rgba(8,9,11,0.10)",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** 01 — Import your CAD files: format chips flowing into a plan. */
export function ImportCardArt() {
  return (
    <CardFrame dark flush>
      <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="impx-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#impx-grid)" />
        {/* destination plan card */}
        <g transform="translate(228 78)">
          <rect width="130" height="150" rx="6" fill="#181d24" stroke="rgba(255,255,255,0.16)" />
          <path d="M18 20h60v40h-60z M92 20v40h20 M18 78h34v52 M64 78h48v24" fill="none" stroke="#7fb2e8" strokeWidth="2" />
          <path d="M52 60a14 14 0 0 1 14 14" fill="none" stroke="#7fb2e8" strokeWidth="1.4" />
          <circle cx="52" cy="60" r="2" fill="#7fb2e8" />
        </g>
        {/* source chips: tool monograms (original marks, not logos) */}
        {[
          { x: 34, y: 40, label: "R", sub: "Revit", w: 78 },
          { x: 18, y: 124, label: "A", sub: "AutoCAD", w: 86 },
          { x: 52, y: 206, label: "G", sub: "Archicad", w: 84 },
        ].map((chip) => (
          <g key={chip.sub} transform={`translate(${chip.x} ${chip.y})`}>
            <rect width={chip.w} height="46" rx="5" fill="#f6f7f9" />
            <text
              x="20"
              y="30"
              fontSize="17"
              fontWeight="700"
              fill="#101318"
              fontFamily="ui-monospace, monospace"
            >
              {chip.label}
            </text>
            <text
              x={chip.w - 10}
              y="30"
              textAnchor="end"
              fontSize="9.5"
              fill="rgba(8,9,11,0.55)"
              fontFamily="ui-monospace, monospace"
            >
              {chip.sub}
            </text>
          </g>
        ))}
        {/* flow arrows */}
        <path
          d="M118 63c40 6 70 22 104 44M92 145c34 0 74 10 130 32M122 225c30-8 62-24 100-46"
          fill="none"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
      </svg>
    </CardFrame>
  );
}

/** 02 — Draft with precision: protractor arcs, crosshair, sheet labels. */
export function PrecisionCardArt() {
  return (
    <CardFrame flush>
      <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* paper texture lines */}
        <rect width="400" height="300" fill="#f3f0ec" />
        <path d="M0 40h400M0 90h400M0 260h400" stroke="rgba(8,9,11,0.05)" />
        {/* protractor quarter arcs */}
        <g transform="translate(52 252)" stroke="#101318" fill="none">
          <path d="M0 0A190 190 0 0 1 190 0" strokeWidth="1.2" opacity="0.75" />
          <path d="M0 0A150 150 0 0 1 150 0" strokeWidth="1" opacity="0.5" />
          <path d="M0 0A110 110 0 0 1 110 0" strokeWidth="1" opacity="0.35" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (Math.PI / 2) * (i / 9);
            return (
              <line
                key={i}
                x1={Math.cos(a) * 190}
                y1={-Math.sin(a) * 190}
                x2={Math.cos(a) * 178}
                y2={-Math.sin(a) * 178}
                strokeWidth="1.4"
              />
            );
          })}
          <line x1="0" y1="0" x2="188" y2="0" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="0" y2="-188" strokeWidth="1.4" />
        </g>
        {/* faint plan behind */}
        <g stroke="rgba(16,96,192,0.5)" fill="none" strokeWidth="1.6" transform="translate(150 60)">
          <path d="M0 0h150v100H0z" />
          <path d="M60 0v44M110 44H60v56M0 60h40" />
        </g>
        {/* crosshair */}
        <g stroke="#101318" strokeWidth="1.2">
          <line x1="222" y1="96" x2="222" y2="126" />
          <line x1="207" y1="111" x2="237" y2="111" />
          <circle cx="222" cy="111" r="9" fill="none" />
        </g>
        {/* sheet labels */}
        {[
          { x: 316, y: 52, t: "X01" },
          { x: 344, y: 84, t: "X02" },
          { x: 316, y: 116, t: "X03" },
        ].map((l) => (
          <g key={l.t} transform={`translate(${l.x} ${l.y})`}>
            <rect x="-14" y="-11" width="28" height="22" fill="none" stroke="#101318" strokeWidth="1.1" />
            <text
              textAnchor="middle"
              y="4"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fill="#101318"
              letterSpacing="0.5"
            >
              {l.t}
            </text>
          </g>
        ))}
        {/* dimension line */}
        <g stroke="#101318" strokeWidth="1">
          <line x1="150" y1="200" x2="300" y2="200" />
          <line x1="150" y1="193" x2="150" y2="207" />
          <line x1="300" y1="193" x2="300" y2="207" />
        </g>
        <text x="225" y="192" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="#101318">
          4 200
        </text>
      </svg>
    </CardFrame>
  );
}

/** 03 — Design with AI: sparkles on warm textured paper. */
export function AICardArt() {
  return (
    <CardFrame flush>
      <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="ai-paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6ece7" />
            <stop offset="1" stopColor="#ecd9d0" />
          </linearGradient>
          <pattern id="ai-weave" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 6L6 0" stroke="rgba(8,9,11,0.035)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#ai-paper)" />
        <rect width="400" height="300" fill="url(#ai-weave)" />
        {/* single large four-point sparkle, centred */}
        <path
          d="M200 86c5 44 17 56 61 61-44 5-56 17-61 61-5-44-17-56-61-61 44-5 56-17 61-61Z"
          fill="#14151a"
        />
        {/* small companion sparkle, low-key */}
        <path
          d="M292 176c2.6 22 8.6 28 30 30-21.4 2-27.4 8-30 30-2.6-22-8.6-28-30-30 21.4-2 27.4-8 30-30Z"
          fill="#14151a"
          opacity="0.7"
        />
      </svg>
    </CardFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Feature-split mockups                                               */
/* ------------------------------------------------------------------ */

/** "Configurable elements" — a window/door style editor panel. */
export function ConfigPanelMockup() {
  const icons = [
    "M3 17h18M6 17v-4h5v4M14 17v-6h5v6", // window mullion
    "M4 18a8 8 0 0 1 16 0M12 10v8", // door swing
    "M5 19V5l14 14H5z", // triangle
    "M4 4h16v16H4z", // square
    "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM4 12h16M12 4v16", // circle cross
    "M4 18L18 4M6 4h12v12", // corner
    "M6 18c0-6 3-12 6-12s6 6 6 12H6z", // arch
    "M4 8h16M4 8l8 10 8-10", // roofline
  ];
  return (
    <div
      className="ms-card"
      style={{ borderRadius: 14, boxShadow: "0 24px 60px rgba(8,9,11,0.10)", overflow: "hidden" }}
    >
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--ms-hairline)" }}>
        <span className="ms-label">Style editor</span>
        <span style={{ fontSize: 12.5, color: "var(--ms-muted)" }}>(simulated)</span>
      </div>
      <div className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <label className="ms-label" htmlFor="cfg-type">Type</label>
          <div
            id="cfg-type"
            className="flex items-center justify-between gap-6 rounded-[3px] border px-3 py-2 text-[13.5px]"
            style={{ borderColor: "var(--ms-border-visible)", minWidth: 150 }}
          >
            Right hung <span aria-hidden>▾</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {icons.map((d, i) => (
            <div
              key={i}
              className="grid aspect-square place-items-center rounded-[3px] border"
              style={{
                borderColor: i === 1 ? "var(--ms-draft)" : "var(--ms-border)",
                background: i === 1 ? "rgba(16,96,192,0.06)" : "#fff",
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={i === 1 ? "#1060c0" : "rgba(8,9,11,0.55)"} strokeWidth="1.4" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Height", "2.100 m"],
            ["Width", "0.900 m"],
            ["Frame width", "0.050 m"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[3px] border px-3 py-2" style={{ borderColor: "var(--ms-border)" }}>
              <div className="ms-label" style={{ fontSize: 9 }}>{label}</div>
              <div className="text-[13.5px]" style={{ color: "var(--ms-ink)" }}>{value}</div>
            </div>
          ))}
        </div>
        <div className="ms-btn ms-btn--sm mt-4 w-full">Create style</div>
      </div>
    </div>
  );
}

/** "Floor plan generator" — drafting-blue plan with a generating overlay. */
export function GeneratorMockup() {
  return (
    <div
      className="ms-card"
      style={{ borderRadius: 14, boxShadow: "0 24px 60px rgba(8,9,11,0.10)", overflow: "hidden" }}
    >
      <div
        className="relative"
        style={{ aspectRatio: "16 / 10", background: "#fbfcfe" }}
      >
        <svg viewBox="0 0 480 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <g stroke="#1060c0" fill="none" strokeWidth="2" strokeLinejoin="round">
            <path d="M70 40h340v220H70z" />
            <path d="M240 40v120M70 160h170M310 160v100M240 160h70" />
            <path d="M70 96a56 56 0 0 1 56 64" strokeDasharray="none" />
            <path d="M240 160a44 44 0 0 1 44-44" />
          </g>
          {/* furniture outlines */}
          <g stroke="rgba(16,96,192,0.55)" fill="none" strokeWidth="1.4">
            <rect x="90" y="52" width="70" height="26" rx="4" />
            <rect x="90" y="190" width="44" height="60" rx="4" />
            <rect x="330" y="52" width="60" height="30" rx="4" />
            <circle cx="150" cy="215" r="16" />
          </g>
        </svg>
        {/* generating overlay */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="flex items-center gap-3 rounded-[8px] border bg-white px-4 py-3"
            style={{ borderColor: "var(--ms-border)", boxShadow: "0 12px 32px rgba(8,9,11,0.10)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: "ms-spin 1s linear infinite" }}>
              <circle cx="8" cy="8" r="6.5" fill="none" stroke="rgba(8,9,11,0.15)" strokeWidth="2" />
              <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" fill="none" stroke="#1060c0" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[13.5px]" style={{ color: "var(--ms-ink-soft)" }}>
              Generating floorplan<span className="ms-ellipsis">…</span>
            </span>
          </div>
        </div>
        {/* prompt bar */}
        <div
          className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[8px] border bg-white px-3.5 py-2.5"
          style={{ borderColor: "var(--ms-border)", boxShadow: "0 8px 22px rgba(8,9,11,0.08)" }}
        >
          <span style={{ fontSize: 13, color: "var(--ms-muted)" }} aria-hidden>
            ✦
          </span>
          <span className="text-[13.5px]" style={{ color: "var(--ms-ink-soft)" }}>
            Generate a floorplan
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[11.5px]"
            style={{ background: "rgba(16,96,192,0.09)", color: "#1060c0" }}
          >
            2 bedroom apartment
          </span>
          <span
            className="ml-auto grid h-7 w-7 place-items-center rounded-full text-white"
            style={{ background: "#1060c0", fontSize: 13 }}
            aria-hidden
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assets marquee                                                      */
/* ------------------------------------------------------------------ */

const SWATCH_ROWS: { name: string; kind: "hatch" | "wood" | "tile" | "fabric" }[][] = [
  [
    { name: "Hatch 45°", kind: "hatch" },
    { name: "Oak", kind: "wood" },
    { name: "Grid tile", kind: "tile" },
    { name: "Linen", kind: "fabric" },
    { name: "Crosshatch", kind: "hatch" },
    { name: "Walnut", kind: "wood" },
  ],
  [
    { name: "Sofa 3-seat", kind: "fabric" },
    { name: "Bed 160", kind: "fabric" },
    { name: "Dining 6", kind: "tile" },
    { name: "Concrete", kind: "hatch" },
    { name: "Terrazzo", kind: "tile" },
    { name: "Ash", kind: "wood" },
  ],
];

function Swatch({ name, kind }: { name: string; kind: string }) {
  return (
    <div
      className="ms-card"
      style={{ width: 168, flex: "none", borderRadius: 8, overflow: "hidden" }}
    >
      <div style={{ height: 96, background: "#fff", position: "relative" }}>
        {kind === "hatch" && (
          <div className="ms-hatch" style={{ position: "absolute", inset: 14, border: "1px solid var(--ms-border)" }} />
        )}
        {kind === "wood" && (
          <svg viewBox="0 0 168 96" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M0 ${16 + i * 17}q42 ${i % 2 ? 7 : -7} 84 0t84 0`}
                stroke="rgba(120,80,40,0.35)"
                strokeWidth={i % 2 ? 2.4 : 1.4}
                fill="none"
              />
            ))}
          </svg>
        )}
        {kind === "tile" && (
          <div
            style={{
              position: "absolute",
              inset: 14,
              backgroundImage:
                "linear-gradient(rgba(8,9,11,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,11,0.16) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              border: "1px solid var(--ms-border)",
            }}
          />
        )}
        {kind === "fabric" && (
          <svg viewBox="0 0 168 96" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path
              d="M34 48h72M46 30h48M46 66h48M110 40v16M30 40v16"
              stroke="rgba(8,9,11,0.4)"
              strokeWidth="1.6"
              fill="none"
            />
            <rect x="24" y="30" width="12" height="36" rx="5" fill="none" stroke="rgba(8,9,11,0.4)" />
          </svg>
        )}
      </div>
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ borderTop: "1px solid var(--ms-hairline)" }}
      >
        <span style={{ fontSize: 12.5, fontWeight: 520 }}>{name}</span>
        <span className="ms-label" style={{ fontSize: 8.5 }}>
          {kind}
        </span>
      </div>
    </div>
  );
}

export function AssetsMarquee() {
  return (
    <div className="ms-stack-16" style={{ overflow: "hidden" }}>
      {SWATCH_ROWS.map((row, ri) => (
        <div key={ri} className="ms-marquee-track" data-reverse={ri % 2 ? "true" : undefined}>
          {[...row, ...row].map((s, i) => (
            <Swatch key={`${s.name}-${i}`} {...s} />
          ))}
        </div>
      ))}
    </div>
  );
}
