# Synaps Clone (beta.synaps.app)

An original-code reimplementation of the Synaps product UI (beta.synaps.app),
built from a REA-assisted analysis of the **public** surface only.

**This is an educational clone. It is not affiliated with, endorsed by, or
connected to Synaps. All product names, trademarks and copy belong to their
respective owners.** No Synaps source code is used — every file here is written
from scratch from publicly observable UI structure. The only third-party code
in this repository is the npm dependency tree; no scraped assets, images, fonts,
or bundles are committed.

---

## What this is

A faithful *design-system and IA* reconstruction of a CAD/architectural drafting
product, derived from a reverse-engineering analysis of its public marketing
site, its public stylesheet, and literal route strings recovered from its
public JavaScript bundle.

The real product sits behind a **Google-SSO-only** sign-in wall. No credentials
were used, so **no authenticated screen was ever seen**. Everything behind that
wall in this clone is an honest reconstruction from recorded path strings and
recorded copy — clearly labelled as such on the page itself.

---

## The full product journey (authenticated surface)

After a full static REA pass over the production bundle
(`docs/REMAINING-FUNCTIONALITIES.md`), the clone now covers the complete
functionality surface, not just the observed UX:

1. **Sign in** (`/login`) — “Continue with Google” opens a clearly labelled
   mock account chooser (no real Google integration; the session is local).
2. **Onboarding** (`/onboarding`) — the eight-question series transcribed
   verbatim from the original product’s bundle.
3. **Team home** (`/t/{teamId}`) — “What are we creating today?”, continue
   working, credits, and the Free-plan model limit.
4. **CAD console** (`/m/{modelId}`) — Layers/Assets dock, Canvas settings,
   status bar, floating tool palette and an original interactive floor-plan
   editor: draw walls, place doors and windows on them, stamp rooms with
   live area labels, dimensions, text, asset stamps; select/move, delete,
   undo/redo, zoom/pan, grid snap, m/ft unit switching, plan export — plus
   multi-page models, the import suite (image/PDF/SVG/DXF/DWG with
   simulated worker pipelines), the export suite (DXF placeholder, site
   plan with papers/delivery modes/watermark), presentation mode, phone
   handover, a simulated magnetic lasso, and a draft/polish mode switch
   with material rendering and sunlight control.
5. **App surface** — /recent, /members (roles, seat-charge preview),
   /invitations + /invite/{token} accept flow, /billing (plans, simulated
   checkout, invoices, promo), /notifications, /settings (profile, team,
   consent, the verbatim feature-flag registry), /storage, /templates +
   /template/{id} with instantiation, /credits-banners, /admin,
   /sculpt-studio, /register, /onboarding-lab, /testing/onboarding.

The simulated tRPC layer (`src/lib/trpc-sim.ts`) mirrors every procedure
name recovered from the production bundle against localStorage — no
network, no servers, clearly labelled.

See ANALYSIS.md “Authenticated surface” for how each piece was observed and
what is simulated.

## Quick start

```bash
bun install
bun run dev        # http://localhost:3000
```

Production build:

```bash
bun install
bun run build      # NODE_ENV=production next build
bun run start      # NODE_ENV=production next start
```

Quality gates:

```bash
bun run typecheck    # tsc --noEmit
bun run check:links  # every internal href must resolve to a real route
bun run check:quality # both of the above
```

Requires Node 18+ (developed on Node 24) and Bun (developed on Bun 1.3.14).

---

## What the clone implements

**100+ routes** across ~60 route files — the full marketing site (all 77
harvested synaps.app paths + the GitBook-style docs section) and the
reconstructed authenticated-app surface. A full per-route manifest with
provenance markers lives in [`docs/ROUTES.md`](docs/ROUTES.md); the
main-domain parity lane is documented in
[`docs/SITE-PARITY-PLAN.md`](docs/SITE-PARITY-PLAN.md).

### Public / marketing (mirrors synaps.app)

