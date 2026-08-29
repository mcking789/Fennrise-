import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/waitlist",
        destination: "/",
        permanent: true,
      },
      {
        source: "/waitlist.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wailist",
        destination: "/",
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
