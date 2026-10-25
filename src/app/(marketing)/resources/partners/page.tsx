import type { Metadata } from "next";
import {
  ArrowCards,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { PartnersForm } from "@/components/site/PartnersForm";
import { VideoStage } from "@/components/site/VideoStage";
import { pageMeta } from "@/lib/seo";

/**
 * Partners page — "Become a partner", transcribed from the live site
 * (27 Oct harvest): hero + enquiry form (name / organisation / email /
 * website / partner-type menu / message / consent), crosslinks, and the
 * pre-footer video stage. The live form posts to #enquiry; the clone
 * renders a success state (disclosed clone-original behavior).
 */

export const metadata: Metadata = pageMeta({
  title: "Become a partner",
  description:
    "Become a partner — technology and materials integrations, studio rollout programs, and the influencers and personalities who help architects find better tools.",
  path: "/resources/partners",
});

export default function PartnersPage() {
  return (
    <main id="content">
      <PageHero
        title="Become a partner"
        lead="We work with a small number of partners, by application: technology and materials integrations, studio rollout programs, and the influencers and personalities who help architects find better tools. Tell us what you build or the audience you reach, and we reply when there is a clear fit. EU-first, selective intake."
      />

      <section
        className="ms-container"
        style={{ paddingBlock: "clamp(112px, 8.75vw, 126px)" }}
      >
        <PartnersForm />
      </section>

      <section
        className="ms-container"
        style={{ paddingBlock: "clamp(112px, 8.75vw, 126px)" }}
      >
        <div className="ms-stack-24">
          <SectionHead title="Continue" dim="reading." />
          <ArrowCards
            items={[
              {
                label: "Company",
                href: "/company",
                note: "Team, manifesto, and open roles",
              },
              {
                label: "Blog",
                href: "/news/blog",
                note: "Longer reads on product and practice",
              },
              {
                label: "Documentation",
                href: "https://docs.synaps.app",
                note: "API and product reference",
              },
            ]}
          />
        </div>
      </section>

      <VideoStage />
    </main>
  );
}
