import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots — mirrors the analysed site's file shape (allow-all with a small
 * disallow list for non-public path prefixes and a sitemap pointer). The
 * analysed site's CMS-internal disallow entries have no equivalent routes
 * here, so only the generic prefixes are kept.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dev/", "/preview/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
