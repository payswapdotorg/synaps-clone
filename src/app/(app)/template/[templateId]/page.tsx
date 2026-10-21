"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, addModel, loadSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { templateById } from "@/lib/templates";

/**
 * /template/{templateId} — template detail + instantiation
 * (templates.getById / prepareSourceAccess / instantiateTemplate).
 */
export default function TemplateDetail({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const [session, setSession] = useState<SimSession | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void params.then((p) => setId(p.templateId));
    setSession(loadSession());
  }, [params]);

  const template = id ? templateById(id) : undefined;

  if (!session || !id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in</Link>
      </main>
    );
  }

  if (!template) {
    return (
      <AppPage section="templates" title="Template not found">
        <p className="text-sm text-content-secondary">
          No such template. <Link href="/templates" className="underline underline-offset-2">Back to the gallery</Link>
        </p>
      </AppPage>
    );
  }

  const team: SimTeam = activeTeam(session);
  const tpl = template;

  function instantiate() {
    setBusy(true);
    setTimeout(() => {
      const { model } = addModel(loadSession() as SimSession, {
        teamId: team.id,
        name: tpl.name,
        source: "template",
        fromTemplateId: tpl.id,
      });
      window.location.href = `/m/${model.id}?pageId=${model.pages[0].id}&demo=1&tpl=${tpl.id}`;
    }, 500);
  }

  return (
    <AppPage section="templates" title={template.name} subtitle={template.description} wide>
      <div className="grid gap-8 md:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Starter plan</h2>
          <svg
            viewBox="-1 -1 22 14"
            className="mt-3 w-full rounded-surface border border-border-solid/15 bg-[var(--surface--canvas, #EBEDEF)]"
            role="img"
            aria-label={`Plan sketch of the ${template.name} template`}
          >
            {template.shapes.map((s, i) => {
              if (s.kind === "room") {
                return (
                  <g key={i}>
                    <rect x={s.x} y={s.y * 0.6} width={s.w} height={s.h * 0.6} fill="none" stroke="#101314" strokeWidth="0.06" />
                    <text x={s.x + 0.15} y={s.y * 0.6 + 0.5} fontSize="0.45" fill="#5a6165">{s.label}</text>
                  </g>
                );
              }
              if (s.kind === "wall") {
                return <line key={i} x1={s.a.x} y1={s.a.y * 0.6} x2={s.b.x} y2={s.b.y * 0.6} stroke="#101314" strokeWidth="0.12" />;
              }
              return null;
            })}
          </svg>
          <p className="mt-3 text-xs text-content-secondary">
            {template.rooms} rooms · {template.areaM2} m² · {template.category}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">Use this template</h2>
          <p className="mt-2 text-sm text-content-secondary">
            Instantiating copies the starter plan into {team.name} as a new model you can edit
            (templates.prepareSourceAccess → instantiateTemplate, simulated).
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={instantiate}
            className="mt-4 w-full rounded-control px-4 py-2 text-sm font-medium text-accent-solid-foreground disabled:opacity-60"
            style={{ background: "var(--accent--solid)" }}
          >
            {busy ? "Instantiating…" : "Use template"}
          </button>
          <p className="mt-3 text-[11px] text-content-secondary">
            {team.models.length >= team.entitlements.maxModels
              ? "Note: you are at the model limit — the Free-plan modal will offer an upgrade."
              : "Creates one model in the current space."}
          </p>
        </div>
      </div>
      <SimNote />
    </AppPage>
  );
}
