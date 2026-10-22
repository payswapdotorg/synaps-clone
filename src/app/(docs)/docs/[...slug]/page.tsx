import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docsPages } from "@/content/docs";
import { DocsToc } from "@/components/docs/DocsToc";
import { anchorId } from "@/lib/anchor";
import { pageMeta } from "@/lib/seo";

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
  return pageMeta({
    title: page?.title ?? "Documentation",
    description: page?.lead,
    path: `/docs/${slug.join("/")}`,
  });
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
  const headings = page.sections.map((s) => s.h2);

  return (
    <>
      <main id="content" className="docs-main">
        <header className="docs-article-head">
          <span className="docs-article-group">{page.group}</span>
          <h1>{page.title}</h1>
          <p className="docs-article-lead">{page.lead}</p>
        </header>

        <div className="docs-prose">
          {page.sections.map((section) => (
            <section key={section.h2} id={anchorId(section.h2)}>
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

        <nav className="docs-pagination" aria-label="Pagination">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="docs-pagination-link docs-pagination-prev"
            >
              <span>Previous</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="docs-pagination-link docs-pagination-next"
            >
              <span>Next</span>
              {next.title}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <DocsToc headings={headings} />
    </>
  );
}
