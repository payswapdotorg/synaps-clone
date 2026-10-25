/**
 * Page templates for the marketing surface — one view per harvested
 * page archetype (solution, blog post, changelog entry, alternative-to,
 * career, legal). Layout patterns follow the harvest: page hero with
 * dimmed headline tail, hairline sections, arrow-card grids, compare
 * tables, +/− accordions, typed changelog items.
 */
import Link from "next/link";
import type {
  AltToolData,
  BlogPostData,
  CareerData,
  ChangelogEntryData,
  LegalDoc,
  SolutionData,
} from "@/content/types";
import {
  ArrowCards,
  CompareTable,
  FaqList,
  PageHero,
  SectionHead,
} from "./blocks";
import { formatDisplayDate } from "@/lib/seo";

function Section({
  children,
  head,
  hatch = false,
}: {
  children: React.ReactNode;
  head?: React.ReactNode;
  hatch?: boolean;
}) {
  return (
    <section
      className={hatch ? "ms-hatch--soft" : undefined}
      style={{
        borderTop: hatch ? "1px solid var(--ms-hairline)" : undefined,
        paddingBlock: "clamp(44px, 6vw, 84px)",
      }}
    >
      <div className="ms-container ms-stack-32">
        {head}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Solutions                                                           */
/* ------------------------------------------------------------------ */

export function SolutionView({ data }: { data: SolutionData }) {
  return (
    <>
      <PageHero title={data.title} lead={data.lead} />

      {data.features.map((feature, i) => (
        <Section
          key={feature.title}
          hatch={i % 2 === 1}
          head={
            <div className="ms-stack-16">
              <span className="ms-label">{`0${i + 1}`}</span>
              <h2 className="ms-h2">{feature.title}</h2>
              {feature.body ? (
                <p className="ms-body" style={{ maxWidth: "60ch" }}>
                  {feature.body}
                </p>
              ) : null}
            </div>
          }
        >
          {feature.bullets?.length ? (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                maxWidth: 720,
              }}
            >
              {feature.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    borderTop: "1px solid var(--ms-hairline)",
                    padding: "14px 2px",
                    fontSize: 16.5,
                    color: "var(--ms-ink-soft)",
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ))}

      <Section
        head={<SectionHead title="Compare with" dim="your current stack." />}
      >
        <CompareTable head={data.compare.head} rows={data.compare.rows} />
      </Section>

      <Section
        head={<SectionHead title="Continue with" dim="another use case." />}
      >
        <ArrowCards items={data.crossLinks} />
      </Section>

      {data.pathCards.length ? (
        <Section
          head={
            <SectionHead
              title="Or pick the path that"
              dim="matches your team."
            />
          }
        >
          <ArrowCards items={data.pathCards} />
        </Section>
      ) : null}

      <Section head={<SectionHead title="Questions before" dim="getting started." />}>
        <FaqList items={data.faqs} />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export function BlogPostView({
  data,
  more,
}: {
  data: BlogPostData;
  more: BlogPostData[];
}) {
  /* Hero width variants, transcribed from the live SSR markup: standard
   * 720px; "wide" (data-illustrated) 1120px with 40px auto margins;
   * "compact" (data-illustrated + data-size=compact) 560px; "none"
   * renders no hero figure at all (two live posts ship without one). */
  const hero = data.heroWidth ?? "standard";
  const heroStyle =
    hero === "wide"
      ? { maxWidth: 1120, margin: "40px auto" }
      : hero === "compact"
        ? { maxWidth: 560, margin: "40px auto" }
        : {
            maxWidth: 720,
            marginInline: "auto",
            marginBottom: "clamp(28px, 3.5svh, 40px)",
          };

  return (
    <>
      {/* Live post heroes carry only the eyebrow + h1 — no meta, no lead:
       * the date · category · read line lives in the article as the
       * kicker, under a "← Blog" back link (ds-article-back/kicker). */}
      <PageHero title={data.title} />

      <div
        className="ms-container"
        style={{ paddingBottom: "clamp(40px, 5svh, 56px)" }}
      >
        <div style={{ maxWidth: 720, marginInline: "auto" }}>
          <p className="ms-article-back">
            <Link href="/news/blog/">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Blog
            </Link>
          </p>
          <p className="ms-article-kicker">
            {formatDisplayDate(data.date)} · {data.category} · {data.minutes}{" "}
            min read
          </p>
        </div>

        {hero !== "none" ? (
          <figure style={heroStyle}>
            {/* The clone's own B&W editorial cover stands in for the live
             * CMS image (public/images/blog/covers/{slug}.png); live loads
             * post heroes eagerly with a descriptive alt. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={`${data.title} — cover image`}
              width={1344}
              height={768}
              loading="eager"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: 4,
                border: "1px solid var(--ms-border)",
              }}
            />
          </figure>
        ) : null}

        <article
          className="ms-prose"
          style={{ maxWidth: 720, marginInline: "auto" }}
        >
          <p>{data.dek}</p>
          {data.sections.map((section) => (
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
                    {sub.list?.length ? (
                      <ul>
                        {sub.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </section>
            ))}
            {data.faqs?.length ? (
              <section>
                <h2>Frequently asked questions</h2>
                <div style={{ maxWidth: "none" }}>
                  <FaqList items={data.faqs} />
                </div>
              </section>
            ) : null}
          </article>
      </div>

      {/* "More from the blog" — live serves the next-3-newest posts
       * (wrapping past the oldest) as hub-style image cards in the
       * always-2-column grid, between the article and the crosslinks. */}
      {more.length ? (
        <section style={{ paddingBlock: "clamp(80px, 14svh, 160px)" }}>
          <div className="ms-container">
            <h2
              className="ms-h2"
              style={{ margin: "0 0 clamp(28px, 3.5svh, 40px)" }}
            >
              More from the blog
            </h2>
            <div className="ms-blog-grid">
              {more.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/blog/${post.slug}`}
                  className="ms-blog-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/blog/covers/${post.slug}.png`}
                    alt=""
                    width={1344}
                    height={768}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <span className="ms-blog-card-category">
                      {post.category}
                    </span>
                    <span className="ms-blog-card-meta">
                      {formatDisplayDate(post.date)} · {post.minutes} min read
                    </span>
                    <h3 className="ms-blog-card-title">{post.title}</h3>
                    <p className="ms-blog-card-excerpt">{post.dek}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Crosslinks, transcribed from the live ds-crosslink section:
       * three job-card tiles (title + meta + arrow) in a 3-column grid.
       * "Synaps Studio" links the clone's own app entry (/login) where
       * live links beta.synaps.app. */}
      <section style={{ paddingBlock: "clamp(80px, 14svh, 160px)" }}>
        <div className="ms-container">
          <h2
            className="ms-h2"
            style={{ margin: "0 0 clamp(20px, 2.5svh, 28px)" }}
          >
            Continue reading
          </h2>
          <ArrowCards
            columns={3}
            items={[
              {
                label: "Release notes",
                href: "/news/changelog",
                note: "Terse release notes by version",
              },
              {
                label: "Alternative to",
                href: "/news/alternative-to",
                note: "Honest stack comparisons",
              },
              {
                label: "Synaps Studio",
                href: "/login",
                note: "Open the app",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Changelog                                                           */
/* ------------------------------------------------------------------ */

const KIND_STYLE: Record<string, { color: string; bg: string }> = {
  New: { color: "#0c6b3f", bg: "rgba(12,107,63,0.08)" },
  Improved: { color: "#1060c0", bg: "rgba(16,96,192,0.08)" },
  Fixed: { color: "#974108", bg: "rgba(151,65,8,0.09)" },
};

export function ChangelogEntryView({
  data,
}: {
  data: ChangelogEntryData;
}) {
  return (
    <>
      <PageHero
        eyebrow={false}
        back={{ label: "Release notes", href: "/news/changelog" }}
        title={data.title}
        meta={
          <>
            <time dateTime={data.date}>{formatDisplayDate(data.date)}</time>
            <br />
            {data.summary}
          </>
        }
      />
      <div
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-stack-24" style={{ maxWidth: 820 }}>
          {data.items.map((item) => {
            const style = KIND_STYLE[item.kind] ?? KIND_STYLE.Improved;
            return (
              <article
                key={item.title}
                className="ms-card"
                style={{ padding: "22px 24px" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="ms-label"
                    style={{ color: style.color, background: style.bg, padding: "4px 10px", borderRadius: 999 }}
                  >
                    {item.kind}
                  </span>
                  <h2 className="ms-h3">{item.title}</h2>
                </div>
                <p className="ms-body" style={{ margin: "10px 0 0" }}>
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Alternative-to                                                      */
/* ------------------------------------------------------------------ */

export function AltToolView({
  data,
  others,
}: {
  data: AltToolData;
  others: { label: string; href: string }[];
}) {
  return (
    <>
      <PageHero
        title={`Synaps as an alternative to ${data.tool}`}
        lead={data.lead}
      />

      <Section head={<SectionHead title={`Synaps vs ${data.tool}`} />}>
        <CompareTable head={data.compare.head} rows={data.compare.rows} />
      </Section>

      {data.sections.map((section) => (
        <Section key={section.h2} head={<SectionHead title={section.h2} />}>
          <div className="ms-prose" style={{ maxWidth: "68ch" }}>
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
          </div>
        </Section>
      ))}

      <Section
        head={
          <SectionHead
            title="When to switch from"
            dim={`${data.tool}, and when not.`}
          />
        }
      >
        <div className="ms-grid-2">
          <div className="ms-card" style={{ padding: "26px 28px" }}>
            <span className="ms-label" style={{ color: "var(--ms-draft)" }}>
              Switch to Synaps when
            </span>
            <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
              {data.switchWhen.map((item) => (
                <li
                  key={item}
                  style={{
                    borderTop: "1px solid var(--ms-hairline)",
                    padding: "12px 2px",
                    fontSize: 15.5,
                    color: "var(--ms-ink-soft)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ms-card" style={{ padding: "26px 28px" }}>
            <span className="ms-label" style={{ color: "#c7560a" }}>
              {`Stay on ${data.tool} when`}
            </span>
            <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
              {data.stayWhen.map((item) => (
                <li
                  key={item}
                  style={{
                    borderTop: "1px solid var(--ms-hairline)",
                    padding: "12px 2px",
                    fontSize: 15.5,
                    color: "var(--ms-ink-soft)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section head={<SectionHead title={`${data.tool} questions we hear`} />}>
        <FaqList items={data.faqs} />
      </Section>

      <Section head={<SectionHead title="Compare Synaps with" dim="another tool." />}>
        <ArrowCards items={others} />
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export function CareerView({
  data,
  otherRoles,
}: {
  data: CareerData;
  otherRoles: { label: string; href: string }[];
}) {
  return (
    <>
      <PageHero
        eyebrow={false}
        title={data.title}
        meta={`${data.team} · ${data.location} · ${data.type}`}
        lead={data.lead}
      >
        <Link href="/company/#company-careers" className="ms-btn">
          Apply
        </Link>
        <p style={{ fontSize: 12.5, color: "var(--ms-muted)" }}>
          (simulated — no applications are sent)
        </p>
      </PageHero>

      <div
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-prose" style={{ maxWidth: "72ch" }}>
          {data.sections.map((section) => (
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
            </section>
          ))}
        </div>
      </div>

      {otherRoles.length ? (
        <Section head={<SectionHead title="Other open" dim="roles." />}>
          <ArrowCards items={otherRoles} />
        </Section>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Legal                                                               */
/* ------------------------------------------------------------------ */

export function LegalView({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero title={doc.title} lead={doc.lead} />
      <div
        className="ms-container"
        style={{ paddingBottom: "clamp(48px, 6vw, 88px)" }}
      >
        <div className="ms-prose" style={{ maxWidth: "76ch" }}>
          <p style={{ fontSize: 13, color: "var(--ms-muted)" }}>
            Study-clone reconstruction: section structure follows the analysed
            page; the text itself is original and not a legal document.
          </p>
          {doc.sections.map((section) => (
            <section key={section.h3}>
              <h3 style={{ fontSize: 21 }}>{section.h3}</h3>
              {section.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
