# ANALYSIS.md — REA of `beta.synaps.app` (public surface)

**Subject:** `beta.synaps.app` — a browser-based architectural drafting / floor-plan studio.
**Milestone:** 1 of 7 · **Method:** Reverse Engineering Analysis (REA) of the public, unauthenticated surface.
**Evidence base (local, never committed):** `.rea/index.css` (534 KB real stylesheet), `.rea/index.js` (5.2 MB code-split app bundle), `.rea/marketing.html` (660 KB captured marketing site).
**Standing:** Educational clone. Original code only. Not affiliated with, endorsed by, or connected to Synaps.

---

## ROUTE MAP

### Observed live (unauthenticated)

| Method | Route | Result | Notes |
|---|---|---|---|
| GET | `/` | 302 → `/login?redirectTo=%2F` | Root is gated; the `redirectTo` param preserves the intended destination. |
| GET | `/login` | 200, public | Google-SSO-only sign-in screen. Copy: “Welcome back”, “Sign in to continue to Synaps”, “Continue with Google”. Footer links out to `www.synaps.app/terms/` and `synaps.app/privacy/`. |
| GET | `/register` | 200, public | Registration is a public entry point (bundle confirms `signInWithOAuth` + register error strings). |
| GET | `api.synaps.app/trpc/health` | 200, public | Health check is unauthenticated. |

### Marketing-site IA (from `.rea/marketing.html`)

| Path | Title / role |
|---|---|
| `/` | Marketing home — “Synaps, Architectural Practice without the compromise” |
| `/pricing/` | Pricing |
| `/company/` | Company — “About Synaps” |
| `/solutions/` | Solutions hub — “By use case” / “By type” |
| `/solutions/architecture-studio/` | Architecture Studio |
| `/solutions/automated-floor-plan-tracing/` | Automated floor plan tracing |
| `/solutions/client-collaboration/` | Client collaboration |
| `/solutions/floor-plan-generation/` | Floor plan generation |
| `/solutions/freelancers-and-homeowners/` | Freelancers & homeowners |
| `/solutions/interior-designers/` | Interior Designers |
| `/solutions/precise-drafting/` | Precise drafting |
| `/solutions/real-estate-professionals/` | Real Estate Professionals |
| `/solutions/space-visualization/` | Space visualization |
| `/solutions/students-and-educators/` | Students & educators |
| `/news/blog/`, `/news/changelog/` | Blog, Release notes |
| `/news/alternative-to/{archicad,autocad,bricscad,revit,sketchup,vectorworks}/` | “Alternative to …” comparison pages |
| `/resources/partners/` | Partners |
| `/faq/`, `/cookies/`, `/privacy/`, `/terms/`, `/imprint/` | Legal / footer |
| `https://docs.synaps.app` | Docs (external) |
| `https://cal.com/kevin-cobaj/30min` | “Book a call” (external) |
| `https://beta.synaps.app/register` | On-site CTA → app register |

### Authenticated app — route candidates extracted from `.rea/index.js`

Recovered as literal path strings in the bundle. These are **candidates**, grouped by what the surrounding code implies; the app itself was never observed behind the wall.

| Candidate | Implied role |
|---|---|
| `/onboarding`, `/onboarding-lab`, `/testing/onboarding` | First-run onboarding flows |
| `/project/`, `/recent` | Project workspace + recents list |
| `/templates` | Template gallery |
| `/settings` | User settings |
| `/billing`, `/credits-banners` | Credits / billing / usage banners |
| `/members`, `/invitations/`, `/notifications`, `/admin` | Team / admin surface |
| `/sculpt-studio` | “Sculpt studio” mode |
| `/vector`, `/storage`, `/storage/raster-upload` | Document + asset layer |
| `/components`, `/config`, `/replay/`, `/recovery`, `/dev-login`, `/e/`, `/i/`, `/s/`, `/_protected` | Support, internal/debug and protected-route scaffolding |

Bundle paths that are almost certainly **not** page routes (kept separate for accuracy): `/trpc`, `/api/broadcast`, `/outbox/commit`, `/outbox/upload-url`, `/i/v1/logs`, `/i/v1/metrics`, `/ph-stats/`, `/static/`, `/__assets/`, `/array/`, `/person/`, `/iceberg`.

---

## NAVIGATION

**Marketing site (`.rea/marketing.html`)**

- Top nav groups: **Product** (Drafting, Polishing, Spatial visualization), **Solutions**, **Pricing**, **Company**, plus auth actions **Log in** / **Login** and the primary CTA **Start designing free**.
- Footer groups: **Product**, **Company**, **Legal**, **Resources** (Blog, Release notes, Partners, Documentation), **By type** (ArchiCAD, AutoCAD, BricsCAD, Revit, SketchUp, Vectorworks), **By use case** (Architectural practice, Architecture Studio, Interior Designers, Real Estate Professionals, Free-lancers & homeowners, Students & educators).
- Footer utility: Cookie policy / Cookie settings / Accept all / Accept / Reject all / Necessary / Manage / Analytics / Advertising / “Helps us understand and improve Synaps.” / “Lets us measure our ads and show them to the right people.”
- Section anchors in the home page: `#icon-mode-draft`, `#icon-mode-polish`, `#icon-N` (icon grid).
- Two external destinations recur: `https://beta.synaps.app` and `https://beta.synaps.app/register`.

**App (inferred from bundle, unverified):** the marketing site links into `beta.synaps.app`, whose `/` bounces to `/login?redirectTo=%2F`, so the intended post-login landing is the project/workspace root. `/_protected` in the bundle suggests a protected-route wrapper convention. **Treat the in-app navigation graph as inferred.**

---

## DESIGN TOKENS

Real values extracted from `.rea/index.css`.

### Accent palettes

