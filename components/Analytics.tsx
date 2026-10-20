"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureTracking } from "@/lib/lead";

/**
 * Аналитика и метки рекламы.
 *
 * GTM подключается, только если при сборке задана переменная NEXT_PUBLIC_GTM_ID (GTM-XXXXXXX),
 * в Cloudflare: Settings → Build → Variables. Все теги (GA4, Google Ads, пиксели) настраиваются уже в GTM.
 *
 * Конверсия: на /spasibo в dataLayer уходит событие "generate_lead" — один раз на реально отправленную
 * заявку (прямой заход или обновление страницы его не вызывают). Триггер в GTM: Custom Event = generate_lead.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export default function Analytics() {
  useEffect(() => {
    captureTracking();
  }, []);

  if (!GTM_ID) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Отправить событие в dataLayer (работает и без GTM — просто копится в массиве). */
export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
