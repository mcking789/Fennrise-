import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Terms of Service — Fennrise";
const description =
  "Official Fennrise Terms of Service covering website use, waitlist access, intellectual property, payments, liability, and legal contact information.";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    type: "website",
    url: "/terms-of-service",
    siteName: "Fennrise",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function TermsOfServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
