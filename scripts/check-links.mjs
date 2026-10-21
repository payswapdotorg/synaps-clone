#!/usr/bin/env node
/**
 * Link-integrity checker.
 *
 * Walks every source file, extracts internal hrefs (and href values held in
 * the navigation/landing data modules), and verifies that each one resolves to
 * a real route in the src/app tree.
 *
 * This is the machine check behind the "zero dead internal links" requirement
 * in Milestone 5, and it also backs the manifest in docs/ROUTES.md.
 *
 * External URLs (http://, https://, mailto:, tel:) are reported separately and
 * are expected — they are listed in docs/ROUTES.md as intentional external
 * links.
 *
 * Usage: bun run check:links
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, "src");

/** Collect every .ts / .tsx file under src/. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.tsx?$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

/** Every route the app actually serves, derived from the src/app tree. */
function collectRoutes(dir, prefix = "") {
  const routes = new Set();
  const entries = readdirSync(dir, { withFileTypes: true });
  const hasPage = entries.some((e) => e.isFile() && e.name === "page.tsx");
  if (hasPage) routes.add(prefix || "/");
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const seg = entry.name;
    // route groups like (marketing) shape the layout, not the URL — skip them
    if (seg.startsWith("(") && seg.endsWith(")")) {
      for (const r of collectRoutes(join(dir, seg), prefix)) routes.add(r);
      continue;
    }
    const nextPrefix =
      seg.startsWith("[") && seg.endsWith("]")
        ? `${prefix}/${seg.slice(1, -1)}`
        : `${prefix}/${seg}`;
    for (const r of collectRoutes(join(dir, seg), nextPrefix)) routes.add(r);
  }
  return routes;
}

/** Slugs that the dynamic [slug] routes actually serve. */
const DYNAMIC_SLUGS = {
  "/solutions": [
    "architecture-studio",
    "automated-floor-plan-tracing",
    "client-collaboration",
    "floor-plan-generation",
    "freelancers-and-homeowners",
    "interior-designers",
    "precise-drafting",
    "real-estate-professionals",
    "space-visualization",
    "students-and-educators",
  ],
  "/news/alternative-to": [
    "archicad",
    "autocad",
    "bricscad",
    "revit",
    "sketchup",
    "vectorworks",
  ],
};

const routes = collectRoutes(join(SRC, "app"));

/** Does a path resolve to a real route (static, or dynamic with a known slug)? */
function resolves(path) {
  const clean = path.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
  if (routes.has(clean)) return true;
  // Dynamic match: /solutions/<slug>
  for (const [base, slugs] of Object.entries(DYNAMIC_SLUGS)) {
    if (clean.startsWith(`${base}/`)) {
      const slug = clean.slice(base.length + 1);
      if (slugs.includes(slug)) return true;
    }
  }
  return false;
}

const files = walk(SRC);
const internal = new Map(); // href -> Set(file)
const external = new Set();

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  // href="/..." | href={"/..."} | href: "/..." — template literals with
  // interpolations (${...}) are runtime-computed and verified by the E2E,
  // so only fully-static quoted values are checked here
  const re = /href[:=]\s*\{?\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      external.add(href);
      continue;
    }
    if (href.startsWith("#")) continue; // in-page anchor
    if (!href.startsWith("/")) {
      console.error(`FAIL  ${rel}: non-absolute internal href "${href}"`);
      process.exitCode = 1;
      continue;
    }
    if (!internal.has(href)) internal.set(href, new Set());
    internal.get(href).add(rel);
  }
}

const broken = [];
for (const [href, refs] of internal) {
  if (!resolves(href)) broken.push({ href, refs: [...refs] });
}

console.log(`Routes discovered: ${routes.size}`);
console.log(`Internal hrefs checked: ${internal.size}`);
console.log(`External hrefs (intentional): ${external.size}`);
for (const url of [...external].sort()) console.log(`  → ${url}`);

if (broken.length > 0) {
  console.error(`\nDEAD INTERNAL LINKS: ${broken.length}`);
  for (const b of broken) {
    console.error(`  ✗ ${b.href}  (referenced by ${b.refs.join(", ")})`);
  }
  process.exit(1);
}

console.log("\nOK — every internal href resolves to a real route.");
