import type { Metadata } from "next";
import ServicesExperience from "./services-experience";

export const metadata: Metadata = {
  title: "Services — Studio & Forge | Fennrise",
  description: "Work with Fennrise Studio for websites and digital experiences, or Fennrise Forge for custom software, portals, dashboards, and automation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesExperience />;
}
