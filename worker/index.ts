/**
 * Воркер rsautoparts.kz.
 *
 * Сайт по-прежнему статический (out/), этот код обрабатывает только POST /api/lead:
 * принимает заявку из формы (multipart/form-data, до 5 фото) и рассылает её
 *   1) в Telegram: текст + фото альбомом;
 *   2) на почту через Resend (если задан ключ).
 * Всё остальное отдаётся из статики как раньше.
 *
 * Переменные (Cloudflare → Workers → lixparts → Settings → Variables and Secrets):
 *   TG_BOT_TOKEN    секрет: токен бота от @BotFather
 *   TG_CHAT_ID      id чата/группы, куда падают заявки (группа начинается с -100…)
 *   RESEND_API_KEY  секрет: ключ resend.com (необязательно, без него почта не шлётся)
 *   LEAD_EMAIL_TO   адрес для заявок, по умолчанию rsautopartkz@gmail.com
 *   LEAD_EMAIL_FROM отправитель, по умолчанию RS Auto Parts <onboarding@resend.dev>
 * Каналы независимы: заявка считается принятой, если дошла хотя бы в один.
 */

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
  TG_BOT_TOKEN?: string;
  TG_CHAT_ID?: string;
  RESEND_API_KEY?: string;
  LEAD_EMAIL_TO?: string;
  LEAD_EMAIL_FROM?: string;
}

const MAX_FILES = 5;
const MAX_FILE_BYTES = 8 * 1024 * 1024; // после сжатия в браузере фото весят 200–600 КБ
const MAX_FIELD_LEN = 2000;

/** Поля заявки в том порядке, в каком их удобно читать менеджеру. */
const FIELDS: [key: string, label: string][] = [
  ["name", "Имя"],
  ["phone", "Телефон"],
  ["contact", "Как связаться"],
  ["model", "Модель"],
  ["part", "Деталь"],
  ["sku", "Артикул"],
  ["price", "Цена на сайте"],
  ["vin", "VIN"],
  ["color", "Цвет"],
  ["company", "Компания"],
  ["comment", "Комментарий"],
];

const TRACKING: [key: string, label: string][] = [
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_term", "utm_term"],
  ["utm_content", "utm_content"],
  ["gclid", "gclid"],
  ["referrer", "Откуда пришёл"],
  ["landing", "Страница входа"],
];

interface Lead {
  source: string;
  page: string;
  fields: Record<string, string>;
  tracking: Record<string, string>;
  files: File[];
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead" || url.pathname === "/api/lead/") {
      if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
      return handleLead(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_form" }, 400);
  }

  // Ловушка для ботов: скрытое поле, человек его не заполняет. Боту отвечаем «ок» и молча выбрасываем.
  if (str(form.get("website"))) return json({ ok: true });

  const lead: Lead = {
    source: str(form.get("source")) || "Заявка с сайта",
    page: str(form.get("page")),
    fields: {},
    tracking: {},
    files: [],
  };
  for (const [k] of FIELDS) {
    const v = str(form.get(k));
    if (v) lead.fields[k] = v;
  }
  for (const [k] of TRACKING) {
    const v = str(form.get(k));
    if (v) lead.tracking[k] = v;
  }

  const digits = (lead.fields.phone || "").replace(/\D/g, "");
  if (digits.length < 10) return json({ ok: false, error: "phone" }, 422);

  for (const f of form.getAll("photos")) {
    if (typeof f === "string" || !f.size) continue;
    if (!f.type.startsWith("image/")) continue;
    if (f.size > MAX_FILE_BYTES) continue;
    if (lead.files.length >= MAX_FILES) break;
    lead.files.push(f);
  }

  const results = await Promise.allSettled([sendTelegram(lead, env), sendEmail(lead, env)]);
  const delivered = results.filter((r) => r.status === "fulfilled" && r.value === true).length;
  for (const r of results) if (r.status === "rejected") console.error("lead channel failed:", r.reason);

  if (!delivered) return json({ ok: false, error: "delivery" }, 502);
  return json({ ok: true });
}

/* ---------------- Telegram ---------------- */

