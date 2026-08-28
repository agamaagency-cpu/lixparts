"use client";

import { useState } from "react";
import { contacts, getModel } from "@/lib/data";
import type { Product } from "@/lib/types";
import PartImage from "./PartImage";
import { useStore } from "./StoreProvider";
import { formatPrice, StatusBadge } from "./ui";
import {
  CheckIcon,
  CompareIcon,
  HeartIcon,
  PhoneIcon,
  VideoIcon,
  WhatsAppGlyph,
} from "./Icons";

export default function ProductDetail({ product }: { product: Product }) {
  const model = getModel(product.model);
  const { isFavorite, toggleFavorite, isComparing, toggleCompare } = useStore();
  const fav = isFavorite(product.id);
  const cmp = isComparing(product.id);
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    { label: product.name, sub: "Основное фото" },
    { label: product.name, sub: "Ракурс 2" },
    { label: product.name, sub: "Крепления" },
    { label: product.name, sub: "Состояние" },
  ];

  const waText = encodeURIComponent(
    `Здравствуйте! Хочу оформить заявку на: ${product.name} для ${model?.name} (артикул ${product.sku}). Подскажите наличие и стоимость.`
  );

  const specs = [
    { label: "Производитель", value: product.manufacturer },
    { label: "Модель", value: model?.name ?? product.model },
    { label: "Расположение", value: product.location },
    { label: "Цвет", value: product.color },
    { label: "Состояние", value: product.condition },
    { label: "Артикул", value: product.sku },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      {/* Галерея */}
      <div>
        <div className="overflow-hidden rounded-2xl border border-graphite-200">
          <PartImage
            label={images[activeImg].label}
            sub={images[activeImg].sub}
            tone={activeImg}
            ratio="aspect-[4/3]"
            big
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`overflow-hidden rounded-xl border transition-all ${
                activeImg === i
                  ? "border-graphite-900 ring-1 ring-graphite-900"
                  : "border-graphite-200 hover:border-graphite-300"
              }`}
            >
              <PartImage label={img.sub || ""} tone={i} ratio="aspect-square" />
            </button>
          ))}
        </div>
      </div>

      {/* Информация */}
      <div>
        <div className="flex items-center gap-3">
          <StatusBadge status={product.status} />
          {product.paintReady && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              Возможна установка без покраски
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-graphite-900">
          {product.name}
        </h1>
        <p className="mt-2 text-sm text-graphite-500">
          {model?.name} · {product.location} · Артикул {product.sku}
        </p>

        <div className="mt-6 flex items-end gap-3">
          <span className="text-3xl font-semibold text-graphite-900">
            {formatPrice(product.price)}
          </span>
          {product.price !== null && (
            <span className="pb-1 text-sm text-graphite-400">оригинал OEM</span>
          )}
        </div>

        {/* Быстрые характеристики */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <MiniSpec label="Цвет">
            <span className="flex items-center gap-2">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-graphite-200"
                style={{ background: product.colorHex }}
              />
              {product.color}
            </span>
          </MiniSpec>
          <MiniSpec label="Состояние">{product.condition}</MiniSpec>
          <MiniSpec label="Модель">{model?.name}</MiniSpec>
          <MiniSpec label="Наличие">{statusText(product)}</MiniSpec>
        </div>

        {/* Кнопки */}
        <div className="mt-7 flex flex-col gap-3">
          <a
            href={`${contacts.whatsappHref}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-graphite-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-graphite-800"
          >
            Купить / Оставить заявку
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`${contacts.whatsappHref}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <WhatsAppGlyph width={17} height={17} /> WhatsApp
            </a>
            <a
              href={contacts.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-graphite-900 ring-1 ring-inset ring-graphite-300 hover:bg-graphite-50"
            >
              <PhoneIcon width={17} height={17} /> Позвонить
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                fav
                  ? "bg-graphite-100 text-graphite-900"
                  : "text-graphite-600 ring-1 ring-inset ring-graphite-200 hover:bg-graphite-50"
              }`}
            >
              <HeartIcon width={16} height={16} />
              {fav ? "В избранном" : "В избранное"}
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                cmp
                  ? "bg-graphite-100 text-graphite-900"
                  : "text-graphite-600 ring-1 ring-inset ring-graphite-200 hover:bg-graphite-50"
              }`}
            >
              <CompareIcon width={16} height={16} />
              {cmp ? "В сравнении" : "Сравнить"}
            </button>
          </div>
          <a
            href={`${contacts.whatsappHref}?text=${encodeURIComponent(
              `Здравствуйте! Пришлите видео детали: ${product.name} (${product.sku}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-graphite-500 hover:text-graphite-900"
          >
            <VideoIcon width={16} height={16} />
            Запросить видео этой детали
          </a>
        </div>

        {/* Описание */}
        <div className="mt-8 border-t border-graphite-200 pt-6">
          <h2 className="text-sm font-semibold text-graphite-900">Описание</h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite-500">
            {product.description}
          </p>
        </div>

        {/* Характеристики */}
        <div className="mt-6 border-t border-graphite-200 pt-6">
          <h2 className="text-sm font-semibold text-graphite-900">Характеристики</h2>
          <dl className="mt-3 divide-y divide-graphite-100">
            {specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-graphite-500">{s.label}</dt>
                <dd className="text-right font-medium text-graphite-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Совместимость */}
        <div className="mt-6 rounded-2xl border border-graphite-200 bg-graphite-50 p-5">
          <h2 className="text-sm font-semibold text-graphite-900">Совместимость</h2>
          <p className="mt-2 text-sm text-graphite-500">Подходит для:</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-graphite-800 ring-1 ring-graphite-200">
              <CheckIcon width={15} height={15} className="text-emerald-600" />
              {model?.name}
            </span>
          </div>
          <p className="mt-3 text-xs text-graphite-400">
            Точную совместимость с вашей комплектацией уточним по VIN — отправьте его в
            WhatsApp, и мы всё проверим.
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniSpec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-graphite-200 bg-white px-4 py-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-graphite-400">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium text-graphite-900">{children}</div>
    </div>
  );
}

function statusText(p: Product): string {
  if (p.status === "in_stock") return "В наличии";
  if (p.status === "on_order") return "Под заказ 5–10 дней";
  return "Продано";
}
