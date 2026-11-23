import type { Metadata } from "next";
import ProductsExperience from "./products-experience";

export const metadata: Metadata = {
  title: "Products — STAR & Fenn | Fennrise",
  description: "Explore STAR and Fenn: Fennrise products in development for intelligent assistance and focused productivity.",
  alternates: { canonical: "/products" },
};

const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Fennrise products",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "STAR",
        url: "https://www.fennrise.com/products#star",
        brand: { "@type": "Brand", name: "Fennrise" },
        description: "An intelligent assistant for useful conversations, creation, research, coding, and everyday actions.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Fenn",
        url: "https://www.fennrise.com/products#fenn",
        brand: { "@type": "Brand", name: "Fennrise" },
        description: "A focused productivity experience for goals, planning, habits, reminders, opportunities, and progress insights.",
      },
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductsExperience />
    </>
  );
}
