import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const socialImage = `${siteUrl}/box_wash_social.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Psí SPA Box",
    template: "%s | Psí SPA Box",
  },
  description:
    "Samoobslužná umyvárka pre psov s rezerváciou 24/7. Prídeš, otvoríš dvere kódom z mobilu, umyješ psíka a ideš ďalej bez neporiadku doma.",
  applicationName: "Psí SPA Box",
  keywords: [
    "psia umyvarka",
    "samoobsluzna umyvaren pre psov",
    "dog wash",
    "umyvanie psov",
    "psi spa",
  ],
  category: "pet care",
  alternates: {
    languages: {
      sk: "/sk",
      en: "/en",
    },
  },
  openGraph: {
    title: "Psí SPA Box",
    description:
      "Samoobslužná umyvárka pre psov s prístupom cez kód z mobilu. Rýchle, čisté a pohodlné riešenie bez chaosu doma.",
    type: "website",
    url: siteUrl,
    siteName: "Psí SPA Box",
    images: [
      {
        url: socialImage,
        width: 1536,
        height: 1024,
        alt: "Psí SPA Box social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psí SPA Box",
    description:
      "Prídeš so psom, otvoríš box kódom a vybavíš kúpanie rýchlo a čisto.",
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
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
