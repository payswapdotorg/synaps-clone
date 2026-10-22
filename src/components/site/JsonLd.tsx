/**
 * Renders one or more schema.org JSON-LD blocks. Server component — the
 * JSON is serialised at render time and `<` is escaped so no user- or
 * content-derived string can break out of the script element.
 */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
