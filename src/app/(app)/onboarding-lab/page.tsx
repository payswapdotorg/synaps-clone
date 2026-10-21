"use client";

import Link from "next/link";
import { AppPage, SimNote } from "@/components/app/AppPage";
import { ONBOARDING_STEPS } from "@/lib/onboarding-steps";

/**
 * /onboarding-lab — the observed internal lab route. In the real product it
 * previews onboarding artwork/steps; the clone lists the verbatim step set
 * with quick links into the wizard.
 */
export default function OnboardingLabPage() {
  return (
    <AppPage
      section="home"
      title="Onboarding lab"
      subtitle="The eight-step questionnaire, verbatim from the production bundle"
      wide
    >
      <ol className="space-y-3">
        {ONBOARDING_STEPS.map((s, i) => (
          <li key={s.id} className="rounded-surface border border-border-solid/15 p-4">
            <span className="ds-accent-mono text-2xs">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-1 block text-sm font-medium text-content-primary">{s.title}</span>
            <span className="mt-0.5 block text-xs text-content-secondary">
              {s.options?.map((o) => o.label).join(" · ")}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <Link
          href="/onboarding"
          className="rounded-control px-4 py-2 text-sm font-medium text-accent-solid-foreground"
          style={{ background: "var(--accent--solid)" }}
        >
          Run the wizard
        </Link>
      </div>
      <SimNote>
        Educational clone — the real /onboarding-lab is an internal preview harness; the step set
        above was transcribed verbatim from the production bundle.
      </SimNote>
    </AppPage>
  );
}
