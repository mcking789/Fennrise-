import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://fennrise.com";
const siteTitle = "Fennrise — AI, Productivity & Digital Products";
const siteDescription =
  "Fennrise builds intelligent digital products including Star, Fenn, and Fennrise Studio for AI assistance, productivity, web design, and digital creation.";

const searchKeywords = [
  "Fennrise",
  "Fenrise",
  "Fenn Rise",
  "Fennrise AI",
  "Fennrise Star",
  "Fennrise Studio",
  "Fenn productivity app",
  "AI assistant",
  "productivity app",
  "digital products",
  "web design",
  "web development",
  "UI UX design",
  "technology company India",
  "software company Pune",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Fennrise",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/fennrise-logo.png`,
  description:
    "Fennrise builds digital products for artificial intelligence, productivity, intelligent assistance, web design, and digital creation.",
  email: "hello@fennrise.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  brand: {
    "@type": "Brand",
    name: "Fennrise",
    logo: `${siteUrl}/fennrise-logo.png`,
  },
  knowsAbout: [
    "Artificial intelligence",
    "Productivity software",
    "Digital products",
    "Web design",
    "Web development",
    "UI/UX design",
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
  inLanguage: "en-IN",
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
    locale: "en_IN",
    url: "/",
    siteName: "Fennrise",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/fennrise-logo.png",
        alt: "Fennrise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/fennrise-logo.png"],
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
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
