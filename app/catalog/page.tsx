import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogBrowser from "@/components/CatalogBrowser";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Каталог запчастей Li Auto L6, L7, L9",
  description:
    "Полный каталог оригинальных б/у запчастей Li Auto. Фильтры по модели, категории, стороне, цвету и наличию. Поиск по названию и артикулу.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Каталог запчастей Li Auto"
          subtitle="Оригинальные кузовные и технические детали L6, L7 и L9. Используйте фильтры и поиск, чтобы быстро найти нужную позицию."
        />
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="py-20 text-center text-graphite-400">Загрузка каталога…</div>}>
          <CatalogBrowser products={products} />
        </Suspense>
      </div>
    </div>
  );
}
