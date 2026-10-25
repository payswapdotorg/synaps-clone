import Link from "next/link";
import type { ReactNode } from "react";
import { appGroups, appRoutes } from "@/lib/app-routes";

/**
 * The reconstructed authenticated-app shell.
 *
 * NOTHING here was observed live. The real product sits behind a Google-only
 * sign-in wall, so the whole authenticated surface is inferred from path
 * strings recovered from the public bundle (see the ROUTE MAP section of
 * ANALYSIS.md). This shell is an honest reconstruction of that *structure*:
 * the grouped navigation follows the roles the bundle implied, and every
 * screen is populated with obviously-demo fixtures.
 */

export function AppShell({
  path,
  title,
  subtitle,
  children,
}: {
  path: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 pb-8 pt-[calc(59px+2rem)] md:pb-10 md:pt-[calc(65px+2.5rem)]">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-56 md:shrink-0">
          <div className="md:sticky md:top-24">
            <p className="eyebrow-index mb-2 px-3">Reconstructed app</p>
            <nav aria-label="App sections" className="flex flex-wrap gap-1 md:flex-col">
              {appGroups.map((group) => (
                <div key={group} className="mb-2">
                  <p className="eyebrow-index px-3 pb-1 pt-2">{group}</p>
                  {appRoutes
                    .filter((route) => route.group === group)
                    .map((route) => {
                      const active = route.path === path;
                      return (
                        <Link
                          key={route.path}
                          href={route.path}
                          aria-current={active ? "page" : undefined}
                          className={
                            active
                              ? "block rounded-control bg-accent-subtle px-3 py-1.5 text-sm font-medium text-accent-subtle-foreground"
                              : "block rounded-control px-3 py-1.5 text-sm text-content-secondary transition-colors hover:bg-control-button-default hover:text-content-primary"
                          }
                        >
                          {route.label}
                        </Link>
                      );
                    })}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-6 border-b border-border-solid/10 pb-5">
            <p className="eyebrow-index">Synaps Clone · app shell</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-content-primary md:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm text-content-secondary">{subtitle}</p>
            ) : null}
            <ModeSwitch />
          </header>
          {children}
        </div>
      </div>
    </main>
  );
}

/**
 * Drafting / Polishing mode switch.
 *
 * The two-mode model is an observed, quoted part of the product narrative
 * ("One canvas, two modes"). The switch is CSS-only: a pair of radio inputs
 * plus the `.ds-modeswitch-thumb` component token. It drives presentation
 * only — no drawing state exists in this reconstruction.
 */
export function ModeSwitch() {
  return (
    <div className="mt-5 inline-flex items-center gap-3">
      <span className="eyebrow-index">Mode</span>
      <div className="relative inline-flex rounded-pill border border-border-solid/15 bg-background p-1">
        <input
          type="radio"
          name="app-mode"
          id="app-mode-draft"
          value="draft"
          defaultChecked
          className="peer sr-only"
        />
        <input
          type="radio"
          name="app-mode"
          id="app-mode-polish"
          value="polish"
          className="peer sr-only"
        />
        <label
          htmlFor="app-mode-draft"
          className="relative z-10 cursor-pointer rounded-pill px-4 py-1.5 text-sm text-content-secondary transition-colors peer-checked:text-content-primary"
        >
          Drafting
        </label>
        <label
          htmlFor="app-mode-polish"
          className="relative z-10 cursor-pointer rounded-pill px-4 py-1.5 text-sm text-content-secondary transition-colors peer-checked:text-content-primary"
        >
          Polishing
        </label>
        <span className="ds-modeswitch-thumb absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] transition-transform" />
      </div>
    </div>
  );
}
