import type { NextConfig } from "next";
import redirects from "./redirects.json";

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // 308 from Next, treated by search engines as a 301. Source of truth: redirects.json.
  async redirects() {
    return redirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }));
  },
  async headers() {
    return [
      {
        // Historic WordPress upload URLs carry backlinks; keep them resolving and cacheable.
        source: "/content/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default config;