| Area | Routes |
|---|---|
| Home + demo | `/` (synaps.app-style rebuild), `/demo` |
| Auth | `/login`, `/register`, `/recovery`, `/dev-login` |
| Pricing | `/pricing` — Freemium €0 · Pro €59/49 · Studio €119/99, monthly/annual toggle, compare tables |
| Solutions | `/solutions` + 10 detail pages (`/solutions/architecture-studio`, `/solutions/space-visualization`, …) |
| “Alternative to …” | `/news/alternative-to` + `/news/alternative-to/{archicad,autocad,bricscad,revit,sketchup,vectorworks}` |
| Blog | `/news/blog` + 29 article pages |
| Release notes | `/news/changelog` + 14 dated entries (typed New/Improved/Fixed items) |
| Company & careers | `/company` + 5 role pages under `/company/careers/…` |
| FAQ & partners | `/faq`, `/resources/partners` |
| Legal | `/cookies`, `/privacy`, `/terms`, `/imprint` |
| Documentation | `/docs` + 20 GitBook-style guide pages (`/docs/drafting`, `/docs/ai-workflows/brief-to-editable-plan`, …) |

The marketing chrome matches the analysed main domain: sticky light
header with Solutions/Alternative-to dropdowns and the Documentation↗
link, dark CTA footer with Product/Company/Legal columns, and the
bottom-left cookie-consent banner (simulated — no real cookies).

### Reconstructed authenticated app (22)

`/project` · `/recent` · `/templates` · `/onboarding` · `/onboarding-lab` ·
`/testing/onboarding` · `/sculpt-studio` · `/vector` · `/storage` ·
`/storage/raster-upload` · `/components` · `/config` · `/settings` · `/billing` ·
`/credits-banners` · `/members` · `/invitations` · `/notifications` · `/admin` ·
`/replay` · `/dev-login`

All of these render inside a shared app shell (`src/components/app/AppShell.tsx`)
with the product / canvas / library / settings navigation the analysis recorded,
and every one of them states on-page that it is a reconstruction.

### Design system

The full token system was lifted out of the real stylesheet and re-implemented
as Tailwind v4 CSS variables in `src/app/globals.css`:

- **Accent palettes** — blue, orange, crimson, purple, rose, each 50→950
- **Drafting-surface family** — canvas, crosshair, dot grid, guide lines,
  fuchsia snap guides, glass badges
- **Semantic layer** — surface / content / border sets in light and dark
- **Radii** — `element` 2px → `pill` 100px
- **Type** — `--font-sans`, `--font-mono`, and the display serif
- **Theming** — `.theme--light-neutral` / `.theme--dark-neutral`,
  `[data-theme=light|dark]`, the `[data-redesign]` switch, and separate
  **draft** vs **polish** accent palettes

A sweep in Milestone 6 confirmed **zero raw hex values remain in `src/`** outside
the token definitions themselves.

### Interactive demo

`/demo` is the clone's own multi-step flow, modelled on the PRODUCT FLOW
section of the analysis:

**Source → Configure → Processing → Draft → Polish → Deliver**

It is a real client-side state machine (`src/lib/demo-state.ts`) with a typed
step/action model, per-step validation, and a `derive` layer that recomputes
downstream state when inputs change. The plan canvas and axonometric room scene
are original inline SVG.

---

## What is simulated

This is important, so it is stated plainly:

| Area | Reality |
|---|---|
| **Auth** | `/login` shows a Google-only sign-in screen, but the button **does nothing** — there is no OAuth flow, no Supabase session, and no server. |
| **`/dev-login`** | A clone-only route so the reconstructed app shell is reachable. It grants **no** session and posts **nowhere**. |
| **All app data** | Obviously-demo fixtures (`src/lib/app-routes.ts`, `src/lib/site-content.ts`). No real user, project, file, member, credit balance or geometry is presented as real. |
| **Demo generation** | The “generate / trace” step is a deterministic local mock. No AI, no network. |
| **Upload** | The raster-upload drop zone is inert. Nothing is uploaded. |
| **Comparisons** | “Alternative to …” pages carry the observed product names and feature-area rows, but the vendor comparison columns are intentionally **empty** — the real data was never observed. |
| **Pricing** | Tier **structure** only. No figures were ever captured, so none are invented. |
| **Network** | The clone makes **no** API calls at all — no tRPC, no Supabase, no external requests. The only outbound links are two intentionally external ones (`cal.com` booking, `docs.synaps.app`). |
| **Assets** | Every graphic is original hand-authored SVG or CSS. Nothing was scraped or traced from the original site. |

