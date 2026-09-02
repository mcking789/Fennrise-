import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnalyticsConsent from "./components/AnalyticsConsent";
import "./globals.css";
import "./a11y.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.fennrise.com";
const siteTitle = "Fennrise — STAR, Fenn & Intelligent Digital Products";
const siteDescription =
  "Fennrise builds STAR, an intelligent assistant for students and everyday users, alongside Fenn and a growing ecosystem of focused digital products.";

const searchKeywords = [
  "Fennrise",
  "Fenrise",
  "Fenn Rise",
  "Fennrise STAR",
  "STAR assistant",
  "STAR student assistant",
  "assistant for students",
  "student productivity assistant",
  "intelligent assistant",
  "Fennrise Fenn",
  "Fenn productivity app",
  "productivity app",
  "focus app",
  "goal planner",
  "digital products",
  "technology products",
  "Fennrise Relay",
  "Fennrise Studio",
  "Fennrise Forge",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Fennrise",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/fennrise-logo.png`,
  description:
    "Fennrise creates intelligent digital products, including STAR, an assistant for students and everyday users, and Fenn, a productivity and planning platform.",
  email: "connect@fennrise.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general enquiries",
      email: "connect@fennrise.com",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@fennrise.com",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "privacy",
      email: "privacy@fennrise.com",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "legal",
      email: "legal@fennrise.com",
      availableLanguage: ["English"],
    },
  ],
  brand: {
    "@type": "Brand",
    name: "Fennrise",
    logo: `${siteUrl}/fennrise-logo.png`,
  },
  knowsAbout: [
    "Intelligent digital products",
    "Student productivity",
    "Personal assistants",
    "Productivity software",
    "Goal planning",
    "Focus tools",
    "Digital experiences",
    "Software products",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: "Fennrise",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Fennrise",
  title: siteTitle,
  description: siteDescription,
  keywords: searchKeywords,
  authors: [{ name: "Fennrise", url: siteUrl }],
  creator: "Fennrise",
  publisher: "Fennrise",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Fennrise",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fennrise — STAR, Fenn and intelligent digital products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
