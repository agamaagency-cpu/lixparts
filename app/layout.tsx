import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StoreProvider from "@/components/StoreProvider";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Оригинальные запчасти Li Auto L6 · L7 · L9 | LIXPARTS",
    template: "%s | LIXPARTS",
  },
  description:
    "Оригинальные б/у кузовные и технические запчасти Li Auto (Lixiang) L6, L7 и L9 из Китая. Минимальный износ, реальные фотографии, в наличии и под заказ. Помощь с подбором по VIN.",
  keywords: [
    "запчасти Li Auto",
    "Lixiang запчасти",
    "Li Auto L6",
    "Li Auto L7",
    "Li Auto L9",
    "оригинальные запчасти",
    "кузовные детали Li Auto",
    "ноускат Li Auto",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Оригинальные запчасти Li Auto L6 · L7 · L9",
    description:
      "Оригинальные б/у детали Li Auto в отличном состоянии. В наличии и под заказ из Китая.",
    siteName: "LIXPARTS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen bg-white">
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  );
}