```
--accent--blue--50  #eef5ff   --accent--blue--100  #d8e8ff   --accent--blue--200  #aed0ff
--accent--blue--300 #6ba5f5   --accent--blue--400  #1573e5   --accent--blue--500  #1060c0
--accent--blue--600 #0c4993   --accent--blue--700  #083469   --accent--blue--800  #052143
--accent--blue--900 #031224   --accent--blue--950  #020a15

--accent--orange--50 #fff3eb  --accent--orange--100 #ffe3d0  --accent--orange--200 #ffc49e
--accent--orange--300 #ff9e63 --accent--orange--400 #e56a12  --accent--orange--500 #c7560a
--accent--orange--600 #974108 --accent--orange--700 #6b2e06 --accent--orange--800 #441d04
--accent--orange--900 #240f02 --accent--orange--950 #150901

--accent--crimson--50 #fef0f3 --accent--crimson--100 #fddde4 --accent--crimson--200 #fbbac9
--accent--crimson--300 #f787a4 --accent--crimson--400 #f0507a --accent--crimson--500 #e8184f
--accent--crimson--600 #b0123c --accent--crimson--700 #7d0d2a --accent--crimson--800 #4f081a
--accent--crimson--900 #29040e --accent--crimson--950 #180207

--accent--purple--50 #f3efff --accent--purple--100 #e4daff --accent--purple--200 #c9b5ff
--accent--purple--300 #a685ff --accent--purple--400 #784af7 --accent--purple--500 #6232e0
--accent--purple--600 #4b25ab --accent--purple--700 #361a7a --accent--purple--800 #22104d
--accent--purple--900 #120828 --accent--purple--950 #0a0417

--accent--rose--300 #fb7185 --accent--rose--400 #f43f5e --accent--rose--500 #e11d48
--accent--rose--700 #881337 --accent--rose--800 #4c0519
```

Named accent roles (theme-scoped, appear in multiple theme blocks):
`--accent--solid`, `--accent--solid-foreground` (`#f8fafc`), `--accent--solid-hover`, `--accent--subtle`, `--accent--subtle-foreground`, `--accent--text`, `--accent--foreground`, `--accent--border` (`#1573e5` / `#e56a12` / `#083469` / `#6b2e06` variants), `--accent--icon-tint`.

**Rose set specifically:** `--accent--rose-solid: #f43f5e`, `--accent--rose-solid-foreground: #ffffff`, `--accent--rose-subtle: #4c0519`, `--accent--rose-subtle-foreground: #fb7185`, `--accent--rose-text: #fb7185`, `--accent--rose-border: #881337`, `--accent--rose-icon-tint: #e11d481a`.

### Canvas / “drafting paper” tokens (the editor surface)

```
--accent--canvas--badge          rgba(216,232,255,.851) / rgba(255,227,208,.749) / rgba(5,33,67,.851) / rgba(68,29,4,.749)
--accent--canvas--badge-text     #0c4993 / #6ba5f5 / #974108 / #ff9e63
--accent--canvas--crosshair      #1060c0 / #6ba5f5 / #c7560a / #ff9e63
--accent--canvas--dot            #1060c0 / #6ba5f5 / #c7560a / #ff9e63
--accent--canvas--dot-fuchsia    #c7560a / #ef57f7 / #f956ff / #ff9e63
--accent--canvas--guide          rgba(16,96,192,.22) / rgba(107,165,245,.271)
--accent--canvas--guide-fill     rgba(216,232,255,.251) / rgba(255,227,208,.149)
--accent--canvas--guide-fuchsia  rgba(199,86,10,.122) / rgba(255,158,99,.251) / rgba(247,22,255,38)
```

These four-way value sets correspond to the four theme/draft-polish combinations and reveal the editor’s visual language: **crosshairs, guide lines, dot grids, badges, fuchsia (magenta) guides.**

### Surface, content, border

```
--surface--base                #ffffff / #f8fafc / #151719
--background                   #fcfcfc / #f6f8fa / #101214
--surface--controls--button-default  #f7f7f7 / #ebedef / #3e4042 / #242628
--surface--controls--button-hover     #242628 / #dadcde
--surface--controls--button-hover-strong #242628 / #343638
--content--primary     #171717 / #f8fafc
--content--secondary   #404040 / #a1a3a5
--content--muted       #737373 / #717375
--content--disabled    #a3a3a3 / #a1a3a5 / #505254
--content--inverted    #fafafa / #f8fafc / #080a0c
--content--on-image    #f8fafc
--border--solid        #171717 / #f3f5f7 / #151719
--border--focus        #1573e5 / #6ba5f5
```

### Radii

```
--radius--element    2px (6px in one theme)
--radius--control    4px (12px in one theme)
--radius--component  6px (14px)
--radius--container  8px (14px)
--radius--surface    16px (24px)
--radius--inset      12px
--radius--pill       100px
```

### Typography

```
--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
             "Segoe UI Symbol", "Noto Color Emoji"
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
```

