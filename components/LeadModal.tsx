"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatPhone,
  isPhoneComplete,
  markLeadSent,
  submitLead,
  whatsappFallback,
} from "@/lib/lead";
import PhotoPicker from "./PhotoPicker";
import { CloseIcon, WhatsAppGlyph } from "./Icons";

/** С чем открыть попап: из карточки товара подставляем деталь, модель и артикул. */
export interface LeadPreset {
  source?: string;
  title?: string;
  part?: string;
  model?: string; // "Li Auto L9"
  sku?: string;
  price?: string;
  image?: string;
}

const LeadModalContext = createContext<{ openLead: (p?: LeadPreset) => void } | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal вне LeadModalProvider");
  return ctx;
}

export default function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPreset] = useState<LeadPreset | null>(null);
  const openLead = useCallback((p: LeadPreset = {}) => setPreset(p), []);
  return (
    <LeadModalContext.Provider value={{ openLead }}>
      {children}
      {preset && <LeadModal preset={preset} onClose={() => setPreset(null)} />}
    </LeadModalContext.Provider>
  );
}

const MODELS = ["Li Auto L6", "Li Auto L7", "Li Auto L9", "Другая / не знаю"];
const CONTACT_WAYS = ["WhatsApp", "Звонок"];
const LABELS: Record<string, string> = {
  name: "Имя",
  phone: "Телефон",
  contact: "Как связаться",
  model: "Модель",
  part: "Деталь",
  sku: "Артикул",
  vin: "VIN",
  comment: "Комментарий",
};

