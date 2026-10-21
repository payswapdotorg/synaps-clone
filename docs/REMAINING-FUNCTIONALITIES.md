# Remaining functionality — full inventory and implementation plan

Basis: complete static analysis of the beta.synaps.app production bundle
(2026-10-21) using **REA (github.com/morluto/rea)** —
`rea-agents analyze-javascript-application` over the harvested Vite asset
graph (182 files, 25.9 MB text, 179 parsed JS files, 2,397,763 AST nodes,
3,405 findings, 181-module semantic graph with 54,726 nodes / 52,878
relations) — cross-checked against the operator-authorized authenticated
observation (2026-10-21) and the M1 public-surface analysis.

## A. Complete route table (extracted from the router chunks)

`/` · `/login` · `/register` · `/onboarding` · `/t/$teamId` · `/recent` ·
`/w/$workspaceId` · `/m/$modelId` · `/settings` · `/members` · `/billing` ·
`/notifications` · `/invitations/` · `/invitations/$invitationId` ·
`/invite/$token` · `/templates` · `/template/$templateId` · `/storage` ·
`/credits-banners` · `/admin` · `/sculpt-studio` · `/onboarding-lab` ·
`/testing/onboarding` · `/dev-login` · `/components`

## B. tRPC surface (procedure inventory from the bundle)

- **ai**: `operationId`, `image`
- **layout**: `generate`, `trace`, `layoutBox`, `source`
- **export**: `dxf`
- **storage**: `list`, `getSignedUrls`, `copyAssetsIntoTeam`, `isServer`, `supabase`
- **credits**: `getBalance`, `mode`
- **gates**: `getTeamEntitlements`, `requireDxfImport`
- **teams**: `getDefault`, `getById`, `list`, `getMembers`, `removeMember`, `updateMemberRole`, `removeResourceGuest`, `getInviteContext`, `previewMemberEditorCharge`
- **invitations**: `create`, `revoke`, `updateRole`, `listForTeam`, `previewEditorInviteCharge`
- **resources**: `create`, `getById`, `list`
- **templates**: `listPublic`, `listAll`, `forModel`, `getById`, `saveModelAsTemplate`, `delete`, `prepareSourceAccess`
- **users**: `me`, `onSignup`, `onboardingStatus`, `consentStatus`, `emitJourneyEvent`
- **stripe**: `listProducts`, `createCheckout`, `createPortalSession`, `getSubscription`, `updateSubscription`, `cancelSubscription`, `listInvoices`, `validatePromo`
- **admin**: `signOut`
- **assets**: `list`, `getShapes`, `mutate`
- **realtime**: `synaps`, `setAuth`, `channel`/`getChannels`/`removeChannel`/`removeAllChannels` (Supabase realtime)

## C. Feature flags (exact keys + fallbacks from the bundle)

| key | fallback | local override |
| --- | --- | --- |
| `dwg-import` | false | allowed |
| `dwg-export` | false | allowed |
| `iceberg-release` | false | **not allowed** |
| `redesign-shell` | false | allowed (released with iceberg-release) |
| `redesign-v1-6` | false | allowed |
| `native-export` | false | **not allowed** |
| `onboarding-generated-floors` | false | allowed |
| `renderer-v3-culling` | true | allowed |
| `renderer-v3-kernel` | true | allowed |

Editor-feature identifiers also present: `pdf`, `pdfunderlay`, `multileader`,
`aiming-direction`, `phone-canvas-loader`, `lasso`/`lasso-select`/`lassoTools`,
import modes `import-image/-pdf/-svg/-dxf/-dwg/-file`, `importMergeProvenance`.

## D. Console (editor) capabilities from the module graph

