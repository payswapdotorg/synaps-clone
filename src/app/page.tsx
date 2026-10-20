import Link from "next/link";

/**
 * Placeholder landing page.
 *
 * Milestone 3 replaces this with the marketing landing page; it exists now so
 * the scaffold renders end-to-end and to exercise the token layer.
 */
export default function HomePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 py-24">
      <p className="eyebrow-index">[01] DRAFTING / SECTION 1 / 4</p>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-content-primary">
        Synaps, Architectural Practice without the compromise
      </h1>

      <p className="mt-4 max-w-2xl text-content-secondary">
        Built for the everyday architecture practice. One canvas, two modes.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/register"
          className="touch-text rounded-pill bg-accent-solid px-5 text-sm font-medium text-accent-solid-foreground transition-colors hover:bg-accent-solid-hover"
        >
          Start designing free
        </Link>
        <Link
          href="/login"
          className="btn-secondary text-sm"
        >
          Log in
        </Link>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Drafting",
            body: "Accurate floor plans. Multilayer walls. Rooms shaped with precision.",
          },
          {
            label: "Polishing",
            body: "Shadows. Cast and edit live. Sun position, time of day.",
          },
          {
            label: "Spatial visualization",
            body: "Walk the space. Camera framing built in.",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-surface border border-border-solid/10 bg-surface-base p-6"
          >
            <h2 className="ds-accent-mono text-2xs uppercase">{card.label}</h2>
            <p className="mt-3 text-sm text-content-secondary">{card.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-2xs text-content-muted">
        Milestone 2 scaffold — the landing page arrives in milestone 3.
      </p>
    </main>
  );
}
