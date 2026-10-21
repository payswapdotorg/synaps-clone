import "../site.css";
import "../docs.css";
import { DocsHeader } from "@/components/docs/DocsHeader";

/**
 * Docs shell — GitBook-style chrome for /docs, distinct from the
 * marketing site: a compact sticky header with search + socials +
 * "Open Synaps", no marketing footer. Structure transcribed from the
 * docs.synaps.app harvest (see docs/SITE-PARITY-PLAN.md); all artwork
 * original.
 */
export default function DocsRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="ms"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <DocsHeader />
      <div style={{ flex: 1 }}>{children}</div>
      <footer className="docs-footer">
        <span>
          Synaps Clone — study clone. Docs content is original writing in a
          GitBook-style layout; the product it describes is simulated.
        </span>
      </footer>
    </div>
  );
}
