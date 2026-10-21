"use client";

import Link from "next/link";
import { AppPage, SimNote } from "@/components/app/AppPage";

/**
 * /testing/onboarding — the observed internal testing route
 * (useOnboardingTestingAccess gates it in the real product). The clone
 * documents the harness honestly and links the wizard with a reset hint.
 */
export default function TestingOnboardingPage() {
  return (
    <AppPage
      section="home"
      title="Testing · onboarding"
      subtitle="Internal harness for stepping through the questionnaire"
    >
      <div className="space-y-4 text-sm text-content-secondary">
        <p>
          In the real product this route is gated by useOnboardingTestingAccess and lets the team
          step through onboarding states (fresh account, completed, skipped). The clone offers the
          equivalent local procedure:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Sign out (or clear the <code className="text-xs">synaps-clone:session</code> key in devtools).</li>
          <li>Run the wizard at <Link href="/onboarding" className="underline underline-offset-2">/onboarding</Link>.</li>
          <li>Finish lands on the team home with your answers stored in the simulated session.</li>
        </ol>
        <p>
          The full questionnaire transcription lives in{" "}
          <Link href="/onboarding-lab" className="underline underline-offset-2">the onboarding lab</Link>.
        </p>
      </div>
      <SimNote />
    </AppPage>
  );
}
