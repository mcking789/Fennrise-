import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fennrise.com/sitemap.xml",
    host: "https://fennrise.com",
  };
}
