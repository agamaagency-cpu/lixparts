"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPhone, isPhoneComplete, markLeadSent, submitLead, whatsappFallback } from "@/lib/lead";
import PhotoPicker from "./PhotoPicker";
import { WhatsAppGlyph } from "./Icons";

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
  photos: withPhotos = false,
  photoHint,
}: {
  fields?: FieldKey[];
  title?: string;
  submitLabel?: string;
  compact?: boolean;
  source?: string;
  /** Показать прикрепление фото */
  photos?: boolean;
  photoHint?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [hp, setHp] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const update = (k: string, v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const labels = Object.fromEntries(Object.entries(fieldMeta).map(([k, m]) => [k, m.label]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(values.phone || "")) {
      setPhoneError(true);
      return;
    }
    setState("sending");
    const res = await submitLead({ source, fields: { ...values, website: hp }, photos });
    if (res.ok) {
      markLeadSent(source, values.name);
      router.push("/spasibo");
    } else {
      setState("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`relative rounded-2xl bg-white ${
        compact ? "p-5 ring-1 ring-inset ring-graphite-100" : "border border-graphite-200 p-6 sm:p-8"
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
                  className="w-full resize-none rounded-xl border border-graphite-200 bg-graphite-50/50 px-4 py-3 text-[16px] sm:text-sm text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-graphite-400 focus:bg-white"
                />
              ) : (
                <>
                  <input
                    type={meta.type || "text"}
                    inputMode={f === "phone" ? "tel" : undefined}
                    autoComplete={f === "phone" ? "tel" : f === "name" ? "name" : undefined}
                    placeholder={meta.placeholder}
                    value={values[f] || ""}
                    onFocus={() => f === "phone" && !values.phone && update("phone", "+7")}
                    onChange={(e) => {
                      if (f === "phone") {
                        update(f, formatPhone(e.target.value));
                        setPhoneError(false);
                      } else if (f === "vin") {
                        update(f, e.target.value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 17));
                      } else update(f, e.target.value);
                    }}
                    className={`w-full rounded-xl border bg-graphite-50/50 px-4 py-3 text-[16px] text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-graphite-400 focus:bg-white sm:text-sm ${
                      f === "phone" && phoneError ? "border-red-400" : "border-graphite-200"
                    }`}
                  />
                  {f === "phone" && phoneError && (
                    <p className="mt-1 text-xs text-red-500">Введите номер полностью, 10 цифр после +7</p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {withPhotos && (
        <div className="mt-4">
          <PhotoPicker photos={photos} onChange={setPhotos} hint={photoHint} />
        </div>
      )}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
      />
      {state === "error" && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          Не получилось отправить. Попробуйте ещё раз или напишите в WhatsApp, данные уже подставлены.
          <a
            href={whatsappFallback(source, values, labels)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex w-fit items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 font-medium text-white"
          >
            <WhatsAppGlyph width={16} height={16} /> Отправить в WhatsApp
          </a>
        </div>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 w-full rounded-full bg-graphite-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-graphite-800 disabled:opacity-60"
      >
        {state === "sending" ? "Отправляем…" : submitLabel}
      </button>
      <p className="mt-3 text-center text-xs text-graphite-400">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" className="underline">политикой конфиденциальности</a>.
      </p>
    </form>
  );
}
