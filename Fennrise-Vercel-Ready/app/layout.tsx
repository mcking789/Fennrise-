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
const siteTitle = "Fennrise — Digital Products for Work, Focus & Creation";
const siteDescription =
  "Explore Fennrise products including Star, Fenn, and Fennrise Studio—built for smarter work, focused productivity, and digital creation.";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Fennrise",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/fennrise-logo.png`,
  description:
    "Fennrise builds digital products for productivity, intelligent assistance, and web design.",
  email: "hello@fennrise.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
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
        <div className="site-skeleton" aria-hidden="true">
          <div className="skeleton-nav">
            <span className="skeleton-logo" />
            <span className="skeleton-nav-line" />
            <span className="skeleton-nav-line short" />
            <span className="skeleton-nav-button" />
          </div>
          <div className="skeleton-stage">
            <div className="skeleton-copy">
              <span className="skeleton-kicker" />
              <span className="skeleton-title" />
              <span className="skeleton-title second" />
              <span className="skeleton-text" />
              <span className="skeleton-text short" />
              <span className="skeleton-action" />
            </div>
            <div className="skeleton-visual">
              <span />
              <i />
              <b />
            </div>
          </div>
          <span className="skeleton-progress" />
        </div>
        {children}
      </body>
    </html>
  );
}
