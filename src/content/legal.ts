import type { LegalDoc } from "./types";

/**
 * Legal pages.
 *
 * PROVENANCE: page titles and section headings are transcribed from the
 * harvest of /privacy /terms /cookies /imprint; every paragraph is
 * original and explicitly non-authoritative — the clone renders a
 * notice saying so on each legal page.
 */

export const privacyDoc: LegalDoc = {
  title: "How we handle your data.",
  lead: "How we use information to run and improve Synaps, and how you can control its use.",
  sections: [
    { h3: "About this notice", paras: ["This page mirrors the section structure of the analysed site's privacy notice. The clone stores no server-side personal data at all — everything lives in your browser's local storage."] },
    { h3: "Information needed to provide Synaps", paras: ["An account in the real product needs an email address and your chosen workspace details. The clone's simulated sign-in stores a name and email locally and never transmits them."] },
    { h3: "Understanding and improving the product", paras: ["The analysed product uses optional analytics to understand feature usage. The clone has no analytics; the cookie banner's choice is stored locally as a simulation."] },
    { h3: "Improving AI features", paras: ["Where AI features run, inputs may be used to improve models unless you opt out (Studio plans in the real product include an opt-out). The clone's AI surfaces are labelled simulations."] },
    { h3: "Keeping Synaps reliable", paras: ["Operational logs keep the service available and diagnose faults. The clone runs entirely in your browser and writes nothing to any server."] },
    { h3: "Website measurement and advertising", paras: ["The real site uses optional analytics cookies (Google, PostHog) and advertising cookies (Google, Meta). The clone sets none — its banner records your preference locally."] },
    { h3: "Emails, support and product communications", paras: ["Transactional email covers invitations and account actions; product news is opt-in. The clone sends no email — invitations in the simulated team flow are local records."] },
    { h3: "Why we process this information", paras: ["To provide the service, keep it working, and — with consent — understand and improve it."] },
    { h3: "The providers that help us", paras: ["A production SaaS uses hosting, email and analytics providers under data-processing agreements. The clone has no providers; it is a static client-side application."] },
    { h3: "How long information is kept", paras: ["Real-product retention follows the purpose of each data class. In the clone, everything is deletable by clearing your browser storage."] },
    { h3: "Your choices and rights", paras: ["Depending on your jurisdiction you can access, export, correct or delete your data. In the clone that power is literal: the data is yours, in your browser."] },
    { h3: "Security, age and changes", paras: ["The analysed product uses transport encryption and access control; the clone relies on the browser sandbox. Neither surface is intended for users below the standard digital-consent age, and changes to this page would be announced there."] },
  ],
};

export const termsDoc: LegalDoc = {
  title: "The terms that apply.",
  lead: "The contractual terms that cover use of Synaps, billing, content ownership, fair use, and liability.",
  sections: [
    { h3: "About these terms", paras: ["These terms would govern use of the service. This clone renders the structure for study; nothing here forms an agreement with anyone."] },
    { h3: "Your account", paras: ["You are responsible for your account's use and for keeping credentials safe. The clone's accounts are simulated and local to your browser."] },
    { h3: "Acceptable use", paras: ["Don't use the service to break the law or anyone's drawing. In the clone, the most damage possible is to your own localStorage."] },
    { h3: "Your content", paras: ["Your drawings remain yours. The analysed product exports in open formats so leaving is possible; the clone keeps everything client-side by construction."] },
    { h3: "Plans, billing and cancellation", paras: ["Freemium is free; Pro and Studio bill per active editor monthly or annually and can be cancelled at renewal. The clone's billing page simulates all of this with local records and a SYNAPS-CLONE promo code."] },
    { h3: "Service availability", paras: ["The real product targets high availability with weekly release notes documenting reliability work. The clone ships as a static study artefact with no uptime promise."] },
    { h3: "Liability", paras: ["A real terms page limits liability. This one just notes that a study clone is provided as-is, for education."] },
    { h3: "Changes and contact", paras: ["Terms may change with notice. Questions go to the legal contact on the imprint page."] },
  ],
};

export const cookiesDoc: LegalDoc = {
  title: "Cookies and similar technologies.",
  lead: "How Synaps uses cookies and similar technologies across the website and product.",
  sections: [
    { h3: "Overview", paras: ["The real site uses cookies for necessary functions and, with consent, for analytics and advertising. The clone sets no cookies at all and stores your banner choice in localStorage."] },
    { h3: "What are cookies?", paras: ["Small strings a site asks your browser to keep and re-send. They power sessions and preferences; the clone uses the browser's localStorage for the same jobs without cookies."] },
    { h3: "Why do we use cookies?", paras: ["Necessary cookies keep the product working; optional ones measure and improve it. On the analysed site those optional categories come from Google, PostHog and Meta."] },
    { h3: "Necessary cookies", paras: ["Required for the site to work. Always on — in the real product these cover sign-in and drawing storage access."] },
    { h3: "Performance and functionality cookies", paras: ["Remember choices (units, theme) and collect aggregate performance data. The clone remembers those in localStorage."] },
    { h3: "Analytics cookies", paras: ["Help understand and improve Synaps. Declined by default in the clone's simulated banner unless you accept."] },
    { h3: "Advertising cookies", paras: ["Let the analysed site measure ads and show them to the right people. Never present in the clone."] },
    { h3: "How can I control cookies?", paras: ["The banner offers Manage, Reject all and Accept all; browser settings can clear cookies and site data any time — which in the clone also resets your simulated session."] },
    { h3: "What about other tracking technologies?", paras: ["Web beacons and pixels can accompany emails and pages. The clone sends no email and embeds no pixels."] },
    { h3: "Do you serve targeted advertising?", paras: ["The analysed site's advertisers may, with consent. The clone serves no advertising of any kind."] },
    { h3: "How often will this policy be updated?", paras: ["When the cookie population changes — the real site would announce it; the clone updates when its simulation does."] },
    { h3: "Where can I get further information?", paras: ["From the imprint page's contact details in the real product; from this repository's README in the clone."] },
  ],
};

export const imprintDoc: LegalDoc = {
  title: "Imprint.",
  lead: "Company information and legal disclosures under §5 ECG and the Austrian Media Act (Mediengesetz).",
  sections: [
    { h3: "Media owner and publisher", paras: ["The analysed site publishes under a company registration in the European Union. This clone is an unaffiliated study project and publishes nothing."] },
    { h3: "Company register", paras: ["The real product's register number and court would be listed here. The clone has no company."] },
    { h3: "Management", paras: ["The real listing names the managing directors. The clone credits its reverse-engineering analysis in ANALYSIS.md."] },
    { h3: "Contact", paras: ["The real imprint lists a postal and email address. For the clone, the README and repository issues are the contact."] },
    { h3: "Business purpose", paras: ["Browser-based architectural drafting and presentation software. The clone reproduces the surface for educational study."] },
    { h3: "Online dispute resolution", paras: ["EU platforms host ODR for consumer disputes. Not applicable to a study clone, but the section appears on the analysed imprint."] },
  ],
};
