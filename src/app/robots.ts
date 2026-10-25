import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots — verbatim transcription of the analysed site's file
 * (harvested 2026-10-25): allow-all with a four-entry disallow list and
 * a sitemap pointer. The two CMS-internal disallow entries are carried
 * even though the clone has no such routes — the file is a public
 * artifact and Disallow entries for non-existent paths are inert.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/company/team-variants/",
          "/company/careers/careers-grid-",
          "/dev/",
          "/preview/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
