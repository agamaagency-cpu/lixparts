"use client";

import { useEffect, useState } from "react";
import { takeLeadSent } from "@/lib/lead";
import { pushEvent } from "@/components/Analytics";

/**
 * Заголовок с именем клиента и событие конверсии.
 * generate_lead уходит только если заявка действительно была отправлена в этой вкладке
 * (метка из sessionStorage, одноразовая), поэтому обновление страницы и прямые заходы конверсию не дублируют.
 */
export default function ThanksGreeting() {
  const [name, setName] = useState("");
  useEffect(() => {
    const lead = takeLeadSent();
    if (!lead) return;
    setName(lead.name.trim().split(/\s+/)[0] || "");
    pushEvent("generate_lead", { lead_source: lead.source });
  }, []);
  return (
    <h1 className="mt-6 text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl">
      {name ? `Спасибо, ${name}! Заявка принята` : "Спасибо! Заявка принята"}
    </h1>
  );
}
