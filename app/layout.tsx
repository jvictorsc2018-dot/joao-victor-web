import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "João Victor Web | Sites e sistemas sob medida",
  description:
    "Desenvolvimento de sites, lojas virtuais, cardápios digitais e sistemas de gestão personalizados para empresas.",
  keywords: [
    "desenvolvimento de sites",
    "sistemas web",
    "loja virtual",
    "cardápio digital",
    "João Victor Web",
  ],
  authors: [{ name: "João Victor Costa" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "João Victor Web",
    description:
      "Sites e sistemas que transformam ideias em negócios.",
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "João Victor Web",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "João Victor Web",
      description:
        "Sites e sistemas que transformam ideias em negócios.",
      inLanguage: ["pt-BR", "en-US", "es-ES"],
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "João Victor Costa",
      url: siteUrl,
      jobTitle: "Desenvolvedor de sites e sistemas web",
      knowsAbout: [
        "Desenvolvimento de sites",
        "Sistemas web",
        "Lojas virtuais",
        "Cardápios digitais",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