Also present: `font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, a display serif `font-family: Season, serif`, and the Tailwind default stacks (`--default-font-family`, `--default-mono-font-family`). Font-size scale observed: `10px, 11px, 12px, 14px, 16px, 24px` (plus Tailwind `text-2xl`, `text-4xl`).

### Theming architecture

- Theme classes: `.theme--light-neutral`, `.theme--dark-neutral`; attributes `[data-theme=light]`, `[data-theme=dark]`.
- A global `[data-redesign]` flag switches the whole token set (new “redesign” design language vs. legacy).
- Token families are namespaced per-theme with suffixes: `--rd-accent-draft-*` (draft mode), `--accent-draft--*`, `--accent-polish--*` (polish mode) — the CSS contains a **draft** palette and a **polish** palette in addition to the default accent.

---

## COPY INVENTORY

Exact strings, quoted as observed.

### Login / auth (live page)

- “Welcome back”
- “Sign in to continue to Synaps”
- “Continue with Google”

### Auth-related strings from the bundle

- “Google sign-in failed”
- “Please sign in again to continue.”
- “Your session has expired. Sign in again, then import the drawing.”
- “Let’s set up your account.”
- “Invite by email”
- “Unexpected error in register”
- “You must provide either an email or phone number and a password”
- “You must provide either an email or phone number and a type”
- “You must provide either an email or phone number.”
- “No permission to send email invitations for this file.”

### Marketing — headlines / headings

- “Synaps, Architectural Practice without the compromise”
- “The drafting tool a working studio runs on”
- “Built for the everyday architecture practice”
- “Made for the studio”
- “One canvas, two modes”
- “Drafting, everything you need”
- “Polishing, in a single connected environment”
- “Everything you need to build the connected foundation.”
- “Introducing Vecy-1”
- “Trusted by 80,000 architects worldwide.”
- “Design with AI”
- “Draft with precision”
- “Spatial visualization”
- “Accurate floor plans”
- “Floor plan generator”
- “Floor plan tracer”
- “Automated floor plan tracing”
- “Floor plan generation”
- “Precise drafting”
- “Client collaboration”
- “Architecture Studio”
- “Interior Designers”
- “Real Estate Professionals”
- “Architectural practice”
- “Native.”
- “Within minutes.”

### Marketing — body / feature copy

- “Accurate floor plans. Multilayer walls. Rooms shaped with precision.”
- “Any photo, scan or sketch, traced into editable lines.”
- “Describe the space. Get an editable plan.”
- “Windows, doors, stairs, editable and connected.”
- “Angle control. Lock the view. Reuse it across deliverables.”
- “Shadows. Cast and edit live. Sun position, time of day.”
- “Change the light. Swap finishes. The scene catches up.”
- “Walk the space. Camera framing built in.”
- “Configurable elements”
- “Hatches, materials, blocks.”
- “Import your CAD files”
- “Replace & restyle”
- “Relight & resurface”
- “Architectural drafting without the legacy CAD overhead.”
- “Legal” (footer column heading)

### Marketing — buttons / CTAs

- “Start designing free”
- “Log in” · “Login”
- “Book a call”
- “Accept all” · “Accept” · “Reject all” · “Necessary” · “Manage”
- “Alternative to” · “ArchiCAD” · “AutoCAD” · “BricsCAD” · “Revit” · “SketchUp” · “Vectorworks”

---

## COMPONENTS

UI patterns derivable from the CSS token system + bundle strings (no rendered app UI was available).

**Design-system primitives (class names present in the stylesheet):**
- `.ds-accent-mono` — monospace accent label (coordinate / technical readouts).
- `.ds-chip-edge` — bordered chip.
- `.ds-modeswitch-thumb` and `.ds-segment-thumb` — sliding thumb for a **mode switch** and a **segmented control** (both theme-aware; a `[data-theme=dark]` thumb variant exists).
- `.ds-scrim-strong` — modal/overlay scrim.

**Interaction utilities:** `.touch-target`, `.touch-hug`, `.touch-height`, `.touch-inset`, `.touch-size`, `.touch-text` — a touch-target/geometry layer for pointer-device parity, plus `[data-redesign] [data-site-building]` and `data-site-building` states (building skeletons).

**Buttons:** `.btn-secondary` referenced as a canonical bordered button; the CSS comment notes “Buttons, single canonical size, used on landing + every subpage.” Button surface tokens (`--surface--controls--button-default/hover/hover-strong`) define a three-state elevation ladder.

**Editor canvas:** the `--accent--canvas--*` family defines a CAD-like drafting surface — **crosshair cursor**, **dot grid**, **guide lines** (with a fuchsia/magenta variant for active or snapping guides), and **floating badges** (glass-ish `rgba` fills with a matched `--badge-text` color). `.ds-accent-mono` is the readout font for this layer.

**Marketing composition (from CSS comments in the capture):** bento-grid hero (“Bento art direction: grid owns the frame, images crop around explicit focal points”), a slider/carousel with **outcome tabs** (`.outcome-tabs`), and **“Atio-style” `[01] DRAFTING / SECTION 1 / 4` corner labels** — i.e. a section-index eyebrow pattern on marketing sections.

**Likely app-level components** (from bundle route/copy strings, inferred): onboarding checklist, project recents list, template gallery, canvas editor with draft/polish modes, credits/billing banner, member invitation flow, notification center, settings panel, upload raster flow, and a `dev-login` debug route.

**Icons:** the marketing page uses inline SVG with `fill="currentColor"` and `xmlns="http://www.w3.org/2000/svg"`; two favicons exist: `/assets/favicon.svg` and `/assets/favicon-dark.svg`.

---

## NETWORK-API

### tRPC — `api.synaps.app`

- Transport: tRPC over HTTP at `https://api.synaps.app/trpc`.
- `GET /trpc/health` → **200**, no auth. Public liveness endpoint.
- **Enumeration oracle (useful for later milestones):**
  - `401` → a **protected query** exists at that path.
  - `405` → a **mutation** exists at that path.
  - `404` → the path is **absent**.
- Confirmed procedures:
  - `storage.list` → **401** (protected query).
  - `layout.trace` → **405** (mutation).
  - `layout.generate` → **405** (mutation).
- The bundle contains a **second, larger tRPC namespace** (not yet enumerated) — i.e. the app’s procedure surface is substantially larger than the three probed.

### Other endpoints visible in the bundle

`/api/broadcast`, `/outbox/commit`, `/outbox/upload-url`, `/i/v1/logs`, `/i/v1/metrics`, `/ph-stats/`, `/storage/raster-upload`, `/auth/v1/*`.

### Auth — Supabase GoTrue

- **GoTrue v2.197.0** (`supabase-js` + `@supabase/gotrue-js` in the bundle).
- Providers: **Google** and **email** (email/password, plus invite-by-email flows).
- A **publishable** Supabase key is embedded in the public bundle (publishable = safe to expose; no service-role key was observed).
- Bundle also references `supabase.auth.token`, `signInWithOAuth`, `auth-callback`, `auth-request`, and a wallet/SIWE path (`supabase/auth-js: Invalid SIWE message field …`), indicating optional wallet-auth scaffolding.

### Observability

`/i/v1/logs` and `/i/v1/metrics` suggest an internal telemetry sink; `/ph-stats/` suggests a PostHog-style analytics endpoint.

---

## PRODUCT FLOW

