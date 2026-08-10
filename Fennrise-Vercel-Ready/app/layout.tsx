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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fennrise.com"),
  title: "Fennrise — Building the Future",
  description:
    "Fennrise creates intelligent digital products that help people work smarter, build faster, and achieve more.",
  alternates: {
    canonical: "/",
  },
  other: {
    "codex-preview": "development",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
