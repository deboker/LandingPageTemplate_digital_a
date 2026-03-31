import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const socialImage = `${siteUrl}/box_wash_social.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pet Spa Box",
    template: "%s | Pet Spa Box",
  },
  description:
    "Samoobslužná umyvárka pre psíkov a mačky s rezerváciou 24/7. Prídeš, otvoríš dvere kódom z mobilu a pohodlne umyješ svojho miláčika bez neporiadku doma.",
  applicationName: "Pet Spa Box",
  keywords: [
    "psia umyvarka",
    "umyvanie maciek",
    "samoobsluzna umyvaren pre psikov a macky",
    "pet wash",
    "dog wash",
    "cat wash",
    "umyvanie zvierat",
    "pet spa",
  ],
  category: "pet care",
  alternates: {
    languages: {
      sk: "/sk",
      en: "/en",
    },
  },
  openGraph: {
    title: "Pet Spa Box",
    description:
      "Samoobslužná umyvárka pre psíkov a mačky s prístupom cez kód z mobilu. Rýchle, čisté a pohodlné riešenie bez chaosu doma.",
    type: "website",
    url: siteUrl,
    siteName: "Pet Spa Box",
    images: [
      {
        url: socialImage,
        width: 1536,
        height: 1024,
        alt: "Pet Spa Box social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Spa Box",
    description:
      "Prídeš s miláčikom, otvoríš box kódom a vybavíš kúpanie rýchlo a čisto.",
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
