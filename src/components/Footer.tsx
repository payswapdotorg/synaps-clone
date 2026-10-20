import Link from "next/link";
import {
  cookieControls,
  cookieCopy,
  footerGroups,
  type NavLink,
} from "@/lib/navigation";

/**
 * Site footer — Product · Company · Legal · Resources · By type · By use case,
 * plus the cookie-consent utility row, per the NAVIGATION section of
 * ANALYSIS.md.
 *
 * The cookie controls are rendered as inert placeholders: the consent
 * behaviour is not part of the observed public surface.
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border-solid/10 bg-surface-base">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {footerGroups.map((group) => (
            <div key={group.heading}>
              <h2 className="eyebrow-index mb-3">{group.heading}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.heading}-${link.label}`}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookie utility row — exact labels from the captured footer. */}
        <div className="mt-12 rounded-container border border-border-solid/10 bg-background p-4">
          <p className="eyebrow-index mb-3">Cookie settings</p>
          <div className="flex flex-wrap items-center gap-2">
            {cookieControls.map((control) => (
              <button
                key={control.label}
                type="button"
                className="rounded-pill border border-border-solid/15 px-3 py-1 text-2xs text-content-secondary transition-colors hover:bg-control-button-default hover:text-content-primary"
              >
                {control.label}
              </button>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-2xs text-content-muted">
            <p>{cookieCopy.analytics}</p>
            <p>{cookieCopy.advertising}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-solid/10 pt-6 text-2xs text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Educational clone — not affiliated with Synaps.</p>
          <p className="font-mono">Built from a public-surface REA.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ link }: { link: NavLink }) {
  const className =
    "text-sm text-content-secondary transition-colors hover:text-content-primary";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
        <span aria-hidden="true" className="ml-1 text-content-disabled">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}