> ⚠️ **INFERRED.** This section is a reasoned model built from the marketing copy, route candidates, bundle strings, and CSS token names. The authenticated app was **never observed** — no Google SSO was completed, so no screen, state transition, or payload below was directly witnessed. Treat every arrow as a hypothesis to be validated in a later milestone.

1. **Acquire (marketing).** A visitor lands on the marketing site → browses “One canvas, two modes” → CTA **“Start designing free”** → `beta.synaps.app/register`.
2. **Authenticate.** `/login` or `/register` → **“Continue with Google”** → Supabase GoTrue OAuth → `auth-callback` → session established. `redirectTo=%2F` returns the user to the intended deep link.
3. **Onboard.** `/onboarding` (or `/onboarding-lab`) — bundle copy “Let’s set up your account.” suggests a guided first-run setup (workspace/project, possibly a sample file).
4. **Enter the workspace.** Root/project area with recents (`/recent`), templates (`/templates`), and the canvas.
5. **Draft mode.** Import an input (`/storage/raster-upload` for scans/rasters, or **“Import your CAD files”**) → either
   - **AI generate** — `layout.generate` mutation from a natural-language description (“Describe the space. Get an editable plan.”), or
   - **AI trace** — `layout.trace` mutation turning “Any photo, scan or sketch” into editable lines.
   Result: a layered plan — “Windows, doors, stairs, editable and connected”, “Multilayer walls”.
6. **Draft refine.** Direct manipulation on the drafting canvas: dot grid, crosshair, snapping guides (fuchsia when active), angle control (“Angle control. Lock the view. Reuse it across deliverables.”), hatches/materials/blocks.
7. **Polish mode (relight & resurface).** Switch the canvas mode (mode-switch thumb) → spatial visualization: cast/edit shadows live, sun position & time of day, swap finishes, camera framing (“Walk the space”), replace & restyle.
8. **Deliver.** Document export/reuse; credits and billing (`/billing`, `/credits-banners`) gate usage; sharing via members, invitations, notifications; settings and docs (`docs.synaps.app`) close the loop.

---

## LIMITATIONS

1. **The authenticated app was never observed.** Sign-in is **Google-SSO-only** and no credentials were used (operator policy: no credential handling). Every in-app route, screen, component, and payload beyond the login page is therefore **unverified** and marked *candidate* or *inferred*.
2. **Google-SSO-only surface.** The login screen exposes exactly one sign-in affordance (“Continue with Google”). Email/password exists in the bundle’s Supabase client but is **not surfaced on the observed login page** — possibly reachable via `/register` or a different entry point; unconfirmed.
3. **Real data was never seen.** No project, file, credit balance, member list, or real geometry was loaded. All API knowledge is limited to status-code probing (401 / 405 / 404) on a handful of paths plus the unauthenticated `/trpc/health`.
4. **The second tRPC namespace remains un-enumerated.** Only `storage.list`, `layout.trace`, `layout.generate` were probed; the larger namespace in the bundle is a known gap. **This gap was NOT closed** — the clone implements no API surface at all, so the enumeration opportunity was left on the table. It remains the highest-value open lead.
5. **Bundle findings are string-level, not semantic.** Route candidates in `.rea/index.js` were extracted as literal path strings and may include static-asset paths, internal endpoints, or test fixtures rather than navigable routes.
6. **CSS-derived components are structural, not visual.** Component names, token names and class names are reliable; their rendered appearance was not screenshot-verified inside the app.
7. **Marketing copy is a separate surface.** `.rea/marketing.html` describes the *public* product narrative; the app itself may use different terminology for the same features.
8. **`.rea/` assets stay local and are never committed.** The 5.2 MB bundle, 534 KB stylesheet, and 660 KB marketing capture are evidence only, excluded via `.gitignore`, so no third-party code or copyrighted content enters this repository. Only original analysis and original clone code are committed.

---

## IMPLEMENTATION OUTCOME

Recorded at Milestone 7 so the analysis stays honest about what it actually
produced. This section was **appended** — nothing above it was rewritten to
flatter the implementation.

### What was built from this analysis

| Analysis section | Consumed by | Outcome |
|---|---|---|
| ROUTE MAP | Milestone 5 | 53 routes across 39 route files — 31 public/marketing, 22 reconstructed authenticated-app routes. Per-route provenance in `docs/ROUTES.md`. |
| NAVIGATION | Milestones 2, 3, 5 | Shared `Nav` / `Footer`; marketing top-nav and footer groups; app-shell grouping by the role the bundle implied. |
| DESIGN TOKENS | Milestones 2, 6 | Accent ramps, drafting-surface family, semantic surface/content/border sets, radii, type stacks, and the light/dark + `[data-redesign]` + draft/polish theming layers re-implemented as Tailwind v4 CSS variables. A final sweep found **zero raw hex values outside the token definitions**. |
| COPY INVENTORY | Milestones 3, 5 | Quoted strings reused verbatim where they were observed (e.g. "Welcome back", "Sign in to continue to Synaps", "Continue with Google", the hero headline, the 10 solution headlines, the 6 comparison product names). |
| COMPONENTS | Milestones 3, 4, 5 | Original inline SVG icons, bento hero, outcome tabs, section eyebrows, canvas-grid and glass-badge component-layer rules. |
| NETWORK-API | — | **Deliberately not implemented.** The clone makes no API calls; the observed tRPC procedures are documented here only, and the `/storage` screen notes that `storage.list` answered 401. |
| PRODUCT FLOW | Milestone 4 | The six-step demo — Source → Configure → Processing → Draft → Polish → Deliver — as a real client-side state machine with per-step validation. |

### Divergences from the captured site

1. **Trailing slashes.** The captured marketing IA used trailing-slash URLs; the
   clone stores canonical trailing-slash-free paths, so no link depends on a
   redirect. The full mapping table is in `docs/ROUTES.md`.
2. **`--material--*` token family.** Added during Milestone 6 to replace raw
   hex swatches in the demo. These are **clone-authored** values, **not**
   observed ones, and are not evidence about the original product.
