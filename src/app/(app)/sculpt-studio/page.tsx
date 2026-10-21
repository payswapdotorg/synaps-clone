"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppPage, SimNote } from "@/components/app/AppPage";

/**
 * /sculpt-studio — the observed design-system playground (sculpt-studio
 * chunk: control groups driving --sculpt--* CSS variables with live sliders).
 * The clone binds the same token families from its own design tokens.
 */

const GROUPS: { group: string; note: string; vars: { key: string; label: string; min: number; max: number; step: number; init: number }[] }[] = [
  {
    group: "All controls",
    note: "every control below, neutral and accent alike",
    vars: [
      { key: "--sculpt--edge", label: "Contact edge, bottom", min: 0, max: 0.2, step: 0.005, init: 0.06 },
      { key: "--sculpt--shadow", label: "Shadow beneath", min: 0, max: 0.3, step: 0.005, init: 0.08 },
    ],
  },
  {
    group: "Neutral controls",
    note: "secondary, input, dropdown, toggle, segment",
    vars: [
      { key: "--sculpt--neutral--raise", label: "Neutral raise", min: 0, max: 0.2, step: 0.005, init: 0.04 },
      { key: "--sculpt--neutral--press", label: "Neutral press", min: -0.1, max: 0.1, step: 0.005, init: -0.02 },
    ],
  },
  {
    group: "Accent chips",
    note: "primary, icon-only, selection, mode switch",
    vars: [
      { key: "--sculpt--accent--raise", label: "Accent raise", min: 0, max: 0.25, step: 0.005, init: 0.09 },
      { key: "--sculpt--accent--glow", label: "Accent glow", min: 0, max: 0.4, step: 0.01, init: 0.16 },
    ],
  },
];

export default function SculptStudioPage() {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const v: Record<string, number> = {};
    for (const g of GROUPS) for (const x of g.vars) v[x.key] = x.init;
    return v;
  });

  useEffect(() => {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(values)) root.style.setProperty(k, String(v));
    return () => {
      for (const k of Object.keys(values)) root.style.removeProperty(k);
    };
  }, [values]);

  function swatch(k: string) {
    if (k.includes("accent")) {
      const glow = values["--sculpt--accent--glow"] ?? 0.16;
      const raise = values["--sculpt--accent--raise"] ?? 0.09;
      return { boxShadow: `0 ${raise * 40}px ${glow * 80}px -${glow * 20}px rgba(26,115,232,${glow * 2})` };
    }
    const shadow = values["--sculpt--shadow"] ?? 0.08;
    const edge = values["--sculpt--edge"] ?? 0.06;
    return { boxShadow: `0 ${edge * 50}px ${shadow * 50}px -${shadow * 25}px rgba(0,0,0,${shadow * 2})` };
  }

  return (
    <AppPage
      section="sculpt-studio"
      title="Sculpt studio"
      subtitle="Design-token playground — sliders drive the --sculpt--* variables live"
      wide
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          {GROUPS.map((g) => (
            <section key={g.group} aria-label={g.group}>
              <h2 className="text-sm font-semibold text-content-primary">{g.group}</h2>
              <p className="text-[11px] text-content-secondary">{g.note}</p>
              <div className="mt-3 space-y-3">
                {g.vars.map((v) => (
                  <div key={v.key}>
                    <div className="flex items-center justify-between">
                      <label htmlFor={v.key} className="text-xs text-content-secondary">{v.label}</label>
                      <code className="text-[10px] text-content-secondary">{values[v.key].toFixed(3)}</code>
                    </div>
                    <input
                      id={v.key}
                      type="range"
                      min={v.min}
                      max={v.max}
                      step={v.step}
                      value={values[v.key]}
                      onChange={(e) => setValues({ ...values, [v.key]: Number(e.target.value) })}
                      className="mt-1 w-full"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="rounded-surface border border-border-solid/15 p-6">
          <h2 className="text-sm font-semibold text-content-primary">Preview</h2>
          <p className="mt-1 text-xs text-content-secondary">Controls react to the sliders above.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" className="rounded-control bg-content-primary px-4 py-2 text-sm font-medium text-content-inverted" style={swatch("accent")}>
              Primary
            </button>
            <button type="button" className="rounded-control border border-border-solid/20 bg-surface-base px-4 py-2 text-sm text-content-primary" style={swatch("neutral")}>
              Secondary
            </button>
            <input
              aria-label="Input preview"
              placeholder="Input"
              className="rounded-control border border-border-solid/20 bg-surface-base px-3 py-2 text-sm text-content-primary"
              style={swatch("neutral")}
            />
            <span className="rounded-pill border border-border-solid/20 px-3 py-1 text-xs text-content-secondary" style={swatch("accent")}>
              Selection chip
            </span>
          </div>
          <div className="mt-8 rounded-surface border border-border-solid/15 p-4" style={swatch("neutral")}>
            <p className="text-sm text-content-primary">Card surface</p>
            <p className="mt-1 text-xs text-content-secondary">Edge and shadow respond to the All-controls group.</p>
          </div>
        </div>
      </div>
      <SimNote>
        Educational clone — the real /sculpt-studio is an internal design-system playground whose
        slider groups (All controls / Neutral controls / Accent chips) were read from the
        production bundle; the token names and ranges here are the clone's own.
      </SimNote>
    </AppPage>
  );
}
