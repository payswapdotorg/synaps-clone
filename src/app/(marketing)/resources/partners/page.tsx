import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowCards,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { pageMeta } from "@/lib/seo";

/**
 * Partners page — "Become a partner", per the harvest outline.
 */

export const metadata: Metadata = pageMeta({
  title: "Become a partner",
  description: "Become a partner — refer, integrate, teach.",
  path: "/resources/partners",
});

const TRACKS = [
  {
    title: "Referral partners",
    body: "Practices and consultants who introduce Synaps to clients keep a share of the first year on referred subscriptions.",
  },
  {
    title: "Integration partners",
    body: "Tools that touch the plan — survey capture, specification, printing — plug into the import/export surface.",
  },
  {
    title: "Education partners",
    body: "Schools and programmes teach on Freemium and get preferential Pro terms for staff and studios.",
  },
];

export default function PartnersPage() {
  return (
    <main id="content">
      <PageHero
        title="Become a partner"
        lead="We work with a small number of partners, by application: technology and materials integrations, studio rollout programs, and the influencers and personalities who help architects find better tools."
      >
        <Link href="/faq" className="ms-btn">
          Book a call
        </Link>
      </PageHero>

      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-stack-40">
          <div className="ms-stack-24">
            <SectionHead title="Partner" dim="tracks." />
            <div className="ms-grid-3">
              {TRACKS.map((track) => (
                <article
                  key={track.title}
                  className="ms-card ms-card--hover"
                  style={{ padding: "24px 26px" }}
                >
                  <h3 className="ms-h3" style={{ fontSize: 18.5 }}>
                    {track.title}
                  </h3>
                  <p className="ms-body" style={{ margin: "10px 0 0" }}>
                    {track.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="ms-stack-24">
            <SectionHead title="Continue" dim="reading." />
            <ArrowCards
              items={[
                { label: "Pricing", href: "/pricing", note: "Freemium, Pro & Studio" },
                { label: "Solutions", href: "/solutions", note: "By type and by use case" },
                { label: "Documentation", href: "/docs", note: "Guides for every workflow" },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