async function sendTelegram(lead: Lead, env: Env): Promise<boolean> {
  if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return false;
  const api = `https://api.telegram.org/bot${env.TG_BOT_TOKEN}`;

  const lines: string[] = [`<b>Новая заявка: ${esc(lead.source)}</b>`, ""];
  for (const [k, label] of FIELDS) {
    const v = lead.fields[k];
    if (!v) continue;
    if (k === "phone") {
      const tel = "+" + v.replace(/\D/g, "").replace(/^8(?=\d{10}$)/, "7");
      lines.push(`${label}: <a href="tel:${tel}">${esc(v)}</a>`);
      lines.push(`WhatsApp: https://wa.me/${tel.slice(1)}`);
    } else {
      lines.push(`${label}: ${esc(v)}`);
    }
  }
  if (lead.files.length) lines.push(`Фото: ${lead.files.length} шт. (ниже)`);
  if (lead.page) lines.push("", `Страница: ${esc(lead.page)}`);
  const tr = TRACKING.filter(([k]) => lead.tracking[k]).map(([k, l]) => `${l}: ${esc(lead.tracking[k])}`);
  if (tr.length) lines.push("", ...tr);

  const res = await fetch(`${api}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TG_CHAT_ID,
      text: lines.join("\n").slice(0, 4000),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) throw new Error(`telegram sendMessage ${res.status}: ${await res.text()}`);

  // Фото отдельным сообщением: если упадут, текст заявки всё равно уже доставлен.
  if (lead.files.length) {
    try {
      await sendTelegramPhotos(api, env.TG_CHAT_ID, lead);
    } catch (e) {
      console.error(e);
      await fetch(`${api}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text: "⚠️ Фото к заявке выше не загрузились, запросите у клиента в WhatsApp." }),
      });
    }
  }
  return true;
}

async function sendTelegramPhotos(api: string, chatId: string, lead: Lead) {
  const caption = `Фото к заявке: ${lead.fields.name || ""} ${lead.fields.phone || ""}`.trim();
  const body = new FormData();
  body.append("chat_id", chatId);
  let method: string;
  if (lead.files.length === 1) {
    method = "sendPhoto";
    body.append("photo", lead.files[0], lead.files[0].name || "photo.jpg");
    body.append("caption", caption);
  } else {
    method = "sendMediaGroup";
    const media = lead.files.map((f, i) => ({
      type: "photo",
      media: `attach://p${i}`,
      ...(i === 0 ? { caption } : {}),
    }));
    body.append("media", JSON.stringify(media));
    lead.files.forEach((f, i) => body.append(`p${i}`, f, f.name || `photo${i + 1}.jpg`));
  }
  const res = await fetch(`${api}/${method}`, { method: "POST", body });
  if (!res.ok) throw new Error(`telegram ${method} ${res.status}: ${await res.text()}`);
}

/* ---------------- Почта (Resend) ---------------- */

async function sendEmail(lead: Lead, env: Env): Promise<boolean> {
  if (!env.RESEND_API_KEY) return false;
  const to = env.LEAD_EMAIL_TO || "rsautopartkz@gmail.com";
  const from = env.LEAD_EMAIL_FROM || "RS Auto Parts <onboarding@resend.dev>";

  const rows = [...FIELDS, ...TRACKING]
    .map(([k, label]) => [label, lead.fields[k] ?? lead.tracking[k]] as const)
    .filter(([, v]) => v)
    .map(([l, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(l)}</td><td style="padding:4px 0"><b>${esc(v!)}</b></td></tr>`)
    .join("");
  const html = `<h2 style="font-family:sans-serif">Новая заявка: ${esc(lead.source)}</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>
${lead.page ? `<p style="font-family:sans-serif;font-size:13px;color:#666">Страница: ${esc(lead.page)}</p>` : ""}
${lead.files.length ? `<p style="font-family:sans-serif;font-size:13px">Фото во вложении: ${lead.files.length} шт.</p>` : ""}`;

  const attachments = await Promise.all(
    lead.files.map(async (f, i) => ({
      filename: f.name || `photo${i + 1}.jpg`,
      content: toBase64(await f.arrayBuffer()),
    }))
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Заявка: ${lead.fields.part || lead.source} · ${lead.fields.phone || ""}`.slice(0, 200),
      html,
      attachments,
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
  return true;
}

/* ---------------- утилиты ---------------- */

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_FIELD_LEN) : "";
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
  }
  return btoa(bin);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
