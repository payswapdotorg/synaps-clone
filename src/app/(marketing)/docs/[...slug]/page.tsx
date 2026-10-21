import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docsPages } from "@/content/docs";

export function generateStaticParams() {
  return docsPages
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = docsPages.find((p) => p.slug === slug.join("/"));
  return { title: page?.title ?? "Documentation", description: page?.lead };
}

export default async function DocsContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = docsPages.find((p) => p.slug === slug.join("/"));
  if (!page) notFound();

  const idx = docsPages.findIndex((p) => p.slug === page.slug);
  const prev = idx > 0 ? docsPages[idx - 1] : null;
  const next = idx < docsPages.length - 1 ? docsPages[idx + 1] : null;

  return (
    <main id="content" className="ms-stack-32" style={{ maxWidth: 760 }}>
      <div className="ms-stack-16">
        <span className="ms-label">{page.group}</span>
        <h1 className="ms-h2">{page.title}</h1>
        <p className="ms-lead">{page.lead}</p>
      </div>

      <div className="ms-prose">
        {page.sections.map((section) => (
          <section key={section.h2}>
            <h2>{section.h2}</h2>
            {section.paras?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.list?.length ? (
              <ul>
                {section.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : null}
            {section.subsections?.map((sub) => (
              <div key={sub.h3}>
                <h3>{sub.h3}</h3>
                {sub.paras?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>

      <nav
        aria-label="Pagination"
        className="flex items-center justify-between gap-4"
        style={{
          borderTop: "1px solid var(--ms-hairline)",
          paddingTop: 20,
        }}
      >
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="no-underline"
            style={{ color: "var(--ms-ink-soft)" }}
          >
            <span style={{ fontSize: 11, color: "var(--ms-muted)" }}>Previous</span>
            <br />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="no-underline text-right"
            style={{ color: "var(--ms-ink-soft)" }}
          >
            <span style={{ fontSize: 11, color: "var(--ms-muted)" }}>Next</span>
            <br />
            {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
