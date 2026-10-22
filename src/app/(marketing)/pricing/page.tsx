import type { Metadata } from "next";
import {
  ArrowCards,
  CompareTable,
  FaqList,
  PageHero,
  SectionHead,
} from "@/components/site/blocks";
import { JsonLd } from "@/components/site/JsonLd";
import { PricingCards } from "@/components/site/PricingCards";
import { faqPageLd, pageMeta, pricingProductLd } from "@/lib/seo";

/**
 * Pricing — content transcribed from the harvest (plan names, prices,
 * feature lines, compare rows, licensing table, FAQ questions). Body
 * prose condensed/original.
 */

const FAQS = [
  {
    q: "Is Freemium really free?",
    a: "Yes. Freemium stays free for individuals and students — 300 signup credits plus 30 per day, up to 3 models with 3 pages each, 3 editors and the limited libraries. No card is required. (The clone mirrors these entitlements in its simulated billing.)",
  },
  {
    q: "How does per-editor billing work?",
    a: "You are billed for active editors, monthly or annually. Viewers and reviewers never count as a seat, and you can add or remove editors as the team changes — the subscription follows the seats you actually use.",
  },
  {
    q: "What counts as an editor?",
    a: "Anyone who opens a model for editing. Commenting, reviewing and presenting a plan is free for anyone you share it with; only people who draft count.",
  },
  {
    q: "How do AI credits work on Pro?",
    a: "Pro includes 4,500 credits per month and unused credits roll over. Generation and polish actions spend credits; drafting itself never does. Studio removes the cap entirely.",
  },
  {
    q: "When does multi-office Enterprise come?",
    a: "Enterprise with multi-office management is on the roadmap. Until then studios with more than 50 editors can talk to the team about an arrangement — the clone links this to the partners page.",
  },
  {
    q: "Discounts for education?",
    a: "Yes — students and educators can work on Freemium indefinitely, and verified institutions get preferential Pro terms on request.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "Synaps Clone pricing — Freemium, Pro & Studio plans",
  absolute: true,
  description:
    "Freemium, Pro & Studio — per active editor, monthly or annual. Free for individuals and students.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="content">
      <JsonLd data={[pricingProductLd, faqPageLd(FAQS)]} />
      <PageHero
        title="Pricing, from solo drafter to studio."
        lead="Three plans. Free for individuals, monthly or annual for teams. Switch any time."
      />

      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(56px, 7vw, 96px)" }}
      >
        <PricingCards />
      </section>

      <section className="ms-container ms-section" style={{ paddingTop: 0 }}>
        <div className="ms-stack-32">
          <SectionHead title="Compare" dim="plans." />
          <p className="ms-body">
            Everything in Freemium is in Pro. Everything in Pro is in Studio.
          </p>
          <CompareTable
            head={["Feature", "Freemium", "Pro", "Studio"]}
            rows={[
              ["AI credits — signup credits", "300", "4,500 / month, rolls over", "Unlimited"],
              ["AI credits — daily credits", "30 / day", "–", "–"],
              ["Workspace — models", "3", "Unlimited", "Unlimited"],
              ["Workspace — pages", "3", "Unlimited", "Unlimited"],
              ["Workspace — editors", "3", "10", "50"],
              ["Workspace — libraries", "Limited", "Unlimited", "Unlimited"],
              ["Import & export — DXF import and export", "–", "●", "●"],
              ["Import & export — watermark-free export", "–", "●", "●"],
              ["Import & export — high-quality export", "–", "●", "●"],
              ["Performance — hot servers", "–", "●", "●"],
              ["Support — personal support", "–", "–", "●"],
              ["Data — opt out of data training", "–", "–", "●"],
            ]}
          />
        </div>
      </section>

      <section className="ms-hatch--soft" style={{ borderTop: "1px solid var(--ms-hairline)" }}>
        <div className="ms-container ms-section ms-stack-32">
          <SectionHead
            title="Synaps vs. legacy CAD"
            dim="licensing."
            lead="Revit and AutoCAD stopped selling perpetual licenses in 2016. Archicad ends them after 2026. The market now rents per named user on annual terms. Synaps prices the seats you actually use, and you can leave at renewal."
          />
          <CompareTable
            head={["", "Synaps", "Legacy CAD subscription"]}
            rows={[
              [
                "License unit",
                "Per active editor, billed monthly or annual",
                "Per named user, one license tied to one person",
              ],
              [
                "Entry point",
                "Free for individuals and students",
                "Paid from the first seat, no free tier",
              ],
              [
                "Ownership",
                "Subscription you can switch or cancel at renewal",
                "Subscription only, perpetual buy-out retired",
              ],
              [
                "Viewers and reviewers",
                "Included, never counted as a seat",
                "Every editor needs a paid named-user seat",
              ],
            ]}
          />
        </div>
      </section>

      <section className="ms-container ms-section">
        <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <SectionHead title="Pricing questions" dim="we hear." />
          <FaqList items={FAQS} />
        </div>
      </section>

      <section className="ms-container" style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}>
        <div className="ms-stack-24">
          <SectionHead title="Continue" dim="reading." />
          <ArrowCards
            items={[
              { label: "An alternative to Revit, AutoCAD, and SketchUp", href: "/news/alternative-to" },
              { label: "Release notes", href: "/news/changelog", note: "What changed, week by week" },
              { label: "Documentation", href: "/docs", note: "Guides for every workflow" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
