# Route manifest — Synaps Clone

Every route in the application, what it implements, and where the information behind it
came from. Generated for Milestone 5 from the ROUTE MAP section of `ANALYSIS.md`.

**Provenance legend**

| Mark | Meaning |
|---|---|
| **Observed** | The route was seen live, unauthenticated, during the REA. |
| **Observed + reconstructed** | The route was seen live, but its body was never retrieved (it sits behind the sign-in wall) — the clone rebuilds it honestly from the recorded strings. |
| **Reconstructed** | The route was never seen. Its path was recovered as a literal string from the public bundle; the screen is authored for this clone. |
| **Clone** | A route this project added that has no counterpart in the analysis. |

---

## Public marketing routes

| Path | Implements | Source |
|---|---|---|
| `/` | Landing page — hero, modes, capabilities, comparison, final CTA | Observed + reconstructed |
| `/demo` | Six-step interactive demo flow (source → configure → process → draft → polish → deliver) | Clone |
| `/login` | Google-SSO-only sign-in screen — “Welcome back”, “Sign in to continue to Synaps”, “Continue with Google” | Observed + reconstructed |
| `/register` | Registration entry point — “Let’s set up your account.” | Observed + reconstructed |
| `/pricing` | Pricing tiers (structure only — no figures were captured) | Observed + reconstructed |
| `/company` | About page — “The drafting tool a working studio runs on” | Observed + reconstructed |
| `/solutions` | Solutions hub — “By use case” / “By type” | Observed + reconstructed |
| `/faq` | FAQ about the clone | Observed (path) + reconstructed (content) |
| `/cookies` | Cookie policy placeholder | Observed (path) + reconstructed (content) |
| `/privacy` | Privacy placeholder | Observed (path) + reconstructed (content) |
| `/terms` | Terms placeholder | Observed (path) + reconstructed (content) |
| `/imprint` | Imprint placeholder | Observed (path) + reconstructed (content) |
| `/news/blog` | Blog index (placeholder entries) | Observed (path) + reconstructed (content) |
| `/news/changelog` | Release notes — “Introducing Vecy-1” | Observed (path) + reconstructed (content) |
| `/resources/partners` | Partners (placeholder entries) | Observed (path) + reconstructed (content) |

### Solution detail routes

Captured IA paths under `/solutions/`; the copy inventory supplied each headline.

| Path | Implements | Source |
|---|---|---|
| `/solutions/architecture-studio` | Architecture Studio | Observed (path + headline) + reconstructed (body) |
| `/solutions/automated-floor-plan-tracing` | Automated floor plan tracing | Observed (path + headline) + reconstructed (body) |
| `/solutions/client-collaboration` | Client collaboration | Observed (path + headline) + reconstructed (body) |
| `/solutions/floor-plan-generation` | Floor plan generation | Observed (path + headline) + reconstructed (body) |
| `/solutions/freelancers-and-homeowners` | Freelancers & homeowners | Observed (path + headline) + reconstructed (body) |
| `/solutions/interior-designers` | Interior Designers | Observed (path + headline) + reconstructed (body) |
| `/solutions/precise-drafting` | Precise drafting | Observed (path + headline) + reconstructed (body) |
| `/solutions/real-estate-professionals` | Real Estate Professionals | Observed (path + headline) + reconstructed (body) |
| `/solutions/space-visualization` | Spatial visualization | Observed (path + headline) + reconstructed (body) |
| `/solutions/students-and-educators` | Students and educators | Observed (path + headline) + reconstructed (body) |

### “Alternative to …” comparison routes

Captured IA paths under `/news/alternative-to/`; the product names come from the copy inventory.

| Path | Implements | Source |
|---|---|---|
| `/news/alternative-to/archicad` | Alternative to ArchiCAD — feature-area table, comparison columns intentionally empty | Observed (path + name) + reconstructed (rows) |
| `/news/alternative-to/autocad` | Alternative to AutoCAD — feature-area table, comparison columns intentionally empty | Observed (path + name) + reconstructed (rows) |
| `/news/alternative-to/bricscad` | Alternative to BricsCAD — feature-area table, comparison columns intentionally empty | Observed (path + name) + reconstructed (rows) |
| `/news/alternative-to/revit` | Alternative to Revit — feature-area table, comparison columns intentionally empty | Observed (path + name) + reconstructed (rows) |
| `/news/alternative-to/sketchup` | Alternative to SketchUp — feature-area table, comparison columns intentionally empty | Observed (path + name) + reconstructed (rows) |
| `/news/alternative-to/vectorworks` | Alternative to Vectorworks — feature-area table, comparison columns intentionally empty | Observed (path + name) + reconstructed (rows) |

---

## Reconstructed authenticated-app routes

**None of these were observed.** The real product sits behind a Google-only sign-in
wall and no credentials were used, so the entire authenticated surface is a *candidate*
set recovered as literal path strings from the public application bundle. Every screen
below is an honest reconstruction: the route graph follows the recorded path strings,
the navigation shell groups the routes by the role the bundle implied, and all content
is an obviously-demo fixture. No real user, project, file, member, credit balance or
geometry is presented as real.

