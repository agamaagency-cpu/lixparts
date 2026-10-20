import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StoreProvider from "@/components/StoreProvider";
import LeadModalProvider from "@/components/LeadModal";
import Analytics, { GTM_ID } from "@/components/Analytics";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Оригинальные запчасти Li Auto L6 · L7 · L9 | RS Auto Parts",
    template: "%s | RS Auto Parts",
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
    "запчасти Li Auto Алматы",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Оригинальные запчасти Li Auto L6 · L7 · L9",
    description:
      "Оригинальные б/у детали Li Auto в отличном состоянии. В наличии и под заказ из Китая.",
    siteName: "RS Auto Parts",
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
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Analytics />
        <StoreProvider>
          <LeadModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </LeadModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
