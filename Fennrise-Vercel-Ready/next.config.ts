import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/waitlist",
        destination: "/waitlist.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/wailist",
        destination: "/waitlist",
        permanent: true,
      },
      {
        source: "/privacy.html",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms.html",
        destination: "/terms-of-service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
