/**
 * Single source of truth for values that cannot be expressed as CSS custom
 * properties (e.g. Next.js `metadata.themeColor`, which is emitted as a
 * literal string into a <meta> tag and therefore cannot resolve `var()`).
 *
 * Every value here mirrors a token declared in `src/app/globals.css`.
 * Keep the two in sync.
 */

/** Light-mode application background — mirrors `--surface--base`. */
export const THEME_COLOR = "#fcfcfc";
