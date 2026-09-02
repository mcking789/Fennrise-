import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/waitlist": ["./public/waitlist.html"],
  },
  async redirects() {
    return [
      {
        source: "/waitlist.html",
        destination: "/waitlist",
        permanent: true,
      },
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