Multi-page models (`pageActions`, `pages.*`); draft ↔ **polish mode**
(`ModeSwitch`, `CanvasRenderer`, `CanvasPool`, `WebGPURenderer`,
`sunlightState`, `BuildingScene`, `SpatialPrimitiveScene`) with a material
library of 74 procedural texture datasets (Brick×4, Concrete×6,
Diagrammatic×11, Earth×3, Glass×3, Grass, Insulation×4, Metal×5, Pavement×5,
Roofing×7, Sand, Stone×7, Tile×5, Water×3, Wood×9); **presentation mode**
(reveal-artifact state machine: building / site / section / elevation with
per-artifact durations); **phone handover** (phone canvas + back-to-dashboard
 affordances); import workers (`shapeMapImport.worker`, `pdf.worker`,
`magneticLassoWorker`, `bim.worker`, `entry-upload`, `useSignedUrlFallback`)
covering image / PDF / SVG / DXF / DWG; CAD geometry kernels (`occt-wasm`
OpenCascade, `clipper2z` polygon clipping, `wasmInit`); export suite
(`export.dxf`, `SitePlanExportDialog` with paper size / delivery mode
single_file|zip / watermarking, `watermark`, `native-export`);
`EditorErrorFallback`; `resourceRenameOptimistic`; realtime collaboration
(`realtime_store` wasm CRDT, realtime channels, presence).

## E. Dashboard / account surface

`TeamSidebarV2` (team switcher, Home/Recent/Spaces, credits badge),
`HomeCreationPanel` + `NewProjectMenu` ("Start from scratch", "Upload
floorplan", "Generate with AI" + template), `ProjectPreviewCard`,
`IncomingInvitationCard`, `TeamDashboardContent`, `TeamSettingsModal`,
`NotificationGallery`, `journeyProject`, `instantiateTemplate`,
`useAnalyticsConsent`, `useSettingsModalsRouteRedirect`, admin surface with
`RoomVersionInspectionPanel`, credits banners, entitlements
(`maxModels`, `maxPages`, `dwgImport`, `dxfImport`, `watermarked`).

Infrastructure observed but out of scope for the clone (documented, not
rebuilt): Sentry error tracking, Cloudflare Pages Analytics beacon, Google
Analytics (G-WYPS14KQRH), Supabase GoTrue/Realtime backends, the WebGPU
renderer and WASM kernels themselves.

## Gap analysis — what the clone (a88a506) was missing

1. **App routes existing only as marketing stubs**: settings, members,
   billing, notifications, invitations (+$invitationId, /invite/$token),
   templates (+$templateId), storage, credits-banners, admin, recent,
   register, sculpt-studio.
2. **No simulated tRPC layer** — console used ad-hoc localStorage helpers
   instead of the real procedure surface.
3. **No feature-flag registry.**
4. **Console gaps**: single-page models (no page management), no import
   format suite, no DXF/site-plan/watermarked export, no presentation mode,
   no phone handover, no magnetic lasso, no material/polish rendering, no
   sunlight state, no error fallback, no rename, no realtime presence.
5. **Collab/account gaps**: no invitations lifecycle, no member roles, no
   notification center, no settings modals, no billing/checkout/invoices,
   no templates gallery/instantiation, no journey project, no team
   switching/spaces CRUD.

## Implementation plan (milestones)

- **F1 Foundation** — feature-flag registry (honest local-override rules);
  `trpc-sim` client implementing every procedure above against a
  localStorage store, clearly labelled simulated; session model extended
  (multi-team, spaces, model pages, notifications, entitlements, invoices,
  invitations).
- **F2 Shell + dashboard** — app sidebar (team switcher, Home/Recent/Spaces,
  credits badge, account menu); /recent; spaces CRUD + /w/[workspaceId];
  NewProjectMenu; ProjectPreviewCard with optimistic rename;
  IncomingInvitationCard; app-route restructure (the §A routes become real
  app pages; marketing group keeps only true marketing pages).
- **F3 Console suite** — page management; import suite (image/PDF/SVG/DXF/
  DWG dialogs with simulated worker pipelines and provenance); export suite
  (DXF, site plan with papers/delivery modes, watermark on Free); magnetic
  lasso; presentation mode (reveal artifacts); phone handover (local QR +
  code, simulated); polish mode with original SVG material patterns +
  sunlight state; EditorErrorFallback; simulated realtime presence.
- **F4 Collaboration + account** — invitations lifecycle + accept flow;
  members with roles and charge previews; notification gallery; settings
  modals; billing (plans, simulated checkout, portal, invoices, promo);
  credits banners; admin panel.
- **F5 Templates + extras** — template gallery + detail + instantiation;
  save-as-template; journey project seeded from onboarding answers;
  sculpt-studio token playground; register entry.
- **F6 Docs + gates** — ANALYSIS.md evidence section; README update; build/
  lint/link gates; full-journey E2E; push; deploy; online verification.

Everything is added as original code with simulated backends, labelled as
such — per the project's honesty policy.
