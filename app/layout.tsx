import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digital A Landing Page Template",
    template: "%s | Digital A Landing Template",
  },
  description:
    "Modern Next.js landing page template with Tailwind, Motion for React, bilingual routing and Sanity-ready content editing.",
  applicationName: "Digital A Landing Page Template",
  keywords: [
    "landing page template",
    "next.js landing page",
    "sanity cms",
    "tailwind template",
    "digital marketing website",
  ],
  category: "marketing",
  alternates: {
    languages: {
      sk: "/sk",
      en: "/en",
    },
  },
  openGraph: {
    title: "Digital A Landing Page Template",
    description:
      "A premium landing page starter for campaigns, service offers and launch websites.",
    type: "website",
    url: siteUrl,
    siteName: "Digital A",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital A Landing Page Template",
    description:
      "Next.js, Tailwind and Sanity-ready landing page template for fast campaign launches.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
