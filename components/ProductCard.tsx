"use client";

import Link from "next/link";
import { contacts, getModel } from "@/lib/data";
import type { Product } from "@/lib/types";
import PartImage from "./PartImage";
import { useStore } from "./StoreProvider";
import { formatPrice, StatusBadge } from "./ui";
import { CompareIcon, HeartIcon, VideoIcon, WhatsAppGlyph } from "./Icons";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { isFavorite, toggleFavorite, isComparing, toggleCompare } = useStore();
  const model = getModel(product.model);
  const href = `/catalog/${product.model}/${product.categorySlug}`;
  const fav = isFavorite(product.id);
  const cmp = isComparing(product.id);

  const waText = encodeURIComponent(
    `Здравствуйте! Интересует запчасть: ${product.name} для ${model?.name} (артикул ${product.sku}). Подскажите наличие и цену.`
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-graphite-200 bg-white transition-all duration-300 hover:border-graphite-300 hover:shadow-card">
      <div className="relative">
        <Link href={href} className="block">
          <PartImage
            label={product.name}
            sub={model?.short}
            tone={index}
            ratio="aspect-[4/3]"
          />
        </Link>
        <div className="absolute left-3 top-3">
          <StatusBadge status={product.status} />
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => toggleFavorite(product.id)}
            aria-label="В избранное"
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
              fav
                ? "bg-graphite-900 text-white"
                : "bg-white/80 text-graphite-600 hover:text-graphite-900"
            }`}
          >
            <HeartIcon width={16} height={16} />
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            aria-label="Сравнить"
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
              cmp
                ? "bg-graphite-900 text-white"
                : "bg-white/80 text-graphite-600 hover:text-graphite-900"
            }`}
          >
            <CompareIcon width={16} height={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-graphite-400">
          <span>{model?.name}</span>
          <span className="h-1 w-1 rounded-full bg-graphite-300" />
          <span>{product.location}</span>
        </div>
        <Link href={href}>
          <h3 className="text-[15px] font-semibold leading-snug text-graphite-900 transition-colors group-hover:text-graphite-700">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-graphite-500">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full ring-1 ring-graphite-200"
              style={{ background: product.colorHex }}
            />
            {product.color}
          </span>
          <span>{product.condition}</span>
        </div>

        <p className="mt-1 text-[11px] text-graphite-400">Артикул: {product.sku}</p>

        <div className="mt-4 flex items-end justify-between">
          <div className="text-lg font-semibold text-graphite-900">
            {formatPrice(product.price)}
          </div>
          {product.paintReady && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              Без покраски
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={href}
            className="flex-1 rounded-full bg-graphite-900 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-graphite-800"
          >
            Подробнее
          </Link>
          <a
            href={`${contacts.whatsappHref}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Узнать наличие в WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full text-emerald-600 ring-1 ring-inset ring-graphite-200 transition-colors hover:bg-emerald-50"
          >
            <WhatsAppGlyph width={18} height={18} />
          </a>
        </div>

        <a
          href={`${contacts.whatsappHref}?text=${encodeURIComponent(
            `Здравствуйте! Пришлите, пожалуйста, видео детали: ${product.name} (${product.sku}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-graphite-500 hover:text-graphite-900"
        >
          <VideoIcon width={15} height={15} />
          Запросить видео этой детали
        </a>
      </div>
    </div>
  );
}