| Path | Bundle path | Implements | Source |
|---|---|---|---|
| `/project` | `/project/` | Project workspace — demo project list | Reconstructed |
| `/recent` | `/recent` | Recents list — demo recent files | Reconstructed |
| `/templates` | `/templates` | Template gallery — six demo templates | Reconstructed |
| `/onboarding` | `/onboarding` | First-run onboarding checklist | Reconstructed |
| `/onboarding-lab` | `/onboarding-lab` | Onboarding sandbox | Reconstructed |
| `/testing/onboarding` | `/testing/onboarding` | Onboarding test route | Reconstructed |
| `/sculpt-studio` | `/sculpt-studio` | Sculpt studio mode — original SVG massing diagram | Reconstructed |
| `/vector` | `/vector` | Vector document layer — canvas with drafting-surface tokens | Reconstructed |
| `/storage` | `/storage` | Asset storage — demo file list (tRPC `storage.list` answers 401) | Reconstructed |
| `/storage/raster-upload` | `/storage/raster-upload` | Raster upload flow — inert drop zone | Reconstructed |
| `/components` | `/components` | Component library — demo entries | Reconstructed |
| `/config` | `/config` | Configuration surface — demo rows | Reconstructed |
| `/settings` | `/settings` | User settings — read-only demo fields | Reconstructed |
| `/billing` | `/billing` | Credits / billing — demo usage meter | Reconstructed |
| `/credits-banners` | `/credits-banners` | Usage-banner states — three demo variants | Reconstructed |
| `/recovery` | `/recovery` | Account recovery — inert form | Reconstructed |
| `/members` | `/members` | Team members — “Invite by email” (inert) | Reconstructed |
| `/invitations` | `/invitations/` | Pending invitations — empty state | Reconstructed |
| `/notifications` | `/notifications` | Notification centre — demo entries | Reconstructed |
| `/admin` | `/admin` | Administration surface — demo panels | Reconstructed |
| `/replay` | `/replay/` | Session replay tool — empty state | Reconstructed |
| `/dev-login` | `/dev-login` | Development sign-in — inert, no auth performed | Reconstructed |

---

## Bundle paths deliberately NOT implemented

The analysis ruled these out as page routes. They are API endpoints, static-asset
paths, or protected-route scaffolding — building them would mean inventing backend
behaviour that was never observed.

| Path | Why it is excluded |
|---|---|
| `/trpc` | tRPC endpoint prefix, not a page route |
| `/api/broadcast` | API endpoint |
| `/outbox/commit` | API endpoint |
| `/outbox/upload-url` | API endpoint |
| `/i/v1/logs` | API endpoint |
| `/i/v1/metrics` | API endpoint |
| `/ph-stats/` | Static asset path |
| `/static/` | Static asset path |
| `/__assets/` | Static asset path |
| `/array/` | Not a page route |
| `/person/` | Not a page route |
| `/iceberg` | Not a page route |
| `/_protected` | Protected-route wrapper, not a page |
| `/e/` | Short-code scaffolding |
| `/i/` | Short-code scaffolding |
| `/s/` | Short-code scaffolding |

---

## External links

These point outside the app and are rendered with `target="_blank"`.

| URL | Where it appears | Note |
|---|---|---|
| `https://docs.synaps.app` | Footer → Resources → Documentation | Original vendor docs. Listed in the observed footer. |
| `https://cal.com/kevin-cobaj/30min` | Hero + final CTA “Book a call” | Original booking link, from the observed copy. |

The original sign-in page linked out to `www.synaps.app/terms/` and `synaps.app/privacy/`.
The clone deliberately does **not** mirror those: its `/login` screen points at its own
`/terms` and `/privacy`, so the legal text a reader reaches describes this clone
rather than a third party’s product.

---

## Link integrity

Every internal `href` in the app resolves to a route listed above. The check is
enforced by `scripts/check-links.mjs`, which walks every source file, extracts internal
hrefs, and compares them against the real `src/app` route tree.

```bash
bun run check:links
```

Route-path normalisation: the captured marketing IA used trailing-slash URLs
(`/pricing/`, `/solutions/precise-drafting/`, …). The clone stores canonical
trailing-slash-free paths, so no link depends on a redirect.

| Captured IA path | Clone path |
|---|---|
| `/pricing/` | `/pricing` |
| `/company/` | `/company` |
| `/solutions/` | `/solutions` |
| `/news/blog/` | `/news/blog` |
| `/news/changelog/` | `/news/changelog` |
| `/resources/partners/` | `/resources/partners` |
| `/faq/`, `/cookies/`, `/privacy/`, `/terms/`, `/imprint/` | same, without the trailing slash |
| `/news/alternative-to/{slug}/` | `/news/alternative-to/{slug}` |
| `/solutions/{slug}/` | `/solutions/{slug}` |
| `/project/` | `/project` |
| `/invitations/` | `/invitations` |
| `/replay/` | `/replay` |

---

*Milestone 5 — every remaining route from the ROUTE MAP is implemented, and this
manifest records the provenance of each one.*
