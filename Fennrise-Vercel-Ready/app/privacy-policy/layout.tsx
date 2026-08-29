import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Privacy Policy — Fennrise";
const description =
  "How Fennrise collects, uses, protects, and manages personal information.";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    type: "website",
    url: "/privacy-policy",
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

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