---

## Limitations carried from the analysis

These are inherited from `ANALYSIS.md` and remain **true of this clone**:

1. **The authenticated app was never observed.** Sign-in is Google-SSO-only and
   no credentials were used. Every in-app screen is *reconstructed*, not verified.
2. **Google-SSO-only surface.** Email/password exists in the real product’s
   Supabase client but is not surfaced on the observed login page — unconfirmed.
3. **Real data was never seen.** No project, file, credit balance, member list or
   real geometry was loaded. All API knowledge was limited to status-code probing
   (401 / 405 / 404) on a handful of paths plus the public `/trpc/health`.
4. **The second tRPC namespace remains un-enumerated.** Only `storage.list`,
   `layout.trace` and `layout.generate` were probed. The larger namespace found
   in the bundle is a known, still-open gap. The clone implements none of it.
5. **Bundle findings are string-level, not semantic.** Route candidates were
   extracted as literal path strings and may include static-asset paths,
   internal endpoints or test fixtures rather than navigable routes.
6. **CSS-derived components are structural, not visual.** Class and token names
   are reliable; rendered appearance was never screenshot-verified in the app.
7. **Marketing copy is a separate surface.** The app may use different
   terminology for the same features.
8. **`.rea/` assets stay local and are never committed.** The 5.2 MB bundle,
   534 KB stylesheet and 660 KB marketing capture are evidence only, excluded
   via `.gitignore`, so no third-party code or copyrighted content enters this
   repository. Only original analysis and original clone code are committed.

### Known divergences from the captured site

- **Trailing slashes.** The captured IA used trailing-slash URLs (`/pricing/`,
  `/solutions/precise-drafting/`). The clone stores canonical trailing-slash-free
  paths, so no link depends on a redirect. Full mapping table in `docs/ROUTES.md`.
- **`--material--*` token family.** Added in Milestone 6 to replace raw hex
  swatches in the demo. These are **clone-authored** values, not observed ones.
- **Google brand mark.** Replaced with a neutral original glyph, to avoid
  reproducing a third-party trademark.

---

## Repository layout

```
ANALYSIS.md              the honest REA (public surface; limits stated up front)
docs/ROUTES.md           per-route manifest with observed-vs-reconstructed provenance
scripts/check-links.mjs   link-integrity gate (fails on any dead internal href)
src/app/                 App Router: 39 route files + globals.css
src/components/
  Nav.tsx Footer.tsx     shared shell
  icons.tsx              original inline SVG icon set
  landing/               landing sections
  marketing/             marketing pages + shared marketing UI
  app/                   authenticated-app shell + reconstructed screens
  demo/                  demo flow: stepper, panels, plan canvas, room scene
src/lib/                 navigation, site copy, route manifest, demo state machine
.rea/                    local-only evidence (gitignored, never committed)
```

---

## Milestones

| # | Commit | Subject |
|---|---|---|
| — | `0ab6c60` | seed: repo init with honest README + gitignore |
| 1 | `0c2ff20` | M1: REA analysis of beta.synaps.app public surface |
| 2 | `5655b8f` | M2: scaffold with design tokens from analysis |
| 3 | `6d2324e` | M3: landing page from analysis |
| 4 | `2dceb8b` | M4: interactive demo flow |
| 5 | `5d2a6e8` | M5: remaining pages per route map |
| 6 | `be541c9` | M6: quality pass (build green) |
| 7 | *this commit* | M7: delivery (final README + honest limitations) |

---

*Educational reimplementation for study purposes. Not affiliated with Synaps.
Contains no Synaps code, assets, or credentials.*
