import { Notice } from "@/components/marketing/ui";
import { AppShell } from "./AppShell";
import { getAppRoute } from "@/lib/app-routes";

/**
 * Reconstructed authenticated-app screens.
 *
 * Every screen is built from:
 *   - the path string recovered from the public bundle (the ROUTE MAP),
 *   - the role the surrounding bundle code implied for that path,
 *   - the design-token layer from ANALYSIS.md.
 *
 * All content is an obviously-demo fixture. No real user, project, file,
 * member, credit balance or geometry is presented as real.
 */

const demo = {
  projects: [
    { name: "Demo — Lakeside Extension", mode: "Drafting", updated: "2 minutes ago", rooms: 7 },
    { name: "Demo — Courtyard House", mode: "Polishing", updated: "Yesterday", rooms: 11 },
    { name: "Demo — Studio Annex", mode: "Drafting", updated: "3 days ago", rooms: 4 },
  ],
  recents: [
    { name: "Demo — Lakeside Extension", kind: "Plan", mode: "Drafting" },
    { name: "Demo — Courtyard House", kind: "Scene", mode: "Polishing" },
    { name: "Demo — Studio Annex", kind: "Plan", mode: "Drafting" },
    { name: "Demo — Sample survey scan", kind: "Raster", mode: "Drafting" },
  ],
  templates: [
    { name: "Apartment — one bedroom", rooms: 3, kind: "Drafting" },
    { name: "Studio — open plan", rooms: 2, kind: "Drafting" },
    { name: "House — two storey", rooms: 9, kind: "Drafting" },
    { name: "Office — single floor", rooms: 6, kind: "Drafting" },
    { name: "Retail — corner unit", rooms: 4, kind: "Drafting" },
    { name: "Cafe — interior", rooms: 5, kind: "Polishing" },
  ],
  members: [
    { name: "Demo — Principal", role: "Owner", seats: 1, state: "Active" },
    { name: "Demo — Draftsperson", role: "Member", seats: 1, state: "Active" },
    { name: "Demo — Collaborator", role: "Viewer", seats: 1, state: "Invited" },
  ],
  notifications: [
    { title: "Demo — share link opened", meta: "Demo — Courtyard House · 1 hour ago" },
    { title: "Demo — comment on a room", meta: "Demo — Lakeside Extension · Yesterday" },
    { title: "Demo — export finished", meta: "Demo — Studio Annex · 3 days ago" },
  ],
  storage: [
    { name: "Demo — survey scan.png", size: "2.4 MB", kind: "Raster" },
    { name: "Demo — reference.dwg", size: "1.1 MB", kind: "Vector" },
    { name: "Demo — sketch.jpg", size: "780 KB", kind: "Raster" },
  ],
  vectors: [
    { name: "Demo — plan-lakeside.svg", objects: 128, kind: "Vector" },
    { name: "Demo — plan-courtyard.svg", objects: 311, kind: "Vector" },
  ],
  components: [
    { name: "Window — casement", kind: "Opening" },
    { name: "Door — single swing", kind: "Opening" },
    { name: "Stair — straight flight", kind: "Circulation" },
    { name: "Wall — multilayer", kind: "Structure" },
  ],
  credits: { used: 128, limit: 500, resets: "Demo — in 12 days" },
};

/* -------------------------------------------------------------------------- */
/* Small shared primitives                                                      */
/* -------------------------------------------------------------------------- */

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-container border border-border-solid/10 bg-surface-base">
      <div className="flex items-center justify-between gap-4 border-b border-border-solid/10 px-4 py-3">
        <h2 className="text-sm font-semibold text-content-primary">{title}</h2>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function PlaceholderButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      disabled
      className="rounded-control border border-border-solid/15 bg-control-button-default px-3 py-2 text-sm text-content-disabled"
    >
      {children}
    </button>
  );
}

function DemoBadge() {
  return (
    <span className="ds-chip-edge rounded-pill px-2 py-0.5 text-2xs text-content-muted">
      Demo data
    </span>
  );
}

