"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { activeTeam, addModel, loadSession, type SimSession, type SimTeam } from "@/lib/session";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { PUBLIC_TEMPLATES } from "@/lib/templates";

/**
 * /templates — the observed template gallery (templates.listPublic). Cards
 * link to /template/{templateId} for instantiation (instantiateTemplate).
 */
export default function TemplatesPage() {
  const [session, setSession] = useState<SimSession | null>(null);
  useEffect(() => setSession(loadSession()), []);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <Link href="/login" className="text-sm underline underline-offset-2">Sign in to browse templates</Link>
      </main>
    );
  }

  const team: SimTeam = activeTeam(session);

  return (
    <AppPage
      section="templates"
      title="Templates"
      subtitle="Starter plans — instantiate one into your team (simulated)"
      wide
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PUBLIC_TEMPLATES.map((t) => (
          <Link
            key={t.id}
            href={`/template/${t.id}`}
            className="rounded-surface border border-border-solid/15 bg-surface-base p-5 transition-colors hover:border-border-solid/40"
          >
            <span className="ds-accent-mono text-2xs">{t.category}</span>
            <span className="mt-1.5 block text-base font-medium text-content-primary">{t.name}</span>
            <span className="mt-1 block text-sm text-content-secondary">{t.description}</span>
            <span className="mt-3 block text-xs text-content-secondary">
              {t.rooms} rooms · {t.areaM2} m²
            </span>
          </Link>
        ))}
      </div>
      <SimNote>
        Educational clone — the gallery mirrors templates.listPublic from the production bundle;
        the template set is original artwork following the example-prompt themes observed there
        (Corner café, Townhouse, Courtyard house).
      </SimNote>
    </AppPage>
  );
}