3. **Google brand mark.** Replaced with a neutral original glyph so the clone
   does not reproduce a third-party trademark.
4. **The authenticated surface is labelled, not hidden.** Every reconstructed
   app route states on-page that it is a reconstruction, and all its data is an
   obviously-demo fixture.

### What the analysis still does not know

Unchanged by the implementation, and the reason the clone is a reconstruction
rather than a replica: the authenticated app was never observed, no real data
was ever seen, the second tRPC namespace was never enumerated, and the
bundle-derived route set remains string-level evidence rather than verified
navigation.

---

*Milestone 1 recorded the public-surface REA. Milestones 2–7 implemented a clone
from it. The next milestone should attack the second tRPC namespace enumeration
and the post-auth route map — the two gaps this analysis never closed.*

---

## Authenticated surface (observed 2026-10-21, operator-authorized session)

The operator authorized a live sign-in with their own Google account to
observe the previously unobservable authenticated surface. What follows was
witnessed first-hand (screenshots + DOM + network capture) or transcribed
from the production bundle.

### Observed flows

- **Sign-in** — `/login` renders “Welcome back” / “Sign in to continue to
  Synaps” with a single “Continue with Google” button (blue #4285F4, split
  layout with a product preview on the right). Google SSO via Supabase
  GoTrue; on return the app lands on the team home `/t/{teamId}` (or the
  onboarding wizard for fresh accounts).
- **Onboarding questionnaire** — 8 steps, transcribed VERBATIM from the
  bundle (`onboarding` steps array): email → name → role (Architect /
  Designer · Real estate professional · Homeowner / Prosumer · Student ·
  Other) → tools (multi: AutoCad · Revit · Rhino · ArchiCAD · SketchUp ·
  Other · None) → designing today (Apartment · House · Office / Workspace ·
  Retail / Hospitality · Public space · Just exploring) → space size (with
  m²/sq ft details) → solo or team → “How would you like to start?”
  (Update existing plan · Start from template · Describe what you want ·
  Start fresh). Each step has a sheetKicker, rotating artwork, and
  step-scoped analytics (onboarding_step_viewed / _completed).
- **Team home** — `/t/{teamId}`: team switcher + Free badge, Home / Recent /
  Spaces sidebar, credits pill (300), “What are we creating today?” with
  four cards (Start from scratch / Upload floorplan / Generate with AI /
  Try Synaps demo project), “Continue working” model cards. Free plan caps
  models at three (Pro upsell modal: unlimited models/pages, rolling
  credits).
- **Console** — `/m/{modelId}?pageId={pageId}`: top bar (model icon, name +
  space breadcrumb, copy-link, avatar/help/feedback, blue Share), left dock
  (Layers / Assets tabs; Models section; “No layers yet. Anything you draw
  appears here.”), right Canvas panel (Background hex EBEDEF, Length units
  Meters, Precision 2, Area units Square meters, Grid 0.5 m), bottom status
  bar (grid size, unit, zoom), floating bottom-center tool palette.
- **Assets library categories** — Activities, Ancient Pompeii, Bathroom,
  Bedroom, Dining Room, Kitchen, Life & Context, Lighting, Living Room, MEP
  Symbols, Office, Others, Outdoor.
- **AI generation** — “Describe your floorplan…” with example prompts
  (Corner café / Townhouse / Courtyard house, transcribed verbatim in
  src/lib/onboarding-steps.ts); consumes credits.

### tRPC surface (api.synaps.app, observed + bundle)

credits.getBalance · gates.getTeamEntitlements · invitations.* ·
resources.create / getById / list · stripe.* · teams.* · templates.* ·
users.me / onSignup / onboardingStatus / consentStatus · ai.operationId ·
layout.generate / layout.trace · storage.list (from the M1 401/405 oracle).
Feature flags observed: dwg-import, dwg-export, iceberg-release.

### What the clone implements vs. simulates

Implemented for real (original code): the full journey UI (login →
onboarding → home → console), an interactive SVG floor-plan editor (walls,
doors on walls with swing arcs, windows, rooms with live area labels,
dimensions, text, asset stamps, select/move, delete, undo/redo, zoom/pan,
grid snap, unit switching, PNG/SVG export), the Free-limit modal, the AI /
upload dialogs, and the derived layer list.

Simulated (honest): Google SSO (mock account chooser — no identity
provider), the tRPC layer (no server), teams/credits/models (localStorage),
AI generation (deterministic demo plan), upload tracing (no image
processing), sharing (local placeholder link).

### Account hygiene disclosure

Two test models (“Model 1”) were created on the operator’s Free account
during observation (hitting the 3-model cap). The production client bundle
exposes no model-delete procedure and no delete affordance was found in the
UI, so they could not be removed by the observer. The operator’s existing
“Uploaded Plan” model was not modified. The operator’s Google credentials,
shared in chat for this observation, were used once for this login and are
not stored anywhere in this repository — rotation is still advised.

## Full functionality inventory (REA static analysis, 2026-10-21)

The complete production bundle of beta.synaps.app was harvested (182 files,
25.9 MB) and statically analyzed with **REA** (github.com/morluto/rea,
`rea-agents analyze-javascript-application`): 179 JS files parsed, 2,397,763
AST nodes, 3,405 findings, a 181-module semantic graph (54,726 nodes,
52,878 relations). The full inventory and the clone's coverage are tracked
in `docs/REMAINING-FUNCTIONALITIES.md`. Highlights recovered beyond the
live observation:

- **Route table** (25 paths incl. /recent, /w/$workspaceId, /members,
  /billing, /notifications, /invitations/, /invite/$token, /templates,
  /template/$templateId, /storage, /credits-banners, /admin,
  /sculpt-studio, /components, /onboarding-lab, /testing/onboarding).
- **tRPC procedure surface** (ai.operationId/image, layout.generate/trace/
  layoutBox/source, export.dxf, storage.*, credits.getBalance/mode,
  gates.getTeamEntitlements/requireDxfImport, teams.* incl.
  previewMemberEditorCharge, invitations.* incl.
  previewEditorInviteCharge, resources.*, templates.*, users.*,
  stripe.* (8 procedures), admin.signOut, assets.*).
