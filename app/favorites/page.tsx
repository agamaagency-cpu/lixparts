"use client";

import Link from "next/link";
import { products } from "@/lib/data";
import { useStore } from "@/components/StoreProvider";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SectionHeading, Button } from "@/components/ui";
import { HeartIcon } from "@/components/Icons";

export default function FavoritesPage() {
  const { favorites } = useStore();
  const items = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Избранное" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Избранное"
          subtitle="Сохранённые детали. Отправьте список менеджеру в WhatsApp прямо с карточки."
        />
      </div>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-graphite-300 bg-graphite-50 p-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-graphite-400 ring-1 ring-graphite-200">
            <HeartIcon width={26} height={26} />
          </span>
          <p className="mt-4 text-base font-medium text-graphite-700">
            В избранном пока пусто
          </p>
          <p className="mt-1.5 max-w-sm text-sm text-graphite-500">
            Нажимайте на сердечко на карточках товаров, чтобы сохранить нужные детали.
          </p>
          <div className="mt-6">
            <Button href="/catalog" icon>Перейти в каталог</Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
