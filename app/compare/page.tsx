"use client";

import Link from "next/link";
import { getModel, products } from "@/lib/data";
import { useStore } from "@/components/StoreProvider";
import Breadcrumbs from "@/components/Breadcrumbs";
import PartImage from "@/components/PartImage";
import { SectionHeading, Button, StatusBadge, formatPrice } from "@/components/ui";
import { CompareIcon, CloseIcon } from "@/components/Icons";

export default function ComparePage() {
  const { compare, toggleCompare, clearCompare } = useStore();
  const items = products.filter((p) => compare.includes(p.id));

  const rows: { label: string; render: (p: (typeof items)[number]) => React.ReactNode }[] = [
    { label: "Модель", render: (p) => getModel(p.model)?.name },
    { label: "Расположение", render: (p) => p.location },
    { label: "Состояние", render: (p) => p.condition },
    {
      label: "Цвет",
      render: (p) => (
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full ring-1 ring-graphite-200" style={{ background: p.colorHex }} />
          {p.color}
        </span>
      ),
    },
    { label: "Артикул", render: (p) => p.sku },
    { label: "Наличие", render: (p) => <StatusBadge status={p.status} /> },
    { label: "Без покраски", render: (p) => (p.paintReady ? "Да" : "—") },
    {
      label: "Цена",
      render: (p) => <span className="font-semibold text-graphite-900">{formatPrice(p.price)}</span>,
    },
  ];

  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Сравнение" }]} />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title="Сравнение деталей"
          subtitle="Сравните до трёх позиций рядом — например, две двери или два бампера."
        />
        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-sm font-medium text-graphite-500 hover:text-graphite-900"
          >
            Очистить всё
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-graphite-300 bg-graphite-50 p-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-graphite-400 ring-1 ring-graphite-200">
            <CompareIcon width={26} height={26} />
          </span>
          <p className="mt-4 text-base font-medium text-graphite-700">
            Список сравнения пуст
          </p>
          <p className="mt-1.5 max-w-sm text-sm text-graphite-500">
            Добавляйте детали через иконку сравнения на карточках товаров (до 3 штук).
          </p>
          <div className="mt-6">
            <Button href="/catalog" icon>Перейти в каталог</Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="w-40 p-4 text-left align-bottom text-xs font-semibold uppercase tracking-wide text-graphite-400">
                  Параметр
                </th>
                {items.map((p, i) => (
                  <th key={p.id} className="p-4 align-bottom">
                    <div className="relative overflow-hidden rounded-xl border border-graphite-200">
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-graphite-600 hover:text-graphite-900"
                        aria-label="Убрать из сравнения"
                      >
                        <CloseIcon width={16} height={16} />
                      </button>
                      <PartImage label={p.name} sub={getModel(p.model)?.short} tone={i} ratio="aspect-[4/3]" />
                    </div>
                    <Link
                      href={`/catalog/${p.model}/${p.categorySlug}`}
                      className="mt-3 block text-left text-sm font-semibold text-graphite-900 hover:underline"
                    >
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-100">
              {rows.map((r) => (
                <tr key={r.label}>
                  <td className="p-4 text-sm font-medium text-graphite-500">{r.label}</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-4 text-sm text-graphite-800">
                      {r.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