- **Feature flags**: dwg-import, dwg-export, iceberg-release,
  redesign-shell, redesign-v1-6, native-export, onboarding-generated-floors,
  renderer-v3-culling, renderer-v3-kernel (fallbacks and the
  allowLocalOverride:false rules transcribed exactly).
- **Console internals**: WebGPURenderer + CanvasRenderer + CanvasPool,
  BuildingScene, sunlightState, 74 procedural texture datasets (Brick,
  Concrete, Diagrammatic, Earth, Glass, Grass, Insulation, Metal, Pavement,
  Roofing, Sand, Stone, Tile, Water, Wood), presentation reveal-artifact
  machine (building 2500 ms; site/section/elevation 5000 ms), phone
  handover (phone-canvas-loader), import workers (pdf.worker,
  shapeMapImport.worker, magneticLassoWorker, bim.worker, entry-upload),
  geometry kernels (occt-wasm OpenCascade, clipper2z), export.dxf,
  SitePlanExportDialog (papers, delivery single_file|zip, watermark),
  EditorErrorFallback, pageActions, resourceRenameOptimistic,
  realtime_store wasm CRDT.
- **Infrastructure** (documented, not cloned): Sentry, Cloudflare Pages
  Analytics, Google Analytics G-WYPS14KQRH, Supabase GoTrue/Realtime, the
  WebGPU renderer and the WASM kernels.

### What the clone implements from this inventory

Implemented for real (original code): every route as a working app page;
the full journey (login → onboarding → team home → console); multi-page
models; multi-team with spaces; invitations lifecycle with a working
accept flow; members with roles; billing with plan flips and invoices;
notifications; settings incl. the verbatim feature-flag registry with
honest server-locked rules; templates gallery with instantiation and
save-as-template hooks; storage manager; credits banners; admin
inspection; sculpt-studio token playground; import dialogs for all five
formats with simulated pipelines and provenance; export suite (PNG/SVG/DXF
placeholder/site-plan options); presentation mode; phone-handover dialog;
draft/polish mode switch with an original SVG material renderer and
sunlight state; magnetic-lasso (simulated); editor error boundary; model
rename; journey-project seeding.

Simulated (honest): the entire tRPC layer (`src/lib/trpc-sim.ts` mirrors
every procedure name with localStorage backing and console.debug markers),
Google SSO, stripe, storage bucket, realtime channels, WASM kernels, AI
generation, upload tracing, phone streaming.

## Main-domain parity (synaps.app harvest, 2026-10-21)

The operator compared the clone against **synaps.app** — the main
production domain — and found both missing features and visual
dissimilarity. Recon showed the main domain is a *different surface*
from the beta SPA this clone originally targeted: a server-rendered
marketing website (77 sitemap URLs) plus a GitBook documentation site
(docs.synaps.app, ~21 pages). The clone's marketing group was
placeholder-era: one landing page plus ~11-line stub pages rendering
"reconstruction notice" content.

Harvest: all 77 marketing pages (`/tmp/synaps-site/pages`) + 21 docs
pages (`/tmp/synaps-site/docs`) + viewport screenshots and VLM design
analyses. Plan: `docs/SITE-PARITY-PLAN.md`.

What was implemented (original code throughout):

- **Design system** (`src/app/(marketing)/site.css`, scoped `.ms`): light
  paper background `#F8F9FB`, hairlines `rgba(8,9,11,.1)`, Draft blue
  `#1060C0` / Polish orange `#ff6a00` accents, 1320px container, the
  `"Suisse Int'l", -apple-system…` font stack (declared as on the real
  site; the commercial face falls back to the system stack), uppercase
  10px micro-labels, near-sharp corners, black primary buttons, drafting
  hatch/dot/gridline textures, +/− accordions.
- **Chrome**: sticky header with the real IA (Solutions dropdown ·
  Documentation↗ · Blog · Alternative-to dropdown · Pricing · Login +
  Start-designing-free CTA on inner pages only), dark footer with the
  CTA block and Product/Company/Legal columns, cookie-consent banner
  (bottom-left, Manage/Accept all — writes to the simulated consent
  store; the clone sets no real cookies).
- **Home**: two-column hero (dimmed second headline line), 01/03–03/03
  feature cards with original SVG artwork, manifesto + testimonial
  bridge, Drafting/Polishing feature splits with original product
  mockups (style editor; generator with "Generating floorplan…"
  overlay), "Everything you need" capability grid, native assets
  marquee.
- **All 77 marketing paths**: solutions hub + 10 pages, pricing
  (Freemium €0 / Pro €59/49 / Studio €119/99 with monthly-annual
  toggle, compare tables, licensing comparison, FAQs), FAQ, company +
  5 careers, blog hub + 29 posts, changelog hub + 14 entries
  (New/Improved/Fixed typed items), alternative-to hub + 6 tools,
  partners, and the four legal pages.
- **Docs** (`/docs`): GitBook-style sidebar layout with all 20 content
  pages (get-started, drafting, ai-workflows, import-and-export,
  visualize, collaborate, assets, ai-and-automation,
  workspace-and-billing, reference, video-tutorials).
- **Login polish** (app side): fixed invisible text (undefined token
  references), realistic right-panel project-window mockup
  (Layers/Assets sidebar + furnished plan on a soft gradient), proper
  Google-blue CTA.

Provenance for this lane: route paths, page titles, section headings,
plan names/prices and FAQ questions are transcribed from the harvest so
the information architecture matches; body copy is original condensed
writing; all artwork is original SVG/CSS; no served asset (fonts,
images, logo path, photographs) is copied. The logo is an original
single-stroke S-curve glyph in the same spirit as the analysed mark.
Out of scope by construction: the real site's scroll-jacked cinematic
home, Google/PostHog/Meta analytics, cal.com booking, Instagram/LinkedIn
social links (replaced by clone-disclosure text), and photography (all
imagery is original vector work).

