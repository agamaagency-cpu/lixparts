import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  categoryGroups,
  getModel,
  getProductsByModel,
  models,
} from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import CarSilhouette from "@/components/CarSilhouette";
import CatalogBrowser from "@/components/CatalogBrowser";
import { Button, SectionHeading } from "@/components/ui";
import { ArrowRight, CategoryGlyph, WhatsAppGlyph } from "@/components/Icons";
import { contacts } from "@/lib/data";

export function generateStaticParams() {
  return models.map((m) => ({ model: m.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { model: string };
}): Metadata {
  const model = getModel(params.model);
  if (!model) return {};
  return {
    title: `Запчасти ${model.name} — оригинальные б/у детали`,
    description: `Оригинальные кузовные и технические запчасти ${model.name}: бамперы, двери, капот, крылья, оптика, зеркала, радиаторы, ноускаты. В наличии и под заказ.`,
    alternates: { canonical: `/catalog/${model.slug}` },
  };
}

export default function ModelPage({ params }: { params: { model: string } }) {
  const model = getModel(params.model);
  if (!model) notFound();

  const modelProducts = getProductsByModel(model.slug);
  const inStock = modelProducts.filter((p) => p.status === "in_stock").length;

  return (
    <div>
      {/* Баннер модели */}
      <section
        className="relative overflow-hidden border-b border-graphite-200"
        style={{ background: `linear-gradient(135deg, ${model.accent}0d, ${model.accent}1f)` }}
      >
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="container-x relative py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: model.name },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-graphite-600">
                {model.body} · {model.years}
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl">
                Запчасти {model.name}
              </h1>
              <p className="mt-3 max-w-xl text-base text-graphite-600">
                Оригинальные б/у кузовные и технические детали {model.name}. Реальные
                фотографии, честное состояние. {inStock} позиций в наличии.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#catalog" icon>
                  Смотреть все детали
                </Button>
                <a
                  href={contacts.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-graphite-900 ring-1 ring-inset ring-graphite-300 hover:bg-graphite-50"
                >
                  <WhatsAppGlyph width={18} height={18} />
                  Подбор в WhatsApp
                </a>
              </div>
            </div>
            <div className="hidden justify-center lg:flex">
              <CarSilhouette className="w-full max-w-md" color={model.accent} />
            </div>
          </div>

          {/* Переключение моделей */}
          <div className="mt-8 flex gap-2">
            {models.map((m) => (
              <Link
                key={m.slug}
                href={`/catalog/${m.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  m.slug === model.slug
                    ? "bg-graphite-900 text-white"
                    : "bg-white/70 text-graphite-700 hover:bg-white"
                }`}
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Категории по группам */}
      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Категории"
          title={`Что есть для ${model.name}`}
          subtitle="Выберите раздел — откроется деталь с фото, состоянием и ценой."
        />
        <div className="mt-10 space-y-10">
          {categoryGroups.map((g) => {
            const cats = categories.filter((c) => g.categories.includes(c.slug));
            return (
              <div key={g.slug}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-graphite-900">{g.title}</h3>
                  <span className="h-px flex-1 bg-graphite-200" />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cats.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/catalog/${model.slug}/${c.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-graphite-200 bg-white px-4 py-3.5 transition-all hover:border-graphite-300 hover:shadow-soft"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-graphite-100 text-graphite-700 transition-colors group-hover:bg-graphite-900 group-hover:text-white">
                        <CategoryGlyph name={c.icon} width={18} height={18} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-graphite-900">
                          {c.name}
                        </span>
                        {c.nameEn && (
                          <span className="block text-[11px] uppercase tracking-wide text-graphite-400">
                            {c.nameEn}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        width={16}
                        height={16}
                        className="text-graphite-300 transition-all group-hover:translate-x-0.5 group-hover:text-graphite-900"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Каталог модели с фильтрами */}
      <section id="catalog" className="border-t border-graphite-200 bg-graphite-50">
        <div className="container-x py-16">
          <SectionHeading
            eyebrow="Все детали"
            title={`Каталог ${model.name}`}
          />
          <div className="mt-8">
            <Suspense fallback={<div className="py-20 text-center text-graphite-400">Загрузка…</div>}>
              <CatalogBrowser products={modelProducts} lockedModel={model.slug} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
