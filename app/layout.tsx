import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://the-holding.seiuanealodio.chatgpt.site"),
  title: "The Holding — Um Grupo. Diferentes Soluções.",
  description: "Tecnologia, registo empresarial, soluções financeiras, transportes, logística e manutenção num ecossistema preparado para o futuro.",
  openGraph: {
    title: "The Holding — Um Grupo. Diferentes Soluções.",
    description: "Tecnologia, registo empresarial, soluções financeiras, transportes, logística e manutenção num ecossistema preparado para o futuro.",
    locale: "pt_MZ",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "The Holding — Um Grupo. Diferentes Soluções. Uma Visão de Futuro." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Holding — Um Grupo. Diferentes Soluções.",
    description: "Tecnologia, registo empresarial, soluções financeiras, transportes, logística e manutenção num ecossistema preparado para o futuro.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-MZ"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
