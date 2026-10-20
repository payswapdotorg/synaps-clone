/**
 * The authenticated-app route manifest.
 *
 * NONE of these routes were observed live: the real product sits behind a
 * Google-only sign-in wall, and no credentials were used, so the entire
 * authenticated surface is a *candidate* set recovered as literal path
 * strings from the public application bundle (.rea/index.js), per the ROUTE
 * MAP section of ANALYSIS.md.
 *
 * Every screen under /app/* is an honest reconstruction:
 *   - the route graph follows the recorded path strings,
 *   - the navigation shell follows the recorded app-nav concepts,
 *   - all data is an obviously-demo fixture (no fabricated real user data),
 *   - each page states plainly that it is a reconstruction.
 */

export type AppGroup = "Workspace" | "Content" | "Account" | "Team" | "Internal";

export type AppRoute = {
  /** Clone route path. */
  path: string;
  /** Label used in the app navigation. */
  label: string;
  group: AppGroup;
  /** The role the bundle implied for this path. */
  role: string;
  /** The path string exactly as recorded in the bundle. */
  bundlePath: string;
  /** True when the analysis observed this path on the live public site. */
  observed: boolean;
};

export const appRoutes: AppRoute[] = [
  {
    path: "/project",
    label: "Project",
    group: "Workspace",
    role: "Project workspace",
    bundlePath: "/project/",
    observed: false,
  },
  {
    path: "/recent",
    label: "Recent",
    group: "Workspace",
    role: "Recents list",
    bundlePath: "/recent",
    observed: false,
  },
  {
    path: "/templates",
    label: "Templates",
    group: "Workspace",
    role: "Template gallery",
    bundlePath: "/templates",
    observed: false,
  },
  {
    path: "/onboarding",
    label: "Onboarding",
    group: "Workspace",
    role: "First-run onboarding flow",
    bundlePath: "/onboarding",
    observed: false,
  },
  {
    path: "/onboarding-lab",
    label: "Onboarding Lab",
    group: "Workspace",
    role: "Onboarding sandbox",
    bundlePath: "/onboarding-lab",
    observed: false,
  },
  {
    path: "/testing/onboarding",
    label: "Testing: Onboarding",
    group: "Workspace",
    role: "Onboarding test route",
    bundlePath: "/testing/onboarding",
    observed: false,
  },
  {
    path: "/sculpt-studio",
    label: "Sculpt studio",
    group: "Content",
    role: "Sculpt studio mode",
    bundlePath: "/sculpt-studio",
    observed: false,
  },
  {
    path: "/vector",
    label: "Vector",
    group: "Content",
    role: "Vector document layer",
    bundlePath: "/vector",
    observed: false,
  },
  {
    path: "/storage",
    label: "Storage",
    group: "Content",
    role: "Asset storage",
    bundlePath: "/storage",
    observed: false,
  },
  {
    path: "/storage/raster-upload",
    label: "Raster upload",
    group: "Content",
    role: "Raster upload flow",
    bundlePath: "/storage/raster-upload",
    observed: false,
  },
  {
    path: "/components",
    label: "Components",
    group: "Content",
    role: "Component library",
    bundlePath: "/components",
    observed: false,
  },
  {
    path: "/config",
    label: "Config",
    group: "Content",
    role: "Configuration surface",
    bundlePath: "/config",
    observed: false,
  },
  {
    path: "/settings",
    label: "Settings",
    group: "Account",
    role: "User settings",
    bundlePath: "/settings",
    observed: false,
  },
  {
    path: "/billing",
    label: "Billing",
    group: "Account",
    role: "Credits / billing",
    bundlePath: "/billing",
    observed: false,
  },
  {
    path: "/credits-banners",
    label: "Credits banners",
    group: "Account",
    role: "Usage / credit banners",
    bundlePath: "/credits-banners",
    observed: false,
  },
  {
    path: "/recovery",
    label: "Recovery",
    group: "Account",
    role: "Account recovery",
    bundlePath: "/recovery",
    observed: false,
  },
  {
    path: "/members",
    label: "Members",
    group: "Team",
    role: "Team members",
    bundlePath: "/members",
    observed: false,
  },
  {
    path: "/invitations",
    label: "Invitations",
    group: "Team",
    role: "Member invitation flow",
    bundlePath: "/invitations/",
    observed: false,
  },
  {
    path: "/notifications",
    label: "Notifications",
    group: "Team",
    role: "Notification centre",
    bundlePath: "/notifications",
    observed: false,
  },
  {
    path: "/admin",
    label: "Admin",
    group: "Internal",
    role: "Administration surface",
    bundlePath: "/admin",
    observed: false,
  },
  {
    path: "/replay",
    label: "Replay",
    group: "Internal",
    role: "Session replay tool",
    bundlePath: "/replay/",
    observed: false,
  },
  {
    path: "/dev-login",
    label: "Dev login",
    group: "Internal",
    role: "Development sign-in shortcut",
    bundlePath: "/dev-login",
    observed: false,
  },
];

export const appGroups: AppGroup[] = [
  "Workspace",
  "Content",
  "Account",
  "Team",
  "Internal",
];

export function getAppRoute(path: string): AppRoute | undefined {
  return appRoutes.find((r) => r.path === path);
}

/**
 * Bundle path strings that the analysis explicitly ruled OUT as page routes.
 * They are recorded here so the manifest is complete, but they are not
 * implemented — building them would mean inventing API endpoints.
 */
export const excludedBundlePaths: { path: string; reason: string }[] = [
  { path: "/trpc", reason: "tRPC endpoint prefix, not a page route" },
  { path: "/api/broadcast", reason: "API endpoint" },
  { path: "/outbox/commit", reason: "API endpoint" },
  { path: "/outbox/upload-url", reason: "API endpoint" },
  { path: "/i/v1/logs", reason: "API endpoint" },
  { path: "/i/v1/metrics", reason: "API endpoint" },
  { path: "/ph-stats/", reason: "Static asset path" },
  { path: "/static/", reason: "Static asset path" },
  { path: "/__assets/", reason: "Static asset path" },
  { path: "/array/", reason: "Not a page route" },
  { path: "/person/", reason: "Not a page route" },
  { path: "/iceberg", reason: "Not a page route" },
  { path: "/_protected", reason: "Protected-route wrapper, not a page" },
  { path: "/e/", reason: "Short-code scaffolding" },
  { path: "/i/", reason: "Short-code scaffolding" },
  { path: "/s/", reason: "Short-code scaffolding" },
];
