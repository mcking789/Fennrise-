import type { MetadataRoute } from "next";

const baseUrl = "https://www.fennrise.com";
const updated = new Date("2026-09-02");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/waitlist`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
