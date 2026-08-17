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
  openGraph: {
    title: "João Victor Web",
    description:
      "Sites e sistemas que transformam ideias em negócios.",
    type: "website",
    locale: "pt_BR",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
        {children}
      </body>
    </html>
  );
}
