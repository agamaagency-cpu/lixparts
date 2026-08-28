"use client";

import { useState } from "react";
import { contacts } from "@/lib/data";
import { CheckIcon } from "./Icons";

export type FieldKey =
  | "name"
  | "phone"
  | "model"
  | "vin"
  | "part"
  | "comment"
  | "company"
  | "color";

const fieldMeta: Record<
  FieldKey,
  { label: string; placeholder: string; type?: string; textarea?: boolean }
> = {
  name: { label: "Имя", placeholder: "Как к вам обращаться" },
  phone: { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
  model: { label: "Модель автомобиля", placeholder: "Li Auto L6 / L7 / L9" },
  vin: { label: "VIN", placeholder: "LXV..." },
  part: { label: "Какая деталь нужна", placeholder: "Например: передний бампер" },
  color: { label: "Код цвета", placeholder: "Например: чёрный / код кузова" },
  comment: { label: "Комментарий", placeholder: "Дополнительная информация", textarea: true },
  company: { label: "Сервис / компания", placeholder: "Название организации" },
};

export default function LeadForm({
  fields = ["name", "phone", "model", "vin", "part"],
  title,
  submitLabel = "Отправить заявку",
  compact = false,
  source = "Форма заявки",
}: {
  fields?: FieldKey[];
  title?: string;
  submitLabel?: string;
  compact?: boolean;
  source?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Демо: собираем данные в сообщение WhatsApp. Легко заменить на реальный API-эндпоинт.
    const lines = [`Новая заявка (${source}):`];
    for (const f of fields) {
      if (values[f]) lines.push(`${fieldMeta[f].label}: ${values[f]}`);
    }
    const url = `${contacts.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckIcon width={24} height={24} />
        </span>
        <h3 className="text-lg font-semibold text-graphite-900">Заявка отправлена</h3>
        <p className="mt-2 max-w-sm text-sm text-graphite-500">
          Мы открыли чат в WhatsApp — отправьте сообщение, и менеджер подтвердит
          наличие и стоимость. Обычно отвечаем в течение рабочего дня.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-medium text-graphite-700 underline"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-graphite-200 bg-white ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
    >
      {title && (
        <h3 className="mb-5 text-lg font-semibold text-graphite-900">{title}</h3>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const meta = fieldMeta[f];
          const full = meta.textarea || f === "part" || f === "name";
          return (
            <div key={f} className={full ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-medium text-graphite-700">
                {meta.label}
              </label>
              {meta.textarea ? (
                <textarea
                  rows={3}
                  placeholder={meta.placeholder}
                  value={values[f] || ""}
                  onChange={(e) => update(f, e.target.value)}
                  className="w-full resize-none rounded-xl border border-graphite-200 bg-graphite-50/50 px-4 py-3 text-sm text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-graphite-400 focus:bg-white"
                />
              ) : (
                <input
                  type={meta.type || "text"}
                  required={f === "phone" || f === "name"}
                  placeholder={meta.placeholder}
                  value={values[f] || ""}
                  onChange={(e) => update(f, e.target.value)}
                  className="w-full rounded-xl border border-graphite-200 bg-graphite-50/50 px-4 py-3 text-sm text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-graphite-400 focus:bg-white"
                />
              )}
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-graphite-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-graphite-800"
      >
        {submitLabel}
      </button>
      <p className="mt-3 text-center text-xs text-graphite-400">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" className="underline">политикой конфиденциальности</a>.
      </p>
    </form>
  );
}