function DataRow({
  primary,
  secondary,
  trailing,
}: {
  primary: string;
  secondary?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-1 border-b border-border-solid/5 px-4 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-content-primary">{primary}</p>
        {secondary ? (
          <p className="mt-0.5 text-2xs text-content-muted">{secondary}</p>
        ) : null}
      </div>
      {trailing ? <div className="mt-2 shrink-0 sm:mt-0">{trailing}</div> : null}
    </li>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-container border border-dashed border-border-solid/20 p-8 text-center">
      <p className="text-sm font-medium text-content-primary">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-content-muted">{body}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Screens                                                                     */
/* -------------------------------------------------------------------------- */

function ProjectScreen() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <PlaceholderButton>New project</PlaceholderButton>
        <PlaceholderButton>Import CAD</PlaceholderButton>
        <DemoBadge />
      </div>
      <Panel title="Projects" action={<span className="ds-accent-mono text-2xs">3 items</span>}>
        <ul>
          {demo.projects.map((project) => (
            <DataRow
              key={project.name}
              primary={project.name}
              secondary={`${project.mode} · ${project.rooms} rooms · updated ${project.updated}`}
              trailing={<DemoBadge />}
            />
          ))}
        </ul>
      </Panel>
      <Notice>
        Reconstruction. The bundle recorded “/project/” as the project workspace and
        the marketing site linked the post-login destination to the workspace root.
        The workspace itself was never observed — these three projects are demo
        fixtures, not real records.
      </Notice>
    </div>
  );
}

function RecentScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Recent" action={<span className="ds-accent-mono text-2xs">4 items</span>}>
        <ul>
          {demo.recents.map((item) => (
            <DataRow
              key={item.name}
              primary={item.name}
              secondary={`${item.kind} · ${item.mode}`}
              trailing={<DemoBadge />}
            />
          ))}
        </ul>
      </Panel>
      <Notice>
        Reconstruction. “/recent” was recovered as a literal path string from the
        public bundle; the recents list itself was never rendered or observed.
      </Notice>
    </div>
  );
}

function TemplatesScreen() {
  return (
    <div className="space-y-5">
      <Panel
        title="Template gallery"
        action={<span className="ds-accent-mono text-2xs">{demo.templates.length} templates</span>}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {demo.templates.map((template) => (
            <article
              key={template.name}
              className="rounded-container border border-border-solid/10 p-3"
            >
              <div className="canvas-grid relative flex h-24 items-center justify-center rounded-control border border-border-solid/10">
                <svg width="72" height="44" viewBox="0 0 72 44" aria-hidden="true">
                  <rect
                    x="1"
                    y="1"
                    width="70"
                    height="42"
                    fill="none"
                    stroke="currentColor"
                    className="text-accent-text"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1 24h30V1M31 24h20v19M51 24h20"
                    fill="none"
                    stroke="currentColor"
                    className="text-accent-text"
                    strokeWidth="0.8"
                    opacity="0.55"
                  />
                </svg>
              </div>
              <p className="mt-3 text-sm font-medium text-content-primary">{template.name}</p>
              <p className="mt-0.5 text-2xs text-content-muted">
                {template.kind} · {template.rooms} rooms
              </p>
            </article>
          ))}
        </div>
      </Panel>
      <Notice>
        Reconstruction. The bundle recorded “/templates” as a template gallery. The
        six entries above are demo fixtures; no template metadata was observed.
      </Notice>
    </div>
  );
}

