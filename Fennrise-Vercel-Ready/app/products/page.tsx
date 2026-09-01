import type { Metadata } from "next";
import ProductsExperience from "./products-experience";

export const metadata: Metadata = {
  title: "Products — STAR, Fenn & Relay | Fennrise",
  description: "Explore STAR, Fenn, and Relay: Fennrise products for intelligent assistance, focused productivity, and business voice AI.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return <ProductsExperience />;
}
