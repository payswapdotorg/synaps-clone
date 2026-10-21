import type { Metadata } from "next";
import { FaqList, PageHero, SectionHead } from "@/components/site/blocks";
import { CtaBand } from "@/components/site/blocks";

/**
 * FAQ — questions transcribed from the harvest; answers condensed and
 * original. Layout follows the analysed page: two-column split with the
 * section title on the left and the accordion on the right.
 */

const FAQS = [
  {
    q: "What does Synaps actually replace?",
    a: "The drafting-and-presentation slice of an architectural toolchain: 2D plan production, light 3D visualisation, markup and client-ready output. It sits between a pure 2D CAD editor and a full BIM platform, and imports the files those tools produce.",
  },
  {
    q: "Can I open my DWG, DXF, or Revit files?",
    a: "DXF imports directly and stays editable. DWG and Revit files arrive through conversion (Pro unlocks the full pipeline), and image or PDF plans can be traced into editable geometry with the tracer. In the clone these pipelines are simulated and clearly labelled.",
  },
  {
    q: "How does team collaboration work?",
    a: "A team shares a workspace with spaces, models and pages; invitations go out by email, and everyone with access can co-edit. Viewers and reviewers are free — only active editors count against plan seats.",
  },
  {
    q: "What does Pro vs Studio actually unlock?",
    a: "Pro lifts the Freemium limits (unlimited models, pages and libraries, 10 editors, 4,500 rolling-over credits, DXF and watermark-free export, hot servers). Studio raises editors to 50, removes the credit cap and adds personal support and a data-training opt-out.",
  },
  {
    q: "Is there a free trial?",
    a: "Freemium is permanent rather than a trial — 300 signup credits plus 30 a day, with no card required. Paid plans are month-to-month, so trying Pro is a reversible step.",
  },
  {
    q: "Do you offer education or non-profit pricing?",
    a: "Students and educators can stay on Freemium indefinitely, and verified institutions get preferential Pro terms on request.",
  },
  {
    q: "How do you handle data security and ownership?",
    a: "Your drawings stay yours: export any time, in open formats where the plan allows. The clone stores everything locally in your browser as part of its simulation, and the real product's arrangements are summarised on the privacy page.",
  },
  {
    q: "What does support look like?",
    a: "Free plans use the documentation and FAQ; Pro adds priority channels; Studio adds a personal support contact. The cal.com booking link on the analysed site is mirrored here as the Book a call button.",
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions we hear most often, answered.",
};

export default function FaqPage() {
  return (
    <main id="content">
      <PageHero
        eyebrow="FAQ"
        title="Questions we hear"
        dim="most often."
      />
      <section
        className="ms-container"
        style={{ paddingBottom: "clamp(56px, 7vw, 100px)" }}
      >
        <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <SectionHead
            title="Questions we hear"
            dim="most often."
            lead="Everything else — plans, formats, teams, support — in one place."
          />
          <FaqList items={FAQS} />
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