## App-surface theme ground truth (Task 36 — bundle stylesheet evidence)

The authenticated app's theme was extracted verbatim from the harvested
production stylesheet (index-DfBMXOyL.css) and the served document
(home.html):

- **The app is DARK by default.** The served document ships
  `<html lang="en" class="dark">`, and the `:root` token block in the
  shipped stylesheet IS the dark set: surface base `#151719`, subtle
  `#1c1e20`, raised `#242628`, elevated `#3e4042`, selected `#313335`,
  content primary `#f8fafc` / secondary `#a1a3a5` / muted `#717375`,
  borders rgba(255,255,255,.07/.1/.2), focus `#6ba5f5`, accent solid
  `#1573e5` (hover `#1060c0`, text `#6ba5f5`, subtle `#052143`), canvas
  background `#101214`, radii 2/4/6/8/12/16/100, control buttons
  rgba(255,255,255,.05→.08), scrollbars 4px hairlines.
- **A light theme exists** as `[data-theme=light]` / `.theme--light-neutral`
  (surface base `#f8fafc`, raised `#ebedef`, content primary `#151719`)
  but it is NOT the default; the `[data-redesign]` variants are dark-launch
  features whose flags (`iceberg-release`, `redesign-shell`, `redesign-v1-6`)
  default to false in the shipped bundle, so the base dark set is what
  production renders.
- **Onboarding washes**: dark `#1b1a18 / #292825 / #2f2922`
  (light variants `#e9e5df / #f3efe7 / #c3bbb1`).
- **Fonts**: Inter (variable, Google Fonts + rsms.me), Fira Mono,
  Courier Prime, Noto Sans. Typography scale: minimal 8/12/500 ·
  tiny 10/12/500 · micro 11/16/500 · compact 12/16/500 ·
  title 14/20/500 · lead 16/24/400 · heading 24/32/600 ·
  display 28/32/600.
- **The console's paper is light by design**: the observed Canvas
  settings panel sets Background `#EBEDEF` — dark chrome around a light
  drafting paper (the classic CAD paradigm). The clone keeps the paper
  light inside its dark shell for the same reason.

### What the clone implements (Task 36)

The `(app)` route group (all 17 post-login route trees) now renders in
the dark theme: the token layer in globals.css is rebased verbatim on
the values above, the surface/controls/wash/shadow ramps are defined and
mapped to utilities (this also fixed the previously-undefined
`--surface--raised` token that silently disabled hover states), on-paper
editor ink is pinned to paper-safe colors, primary actions use the real
accent (`#1573e5` + `#f8fafc` foreground), the wizard runs on the dark
wash tokens, and the root 404 is theme-aware (dark for app paths, light
for marketing paths). Marketing and docs surfaces are unchanged (light),
matching the real deployment split (synaps.app light vs beta.synaps.app
dark).

## Cinematic tail ground truth (Task 38)