function LeadModal({ preset, onClose }: { preset: LeadPreset; onClose: () => void }) {
  const router = useRouter();
  const fromProduct = Boolean(preset.part && preset.sku);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("WhatsApp");
  const [model, setModel] = useState(preset.model || "");
  const [part, setPart] = useState(preset.part || "");
  const [vin, setVin] = useState("");
  const [showVin, setShowVin] = useState(false);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [hp, setHp] = useState(""); // ловушка для ботов
  const [phoneError, setPhoneError] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const firstField = useRef<HTMLInputElement>(null);

  // Блокируем прокрутку страницы, Esc закрывает, фокус на первом поле (на десктопе — сразу, на телефоне не дёргаем клавиатуру)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    if (window.matchMedia("(min-width: 640px)").matches) firstField.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const source = preset.source || (fromProduct ? "Карточка товара" : "Заявка с сайта");
  const fields = {
    name,
    phone,
    contact,
    model,
    part,
    sku: preset.sku,
    price: preset.price,
    vin,
    comment,
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(phone)) {
      setPhoneError(true);
      return;
    }
    setState("sending");
    const res = await submitLead({ source, fields: { ...fields, website: hp }, photos });
    if (res.ok) {
      markLeadSent(source, name);
      onClose();
      router.push("/spasibo");
    } else {
      setState("error");
    }
  };

  const input =
    "w-full rounded-xl border border-graphite-200 bg-graphite-50/50 px-4 py-3 text-[16px] text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-graphite-400 focus:bg-white sm:text-sm";
  const label = "mb-1.5 block text-sm font-medium text-graphite-700";
  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      active ? "bg-graphite-900 text-white" : "bg-graphite-100 text-graphite-700 hover:bg-graphite-200"
    }`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <div className="absolute inset-0 bg-graphite-950/55 backdrop-blur-[2px] animate-[fadeIn_.15s_ease-out]" onClick={onClose} />
      <form
        onSubmit={submit}
        noValidate
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl animate-[sheetUp_.22s_ease-out]"
      >
        {/* Шапка */}
        <div className="flex items-start justify-between gap-4 border-b border-graphite-100 px-5 pb-4 pt-5 sm:px-7">
          <div>
            <h2 id="lead-title" className="text-lg font-semibold text-graphite-900">
              {preset.title || (fromProduct ? "Заявка на деталь" : "Оставить заявку")}
            </h2>
            <p className="mt-0.5 text-sm text-graphite-500">
              Проверим наличие и совместимость, перезвоним или напишем в WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-graphite-500 hover:bg-graphite-100"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        {/* Поля */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {fromProduct && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-graphite-50 p-3">
              {preset.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preset.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-graphite-900">{preset.part}</p>
                <p className="text-xs text-graphite-500">
                  {preset.model} · арт. {preset.sku}
                  {preset.price ? ` · ${preset.price}` : ""}
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="lead-name">Имя</label>
                <input
                  id="lead-name"
                  ref={firstField}
                  className={input}
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className={label} htmlFor="lead-phone">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${input} ${phoneError ? "border-red-400 bg-red-50/40" : ""}`}
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onFocus={() => !phone && setPhone("+7")}
                  onChange={(e) => {
                    setPhone(formatPhone(e.target.value));
                    setPhoneError(false);
                  }}
                />
                {phoneError && <p className="mt-1 text-xs text-red-600">Введите номер полностью, 10 цифр после +7</p>}
              </div>
            </div>

            <div>
              <span className={label}>Как удобнее связаться</span>
              <div className="flex flex-wrap gap-2">
                {CONTACT_WAYS.map((c) => (
                  <button type="button" key={c} onClick={() => setContact(c)} className={chip(contact === c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {!fromProduct && (
              <>
                <div>
                  <span className={label}>Модель автомобиля</span>
                  <div className="flex flex-wrap gap-2">
                    {MODELS.map((m) => (
                      <button type="button" key={m} onClick={() => setModel(m)} className={chip(model === m)}>
                        {m.replace("Li Auto ", "")}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={label} htmlFor="lead-part">Какая деталь нужна</label>
                  <input
                    id="lead-part"
                    className={input}
                    placeholder="Например: передний бампер, левая фара"
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <span className={label}>Фото <span className="font-normal text-graphite-400">(необязательно)</span></span>
              <PhotoPicker
                photos={photos}
                onChange={setPhotos}
                hint={fromProduct ? "Фото вашей машины или места установки" : "Фото детали, шильдика или машины"}
              />
            </div>

            {showVin ? (
              <div>
                <label className={label} htmlFor="lead-vin">VIN</label>
                <input
                  id="lead-vin"
                  className={`${input} uppercase`}
                  placeholder="17 символов, например LW433B…"
                  maxLength={17}
                  value={vin}
                  onChange={(e) => setVin(e.target.value.replace(/[^a-z0-9]/gi, "").toUpperCase())}
                />
              </div>
            ) : null}

            <div>
              <label className={label} htmlFor="lead-comment">Комментарий <span className="font-normal text-graphite-400">(необязательно)</span></label>
              <textarea
                id="lead-comment"
                rows={2}
                className={`${input} resize-none`}
                placeholder="Цвет, год, что важно учесть"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {!showVin && (
              <button type="button" onClick={() => setShowVin(true)} className="-mt-1 w-fit text-sm font-medium text-graphite-600 underline underline-offset-4 hover:text-graphite-900">
                + Указать VIN для точного подбора
              </button>
            )}

            {/* Ловушка для ботов: невидимое поле */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              name="website"
            />
          </div>
        </div>

        {/* Подвал */}
        <div className="border-t border-graphite-100 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
          {state === "error" && (
            <div className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              Не получилось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp, данные уже подставлены.
              <a
                href={whatsappFallback(source, fields, LABELS)}
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
            className="w-full rounded-full bg-graphite-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-graphite-800 disabled:opacity-60"
          >
            {state === "sending" ? (photos.length ? "Отправляем фото…" : "Отправляем…") : "Отправить заявку"}
          </button>
          <p className="mt-2.5 text-center text-xs text-graphite-400">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline" target="_blank">политикой конфиденциальности</a>.
          </p>
        </div>
      </form>
    </div>
  );
}
