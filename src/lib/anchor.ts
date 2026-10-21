/** Slugify an h2 heading into a DOM id (shared by docs pages + TOC). */
export function anchorId(h2: string) {
  return h2
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
