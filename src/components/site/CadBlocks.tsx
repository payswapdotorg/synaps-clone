/**
 * Original top-view CAD block symbols for the assets-library marquee.
 * Simple geometric outline drawings in the drafting idiom (plan-view
 * furniture), authored for the clone — the real library ships
 * thousands of production blocks.
 */

export type BlockKind =
  | "sofa"
  | "armchair"
  | "chaise"
  | "bed"
  | "tree"
  | "hedge"
  | "piano"
  | "dining"
  | "kitchen"
  | "sink";

const STROKE = "currentColor";

function sofa(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="3" />
      <rect x="8" y="8" width={w - 16} height={h * 0.32} rx="2" />
      <line x1="8" y1={h * 0.44} x2={w - 8} y2={h * 0.44} />
      <line x1={w / 2} y1={h * 0.44} x2={w / 2} y2={h - 8} />
    </g>
  );
}

function armchair(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="4" />
      <circle cx={w / 2} cy={h / 2} r={Math.min(w, h) * 0.26} />
    </g>
  );
}

function chaise(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="8" />
      <path d={`M ${w * 0.36} 6 L ${w * 0.36} ${h - 6}`} />
      <path d={`M ${w * 0.36} ${h * 0.42} q ${w * 0.24} 0 ${w * 0.24} ${h * 0.2}`} />
    </g>
  );
}

function bed(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="2" />
      <rect x="9" y="7" width={(w - 18) / 2 - 3} height={h * 0.3} rx="2" />
      <rect x={(w + 3) / 2 + 3} y="7" width={(w - 18) / 2 - 3} height={h * 0.3} rx="2" />
      <line x1="2" y1={h * 0.46} x2={w - 2} y2={h * 0.46} />
      <path d={`M 2 ${h - 2} q ${w * 0.18} -6 ${w * 0.2} 0`} />
    </g>
  );
}

function tree(w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.42;
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.3">
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.62} />
      <circle cx={cx} cy={cy} r={r * 0.28} />
      <path d={`M ${cx - r} ${cy} l ${r * 0.2} 0 M ${cx + r} ${cy} l ${-r * 0.2} 0 M ${cx} ${cy - r} l 0 ${r * 0.2} M ${cx} ${cy + r} l 0 ${-r * 0.2}`} />
    </g>
  );
}

function hedge(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.3">
      <rect x="3" y="3" width={w - 6} height={h - 6} rx="6" />
      <path
        d={`M 8 ${h * 0.28} q ${w * 0.1} ${-h * 0.1} ${w * 0.2} 0 t ${w * 0.2} 0 t ${w * 0.2} 0 t ${w * 0.2} 0`}
      />
      <path
        d={`M 8 ${h * 0.62} q ${w * 0.1} ${-h * 0.1} ${w * 0.2} 0 t ${w * 0.2} 0 t ${w * 0.2} 0 t ${w * 0.2} 0`}
      />
    </g>
  );
}

function piano(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <path d={`M 2 ${h - 2} L 2 10 Q 2 2 10 2 L ${w - 2} 2 L ${w - 2} ${h * 0.5} Q ${w * 0.5} ${h * 0.62} 2 ${h - 2} Z`} />
      <line x1={w * 0.18} y1="2" x2={w * 0.18} y2={h * 0.4} />
      <line x1={w * 0.46} y1="2" x2={w * 0.46} y2={h * 0.47} />
      <line x1={w * 0.74} y1="2" x2={w * 0.74} y2={h * 0.49} />
    </g>
  );
}

function dining(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <rect x={w * 0.18} y={h * 0.2} width={w * 0.64} height={h * 0.6} rx="3" />
      <circle cx={w * 0.5} cy={h * 0.1} r={Math.min(w, h) * 0.07} />
      <circle cx={w * 0.5} cy={h * 0.9} r={Math.min(w, h) * 0.07} />
      <circle cx={w * 0.08} cy={h * 0.5} r={Math.min(w, h) * 0.07} />
      <circle cx={w * 0.92} cy={h * 0.5} r={Math.min(w, h) * 0.07} />
    </g>
  );
}

function kitchen(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <path d={`M 2 2 L ${w - 2} 2 L ${w - 2} ${h * 0.72} L ${w * 0.4} ${h * 0.72} L ${w * 0.4} ${h - 2} L 2 ${h - 2} Z`} />
      <circle cx={w * 0.2} cy={h * 0.24} r={Math.min(w, h) * 0.09} />
      <circle cx={w * 0.56} cy={h * 0.24} r={Math.min(w, h) * 0.09} />
      <rect x="6" y={h * 0.8} width={w * 0.26} height={h * 0.14} rx="1" />
    </g>
  );
}

function sink(w: number, h: number) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="3" />
      <rect x={w * 0.22} y={h * 0.18} width={w * 0.56} height={h * 0.5} rx="3" />
      <circle cx={w * 0.5} cy={h * 0.43} r="2" />
      <line x1={w * 0.5} y1={h * 0.18} x2={w * 0.5} y2={h * 0.12} />
    </g>
  );
}

const RENDERERS: Record<BlockKind, (w: number, h: number) => React.ReactNode> = {
  sofa,
  armchair,
  chaise,
  bed,
  tree,
  hedge,
  piano,
  dining,
  kitchen,
  sink,
};

export function CadBlock({ kind, size = 96 }: { kind: BlockKind; size?: number }) {
  return (
    <svg
      viewBox="0 0 96 96"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {RENDERERS[kind](96, 96)}
    </svg>
  );
}

export const BLOCK_KINDS: BlockKind[] = [
  "sofa",
  "armchair",
  "chaise",
  "bed",
  "tree",
  "hedge",
  "piano",
  "dining",
  "kitchen",
  "sink",
];
