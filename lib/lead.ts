/**
 * Отправка заявок с сайта на /api/lead (worker/index.ts → Telegram + почта).
 *
 * Здесь же:
 *  - сбор меток рекламы (UTM, gclid) при первом заходе — чтобы в заявке было видно, какая реклама её дала;
 *  - сжатие фото в браузере перед отправкой (фото с телефона 4–10 МБ → 200–600 КБ);
 *  - маска телефона +7 (___) ___-__-__.
 */

import { contacts } from "@/lib/data";

/* ---------------- метки рекламы ---------------- */

const TRACK_KEY = "rs_tracking";
const TRACK_TTL_DAYS = 30;
const TRACK_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

type Tracking = Partial<Record<(typeof TRACK_PARAMS)[number] | "referrer" | "landing", string>> & { ts?: number };

/**
 * Запоминаем источник визита. Новые метки в URL перезаписывают старые (последний рекламный клик),
 * заход без меток ничего не трогает — чтобы переход по внутренним ссылкам не стирал источник.
 */
export function captureTracking() {
  try {
    const url = new URL(window.location.href);
    const fromUrl: Tracking = {};
    for (const p of TRACK_PARAMS) {
      const v = url.searchParams.get(p);
      if (v) fromUrl[p] = v.slice(0, 300);
    }
    const saved = readTracking();
    const hasNew = Object.keys(fromUrl).length > 0;
    if (!hasNew && saved) return;
    const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "";
    const data: Tracking = {
      ...fromUrl,
      referrer: ref.slice(0, 300) || undefined,
      landing: (url.pathname + url.search).slice(0, 300),
      ts: Date.now(),
    };
    localStorage.setItem(TRACK_KEY, JSON.stringify(data));
  } catch {
    /* приватный режим или запрет хранилища — заявка уйдёт без меток */
  }
}

function readTracking(): Tracking | null {
  try {
    const raw = localStorage.getItem(TRACK_KEY);
    if (!raw) return null;
    const t = JSON.parse(raw) as Tracking;
    if (!t.ts || Date.now() - t.ts > TRACK_TTL_DAYS * 864e5) return null;
    return t;
  } catch {
    return null;
  }
}

/* ---------------- телефон ---------------- */

/** Форматирует ввод в +7 (777) 123-45-67. Принимает 8…, 7…, +7… и просто 10 цифр. */
export function formatPhone(input: string): string {
  const d = input.replace(/\D/g, "");
  if (!d) return "";
  // Национальная часть номера (10 цифр после +7). Номера КЗ начинаются на 7, поэтому ведущая 8 —
  // это привычный префикс «8-747…», а лишняя 7 — повтор кода страны («+7» уже подставлено, человек набрал 7747…).
  let p: string;
  if (input.trim().startsWith("+7")) p = d.slice(1);
  else if (d.length > 10 && (d[0] === "7" || d[0] === "8")) p = d.slice(1);
  else p = d;
  if (p[0] === "8") p = p.slice(1);
  if (p.length > 10 && p[0] === "7") p = p.slice(1);
  p = p.slice(0, 10);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length > 3) out += ") " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export function isPhoneComplete(v: string): boolean {
  return v.replace(/\D/g, "").length === 11;
}

/* ---------------- фото ---------------- */

export const MAX_PHOTOS = 5;

/** Сжимает фото до 1600 px по длинной стороне, JPEG ~82%. Если браузер не умеет формат — отдаёт оригинал. */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const max = 1600;
    const k = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * k);
    const h = Math.round(bitmap.height * k);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    const name = (file.name || "photo").replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

/* ---------------- отправка ---------------- */

export interface LeadPayload {
  source: string;
  fields: Record<string, string | undefined>;
  photos?: File[];
}

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead({ source, fields, photos = [] }: LeadPayload): Promise<LeadResult> {
  const fd = new FormData();
  fd.append("source", source);
  fd.append("page", window.location.href);
  for (const [k, v] of Object.entries(fields)) if (v) fd.append(k, v);
  const t = readTracking();
  if (t) for (const [k, v] of Object.entries(t)) if (v && k !== "ts") fd.append(k, String(v));
  for (const p of photos.slice(0, MAX_PHOTOS)) fd.append("photos", p, p.name);

  try {
    const res = await fetch("/api/lead", { method: "POST", body: fd });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error || `http_${res.status}` };
  } catch {
    return { ok: false, error: "network" };
  }
}

/** Ссылка на WhatsApp с текстом заявки — запасной путь, если отправка не прошла. */
export function whatsappFallback(source: string, fields: Record<string, string | undefined>, labels: Record<string, string>) {
  const lines = [`Здравствуйте! Заявка с сайта (${source}):`];
  for (const [k, v] of Object.entries(fields)) if (v && labels[k]) lines.push(`${labels[k]}: ${v}`);
  return `${contacts.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/* ---------------- страница «Спасибо» ---------------- */

const THANKS_KEY = "rs_lead_sent";

/** Помечаем, что заявка реально ушла: страница /spasibo отправит событие конверсии только по этой метке. */
export function markLeadSent(source: string, name?: string) {
  try {
    sessionStorage.setItem(THANKS_KEY, JSON.stringify({ source, name: name || "", ts: Date.now() }));
  } catch {
    /* ignore */
  }
}

export function takeLeadSent(): { source: string; name: string } | null {
  try {
    const raw = sessionStorage.getItem(THANKS_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(THANKS_KEY);
    const v = JSON.parse(raw);
    if (Date.now() - v.ts > 10 * 60 * 1000) return null;
    return v;
  } catch {
    return null;
  }
}
