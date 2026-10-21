# synaps.app main-domain parity plan

Status: EXECUTING (Task 35). Source of truth: a fresh harvest of the live
production site (see "Evidence" below). This document supersedes the marketing
assumptions in `REMAINING-FUNCTIONALITIES.md`, which were derived from the
beta app bundle only.

## Why this lane exists

Task 34 achieved parity with **beta.synaps.app** (the signed-in Vite SPA).
The operator then compared the clone against **https://synaps.app** — the
main production domain — and found (a) many features missing and (b) the
sites do not look similar. Recon confirmed both:

- `synaps.app` is a **different surface** from `beta.synaps.app`: a
  server-rendered marketing website (77 sitemap URLs) plus a GitBook
  documentation site at `docs.synaps.app` (~21 pages).
- The clone's marketing group was placeholder-era: generic shadcn-style
  chrome, a single landing page, and ~11-line stub pages rendering
  "reconstruction notice" content.

## Evidence

- `/tmp/synaps-sitemap.xml` — 77 URLs (harvested 2026-10-21).
- `/tmp/synaps-site/pages/*.html` — full HTML of all 77 pages.
- `/tmp/synaps-site/docs/*.html` — 21 GitBook pages.
- `/tmp/synaps-shots/*.png` — viewport screenshots (home ×4, pricing,
  solutions, solution page, blog, changelog, faq, company, docs, beta
  login) + VLM design analyses (`/tmp/vlm-*.json`).
- Design tokens extracted from the served CSS (see §Design system).

## Inventory (everything the main domain serves that the clone lacked)

| Group | Pages | Notes |
| --- | --- | --- |
| Home | `/` | Two-col hero, feature cards, testimonial + manifesto, feature splits, "Everything you need", materials band |
| Solutions | `/solutions/` + 10 | hub "By type" / "By use case"; each page: features, comparison table, cross-links, FAQs |
| Pricing | `/pricing/` | Freemium €0 · Pro €59/49 · Studio €119/99, monthly/annual toggle, compare table, licensing, FAQs |
| FAQ | `/faq/` | 8 accordion Q&As, 2-col layout |
| Company | `/company/` + 5 careers | about + role pages (what/stack/bring/nice-to-have/process/perks/apply) |
| Blog | `/news/blog/` + 27 posts | full article pages |
| Changelog | `/news/changelog/` + 14 | monthly groups; typed items (New/Improved/Fixed) |
| Alternative to | `/news/alternative-to/` + 6 | archicad, autocad, bricscad, revit, sketchup, vectorworks |
| Partners | `/resources/partners/` | become-a-partner page |
| Legal | `/privacy/ /terms/ /cookies/ /imprint/` | sectioned prose pages |
| Docs | `docs.synaps.app` × 21 | get-started, drafting, ai-workflows, import/export, visualize, collaborate, assets, billing, reference, video tutorials |
| Chrome | nav + footer + cookie banner | nav: Solutions, Documentation↗, Blog, Alternative to, Pricing, Login. Dark footer w/ CTA + Product/Company/Legal. Cookie consent bottom-left |

## Design system (extracted)

- Font: `"Suisse Int'l", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
  Helvetica, Arial, sans-serif` (declared as-is; the commercial face falls
  back to the system stack — same behavior as the real site).
- Light theme: `--bg #F8F9FB`, `--border #DCE0E5`, `--border-visible #D2D7DD`;
  dark footer `#0F0F0E` with `--footer-line rgba(8,9,11,.075)` hairlines.
- Accents: Draft blue `#1060C0`, Polish orange `#ff6a00`.
- Container: `max-width 1320px`, pad 24–32px. Ease `cubic-bezier(.16,1,.3,1)`.
- Micro-labels: 9–10px uppercase, letter-spacing .12–.14em.
- Motifs: hairline rules, drafting hatches, dot grids, watermark feature
  names, arrow (→) link cards, black primary buttons / outlined secondary,
  sharp corners on imagery, +/− accordion affordances.

## Implementation plan (F7–F12)

- **F7 Foundation**: marketing-scoped tokens + fonts; `SiteHeader` (real IA),
  `SiteFooter` (dark CTA + columns), `CookieBanner` (ties into the existing
  simulated consent store); shared primitives (PageHero, FaqAccordion,
  ArrowCards, CtaBand, Prose, FeatureSplit, CompareTable).
- **F8 Home**: full rebuild per §Inventory.
- **F9 Templates + content**: typed content modules under `src/content/`
  (headings/prices/names transcribed from the harvest; body copy condensed
  + original — provenance rules in each module header); templates for
  solution/blog/changelog/alt-to/career/legal/pricing/faq/partners.
- **F10 Docs**: GitBook-style `/docs` section with sidebar + 21 pages.
- **F11 App side**: login panel contrast + realistic right-side app mockup,
  Google-blue CTA, spacing pass.
- **F12 Gates**: cold build, lint, check-links, E2E golden path, deploy,
  production verification, ANALYSIS.md/README updates.

## Provenance rules for this lane

- Route paths, page titles, section headings, plan names/prices, FAQ
  questions and other short factual strings are transcribed from the
  harvest so the clone's IA matches the analysed surface.
- Body copy is **original condensed text** conveying the same information —
  no bulk verbatim reproduction of marketing prose.
- All artwork (feature cards, mockups, logo mark) is original SVG/CSS
  inspired by the analysed motifs; no served assets are copied.
- Docs content is original step-by-step text following the harvested
  heading outlines.
