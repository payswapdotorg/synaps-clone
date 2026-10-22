"use client";

/**
 * Mobile navigation menu — structure and behaviour transcribed from the
 * live synaps.app mobile header (375px viewport harvest):
 *
 *  - A 44×44 toggle button ("Open menu" / "Close menu", aria-expanded,
 *    aria-controls) shown only below 880px, where the desktop nav links
 *    are hidden. Bars/X glyphs swap via CSS.
 *  - #header-menu sits inside the header, full-bleed under the header
 *    bar, and opens with a max-height transition (the real animates to
 *    609px on a 375×667 viewport; here 72dvh stands in responsively).
 *  - nav groups use <details>/<summary> (Solutions and Alternative to
 *    expand in place; Documentation / Blog / Pricing are direct links).
 *  - CTA row (Start designing free + Book a call) and a utility row
 *    (Instagram, LinkedIn — external, like the footer's cal.com link —
 *    and Log in into the simulated product).
 *  - While open the document scroll is locked; Esc closes; resizing
 *    past 880px closes (desktop chrome takes over).
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SOLUTION_ICONS, ToolMonogram, ExternalLinkIcon } from "./chrome";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflowY;
    html.style.overflowY = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 880) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      html.style.overflowY = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        id="header-toggle"
        className="ms-header-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="header-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ms-icon-bars" aria-hidden="true" />
        <span className="ms-icon-x" aria-hidden="true" />
      </button>

      <div
        id="header-menu"
        className={`ms-header-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="ms-header-menu-inner">
          <nav className="ms-header-menu-nav" aria-label="Primary">
            {NAV.map((item) =>
              item.groups ? (
                <details key={item.href} className="ms-menu-group">
                  <summary>{item.label}</summary>
                  {item.groups.map((group) => (
                    <div key={group.label} className="ms-menu-subgroup">
                      <span className="ms-menu-group-label">{group.label}</span>
                      {group.items.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="ms-menu-link"
                          onClick={close}
                        >
                          <span className="ms-nav-icon-slot" aria-hidden="true">
                            {SOLUTION_ICONS[child.label]}
                          </span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </details>
              ) : item.children ? (
                <details key={item.href} className="ms-menu-group">
                  <summary>{item.label}</summary>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="ms-menu-link"
                      onClick={close}
                    >
                      <ToolMonogram label={child.label} />
                      {child.label}
                    </Link>
                  ))}
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ms-menu-link${item.ext ? " ext" : ""}`}
                  onClick={close}
                >
                  {item.label}
                  {item.ext ? <ExternalLinkIcon /> : null}
                </Link>
              ),
            )}
          </nav>
          <div className="ms-header-menu-ctas">
            <Link href="/register" className="ms-btn ms-btn--sm" onClick={close}>
              Start designing free
            </Link>
            <a
              href="https://cal.com/kevin-cobaj/30min"
              className="ms-btn ms-btn--outline ms-btn--sm"
              onClick={close}
            >
              Book a call
            </a>
          </div>
        </div>
        <div className="ms-header-menu-utility">
          <a
            href="https://www.instagram.com/synaps.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            onClick={close}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/synapsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={close}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />
            </svg>
          </a>
          <Link href="/login" className="ms-menu-login" onClick={close}>
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