The live site defaults to `html[data-page-theme="cinematic"]`: from the
scroll-tiles polish flip onward the page is one continuous dark band —
scroll-tiles (polish) → assets-library (`data-theme="dark"`, #0F0F0E,
ghosted material swatches via `invert(1) contrast(.95) brightness(1.16)
opacity(.84)`, white line-art blocks) → video-stage (#0F0F0E) → footer
(#0F0F0E). The light `data-page-theme` rules are an opt-out mode, not the
default. The universal tail on every page is: content → video-stage
("Real work built with Synaps": sticky expanding frame, 2 muted looping
clips, 8s auto-cycle with rAF progress fill, caption overlays) → footer
(whose own CTA block carries the closing heading — there is NO separate
light CTA band). The clone now mirrors this structure.

The homepage capabilities section is a 600svh scrollytelling
(`.scroll-tiles`): sticky two-panel stage (draft words left / draft
visuals right), scroll-driven phase budget DRAFT 0–0.28 · FLIP 0–0.58
(mode switch entrance + thumb tension, `--flip-theme` build-up) ·
POLISH 0.58–0.93 (snap state machine: 540ms thumb spring → 480ms
dismiss/reveal) · TAIL → 1, with click-to-jump words, 440ms image
cross-fades, 90ms caption swaps, and a header dark sync
(`is-section-dark` / `is-tail-dark`). FAQ uses a single-open
scroll-anchored details accordion (site-enhance.js behavior).

## Machine-facing head parity (Task 39 — live head harvest, 2026-10-22)

The analysed site's machine-facing layer, harvested from live heads of
synaps.app (10 page classes fetched fresh; structures transcribed,
identity strings substituted for the clone's own):

- `robots.txt`: allow-all with a small disallow list for non-public
  prefixes and a sitemap pointer. The clone mirrors the shape
  (dropping the analysed site's CMS-internal disallow entries that
  have no equivalent routes here).
- `sitemap.xml`: 77 marketing URLs (13 static + 10 solutions + 5
  careers + 29 blog posts + 14 changelog entries + 6 alternative-to
  pages), every entry lastmod-dated. The clone serves the same 77-path
  inventory plus its on-domain /docs section (21 URLs) = 98 total,
  generated from the same content modules that drive the routes.
- Per-page titles follow two patterns: standalone descriptive titles
  ("Synaps pricing, Freemium, Pro & Studio plans", "Synaps vs Revit, a
  drafting-first alternative") and suffix titles ("FAQ, Synaps" /
  "Interior Designers | Synaps"). The clone mirrors both shapes with
  its own name ("Synaps Clone") and a `%s | Synaps Clone` template.
- Open Graph / Twitter: `og:image` default card (per-post CMS images
  on blog), `og:site_name`, `og:url`, per-page canonicals, twitter
  `summary_large_image`. The clone ships an original 1200×630 card
  (composed HTML+CSS, VLM-audited 98/100) and scheme-aware original
  SVG favicons (S-curve mark, light + dark) + a 180px apple-touch PNG.
- JSON-LD by page class (clone mirrors structure with its own identity
  and its own FAQ answers/prices): home → Organization + WebSite +
  SoftwareApplication (offers 0/59/119 EUR, the clone's displayed
  monthly prices — the analysed site's own JSON-LD prices 35/75 are
  stale against its visible page) + ItemList site navigation; company
  → BreadcrumbList + Organization + AboutPage; careers → BreadcrumbList
  + JobPosting (TELECOMMUTE); faq/pricing/solutions/alternatives →
  FAQPage (pricing adds Product + AggregateOffer); blog posts →
  BlogPosting + Organization; changelog → Article + Organization.

## Site-chrome micro-behavior parity (Task 40 — behavior-script harvest, 2026-10-22)

Ground truth: the two live behavior scripts the real site ships alongside
its styles (`site-enhance.js` — already covered by the FAQ work — and
`nav-transitions.js`), the `site-analytics-consent.js` consent system,
the `site-analytics-attribution.js` DEV-825 campaign cookie, and the
edge behavior of `/go/{handle}` short links (probed live).

- **Cross-page navigation chrome.** The real site is multi-page: every
  internal link is a full document navigation, which is what powers its
  transition chrome. Two mechanisms ship together:
  `@view-transition { navigation: auto }` + `.header#header {
  view-transition-name: site-header }` (native cross-document view
  transitions, Chrome 126+: header morphs in place, root cross-fades,
  320ms cubic-bezier(0.22,0.61,0.36,1)) and a JS fallback
  (`nav-transitions.js`: sessionStorage flag → `synaps-nav-exit` fades
  `.page-layer > :not(.header)` out over 280ms → navigate → enter pass
  adds `synaps-nav-enter`/`-active` for a 320ms fade-in; bails on
  prefers-reduced-motion or when PageRevealEvent exists; bfcache-aware).
  Opt-outs mirrored from the real CSS: reduced-motion kills everything;
  ≤900px subpages (site-subpage/solution-subpage, NOT the homepage)
  disable both the header morph and the fade.
- **Clone gap found and closed:** the clone is an SPA, so Link clicks
  never produced document navigations — in VT-capable engines (the
  majority) NO transition fired at all. `NavTransitions.tsx` now
  converts unmodified left-clicks on internal marketing links into the
  same full document navigation (native engines navigate at once and
  let the CSS animate; older engines run the ported 280/320ms fade
  fallback). Cross-surface paths (the app prefixes that stand in for
  the real's beta.synaps.app origin, and /docs — a separate origin on
  the real) navigate immediately, as cross-origin links do there. The
  consent bar's footer link (#consent-settings) is exempt so the bar's
  own handler wins, matching the real's effective Chrome behavior.
- **Two-stage consent bar.** The real consent system (Google Consent
  Mode v2 shape, two categories): analytics → `synaps_analytics_consent`
  (+ `_record` v1:granted|denied) and advertising →
  `synaps_advertising_consent` (v2:…), 1 year, SameSite=Lax, global
  default granted unless Global Privacy Control. First visit shows the
  FULL prompt; a visitor who already answered analytics gets only the
  SHORT prompt ("We'd also like to use advertising cookies…"). Manage
  reveals the three-row selection (Necessary locked; ads-on forces
  analytics-on, analytics-off forces ads-off), hides itself and reveals
  Reject all + Accept; Accept all explicitly grants both; a fresh
  analytics grant after an explicit denial reloads the page. The
  footer's "Cookie settings" link reopens the bar with the panel.
  Static markup + CSS harvested (fixed bottom-left card, radius 4, no
  shadow, 13px text, 32×18 square-radii toggles, 160ms thumb spring;
  dark tail flips it #0F0F0E/#FAFAF8/#3D3D3A). The clone's banner was
  rebuilt to this state machine with the same ids/roles/cookie names
  (host-only) — the honesty note stays in the panel: no real trackers
  load, the cookies only record the visitor's own choice.
- **Creator short links (DEV-825).** `/go/{handle}` → 302 to
  `/?utm_source={handle}&utm_medium=influencer`; `/go/{campaign}/{handle}`
  adds `utm_campaign`; `/go`, trailing slashes and 3+ segments → 404;
  unknown handles still redirect (edge does not validate). The clone
  ships `/go/[...slug]` with the same semantics.
- **First-touch attribution.** The real captures landing UTMs (utm_*,
  gclid/fbclid/gbraid/wbraid/dclid, landing_variant) + referrer +
  landing_path into a `synaps_attribution` JSON cookie (90 days,
  first-touch only, omit-empty, <2048 chars) while advertising consent
  is granted, and clears it on denial. The clone's `Attribution.tsx`
  writes the same-shaped inert cookie (nothing reads it; consent
  changes re-sync it live).
- Footer Legal column corrected to the real's inventory (FAQ, Privacy,
  Terms, Cookies, Cookie settings, Imprint — the clone had FAQ under
  Company and no Cookie settings) and the footer "Book a call" CTA now
  targets the real's cal.com link (the hero already did).
- The real's `site-analytics-marketing.js` is a consent-gated PostHog
  A/B experiment on the hero copy (control is what non-consenting
  visitors see); not mirrored — running it would make the clone LESS
  similar for the majority. Its 404 has no custom page (empty body →
  the browser's own error screen); the clone keeps its custom 404.
- The `/cookies` policy page was updated to describe the new cookie
  population accurately (same-named consent + attribution cookies,
  the two-stage bar, the footer Cookie settings re-open, the
  ads-require-analytics coupling) with the honest clone framing.

## Final visual drift check (Task 43, post-a54f3c8)

Closing verification against the operator's original Task 35 complaint
("the sites do not look similar"). Live side-by-side screenshots
(1280×577, production clone vs live synaps.app) analyzed by an
independent vision model:

| Page | Similarity | Verdict |
| --- | --- | --- |
| Home | 92/100 | same site family — "high-fidelity clone… core visual identity replicated" |
| Pricing | 92/100 | same site family — "layout grid, typography scale, copy, color palette identical" |

Remaining differences are the deliberate honest-clone decisions:
original S-curve logo (not the real mark), original architectural hero
artwork (not the real imagery), and minor consent-bar overlay timing.
No layout, color, typography or structural drift was reported.
