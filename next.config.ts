import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The clone is educational and self-contained; no remote image hosts or
  // rewrites are needed yet. Milestone 6 adds the production build profile.
  async headers() {
    // Security headers transcribed from the live synaps.app response
    // (curl -sI https://synaps.app/): SAMEORIGIN framing, HSTS, strict
    // referrers, nosniff. Applied uniformly — the clone serves marketing,
    // docs and the app on one origin, and the marketing set is the
    // product's own choice. (The live docs' weaker
    // `no-referrer-when-downgrade` is GitBook's platform default, not a
    // Synaps decision, so it is not carried over.)
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
