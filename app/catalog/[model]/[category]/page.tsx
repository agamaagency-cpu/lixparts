import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategory,
  getGroupForCategory,
  getModel,
  getProductBySlug,
  getProductsByModel,
  models,
  seedCategorySlugsForModel,
} from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { SectionHeading } from "@/components/ui";

export function generateStaticParams() {
  const out: { model: string; category: string }[] = [];
  for (const m of models) {
    for (const cat of seedCategorySlugsForModel(m.slug)) {
      out.push({ model: m.slug, category: cat });
    }
  }
  return out;
}

export function generateMetadata({
  params,
}: {
  params: { model: string; category: string };
}): Metadata {
  const model = getModel(params.model);
  const product = getProductBySlug(params.model, params.category);
  if (!model || !product) return {};
  return {
    title: `${product.name} для ${model.name}`,
    description: `${product.name} для ${model.name} — оригинальная OEM деталь. Состояние: ${product.condition}, цвет: ${product.color}. ${product.status === "in_stock" ? "В наличии." : "Под заказ."} Реальные фото и подбор по VIN.`,
    alternates: { canonical: `/catalog/${model.slug}/${params.category}` },
  };
}

export default function ProductPage({
  params,
}: {
  params: { model: string; category: string };
}) {
  const model = getModel(params.model);
  const product = getProductBySlug(params.model, params.category);
  const category = getCategory(params.category);
  const group = getGroupForCategory(params.category);
  if (!model || !product) notFound();

  const related = getProductsByModel(model.slug)
    .filter((p) => p.categorySlug !== product.categorySlug)
    .slice(0, 4);

  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: model.name, href: `/catalog/${model.slug}` },
          { label: group?.title ?? "Каталог", href: `/catalog/${model.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      {/* Похожие */}
      <section className="mt-16 border-t border-graphite-200 pt-12">
        <SectionHeading title={`Другие детали ${model.name}`} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={`/catalog/${model.slug}`}
            className="text-sm font-medium text-graphite-700 underline hover:text-graphite-900"
          >
            Смотреть весь каталог {model.name} →
          </Link>
        </div>
      </section>
    </div>
  );
}
