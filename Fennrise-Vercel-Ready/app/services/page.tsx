import type { Metadata } from "next";
import ServicesExperience from "./services-experience";

export const metadata: Metadata = {
  title: "Services — Studio & Forge | Fennrise",
  description: "Work with Fennrise Studio for websites and digital experiences, or Fennrise Forge for custom software, portals, dashboards, and automation.",
  alternates: { canonical: "/services" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Fennrise Studio",
      serviceType: "Website design and digital experience development",
      url: "https://www.fennrise.com/services#studio",
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@id": "https://www.fennrise.com/#organization" },
      description:
        "Premium websites, landing pages, UI/UX design, responsive development and web applications.",
    },
    {
      "@type": "Service",
      name: "Fennrise Forge",
      serviceType: "Custom software and business automation",
      url: "https://www.fennrise.com/services#forge",
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@id": "https://www.fennrise.com/#organization" },
      description:
        "Custom software, business dashboards, portals, internal tools, workflow automation and web applications.",
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesExperience />
    </>
  );
}
