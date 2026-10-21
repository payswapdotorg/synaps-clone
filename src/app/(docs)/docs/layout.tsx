import { DocsSidebar } from "@/components/docs/DocsSidebar";

/**
 * Docs shell — three-column GitBook layout from the harvest: sidebar
 * (w-72) · content (fluid, prose capped) · "On this page" outline
 * (w-64). Content pages render a fragment of
 * `<main class="docs-main">` + `<DocsToc>`, whose children spread into
 * this grid. The (docs) route group provides the docs header.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-shell">
      <DocsSidebar />
      {children}
    </div>
  );
}
