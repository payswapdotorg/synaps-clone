import Link from "next/link";
import {
  authLinks,
  primaryCta,
  primaryLinks,
  productLinks,
  type NavLink,
} from "@/lib/navigation";

/**
 * Top navigation — Product · Solutions · Pricing · Company, the auth actions
 * and the primary CTA, per the NAVIGATION section of ANALYSIS.md.
 *
 * Links point at the real route paths from the ROUTE MAP; the marketing pages
 * themselves are built in later milestones.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-solid/10 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-content-primary"
        >
          SYNAPS<span className="text-accent-text">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <div className="group relative flex items-center gap-4">
            <span className="text-sm text-content-secondary">Product</span>
            <div className="invisible absolute left-0 top-full z-10 flex w-56 flex-col gap-1 rounded-container border border-border-solid/10 bg-surface-base p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {productLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-control px-3 py-2 text-sm text-content-secondary hover:bg-control-button-default hover:text-content-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-content-secondary transition-colors hover:text-content-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="touch-text hidden rounded-control px-3 text-sm text-content-secondary transition-colors hover:text-content-primary sm:inline-flex"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={primaryCta.href}
            className="touch-text rounded-pill bg-accent-solid px-4 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
          >
            {primaryCta.label}
          </Link>

          {/* Mobile disclosure menu — no client JS required. */}
          <details className="relative md:hidden">
            <summary className="touch-size flex cursor-pointer list-none items-center justify-center rounded-control border border-border-solid/15 text-content-secondary">
              <span className="sr-only">Menu</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
                <path d="M1 3h14v2H1V3Zm0 4h14v2H1V7Zm0 4h14v2H1v-2Z" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full z-10 mt-2 w-60 rounded-container border border-border-solid/10 bg-surface-base p-2 shadow-lg">
              <MobileGroup heading="Product" links={productLinks} />
              <MobileGroup heading="Menu" links={primaryLinks} />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

function MobileGroup({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="eyebrow-index px-3 pb-1 pt-2">{heading}</p>
      {links.map((link) => (
        <Link
          key={`${heading}-${link.label}`}
          href={link.href}
          className="block rounded-control px-3 py-2 text-sm text-content-secondary hover:bg-control-button-default hover:text-content-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
