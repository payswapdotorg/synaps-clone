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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/site/cad-textured-grid.jpg"
        alt="Textured CAD grid canvas"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.92)" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 10,
          padding: 18,
        }}
      >
        {["DXF", "PDF", "Revit", "AutoCAD", "ArchiCAD"].map((fmt) => (
          <span
            key={fmt}
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "#f4f6f8",
              background: "rgba(16,19,24,0.72)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 4,
              padding: "5px 9px",
            }}
          >
            {fmt}
          </span>
        ))}
      </div>
    </CardFrame>
  );
}

/** 02 — Draft with precision: protractor arcs, crosshair, sheet labels. */
export function PrecisionCardArt() {
  return (
    <CardFrame flush>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/site/precise-drafting.jpg"
        alt="Dimensioned floor plan detail being drafted"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </CardFrame>
  );
}

/** 03 — Design with AI: sparkles on warm textured paper. */
export function AICardArt() {
  return (
    <CardFrame dark flush>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/site/design-with-ai.jpg"
        alt="AI generating an architectural floor plan"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
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
