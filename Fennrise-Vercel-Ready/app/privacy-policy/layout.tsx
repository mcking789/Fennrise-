import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Privacy Policy — Fennrise";
const description =
  "Official Fennrise Privacy Policy covering website and waitlist data, privacy rights, security, and contact information.";

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