function OnboardingScreen({ variant }: { variant: "onboarding" | "lab" | "testing" }) {
  const steps = [
    { title: "Create a workspace", body: "Name the project the drawings belong to." },
    { title: "Choose a source", body: "A photo, a scan, a sketch, or an existing CAD file." },
    { title: "Configure the run", body: "Choose what the pass should produce." },
    { title: "Review the draft", body: "Adjust the geometry before polishing." },
  ];
  return (
    <div className="space-y-5">
      <Panel
        title={variant === "onboarding" ? "Getting started" : "Onboarding lab"}
        action={<span className="ds-accent-mono text-2xs">step 1 / {steps.length}</span>}
      >
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex items-start gap-3 rounded-control border border-border-solid/10 px-4 py-3"
            >
              <span className="ds-accent-mono mt-0.5 text-2xs">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span>
                <span className="block text-sm font-medium text-content-primary">{step.title}</span>
                <span className="mt-0.5 block text-sm text-content-secondary">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </Panel>
      <Notice>
        Reconstruction. The bundle recorded “/onboarding”, “/onboarding-lab” and
        “/testing/onboarding” as onboarding paths. The checklist structure follows
        the onboarding-checklist pattern the analysis inferred; the step names are
        written for this clone.
      </Notice>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Profile">
        <div className="space-y-3">
          {[
            { label: "Display name", value: "Demo — Principal" },
            { label: "Email", value: "demo@example.invalid" },
            { label: "Organisation", value: "Demo Practice" },
          ].map((field) => (
            <label key={field.label} className="block">
              <span className="eyebrow-index mb-1 block">{field.label}</span>
              <input
                type="text"
                defaultValue={field.value}
                readOnly
                className="w-full rounded-control border border-border-solid/15 bg-background px-3 py-2 text-sm text-content-secondary"
              />
            </label>
          ))}
        </div>
      </Panel>
      <Panel title="Preferences">
        <div className="space-y-2">
          {["Default mode", "Units", "Snapping", "Grid density"].map((pref) => (
            <div
              key={pref}
              className="flex items-center justify-between rounded-control border border-border-solid/10 px-4 py-3"
            >
              <span className="text-sm text-content-primary">{pref}</span>
              <span className="ds-accent-mono text-2xs text-content-muted">
                Demo — not persisted
              </span>
            </div>
          ))}
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/settings” was recovered from the bundle. The form fields
        are demo fixtures and read-only: this clone stores no user record and
        persists nothing.
      </Notice>
    </div>
  );
}

function BillingScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Usage" action={<DemoBadge />}>
        <div className="flex items-end justify-between">
          <div>
            <p className="ds-accent-mono text-2xs text-content-muted">Credits used</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-content-primary">
              {demo.credits.used}
              <span className="text-base font-normal text-content-muted"> / {demo.credits.limit}</span>
            </p>
          </div>
          <p className="text-2xs text-content-muted">{demo.credits.resets}</p>
        </div>
        <div
          className="mt-4 h-2 w-full overflow-hidden rounded-pill bg-control-button-default"
          role="img"
          aria-label={`${demo.credits.used} of ${demo.credits.limit} demo credits used`}
        >
          <div
            className="h-full rounded-pill bg-accent-solid"
            style={{ width: `${Math.round((demo.credits.used / demo.credits.limit) * 100)}%` }}
          />
        </div>
      </Panel>
      <Panel title="Plan">
        <ul>
          {["Solo", "Practice", "Studio"].map((tier) => (
            <DataRow
              key={tier}
              primary={`Demo — ${tier}`}
              secondary="Demo tier — no price recorded"
              trailing={<DemoBadge />}
            />
          ))}
        </ul>
      </Panel>
      <Notice>
        Reconstruction. “/billing” and “/credits-banners” were recovered from the
        bundle. No real credit balance or plan was ever observed — the figures above
        are demo fixtures and no payment flow exists in this clone.
      </Notice>
    </div>
  );
}

function CreditsBannersScreen() {
  const variants = [
    { id: "soft", title: "Demo — soft nudge", body: "You are close to the demo limit." },
    { id: "warning", title: "Demo — warning", body: "The demo limit is nearly reached." },
    { id: "blocked", title: "Demo — blocked", body: "The demo limit has been reached." },
  ];
  return (
    <div className="space-y-5">
      <Panel title="Banner states">
        <div className="space-y-3">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center justify-between gap-4 rounded-container border border-border-solid/15 bg-background px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-content-primary">{variant.title}</p>
                <p className="mt-0.5 text-2xs text-content-muted">{variant.body}</p>
              </div>
              <PlaceholderButton>Dismiss</PlaceholderButton>
            </div>
          ))}
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/credits-banners” was recovered as a usage-banner surface.
        The three states are demo fixtures; the analysis recorded no banner copy.
      </Notice>
    </div>
  );
}

function MembersScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Members" action={<DemoBadge />}>
        <ul>
          {demo.members.map((member) => (
            <DataRow
              key={member.name}
              primary={member.name}
              secondary={`${member.role} · ${member.seats} seat`}
              trailing={<span className="ds-chip-edge rounded-pill px-2 py-0.5 text-2xs text-content-muted">{member.state}</span>}
            />
          ))}
        </ul>
      </Panel>
      <Panel title="Invite by email">
        <div className="flex flex-wrap gap-2">
          <input
            type="email"
            placeholder="demo@example.invalid"
            readOnly
            className="min-w-[240px] flex-1 rounded-control border border-border-solid/15 bg-background px-3 py-2 text-sm text-content-secondary"
          />
          <PlaceholderButton>Send invitation</PlaceholderButton>
        </div>
        <p className="mt-3 text-2xs text-content-muted">
          The invite form is inert. The bundle recorded the string “Invite by email”
          and the error “No permission to send email invitations for this file.” — no
          invitation is ever sent by this clone.
        </p>
      </Panel>
      <Notice>
        Reconstruction. “/members” and “/invitations” were recovered from the bundle
        as a team surface. No members, teams or permissions were observed.
      </Notice>
    </div>
  );
}

function InvitationsScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Pending invitations">
        <EmptyState
          title="No invitations in the demo"
          body="Invitation state was never observed. This empty state is a reconstruction of the surface the bundle recorded."
        />
      </Panel>
      <Notice>
        Reconstruction. The bundle recorded the path “/invitations/” and the string
        “Invite by email”. No invitation flow was ever rendered.
      </Notice>
    </div>
  );
}

function NotificationsScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Notifications" action={<DemoBadge />}>
        <ul>
          {demo.notifications.map((item) => (
            <DataRow key={item.title} primary={item.title} secondary={item.meta} />
          ))}
        </ul>
      </Panel>
      <Notice>
        Reconstruction. “/notifications” was recovered as a notification-centre path.
        The three entries are demo fixtures.
      </Notice>
    </div>
  );
}

function StorageScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Assets" action={<span className="ds-accent-mono text-2xs">3 files</span>}>
        <ul>
          {demo.storage.map((file) => (
            <DataRow
              key={file.name}
              primary={file.name}
              secondary={`${file.kind} · ${file.size}`}
              trailing={<DemoBadge />}
            />
          ))}
        </ul>
      </Panel>
      <Notice>
        Reconstruction. The bundle recorded “/storage” as the asset layer, and the
        analysis probed the tRPC procedure “storage.list”, which answered 401 —
        meaning a storage listing exists behind authentication. No file list was
        ever seen, so the rows above are demo fixtures.
      </Notice>
    </div>
  );
}

function RasterUploadScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Upload a raster">
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-container border border-dashed border-border-solid/25 bg-background p-6 text-center">
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" className="text-accent-text">
            <path
              d="M16 22V6m0 0-6 6m6-6 6 6M4 24v2a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-3 text-sm font-medium text-content-primary">Drop a file here</p>
          <p className="mt-1 text-2xs text-content-muted">
            Demo only — no upload is performed and no file leaves the page.
          </p>
          <div className="mt-4">
            <PlaceholderButton>Choose a file</PlaceholderButton>
          </div>
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/storage/raster-upload” was recovered as the raster upload
        flow. The bundle also exposed the API paths “/outbox/upload-url” and
        “/outbox/commit” — those are endpoints, not pages, and this clone does not
        implement them.
      </Notice>
    </div>
  );
}

function VectorScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Vector documents" action={<DemoBadge />}>
        <ul>
          {demo.vectors.map((doc) => (
            <DataRow
              key={doc.name}
              primary={doc.name}
              secondary={`${doc.kind} · ${doc.objects} objects`}
              trailing={<DemoBadge />}
            />
          ))}
        </ul>
      </Panel>
      <Panel title="Canvas">
        <div className="canvas-grid relative min-h-[220px] rounded-container border border-border-solid/10">
          <svg
            viewBox="0 0 400 220"
            className="absolute inset-0 h-full w-full text-accent-text"
            role="img"
            aria-label="Placeholder vector canvas"
          >
            <rect x="20" y="20" width="360" height="180" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M140 20v180M260 20v180M20 110h360" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path d="M140 60h30M260 150h30" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.35" />
            <circle cx="200" cy="110" r="4" fill="currentColor" />
          </svg>
          <span className="ds-accent-mono absolute left-3 top-3 rounded-control bg-canvas-badge px-2 py-1 text-2xs text-canvas-badge-text">
            0,0
          </span>
          <span className="ds-accent-mono absolute bottom-3 right-3 rounded-control bg-canvas-badge px-2 py-1 text-2xs text-canvas-badge-text">
            400,220
          </span>
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/vector” was recovered as the vector document layer. The
        canvas treatment uses the drafting-surface tokens recorded in ANALYSIS.md —
        dot grid, guide colour, floating badge — but there is no drawing engine
        behind it.
      </Notice>
    </div>
  );
}

function SculptStudioScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Sculpt studio" action={<span className="ds-accent-mono text-2xs">demo scene</span>}>
        <div className="canvas-grid relative flex min-h-[240px] items-center justify-center rounded-container border border-border-solid/10">
          <svg viewBox="0 0 320 200" className="h-full w-full text-accent-text" role="img" aria-label="Placeholder sculpted massing">
            <path
              d="M60 150 160 60l100 90z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.8"
            />
            <path d="M60 150h200M160 60v180" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <path d="M60 150 160 240 260 150" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          </svg>
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/sculpt-studio” was recovered as a studio mode. The massing
        diagram above is original SVG drawn for this clone; no sculpting, geometry
        or shading engine exists here.
      </Notice>
    </div>
  );
}

function ComponentsScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Component library" action={<DemoBadge />}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {demo.components.map((component) => (
            <article key={component.name} className="rounded-container border border-border-solid/10 p-3">
              <div className="flex h-20 items-center justify-center rounded-control bg-background">
                <svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true" className="text-accent-text">
                  <path d="M6 34V10h16v24M30 34V6h20v28" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
              <p className="mt-3 text-sm font-medium text-content-primary">{component.name}</p>
              <p className="mt-0.5 text-2xs text-content-muted">{component.kind}</p>
            </article>
          ))}
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/components” was recovered as a component-library path. The
        four entries are demo fixtures.
      </Notice>
    </div>
  );
}

function ConfigScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Configuration">
        <div className="space-y-2">
          {["Line weight", "Layer order", "Export settings", "Render quality"].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between rounded-control border border-border-solid/10 px-4 py-3"
            >
              <span className="text-sm text-content-primary">{row}</span>
              <span className="ds-accent-mono text-2xs text-content-muted">Demo — not persisted</span>
            </div>
          ))}
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/config” was recovered as a configuration surface. No
        configuration schema was observed.
      </Notice>
    </div>
  );
}

function RecoveryScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Account recovery">
        <div className="space-y-3">
          {["Email", "One-time code"].map((field) => (
            <label key={field} className="block">
              <span className="eyebrow-index mb-1 block">{field}</span>
              <input
                type="text"
                defaultValue={field === "Email" ? "demo@example.invalid" : ""}
                readOnly
                className="w-full rounded-control border border-border-solid/15 bg-background px-3 py-2 text-sm text-content-secondary"
              />
            </label>
          ))}
          <PlaceholderButton>Continue</PlaceholderButton>
        </div>
      </Panel>
      <Notice>
        Reconstruction. “/recovery” was recovered as an account-recovery path. The
        bundle’s error strings — “Google sign-in failed”, “Please sign in again to
        continue.” and “Your session has expired. Sign in again, then import the
        drawing.” — are the only account strings observed, and none of them are
        reproduced as live behaviour here.
      </Notice>
    </div>
  );
}

function AdminScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Administration" action={<DemoBadge />}>
        <ul>
          {["Workspace overview", "Member management", "Billing overview", "Usage reports"].map(
            (row) => (
              <DataRow key={row} primary={`Demo — ${row}`} secondary="Demo panel" />
            ),
          )}
        </ul>
      </Panel>
      <Notice>
        Reconstruction. “/admin” was recovered as an administration path. No
        administrative surface was ever observed.
      </Notice>
    </div>
  );
}

function ReplayScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Session replay" action={<span className="ds-accent-mono text-2xs">no session</span>}>
        <EmptyState
          title="No replay session"
          body="The bundle recorded “/replay/” as a session-replay tool. This clone has no session recorder, so there is nothing to replay."
        />
      </Panel>
      <Notice>
        Reconstruction. “/replay/” was recovered as a replay/debug tool.
      </Notice>
    </div>
  );
}

function DevLoginScreen() {
  return (
    <div className="space-y-5">
      <Panel title="Development sign-in" action={<DemoBadge />}>
        <p className="text-sm text-content-secondary">
          The original bundle recorded a “/dev-login” shortcut. This clone does not
          authenticate anyone: there is no identity provider, no session and no
          credential handling of any kind.
        </p>
        <div className="mt-4">
          <PlaceholderButton>Continue as demo user</PlaceholderButton>
        </div>
      </Panel>
      <Notice>
        Reconstruction. The sign-in affordance on the observed login page was
        Google-only, and the operator policy for this project forbids handling
        credentials, so nothing here performs a sign-in.
      </Notice>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Router                                                                      */
/* -------------------------------------------------------------------------- */

export function AppRoutePage({ path }: { path: string }) {
  const route = getAppRoute(path);

  if (!route) {
    return (
      <AppShell path={path} title="Unknown route" subtitle={`No screen is registered for ${path}.`}>
        <Notice>
          This path is not part of the reconstructed app surface. See docs/ROUTES.md for
          the full manifest.
        </Notice>
      </AppShell>
    );
  }

  const body = (() => {
    switch (path) {
      case "/project":
        return <ProjectScreen />;
      case "/recent":
        return <RecentScreen />;
      case "/templates":
        return <TemplatesScreen />;
      case "/onboarding":
        return <OnboardingScreen variant="onboarding" />;
      case "/onboarding-lab":
        return <OnboardingScreen variant="lab" />;
      case "/testing/onboarding":
        return <OnboardingScreen variant="testing" />;
      case "/settings":
        return <SettingsScreen />;
      case "/billing":
        return <BillingScreen />;
      case "/credits-banners":
        return <CreditsBannersScreen />;
      case "/members":
        return <MembersScreen />;
      case "/invitations":
        return <InvitationsScreen />;
      case "/notifications":
        return <NotificationsScreen />;
      case "/storage":
        return <StorageScreen />;
      case "/storage/raster-upload":
        return <RasterUploadScreen />;
      case "/vector":
        return <VectorScreen />;
      case "/sculpt-studio":
        return <SculptStudioScreen />;
      case "/components":
        return <ComponentsScreen />;
      case "/config":
        return <ConfigScreen />;
      case "/recovery":
        return <RecoveryScreen />;
      case "/admin":
        return <AdminScreen />;
      case "/replay":
        return <ReplayScreen />;
      case "/dev-login":
        return <DevLoginScreen />;
      default:
        return null;
    }
  })();

  return (
    <AppShell path={path} title={route.label} subtitle={route.role}>
      {body}
      <p className="mt-8 text-2xs text-content-muted">
        Reconstructed route — bundle path{" "}
        <span className="font-mono">{route.bundlePath}</span>. Never observed live.
      </p>
    </AppShell>
  );
}
