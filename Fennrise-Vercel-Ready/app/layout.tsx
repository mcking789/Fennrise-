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
const siteTitle = "Fennrise — AI, Voice, Software & Digital Products";
const siteDescription =
  "Fennrise builds intelligent digital products, voice AI, premium websites, and custom software through Star, Relay, Fenn, Studio, and Forge.";

const searchKeywords = [
  "Fennrise",
  "Fenrise",
  "Fenn Rise",
  "Fennrise AI",
  "Fennrise Star",
  "Fennrise Relay",
  "Fennrise calling bot",
  "AI calling assistant",
  "AI receptionist",
  "voice AI for business",
  "business calling bot",
  "Fennrise Studio",
  "Fennrise Forge",
  "Fenn productivity app",
  "AI assistant",
  "productivity app",
  "digital products",
  "software development",
  "custom software",
  "business software",
  "business automation software",
  "software company Pune",
  "software development Pune",
  "web design",
  "web development",
  "web apps",
  "UI UX design",
  "technology company India",
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Fennrise",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/fennrise-logo.png`,
  description:
    "Fennrise builds intelligent digital products, voice AI, custom software, premium websites, web apps, and productivity technology.",
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
    "Voice AI",
    "AI calling assistants",
    "AI receptionists",
    "Software development",
    "Custom software",
    "Business automation",
    "Productivity software",
    "Digital products",
    "Web applications",
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
