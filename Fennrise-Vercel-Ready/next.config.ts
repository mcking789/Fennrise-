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
  async headers() {
    return [
      {
        source: "/privacy-policy",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
      {
        source: "/terms-of-service",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
