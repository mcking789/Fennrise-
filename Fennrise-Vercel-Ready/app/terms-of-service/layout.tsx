import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Terms of Service — Fennrise";
const description = "Terms that apply when you access Fennrise and its waitlist.";

export const metadata: Metadata = {
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
